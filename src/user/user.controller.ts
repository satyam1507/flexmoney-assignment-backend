import { JwtGuard } from './../auth/guard/jwt.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
@Controller('users')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('Profile')
  getMe(@GetUser() user: User) {
    return user;
  }
}
