const User = require('../models/User');

// GET: All doctors
exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await User.find({ role: "doctor" });
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch doctors", error: error.message });
    }
};

// GET: Doctor by ID
exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await User.findOne({ _id: req.params.id, role: "doctor" });
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch doctor", error: error.message });
    }
};

// UPDATE: Doctor details
exports.updateDoctor = async (req, res) => {
    try {
        const doctor = await User.findOneAndUpdate(
            { _id: req.params.id, role: "doctor" },
            req.body,
            { new: true }
        );
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });
        res.json(doctor);
    } catch (error) {
        res.status(400).json({ message: "Failed to update doctor", error: error.message });
    }
};

// DELETE: Remove a doctor
exports.deleteDoctor = async (req, res) => {
    try {
        const doctor = await User.findOneAndDelete({ _id: req.params.id, role: "doctor" });
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });
        res.json({ message: "Doctor deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete doctor", error: error.message });
    }
};
