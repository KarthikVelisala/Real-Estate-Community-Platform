import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { ThumbsUp, MessageSquare, MapPin, Tag, UserCheck, Send } from 'lucide-react';

const CommunityPostCard = ({ post, onPostUpdated }) => {
  const { user } = useContext(AuthContext);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [loadingComment, setLoadingComment] = useState(false);

  const isLiked = user && post.likes?.includes(user._id);

  const handleLike = async () => {
    if (!user) return alert('Please login to like posts!');
    try {
      await axios.put(`/api/community/${post._id}/like`);
      if (onPostUpdated) onPostUpdated();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (!user) return alert('Please login to comment!');

    setLoadingComment(true);
    try {
      await axios.post(`/api/community/${post._id}/comment`, { content: commentText });
      setCommentText('');
      if (onPostUpdated) onPostUpdated();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingComment(false);
    }
  };

  return (
    <div className="card glass-card border-0 mb-4 p-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-3">
          <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-circle fw-bold d-flex align-items-center justify-content-center" style={{ width: 44, height: 44 }}>
            {post.userName ? post.userName.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <div className="d-flex align-items-center gap-2">
              <h6 className="fw-bold mb-0 text-dark">{post.userName}</h6>
              <span className={`badge ${post.userRole === 'Agent' ? 'bg-primary' : 'bg-secondary'} bg-opacity-75 text-white`} style={{ fontSize: '0.7rem' }}>
                {post.userRole}
              </span>
            </div>
            <small className="text-muted" style={{ fontSize: '0.75rem' }}>
              Posted in {post.city} • {new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </small>
          </div>
        </div>

        <span className="badge bg-warning bg-opacity-20 text-dark border border-warning fw-semibold px-3 py-2">
          {post.type}
        </span>
      </div>

      <h5 className="fw-bold text-dark mb-2">{post.title}</h5>
      <p className="text-secondary mb-3">{post.content}</p>

      <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
        {post.budget && (
          <span className="badge bg-success bg-opacity-10 text-success border border-success fw-semibold px-2 py-1">
            Budget: {post.budget}
          </span>
        )}
        <span className="badge bg-light text-dark border px-2 py-1 d-flex align-items-center gap-1">
          <MapPin size={12} className="text-danger" /> {post.city}
        </span>
        <span className="badge bg-light text-dark border px-2 py-1 d-flex align-items-center gap-1">
          <Tag size={12} className="text-warning" /> {post.category || 'General'}
        </span>
      </div>

      <div className="d-flex align-items-center gap-3 pt-3 border-top">
        <button 
          onClick={handleLike} 
          className={`btn btn-sm ${isLiked ? 'btn-primary' : 'btn-light'} d-flex align-items-center gap-1 fw-semibold`}
        >
          <ThumbsUp size={14} /> {post.likes?.length || 0} Likes
        </button>

        <button 
          onClick={() => setShowCommentInput(!showCommentInput)} 
          className="btn btn-light btn-sm d-flex align-items-center gap-1 fw-semibold text-secondary"
        >
          <MessageSquare size={14} /> {post.comments?.length || 0} Answers / Comments
        </button>
      </div>

      {/* Comments List */}
      {post.comments && post.comments.length > 0 && (
        <div className="mt-3 bg-light p-3 rounded-3">
          <h6 className="fw-bold text-dark mb-2 small">Responses ({post.comments.length})</h6>
          {post.comments.map((comment, i) => (
            <div key={i} className="mb-2 pb-2 border-bottom border-secondary border-opacity-10 last-no-border">
              <div className="d-flex align-items-center justify-content-between mb-1">
                <span className="fw-bold text-dark small">{comment.userName}</span>
                <span className="badge bg-secondary bg-opacity-10 text-dark" style={{ fontSize: '0.65rem' }}>{comment.userRole}</span>
              </div>
              <p className="text-secondary small mb-0">{comment.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* Add Comment Input */}
      {showCommentInput && (
        <form onSubmit={handleAddComment} className="mt-3 d-flex gap-2">
          <input 
            type="text" 
            className="form-control custom-input form-control-sm" 
            placeholder="Write a response or offer property recommendation..." 
            value={commentText} 
            onChange={e => setCommentText(e.target.value)} 
            required 
          />
          <button type="submit" className="btn btn-accent btn-sm d-flex align-items-center gap-1" disabled={loadingComment}>
            <Send size={14} /> Reply
          </button>
        </form>
      )}
    </div>
  );
};

export default CommunityPostCard;
