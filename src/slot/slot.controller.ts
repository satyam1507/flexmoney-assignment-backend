/* eslint-disable prettier/prettier */
import { SlotService } from './slot.service';
import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorator';
import { SlotDto, UpdateSlotDto } from './dto';
import { User } from '@prisma/client';

@Controller('slot')
export class SlotController {
    constructor(private slotService: SlotService) { }
    @UseGuards(JwtGuard)
    @Post()

    create(@GetUser() user: User, @Body() dto: SlotDto) {

        return this.slotService.create(user, dto);
    }
    @UseGuards(JwtGuard)
    @Patch()
    update(@GetUser() user: User, @Body() dto: UpdateSlotDto) {
        return this.slotService.update(user, dto);
    }

    @UseGuards(JwtGuard)
    @Get()
    get() {
        return this.slotService.get();
    }
}
