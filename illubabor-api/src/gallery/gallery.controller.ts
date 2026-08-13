import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { GalleryCategory, Role } from '@prisma/client';

@Controller('gallery')
export class GalleryController {
  constructor(private prisma: PrismaService) {}

  @Get()
  findAll(@Query('category') category?: GalleryCategory) {
    return this.prisma.galleryPhoto.findMany({
      where: category ? { category } : undefined,
      orderBy: [{ category: 'asc' }, { order: 'asc' }, { createdAt: 'desc' }],
    });
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN, Role.STAFF)
  create(@Body() body: {
    category: GalleryCategory; imageUrl: string; caption?: string; captionOm?: string; captionAm?: string; zoneId: string;
  }) {
    return this.prisma.galleryPhoto.create({ data: body });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN, Role.STAFF)
  remove(@Param('id') id: string) {
    return this.prisma.galleryPhoto.delete({ where: { id } });
  }
}