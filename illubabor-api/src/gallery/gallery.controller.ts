import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { PrismaService } from '../prisma/prisma.service';

import { RolesGuard } from '../common/guards/roles.guard';

import { Roles } from '../common/decorators/roles.decorator';

import { GalleryCategory, Role } from '@prisma/client';

@Controller('gallery')
export class GalleryController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async findAll(
    @Query('category') category?: GalleryCategory,
    @Query('page') page = '1',
    @Query('limit') limit = '24',
  ) {
    const take = Number(limit);
    const skip = (Number(page) - 1) * take;

    const where = category ? { category } : undefined;

    const [data, total] = await Promise.all([
      this.prisma.galleryPhoto.findMany({
        where,
        orderBy: [
          { category: 'asc' },
          { order: 'asc' },
          { createdAt: 'desc' },
        ],
        take,
        skip,
      }),
      this.prisma.galleryPhoto.count({ where }),
    ]);

    return {
      data,
      total,
      page: Number(page),
      limit: take,
      totalPages: Math.ceil(total / take),
    };
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN, Role.STAFF)
  create(@Body() body: {
    category: GalleryCategory;
    imageUrl: string;
    caption?: string;
    captionOm?: string;
    captionAm?: string;
    zoneId: string;
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