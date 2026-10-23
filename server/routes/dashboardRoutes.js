const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

// Optional protect middleware so public users can also view aggregated stats
router.get('/', (req, res, next) => {
  if (req.headers.authorization) {
    return protect(req, res, next);
  }
  next();
}, getDashboardData);

module.exports = router;
