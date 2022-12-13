/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSlotDto {
  @IsString()
  @IsNotEmpty()
  nextMonthSlotTime: string;
}
