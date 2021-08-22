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
  login(@Request() req): any {
    return this.authService.login(req.user);
  }

  @Post('user/register')
  register(@Body() userDetails: RegisterUserDto):any{
    return this.appService.register(userDetails)
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/verify')
  getHello(@Body("username") username:UsernameVerification,@Request() req): any {
    return this.appService.verifyUser(req.user, username);
  }
}
