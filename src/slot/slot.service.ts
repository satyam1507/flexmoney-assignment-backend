import { UpdateSlotDto } from './dto/updateSlot.dto';
/* eslint-disable prettier/prettier */
import { SlotDto } from './dto/';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SlotService {
  constructor(private prisma: PrismaService) { }
  create(user: User, dto: SlotDto) {
    try {
      const slot = this.prisma.slot.create({
        data: {
          SlotTime: dto.SlotTime,
          userId: user.id,
          nextMonthSlotTime: dto.SlotTime,
        },
      });
      return slot;
    } catch (error) {
      return error;
    }
  }
  update(user: User, dto: UpdateSlotDto) {
    try {
      const slot = this.prisma.slot.updateMany({
        where: {
          userId: user.id,
        },
        data: {
          nextMonthSlotTime: dto.nextMonthSlotTime,
        },
      });
      return slot;
    } catch (error) {
      return error;
    }
  }
  get() {
    try {
      return this.prisma.slot.findMany({
        orderBy: {
          createdAt: 'asc',
        },
        take: 1,
      });
    } catch (error) {
      return error;
    }
  }
}
