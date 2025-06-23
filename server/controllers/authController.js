//JWT and hashing... signup and login
const bcrypt = require('bcryptjs');   //For hashing passwords
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Signup Endpoint Logic
exports.signUp = async (req, res) => {
    try{
        const { email, password, name, phoneNumber, role } = req.body;
        const exists = await User.findOne({email});
        if(exists) return res.status(400).json({Message: "User already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);    //Hashing the password
        const user = await User.create({email, password: hashedPassword, phoneNumber,
            role, name});

        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1h' }); // or '7d' for 7 days for expiresIn
        res.json({token, user: {email: user.email, role: user.role}});

    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//Login Endpoin Logic
exports.logIn = async (req,res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "User does not exist"});

        //Seeing if the password in the db matches with the one being entered
        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(401).json({message: "Incorrect Password"});

        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1h' }); // or '7d' for 7 days for expiresIn
        res.json({ token, user: { email: user.email, role: user.role } });


    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
