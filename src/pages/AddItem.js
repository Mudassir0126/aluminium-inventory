import React, { useState } from 'react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(item); // Replace this with API call
    alert('Item added successfully!');
  };

  return (
    <div>
      <h3>Add New Item</h3>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Item Name</label>
          <input type="text" name="name" className="form-control" required value={item.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input type="text" name="category" className="form-control" required value={item.category} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Unit (e.g., kg, m, pcs)</label>
          <input type="text" name="unit" className="form-control" value={item.unit} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" rows="3" value={item.description} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
