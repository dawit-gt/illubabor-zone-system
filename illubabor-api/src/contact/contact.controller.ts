import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ContactStatus, Role } from '@prisma/client';

@Controller('contact')
export class ContactController {
  constructor(private prisma: PrismaService) {}

  // Public — anyone can submit
  @Post()
  async submit(@Body() body: { name: string; email: string; message: string }) {
    const zone = await this.prisma.zone.findFirst();
    return this.prisma.contactMessage.create({
      data: { ...body, zoneId: zone!.id },
    });
  }

  // Admin — view inbox
  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN, Role.STAFF)
  findAll() {
    return this.prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
  }

  @Patch(':id/status')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN, Role.STAFF)
  updateStatus(@Param('id') id: string, @Body() body: { status: ContactStatus }) {
    return this.prisma.contactMessage.update({ where: { id }, data: body });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ZONE_ADMIN)
  remove(@Param('id') id: string) {
    return this.prisma.contactMessage.delete({ where: { id } });
  }
}