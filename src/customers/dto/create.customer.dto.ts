import { IsEmail, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class CreateCustomerDto {
 
    @IsNotEmpty()
    @IsString()
    name!: string

    @IsNotEmpty()
    @IsEmail()
    email!: string

    address!: string
    
    phone!: string
}