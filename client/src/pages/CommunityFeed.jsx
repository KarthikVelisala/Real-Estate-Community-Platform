import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import CommunityPostCard from '../components/CommunityPostCard';
import { MessageSquare, PlusCircle, Filter, Sparkles, Send } from 'lucide-react';

const CommunityFeed = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filterType, setFilterType] = useState('All');
  const [filterCity, setFilterCity] = useState('All');

  // Create Post Modal State
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    type: 'Requirement Request',
    category: 'Residential',
    city: user?.city || 'Mumbai',
    budget: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let url = '/api/community?';
      if (filterType !== 'All') url += `type=${encodeURIComponent(filterType)}&`;
      if (filterCity !== 'All') url += `city=${encodeURIComponent(filterCity)}&`;

      const { data } = await axios.get(url);
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [filterType, filterCity]);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!user) return alert('Please login to post buy/rent requests!');
    setSubmitting(true);

    try {
      await axios.post('/api/community', newPost);
      setShowCreateForm(false);
      setNewPost({
        title: '',
        content: '',
        type: 'Requirement Request',
        category: 'Residential',
        city: user?.city || 'Mumbai',
        budget: ''
      });
      fetchPosts();
    } catch (err) {
      alert(err.response?.data?.message || 'Error posting to community feed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-4">
      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <span className="badge bg-primary text-white font-bold px-3 py-1 rounded-pill mb-2">
            OPEN COMMUNITY HUB
          </span>
          <h2 className="fw-extrabold text-dark mb-1">Buyer Requests & Community Feed</h2>
          <p className="text-muted mb-0">Post requirements, ask advice, or interact directly with property owners & agents</p>
        </div>

        <button 
          onClick={() => setShowCreateForm(!showCreateForm)} 
          className="btn btn-accent fw-bold d-flex align-items-center gap-2 mt-3 mt-md-0"
        >
          <PlusCircle size={18} /> Post Requirement / Request
        </button>
      </div>

      {/* New Post Form Drawer / Modal */}
      {showCreateForm && (
        <div className="card glass-card border-0 p-4 mb-4 shadow-lg border-start border-4 border-warning">
          <h5 className="fw-bold text-dark mb-3">Create Community Post or Requirement</h5>
          <form onSubmit={handleCreatePost}>
            <div className="mb-3">
              <label className="form-label small fw-bold">Post Title</label>
              <input 
                type="text" 
                className="form-control custom-input" 
                placeholder="e.g. Looking for 2 BHK Flat near Infopark Kakkanad or Cyber City" 
                value={newPost.title} 
                onChange={e => setNewPost({ ...newPost, title: e.target.value })} 
                required 
              />
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <label className="form-label small fw-bold">Post Type</label>
                <select 
                  className="form-select custom-input"
                  value={newPost.type}
                  onChange={e => setNewPost({ ...newPost, type: e.target.value })}
                >
                  <option value="Requirement Request">Requirement Request</option>
                  <option value="Property Advice">Property Advice</option>
                  <option value="Market Discussion">Market Discussion</option>
                  <option value="Agent Interaction">Agent Interaction</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-bold">City</label>
                <select 
                  className="form-select custom-input"
                  value={newPost.city}
                  onChange={e => setNewPost({ ...newPost, city: e.target.value })}
                >
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Kochi">Kochi</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-bold">Target Budget (Optional)</label>
                <input 
                  type="text" 
                  className="form-control custom-input" 
                  placeholder="e.g. ₹ 50k/mo or ₹ 80 Lakhs" 
                  value={newPost.budget} 
                  onChange={e => setNewPost({ ...newPost, budget: e.target.value })} 
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">Detailed Request / Question</label>
              <textarea 
                className="form-control custom-input" 
                rows="3" 
                placeholder="Describe preferred locality, possession timeline, amenities desired..." 
                value={newPost.content} 
                onChange={e => setNewPost({ ...newPost, content: e.target.value })} 
                required 
              ></textarea>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button type="button" onClick={() => setShowCreateForm(false)} className="btn btn-light btn-sm">Cancel</button>
              <button type="submit" className="btn btn-accent btn-sm px-4 fw-bold" disabled={submitting}>
                {submitting ? 'Publishing...' : 'Publish Request'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="card glass-card border-0 p-3 mb-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div className="d-flex flex-wrap gap-2">
            {['All', 'Requirement Request', 'Property Advice', 'Market Discussion'].map(t => (
              <button 
                key={t} 
                onClick={() => setFilterType(t)} 
                className={`btn btn-sm ${filterType === t ? 'btn-navy fw-bold' : 'btn-light border'}`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="d-flex align-items-center gap-2">
            <span className="small text-muted fw-bold">City:</span>
            <select 
              className="form-select form-select-sm custom-input w-auto"
              value={filterCity}
              onChange={e => setFilterCity(e.target.value)}
            >
              <option value="All">All Cities</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Kochi">Kochi</option>
              <option value="Chennai">Chennai</option>
            </select>
          </div>
        </div>
      </div>

      {/* Posts List */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status"></div>
          <p className="text-muted mt-2">Loading community requests...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-4 border p-4">
          <MessageSquare size={48} className="text-muted mb-3" />
          <h4 className="fw-bold text-dark">No Community Posts Found</h4>
          <p className="text-muted">Be the first to post a property requirement or question!</p>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {posts.map(post => (
              <CommunityPostCard key={post._id} post={post} onPostUpdated={fetchPosts} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityFeed;
