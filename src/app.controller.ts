import { Controller, Get, Post, Request, UseGuards, Body, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { RegisterUserDto, UsernameVerification } from './user.dto';


@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('user/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('user/register')
  async register(@Body() userDetails: RegisterUserDto){
    return this.appService.register(userDetails)
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/verify')
  async getHello(@Body("username") username:UsernameVerification,@Request() req) {
    console.log("username is:", username)
    return this.appService.verifyUser(req.user, username);
  }
}
