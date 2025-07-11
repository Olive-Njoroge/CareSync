//Authentication
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ["doctor", "admin", "nurse"], default: "doctor"},
    name: {type: String, required: true},
    phoneNumber: {type: String, required: true},
},{timestamps: true}
);

module.exports = mongoose.model("User", userSchema);