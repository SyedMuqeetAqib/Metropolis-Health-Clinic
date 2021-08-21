import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { Appointment } from 'src/appointments/model/appointment.interface';
import { Treatment } from 'src/treatment/model/treatment.interface';
import { TreatmentService } from 'src/treatment/treatment.service';
import { User } from 'src/users/model/users.interface';

@Injectable()
export class DashboardService {
    constructor(@InjectModel('Appointments') private readonly appointmentModel: Model<Appointment>,
    @InjectModel('Treatments') private readonly treatmentModel : Model<Treatment>,
    @InjectModel('Users') private readonly userModel: Model<User>,
    private readonly appointmentService: AppointmentsService,
    private readonly treatmentService: TreatmentService){}
    async patientDashboard(user){
        const patientsAppointments = await this.appointmentService.allAppointments(user);
        return patientsAppointments;
    }

    async doctorDashboard(user){
        const appointmentsForDoctor = await this.appointmentService.allAppointmentsForDoctor(user);
        const treatmentsOfDoctor = await this.treatmentService.allTreatmentsOfDoctor(user);
        return {appointments: appointmentsForDoctor, treatments: treatmentsOfDoctor};
    }
}
