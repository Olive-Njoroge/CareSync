// protect.js (middleware)
const jwt = require('jsonwebtoken');

// Middleware: Protect routes by verifying JWT
exports.protect = async (req, res, next) => {
    const auth = req.headers.authorization;

    // Check if token is missing or not in Bearer format
    if(!auth || !auth.startsWith("Bearer ")) {
        return res.status(401).json({message: "No Token Given"});
    };

    //Check if the header is missing or it's not in this format Bearer <token> 
    const token = auth.split(" ")[1];

    //Decoding
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded  // Example: { id, role }
        next();  // Continue to the next middleware or route
    }catch(error){
        return res.status(403).json({message: "Invalid Token"});

    }
};

// Middleware: Authorize specific roles (e.g. admin only)
exports.authorize = (roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) return res.status(403).json({message: "Forbidden"});
        next();
    }
}