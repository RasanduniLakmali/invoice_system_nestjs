import { IsNotEmpty, IsString } from "class-validator"

export class ItemCreateDto{

    @IsNotEmpty()
    @IsString()
    description!: string

    @IsNotEmpty()
    unit_price!: number

    @IsNotEmpty()
    quantity!: number
}