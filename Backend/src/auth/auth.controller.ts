import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDTO } from './auth.constants';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async registerUser(@Body() regPayload: RegisterUserDTO) {
        return this.authService.registerUser(regPayload)
    }
}
