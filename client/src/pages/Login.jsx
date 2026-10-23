import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Building2, LogIn, Lock, Mail, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message);
    }
  };

  const handleQuickDemoUser = async (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password123');
    const res = await login(demoEmail, 'password123');
    if (res.success) navigate('/dashboard');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card glass-card border-0 p-4 shadow-lg rounded-4">
            <div className="text-center mb-4">
              <div className="bg-warning text-dark p-3 rounded-circle d-inline-flex mb-2">
                <Building2 size={32} />
              </div>
              <h3 className="fw-extrabold text-dark">Welcome Back</h3>
              <p className="text-muted small">Sign in to your GharDekho India account</p>
            </div>

            {error && <div className="alert alert-danger py-2 small">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0"><Mail size={16} className="text-muted" /></span>
                  <input 
                    type="email" 
                    className="form-control custom-input border-start-0" 
                    placeholder="name@example.com" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-semibold">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0"><Lock size={16} className="text-muted" /></span>
                  <input 
                    type="password" 
                    className="form-control custom-input border-start-0" 
                    placeholder="••••••••" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-navy w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2 mb-3" disabled={loading}>
                <LogIn size={18} /> {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Quick Demo Accounts */}
            <div className="border-top pt-3 mt-2">
              <small className="text-muted fw-bold d-block mb-2">One-Click Demo Accounts:</small>
              <div className="d-flex flex-column gap-2">
                <button onClick={() => handleQuickDemoUser('admin@realestate.in')} className="btn btn-outline-danger btn-sm text-start">
                  👑 Demo Admin (Jovan K Thomas)
                </button>
                <button onClick={() => handleQuickDemoUser('rajesh.sharma@mumbairealty.in')} className="btn btn-outline-primary btn-sm text-start">
                  🏢 Demo Agent (Rajesh Sharma - Mumbai)
                </button>
                <button onClick={() => handleQuickDemoUser('rohan.v@gmail.com')} className="btn btn-outline-success btn-sm text-start">
                  👤 Demo Buyer (Rohan Verma - Delhi)
                </button>
              </div>
            </div>

            <div className="text-center mt-4">
              <p className="text-muted small mb-0">
                Don't have an account? <Link to="/register" className="text-warning fw-bold">Register Now</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
