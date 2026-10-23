const Agent = require('../models/Agent');
const Property = require('../models/Property');

// @desc Get all agents
// @route GET /api/agent
const getAgents = async (req, res) => {
  try {
    const { city, search } = req.query;
    let query = {};

    if (city && city !== 'All') {
      query.operatingCities = new RegExp(city, 'i');
    }

    if (search) {
      query.$or = [
        { agencyName: new RegExp(search, 'i') },
        { bio: new RegExp(search, 'i') },
        { reraId: new RegExp(search, 'i') }
      ];
    }

    const agents = await Agent.find(query).populate('user', 'name email phone avatar city');
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get agent details & properties
// @route GET /api/agent/:id
const getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id).populate('user', 'name email phone avatar city');
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    const properties = await Property.find({ agent: agent._id });
    res.json({ agent, properties });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create or update Agent Profile
// @route POST /api/agent
const saveAgentProfile = async (req, res) => {
  try {
    const { agencyName, reraId, experienceYears, specializations, operatingCities, phone, bio } = req.body;

    let agent = await Agent.findOne({ user: req.user._id });

    if (agent) {
      agent.agencyName = agencyName || agent.agencyName;
      agent.reraId = reraId || agent.reraId;
      agent.experienceYears = experienceYears || agent.experienceYears;
      agent.specializations = specializations || agent.specializations;
      agent.operatingCities = operatingCities || agent.operatingCities;
      agent.phone = phone || agent.phone;
      agent.bio = bio || agent.bio;
      await agent.save();
    } else {
      agent = await Agent.create({
        user: req.user._id,
        agencyName: agencyName || `${req.user.name} Realty`,
        reraId: reraId || `RERA/IND/${Math.floor(100000 + Math.random() * 900000)}`,
        experienceYears: experienceYears || 3,
        specializations: specializations || ['Residential', 'Commercial'],
        operatingCities: operatingCities || [req.user.city || 'Mumbai'],
        phone: phone || req.user.phone || '9876543210',
        email: req.user.email,
        bio: bio || ''
      });
    }

    res.json(agent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete Agent (Admin only)
// @route DELETE /api/agent/:id
const deleteAgent = async (req, res) => {
  try {
    await Agent.findByIdAndDelete(req.params.id);
    res.json({ message: 'Agent removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAgents,
  getAgentById,
  saveAgentProfile,
  deleteAgent
};
