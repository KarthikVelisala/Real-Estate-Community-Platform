const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  userRole: { type: String, default: 'Buyer/Renter' },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const communityPostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  userRole: { type: String, default: 'Buyer/Renter' },
  userAvatar: { type: String, default: '' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['Requirement Request', 'Property Advice', 'Market Discussion', 'Agent Interaction'],
    default: 'Requirement Request'
  },
  category: { type: String, default: 'General' },
  city: { type: String, default: 'Mumbai' },
  budget: { type: String, default: '' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CommunityPost', communityPostSchema);
