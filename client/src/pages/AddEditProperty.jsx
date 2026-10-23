import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Building2, PlusCircle, Image, MapPin, IndianRupee, Layers } from 'lucide-react';

const AddEditProperty = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: 'Apartment',
    listingType: 'Buy',
    price: '',
    city: user?.city || 'Mumbai',
    locality: '',
    address: '',
    bedRooms: 2,
    bathRooms: 2,
    areaSqFt: 1200,
    bhk: '2 BHK',
    furnishing: 'Semi-Furnished',
    imageUrl1: '',
    imageUrl2: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <h4>Please Log In to Post a Property</h4>
        <button onClick={() => navigate('/login')} className="btn btn-accent mt-2">Go to Login</button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const images = [];
      if (formData.imageUrl1) images.push(formData.imageUrl1);
      if (formData.imageUrl2) images.push(formData.imageUrl2);
      if (images.length === 0) {
        images.push('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80');
      }

      await axios.post('/api/property', {
        ...formData,
        price: Number(formData.price),
        images
      });

      navigate('/properties');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to list property.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card glass-card border-0 p-4 shadow-lg rounded-4">
            <div className="d-flex align-items-center gap-3 mb-4 border-bottom pb-3">
              <div className="bg-warning text-dark p-3 rounded-circle">
                <Building2 size={28} />
              </div>
              <div>
                <h3 className="fw-extrabold text-dark mb-0">Post New Indian Property</h3>
                <p className="text-muted small mb-0">List your property for buyers & renters across Indian metro cities</p>
              </div>
            </div>

            {error && <div className="alert alert-danger py-2 small">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-bold">Property Title</label>
                <input 
                  type="text" 
                  className="form-control custom-input" 
                  placeholder="e.g. 3 BHK Sea-View Luxury Flat in Carter Road" 
                  value={formData.title} 
                  onChange={e => setFormData({ ...formData, title: e.target.value })} 
                  required 
                />
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Listing Purpose</label>
                  <select 
                    className="form-select custom-input" 
                    value={formData.listingType} 
                    onChange={e => setFormData({ ...formData, listingType: e.target.value })}
                  >
                    <option value="Buy">For Sale (Buy)</option>
                    <option value="Rent">For Rent</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Property Category</label>
                  <select 
                    className="form-select custom-input" 
                    value={formData.propertyType} 
                    onChange={e => setFormData({ ...formData, propertyType: e.target.value })}
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa / House">Villa / House</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Plot / Land">Plot / Land</option>
                  </select>
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Price (in INR ₹)</label>
                  <input 
                    type="number" 
                    className="form-control custom-input" 
                    placeholder="e.g. 12500000 (1.25 Cr) or 45000" 
                    value={formData.price} 
                    onChange={e => setFormData({ ...formData, price: e.target.value })} 
                    required 
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">City</label>
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

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Locality / Area</label>
                  <input 
                    type="text" 
                    className="form-control custom-input" 
                    placeholder="e.g. Bandra West, Indiranagar" 
                    value={formData.locality} 
                    onChange={e => setFormData({ ...formData, locality: e.target.value })} 
                    required 
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Full Address</label>
                  <input 
                    type="text" 
                    className="form-control custom-input" 
                    placeholder="Street name, landmark, pincode" 
                    value={formData.address} 
                    onChange={e => setFormData({ ...formData, address: e.target.value })} 
                  />
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-3 col-6">
                  <label className="form-label small fw-bold">Bedrooms</label>
                  <input type="number" className="form-control custom-input" value={formData.bedRooms} onChange={e => setFormData({ ...formData, bedRooms: e.target.value, bhk: `${e.target.value} BHK` })} />
                </div>
                <div className="col-md-3 col-6">
                  <label className="form-label small fw-bold">Bathrooms</label>
                  <input type="number" className="form-control custom-input" value={formData.bathRooms} onChange={e => setFormData({ ...formData, bathRooms: e.target.value })} />
                </div>
                <div className="col-md-3 col-6">
                  <label className="form-label small fw-bold">Area (sq.ft)</label>
                  <input type="number" className="form-control custom-input" value={formData.areaSqFt} onChange={e => setFormData({ ...formData, areaSqFt: e.target.value })} />
                </div>
                <div className="col-md-3 col-6">
                  <label className="form-label small fw-bold">Furnishing</label>
                  <select className="form-select custom-input" value={formData.furnishing} onChange={e => setFormData({ ...formData, furnishing: e.target.value })}>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Fully Furnished">Fully Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">Image URLs (Optional)</label>
                <input type="url" className="form-control custom-input mb-2" placeholder="Main Image URL (https://...)" value={formData.imageUrl1} onChange={e => setFormData({ ...formData, imageUrl1: e.target.value })} />
                <input type="url" className="form-control custom-input" placeholder="Secondary Image URL" value={formData.imageUrl2} onChange={e => setFormData({ ...formData, imageUrl2: e.target.value })} />
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold">Detailed Description</label>
                <textarea 
                  className="form-control custom-input" 
                  rows="4" 
                  placeholder="Describe balcony view, smart fittings, maintenance charge, car parking details..." 
                  value={formData.description} 
                  onChange={e => setFormData({ ...formData, description: e.target.value })} 
                  required 
                ></textarea>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button type="button" onClick={() => navigate('/properties')} className="btn btn-light">Cancel</button>
                <button type="submit" className="btn btn-accent px-4 py-2 fw-bold" disabled={loading}>
                  {loading ? 'Publishing...' : 'Publish Property Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditProperty;
