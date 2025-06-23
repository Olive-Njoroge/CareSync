require("dotenv").config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();   //app
connectDB();    //connected mongoDB

//middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./Routes/authRouters'));
app.use('/api/patients', require('./Routes/patientRoutes'));
app.use('/api/doctors', require('./Routes/doctorRoutes'));
app.use('/api/nurses', require('./Routes/nurseRoutes'));
app.use('/api/medications', require('./Routes/medicationRoutes'));
app.use('/api/appointments', require('./Routes/appointmentRoutes'));
app.use('/api/admin', require('./Routes/adminRoutes'));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
