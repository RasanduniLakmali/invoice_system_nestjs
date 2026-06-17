import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body } from '@nestjs/common';
import { RegisterDto } from './dto/register-dto';
import { Post } from '@nestjs/common';
import { LoginDto } from './dto/login-dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('/login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }


}
