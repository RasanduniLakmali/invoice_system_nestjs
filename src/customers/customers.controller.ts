import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomerCreateDto } from './dto/customer-create-dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CustomerUpdateDto } from './dto/customer-update-dto';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {

    constructor(private customerService: CustomersService) { }

    @Post("/")
    createCustomer(@Body() dto: CustomerCreateDto) {
        return this.customerService.createCustomer(dto);
    }

    @Patch("/:id")
    updateCustomer(@Param('id') id: string, @Body() updateCustomerDto: CustomerUpdateDto) {
        return this.customerService.updateCustomer(+id, updateCustomerDto);
    }

    @Delete("/:id")
    deleteCustomer(@Param('id') id: string) {
        return this.customerService.deleteCustomer(+id);
    }

    @Get("/")
    getAllCustomers() {
        return this.customerService.getAll();
    }

}
