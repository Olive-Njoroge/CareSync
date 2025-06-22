const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    email: String,
    dateOfBirth: {type: Date, required: true},
    address: String,
    medicalHistory: [{
        condition: String,
        dateRecorded: {type: Date, default: Date.now},
        notes: String
    }],
    assignedDoctor: {type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true},
    preferredLanguage: {type: String, default: "English"},
    communicationPreference: {type: String, enum: ['SMS', 'Voice', 'USSD'], default: 'SMS'}



}, {timestamps: true}
);

module.exports = mongoose.model("Patient", patientSchema)