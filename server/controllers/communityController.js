const CommunityPost = require('../models/CommunityPost');

// @desc Get all community posts/requests with filtering
// @route GET /api/community
const getCommunityPosts = async (req, res) => {
  try {
    const { type, city, category, search } = req.query;
    let query = {};

    if (type && type !== 'All') {
      query.type = type;
    }

    if (city && city !== 'All') {
      query.city = new RegExp(city, 'i');
    }

    if (category && category !== 'All') {
      query.category = new RegExp(category, 'i');
    }

    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { content: new RegExp(search, 'i') }
      ];
    }

    const posts = await CommunityPost.find(query).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create a new community post or buy/rent requirement
// @route POST /api/community
const createCommunityPost = async (req, res) => {
  try {
    const { title, content, type, category, city, budget } = req.body;

    const post = await CommunityPost.create({
      user: req.user._id,
      userName: req.user.name,
      userRole: req.user.role,
      userAvatar: req.user.avatar || '',
      title,
      content,
      type: type || 'Requirement Request',
      category: category || 'Residential',
      city: city || req.user.city || 'Mumbai',
      budget: budget || ''
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Add comment to a post
// @route POST /api/community/:id/comment
const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await CommunityPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = {
      user: req.user._id,
      userName: req.user.name,
      userRole: req.user.role,
      content
    };

    post.comments.push(comment);
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Toggle Like on a post
// @route PUT /api/community/:id/like
const toggleLikePost = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const index = post.likes.indexOf(req.user._id);
    if (index === -1) {
      post.likes.push(req.user._id);
    } else {
      post.likes.splice(index, 1);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCommunityPosts,
  createCommunityPost,
  addComment,
  toggleLikePost
};
