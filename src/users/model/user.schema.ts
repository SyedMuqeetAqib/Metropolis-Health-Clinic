import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, trim:true, minLength:3 },
  username: { type: String, default: null, trim:true },
  password: { type: String, required: true },
  userType: { type: String, required: true, trim:true },
  status: { type: Boolean, default: false },
});
