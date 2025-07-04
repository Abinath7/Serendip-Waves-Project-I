
import React, { useState, useMemo } from 'react';
import foodInventoryData from './data/foodInventory.json';
import './foodInventory.css';
import { Button, Table, Badge, Modal, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus, FaFileCsv, FaFilePdf, FaHistory, FaBoxOpen, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';

const STATUS = {
  IN_STOCK: 'In Stock',
  LOW: 'Low',
  EXPIRED: 'Expired',
};

const LOW_THRESHOLD = 20; // Example threshold for low stock

function getStatus(item) {
  const today = new Date();
  const expiry = new Date(item.expiryDate);
  if (expiry < today) return STATUS.EXPIRED;
  if (item.quantity < LOW_THRESHOLD) return STATUS.LOW;
  return STATUS.IN_STOCK;
}

const unitOptions = ['kg', 'liters', 'packs'];
const categoryOptions = ['Vegetables', 'Fruits', 'Meat', 'Dairy', 'Grains', 'Beverages', 'Other'];

function FoodInventoryDashboard({ userRole = 'Super Admin' }) {
  const [data, setData] = useState(foodInventoryData);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [form, setForm] = useState({
    id: '',
    itemName: '',
    category: '',
    quantity: '',
    unit: 'kg',
    expiryDate: '',
    supplier: '',
    supplierContacts: '',
    unitPrice: '',
    purchaseDate: '',
  });
  const [formError, setFormError] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [supplierFilter, setSupplierFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Unique suppliers for filter dropdown
  const suppliers = useMemo(() => ['All', ...Array.from(new Set(data.map(i => i.supplier)))], [data]);

  // Filtered and sorted data
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const status = getStatus(item);
      if (statusFilter !== 'All' && status !== statusFilter) return false;
      if (supplierFilter !== 'All' && item.supplier !== supplierFilter) return false;
      if (categoryFilter !== 'All' && item.category !== categoryFilter) return false;
      return true;
    }).sort((a, b) => {
      return new Date(a.expiryDate) - new Date(b.expiryDate);
    });
  }, [data, statusFilter, supplierFilter, categoryFilter]);

  // Role-based access
  if (userRole !== 'Super Admin' && userRole !== 'Pantry Admin') {
    return <div className="alert alert-danger mt-5 text-center">Access Denied</div>;
  }

  const handleShowModal = (mode, item = null) => {
    setModalMode(mode);
    setForm(item ? { ...item } : {
      id: '',
      itemName: '',
      category: '',
      quantity: '',
      unit: 'kg',
      expiryDate: '',
      supplier: '',
      supplierContacts: '',
      unitPrice: '',
      purchaseDate: '',
    });
    setFormError('');
    setShowModal(true);
  };

  const handleFormChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (!form.itemName || !form.quantity || !form.unit || !form.expiryDate || !form.supplier) {
      setFormError('Please fill in all required fields.');
      return;
    }
    if (modalMode === 'add') {
      setData(prev => [
        ...prev,
        { ...form, id: Date.now() },
      ]);
    } else if (modalMode === 'edit') {
      setData(prev => prev.map(i => i.id === form.id ? { ...form } : i));
    }
    setShowModal(false);
  };

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setData(prev => prev.filter(i => i.id !== id));
    }
  };

  // Summary counts
  const totalItems = data.length;
  const lowStockCount = data.filter(item => getStatus(item) === STATUS.LOW).length;
  const expiredCount = data.filter(item => getStatus(item) === STATUS.EXPIRED).length;

  const [showDetails, setShowDetails] = useState(false);
  const [detailsItem, setDetailsItem] = useState(null);
  const handleShowDetails = (item) => {
    setDetailsItem(item);
    setShowDetails(true);
  };
  const handleCloseDetails = () => setShowDetails(false);

  return (
    <div className="food-inventory-bg py-4">
      <div className="container food-inventory-dashboard">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Food Inventory Dashboard</h2>
        </div>
        <div className="text-center mb-4">
          <div className="luxury-subtitle">Pantry & Supply Management</div>
        </div>
        {/* Summary Bar */}
        <div className="summary-bar d-flex flex-wrap justify-content-center gap-3 mb-4">
          <div className="summary-card">
            <FaBoxOpen className="summary-icon text-primary" />
            <div className="summary-label">Total Items</div>
            <div className="summary-value">{totalItems}</div>
          </div>
          <div className="summary-card">
            <FaExclamationTriangle className="summary-icon text-warning" />
            <div className="summary-label">Low Stock</div>
            <div className="summary-value text-warning">{lowStockCount}</div>
          </div>
          <div className="summary-card">
            <FaTimesCircle className="summary-icon text-danger" />
            <div className="summary-label">Expired</div>
            <div className="summary-value text-danger">{expiredCount}</div>
          </div>
        </div>
        {/* Filters & Table Card */}
        <div className="card p-4 mb-4 shadow-lg rounded-4">
          {/* Filters */}
          <div className="mb-3">
            <Row className="g-3 align-items-end">
              <Col md={3}>
                <Form.Label>Status</Form.Label>
                <Form.Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                  <option value="All">All</option>
                  <option value={STATUS.IN_STOCK}>In Stock</option>
                  <option value={STATUS.LOW}>Low</option>
                  <option value={STATUS.EXPIRED}>Expired</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Label>Supplier</Form.Label>
                <Form.Select value={supplierFilter} onChange={e => setSupplierFilter(e.target.value)}>
                  {suppliers.map(s => <option key={s} value={s}>{s}</option>)}
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Label>Food Category</Form.Label>
                <Form.Select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                  <option value="All">All</option>
                  {categoryOptions.map(c => <option key={c} value={c}>{c}</option>)}
                </Form.Select>
              </Col>
              <Col md={3} className="d-flex align-items-end justify-content-end">
                <Button variant="primary" onClick={() => handleShowModal('add')}><FaPlus className="me-2" />Add New Item</Button>
              </Col>
            </Row>
          </div>
          {/* Inventory Table */}
          <div className="table-responsive">
            <Table striped bordered hover className="align-middle food-table luxury-table">
              <thead className="table-primary sticky-top luxury-thead">
                <tr>
                  <th>Food Item Name</th>
                  <th>Category</th>
                  <th>Quantity in Stock</th>
                  <th>Unit Price</th>
                  <th>Total Price</th>
                  <th>Expiry Date</th>
                  <th>Supplier Name</th>
                  <th>Supplier Contacts</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr><td colSpan={10} className="text-center">No food items found.</td></tr>
                ) : (
                  filteredData.map(item => {
                    const status = getStatus(item);
                    const totalPrice = Number(item.quantity) * Number(item.unitPrice || 0);
                    return (
                      <tr key={item.id}>
                        <td>{item.itemName}</td>
                        <td>{item.category}</td>
                        <td>{item.quantity} {item.unit}</td>
                        <td>{item.unitPrice ? `Rs. ${item.unitPrice}` : '-'}</td>
                        <td>{item.unitPrice ? `Rs. ${totalPrice}` : '-'}</td>
                        <td>{item.expiryDate}</td>
                        <td>{item.supplier}</td>
                        <td>{item.supplierContacts || '-'}</td>
                        <td>{status}</td>
                        <td>
                          <Button size="sm" variant="outline-primary" className="me-2" onClick={() => handleShowModal('edit', item)}><FaEdit /></Button>
                          <Button size="sm" variant="outline-danger" onClick={() => handleDelete(item.id)}><FaTrash /></Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
          </div>
        </div>
        {/* Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{modalMode === 'add' ? 'Add New Food Item' : 'Edit Food Item'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleFormSubmit}>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Food Item Name *</Form.Label>
                    <Form.Control name="itemName" value={form.itemName} onChange={handleFormChange} isInvalid={!form.itemName && formError} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Quantity *</Form.Label>
                    <InputGroup>
                      <Form.Control name="quantity" type="number" value={form.quantity} onChange={handleFormChange} isInvalid={!form.quantity && formError} />
                      <Form.Select name="unit" value={form.unit} onChange={handleFormChange} style={{ maxWidth: 100 }}>
                        {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
                      </Form.Select>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Expiry Date *</Form.Label>
                    <Form.Control name="expiryDate" type="date" value={form.expiryDate} onChange={handleFormChange} isInvalid={!form.expiryDate && formError} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Supplier *</Form.Label>
                    <Form.Control name="supplier" value={form.supplier} onChange={handleFormChange} isInvalid={!form.supplier && formError} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Supplier Contacts</Form.Label>
                    <Form.Control name="supplierContacts" value={form.supplierContacts} onChange={handleFormChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Unit Price (Rs.)</Form.Label>
                    <Form.Control name="unitPrice" type="number" min="0" value={form.unitPrice} onChange={handleFormChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Purchase Date</Form.Label>
                    <Form.Control name="purchaseDate" type="date" value={form.purchaseDate} onChange={handleFormChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Food Category *</Form.Label>
                    <Form.Select name="category" value={form.category} onChange={handleFormChange} isInvalid={!form.category && formError}>
                      <option value="">Select Category</option>
                      {categoryOptions.map(c => <option key={c} value={c}>{c}</option>)}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              {formError && <div className="text-danger mt-2">{formError}</div>}
              <div className="d-flex justify-content-end mt-3">
                <Button variant="secondary" onClick={() => setShowModal(false)} className="me-2">Cancel</Button>
                <Button variant="primary" type="submit">{modalMode === 'add' ? 'Add Item' : 'Save Changes'}</Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
        {/* Details Modal */}
        <Modal show={showDetails} onHide={handleCloseDetails} centered>
          <Modal.Header closeButton>
            <Modal.Title>Food Item Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {detailsItem && (
              <div>
                <p><strong>Name:</strong> {detailsItem.itemName}</p>
                <p><strong>Category:</strong> {detailsItem.category}</p>
                <p><strong>Quantity:</strong> {detailsItem.quantity} {detailsItem.unit}</p>
                <p><strong>Unit Price:</strong> {detailsItem.unitPrice ? `Rs. ${detailsItem.unitPrice}` : '-'}</p>
                <p><strong>Total Price:</strong> {detailsItem.unitPrice ? `Rs. ${Number(detailsItem.quantity) * Number(detailsItem.unitPrice || 0)}` : '-'}</p>
                <p><strong>Expiry Date:</strong> {detailsItem.expiryDate}</p>
                <p><strong>Supplier:</strong> {detailsItem.supplier}</p>
                <p><strong>Supplier Contacts:</strong> {detailsItem.supplierContacts || '-'}</p>
                <p><strong>Purchase Date:</strong> {detailsItem.purchaseDate || '-'}</p>
                <p><strong>Status:</strong> {getStatus(detailsItem)}</p>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default FoodInventoryDashboard; 

