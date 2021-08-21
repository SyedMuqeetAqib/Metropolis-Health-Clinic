import { Module } from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { TreatmentController } from './treatment.controller';
import { TreatmentSchema } from './model/treatment.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentSchema } from 'src/appointments/model/appointment.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:"Treatments", schema: TreatmentSchema}]),
  MongooseModule.forFeature([{name:"Appointments", schema: AppointmentSchema}])],
  providers: [TreatmentService],
  controllers: [],
  exports:[TreatmentService,MongooseModule.forFeature([{name:"Treatments", schema: TreatmentSchema}])]
})
export class TreatmentModule {}
