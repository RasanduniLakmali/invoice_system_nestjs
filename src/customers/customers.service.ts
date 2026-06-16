import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create.customer.dto';

@Injectable()
export class CustomersService {

    constructor(private prismaService: PrismaService) {}

    async createCustomer(createCustomerDto: CreateCustomerDto){
        const customer = await this.prismaService.customer.create({
            data: createCustomerDto
        })
        
        return {
            message: "Customer created successfully!",
            customer
        };
    }

    async updateCustomer(id: number, updateCustomerDto: CreateCustomerDto){

       const updatedCustomer = await this.prismaService.customer.update({
          where: { id },
          data : updateCustomerDto
       })

       return{
        message: "Customer updated successfully!",
        updatedCustomer
       }
    }

    async deleteCustomer(id:number){

        const deletedCustomer = await this.prismaService.customer.delete({
            where : { id }
        })

        return{
            message: "Customer deleted successfully!",
            deletedCustomer
        }
    }

    async getAll(){
        const customers = await this.prismaService.customer.findMany();

        return customers;
    }

}
