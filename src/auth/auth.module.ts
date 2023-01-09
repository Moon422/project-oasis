import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { Auth } from './auth.entity';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Auth, User
    ]),
    PassportModule.register({
      defaultStrategy: "jwt"
    }),
    JwtModule.register({
      secret: "9z$C&F)J@NcRfUjXn2r5u8x/A%D*G-KaPdSgVkYp3s6v9y$B&E(H+MbQeThWmZq4",
      signOptions: {
        expiresIn: "5m",
      }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule { }
