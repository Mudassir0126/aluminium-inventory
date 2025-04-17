import React, { useState } from 'react';
import API from '../api';

const AddItem = () => {
  const [item, setItem] = useState({
    itemCode: '',
    name: '',
    category: '',
    unit: '',
    length: '',
    quantity: '',
    description: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only alphanumeric characters for itemCode (no spaces or special characters)
    const sanitizedValue = name === 'itemCode' ? value.replace(/[^a-zA-Z0-9]/g, '') : value;

    setItem({ ...item, [name]: sanitizedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/items', item);
      alert('Item added successfully!');
      setItem({
        itemCode: '',
        name: '',
        category: '',
        unit: '',
        length: '',
        quantity: '',
        description: '',
      });
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
          <label className="form-label">Item Code</label>
          <input
            type="text"
            name="itemCode"
            className="form-control"
            required
            value={item.itemCode}
            onChange={handleChange}
          />
        </div>
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
            value={item.category}
            onChange={handleChange}
          >
            <option value="in">Aluminium</option>
            <option value="out">Accessories</option>
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
          <label className="form-label">Length</label>
          <input
            type="number"
            name="length"
            className="form-control"
            value={item.length}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            name="quantity"
            className="form-control"
            value={item.quantity}
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
        <button type="submit" className="btn btn-primary">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;
