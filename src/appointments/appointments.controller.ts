import { Controller, Get, Post, Request, UseGuards, Body, Res } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { createAppointment } from './appointments DTO/appointments.dto';
import { AppointmentsService } from './appointments.service';

@Controller("appointment")
export class AppointmentsController {
  constructor(private readonly appointmentService: AppointmentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createAppointment(@Body() appointment:createAppointment, @Request() req): any {
    return this.appointmentService.createAppointment(appointment, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllAppointments(@Request() req){
    return this.appointmentService.allAppointments(req.user);
  }

}
