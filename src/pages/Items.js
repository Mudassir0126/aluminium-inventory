import React, { useEffect, useState } from 'react';
import API from '../api';

const Items = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: '', unit: '', description: '' });

  // Fetch all items
  const fetchItems = async () => {
    const res = await API.get('/items');
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await API.delete(`/items/${id}`);
      fetchItems();
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item.id);
    setFormData(item);
  };

  const handleEditChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await API.put(`/items/${editingItem}`, formData);
    setEditingItem(null);
    fetchItems();
  };

  return (
    <div>
      <h3>Items List</h3>
      <table className="table table-bordered table-hover mt-4">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Unit</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            editingItem === item.id ? (
              <tr key={item.id}>
                <td><input type="text" name="name" value={formData.name} onChange={handleEditChange} className="form-control" /></td>
                <td><input type="text" name="category" value={formData.category} onChange={handleEditChange} className="form-control" /></td>
                <td><input type="text" name="unit" value={formData.unit} onChange={handleEditChange} className="form-control" /></td>
                <td><input type="text" name="description" value={formData.description} onChange={handleEditChange} className="form-control" /></td>
                <td>
                  <button className="btn btn-sm btn-success me-2" onClick={handleEditSubmit}>Save</button>
                  <button className="btn btn-sm btn-secondary" onClick={() => setEditingItem(null)}>Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.unit}</td>
                <td>{item.description}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditClick(item)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Items;
