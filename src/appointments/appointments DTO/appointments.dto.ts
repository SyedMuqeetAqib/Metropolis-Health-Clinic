import { IsDateString, IsNotEmpty } from 'class-validator';

export class createAppointment {
  @IsNotEmpty()
  doctorId: string;

  @IsNotEmpty()
  @IsDateString()
  time: string;

  @IsNotEmpty()
  status: string;
}