import {
  Controller, Post, UseGuards, UseInterceptors, UploadedFile, BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

@Controller('uploads')
export class UploadsController {
  private supabase;

  constructor(private config: ConfigService) {
    this.supabase = createClient(
      this.config.get('SUPABASE_URL')!,
      this.config.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 10 * 1024 * 1024 } })) // 10MB cap
  async upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file provided');

    const ext = file.originalname.split('.').pop();
    const path = `${randomUUID()}.${ext}`;

    const { error } = await this.supabase.storage
      .from('zone-uploads')
      .upload(path, file.buffer, { contentType: file.mimetype });

    if (error) throw new BadRequestException(`Upload failed: ${error.message}`);

    const { data } = this.supabase.storage.from('zone-uploads').getPublicUrl(path);
    return { url: data.publicUrl };
  }
}