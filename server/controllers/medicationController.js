const MedicationReminder = require('../models/MedicationReminder');

// Create a new medication reminder
exports.createReminder = async (req, res) => {
    try {
        const reminder = await MedicationReminder.create(req.body);
        res.status(201).json(reminder);
    } catch (error) {
        res.status(400).json({ message: "Failed to create reminder", error: error.message });
    }
};

// Get all medication reminders
exports.getAllReminders = async (req, res) => {
    try {
        const reminders = await MedicationReminder.find()
            .populate('patient')
            .populate('doctor');
        res.json(reminders);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch reminders", error: error.message });
    }
};

// Get a single medication reminder by ID
exports.getReminderById = async (req, res) => {
    try {
        const reminder = await MedicationReminder.findById(req.params.id)
            .populate('patient')
            .populate('doctor');
        if (!reminder) return res.status(404).json({ message: "Reminder not found" });
        res.json(reminder);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reminder", error: error.message });
    }
};

// Update a medication reminder
exports.updateReminder = async (req, res) => {
    try {
        const updated = await MedicationReminder.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Reminder not found" });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: "Failed to update reminder", error: error.message });
    }
};

// Delete a medication reminder
exports.deleteReminder = async (req, res) => {
    try {
        const deleted = await MedicationReminder.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Reminder not found" });
        res.json({ message: "Reminder deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete reminder", error: error.message });
    }
};
