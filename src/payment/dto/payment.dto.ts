/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class PaymentDto {
  @IsNotEmpty()
  @IsString()
 amount: string;
}