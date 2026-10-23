const Inquiry = require('../models/Inquiry');
const Property = require('../models/Property');
const Notification = require('../models/Notification');

// @desc Create inquiry for a property
// @route POST /api/inquiry
const createInquiry = async (req, res) => {
  try {
    const { propertyId, name, email, phone, message, preferredContactMethod, visitDate } = req.body;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const inquiry = await Inquiry.create({
      property: propertyId,
      sender: req.user ? req.user._id : null,
      agent: property.agent || null,
      name,
      email,
      phone,
      message,
      preferredContactMethod: preferredContactMethod || 'WhatsApp',
      visitDate: visitDate || ''
    });

    // Create notification for property owner / agent if logged in user exists
    if (property.postedBy) {
      await Notification.create({
        user: property.postedBy,
        title: 'New Property Inquiry Received',
        message: `${name} sent an inquiry for "${property.title}"`,
        link: '/dashboard'
      });
    }

    res.status(201).json(inquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get inquiries for logged-in user (as buyer or seller/agent)
// @route GET /api/inquiry
const getInquiries = async (req, res) => {
  try {
    let inquiries;
    if (req.user.role === 'Agent' || req.user.role === 'Admin') {
      // Get inquiries for properties posted by or assigned to agent
      const properties = await Property.find({ postedBy: req.user._id });
      const propIds = properties.map(p => p._id);
      inquiries = await Inquiry.find({
        $or: [
          { property: { $in: propIds } },
          { sender: req.user._id }
        ]
      })
      .populate('property', 'title location formattedPrice images')
      .populate('sender', 'name email phone')
      .sort({ createdAt: -1 });
    } else {
      // Get inquiries sent by buyer
      inquiries = await Inquiry.find({ sender: req.user._id })
        .populate('property', 'title location formattedPrice images')
        .sort({ createdAt: -1 });
    }

    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update inquiry status
// @route PUT /api/inquiry/:id
const updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    inquiry.status = status || inquiry.status;
    await inquiry.save();
    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createInquiry, getInquiries, updateInquiryStatus };
