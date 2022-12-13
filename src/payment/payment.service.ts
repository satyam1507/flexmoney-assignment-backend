/* eslint-disable prettier/prettier */
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PaymentDto } from './dto';

@Injectable()
export class PaymentService {
    constructor(private prisma: PrismaService) { }

    create(user: User,dto:PaymentDto) {
        console.log(dto);
        try {
            const payment = this.prisma.payment.create({
                data: {
                    amount: parseInt(dto.amount),
                    userId: user.id,
                }
            }
            );
            return payment;
        } catch (error) {
            return error;
        }
    }

    get() {
        try {
            return this.prisma.payment.findMany(
                {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    take: 1
                }
            );
        } catch (error) {
            return error;
        }
    }
}
