import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/invoice.create.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('invoice')
export class InvoiceController {

    constructor(private invoiceService: InvoiceService){}

    @UseGuards(JwtAuthGuard)
    @Post("/create")
    createInvoice(@Body() createInvoiceDto: CreateInvoiceDto){
        return this.invoiceService.createInvoice(createInvoiceDto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch("/update/:id")
    updateInvoice(@Param('id',ParseIntPipe) id:number, @Body() updateInvoiceDto: CreateInvoiceDto){
        return this.invoiceService.updateInvoice(id,updateInvoiceDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/getAll")
    getAllInvoices(){
        return this.invoiceService.getInvoices();
    }

    @UseGuards(JwtAuthGuard)
    @Get("/getById/:id")
    getInvoicesByItem(@Param('id') id: string){
        return this.invoiceService.getInvoiceByItem(+id)
    }
}
