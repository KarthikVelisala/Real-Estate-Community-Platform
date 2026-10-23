const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  agencyName: { type: String, required: true },
  reraId: { type: String, required: true }, // e.g., "PRM/KA/RERA/1251/310/AG/210515/002410"
  experienceYears: { type: Number, default: 5 },
  totalDeals: { type: Number, default: 24 },
  specializations: [{ type: String }], // e.g., ['Luxury Apartments', 'Commercial Leasing', 'Plots']
  operatingCities: [{ type: String }], // e.g., ['Mumbai', 'Pune', 'Bengaluru']
  phone: { type: String, required: true },
  email: { type: String, required: true },
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: Number, default: 19 },
  verified: { type: Boolean, default: true },
  bio: { type: String, default: '' },
  avatar: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Agent', agentSchema);
