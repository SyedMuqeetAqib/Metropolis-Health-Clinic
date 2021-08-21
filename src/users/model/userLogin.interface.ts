import * as mongoose from 'mongoose';
 
 export interface UserLogin extends mongoose.Document {
     email: string;
     password: string;
 }