import {
  Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, NotFoundException, Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('departments')
export class DepartmentsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  findAll() {
    return this.prisma.department.findMany({
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
      include: { _count: { select: { services: true } } },
    });
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const dept = await this.prisma.department.findUnique({
      where: { slug },
      include: { services: true, documents: { where: { isPublic: true } } },
    });
    if (!dept) throw new NotFoundException('Department not found');
    return dept;
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN)
  create(@Body() body: {
    name: string; nameOm?: string; nameAm?: string; slug: string;
    description?: string; headName?: string; contactEmail?: string; contactPhone?: string; zoneId: string;
  }) {
    return this.prisma.department.create({ data: body });
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN, Role.DEPARTMENT_HEAD)
  async update(@Param('id') id: string, @Body() body: Partial<{
    name: string; description: string; headName: string; contactEmail: string; contactPhone: string; order: number;
  }>, @Req() req: any) {
    if (req.user.role === Role.DEPARTMENT_HEAD) {
      const user = await this.prisma.user.findUnique({ where: { id: req.user.userId } });
      if (user?.departmentId !== id) throw new NotFoundException('Department not found');
    }
    return this.prisma.department.update({ where: { id }, data: body });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN)
  remove(@Param('id') id: string) {
    return this.prisma.department.delete({ where: { id } });
  }
}