require('dotenv').config();
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    const tokenString = token.replace('Bearer ', '');

    jwt.verify(tokenString, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = decoded; // Attach the user information to the request
        next();
    });
};


module.exports = authMiddleware;
