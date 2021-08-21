import { Controller, Get, Post, Request, UseGuards, Body, Res } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AppointmentsService } from './appointments.service';

@Controller("appointment")
export class AppointmentsController {
  constructor(private readonly appointmentService: AppointmentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createAppointment(@Body() appointment, @Request() req): any {
    return this.appointmentService.createAppointment(appointment, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllAppointments(@Request() req){
    return this.appointmentService.allAppointments(req.user);
  }
  @Post('user/register')
  register(@Body() userDetails):any{
    return userDetails
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() req): string {
    return req.user;
  }
}
