import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Building2, UserPlus, Mail, Lock, User, Phone, MapPin, Shield } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Buyer/Renter',
    phone: '',
    city: 'Mumbai',
    agencyName: '',
    reraId: ''
  });
  const [error, setError] = useState('');
  const { register, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await register(formData);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card glass-card border-0 p-4 shadow-lg rounded-4">
            <div className="text-center mb-4">
              <div className="bg-warning text-dark p-3 rounded-circle d-inline-flex mb-2">
                <Building2 size={32} />
              </div>
              <h3 className="fw-extrabold text-dark">Create Account</h3>
              <p className="text-muted small">Join India's leading real estate community</p>
            </div>

            {error && <div className="alert alert-danger py-2 small">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Select Your Role</label>
                <div className="d-flex gap-2">
                  {['Buyer/Renter', 'Agent', 'Admin'].map(r => (
                    <button
                      key={r}
                      type="button"
                      className={`btn flex-fill py-2 btn-sm fw-bold ${formData.role === r ? 'btn-navy' : 'btn-outline-secondary'}`}
                      onClick={() => setFormData({ ...formData, role: r })}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Full Name</label>
                <input 
                  type="text" 
                  className="form-control custom-input" 
                  placeholder="Jovan K Thomas" 
                  value={formData.name} 
                  onChange={e => setFormData({ ...formData, name: e.target.value })} 
                  required 
                />
              </div>

              <div className="row g-2 mb-3">
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Email Address</label>
                  <input 
                    type="email" 
                    className="form-control custom-input" 
                    placeholder="user@example.in" 
                    value={formData.email} 
                    onChange={e => setFormData({ ...formData, email: e.target.value })} 
                    required 
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Password</label>
                  <input 
                    type="password" 
                    className="form-control custom-input" 
                    placeholder="••••••••" 
                    value={formData.password} 
                    onChange={e => setFormData({ ...formData, password: e.target.value })} 
                    required 
                  />
                </div>
              </div>

              <div className="row g-2 mb-3">
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Mobile Number</label>
                  <input 
                    type="tel" 
                    className="form-control custom-input" 
                    placeholder="+91 98765 43210" 
                    value={formData.phone} 
                    onChange={e => setFormData({ ...formData, phone: e.target.value })} 
                    required 
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">City</label>
                  <select 
                    className="form-select custom-input"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                  >
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Kochi">Kochi</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                  </select>
                </div>
              </div>

              {formData.role === 'Agent' && (
                <div className="p-3 bg-warning bg-opacity-10 border border-warning rounded-3 mb-3">
                  <h6 className="fw-bold text-dark mb-2 small d-flex align-items-center gap-1">
                    <Shield size={16} className="text-warning" /> Agent Registration Details
                  </h6>
                  <div className="row g-2">
                    <div className="col-md-6">
                      <input 
                        type="text" 
                        className="form-control custom-input" 
                        placeholder="Agency Name" 
                        value={formData.agencyName} 
                        onChange={e => setFormData({ ...formData, agencyName: e.target.value })} 
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <input 
                        type="text" 
                        className="form-control custom-input" 
                        placeholder="RERA Registration No." 
                        value={formData.reraId} 
                        onChange={e => setFormData({ ...formData, reraId: e.target.value })} 
                        required 
                      />
                    </div>
                  </div>
                </div>
              )}

              <button type="submit" className="btn btn-accent w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2 mb-3" disabled={loading}>
                <UserPlus size={18} /> {loading ? 'Registering...' : 'Complete Registration'}
              </button>
            </form>

            <div className="text-center mt-3">
              <p className="text-muted small mb-0">
                Already registered? <Link to="/login" className="text-warning fw-bold">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
