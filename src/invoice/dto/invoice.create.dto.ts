import { IsNotEmpty } from "class-validator";
import { InvoiceStatus } from "../enum/invoice.status.enum";

export class CreateInvoiceDto {

  @IsNotEmpty()
  customerId!: number;

  @IsNotEmpty()
  totalAmount!: number;
  status!: InvoiceStatus

  items!: {
    itemId: number;
    quantity: number;
    unitPrice: number;
  }[];
}