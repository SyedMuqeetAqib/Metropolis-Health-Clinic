import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment } from 'src/appointments/model/appointment.interface';
import { Treatment } from './model/treatment.interface';

@Injectable()
export class TreatmentService {
    constructor(@InjectModel("Treatments") private readonly TreatmentModel : Model<Treatment>,
    @InjectModel("Appointments") private readonly appointmentModel: Model<Appointment>){

    }

  async allTreatmentsOfDoctor(user){
    if(user.userType != "Doctor" && !user.id){
      throw new BadRequestException();
    }
      try{
          const userId = user.id;
          const result = (await this.TreatmentModel.find({doctorId: userId}).populate({ 
            path: 'appointmentId',
            populate: {
              path: 'patientId',
              select:"-password"
            } 
         }).populate('doctorId',"-password").exec());
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


  async createTreatmentByDoctor(treatmentDetails,user){
      console.log("treatment create data",{doctor:user.id,...treatmentDetails })
    if(user.userType != "Doctor" && !user.id){
        throw new BadRequestException();
      }

      const {appointmentId, treatment } = treatmentDetails;
        try{
            const userId = user.id;
            const isAppointment = (await this.appointmentModel.findById(appointmentId))
            console.log("appointment", isAppointment)
            if(!isAppointment){
              throw new BadRequestException("Appointment id is invalid");
            }
            const data = new this.TreatmentModel({doctorId:userId, appointmentId,treatment});
            const result = await data.save();
            await this.appointmentModel.findByIdAndUpdate({_id:appointmentId},{status:"Done"});
            return result;
            //  const userId = user.id;
            // const result = (await this.TreatmentModel.find({doctorId: userId}).exec());
            // return result;
        }
        catch(error){
            console.log(error)
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: "Error occured in Inserting Appointment",
              }, HttpStatus.FORBIDDEN);
        }
  
  }
}
