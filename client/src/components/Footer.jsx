import React from 'react';
import { Building2, Heart, ShieldCheck, PhoneCall, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="bg-warning text-dark p-2 rounded-3">
                <Building2 size={20} />
              </div>
              <span className="fw-bold fs-4 text-white">GharDekho India</span>
            </div>
            <p className="text-secondary small">
              India's premier Real Estate Community & Property Platform connecting Buyers, Renters, Certified RERA Agents, and Property Owners across Mumbai, Bengaluru, Delhi NCR, Kochi, Chennai, and top metro hubs.
            </p>
            <div className="d-flex align-items-center gap-2 text-warning small mt-2">
              <ShieldCheck size={16} /> Verified RERA Registered Listings & Agents
            </div>
          </div>

          <div className="col-lg-2 col-md-4">
            <h6 className="text-uppercase text-warning fw-bold mb-3 small tracking-wider">Top Indian Cities</h6>
            <ul className="list-unstyled text-secondary small">
              <li className="mb-2"><a href="/properties?city=Mumbai" className="text-secondary text-decoration-none hover-white">Mumbai</a></li>
              <li className="mb-2"><a href="/properties?city=Bengaluru" className="text-secondary text-decoration-none hover-white">Bengaluru</a></li>
              <li className="mb-2"><a href="/properties?city=Delhi NCR" className="text-secondary text-decoration-none hover-white">Delhi NCR</a></li>
              <li className="mb-2"><a href="/properties?city=Kochi" className="text-secondary text-decoration-none hover-white">Kochi</a></li>
              <li className="mb-2"><a href="/properties?city=Hyderabad" className="text-secondary text-decoration-none hover-white">Hyderabad</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-4">
            <h6 className="text-uppercase text-warning fw-bold mb-3 small tracking-wider">Platform Modules</h6>
            <ul className="list-unstyled text-secondary small">
              <li className="mb-2"><a href="/properties" className="text-secondary text-decoration-none">Property Search</a></li>
              <li className="mb-2"><a href="/agents" className="text-secondary text-decoration-none">Agent Directory</a></li>
              <li className="mb-2"><a href="/community" className="text-secondary text-decoration-none">Community Feed & Buy Requests</a></li>
              <li className="mb-2"><a href="/dashboard" className="text-secondary text-decoration-none">User & Agent Dashboard</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-4">
            <h6 className="text-uppercase text-warning fw-bold mb-3 small tracking-wider">Contact & Support</h6>
            <p className="text-secondary small mb-2 d-flex align-items-center gap-2">
              <PhoneCall size={16} className="text-warning" /> +91 1800-425-REAL (Toll Free)
            </p>
            <p className="text-secondary small mb-3 d-flex align-items-center gap-2">
              <Mail size={16} className="text-warning" /> support@ghardekho.in
            </p>
            <div className="p-3 bg-secondary bg-opacity-20 rounded-3 border border-secondary border-opacity-20">
              <small className="text-white fw-semibold d-block">Academic Project Report</small>
              <small className="text-secondary">Student ID: 727824tuec102 | Jovan K Thomas</small>
            </div>
          </div>
        </div>

        <hr className="my-4 border-secondary opacity-25" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small text-secondary">
          <div>© {new Date().getFullYear()} GharDekho Real Estate Community Platform. All rights reserved.</div>
          <div className="mt-2 mt-md-0">
            Crafted with <Heart size={14} className="text-danger inline" /> for Indian Property Buyers & Agents
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
