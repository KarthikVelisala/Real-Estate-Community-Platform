import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import PropertyCard from '../components/PropertyCard';
import { 
  Building2, Users, MessageSquare, Mail, Shield, PlusCircle, 
  TrendingUp, CheckCircle, Trash2, Edit3, User, Bell, Clock 
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/dashboard');
      setDashboardData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleDeleteProperty = async (propId) => {
    if (!window.confirm('Are you sure you want to delete this property listing?')) return;
    try {
      await axios.delete(`/api/property/${propId}`);
      fetchDashboard();
    } catch (err) {
      alert('Failed to delete property.');
    }
  };

  const handleUpdateInquiryStatus = async (inquiryId, newStatus) => {
    try {
      await axios.put(`/api/inquiry/${inquiryId}`, { status: newStatus });
      fetchDashboard();
    } catch (err) {
      alert('Failed to update inquiry status');
    }
  };

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <h4>Please Log In to Access Your Dashboard</h4>
        <button onClick={() => navigate('/login')} className="btn btn-accent mt-2">Go to Login</button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-5 container">
        <div className="spinner-border text-warning" role="status"></div>
        <p className="text-muted mt-2">Loading your real estate dashboard...</p>
      </div>
    );
  }

  const metrics = dashboardData?.metrics || {};
  const userProperties = dashboardData?.userProperties || [];
  const userInquiries = dashboardData?.userInquiries || [];
  const userPosts = dashboardData?.userPosts || [];

  return (
    <div className="container py-4">
      {/* Profile Welcome Banner */}
      <div className="card glass-card border-0 p-4 mb-4 bg-gradient-hero text-white position-relative overflow-hidden">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center position-relative z-2">
          <div className="d-flex align-items-center gap-3 mb-3 mb-md-0">
            <div className="bg-warning text-dark p-3 rounded-circle fw-bold fs-4 d-flex align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <h3 className="fw-extrabold mb-0 text-white">{user.name}</h3>
                <span className="badge bg-warning text-dark fw-bold">{user.role}</span>
              </div>
              <p className="text-light opacity-80 small mb-0">
                {user.email} • {user.phone || 'No phone set'} • Location: <strong>{user.city}</strong>
              </p>
            </div>
          </div>

          <Link to="/add-property" className="btn btn-accent fw-bold d-flex align-items-center gap-2">
            <PlusCircle size={18} /> Post New Listing
          </Link>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="row g-3 mb-4">
        <div className="col-md-3 col-6">
          <div className="stat-box">
            <small className="text-muted fw-bold text-uppercase d-block mb-1" style={{ fontSize: '0.7rem' }}>Total Platform Properties</small>
            <div className="d-flex align-items-center justify-content-between">
              <h3 className="fw-extrabold text-dark mb-0">{metrics.totalProperties || 0}</h3>
              <Building2 className="text-warning" size={28} />
            </div>
          </div>
        </div>

        <div className="col-md-3 col-6">
          <div className="stat-box">
            <small className="text-muted fw-bold text-uppercase d-block mb-1" style={{ fontSize: '0.7rem' }}>RERA Agents</small>
            <div className="d-flex align-items-center justify-content-between">
              <h3 className="fw-extrabold text-dark mb-0">{metrics.totalAgents || 0}</h3>
              <Users className="text-primary" size={28} />
            </div>
          </div>
        </div>

        <div className="col-md-3 col-6">
          <div className="stat-box">
            <small className="text-muted fw-bold text-uppercase d-block mb-1" style={{ fontSize: '0.7rem' }}>Inquiries Received/Sent</small>
            <div className="d-flex align-items-center justify-content-between">
              <h3 className="fw-extrabold text-dark mb-0">{userInquiries.length}</h3>
              <Mail className="text-success" size={28} />
            </div>
          </div>
        </div>

        <div className="col-md-3 col-6">
          <div className="stat-box">
            <small className="text-muted fw-bold text-uppercase d-block mb-1" style={{ fontSize: '0.7rem' }}>Community Posts</small>
            <div className="d-flex align-items-center justify-content-between">
              <h3 className="fw-extrabold text-dark mb-0">{userPosts.length}</h3>
              <MessageSquare className="text-info" size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs border-bottom mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link fw-bold ${activeTab === 'overview' ? 'active text-warning border-warning' : 'text-muted'}`}
            onClick={() => setActiveTab('overview')}
          >
            My Properties ({userProperties.length})
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link fw-bold ${activeTab === 'inquiries' ? 'active text-warning border-warning' : 'text-muted'}`}
            onClick={() => setActiveTab('inquiries')}
          >
            Inquiries & Leads ({userInquiries.length})
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link fw-bold ${activeTab === 'posts' ? 'active text-warning border-warning' : 'text-muted'}`}
            onClick={() => setActiveTab('posts')}
          >
            My Community Posts ({userPosts.length})
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div>
          {userProperties.length === 0 ? (
            <div className="text-center py-5 bg-white rounded-4 border p-4">
              <Building2 size={48} className="text-muted mb-3" />
              <h5 className="fw-bold text-dark">You haven't listed any properties yet</h5>
              <p className="text-muted">Start by posting your first residential or commercial listing.</p>
              <Link to="/add-property" className="btn btn-accent btn-sm">Post Property Now</Link>
            </div>
          ) : (
            <div className="row g-4">
              {userProperties.map(prop => (
                <div className="col-lg-4 col-md-6" key={prop._id}>
                  <div className="card glass-card border-0 h-100 p-3 position-relative">
                    <img 
                      src={prop.images && prop.images.length > 0 ? prop.images[0] : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'} 
                      alt={prop.title} 
                      className="rounded-3 mb-3 object-fit-cover" 
                      style={{ height: '180px', width: '100%' }}
                    />
                    <h6 className="fw-bold text-dark text-truncate">{prop.title}</h6>
                    <small className="text-muted mb-2 d-block">{prop.location?.city} • {prop.formattedPrice}</small>
                    
                    <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
                      <span className="badge bg-success bg-opacity-10 text-success">{prop.status}</span>
                      <div className="d-flex gap-2">
                        <Link to={`/properties/${prop._id}`} className="btn btn-light btn-sm">View</Link>
                        <button onClick={() => handleDeleteProperty(prop._id)} className="btn btn-outline-danger btn-sm">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'inquiries' && (
        <div className="card glass-card border-0 p-4">
          <h5 className="fw-bold text-dark mb-3">Property Inquiries & Buyer Messages</h5>
          {userInquiries.length === 0 ? (
            <p className="text-muted">No inquiries received or submitted yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Property</th>
                    <th>Inquirer / Lead</th>
                    <th>Contact Info</th>
                    <th>Preferred Method</th>
                    <th>Visit Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userInquiries.map(inq => (
                    <tr key={inq._id}>
                      <td className="fw-bold text-dark">{inq.property?.title || 'Property'}</td>
                      <td>{inq.name}</td>
                      <td className="small text-muted">{inq.phone}<br/>{inq.email}</td>
                      <td><span className="badge bg-light text-dark border">{inq.preferredContactMethod}</span></td>
                      <td>{inq.visitDate || 'Flexible'}</td>
                      <td>
                        <span className={`badge ${inq.status === 'Pending' ? 'bg-warning text-dark' : inq.status === 'Contacted' ? 'bg-primary' : 'bg-success'}`}>
                          {inq.status}
                        </span>
                      </td>
                      <td>
                        <select 
                          className="form-select form-select-sm custom-input w-auto"
                          value={inq.status}
                          onChange={e => handleUpdateInquiryStatus(inq._id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Scheduled">Scheduled</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'posts' && (
        <div className="card glass-card border-0 p-4">
          <h5 className="fw-bold text-dark mb-3">Your Community Requirements & Advice Posts</h5>
          {userPosts.length === 0 ? (
            <p className="text-muted">You haven't posted any community questions or buyer requests.</p>
          ) : (
            <div className="d-flex flex-column gap-3">
              {userPosts.map(p => (
                <div key={p._id} className="p-3 bg-light rounded-3 border">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <h6 className="fw-bold text-dark mb-0">{p.title}</h6>
                    <span className="badge bg-warning text-dark">{p.type}</span>
                  </div>
                  <p className="text-secondary small mb-2">{p.content}</p>
                  <small className="text-muted">Posted in {p.city} • {p.comments?.length || 0} Responses</small>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
