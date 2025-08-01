import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Table, InputGroup } from 'react-bootstrap';
import { FaUser, FaShip, FaBed, FaUsers, FaCalendarAlt, FaDollarSign, FaTrash, FaPlus } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BookingOverviewPage.css';
import logo from './assets/logo.png';
import { AuthContext } from './App';
import { useContext } from 'react';

// Mock cruise and booking data
const cruiseTitles = ['Caribbean Adventure', 'Mediterranean Escape', 'Alaskan Expedition', 'Asian Discovery'];
const cabinTypes = ['Interior', 'Ocean View', 'Balcony', 'Suite'];

function BookingOverviewPage() {
  const { logout } = useContext(AuthContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = (to) => { window.location.href = to; };
  const [bookings, setBookings] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    cruise: '',
    cabinType: '',
    dateFrom: '',
    dateTo: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [form, setForm] = useState({
    id: '',
    cruise: '',
    cabinNumber: '',
    cabinType: '',
    date: '',
    price: '',
    guests: 1,
    // Primary passenger
    primaryPassenger: {
      name: '',
      gender: '',
      age: '',
      citizenship: '',
      email: ''
    },
    // Additional passengers
    additionalPassengers: Array(3).fill().map(() => ({
      name: '',
      age: '',
      citizenship: ''
    }))
  });
  const [formError, setFormError] = useState('');

  // Fetch bookings from backend on mount
  useEffect(() => {
    fetch('http://localhost/Project-I/backend/getAllBookings.php')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.bookings) {
          setBookings(data.bookings);
        }
      });
  }, []);

  // Filter bookings
  const filteredBookings = bookings.filter(b => {
    const matchesSearch =
      (b.full_name?.toLowerCase().includes(filters.search.toLowerCase()) ||
      String(b.booking_id).toLowerCase().includes(filters.search.toLowerCase()));
    const matchesCruise = !filters.cruise || b.ship_name === filters.cruise;
    const matchesCabinType = !filters.cabinType || b.room_type === filters.cabinType;
    const matchesDateFrom = !filters.dateFrom || (b.booking_date && b.booking_date >= filters.dateFrom);
    const matchesDateTo = !filters.dateTo || (b.booking_date && b.booking_date <= filters.dateTo);
    return matchesSearch && matchesCruise && matchesCabinType && matchesDateFrom && matchesDateTo;
  });

  // Handle filter changes
  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  const clearFilters = () => {
    setFilters({ search: '', cruise: '', cabinType: '', dateFrom: '', dateTo: '' });
  };

  // Modal open/close
  const openAddModal = () => {
    setModalMode('add');
    setForm({
      id: '',
      cruise: '',
      cabinNumber: '',
      cabinType: '',
      date: '',
      price: '',
      guests: 1,
      primaryPassenger: {
        name: '',
        gender: '',
        age: '',
        citizenship: '',
        email: ''
      },
      additionalPassengers: Array(3).fill().map(() => ({
        name: '',
        age: '',
        citizenship: ''
      }))
    });
    setFormError('');
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  // Handle form changes
  const handleFormChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle primary passenger changes
  const handlePrimaryPassengerChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      primaryPassenger: {
        ...prev.primaryPassenger,
        [name]: value
      }
    }));
  };

  // Handle additional passenger changes
  const handleAdditionalPassengerChange = (index, e) => {
    const { name, value } = e.target;
    setForm(prev => {
      const updatedPassengers = [...prev.additionalPassengers];
      updatedPassengers[index] = {
        ...updatedPassengers[index],
        [name]: value
      };
      return {
        ...prev,
        additionalPassengers: updatedPassengers
      };
    });
  };

  // Add/Edit booking
  const handleFormSubmit = e => {
    e.preventDefault();
    // Validate required fields
    if (!form.primaryPassenger.name || !form.cruise || !form.cabinNumber || !form.cabinType || !form.date || !form.price) {
      setFormError('Please fill in all required fields.');
      return;
    }
    
    // Validate additional passengers if guests > 1
    if (form.guests > 1) {
      for (let i = 0; i < form.guests - 1; i++) {
        if (!form.additionalPassengers[i].name || !form.additionalPassengers[i].age || !form.additionalPassengers[i].citizenship) {
          setFormError(`Please fill in all details for passenger ${i + 2}.`);
          return;
        }
      }
    }
    
    // Validate double booking
    const isDoubleBooked = bookings.some(b =>
      b.cruise === form.cruise &&
      b.cabinNumber === form.cabinNumber &&
      b.date === form.date &&
      (modalMode === 'add' || (modalMode === 'edit' && b.id !== form.id))
    );
    if (isDoubleBooked) {
      setFormError('This cabin is already booked for the selected date.');
      return;
    }
    
    if (modalMode === 'add') {
      const newBooking = {
        ...form,
        id: 'B' + (Math.floor(Math.random() * 9000) + 1000),
        guests: Number(form.guests),
        price: Number(form.price),
      };
      setBookings(prev => [...prev, newBooking]);
    } else {
      setBookings(prev => prev.map(b => (b.id === form.id ? { ...form, guests: Number(form.guests), price: Number(form.price) } : b)));
    }
    setShowModal(false);
  };

  // Delete booking
  const handleDelete = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
      try {
        const response = await fetch('http://localhost/Project-I/backend/deleteBooking.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ booking_id: bookingId })
        });

        const data = await response.json();
        
        if (data.success) {
          // Remove the booking from the local state
          setBookings(prev => prev.filter(b => b.booking_id !== bookingId));
          // Show success message (optional)
          alert('Booking deleted successfully!');
        } else {
          alert('Failed to delete booking: ' + (data.message || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error deleting booking:', error);
        alert('Network error occurred while deleting booking. Please try again.');
      }
    }
  };

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);
  const handleConfirmLogout = () => {
    logout();
    navigate('/');
    setShowLogoutModal(false);
  };

  // Custom Navbar (Admin Dashboard style)
  const navbar = (
    <div
      style={{
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
        minHeight: '90px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        borderBottom: '1px solid #eee'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        <img
          src={logo}
          alt="Logo"
          style={{ height: '80px', width: 'auto', maxWidth: '100px', cursor: 'pointer', objectFit: 'contain' }}
          onClick={() => navigate('/#top')}
        />
        <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#1a237e', letterSpacing: '1px' }}>
          Booking Overview
        </div>
      </div>
      <button
        onClick={handleLogoutClick}
        className="superadmin-logout-btn"
      >
        Logout
      </button>
    </div>
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '0 1rem',
      }}
    >
      {navbar}
      <div style={{ marginTop: '110px', width: '100%' }}>
        {/* Gradient Header */}
        <section className="booking-hero-section mb-4" style={{ minHeight: '220px', padding: '40px 0' }}>
          <div className="booking-hero-background"></div>
          <div className="booking-hero-content container text-center text-white">
            <h2 className="booking-hero-title mb-2" style={{ fontSize: '2.8rem' }}>
              <FaShip className="me-2 mb-1" /> Booking Overview
            </h2>
            <p className="booking-hero-subtitle mb-0">
              Monitor and manage all cruise bookings with powerful filters and quick actions.
            </p>
          </div>
        </section>
        {/* Filters Section with Add Booking button on the right */}
        <div className="card booking-glass-effect mb-4 p-3 shadow-lg border-0" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-3">
            <div style={{ flex: 1 }}>
              <Row className="g-2 align-items-end">
                <Col md={3}>
                  <Form.Label><FaUser className="me-1" /> Search</Form.Label>
                  <Form.Control
                    type="text"
                    name="search"
                    placeholder="Passenger Name or Booking ID"
                    value={filters.search}
                    onChange={handleFilterChange}
                  />
                </Col>
                <Col md={2}>
                  <Form.Label><FaShip className="me-1" /> Cruise Title</Form.Label>
                  <Form.Select name="cruise" value={filters.cruise} onChange={handleFilterChange}>
                    <option value="">All Cruises</option>
                    {cruiseTitles.map(title => (
                      <option key={title} value={title}>{title}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Form.Label><FaBed className="me-1" /> Cabin Type</Form.Label>
                  <Form.Select name="cabinType" value={filters.cabinType} onChange={handleFilterChange}>
                    <option value="">All Types</option>
                    {cabinTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Form.Label><FaCalendarAlt className="me-1" /> Date From</Form.Label>
                  <Form.Control type="date" name="dateFrom" value={filters.dateFrom} onChange={handleFilterChange} />
                </Col>
                <Col md={2}>
                  <Form.Label><FaCalendarAlt className="me-1" /> Date To</Form.Label>
                  <Form.Control type="date" name="dateTo" value={filters.dateTo} onChange={handleFilterChange} />
                </Col>
                <Col md={1} className="d-flex align-items-end">
                  <Button variant="secondary" onClick={clearFilters} className="w-100 d-flex justify-content-center align-items-center text-center">Clear</Button>
                </Col>
              </Row>
            </div>
            <div className="d-flex justify-content-end mt-3 mt-md-0 ms-md-3">
              <Button variant="success" className="booking-cta-button" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none', minWidth: 170 }} onClick={openAddModal}><FaPlus className="me-2" />Add Booking</Button>
            </div>
          </div>
        </div>
        {/* Booking Table */}
        <div className="table-responsive" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Table striped hover bordered className="align-middle shadow-sm" style={{ background: '#fff', borderRadius: 15 }}>
            <thead className="table-dark">
              <tr>
                <th>Booking ID</th>
                <th>Passenger Name</th>
                <th>Cruise Title</th>
                <th>Cabin Number</th>
                <th>Cabin Type</th>
                <th>Guests</th>
                <th>Booking Date</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr><td colSpan={9} className="text-center">No bookings found.</td></tr>
              ) : (
                filteredBookings.map(b => (
                  <tr key={b.booking_id}>
                    <td>{b.booking_id}</td>
                    <td>{b.full_name}</td>
                    <td>{b.ship_name}</td>
                    <td>{b.cabin_number}</td>
                    <td>{b.room_type}</td>
                    <td>{b.number_of_guests}</td>
                    <td>{b.booking_date ? new Date(b.booking_date).toLocaleDateString() : ''}</td>
                    <td>${parseFloat(b.total_price || 0).toLocaleString()}</td>
                    <td>
                      <div className="action-buttons">
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleDelete(b.booking_id)}
                          title="Delete Booking"
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
        {/* Add/Edit Modal */}
        <Modal show={showModal} onHide={closeModal} backdrop="static" centered size="lg">
          <Modal.Header closeButton style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <Modal.Title>{modalMode === 'add' ? 'Add Booking' : 'Edit Booking'}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleFormSubmit}>
            <Modal.Body className="booking-glass-effect">
              {formError && <div className="alert alert-danger py-2">{formError}</div>}
              
              {/* Step 1: Primary Passenger Details */}
              <div className="mb-4 border-bottom pb-3">
                <h5 className="text-primary">Step 1: Primary Passenger Details</h5>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label><FaUser className="me-1" /> Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={form.primaryPassenger.name}
                        onChange={handlePrimaryPassengerChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select 
                        name="gender" 
                        value={form.primaryPassenger.gender} 
                        onChange={handlePrimaryPassengerChange} 
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-2">
                      <Form.Label>Age</Form.Label>
                      <Form.Control
                        type="number"
                        name="age"
                        min={1}
                        value={form.primaryPassenger.age}
                        onChange={handlePrimaryPassengerChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-2">
                      <Form.Label>Citizenship</Form.Label>
                      <Form.Control
                        type="text"
                        name="citizenship"
                        value={form.primaryPassenger.citizenship}
                        onChange={handlePrimaryPassengerChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-2">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={form.primaryPassenger.email}
                        onChange={handlePrimaryPassengerChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              {/* Step 2: Number of Guests */}
              <div className="mb-4 border-bottom pb-3">
                <h5 className="text-primary">Step 2: Number of Guests</h5>
                <Form.Group className="mb-2">
                  <Form.Label><FaUsers className="me-1" /> Number of Guests</Form.Label>
                  <Form.Control
                    type="number"
                    name="guests"
                    min={1}
                    max={4}
                    value={form.guests}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>
              </div>

              {/* Step 3: Additional Passengers */}
              {form.guests > 1 && (
                <div className="mb-4 border-bottom pb-3">
                  <h5 className="text-primary">Step 3: Additional Passengers</h5>
                  {[...Array(form.guests - 1)].map((_, index) => (
                    <div key={index} className="mb-3 p-3 border rounded">
                      <h6>Passenger {index + 2}</h6>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-2">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={form.additionalPassengers[index].name}
                              onChange={(e) => handleAdditionalPassengerChange(index, e)}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group className="mb-2">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                              type="number"
                              name="age"
                              min={1}
                              value={form.additionalPassengers[index].age}
                              onChange={(e) => handleAdditionalPassengerChange(index, e)}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group className="mb-2">
                            <Form.Label>Citizenship</Form.Label>
                            <Form.Control
                              type="text"
                              name="citizenship"
                              value={form.additionalPassengers[index].citizenship}
                              onChange={(e) => handleAdditionalPassengerChange(index, e)}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 4: Booking Details */}
              <div className="mb-4">
                <h5 className="text-primary">Step 4: Booking Details</h5>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label><FaShip className="me-1" /> Cruise</Form.Label>
                      <Form.Select name="cruise" value={form.cruise} onChange={handleFormChange} required>
                        <option value="">Select Cruise</option>
                        {cruiseTitles.map(title => (
                          <option key={title} value={title}>{title}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label><FaBed className="me-1" /> Cabin Type</Form.Label>
                      <Form.Select name="cabinType" value={form.cabinType} onChange={handleFormChange} required>
                        <option value="">Select Type</option>
                        {cabinTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-2">
                      <Form.Label><FaBed className="me-1" /> Cabin Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="cabinNumber"
                        value={form.cabinNumber}
                        onChange={handleFormChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-2">
                      <Form.Label><FaCalendarAlt className="me-1" /> Booking Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleFormChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-2">
                      <Form.Label><FaDollarSign className="me-1" /> Total Price</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control
                          type="number"
                          name="price"
                          min={0}
                          value={form.price}
                          onChange={handleFormChange}
                          required
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </Modal.Body>
            <Modal.Footer className="booking-glass-effect">
              <Button variant="secondary" onClick={closeModal}>Cancel</Button>
              <Button variant="primary" type="submit">{modalMode === 'add' ? 'Add' : 'Save'}</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={handleCloseLogoutModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to logout?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogoutModal}>
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

export default BookingOverviewPage;