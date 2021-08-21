import * as mongoose from 'mongoose';
 
 export interface UserRegister extends mongoose.Document {
     email: string;
     password: string;
     userType: string;
 }