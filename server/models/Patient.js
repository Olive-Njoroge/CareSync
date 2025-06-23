const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    phoneNumber: {type: String, required: true, unique: true,
                    validate: {
                        validator: function (v) {
                            return /^(\+254|0)?7\d{8}$/.test(v); // Kenyan mobile pattern
                        },
                        message: props => `${props.value} is not a valid Kenyan phone number!`
                    }
    },
    nationalId: { type: String, unique: true, sparse: true }, // optional but unique if provided

    email: String,
    dateOfBirth: {type: Date, required: true},
    address: String,
    medicalHistory: [{
        condition: String,
        dateRecorded: {type: Date, default: Date.now},
        notes: String
    }],
    assignedDoctor: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    preferredLanguage: {type: String, default: "English"},
    communicationPreference: {type: String, enum: ['SMS', 'Voice', 'USSD'], default: 'SMS'}



}, {timestamps: true}
);



module.exports = mongoose.model("Patient", patientSchema)