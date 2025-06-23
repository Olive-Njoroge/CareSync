const User = require('../models/User');

// GET: All nurses
exports.getAllNurses = async (req, res) => {
    try {
        const nurses = await User.find({ role: "nurse" });
        res.json(nurses);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch nurses", error: error.message });
    }
};

// GET: Nurse by ID
exports.getNurseById = async (req, res) => {
    try {
        const nurse = await User.findOne({ _id: req.params.id, role: "nurse" });
        if (!nurse) return res.status(404).json({ message: "Nurse not found" });
        res.json(nurse);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch nurse", error: error.message });
    }
};

// UPDATE: Nurse details
exports.updateNurse = async (req, res) => {
    try {
        const nurse = await User.findOneAndUpdate(
            { _id: req.params.id, role: "nurse" },
            req.body,
            { new: true }
        );
        if (!nurse) return res.status(404).json({ message: "Nurse not found" });
        res.json(nurse);
    } catch (error) {
        res.status(400).json({ message: "Failed to update nurse", error: error.message });
    }
};

// DELETE: Remove a nurse
exports.deleteNurse = async (req, res) => {
    try {
        const nurse = await User.findOneAndDelete({ _id: req.params.id, role: "nurse" });
        if (!nurse) return res.status(404).json({ message: "Nurse not found" });
        res.json({ message: "Nurse deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete nurse", error: error.message });
    }
};
