import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ItemCreateDto } from './dto/item-create-dto';
import { ItemUpdateDto } from './dto/item-update-dto';
import { ItemResponseDto } from './dto/item-response-dto';

@Injectable()
export class ItemsService {

    constructor(private prismaService: PrismaService) { }

    async create(itemCreateDto: ItemCreateDto): Promise<{message: string, itemResponseDto: ItemResponseDto}> {

        const item = await this.prismaService.item.create({
            data: itemCreateDto
        })

        return {
            message: "Item created successfully!",
            itemResponseDto:{
                description: item.description,
                unit_price: item.unit_price.toNumber(),
                quantity: item.quantity
            }
        }
    }

    
    async update(id: number, itemUpdateDto: ItemUpdateDto): Promise<{message: string, itemResponseDto:ItemResponseDto}> {

        const existItem = await this.prismaService.item.findUnique({
            where: {id: id}
        })

        if(!existItem){
            throw new NotFoundException ("Item not found!")
        }

    
        const updatedItem = await this.prismaService.item.update({
            where: { id },
            data: itemUpdateDto
        })

        return {
            message: "Item updated successfully!",
            itemResponseDto:{
                description: updatedItem.description,
                unit_price: updatedItem.unit_price.toNumber(),
                quantity: updatedItem.quantity
            }
            
        }
    }


    async delete(id: number) {

        const existItem = await this.prismaService.item.findUnique({
            where: {id:id}
        })

        if(!existItem){
            throw new NotFoundException ("Item not found!")
        }

        const deletedItem = await this.prismaService.item.delete({
            where: { id }
        })

        return {
            message: "Item deleted successfully!",
            deletedItem
        }
    }


    async getAll() {
        const items = await this.prismaService.item.findMany();
        return items;
    }


}
