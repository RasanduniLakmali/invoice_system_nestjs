import { Body, Controller, Delete, Param, Patch, Post, UseGuards, Get, ParseIntPipe } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemCreateDto } from './dto/item-create-dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ItemUpdateDto } from './dto/item-update-dto';

@Controller('items')
@UseGuards(JwtAuthGuard)
export class ItemsController {

   constructor(private itemservice: ItemsService) { }

   @Post("/")
   createItem(@Body() dto: ItemCreateDto) {
      return this.itemservice.create(dto);
   }

   @Patch("/:id")
   updateItem(@Param('id',ParseIntPipe) id: number, @Body() itemUpdateDto: ItemUpdateDto) {
      return this.itemservice.update(id, itemUpdateDto);
   }

   @Delete("/:id")
   deleteItem(@Param('id',ParseIntPipe) id: number) {
      return this.itemservice.delete(id);
   }

   @Get("/")
   getAllItems() {
      return this.itemservice.getAll()
   }
   
}
