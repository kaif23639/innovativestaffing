const User = require("../models/User");
const { sendOtpEmail } = require('../utils/emailService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.requestSignupOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOtp();
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000);

    let user = await User.findOne({ email });
    if (!user) user = new User({ email });

    user.otp = otp;
    user.otpExpire = otpExpire;
    await user.save();

    await sendOtpEmail(email, otp);
    res.json({ message: 'OTP sent to your email' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifySignupOtp = async (req, res) => {
  try {
    const { email, otp, name, password, confirmPassword, age } = req.body;

    if (!password || !confirmPassword) return res.status(400).json({ msg: 'Password and confirm password are required' });
    if (password !== confirmPassword) return res.status(400).json({ msg: 'Passwords do not match' });
    if (age < 18) return res.status(400).json({ msg: 'Must be at least 18 years old' });

    const user = await User.findOne({ email, otp });
    if (!user) return res.status(400).json({ msg: 'Invalid OTP' });
    if (user.otpExpire < new Date()) return res.status(400).json({ msg: 'OTP expired' });

    user.name = name || user.name;
    user.password = password; // will be hashed on save
    user.age = age;
    user.otp = null;
    user.otpExpire = null;
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user._id, email: user.email, name: user.name, isAdmin: user.isAdmin } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user._id, email: user.email, name: user.name, isAdmin: user.isAdmin } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
