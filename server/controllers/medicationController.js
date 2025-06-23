const Medication = require('../models/Medication');

// Create a new medication
exports.createMedication = async (req, res) => {
    try {
        const medication = await Medication.create(req.body);
        res.status(201).json(medication);
    } catch (error) {
        res.status(400).json({ message: "Failed to create medication", error: error.message });
    }
};

// Get all medications
exports.getAllMedications = async (req, res) => {
    try {
        const medications = await Medication.find()
            .populate('patient')
            .populate('doctor');
        res.json(medications);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch medications", error: error.message });
    }
};

// Get a single medication by ID
exports.getMedicationById = async (req, res) => {
    try {
        const medication = await Medication.findById(req.params.id)
            .populate('patient')
            .populate('doctor');
        if (!medication) return res.status(404).json({ message: "Medication not found" });
        res.json(medication);
    } catch (error) {
        res.status(500).json({ message: "Error fetching medication", error: error.message });
    }
};

// Update a medication
exports.updateMedication = async (req, res) => {
    try {
        const updated = await Medication.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Medication not found" });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: "Failed to update medication", error: error.message });
    }
};

// Delete a medication
exports.deleteMedication = async (req, res) => {
    try {
        const deleted = await Medication.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Medication not found" });
        res.json({ message: "Medication deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete medication", error: error.message });
    }
};
