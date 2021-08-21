import * as mongoose from 'mongoose';

 export interface Appointment extends mongoose.Document {
     doctor: string | mongoose.ObjectId;
     patientId: string | mongoose.ObjectId;
     time: Date;
     status: String;
 }