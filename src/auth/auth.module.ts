import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { Auth } from './auth.entity';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Auth, User
    ]),
    JwtModule.register({
      secret: "9z$C&F)J@NcRfUjXn2r5u8x/A%D*G-KaPdSgVkYp3s6v9y$B&E(H+MbQeThWmZq4",
      signOptions: {
        expiresIn: 300,
      }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
