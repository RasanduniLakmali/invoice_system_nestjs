import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InvoiceCreateDto } from './dto/invoice-create-dto';
import { InvoiceStatus } from './enum/invoice.status.enum';
import { InvoiceUpdateDto } from './dto/invoice-update-dto';

@Injectable()
export class InvoiceService {

  constructor(private prismaService: PrismaService) { }

  async createInvoice(createInvoiceDto: InvoiceCreateDto) {

    return await this.prismaService.$transaction(

      async (tx) => {

        const invoice = await tx.invoice.create({   // 'tx' is like this.prismaservice
          data: {
            date: new Date(),
            status: InvoiceStatus.PENDING,
            customer_id: createInvoiceDto.customerId,
            total_amount: 0,
          },
        });

        let totalAmount = 0;

        const itemsData = createInvoiceDto.items.map((item) => {
          const amount = item.quantity * item.unitPrice;

          totalAmount += amount;

          return {
            invoice_id: invoice.id,
            item_id: item.itemId,
            quantity: item.quantity,
            unit_price: item.unitPrice,
            amount,
          };
        });

        await tx.invoiceItem.createMany({
          data: itemsData,
        });

        await tx.invoice.update({
          where: {
            id: invoice.id,
          },
          data: {
            total_amount: totalAmount,

          },
        });

        const invoiceWithItems = await tx.invoice.findUnique({
          where: { id: invoice.id },
          include: {
            items: true,
          },
        });

        return {
          message: 'Invoice created successfully',
          invoice: invoiceWithItems,
        };

      });
  }

  async getInvoices() {
    return await this.prismaService.invoice.findMany({
      include: {
        customer: true,
        items: true,
      },
    });
  }

  
  async getInvoiceByItem(invoiceId: number) {
    return this.prismaService.invoiceItem.findMany({
      where: {
        invoice_id: invoiceId,
      },
      select: {
        invoice_id: true,
        item_id: true,
        quantity: true,
        unit_price: true,
        amount: true,
      },
    });
  }

  async updateInvoice(id: number, invoiceUpdateDto: InvoiceUpdateDto) {

    return await this.prismaService.$transaction(async (tx) => {

      const invoice = await tx.invoice.findUnique({
        where: { id },
      });

      if (!invoice) {
        throw new NotFoundException('Invoice not found');
      }

      // if (invoice.status === 'PAID' || invoice.status === 'CANCELLED') {
      //   throw new BadRequestException(
      //     'This invoice cannot be updated',
      //   );
      // }

      await this.prismaService.invoiceItem.deleteMany({
        where:{invoice_id:id}
      })

      let total = 0;

      const itemsData = (invoiceUpdateDto.items ?? []).map((item) =>{
          const amount = item.quantity * item.unitPrice;
          total += amount;

          return{
            invoice_id : id,
            item_id: item.itemId,
            quantity: item.quantity,
            unit_price: item.unitPrice,
            amount
          };

        });

        await tx.invoiceItem.createMany({
          data: itemsData
        })

       await tx.invoice.update({
          where: { id },
          data: {
            customer_id: invoiceUpdateDto.customerId,
            total_amount: total,
            status: invoiceUpdateDto.status ?? invoice.status,
        },
      });

      const invoiceWithItems = await tx.invoice.findUnique({
        where: { id },
        include: {
          items: true,
        },
      });

      return {
        message: 'Invoice updated successfully',
        invoice: invoiceWithItems,
      };

    });

  }

}


// return await this.prismaService.$transaction(async (tx) => {

//       const invoice = await tx.invoice.findUnique({
//         where: { id },
//       });

//       if (!invoice) {
//         throw new NotFoundException('Invoice not found');
//       }

//       // if (invoice.status === 'PAID' || invoice.status === 'CANCELLED') {
//       //   throw new BadRequestException(
//       //     'This invoice cannot be updated',
//       //   );
//       // }

//       await this.prismaService.invoiceItem.deleteMany({
//         where:{invoice_id:id}
//       })

      
//       // here fetch exist items from this invoice id
//       const existItems = await tx.invoiceItem.findMany({
//         where: { invoice_id: id }
//       })

//       let total = 0;

//       const items = invoiceUpdateDto.items ?? [];

//       for (const item of items) {

//         const existEachItem = existItems.find(
//           i => i.item_id == item.itemId
//         );
      
//         const amount = item.quantity * item.unitPrice;
//         total += amount;

//         if (existEachItem) {

//           await tx.invoiceItem.update({

//             where: { id: existEachItem.id },
//             data: {
//               quantity: item.quantity,
//               unit_price: item.unitPrice,
//               amount,
//             },
//           });

//         } else {
//           await tx.invoiceItem.create({
//             data: {
//               invoice_id: id,
//               item_id: item.itemId,
//               quantity: item.quantity,
//               unit_price: item.unitPrice,
//               amount,
//             }
//           })
//         }

//       }

//       for (const oldItem of existItems) {

//         const stillExists = items.find(
//           i => i.itemId === oldItem.item_id,
//         );

//         if (!stillExists) {
//           await tx.invoiceItem.delete({
//             where: { id: oldItem.id },
//           });
//         }
//       }

//       await tx.invoice.update({
//         where: { id },
//         data: {
//           customer_id: invoiceUpdateDto.customerId,
//           total_amount: total,
//           status: invoiceUpdateDto.status ?? invoice.status,
//         },
//       });

//       const invoiceWithItems = await tx.invoice.findUnique({
//         where: { id },
//         include: {
//           items: true,
//         },
//       });

//       return {
//         message: 'Invoice updated successfully',
//         invoice: invoiceWithItems,
//       };

//     });

//   }