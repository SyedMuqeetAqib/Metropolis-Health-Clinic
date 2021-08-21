import * as mongoose from 'mongoose';
 
 export interface User extends mongoose.Document {
     email: string;
     username: string;
     password: string;
     userType: string;
     status: boolean;
 }