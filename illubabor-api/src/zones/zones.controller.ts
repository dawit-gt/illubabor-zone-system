import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('zones')
export class ZonesController {
  constructor(private prisma: PrismaService) {}

  @Get('current')
  getCurrent() {
    return this.prisma.zone.findFirst({
      include: { _count: { select: { woredas: true, departments: true, news: true } } },
    });
  }

  @Patch('current')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN)
  async updateCurrent(@Body() body: Partial<{
    description: string; descriptionOm: string; descriptionAm: string;
    population: number; populationMale: number; populationFemale: number;
    areaKm2: number; elevationMin: number; elevationMax: number;
    urbanKebeles: number; ruralKebeles: number;
  }>) {
    const zone = await this.prisma.zone.findFirst();
    return this.prisma.zone.update({ where: { id: zone!.id }, data: body });
  }
}