import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize2, CheckCircle2 } from 'lucide-react';

const PropertyCard = ({ property, onInquire }) => {
  return (
    <div className="card glass-card border-0 h-100 position-relative">
      {property.featured && (
        <div className="position-absolute top-0 start-0 m-3 z-3">
          <span className="badge badge-featured">Featured</span>
        </div>
      )}
      <div className="position-absolute top-0 end-0 m-3 z-3">
        <span className={`badge ${property.listingType === 'Buy' ? 'badge-buy' : 'badge-rent'} shadow-sm px-3 py-2`}>
          For {property.listingType}
        </span>
      </div>

      <img 
        src={property.images && property.images.length > 0 ? property.images[0] : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'} 
        alt={property.title} 
        className="property-card-img" 
      />

      <div className="card-body p-4 d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="badge bg-secondary bg-opacity-10 text-dark fw-semibold px-2 py-1">
              {property.propertyType}
            </span>
            <span className="text-muted small d-flex align-items-center gap-1">
              <MapPin size={14} className="text-danger" /> {property.location?.city || 'India'}
            </span>
          </div>

          <h5 className="card-title fw-bold text-dark mb-2 text-truncate" title={property.title}>
            <Link to={`/properties/${property._id}`} className="text-dark text-decoration-none hover-orange">
              {property.title}
            </Link>
          </h5>

          <p className="text-muted small mb-3 text-truncate">
            {property.location?.locality}, {property.location?.address || property.location?.city}
          </p>

          <div className="d-flex align-items-center gap-3 text-secondary small mb-3 bg-light p-2 rounded-3">
            <div className="d-flex align-items-center gap-1">
              <Bed size={16} className="text-primary" />
              <span>{property.specs?.bedRooms || 2} Beds</span>
            </div>
            <div className="d-flex align-items-center gap-1">
              <Bath size={16} className="text-primary" />
              <span>{property.specs?.bathRooms || 2} Baths</span>
            </div>
            <div className="d-flex align-items-center gap-1">
              <Maximize2 size={16} className="text-primary" />
              <span>{property.specs?.areaSqFt || 1200} sqft</span>
            </div>
          </div>
        </div>

        <div>
          <div className="d-flex align-items-center justify-content-between pt-2 border-top">
            <div>
              <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Price</small>
              <div className="fw-bold text-dark fs-5">
                {property.formattedPrice || `₹ ${property.price?.toLocaleString('en-IN')}`}
              </div>
            </div>

            <div className="d-flex gap-2">
              {onInquire && (
                <button 
                  onClick={() => onInquire(property)} 
                  className="btn btn-outline-warning text-dark btn-sm fw-semibold"
                >
                  Inquire
                </button>
              )}
              <Link to={`/properties/${property._id}`} className="btn btn-navy btn-sm fw-semibold">
                Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
