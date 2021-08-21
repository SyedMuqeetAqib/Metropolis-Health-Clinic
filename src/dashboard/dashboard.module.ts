import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentsModule } from 'src/appointments/appointments.module';
import { AppointmentSchema } from 'src/appointments/model/appointment.schema';
import { TreatmentSchema } from 'src/treatment/model/treatment.schema';
import { TreatmentModule } from 'src/treatment/treatment.module';
import { UserSchema } from 'src/users/model/user.schema';
import { DashboardService } from './dashboard.service';

@Module({
    imports:[MongooseModule.forFeature([{name:"Users", schema: UserSchema}]),
    TreatmentModule, AppointmentsModule,
    MongooseModule.forFeature([{name:"Treatments", schema: TreatmentSchema}]),
    MongooseModule.forFeature([{name:"Appointments", schema: AppointmentSchema}])],
    providers:[DashboardService],
    exports:[DashboardService]
})
export class DashboardModule {}
