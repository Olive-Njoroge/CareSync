const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { protect } = require('../middleware/auth');

router.post('/', protect, patientController.createPatient);
router.get('/', protect, patientController.getPatients);
router.get('/:identifier', protect, patientController.findPatient);
router.put('/:id', protect, patientController.updatePatient);
router.delete('/:id', protect, patientController.deletePatient);

module.exports = router;
