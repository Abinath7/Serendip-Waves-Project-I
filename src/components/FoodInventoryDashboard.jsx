import React, { useState, useMemo } from 'react';
import foodInventoryData from '../data/foodInventory.json';
import '../styles/foodInventory.css';
import { Button, Table, Badge, Modal, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus, FaFileCsv, FaFilePdf, FaHistory } from 'react-icons/fa';

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

function FoodInventoryDashboard({ userRole = 'Super Admin' }) {
  const [data, setData] = useState(foodInventoryData);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [form, setForm] = useState({
    id: '',
    itemName: '',
    quantity: '',
    unit: 'kg',
    expiryDate: '',
    supplier: '',
    purchaseDate: '',
    storageLocation: '',
  });
  const [formError, setFormError] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [supplierFilter, setSupplierFilter] = useState('All');
  const [expiryFrom, setExpiryFrom] = useState('');
  const [expiryTo, setExpiryTo] = useState('');
  const [sortBy, setSortBy] = useState('expiryDate');

  // Unique suppliers for filter dropdown
  const suppliers = useMemo(() => ['All', ...Array.from(new Set(data.map(i => i.supplier)))], [data]);

  // Filtered and sorted data
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const status = getStatus(item);
      if (statusFilter !== 'All' && status !== statusFilter) return false;
      if (supplierFilter !== 'All' && item.supplier !== supplierFilter) return false;
      if (expiryFrom && new Date(item.expiryDate) < new Date(expiryFrom)) return false;
      if (expiryTo && new Date(item.expiryDate) > new Date(expiryTo)) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'expiryDate') {
        return new Date(a.expiryDate) - new Date(b.expiryDate);
      } else if (sortBy === 'quantity') {
        return a.quantity - b.quantity;
      }
      return 0;
    });
  }, [data, statusFilter, supplierFilter, expiryFrom, expiryTo, sortBy]);

  // Role-based access
  if (userRole !== 'Super Admin' && userRole !== 'Pantry Admin') {
    return <div className="alert alert-danger mt-5 text-center">Access Denied</div>;
  }

  const handleShowModal = (mode, item = null) => {
    setModalMode(mode);
    setForm(item ? { ...item } : {
      id: '',
      itemName: '',
      quantity: '',
      unit: 'kg',
      expiryDate: '',
      supplier: '',
      purchaseDate: '',
      storageLocation: '',
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

  return (
    <div className="container py-4 food-inventory-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Food Inventory Dashboard</h2>
        <Button variant="primary" onClick={() => handleShowModal('add')}><FaPlus className="me-2" />Add New Item</Button>
      </div>
      {/* Filters */}
      <div className="card p-3 mb-4 shadow-sm">
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
            <Form.Label>Expiry From</Form.Label>
            <Form.Control type="date" value={expiryFrom} onChange={e => setExpiryFrom(e.target.value)} />
          </Col>
          <Col md={3}>
            <Form.Label>Expiry To</Form.Label>
            <Form.Control type="date" value={expiryTo} onChange={e => setExpiryTo(e.target.value)} />
          </Col>
        </Row>
        <Row className="g-3 mt-2">
          <Col md={3}>
            <Form.Label>Sort By</Form.Label>
            <Form.Select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="expiryDate">Expiry Date (Soonest First)</option>
              <option value="quantity">Quantity (Lowest First)</option>
            </Form.Select>
          </Col>
          <Col md={9} className="d-flex align-items-end gap-2 justify-content-end">
            <Button variant="outline-success" disabled><FaFileCsv className="me-1" />Export CSV</Button>
            <Button variant="outline-danger" disabled><FaFilePdf className="me-1" />Export PDF</Button>
            <Button variant="outline-secondary" disabled><FaHistory className="me-1" />Stock History</Button>
          </Col>
        </Row>
      </div>
      {/* Inventory Table */}
      <div className="table-responsive">
        <Table striped bordered hover className="align-middle food-table">
          <thead className="table-primary">
            <tr>
              <th>Food Item Name</th>
              <th>Quantity in Stock</th>
              <th>Expiry Date</th>
              <th>Supplier Name</th>
              <th>Storage Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr><td colSpan={7} className="text-center">No food items found.</td></tr>
            ) : (
              filteredData.map(item => {
                const status = getStatus(item);
                return (
                  <tr key={item.id} className={status === STATUS.EXPIRED ? 'expired-row' : status === STATUS.LOW ? 'low-row' : ''}>
                    <td>{item.itemName}</td>
                    <td>{item.quantity} {item.unit}</td>
                    <td>{item.expiryDate}</td>
                    <td>{item.supplier}</td>
                    <td>{item.storageLocation || '-'}</td>
                    <td>
                      <Badge bg={status === STATUS.IN_STOCK ? 'success' : status === STATUS.LOW ? 'warning' : 'danger'}>{status}</Badge>
                    </td>
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
      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === 'add' ? 'Add New Food Item' : 'Edit Food Item'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body>
            {formError && <div className="alert alert-danger py-2">{formError}</div>}
            <Row className="g-3">
              <Col md={6}>
                <Form.Label>Item Name *</Form.Label>
                <Form.Control name="itemName" value={form.itemName} onChange={handleFormChange} required />
              </Col>
              <Col md={3}>
                <Form.Label>Quantity *</Form.Label>
                <Form.Control name="quantity" type="number" min={0} value={form.quantity} onChange={handleFormChange} required />
              </Col>
              <Col md={3}>
                <Form.Label>Unit *</Form.Label>
                <Form.Select name="unit" value={form.unit} onChange={handleFormChange} required>
                  {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Label>Expiry Date *</Form.Label>
                <Form.Control name="expiryDate" type="date" value={form.expiryDate} onChange={handleFormChange} required />
              </Col>
              <Col md={6}>
                <Form.Label>Supplier Name *</Form.Label>
                <Form.Control name="supplier" value={form.supplier} onChange={handleFormChange} required />
              </Col>
              <Col md={6}>
                <Form.Label>Purchase Date</Form.Label>
                <Form.Control name="purchaseDate" type="date" value={form.purchaseDate} onChange={handleFormChange} />
              </Col>
              <Col md={6}>
                <Form.Label>Storage Location</Form.Label>
                <Form.Control name="storageLocation" value={form.storageLocation} onChange={handleFormChange} />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit">{modalMode === 'add' ? 'Add Item' : 'Save Changes'}</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default FoodInventoryDashboard; 