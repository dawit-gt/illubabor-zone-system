import {
  Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards, Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ApplicationStatus, Role, ServiceCategory } from '@prisma/client';

@Controller('services')
export class ServicesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  findAll(@Query('category') category?: ServiceCategory, @Query('departmentId') departmentId?: string) {
    return this.prisma.service.findMany({
      where: { ...(category && { category }), ...(departmentId && { departmentId }) },
      include: { department: { select: { name: true, slug: true } } },
      orderBy: { name: 'asc' },
    });
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.prisma.service.findUnique({ where: { slug }, include: { department: true } });
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN, Role.DEPARTMENT_HEAD)
  create(@Body() body: {
    name: string; nameOm?: string; nameAm?: string; slug: string; category: ServiceCategory;
    description: string; requirements?: string; processTime?: string; fee?: string;
    isOnline?: boolean; zoneId: string; departmentId: string;
  }) {
    return this.prisma.service.create({ data: body });
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN, Role.DEPARTMENT_HEAD)
  update(@Param('id') id: string, @Body() body: Partial<{
    name: string; description: string; requirements: string; processTime: string; fee: string; isOnline: boolean;
  }>) {
    return this.prisma.service.update({ where: { id }, data: body });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN)
  remove(@Param('id') id: string) {
    return this.prisma.service.delete({ where: { id } });
  }

  @Post(':id/apply')
  @UseGuards(AuthGuard('jwt'))
  apply(@Param('id') serviceId: string, @Body() body: { notes?: string }, @Req() req: any) {
    return this.prisma.serviceApplication.create({
      data: { serviceId, userId: req.user.userId, notes: body.notes },
    });
  }

  @Get('applications/mine')
  @UseGuards(AuthGuard('jwt'))
  myApplications(@Req() req: any) {
    return this.prisma.serviceApplication.findMany({
      where: { userId: req.user.userId },
      include: { service: { select: { name: true, slug: true } } },
      orderBy: { submittedAt: 'desc' },
    });
  }

  @Patch('applications/:appId/status')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN, Role.DEPARTMENT_HEAD, Role.STAFF)
  updateApplicationStatus(@Param('appId') appId: string, @Body() body: { status: ApplicationStatus; notes?: string }) {
    return this.prisma.serviceApplication.update({ where: { id: appId }, data: body });
  }
}