const express = require('express');
const router = express.Router();
const {
  getCommunityPosts,
  createCommunityPost,
  addComment,
  toggleLikePost
} = require('../controllers/communityController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getCommunityPosts)
  .post(protect, createCommunityPost);

router.post('/:id/comment', protect, addComment);
router.put('/:id/like', protect, toggleLikePost);

module.exports = router;
