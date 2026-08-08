import { Controller, Get, Put, Param, Body, UseGuards, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('site-config')
export class SiteConfigController {
  constructor(private prisma: PrismaService) {}

  @Get(':key')
  async getByKey(@Param('key') key: string) {
    const config = await this.prisma.siteConfig.findUnique({ where: { key } });
    if (!config) throw new NotFoundException('Not set');
    return config;
  }

  @Put(':key')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN)
  upsert(@Param('key') key: string, @Body() body: { value: string }) {
    return this.prisma.siteConfig.upsert({
      where: { key },
      update: { value: body.value },
      create: { key, value: body.value },
    });
  }
}