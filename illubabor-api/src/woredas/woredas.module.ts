import { Module } from '@nestjs/common';
import { WoredasController } from './woredas.controller';

@Module({ controllers: [WoredasController] })
export class WoredasModule {}