import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Building2, Home, Users, MessageSquare, PlusCircle, LayoutDashboard, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-white border-bottom shadow-sm py-2">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 font-weight-bold text-decoration-none">
          <div className="bg-warning text-dark p-2 rounded-3 d-flex align-items-center justify-content-center">
            <Building2 className="text-dark" size={24} />
          </div>
          <div>
            <span className="fw-bold fs-4 text-dark tracking-tight">GharDekho</span>
            <span className="badge bg-warning text-dark ms-2 fw-semibold fs-7">INDIA</span>
          </div>
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-1">
            <li className="nav-item">
              <Link to="/" className={`nav-link-custom ${isActive('/')}`}>
                <Home size={18} className="me-1" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/properties" className={`nav-link-custom ${isActive('/properties')}`}>
                <Building2 size={18} className="me-1" /> Properties
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/agents" className={`nav-link-custom ${isActive('/agents')}`}>
                <Users size={18} className="me-1" /> Agents
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/community" className={`nav-link-custom ${isActive('/community')}`}>
                <MessageSquare size={18} className="me-1" /> Community Feed
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            {user ? (
              <>
                <Link to="/add-property" className="btn btn-accent btn-sm d-flex align-items-center gap-1">
                  <PlusCircle size={16} /> Post Property
                </Link>
                <Link to="/dashboard" className="btn btn-outline-dark btn-sm d-flex align-items-center gap-1 ms-1">
                  <LayoutDashboard size={16} /> Dashboard
                </Link>

                <div className="dropdown ms-2">
                  <button 
                    className="btn btn-light btn-sm rounded-circle p-2 dropdown-toggle" 
                    type="button" 
                    data-bs-toggle="dropdown"
                  >
                    <User size={18} />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow">
                    <li className="dropdown-header">
                      <div className="fw-bold">{user.name}</div>
                      <small className="text-muted">{user.role} ({user.city})</small>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <Link to="/dashboard" className="dropdown-item">My Account & Activity</Link>
                    </li>
                    <li>
                      <button onClick={logout} className="dropdown-item text-danger d-flex align-items-center gap-2">
                        <LogOut size={16} /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="btn btn-outline-dark btn-sm fw-semibold px-3">
                  Log In
                </Link>
                <Link to="/register" className="btn btn-accent btn-sm fw-semibold px-3">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
