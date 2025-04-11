import React, { useState } from 'react';
import API from '../api';

const StockTransaction = () => {
  const [stock, setStock] = useState({
    itemName: '',
    quantity: '',
    transactionType: 'in',
    date: '',
    notes: ''
  });

  const handleChange = (e) => {
    setStock({ ...stock, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/stock', stock);
      alert(`Stock ${stock.transactionType} recorded!`);
      setStock({ itemName: '', quantity: '', transactionType: 'in', date: '', notes: '' });
    } catch (error) {
      console.error(error);
      alert('Error submitting stock entry');
    }
  };

  return (
    <div>
      <h3>Stock In / Out</h3>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Item Name</label>
          <input type="text" name="itemName" className="form-control" required value={stock.itemName} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input type="number" name="quantity" className="form-control" required value={stock.quantity} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Transaction Type</label>
          <select name="transactionType" className="form-select" value={stock.transactionType} onChange={handleChange}>
            <option value="in">Stock In</option>
            <option value="out">Stock Out</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input type="date" name="date" className="form-control" value={stock.date} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Notes</label>
          <textarea name="notes" className="form-control" rows="2" value={stock.notes} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
};

export default StockTransaction;
