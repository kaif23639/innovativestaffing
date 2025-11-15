const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;