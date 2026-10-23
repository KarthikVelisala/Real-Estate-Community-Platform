import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PropertyList from './pages/PropertyList';
import PropertyDetail from './pages/PropertyDetail';
import AddEditProperty from './pages/AddEditProperty';
import AgentDirectory from './pages/AgentDirectory';
import CommunityFeed from './pages/CommunityFeed';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/properties" element={<PropertyList />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/add-property" element={<AddEditProperty />} />
          <Route path="/agents" element={<AgentDirectory />} />
          <Route path="/community" element={<CommunityFeed />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
