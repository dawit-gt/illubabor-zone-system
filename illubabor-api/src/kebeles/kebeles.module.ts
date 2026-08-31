import { Module } from '@nestjs/common';
import { KebelesController } from './kebeles.controller';

@Module({ controllers: [KebelesController] })
export class KebelesModule {}