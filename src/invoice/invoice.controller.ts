import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceCreateDto } from './dto/invoice-create-dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InvoiceUpdateDto } from './dto/invoice-update-dto';

@Controller('invoice')
@UseGuards(JwtAuthGuard)
export class InvoiceController {

    constructor(private invoiceService: InvoiceService) { }

    @Post("/")
    createInvoice(@Body() createInvoiceDto: InvoiceCreateDto) {
        return this.invoiceService.createInvoice(createInvoiceDto);
    }

    @Patch("/:id")
    updateInvoice(@Param('id', ParseIntPipe) id: number, @Body() invoiceUpdateDto: InvoiceUpdateDto) {
        return this.invoiceService.updateInvoice(id, invoiceUpdateDto);
    }

    @Get("/")
    getAllInvoices() {
        return this.invoiceService.getInvoices();
    }

    @Get("/getById/:id")
    getInvoicesByItem(@Param('id', ParseIntPipe) id: number) {
        return this.invoiceService.getInvoiceByItem(id)
    }

}
