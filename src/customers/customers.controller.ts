import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create.customer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('customers')
export class CustomersController {

    constructor(private customerService: CustomersService) {}

    @UseGuards(JwtAuthGuard)
    @Post("/create")
    createCustomer(@Body() dto: CreateCustomerDto){
        return this.customerService.createCustomer(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch("update/:id")
    updateCustomer(@Param('id') id:string, @Body() updateCustomerDto: CreateCustomerDto){
        return this.customerService.updateCustomer(+id,updateCustomerDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("/delete/:id")
    deleteCustomer(@Param('id') id:string){
        return this.customerService.deleteCustomer(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/getAll")
    getAllCustomers(){

       return this.customerService.getAll();
    }

}
