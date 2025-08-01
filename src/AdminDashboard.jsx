import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { FaBook, FaUtensils, FaBed, FaRoute, FaUsers, FaShip, FaInfoCircle, FaDollarSign, FaSwimmingPool } from "react-icons/fa";
import "./SuperAdminDashboard.css"; // Reuse the SuperAdmin styles
import { useContext } from "react";
import { AuthContext } from "./App";
import logo from './assets/logo.png';
import { Modal, Button } from "react-bootstrap";

const iconStyle = {
  fontSize: "2.2rem",
  color: "#7c5fe6",
  marginBottom: "0.7rem",
};

function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleCloseModal = () => {
    setShowLogoutModal(false);
  };

  const handleConfirmLogout = () => {
    logout();
    navigate("/");
    setShowLogoutModal(false);
  };

  return (
    <div 
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 1rem",
      }}
    >
      {/* Custom Navbar */}
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2px 2px',
        background: '#fff',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
        minHeight: "90px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        borderBottom: "1px solid #eee"
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <img
            src={logo}
            alt="Logo"
            style={{ height: '80px', width: 'auto', maxWidth: '100px', cursor: 'pointer', objectFit: 'contain' }}
            onClick={() => navigate('/#top')}
          />
          <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#1a237e', letterSpacing: '1px' }}>
            Admin Dashboard
          </div>
        </div>
        <button
          onClick={handleLogoutClick}
          className="superadmin-logout-btn"
        >
          Logout
        </button>
      </div>
      {/* End Custom Navbar */}
      <div style={{ marginTop: "110px" }}>
        <h2 style={{
          color: "#fff",
          fontWeight: 800,
          fontSize: "3rem",
          marginBottom: "2.5rem",
          textAlign: "center",
          letterSpacing: "0.5px",
          textShadow: "0 4px 24px rgba(30,58,138,0.13)"
        }}>
          Welcome Admin!
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "3rem",
            maxWidth: 1400,
            width: "100%",
          }}
        >
          {/* Bookings Column */}
          <div className="admin-column">
            <h3 className="admin-column-title">📋 Bookings</h3>
            <Link to="/booking-overview" className="admin-dashboard-btn">
              <FaBook style={iconStyle} />
              Booking Overview
            </Link>
            <Link to="/passenger-management" className="admin-dashboard-btn">
              <FaUsers style={iconStyle} />
              Passenger Management
            </Link>
            <Link to="/enquiries" className="admin-dashboard-btn">
              <FaInfoCircle style={iconStyle} />
              Customer Enquiries
            </Link>
          </div>

          {/* Route & Cruises Column */}
          <div className="admin-column">
            <h3 className="admin-column-title">🚢 Route & Cruises</h3>
            <Link to="/manage-cruises" className="admin-dashboard-btn">
              <FaShip style={iconStyle} />
              Cruise Management
            </Link>
            <Link to="/itinerary-management" className="admin-dashboard-btn">
              <FaRoute style={iconStyle} />
              Itinerary Management
            </Link>
            <Link to="/itinerary-details" className="admin-dashboard-btn">
              <FaInfoCircle style={iconStyle} />
              Itinerary Details
            </Link>
            <Link to="/dynamic-pricing" className="admin-dashboard-btn">
              <FaDollarSign style={iconStyle} />
              Dynamic Pricing for Cabins
            </Link>
          </div>

          {/* Facilities Column */}
          <div className="admin-column">
            <h3 className="admin-column-title">🏊 Facilities</h3>
            <Link to="/facility-management?from=admin" className="admin-dashboard-btn">
              <FaSwimmingPool style={iconStyle} />
              Facility Management
            </Link>
            <Link to="/facilities-dashboard?from=admin" className="admin-dashboard-btn">
              <FaSwimmingPool style={iconStyle} />
              Facilities Dashboard
            </Link>
            <Link to="/cabin-admin" className="admin-dashboard-btn">
              <FaBed style={iconStyle} />
              Cabin Management
            </Link>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to logout?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            No
          </Button>
          <Button variant="danger" onClick={handleConfirmLogout}>
            Yes, Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminDashboard;