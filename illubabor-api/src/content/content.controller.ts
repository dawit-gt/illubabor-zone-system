import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards, NotFoundException } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { PrismaService } from '../prisma/prisma.service';

import { RolesGuard } from '../common/guards/roles.guard';

import { Roles } from '../common/decorators/roles.decorator';

import { ContentType, Role } from '@prisma/client';

@Controller('content')

export class ContentController {

  constructor(private prisma: PrismaService) {}

  @Get()

  findAll(@Query('type') type?: ContentType) {

    return this.prisma.contentEntry.findMany({

      where: type ? { type } : undefined,

      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],

    });

  }

  @Get(':id')

  async findOne(@Param('id') id: string) {

    const entry = await this.prisma.contentEntry.findUnique({ where: { id } });

    if (!entry) throw new NotFoundException('Not found');

    return entry;

  }

  @Post()

  @UseGuards(AuthGuard('jwt'), RolesGuard)

  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN, Role.STAFF)

  create(@Body() body: {

    type: ContentType; title: string; titleOm?: string; titleAm?: string;

    summary?: string; summaryOm?: string; summaryAm?: string;

    body: string; bodyOm?: string; bodyAm?: string; imageUrl?: string; tag?: string; status?: string; zoneId: string;

  }) {

    return this.prisma.contentEntry.create({ data: body });

  }

  @Patch(':id')

  @UseGuards(AuthGuard('jwt'), RolesGuard)

  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN, Role.STAFF)

  update(@Param('id') id: string, @Body() body: Partial<{

    title: string; titleOm: string; titleAm: string;

    summary: string; summaryOm: string; summaryAm: string;

    body: string; bodyOm: string; bodyAm: string; imageUrl: string; tag: string; status: string; order: number;

  }>) {

    return this.prisma.contentEntry.update({ where: { id }, data: body });

  }

  @Delete(':id')

  @UseGuards(AuthGuard('jwt'), RolesGuard)

  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN)

  remove(@Param('id') id: string) {

    return this.prisma.contentEntry.delete({ where: { id } });

  }

}