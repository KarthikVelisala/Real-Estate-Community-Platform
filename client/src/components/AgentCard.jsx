import React from 'react';
import { ShieldCheck, Star, MapPin, Phone, Mail, Award } from 'lucide-react';

const AgentCard = ({ agent }) => {
  return (
    <div className="card glass-card border-0 h-100 p-4">
      <div className="d-flex align-items-start gap-3 mb-3">
        <img 
          src={agent.avatar || agent.user?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80'} 
          alt={agent.agencyName} 
          className="rounded-circle object-fit-cover shadow-sm"
          style={{ width: '70px', height: '70px' }}
        />
        <div>
          <div className="d-flex align-items-center gap-1">
            <h5 className="fw-bold text-dark mb-0">{agent.user?.name || agent.agencyName}</h5>
            {agent.verified && (
              <ShieldCheck size={18} className="text-primary" title="RERA Verified Agent" />
            )}
          </div>
          <p className="text-warning fw-semibold small mb-1">{agent.agencyName}</p>
          <div className="d-flex align-items-center gap-2 small text-muted">
            <span className="badge bg-success bg-opacity-10 text-success d-flex align-items-center gap-1">
              <Star size={12} className="fill-success" /> {agent.rating || 4.9} ({agent.reviewsCount || 12} reviews)
            </span>
            <span>• {agent.experienceYears || 5}+ yrs exp</span>
          </div>
        </div>
      </div>

      <p className="text-muted small mb-3 text-truncate-2" style={{ minHeight: '40px' }}>
        {agent.bio || 'Specializing in residential buying, renting, luxury flats and commercial investments.'}
      </p>

      <div className="bg-light p-3 rounded-3 mb-3 small">
        <div className="d-flex align-items-center gap-2 mb-1 text-secondary">
          <Award size={14} className="text-warning" /> 
          <span><strong>RERA Reg:</strong> {agent.reraId}</span>
        </div>
        <div className="d-flex align-items-center gap-2 text-secondary">
          <MapPin size={14} className="text-danger" /> 
          <span><strong>Cities:</strong> {agent.operatingCities?.join(', ') || 'Mumbai, Bengaluru'}</span>
        </div>
      </div>

      <div className="d-flex gap-2 mt-auto pt-2 border-top">
        <a href={`tel:${agent.phone}`} className="btn btn-outline-dark btn-sm flex-fill d-flex align-items-center justify-content-center gap-1">
          <Phone size={14} /> Call
        </a>
        <a href={`mailto:${agent.email}`} className="btn btn-accent btn-sm flex-fill d-flex align-items-center justify-content-center gap-1">
          <Mail size={14} /> Email
        </a>
      </div>
    </div>
  );
};

export default AgentCard;
