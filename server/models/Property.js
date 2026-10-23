const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  propertyType: { 
    type: String, 
    enum: ['Apartment', 'Villa / House', 'Commercial', 'Plot / Land', 'Penthouse', 'Builder Floor'],
    required: true 
  },
  listingType: { 
    type: String, 
    enum: ['Buy', 'Rent'], 
    required: true 
  },
  price: { type: Number, required: true }, // in INR
  formattedPrice: { type: String, default: '' }, // e.g. "₹ 1.25 Cr" or "₹ 45,000/mo"
  location: {
    city: { type: String, required: true }, // e.g. Mumbai, Bengaluru, Delhi NCR, Kochi
    locality: { type: String, required: true }, // e.g. Bandra West, Indiranagar, South Delhi
    state: { type: String, default: 'India' },
    address: { type: String, default: '' },
    pincode: { type: String, default: '' }
  },
  specs: {
    bedRooms: { type: Number, default: 0 },
    bathRooms: { type: Number, default: 0 },
    areaSqFt: { type: Number, default: 0 },
    bhk: { type: String, default: '' }, // e.g. "2 BHK", "3 BHK"
    furnishing: { type: String, enum: ['Unfurnished', 'Semi-Furnished', 'Fully Furnished'], default: 'Semi-Furnished' },
    floor: { type: String, default: 'G' },
    facing: { type: String, default: 'East' }
  },
  amenities: [{ type: String }],
  images: [{ type: String }],
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  status: { type: String, enum: ['Available', 'Pending', 'Sold', 'Rented'], default: 'Available' },
  featured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', propertySchema);
