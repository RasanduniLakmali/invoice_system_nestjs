import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CustomerCreateDto } from './dto/customer-create-dto';
import { CustomerResponseDto } from './dto/customer-response-dto';
import { CustomerUpdateDto } from './dto/customer-update-dto';

@Injectable()
export class CustomersService {

    constructor(private prismaService: PrismaService) { }

    async createCustomer(createCustomerDto: CustomerCreateDto): Promise<{ message: string; customerResponseDto: CustomerResponseDto }> {

        const existCustomer = await this.prismaService.customer.findUnique({
            where: { email: createCustomerDto.email }
        })

        if (existCustomer) {
            throw new BadRequestException("Customer already exists!")
        }

        const newCustomer = await this.prismaService.customer.create({
            data: createCustomerDto
        })

        return {
            message: "Customer created successfully!",
            customerResponseDto: {
                name: newCustomer.name,
                email: newCustomer.email,
                address: newCustomer.address,
                phone: newCustomer.phone
            }
        };
    }

    async updateCustomer(id: number, updateCustomerDto: CustomerUpdateDto): Promise<{message: string; customerResponseDto: CustomerResponseDto}>{

        const existCustomer = await this.prismaService.user.findUnique({
            where: {email: updateCustomerDto.email}
        })

        if(!existCustomer){
           throw new NotFoundException ("Customer not found!")
        }

        const updatedCustomer = await this.prismaService.customer.update({
            where: { id },
            data: updateCustomerDto
        })

        return {
            message: "Customer updated successfully!",
            customerResponseDto: {
                name: updatedCustomer.name,
                email: updatedCustomer.email,
                address: updatedCustomer.address,
                phone: updatedCustomer.phone
            }
        }

    }

    
    async deleteCustomer(id: number) {

        const existCustomer = await this.prismaService.user.findUnique({
            where: {id: id}
        })

        if(!existCustomer){
            throw new NotFoundException("User not found!")
        }

        const deletedCustomer = await this.prismaService.customer.delete({
            where: { id }
        })

        return {
            message: "Customer deleted successfully!",
            deletedCustomer
        }
    }

    async getAll() {
        const customers = await this.prismaService.customer.findMany();
        return customers;
    }

}
