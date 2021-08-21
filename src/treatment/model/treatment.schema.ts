import * as mongoose from 'mongoose';

export const TreatmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointments'},
  time: { type: Date, default: Date.now() },
  treatment: { type: String, required:true },
});
