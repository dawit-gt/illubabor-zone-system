import { Controller, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('kebeles')
export class KebelesController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN, Role.WOREDA_ADMIN)
  create(@Body() body: { name: string; nameOm?: string; nameAm?: string; isUrban?: boolean; woredaId: string }) {
    return this.prisma.kebele.create({ data: body });
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN, Role.WOREDA_ADMIN)
  update(@Param('id') id: string, @Body() body: Partial<{ name: string; nameOm: string; nameAm: string; isUrban: boolean }>) {
    return this.prisma.kebele.update({ where: { id }, data: body });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN, Role.WOREDA_ADMIN)
  remove(@Param('id') id: string) {
    return this.prisma.kebele.delete({ where: { id } });
  }
}