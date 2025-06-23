const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/protect');

router.use(protect, authorize('admin'));

router.get('/dashboard', adminController.getDashboardStats);
router.get('/users/:role', adminController.getUsersByRole);
router.delete('/user/:id', adminController.deleteUser);
router.get('/appointments/:status', adminController.getAppointmentsByStatus);

module.exports = router;
