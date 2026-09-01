import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { NewsStatus, NewsTag, Role } from '@prisma/client';

@Controller('news')
export class NewsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  findAll(
    @Query('tag') tag?: NewsTag,
    @Query('woredaId') woredaId?: string,
    @Query('page') page = '1',
  ) {
    const take = 12;
    const skip = (Number(page) - 1) * take;

    return this.prisma.news.findMany({
      where: {
        status: NewsStatus.PUBLISHED,
        ...(tag && { tags: { has: tag } }),
        ...(woredaId && { woredaId }),
      },
      orderBy: { publishedAt: 'desc' },
      take,
      skip,
    });
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const item = await this.prisma.news.findUnique({
      where: { slug },
    });

    if (!item || item.status !== NewsStatus.PUBLISHED) {
      throw new NotFoundException('Article not found');
    }

    return item;
  }

  @Get('admin/all')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(
    Role.SUPER_ADMIN,
    Role.ZONE_ADMIN,
    Role.WOREDA_ADMIN,
    Role.STAFF,
  )
  findAllAdmin() {
    return this.prisma.news.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(
    Role.SUPER_ADMIN,
    Role.ZONE_ADMIN,
    Role.WOREDA_ADMIN,
    Role.STAFF,
  )
  create(@Body() body: {
    title: string;
    titleOm?: string;
    titleAm?: string;
    slug: string;
    content: string;
    contentOm?: string;
    contentAm?: string;
    excerpt?: string;
    coverImage?: string;
    images?: string[];
    tags?: NewsTag[];
    zoneId: string;
    woredaId?: string;
  }) {
    return this.prisma.news.create({
      data: body,
    });
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(
    Role.SUPER_ADMIN,
    Role.ZONE_ADMIN,
    Role.WOREDA_ADMIN,
    Role.STAFF,
  )
  update(
    @Param('id') id: string,
    @Body() body: Partial<{
      title: string;
      slug: string;
      content: string;
      excerpt: string;
      coverImage: string;
      images: string[];
      tags: NewsTag[];
      status: NewsStatus;
    }>,
  ) {
    const data: any = { ...body };

    if (body.status === NewsStatus.PUBLISHED) {
      data.publishedAt = new Date();
    }

    return this.prisma.news.update({
      where: { id },
      data,
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN)
  remove(@Param('id') id: string) {
    return this.prisma.news.delete({
      where: { id },
    });
  }
}
