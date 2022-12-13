/* eslint-disable prettier/prettier */
import { JwtGuard } from './../auth/guard/jwt.guard';
import { PaymentService } from './payment.service';
import { Controller, Post, Get, UseGuards, Body } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { PaymentDto } from './dto';
@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService) { }
    @UseGuards(JwtGuard)
    @Post()
    create(@GetUser() user: User,@Body() dto:PaymentDto) {
        return this.paymentService.create(user,dto);
    }
    @UseGuards(JwtGuard)
    @Get()
    get() {
        return this.paymentService.get();
    }
}
