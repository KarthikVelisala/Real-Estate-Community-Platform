import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import AgentCard from '../components/AgentCard';
import InquiryModal from '../components/InquiryModal';
import { Search, Building2, ShieldCheck, MapPin, Sparkles, TrendingUp, Users, ArrowRight } from 'lucide-react';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState('All');
  const [searchType, setSearchType] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propRes, agentRes] = await Promise.all([
          axios.get('/api/property'),
          axios.get('/api/agent')
        ]);
        setProperties(propRes.data);
        setAgents(agentRes.data);
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/properties?city=${searchCity}&listingType=${searchType}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-5">
        <div className="hero-overlay"></div>
        <div className="container py-4 position-relative z-2">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <span className="badge bg-warning text-dark fw-bold px-3 py-2 rounded-pill mb-3">
                <Sparkles size={14} className="me-1" /> #1 Real Estate Community Platform in India
              </span>
              <h1 className="display-4 fw-extrabold text-white tracking-tight mb-3">
                Find Your Ideal Home Across Top <span className="text-warning">Indian Metro Hubs</span>
              </h1>
              <p className="fs-5 text-light opacity-90 mb-4">
                Connect directly with verified RERA real estate agents, direct property owners, and active buyer community feeds in Mumbai, Bengaluru, Delhi NCR, Kochi & Chennai.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearchSubmit} className="bg-white p-3 rounded-4 shadow-lg">
                <div className="row g-2 align-items-center">
                  <div className="col-md-4">
                    <label className="form-label small text-muted mb-1 fw-bold">Select City</label>
                    <select 
                      className="form-select border-0 bg-light custom-input"
                      value={searchCity}
                      onChange={e => setSearchCity(e.target.value)}
                    >
                      <option value="All">All Indian Cities</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Kochi">Kochi</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Hyderabad">Hyderabad</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label small text-muted mb-1 fw-bold">Listing Type</label>
                    <select 
                      className="form-select border-0 bg-light custom-input"
                      value={searchType}
                      onChange={e => setSearchType(e.target.value)}
                    >
                      <option value="All">Buy & Rent</option>
                      <option value="Buy">For Sale (Buy)</option>
                      <option value="Rent">For Rent</option>
                    </select>
                  </div>

                  <div className="col-md-4 d-flex align-items-end">
                    <button type="submit" className="btn btn-accent w-100 py-2 d-flex align-items-center justify-content-center gap-2 fw-bold">
                      <Search size={18} /> Search Properties
                    </button>
                  </div>
                </div>
              </form>

              {/* Stats */}
              <div className="d-flex flex-wrap gap-4 mt-4 pt-2">
                <div>
                  <h3 className="fw-bold text-white mb-0">1,250+</h3>
                  <small className="text-light opacity-75">Verified Listings</small>
                </div>
                <div className="vr bg-light opacity-25"></div>
                <div>
                  <h3 className="fw-bold text-warning mb-0">450+</h3>
                  <small className="text-light opacity-75">RERA Agents</small>
                </div>
                <div className="vr bg-light opacity-25"></div>
                <div>
                  <h3 className="fw-bold text-white mb-0">₹ 0 Fee</h3>
                  <small className="text-light opacity-75">Direct Community Posts</small>
                </div>
              </div>
            </div>

            <div className="col-lg-5 d-none d-lg-block text-center">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" 
                alt="Luxury Apartment India" 
                className="img-fluid rounded-4 shadow-lg border border-4 border-white opacity-95" 
                style={{ maxHeight: '420px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-5 container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
          <div>
            <span className="badge bg-warning bg-opacity-20 text-dark font-bold px-3 py-1 rounded-pill mb-2">
              PRIME LISTINGS
            </span>
            <h2 className="fw-extrabold text-dark mb-1">Featured Indian Properties</h2>
            <p className="text-muted mb-0">Explore handpicked residential villas, apartments, and penthouses</p>
          </div>
          <Link to="/properties" className="btn btn-outline-dark btn-sm d-flex align-items-center gap-1 mt-3 mt-md-0 fw-bold">
            View All Properties <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status"></div>
            <p className="text-muted mt-2">Loading properties...</p>
          </div>
        ) : (
          <div className="row g-4">
            {properties.slice(0, 3).map(property => (
              <div className="col-lg-4 col-md-6" key={property._id}>
                <PropertyCard property={property} onInquire={setSelectedProperty} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Category Quick Filter Grid */}
      <section className="py-5 bg-white border-top border-bottom">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-extrabold text-dark">Explore By Property Category</h2>
            <p className="text-muted">Find exactly what suits your lifestyle and budget</p>
          </div>

          <div className="row g-3">
            {[
              { title: 'Apartments', count: '650+ Properties', icon: '🏢', type: 'Apartment' },
              { title: 'Villas & Houses', count: '280+ Properties', icon: '🏡', type: 'Villa / House' },
              { title: 'Commercial', count: '140+ Properties', icon: '🏙️', type: 'Commercial' },
              { title: 'Plots & Land', count: '190+ Properties', icon: '🏞️', type: 'Plot / Land' }
            ].map((cat, idx) => (
              <div className="col-md-3 col-6" key={idx}>
                <div 
                  onClick={() => navigate(`/properties?propertyType=${encodeURIComponent(cat.type)}`)} 
                  className="card border-0 glass-card p-4 text-center cursor-pointer hover-scale"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="fs-1 mb-2">{cat.icon}</div>
                  <h6 className="fw-bold text-dark mb-1">{cat.title}</h6>
                  <small className="text-muted">{cat.count}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Agents */}
      <section className="py-5 container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
          <div>
            <span className="badge bg-success bg-opacity-10 text-success font-bold px-3 py-1 rounded-pill mb-2">
              CERTIFIED ADVISORS
            </span>
            <h2 className="fw-extrabold text-dark mb-1">Top RERA Registered Agents</h2>
            <p className="text-muted mb-0">Trusted real estate professionals with proven track records</p>
          </div>
          <Link to="/agents" className="btn btn-outline-dark btn-sm d-flex align-items-center gap-1 mt-3 mt-md-0 fw-bold">
            All Agent Profiles <ArrowRight size={16} />
          </Link>
        </div>

        <div className="row g-4">
          {agents.slice(0, 3).map(agent => (
            <div className="col-lg-4 col-md-6" key={agent._id}>
              <AgentCard agent={agent} />
            </div>
          ))}
        </div>
      </section>

      {/* Inquiry Modal */}
      {selectedProperty && (
        <InquiryModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      )}
    </div>
  );
};

export default Home;
