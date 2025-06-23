const User = require('../models/User');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');

// Dashboard Stats
exports.getDashboardStats = async (req, res) => {
    try {
        const totalPatients = await Patient.countDocuments();
        const totalAppointments = await Appointment.countDocuments();
        const totalDoctors = await User.countDocuments({ role: 'doctor' });
        const totalNurses = await User.countDocuments({ role: 'nurse' });
        const totalAdmins = await User.countDocuments({ role: 'admin' });

        const upcomingAppointments = await Appointment.countDocuments({ appointmentDate: { $gte: new Date() } });
        const pastAppointments = await Appointment.countDocuments({ appointmentDate: { $lt: new Date() } });

        res.json({
            totalPatients,
            totalAppointments,
            totalDoctors,
            totalNurses,
            totalAdmins,
            upcomingAppointments,
            pastAppointments
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch dashboard stats", error: error.message });
    }
};

// Get all users with specific roles (doctor or nurse)
exports.getUsersByRole = async (req, res) => {
    const { role } = req.params;
    try {
        const users = await User.find({ role });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: `Failed to fetch ${role}s`, error: error.message });
    }
};

// Delete a doctor or nurse
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user", error: error.message });
    }
};

// Get appointments by status (e.g. completed, missed, cancelled)
exports.getAppointmentsByStatus = async (req, res) => {
    const { status } = req.params;
    try {
        const appointments = await Appointment.find({ status }).populate('patient doctor');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch appointments", error: error.message });
    }
};
