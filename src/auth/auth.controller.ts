/* eslint-disable prettier/prettier */
import { SignInDto } from './dto/signin.dto';
import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';

import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }
    @Post('signin')
    signin(@Body() dto: SignInDto) {
        return this.authService.signin(dto);
    }
    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto);
    }

}
