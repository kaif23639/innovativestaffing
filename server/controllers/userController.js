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



exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: 'If a user with that email exists, a password reset link has been sent.' });
    }

    const otp = generateOtp(); // Reusing your existing OTP generator
    user.otp = otp;
    user.otpExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minute expiry

    await user.save();

    await sendOtpEmail(user.email, otp); 

    res.json({ message: 'Password reset instructions sent to your email.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid request.' });
    }

    // Check if OTP is valid and not expired
    if (user.otp !== otp || user.otpExpire < new Date()) {
      return res.status(400).json({ msg: 'OTP is invalid or has expired.' });
    }

    // If OTP is valid, update the password
    user.password = password; // The pre-save hook in your User model will hash it
    user.otp = null;          // Invalidate the OTP after use
    user.otpExpire = null;    // Invalidate the OTP after use

    await user.save();
    res.json({ message: 'Password has been reset successfully.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
