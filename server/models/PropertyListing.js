const mongoose = require('mongoose');

const propertyListingSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  listingTitle: { type: String, required: true },
  listingType: { type: String, enum: ['Featured', 'Standard', 'Premium'], default: 'Standard' },
  status: { type: String, enum: ['Active', 'Draft', 'Archived'], default: 'Active' },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PropertyListing', propertyListingSchema);
