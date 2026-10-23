import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import InquiryModal from '../components/InquiryModal';
import { Filter, Search, RotateCcw } from 'lucide-react';

const PropertyList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Filters state
  const [city, setCity] = useState(queryParams.get('city') || 'All');
  const [listingType, setListingType] = useState(queryParams.get('listingType') || 'All');
  const [propertyType, setPropertyType] = useState(queryParams.get('propertyType') || 'All');
  const [bhk, setBhk] = useState('All');
  const [search, setSearch] = useState('');

  const fetchProperties = async () => {
    setLoading(true);
    try {
      let url = '/api/property?';
      if (city !== 'All') url += `city=${encodeURIComponent(city)}&`;
      if (listingType !== 'All') url += `listingType=${encodeURIComponent(listingType)}&`;
      if (propertyType !== 'All') url += `propertyType=${encodeURIComponent(propertyType)}&`;
      if (bhk !== 'All') url += `bhk=${encodeURIComponent(bhk)}&`;
      if (search) url += `search=${encodeURIComponent(search)}&`;

      const { data } = await axios.get(url);
      setProperties(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [city, listingType, propertyType, bhk]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  const handleResetFilters = () => {
    setCity('All');
    setListingType('All');
    setPropertyType('All');
    setBhk('All');
    setSearch('');
  };

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h2 className="fw-extrabold text-dark mb-1">Properties in India</h2>
        <p className="text-muted">Browse residential, commercial, and land listings across top cities</p>
      </div>

      {/* Filter Bar */}
      <div className="card glass-card border-0 p-3 mb-4">
        <form onSubmit={handleSearchSubmit}>
          <div className="row g-3 align-items-center">
            <div className="col-lg-3 col-md-6">
              <label className="form-label small fw-bold text-muted mb-1">City</label>
              <select className="form-select custom-input" value={city} onChange={e => setCity(e.target.value)}>
                <option value="All">All Cities</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Kochi">Kochi</option>
                <option value="Chennai">Chennai</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>
            </div>

            <div className="col-lg-2 col-md-6">
              <label className="form-label small fw-bold text-muted mb-1">Buy / Rent</label>
              <select className="form-select custom-input" value={listingType} onChange={e => setListingType(e.target.value)}>
                <option value="All">All Types</option>
                <option value="Buy">For Sale</option>
                <option value="Rent">For Rent</option>
              </select>
            </div>

            <div className="col-lg-2 col-md-6">
              <label className="form-label small fw-bold text-muted mb-1">Property Category</label>
              <select className="form-select custom-input" value={propertyType} onChange={e => setPropertyType(e.target.value)}>
                <option value="All">All Categories</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa / House">Villa / House</option>
                <option value="Commercial">Commercial</option>
                <option value="Plot / Land">Plot / Land</option>
              </select>
            </div>

            <div className="col-lg-2 col-md-6">
              <label className="form-label small fw-bold text-muted mb-1">BHK Configuration</label>
              <select className="form-select custom-input" value={bhk} onChange={e => setBhk(e.target.value)}>
                <option value="All">Any BHK</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK+</option>
              </select>
            </div>

            <div className="col-lg-3 col-md-12">
              <label className="form-label small fw-bold text-muted mb-1">Keyword Search</label>
              <div className="d-flex gap-2">
                <input 
                  type="text" 
                  className="form-control custom-input" 
                  placeholder="e.g. Bandra, Indiranagar" 
                  value={search} 
                  onChange={e => setSearch(e.target.value)} 
                />
                <button type="submit" className="btn btn-navy px-3">
                  <Search size={16} />
                </button>
                <button type="button" onClick={handleResetFilters} className="btn btn-light border px-3" title="Reset Filters">
                  <RotateCcw size={16} />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Property Cards Grid */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status"></div>
          <p className="text-muted mt-2">Fetching property listings...</p>
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-4 border p-4">
          <Filter size={48} className="text-muted mb-3" />
          <h4 className="fw-bold text-dark">No Properties Found</h4>
          <p className="text-muted">Try adjusting your city or category filters.</p>
          <button onClick={handleResetFilters} className="btn btn-accent btn-sm">Reset All Filters</button>
        </div>
      ) : (
        <div className="row g-4">
          {properties.map(property => (
            <div className="col-lg-4 col-md-6" key={property._id}>
              <PropertyCard property={property} onInquire={setSelectedProperty} />
            </div>
          ))}
        </div>
      )}

      {/* Inquiry Modal */}
      {selectedProperty && (
        <InquiryModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      )}
    </div>
  );
};

export default PropertyList;
