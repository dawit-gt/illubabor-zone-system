import {
  Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('woredas')
export class WoredasController {
  constructor(private prisma: PrismaService) {}

  @Get()
  findAll() {
    return this.prisma.woreda.findMany({
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
      include: { _count: { select: { kebeles: true } } },
    });
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const woreda = await this.prisma.woreda.findUnique({
      where: { slug },
      include: { kebeles: true, news: { where: { status: 'PUBLISHED' }, take: 5 } },
    });
    if (!woreda) throw new NotFoundException('Woreda not found');
    return woreda;
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN)
  create(@Body() body: {
    name: string; nameOm?: string; nameAm?: string; slug: string;
    population?: number; isTown?: boolean; description?: string; zoneId: string;
  }) {
    return this.prisma.woreda.create({ data: body });
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN, Role.WOREDA_ADMIN)
  update(@Param('id') id: string, @Body() body: Partial<{
    name: string; nameOm: string; nameAm: string; population: number; description: string; order: number;
  }>) {
    return this.prisma.woreda.update({ where: { id }, data: body });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN)
  remove(@Param('id') id: string) {
    return this.prisma.woreda.delete({ where: { id } });
  }
}