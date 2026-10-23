const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  preferredContactMethod: { type: String, enum: ['Call', 'WhatsApp', 'Email'], default: 'WhatsApp' },
  visitDate: { type: String, default: '' },
  status: { type: String, enum: ['Pending', 'Contacted', 'Scheduled', 'Closed'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inquiry', inquirySchema);
