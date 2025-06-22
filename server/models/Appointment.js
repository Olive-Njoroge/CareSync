const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['checkup', 'follow-up', 'consultation', 'emergency'],
        default: 'checkup'
    },
    status: {
        type: String,
        enum: ['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show'],
        default: 'scheduled'
    },
    notes: {
        type: String
    },
    remindersSent: [{
        type: { type: String, enum: ['SMS', 'Voice', 'USSD'] },
        sentAt: { type: Date, default: Date.now },
        status: { type: String, enum: ['sent', 'delivered', 'failed'] }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model("Appointment", appointmentSchema);