import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Form, Table, Badge } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaTimes, FaRoute } from 'react-icons/fa';
import itinerariesData from './data/itineraries.json';
import './styles/itinerary.css';

// Ship names from existing data
const shipNames = [
  'Serendip Dream',
  'Serendip Majesty', 
  'Serendip Explorer',
  'Serendip Serenade',
  'Serendip Adventurer',
  'Serendip Harmony'
];

// Common countries for dropdown
const countries = [
  'Sri Lanka',
  'Maldives',
  'India',
  'Thailand',
  'Malaysia',
  'Singapore',
  'Indonesia',
  'Philippines',
  'Vietnam',
  'Myanmar'
];

// Common ports for dropdown
const commonPorts = [
  'Colombo',
  'Galle',
  'Trincomalee',
  'Jaffna',
  'Hambantota',
  'Maldives',
  'Mumbai',
  'Chennai',
  'Bangkok',
  'Singapore',
  'Kuala Lumpur',
  'Jakarta',
  'Manila',
  'Ho Chi Minh City',
  'Yangon'
];

function ItineraryDashboard() {
  const [itineraries, setItineraries] = useState([]);
  const [filteredItineraries, setFilteredItineraries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItinerary, setEditingItinerary] = useState(null);
  const [filters, setFilters] = useState({
    shipName: '',
    arrivalCountry: '',
    startDate: '',
    endDate: ''
  });
  const [availableShipNames, setAvailableShipNames] = useState(shipNames);
  const [availableCountries, setAvailableCountries] = useState(countries);
  const [availablePorts, setAvailablePorts] = useState(commonPorts);
  const [showAddShipModal, setShowAddShipModal] = useState(false);
  const [showAddRouteModal, setShowAddRouteModal] = useState(false);
  const [newShipName, setNewShipName] = useState('');
  const [newRouteData, setNewRouteData] = useState({
    departurePort: '',
    arrivalCountry: ''
  });

  // Load data on component mount
  useEffect(() => {
    setItineraries(itinerariesData);
    setFilteredItineraries(itinerariesData);
  }, []);

  // Apply filters when filters change
  useEffect(() => {
    let filtered = itineraries;

    if (filters.shipName) {
      filtered = filtered.filter(item => 
        item.shipName.toLowerCase().includes(filters.shipName.toLowerCase())
      );
    }

    if (filters.arrivalCountry) {
      filtered = filtered.filter(item => 
        item.arrivalCountry.toLowerCase().includes(filters.arrivalCountry.toLowerCase())
      );
    }

    if (filters.startDate) {
      filtered = filtered.filter(item => 
        new Date(item.startDate) >= new Date(filters.startDate)
      );
    }

    if (filters.endDate) {
      filtered = filtered.filter(item => 
        new Date(item.endDate) <= new Date(filters.endDate)
      );
    }

    setFilteredItineraries(filtered);
  }, [filters, itineraries]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      shipName: '',
      arrivalCountry: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleShowModal = (itinerary = null) => {
    setEditingItinerary(itinerary);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItinerary(null);
  };

  const handleSaveItinerary = (formData) => {
    if (editingItinerary) {
      // Edit existing itinerary
      const updated = itineraries.map(item => 
        item.id === editingItinerary.id ? { ...item, ...formData } : item
      );
      setItineraries(updated);
    } else {
      // Add new itinerary
      const newItinerary = {
        id: `IT${String(itineraries.length + 1).padStart(3, '0')}`,
        ...formData
      };
      setItineraries(prev => [...prev, newItinerary]);

      // Check if shipName or arrivalCountry are new and add them to the filter lists if needed
      if (!availableShipNames.includes(formData.shipName)) {
        setAvailableShipNames(prev => [...prev, formData.shipName]);
      }
      if (!availableCountries.includes(formData.arrivalCountry)) {
        setAvailableCountries(prev => [...prev, formData.arrivalCountry]);
      }
    }
    handleCloseModal();
  };

  const handleDeleteItinerary = (id) => {
    if (window.confirm('Are you sure you want to delete this itinerary?')) {
      setItineraries(prev => prev.filter(item => item.id !== id));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="itinerary-dashboard-bg">
      <div className="itinerary-container">
        {/* Header */}
        <div className="itinerary-header">
          <h1 className="itinerary-title">Itinerary Management</h1>
          <div className="admin-info">
            <div className="admin-name">Super Admin</div>
            <div className="admin-role">Administrator</div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <h3 className="filter-title">Filter Itineraries</h3>
          <div className="filter-row">
            <div className="filter-group">
              <label className="filter-label">Ship Name</label>
              <select
                className="filter-input"
                value={filters.shipName}
                onChange={(e) => handleFilterChange('shipName', e.target.value)}
              >
                <option value="">All Ships</option>
                {availableShipNames.map(ship => (
                  <option key={ship} value={ship}>{ship}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Arrival Country</label>
              <select
                className="filter-input"
                value={filters.arrivalCountry}
                onChange={(e) => handleFilterChange('arrivalCountry', e.target.value)}
              >
                <option value="">All Countries</option>
                {availableCountries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Start Date</label>
              <input
                type="date"
                className="filter-input"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label className="filter-label">End Date</label>
              <input
                type="date"
                className="filter-input"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
              />
            </div>
            <div className="filter-group">
              <Button className="filter-btn" onClick={() => {}}>
                <FaSearch /> Filter
              </Button>
            </div>
            <div className="filter-group">
              <Button className="clear-btn" onClick={clearFilters}>
                <FaTimes /> Clear
              </Button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="table-section">
          <div className="table-header">
            <h3 className="table-title">Cruise Itineraries</h3>
            <Button className="add-btn" onClick={() => handleShowModal()}>
              <FaPlus /> Add Itinerary
            </Button>
          </div>
          
          <Table className="itinerary-table table-striped table-bordered">
            <thead>
              <tr>
                <th>Ship Name</th>
                <th>Departure Port</th>
                <th>Arrival Country</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItineraries.length > 0 ? (
                filteredItineraries.map((itinerary) => (
                  <tr key={itinerary.id}>
                    <td>
                      <strong>{itinerary.shipName}</strong>
                    </td>
                    <td>
                      <Badge className="port-badge">{itinerary.departurePort}</Badge>
                    </td>
                    <td>
                      <Badge className="country-badge">{itinerary.arrivalCountry}</Badge>
                    </td>
                    <td>{formatDate(itinerary.startDate)}</td>
                    <td>{formatDate(itinerary.endDate)}</td>
                    <td>
                      <div className="action-buttons">
                        <Button
                          className="edit-btn"
                          size="sm"
                          onClick={() => handleShowModal(itinerary)}
                        >
                          <FaEdit /> Edit
                        </Button>
                        <Button
                          className="delete-btn"
                          size="sm"
                          onClick={() => handleDeleteItinerary(itinerary.id)}
                        >
                          <FaTrash /> Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    <div className="empty-state">
                      <FaRoute className="empty-state-icon" />
                      <div className="empty-state-text">No itineraries found</div>
                      <div className="empty-state-subtext">
                        {Object.values(filters).some(f => f) 
                          ? 'Try adjusting your filters' 
                          : 'Add your first itinerary to get started'
                        }
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Add/Edit Modal */}
        <ItineraryModal
          show={showModal}
          onHide={handleCloseModal}
          itinerary={editingItinerary}
          onSave={handleSaveItinerary}
          shipNames={availableShipNames}
          countries={availableCountries}
          ports={availablePorts}
          setShipNames={setAvailableShipNames}
          setCountries={setAvailableCountries}
          setPorts={setAvailablePorts}
          setShowAddShipModal={setShowAddShipModal}
          setShowAddRouteModal={setShowAddRouteModal}
          setNewShipName={setNewShipName}
          setNewRouteData={setNewRouteData}
        />

        {/* Add Ship Modal */}
        <Modal show={showAddShipModal} onHide={() => setShowAddShipModal(false)} size="sm" centered>
          <Modal.Header closeButton>
            <Modal.Title>Add New Ship</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Ship Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ship name..."
                value={newShipName}
                onChange={(e) => setNewShipName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddShipModal(false)}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={() => {
                if (newShipName.trim()) {
                  setAvailableShipNames(prev => [...prev, newShipName.trim()]);
                  setNewShipName('');
                  setShowAddShipModal(false);
                }
              }}
            >
              Add Ship
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Add Route Modal */}
        <Modal show={showAddRouteModal} onHide={() => setShowAddRouteModal(false)} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Add New Country</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-4">
                <Form.Group>
                  <Form.Label>Arrival Country *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter country name..."
                    value={newRouteData.arrivalCountry}
                    onChange={(e) => setNewRouteData(prev => ({ ...prev, arrivalCountry: e.target.value }))}
                  />
                </Form.Group>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddRouteModal(false)}>
              Cancel
            </Button>
            <Button 
              variant="success" 
              onClick={() => {
                if (newRouteData.arrivalCountry) {
                  // Add new country if it doesn't exist
                  if (!availableCountries.includes(newRouteData.arrivalCountry)) {
                    setAvailableCountries(prev => [...prev, newRouteData.arrivalCountry]);
                  }
                  setNewRouteData({ arrivalCountry: '' });
                  setShowAddRouteModal(false);
                }
              }}
            >
              Add Country
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

// Modal Component
function ItineraryModal({ show, onHide, itinerary, onSave, shipNames, countries, ports, setShipNames, setCountries, setPorts, setShowAddShipModal, setShowAddRouteModal, setNewShipName, setNewRouteData }) {
  const [formData, setFormData] = useState({
    shipName: '',
    departurePort: '',
    arrivalCountry: '',
    startDate: '',
    endDate: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  // Reset form when modal opens/closes or itinerary changes
  useEffect(() => {
    if (show) {
      if (itinerary) {
        setFormData(itinerary);
      } else {
        setFormData({
          shipName: '',
          departurePort: '',
          arrivalCountry: '',
          startDate: '',
          endDate: '',
          notes: ''
        });
      }
      setErrors({});
    }
  }, [show, itinerary]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.shipName) newErrors.shipName = 'Ship name is required';
    if (!formData.departurePort) newErrors.departurePort = 'Departure port is required';
    if (!formData.arrivalCountry) newErrors.arrivalCountry = 'Arrival country is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';

    if (formData.startDate && formData.endDate) {
      if (new Date(formData.startDate) >= new Date(formData.endDate)) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {itinerary ? 'Edit Itinerary' : 'Add New Itinerary'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="form-group">
                <Form.Label>Ship Name *</Form.Label>
                <Form.Control
                  type="text"
                  className={errors.shipName ? 'is-invalid' : ''}
                  placeholder="Enter ship name..."
                  value={formData.shipName}
                  onChange={(e) => handleInputChange('shipName', e.target.value)}
                />
                {errors.shipName && <div className="invalid-feedback">{errors.shipName}</div>}
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="form-group">
                <Form.Label>Route (Destination/Arrival Country) *</Form.Label>
                <Form.Control
                  type="text"
                  className={errors.arrivalCountry ? 'is-invalid' : ''}
                  placeholder="Enter country name..."
                  value={formData.arrivalCountry}
                  onChange={(e) => handleInputChange('arrivalCountry', e.target.value)}
                />
                {errors.arrivalCountry && <div className="invalid-feedback">{errors.arrivalCountry}</div>}
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="form-group">
                <Form.Label>Departure Port *</Form.Label>
                <Form.Control
                  type="text"
                  className={errors.departurePort ? 'is-invalid' : ''}
                  placeholder="e.g., Colombo"
                  value={formData.departurePort}
                  onChange={(e) => handleInputChange('departurePort', e.target.value)}
                />
                {errors.departurePort && <div className="invalid-feedback">{errors.departurePort}</div>}
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="form-group">
                <Form.Label>Start Date *</Form.Label>
                <Form.Control
                  type="date"
                  className={errors.startDate ? 'is-invalid' : ''}
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
                {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="form-group">
                <Form.Label>End Date *</Form.Label>
                <Form.Control
                  type="date"
                  className={errors.endDate ? 'is-invalid' : ''}
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
                {errors.endDate && <div className="invalid-feedback">{errors.endDate}</div>}
              </Form.Group>
            </div>
          </div>

          <Form.Group className="form-group">
            <Form.Label>Notes (Optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Additional notes about this itinerary..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-cancel" onClick={onHide}>
          Cancel
        </Button>
        <Button className="btn-save" onClick={handleSubmit}>
          {itinerary ? 'Update' : 'Save'} Itinerary
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ItineraryDashboard; 