import { IsEmail, IsNotEmpty } from 'class-validator';

export class createTreatment {
  @IsNotEmpty()
  appointmentId: string;

  @IsNotEmpty()
  treatment: string;
}

