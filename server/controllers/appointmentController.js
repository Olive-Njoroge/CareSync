const Appointment = require('../models/Appointment');

// Create an appointment
exports.createAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.create(req.body);
        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ message: "Failed to create appointment", error: error.message });
    }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('patient')
            .populate('doctor');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch appointments", error: error.message });
    }
};

// Get appointment by ID
exports.getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate('patient')
            .populate('doctor');
        if (!appointment) return res.status(404).json({ message: "Appointment not found" });
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointment", error: error.message });
    }
};

// Update appointment
exports.updateAppointment = async (req, res) => {
    try {
        const updated = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Appointment not found" });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: "Failed to update", error: error.message });
    }
};

// Delete appointment
exports.deleteAppointment = async (req, res) => {
    try {
        const deleted = await Appointment.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Appointment not found" });
        res.json({ message: "Appointment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete appointment", error: error.message });
    }
};
