import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { X, Send, Calendar, Phone, Mail, User, CheckCircle } from 'lucide-react';

const InquiryModal = ({ property, onClose }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    message: `Hi, I am interested in viewing the property "${property?.title}". Please provide more details and schedule a callback.`,
    preferredContactMethod: 'WhatsApp',
    visitDate: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!property) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('/api/inquiry', {
        propertyId: property._id,
        ...formData
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal fade show d-block tab-index-1" style={{ backgroundColor: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
          <div className="modal-header bg-navy text-white p-3 border-0 bg-dark">
            <h5 className="modal-title fw-bold text-white fs-6">Inquire About Property</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4">
            {submitted ? (
              <div className="text-center py-4">
                <CheckCircle size={54} className="text-success mb-3" />
                <h5 className="fw-bold text-dark">Inquiry Sent Successfully!</h5>
                <p className="text-muted small">
                  The agent/owner of <strong>"{property.title}"</strong> has received your message and will get in touch via {formData.preferredContactMethod}.
                </p>
                <button onClick={onClose} className="btn btn-navy btn-sm px-4 mt-2">Close</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="bg-light p-3 rounded-3 mb-3 border">
                  <span className="badge bg-warning text-dark me-2">{property.listingType}</span>
                  <span className="fw-bold text-dark">{property.title}</span>
                  <div className="text-success fw-bold mt-1">
                    {property.formattedPrice || `₹ ${property.price?.toLocaleString('en-IN')}`}
                  </div>
                </div>

                {error && <div className="alert alert-danger py-2 small">{error}</div>}

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Your Full Name</label>
                  <input 
                    type="text" 
                    className="form-control custom-input" 
                    value={formData.name} 
                    onChange={e => setFormData({ ...formData, name: e.target.value })} 
                    required 
                  />
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label small fw-semibold">Email Address</label>
                    <input 
                      type="email" 
                      className="form-control custom-input" 
                      value={formData.email} 
                      onChange={e => setFormData({ ...formData, email: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className="col-6">
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
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label small fw-semibold">Preferred Contact</label>
                    <select 
                      className="form-select custom-input"
                      value={formData.preferredContactMethod}
                      onChange={e => setFormData({ ...formData, preferredContactMethod: e.target.value })}
                    >
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Call">Phone Call</option>
                      <option value="Email">Email</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-semibold">Preferred Visit Date</label>
                    <input 
                      type="date" 
                      className="form-control custom-input" 
                      value={formData.visitDate} 
                      onChange={e => setFormData({ ...formData, visitDate: e.target.value })} 
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Message / Questions</label>
                  <textarea 
                    className="form-control custom-input" 
                    rows="3" 
                    value={formData.message} 
                    onChange={e => setFormData({ ...formData, message: e.target.value })} 
                    required 
                  ></textarea>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-light btn-sm" onClick={onClose}>Cancel</button>
                  <button type="submit" className="btn btn-accent btn-sm d-flex align-items-center gap-1" disabled={loading}>
                    <Send size={14} /> {loading ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;
