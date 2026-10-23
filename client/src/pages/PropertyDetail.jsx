import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import InquiryModal from '../components/InquiryModal';
import { MapPin, Bed, Bath, Maximize2, ShieldCheck, Phone, Mail, CheckCircle2, Eye, Calendar, Building, Compass } from 'lucide-react';

const PropertyDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data } = await axios.get(`/api/property/${id}`);
        setProperty(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5 container">
        <div className="spinner-border text-warning" role="status"></div>
        <p className="text-muted mt-2">Loading property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container py-5 text-center">
        <h4>Property Not Found</h4>
        <Link to="/properties" className="btn btn-navy mt-2">Back to Properties</Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb small">
          <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/properties" className="text-decoration-none text-muted">Properties</Link></li>
          <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">{property.title}</li>
        </ol>
      </nav>

      {/* Main Grid */}
      <div className="row g-4">
        {/* Left Column: Image Gallery & Specs */}
        <div className="col-lg-8">
          <div className="card glass-card border-0 p-3 mb-4">
            <div className="position-relative">
              <img 
                src={property.images[activeImage] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80'} 
                alt={property.title} 
                className="w-100 rounded-4 object-fit-cover shadow-sm"
                style={{ height: '420px' }}
              />
              <span className={`badge ${property.listingType === 'Buy' ? 'badge-buy' : 'badge-rent'} position-absolute top-0 end-0 m-3 fs-6 shadow`}>
                For {property.listingType}
              </span>
            </div>

            {/* Thumbnail selector */}
            {property.images && property.images.length > 1 && (
              <div className="d-flex gap-2 mt-3 overflow-auto pb-2">
                {property.images.map((img, index) => (
                  <img 
                    key={index}
                    src={img}
                    alt="Property thumbnail"
                    className={`rounded-3 cursor-pointer border ${activeImage === index ? 'border-warning border-3' : 'opacity-75'}`}
                    style={{ width: '90px', height: '65px', objectFit: 'cover', cursor: 'pointer' }}
                    onClick={() => setActiveImage(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Overview Header */}
          <div className="card glass-card border-0 p-4 mb-4">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div>
                <span className="badge bg-secondary bg-opacity-10 text-dark fw-bold px-3 py-1 mb-2">
                  {property.propertyType}
                </span>
                <h3 className="fw-extrabold text-dark mb-1">{property.title}</h3>
                <p className="text-muted d-flex align-items-center gap-1 mb-0">
                  <MapPin size={16} className="text-danger" /> {property.location?.address || `${property.location?.locality}, ${property.location?.city}`}
                </p>
              </div>
              <div className="text-end">
                <span className="fs-3 fw-bold text-success d-block">
                  {property.formattedPrice || `₹ ${property.price?.toLocaleString('en-IN')}`}
                </span>
                <small className="text-muted d-flex align-items-center justify-content-end gap-1">
                  <Eye size={14} /> {property.views || 0} views
                </small>
              </div>
            </div>

            <hr className="my-3" />

            {/* Specs Grid */}
            <div className="row text-center g-3 bg-light p-3 rounded-4 mb-4">
              <div className="col-3">
                <small className="text-muted d-block">Bedrooms</small>
                <strong className="fs-5 text-dark d-flex align-items-center justify-content-center gap-1">
                  <Bed size={18} className="text-warning" /> {property.specs?.bedRooms || '-'}
                </strong>
              </div>
              <div className="col-3">
                <small className="text-muted d-block">Bathrooms</small>
                <strong className="fs-5 text-dark d-flex align-items-center justify-content-center gap-1">
                  <Bath size={18} className="text-warning" /> {property.specs?.bathRooms || '-'}
                </strong>
              </div>
              <div className="col-3">
                <small className="text-muted d-block">Super Area</small>
                <strong className="fs-5 text-dark d-flex align-items-center justify-content-center gap-1">
                  <Maximize2 size={18} className="text-warning" /> {property.specs?.areaSqFt || '-'} sqft
                </strong>
              </div>
              <div className="col-3">
                <small className="text-muted d-block">Facing</small>
                <strong className="fs-5 text-dark d-flex align-items-center justify-content-center gap-1">
                  <Compass size={18} className="text-warning" /> {property.specs?.facing || 'East'}
                </strong>
              </div>
            </div>

            {/* Description */}
            <h5 className="fw-bold text-dark mb-2">Description & Highlights</h5>
            <p className="text-secondary leading-relaxed mb-4">{property.description}</p>

            {/* Amenities */}
            <h5 className="fw-bold text-dark mb-3">Amenities & Infrastructure</h5>
            <div className="row g-2">
              {property.amenities && property.amenities.map((item, idx) => (
                <div className="col-md-4 col-6" key={idx}>
                  <div className="p-2 bg-light rounded-3 d-flex align-items-center gap-2 small text-dark fw-semibold">
                    <CheckCircle2 size={16} className="text-success" /> {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Agent Card */}
        <div className="col-lg-4">
          <div className="card glass-card border-0 p-4 sticky-top" style={{ top: '90px' }}>
            <h5 className="fw-bold text-dark mb-3">Posted By Agent / Owner</h5>

            {property.agent ? (
              <div className="mb-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <img 
                    src={property.agent.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80'} 
                    alt={property.agent.agencyName} 
                    className="rounded-circle object-fit-cover shadow-sm"
                    style={{ width: 60, height: 60 }}
                  />
                  <div>
                    <h6 className="fw-bold text-dark mb-0">{property.agent.agencyName}</h6>
                    <small className="text-success fw-semibold d-flex align-items-center gap-1">
                      <ShieldCheck size={14} /> RERA Verified Agent
                    </small>
                  </div>
                </div>

                <div className="bg-light p-3 rounded-3 small mb-3">
                  <div className="mb-1"><strong>RERA Reg:</strong> {property.agent.reraId}</div>
                  <div><strong>Phone:</strong> {property.agent.phone}</div>
                </div>
              </div>
            ) : (
              <div className="mb-4 bg-light p-3 rounded-3 small">
                <div className="fw-bold text-dark mb-1">{property.postedBy?.name || 'Direct Property Owner'}</div>
                <div className="text-muted">{property.postedBy?.email}</div>
              </div>
            )}

            <button 
              onClick={() => setShowInquiryModal(true)} 
              className="btn btn-accent w-100 py-3 fw-bold fs-6 shadow-sm d-flex align-items-center justify-content-center gap-2 mb-2"
            >
              <Mail size={18} /> Send Inquiry / Schedule Visit
            </button>

            {property.agent?.phone && (
              <a 
                href={`tel:${property.agent.phone}`} 
                className="btn btn-outline-dark w-100 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
              >
                <Phone size={16} /> Direct Call Agent
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showInquiryModal && (
        <InquiryModal property={property} onClose={() => setShowInquiryModal(false)} />
      )}
    </div>
  );
};

export default PropertyDetail;
