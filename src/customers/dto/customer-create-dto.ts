import { IsEmail, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class CustomerCreateDto {
 
    @IsNotEmpty()
    @IsString()
    name!: string

    @IsNotEmpty()
    @IsEmail()
    email!: string

    address!: string
    
    phone!: string
}