import { useNavigate } from 'react-router-dom';
import './SuperAdminDashboard.css';
import { FaBook, FaUtensils, FaBed, FaRoute, FaUsers } from 'react-icons/fa';

function SuperAdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="superadmin-dashboard-bg">
      <div className="superadmin-dashboard-container">
        <h1 className="superadmin-title">Super Admin</h1>
        <div className="dashboard-grid">
          <div className="dashboard-btn active" onClick={() => navigate('/booking-overview')}>
            <span className="dashboard-icon"><FaBook /></span>
            <span className="dashboard-btn-label">Booking Overview</span>
          </div>
          <div className="dashboard-btn active" onClick={() => navigate('/food-inventory')}>
            <span className="dashboard-icon"><FaUtensils /></span>
            <span className="dashboard-btn-label">Pantry</span>
          </div>
          <div className="dashboard-btn disabled">
            <span className="dashboard-icon"><FaBed /></span>
            <span className="dashboard-btn-label">Cabin Management</span>
          </div>
          <div className="dashboard-btn disabled">
            <span className="dashboard-icon"><FaRoute /></span>
            <span className="dashboard-btn-label">Itinerary Management</span>
          </div>
          <div className="dashboard-btn active" onClick={() => navigate('/passenger-management')}>
            <span className="dashboard-icon"><FaUsers /></span>
            <span className="dashboard-btn-label">Passenger Management</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminDashboard; 