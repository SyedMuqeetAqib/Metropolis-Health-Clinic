import * as mongoose from 'mongoose';

 export interface Treatment extends mongoose.Document {
     doctorId: string | mongoose.ObjectId;
     appointmentId: string | mongoose.ObjectId;
     time: Date;
     treatment: string;
 }