import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { User } from 'src/users/model/users.interface';
import { resourceLimits } from 'worker_threads';
import { Appointment } from './model/appointment.interface';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel('Appointments')
    private readonly AppointmentModel: Model<Appointment>,
    @InjectModel("Users") private readonly UserModel: Model<User>
  ) {}

  async createAppointment(appointment: any, user) {
      console.log("user Id",user.id)
      if(user.userType != "Patient" && !user.id){
        throw new BadRequestException();
      }
    const { doctorId, time, status } = appointment;
    if (doctorId && time && status) {
        try{
            const userId = user.id;
            const isDoctor = (await this.UserModel.findById(doctorId))
            if(isDoctor.userType != "Doctor"){
              throw new BadRequestException("Doctor Id should be user with the type Doctor");
            }
            const data = new this.AppointmentModel({doctorId, patientId:userId,time, status});
            const result = await data.save();
            return result;
        }
        catch(error){
            console.log(error)
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: "Error occured in Inserting Appointment",
              }, HttpStatus.FORBIDDEN);
        }
    }
    else{
        throw new BadRequestException()
      }
    // return appointment;
  }

  async allAppointments(user){
    if(user.userType != "Patient" && !user.id){
      throw new BadRequestException();
    }
      try{
          const userId = user.id;
          const result = (await this.AppointmentModel.find({patientId: userId}).populate('patientId',"-password").populate('doctorId',"-password").exec());
          return result;
      }
      catch(error){
          console.log(error)
          throw new HttpException({
              status: HttpStatus.FORBIDDEN,
              error: "Error occured in Fetching Appointment",
            }, HttpStatus.FORBIDDEN);
      }

  }

  async allAppointmentsForDoctor(user){
    if(user.userType != "Doctor" && !user.id){
      throw new BadRequestException();
    }
      try{
          const userId = user.id;
          const result = (await this.AppointmentModel.find({doctorId: userId}).populate('patientId',"-password").populate('doctorId',"-password").exec());
          return result;
      }
      catch(error){
          console.log(error)
          throw new HttpException({
              status: HttpStatus.FORBIDDEN,
              error: "Error occured in Fetching Appointment of doctor",
            }, HttpStatus.FORBIDDEN);
      }

  }
}
