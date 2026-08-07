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
  findAll(@Query('type') type?: DocumentType, @Query('departmentId') departmentId?: string) {
    return this.prisma.document.findMany({
      where: { isPublic: true, ...(type && { type }), ...(departmentId && { departmentId }) },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Stores document *metadata* + a fileUrl pointing at object storage
  // (e.g. Supabase Storage). Actual upload/hosting is separate.
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN, Role.DEPARTMENT_HEAD)
  create(@Body() body: {
    title: string; titleOm?: string; titleAm?: string; type: DocumentType;
    fileUrl: string; fileSizeKb?: number; isPublic?: boolean; zoneId: string; departmentId?: string;
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