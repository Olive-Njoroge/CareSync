const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationController');
const { protect, authorize } = require('../middleware/auth');

// Protect all medication routes (e.g. for nurses or doctors)
router.use(protect, authorize(['doctor', 'nurse']));

// CRUD routes
router.post('/', medicationController.createMedication);
router.get('/', medicationController.getAllMedications);
router.get('/:id', medicationController.getMedicationById);
router.put('/:id', medicationController.updateMedication);
router.delete('/:id', medicationController.deleteMedication);

module.exports = router;
