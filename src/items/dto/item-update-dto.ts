import { PartialType } from "@nestjs/swagger";
import { ItemCreateDto } from "./item-create-dto";

export class ItemUpdateDto extends PartialType(ItemCreateDto){}