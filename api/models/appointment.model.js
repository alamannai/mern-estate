import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    username :{
        type: String,
        required: true,
    },
    date :{
        type: Date,
        required: true,
    }
},{timestamps: true});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;