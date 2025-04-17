import React, { useEffect, useState } from 'react';
import API from '../api';

const Items = () => {
  const [items, setItems] = useState([]);
  const [editingItemCode, setEditingItemCode] = useState(null);
  const [formData, setFormData] = useState({
    itemCode: '',
    name: '',
    category: '',
    unit: '',
    length: 0,
    quantity: 0,
    description: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchItems = async () => {
    const res = await API.get('/items');
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (itemCode) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await API.delete(`/items/${itemCode}`);
      fetchItems();
    }
  };

  const handleEditClick = (item) => {
    setEditingItemCode(item.itemCode[0]);
    setFormData({ ...item, itemCode: item.itemCode[0] });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await API.put(`/items/${editingItemCode}`, {
      ...formData,
      itemCode: [formData.itemCode]
    });
    setEditingItemCode(null);
    fetchItems();
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.itemCode.length && item.itemCode[0].toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <h3>Items List</h3>

      <input
        type="text"
        className="form-control mb-3 mt-3"
        placeholder="Search by name or item code..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Sl.No</th>
            <th>Item Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Unit</th>
            <th>Length</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, index) =>
            editingItemCode === item.itemCode[0] ? (
              <tr key={index}>
                <td>{index + 1}</td>
                <td><input type="text" name="itemCode" value={formData.itemCode} onChange={handleEditChange} className="form-control" /></td>
                <td><input type="text" name="name" value={formData.name} onChange={handleEditChange} className="form-control" /></td>
                <td><input type="text" name="category" value={formData.category} onChange={handleEditChange} className="form-control" /></td>
                <td><input type="text" name="unit" value={formData.unit} onChange={handleEditChange} className="form-control" /></td>
                <td><input type="number" name="length" value={formData.length} onChange={handleEditChange} className="form-control" /></td>
                <td><input type="number" name="quantity" value={formData.quantity} onChange={handleEditChange} className="form-control" /></td>
                <td><input type="text" name="description" value={formData.description} onChange={handleEditChange} className="form-control" /></td>
                <td>
                  <button className="btn btn-sm btn-success me-2" onClick={handleEditSubmit}>Save</button>
                  <button className="btn btn-sm btn-secondary" onClick={() => setEditingItemCode(null)}>Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.itemCode[0]}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.unit}</td>
                <td>{item.length}</td>
                <td>{item.quantity}</td>
                <td>{item.description}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditClick(item)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.itemCode[0])}>Delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Items;
