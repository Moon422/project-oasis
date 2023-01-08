import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredDto } from './dtos/auth-cred.dto';
import { NewUserDto } from './dtos/new-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post("signup")
    signup(@Body() newUserDto: NewUserDto): Promise<string> {
        return this.authService.signup(newUserDto);
    }

    @Post("signin")
    signin(@Body() authCredDto: AuthCredDto) {
        return this.authService.signin(authCredDto);
    }
}
