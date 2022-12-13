/* eslint-disable prettier/prettier */
import { PrismaService } from './../prisma/prisma.service';
import { SignInDto } from './dto/signin.dto';
import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';

import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) { }

    async signup(dto: AuthDto) {
        const hash = await argon.hash(dto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    age: parseInt(dto.age),
                    hashedPwd: hash,
                    name: dto.name,
                }
            });
            return this.signToken(user.id, user.email);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {

                if (error.code === "P2002") {
                    throw new ForbiddenException(
                        'Credentials Taken',);
                }
            }
            throw error;
        }

    }
    async signin(dto: SignInDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (!user) {
            throw new ForbiddenException('User not found try Signing up');
        }
        const valid = await argon.verify(user.hashedPwd, dto.password);
        if (!valid) {
            throw new ForbiddenException('Invalid Credentials');
        }
        delete user.hashedPwd;
        return this.signToken(user.id, user.email);
    }
    async signToken(userId: number, email: string) {
        const payload = {
            sub: userId,
            email
        }
        const token = await this.jwt.signAsync(payload, {
            expiresIn: "15m",
            secret: process.env.JWT_SECRET
        });

        return { access_token: token };
    }
}
