import React, { useEffect, useState } from 'react';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="customer-dashboard-bg">
      <div className="customer-dashboard-container">
        <h2 className="customer-dashboard-title">Customer Dashboard</h2>
        {user ? (
          <>
            <div className="customer-dashboard-userinfo">
              <h5>Welcome, <span>{user.fullName || user.name}</span>!</h5>
              <div><strong>Email:</strong> {user.email}</div>
              {user.phone && <div><strong>Phone:</strong> {user.phone}</div>}
              {user.dob && <div><strong>Date of Birth:</strong> {user.dob}</div>}
              {user.gender && <div><strong>Gender:</strong> {user.gender}</div>}
              {user.passport && <div><strong>Passport Number:</strong> {user.passport}</div>}
            </div>
            <hr />
            <div>
              <h5 className="customer-dashboard-section-title">My Booking</h5>
              <div className="customer-dashboard-booking alert alert-info">You have no bookings yet. Book your first cruise now!</div>
            </div>
          </>
        ) : (
          <div className="alert alert-warning">No user details found. Please log in.</div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard; 