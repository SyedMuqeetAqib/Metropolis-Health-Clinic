import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { userInfo } from 'os';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
constructor(private readonly dashboardService: DashboardService){}
    

    @UseGuards(JwtAuthGuard)
    @Get()
    userDashboard(@Request() req){
        if(req.user.userType == "Doctor"){
            return this.dashboardService.doctorDashboard(req.user);
        }
        else if(req.user.userType == "Patient"){
            return this.dashboardService.patientDashboard(req.user);
        }
        else if(req.user.userType == "Admin"){
            return "Admin";
        }
        else{
            return null;
        }
    }
}
