import { PartialType } from "@nestjs/swagger";
import { InvoiceCreateDto } from "./invoice-create-dto";

export class InvoiceUpdateDto extends PartialType(InvoiceCreateDto){}