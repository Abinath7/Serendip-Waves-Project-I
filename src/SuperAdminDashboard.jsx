import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBook, FaUtensils, FaBed, FaRoute, FaUsers } from "react-icons/fa";
import "./SuperAdminDashboard.css";

const dashboardButtons = [
  {
    label: "Booking Overview",
    icon: <FaBook size={28} />,
    route: "/booking-overview",
    active: true,
  },
  {
    label: "Pantry",
    icon: <FaUtensils size={28} />,
    route: "/food-inventory-management",
    active: true,
  },
  {
    label: "Cabin Management",
    icon: <FaBed size={28} />,
    route: "/cabin-admin",
    active: true,
  },
  {
    label: "Itinerary Management",
    icon: <FaRoute size={28} />,
    route: "/itinerary-management",
    active: true,
  },
  {
    label: "Passenger Management",
    icon: <FaUsers size={28} />,
    route: "/passenger-management",
    active: true,
  },
];

function SuperAdminDashboard() {
  const navigate = useNavigate();
  return (
    <div className="superadmin-dashboard-bg">
      <div className="container py-5">
        <h1 className="text-center mb-5 superadmin-title">Super Admin</h1>
        <div className="row justify-content-center g-4">
          {dashboardButtons.map((btn, idx) => (
            <div
              className="col-12 col-md-6 col-lg-4 d-flex justify-content-center"
              key={btn.label}
            >
              <button
                className={`dashboard-btn${
                  btn.active ? " active" : " disabled"
                }`}
                onClick={() => btn.active && navigate(btn.route)}
                disabled={!btn.active}
              >
                <div className="dashboard-btn-icon mb-2">{btn.icon}</div>
                <span className="dashboard-btn-label">{btn.label}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
