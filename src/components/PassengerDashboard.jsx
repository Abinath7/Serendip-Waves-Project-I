import React, { useState } from 'react';
import passengerBookings from '../data/passengerBookings.json';
import './passenger.css';
import { Button, Form, InputGroup } from 'react-bootstrap';

const adminName = 'Super Admin';

function PassengerDashboard() {
  const [data, setData] = useState(passengerBookings);
  const [search, setSearch] = useState('');
  const [shipFilter, setShipFilter] = useState('All Ships');

  // Get unique ship names for dropdown
  const shipNames = Array.from(new Set(passengerBookings.map(b => b.shipName)));

  const handleDelete = (idx) => {
    setData(prev => prev.filter((_, i) => i !== idx));
  };
  const handleEdit = (row) => {
    console.log('Edit row:', row);
  };
  // Filter by search and ship name
  const filtered = data.filter(row =>
    (shipFilter === 'All Ships' || row.shipName === shipFilter) &&
    (row.passengerName.toLowerCase().includes(search.toLowerCase()) ||
      row.email.toLowerCase().includes(search.toLowerCase()) ||
      row.nic.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="passenger-dashboard-bg min-vh-100 py-4">
      {/* Gradient Header */}
      <section className="booking-hero-section mb-4" style={{ minHeight: '220px', padding: '40px 0' }}>
        <div className="booking-hero-background"></div>
        <div className="booking-hero-content container text-center text-white">
          <h2 className="booking-hero-title mb-2" style={{ fontSize: '2.8rem' }}>
            Passenger Management Dashboard
          </h2>
          <p className="booking-hero-subtitle mb-0">
            View and manage all passenger bookings in one place.
          </p>
        </div>
      </section>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div></div>
          <div className="d-flex align-items-center gap-3">
            {/* Removed Super Admin name */}
          </div>
        </div>
        {/* Filter/Search Bar in Card */}
        <div className="card booking-glass-effect mb-4 p-3 shadow-lg border-0" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="d-flex justify-content-between align-items-end flex-wrap gap-3">
            <InputGroup style={{ maxWidth: 340 }}>
              <Form.Control
                type="text"
                placeholder="Search by name, NIC, or email"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="shadow-sm"
              />
              <Button variant="secondary" onClick={() => setSearch('')}>Clear</Button>
            </InputGroup>
            {/* Ship Name Dropdown Filter */}
            <Form.Select
              style={{ maxWidth: 220 }}
              value={shipFilter}
              onChange={e => setShipFilter(e.target.value)}
              className="shadow-sm"
            >
              <option>All Ships</option>
              {shipNames.map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </Form.Select>
            <Button variant="outline-secondary" className="rounded-pill px-4" style={{ minWidth: 180 }} onClick={() => window.location.href='/booking-overview'}>View Booking Overview</Button>
          </div>
        </div>
        <div className="table-responsive passenger-table-wrapper">
          <table className="table table-striped table-bordered align-middle shadow-sm passenger-table">
            <thead className="table-primary">
              <tr>
                <th>Booking ID</th>
                <th>Passenger Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>NIC / Passport</th>
                <th>Ship Name</th>
                <th>Route</th>
                <th>Cabin ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={9} className="text-center">No passengers found.</td></tr>
              ) : (
                filtered.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.bookingId}</td>
                    <td>{row.passengerName}</td>
                    <td>{row.email}</td>
                    <td>{row.phone}</td>
                    <td>{row.nic}</td>
                    <td><span className="badge bg-primary bg-opacity-75 rounded-pill px-3 py-2">{row.shipName}</span></td>
                    <td><span className="badge bg-info bg-opacity-75 rounded-pill px-3 py-2">{row.route}</span></td>
                    <td>{row.cabinId}</td>
                    <td>
                      <Button size="sm" variant="outline-primary" className="me-2" onClick={() => handleEdit(row)}>Edit</Button>
                      <Button size="sm" variant="outline-danger" onClick={() => handleDelete(idx)}>Delete</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PassengerDashboard; 