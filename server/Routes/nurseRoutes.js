// routes/nurseRoutes.js
const express = require('express');
const router = express.Router();
const {getAllNurses, getNurseById, updateNurse, deleteNurse} = require('../controllers/nurseController');
const { protect, authorize } = require('../middleware/auth');

// Protect all routes and restrict to 'nurse' role
router.use(protect, authorize(['nurse']));

// Example routes
router.get('/', getAllNurses);
router.get('/:id', getNurseById);
router.put('/:id', updateNurse);
router.delete('/:id', deleteNurse);

module.exports = router;
