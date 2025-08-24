const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust path if needed

const adminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: 'Auth token missing' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'Token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ msg: 'User not found' });
    if (!user.isAdmin) return res.status(401).json({ msg: 'Admin access required' });

    req.user = user; // Attach user info to request
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

module.exports = adminAuth;
