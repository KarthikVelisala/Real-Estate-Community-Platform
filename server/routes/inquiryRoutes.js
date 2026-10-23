const express = require('express');
const router = express.Router();
const { createInquiry, getInquiries, updateInquiryStatus } = require('../controllers/inquiryController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(createInquiry)
  .get(protect, getInquiries);

router.route('/:id')
  .put(protect, updateInquiryStatus);

module.exports = router;
