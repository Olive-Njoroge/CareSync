const mongoose = require('mongoose');
const Patient = require('../models/Patient');

// POST: Create new patient
exports.createPatient = async (req, res) => {
    try {
        const patient = await Patient.create({
            ...req.body,
            owner: req.user.id  // ensure req.user is set by auth middleware
        });
        res.status(201).json(patient);
    } catch (error) {
        res.status(400).json({ message: "Failed to create patient", error: error.message });
    }
};

// GET: Get all patients owned by logged-in user
exports.getPatients = async (req, res) => {
    try {
        const patients = await Patient.find({ owner: req.user.id });
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch patients", error: error.message });
    }
};

// GET: Find patient by nationalId OR phoneNumber OR _id
exports.findPatient = async (req, res) => {
    const { identifier } = req.params;

    try {
        let patient = await Patient.findOne({ nationalId: identifier });

        if (!patient) {
            patient = await Patient.findOne({ phoneNumber: identifier });
        }

        if (!patient && mongoose.Types.ObjectId.isValid(identifier)) {
            patient = await Patient.findById(identifier);
        }

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: "Error finding patient", error: error.message });
    }
};

// PUT: Update patient by ID
exports.updatePatient = async (req, res) => {
    try {
        const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Patient not found" });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: "Failed to update", error: error.message });
    }
};

// DELETE: Delete patient by ID
exports.deletePatient = async (req, res) => {
    try {
        const deleted = await Patient.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Patient not found" });
        res.json({ message: "Patient deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Deletion failed", error: error.message });
    }
};
