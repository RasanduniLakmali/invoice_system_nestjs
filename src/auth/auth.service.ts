import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register-dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-dto';
import { UnauthorizedException, BadRequestException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(private prismaService: PrismaService, private jwtservice: JwtService) { }

    async register(registerDto: RegisterDto): Promise<{ message: string; email: string; name: string }> {

        const isExistUser = await this.prismaService.user.findUnique({
            where: { email: registerDto.email }
        });

        if (isExistUser) {
            throw new BadRequestException("User already exists!");
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        const user = await this.prismaService.user.create({
            data: {
                name: registerDto.name,
                email: registerDto.email,
                password: hashedPassword
            }
        });

        return {
            message: "User registered successfully!",
            email: user.email,
            name: user.name
        };
    }

    async login(loginDto: LoginDto) {

        const user = await this.prismaService.user.findUnique({
            where: {
                email: loginDto.email
            },
        })

        if (!user) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const isPasswordMatchd = await bcrypt.compare(
            loginDto.password,
            user.password
        )

        if (!isPasswordMatchd) {
            throw new UnauthorizedException("Invali Pssword!!")
        }

        // const payload = {
        //     sub: user.id,
        //     email: user.email
        // }

        const accesstoken = await this.jwtservice.signAsync({
            sub: user.id,
            email: user.email
        })

        return {
            message: "Login successful!",
            access_token: accesstoken
        };

    }

}
