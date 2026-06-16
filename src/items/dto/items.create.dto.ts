import { IsNotEmpty, IsString } from "class-validator"

export class CreateItemDto{

    @IsNotEmpty()
    @IsString()
    description!: string

    @IsNotEmpty()
    unit_price!: number

    @IsNotEmpty()
    quantity!: number
}