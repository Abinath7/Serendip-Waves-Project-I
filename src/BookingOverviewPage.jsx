import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Table, InputGroup } from 'react-bootstrap';
import { FaUser, FaShip, FaBed, FaUsers, FaCalendarAlt, FaDollarSign, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BookingOverviewPage.css';

// Mock cruise and booking data
const cruiseTitles = [
  'Serendip Dream',
  'Serendip Majesty',
  'Serendip Explorer',
  'Serendip Serenade',
  'Serendip Adventurer',
  'Serendip Harmony',
];
const cabinTypes = ['Suite', 'Balcony', 'Oceanview', 'Interior'];

const initialBookings = [
  {
    id: 'B001',
    passenger: 'John Doe',
    cruise: 'Serendip Dream',
    cabinNumber: '101',
    cabinType: 'Suite',
    guests: 2,
    date: '2024-07-01',
    price: 2500,
  },
  {
    id: 'B002',
    passenger: 'Jane Smith',
    cruise: 'Serendip Majesty',
    cabinNumber: '202',
    cabinType: 'Balcony',
    guests: 3,
    date: '2024-07-05',
    price: 3200,
  },
  {
    id: 'B003',
    passenger: 'Michael Lee',
    cruise: 'Serendip Explorer',
    cabinNumber: '303',
    cabinType: 'Oceanview',
    guests: 4,
    date: '2024-07-10',
    price: 4100,
  },
  {
    id: 'B004',
    passenger: 'Emily Clark',
    cruise: 'Serendip Serenade',
    cabinNumber: '404',
    cabinType: 'Interior',
    guests: 1,
    date: '2024-07-12',
    price: 1800,
  },
  {
    id: 'B005',
    passenger: 'Carlos Gomez',
    cruise: 'Serendip Adventurer',
    cabinNumber: '505',
    cabinType: 'Suite',
    guests: 2,
    date: '2024-07-15',
    price: 2700,
  },
  {
    id: 'B006',
    passenger: 'Sophia Patel',
    cruise: 'Serendip Harmony',
    cabinNumber: '606',
    cabinType: 'Balcony',
    guests: 3,
    date: '2024-07-18',
    price: 3500,
  },
  {
    id: 'B007',
    passenger: 'Liam Nguyen',
    cruise: 'Serendip Dream',
    cabinNumber: '107',
    cabinType: 'Oceanview',
    guests: 2,
    date: '2024-07-20',
    price: 2900,
  },
  {
    id: 'B008',
    passenger: 'Olivia Brown',
    cruise: 'Serendip Majesty',
    cabinNumber: '208',
    cabinType: 'Suite',
    guests: 4,
    date: '2024-07-22',
    price: 4200,
  },
  {
    id: 'B009',
    passenger: 'Noah Wilson',
    cruise: 'Serendip Explorer',
    cabinNumber: '309',
    cabinType: 'Interior',
    guests: 1,
    date: '2024-07-25',
    price: 1700,
  },
  {
    id: 'B010',
    passenger: 'Ava Martinez',
    cruise: 'Serendip Serenade',
    cabinNumber: '410',
    cabinType: 'Balcony',
    guests: 2,
    date: '2024-07-28',
    price: 3100,
  },
];

function BookingOverviewPage() {
  const [bookings, setBookings] = useState(initialBookings);
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
    passenger: '',
    cruise: '',
    cabinNumber: '',
    cabinType: '',
    guests: 1,
    date: '',
    price: '',
  });
  const [formError, setFormError] = useState('');

  // Filter bookings
  const filteredBookings = bookings.filter(b => {
    const matchesSearch =
      b.passenger.toLowerCase().includes(filters.search.toLowerCase()) ||
      b.id.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCruise = !filters.cruise || b.cruise === filters.cruise;
    const matchesCabinType = !filters.cabinType || b.cabinType === filters.cabinType;
    const matchesDateFrom = !filters.dateFrom || b.date >= filters.dateFrom;
    const matchesDateTo = !filters.dateTo || b.date <= filters.dateTo;
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
      passenger: '',
      cruise: '',
      cabinNumber: '',
      cabinType: '',
      guests: 1,
      date: '',
      price: '',
    });
    setFormError('');
    setShowModal(true);
  };
  const openEditModal = booking => {
    setModalMode('edit');
    setForm({ ...booking });
    setFormError('');
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  // Add/Edit booking
  const handleFormChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleFormSubmit = e => {
    e.preventDefault();
    // Validate required fields
    if (!form.passenger || !form.cruise || !form.cabinNumber || !form.cabinType || !form.date || !form.price) {
      setFormError('Please fill in all required fields.');
      return;
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
  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setBookings(prev => prev.filter(b => b.id !== id));
    }
  };

  return (
    <div className="booking-container py-4" style={{ minHeight: '100vh', background: '#fff', paddingTop: '90px' }}>
      <h2 className="mb-4">Booking Overview</h2>
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
                <Button variant="secondary" onClick={clearFilters} className="w-100">Clear</Button>
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
              <th><FaShip className="me-1" /> Booking ID</th>
              <th><FaUser className="me-1" /> Passenger Name</th>
              <th><FaShip className="me-1" /> Cruise Title</th>
              <th><FaBed className="me-1" /> Cabin Number</th>
              <th><FaBed className="me-1" /> Cabin Type</th>
              <th><FaUsers className="me-1" /> Guests</th>
              <th><FaCalendarAlt className="me-1" /> Booking Date</th>
              <th><FaDollarSign className="me-1" /> Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length === 0 ? (
              <tr><td colSpan={9} className="text-center">No bookings found.</td></tr>
            ) : (
              filteredBookings.map(b => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.passenger}</td>
                  <td>{b.cruise}</td>
                  <td>{b.cabinNumber}</td>
                  <td>{b.cabinType}</td>
                  <td>{b.guests}</td>
                  <td>{b.date}</td>
                  <td>${b.price.toLocaleString()}</td>
                  <td>
                    <Button size="sm" variant="primary" className="me-2" onClick={() => openEditModal(b)}><FaEdit /></Button>
                    <Button size="sm" variant="danger" onClick={() => handleDelete(b.id)}><FaTrash /></Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={closeModal} backdrop="static" centered>
        <Modal.Header closeButton style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <Modal.Title>{modalMode === 'add' ? 'Add Booking' : 'Edit Booking'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body className="booking-glass-effect">
            {formError && <div className="alert alert-danger py-2">{formError}</div>}
            <Form.Group className="mb-2">
              <Form.Label><FaUser className="me-1" /> Passenger Name</Form.Label>
              <Form.Control
                type="text"
                name="passenger"
                value={form.passenger}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label><FaShip className="me-1" /> Cruise</Form.Label>
              <Form.Select name="cruise" value={form.cruise} onChange={handleFormChange} required>
                <option value="">Select Cruise</option>
                {cruiseTitles.map(title => (
                  <option key={title} value={title}>{title}</option>
                ))}
              </Form.Select>
            </Form.Group>
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
            <Form.Group className="mb-2">
              <Form.Label><FaBed className="me-1" /> Cabin Type</Form.Label>
              <Form.Select name="cabinType" value={form.cabinType} onChange={handleFormChange} required>
                <option value="">Select Type</option>
                {cabinTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label><FaUsers className="me-1" /> Number of Guests</Form.Label>
              <Form.Control
                type="number"
                name="guests"
                min={1}
                value={form.guests}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
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
          </Modal.Body>
          <Modal.Footer className="booking-glass-effect">
            <Button variant="secondary" onClick={closeModal}>Cancel</Button>
            <Button variant="primary" type="submit">{modalMode === 'add' ? 'Add' : 'Save'}</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default BookingOverviewPage; 