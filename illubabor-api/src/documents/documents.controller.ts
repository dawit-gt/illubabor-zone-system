import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { DocumentType, Role } from '@prisma/client';

@Controller('documents')
export class DocumentsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async findAll(
    @Query('type') type?: DocumentType,
    @Query('departmentId') departmentId?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '20',
  ) {
    const take = Number(limit);
    const skip = (Number(page) - 1) * take;

    const where = {
      isPublic: true,
      ...(type && { type }),
      ...(departmentId && { departmentId }),
    };

    const [data, total] = await Promise.all([
      this.prisma.document.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take,
        skip,
      }),
      this.prisma.document.count({ where }),
    ]);

    return {
      data,
      total,
      page: Number(page),
      limit: take,
      totalPages: Math.ceil(total / take),
    };
  }

  // Stores document *metadata* + a fileUrl pointing at object storage
  // (e.g. Supabase Storage). Actual upload/hosting is separate.
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN, Role.DEPARTMENT_HEAD)
  create(@Body() body: {
    title: string;
    titleOm?: string;
    titleAm?: string;
    type: DocumentType;
    fileUrl: string;
    fileSizeKb?: number;
    isPublic?: boolean;
    zoneId: string;
    departmentId?: string;
  }) {
    return this.prisma.document.create({ data: body });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN)
  remove(@Param('id') id: string) {
    return this.prisma.document.delete({ where: { id } });
  }
}