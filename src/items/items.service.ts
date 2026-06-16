import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateItemDto } from './dto/items.create.dto';

@Injectable()
export class ItemsService {

    constructor(private prismaService:PrismaService){}

    async create(createItemDto:CreateItemDto){

      const item = await this.prismaService.item.create({
        data: createItemDto
      })

      return {
        message: "Item created successfully!",
        item
      }
    }

     async update(id: number, updateItemDto: CreateItemDto){
    
      const updatedItem = await this.prismaService.item.update({
        where: { id },
              data : updateItemDto
      })
    
        return{
            message: "Item updated successfully!",
            updatedItem
        }
    }


    async delete(id:number){

        const deletedItem = await this.prismaService.item.delete({
            where : { id }
        })

        return{
            message: "Item deleted successfully!",
            deletedItem
        }
    }


    async getAll(){
        const items = await this.prismaService.item.findMany();

        return items;
    }


}
