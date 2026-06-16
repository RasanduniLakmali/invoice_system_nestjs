import { Body, Controller, Delete, Param, Patch, Post, UseGuards, Get } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/items.create.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('items')
export class ItemsController {

    constructor(private itemservice: ItemsService){}

    @UseGuards(JwtAuthGuard)
    @Post("/create")
    createItem(@Body() dto: CreateItemDto){
       return this.itemservice.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch("/update/:id")
    updateItem(@Param('id') id: string , @Body() updateItemDto: CreateItemDto){
       return this.itemservice.update(+id,updateItemDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("/delete/:id")
    deleteItem(@Param('id') id:string){

        return this.itemservice.delete(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/getAll")
    getAllItems(){
       return this.itemservice.getAll()
    }
}
