const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const adminAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ msg: 'Auth token missing or malformed' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ msg: 'Token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ msg: 'User not found' });
        }
        
        if (!user.isAdmin) {
            return res.status(403).json({ msg: 'Admin access required' });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};

module.exports = adminAuth;