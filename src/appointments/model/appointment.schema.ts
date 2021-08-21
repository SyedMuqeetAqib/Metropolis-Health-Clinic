import * as mongoose from 'mongoose';

export const AppointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
  time: { type: Date, default: Date.now() },
  status: { type: String, default: "Pending" },
});
