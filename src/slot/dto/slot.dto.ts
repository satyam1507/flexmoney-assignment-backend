/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class SlotDto {
  @IsString()
  @IsNotEmpty()
  SlotTime: string;
}
