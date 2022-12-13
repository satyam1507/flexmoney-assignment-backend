import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment/payment.module';
import { SlotModule } from './slot/slot.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, PaymentModule, SlotModule],
})
export class AppModule {}
