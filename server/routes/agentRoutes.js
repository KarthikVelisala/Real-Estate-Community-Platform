const express = require('express');
const router = express.Router();
const { getAgents, getAgentById, saveAgentProfile, deleteAgent } = require('../controllers/agentController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(getAgents)
  .post(protect, saveAgentProfile);

router.route('/:id')
  .get(getAgentById)
  .delete(protect, authorize('Admin'), deleteAgent);

module.exports = router;
