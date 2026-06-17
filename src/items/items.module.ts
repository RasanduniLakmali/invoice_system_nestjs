import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService]
})
export class ItemsModule { }
