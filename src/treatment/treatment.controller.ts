import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { request } from 'http';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TreatmentService } from './treatment.service';

@Controller('treatment')
export class TreatmentController {
    constructor(private readonly treatmentService: TreatmentService){}

  @UseGuards(JwtAuthGuard)
  @Get()
  allTreatments(@Request() req){
        return this.treatmentService.allTreatmentsOfDoctor(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    createTreatment(@Body() treatment,@Request() req){
        return this.treatmentService.createTreatmentByDoctor(treatment,req.user);
    }
}
