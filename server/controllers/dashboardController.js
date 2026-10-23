const Property = require('../models/Property');
const Agent = require('../models/Agent');
const Inquiry = require('../models/Inquiry');
const User = require('../models/User');
const CommunityPost = require('../models/CommunityPost');

// @desc Get overview dashboard metrics
// @route GET /api/dashboard
const getDashboardData = async (req, res) => {
  try {
    const totalProperties = await Property.countDocuments();
    const totalAgents = await Agent.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalInquiries = await Inquiry.countDocuments();
    const totalCommunityPosts = await CommunityPost.countDocuments();

    // User specific stats if authenticated
    let userProperties = [];
    let userInquiries = [];
    let userPosts = [];

    if (req.user) {
      userProperties = await Property.find({ postedBy: req.user._id }).sort({ createdAt: -1 });
      userInquiries = await Inquiry.find({ 
        $or: [
          { sender: req.user._id },
          { property: { $in: userProperties.map(p => p._id) } }
        ]
      })
      .populate('property', 'title location price formattedPrice')
      .sort({ createdAt: -1 });

      userPosts = await CommunityPost.find({ user: req.user._id }).sort({ createdAt: -1 });
    }

    const recentProperties = await Property.find()
      .limit(5)
      .sort({ createdAt: -1 })
      .populate('postedBy', 'name email');

    res.json({
      metrics: {
        totalProperties,
        totalAgents,
        totalUsers,
        totalInquiries,
        totalCommunityPosts
      },
      userProperties,
      userInquiries,
      userPosts,
      recentProperties
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardData };
