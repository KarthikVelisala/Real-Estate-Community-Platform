import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AgentCard from '../components/AgentCard';
import { Search, ShieldCheck, Users } from 'lucide-react';

const AgentDirectory = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('All');
  const [search, setSearch] = useState('');

  const fetchAgents = async () => {
    setLoading(true);
    try {
      let url = '/api/agent?';
      if (city !== 'All') url += `city=${encodeURIComponent(city)}&`;
      if (search) url += `search=${encodeURIComponent(search)}&`;

      const { data } = await axios.get(url);
      setAgents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAgents();
  };

  return (
    <div className="container py-4">
      <div className="mb-4">
        <span className="badge bg-warning text-dark font-bold px-3 py-1 rounded-pill mb-2">
          RERA VERIFIED DIRECTORY
        </span>
        <h2 className="fw-extrabold text-dark mb-1">Real Estate Agents & Agencies in India</h2>
        <p className="text-muted">Find certified property consultants and agency leads in your local city</p>
      </div>

      {/* Filter */}
      <div className="card glass-card border-0 p-3 mb-4">
        <form onSubmit={handleSearch}>
          <div className="row g-3 align-items-center">
            <div className="col-md-4">
              <label className="form-label small fw-bold text-muted mb-1">Filter Operating City</label>
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

            <div className="col-md-6">
              <label className="form-label small fw-bold text-muted mb-1">Search Agent / Agency Name / RERA ID</label>
              <input 
                type="text" 
                className="form-control custom-input" 
                placeholder="e.g. Apex Realty, Sharma, A5190..." 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
              />
            </div>

            <div className="col-md-2 d-flex align-items-end">
              <button type="submit" className="btn btn-navy w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-1">
                <Search size={16} /> Search
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Agents Grid */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status"></div>
          <p className="text-muted mt-2">Loading agent directory...</p>
        </div>
      ) : agents.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-4 border p-4">
          <Users size={48} className="text-muted mb-3" />
          <h4 className="fw-bold text-dark">No Agents Found</h4>
          <p className="text-muted">No agents match your current city or search criteria.</p>
        </div>
      ) : (
        <div className="row g-4">
          {agents.map(agent => (
            <div className="col-lg-4 col-md-6" key={agent._id}>
              <AgentCard agent={agent} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentDirectory;
