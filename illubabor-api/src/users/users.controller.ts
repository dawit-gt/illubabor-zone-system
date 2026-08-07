import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN)
  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true, email: true, fullName: true, role: true, isActive: true,
        createdAt: true, woredaId: true, departmentId: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN)
  async create(@Body() body: {
    email: string; password: string; fullName: string; role: Role;
    woredaId?: string; departmentId?: string;
  }) {
    const hashed = await bcrypt.hash(body.password, 10);
    return this.prisma.user.create({
      data: { ...body, password: hashed },
      select: { id: true, email: true, fullName: true, role: true },
    });
  }

  @Patch(':id')
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN)
  update(@Param('id') id: string, @Body() body: Partial<{
    fullName: string; role: Role; isActive: boolean; woredaId: string; departmentId: string;
  }>) {
    return this.prisma.user.update({ where: { id }, data: body });
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.prisma.user.update({ where: { id }, data: { isActive: false } });
  }
}