import React, { useState } from 'react';
import API from '../api';

const AddItem = () => {
  const [item, setItem] = useState({
    name: '',
    category: '',
    unit: '',
    description: '',
  });

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/items', item);
      alert('Item added successfully!');
      setItem({ name: '', category: '', unit: '', description: '' });
    } catch (error) {
      console.error(error);
      alert('Error adding item');
    }
  };

  return (
    <div>
      <h3>Add New Item</h3>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Item Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            required
            value={item.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            name="category"
            className="form-select"
            required
            value={item.category}
            onChange={handleChange}
          >
            <option value="">Select category</option>
            <option value="Aluminium">Aluminium</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Unit (e.g., kg, m, pcs)</label>
          <input
            type="text"
            name="unit"
            className="form-control"
            value={item.unit}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="3"
            value={item.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
