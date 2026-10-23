const User = require('../models/User');
const Agent = require('../models/Agent');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', { expiresIn: '30d' });
};

// @desc Register User
// @route POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, city, agencyName, reraId } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'Buyer/Renter',
      phone: phone || '',
      city: city || 'Mumbai'
    });

    if (user.role === 'Agent') {
      await Agent.create({
        user: user._id,
        agencyName: agencyName || `${name} Real Estate Consultancy`,
        reraId: reraId || `RERA/IND/${Math.floor(100000 + Math.random() * 900000)}`,
        phone: phone || '9876543210',
        email: email,
        operatingCities: [city || 'Mumbai']
      });
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      city: user.city,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Login User
// @route POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        city: user.city,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get Current Profile
// @route GET /api/auth/profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    let agentDetails = null;
    if (user.role === 'Agent') {
      agentDetails = await Agent.findOne({ user: user._id });
    }
    res.json({ user, agentDetails });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
