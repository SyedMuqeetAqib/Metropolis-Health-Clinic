import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/model/user.schema';
import { AppointmentsService } from './appointments.service';
import { AppointmentSchema } from './model/appointment.schema';

@Module({
    imports:[MongooseModule.forFeature([{name:"Appointments", schema: AppointmentSchema}]),
    MongooseModule.forFeature([{name:"Users", schema: UserSchema}])],
    providers:[AppointmentsService],
    controllers:[],
    exports:[AppointmentsService, MongooseModule.forFeature([{name:"Appointments", schema: AppointmentSchema}])]
})
export class AppointmentsModule {}
