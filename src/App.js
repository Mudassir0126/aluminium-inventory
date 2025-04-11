import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Items from './pages/Items';
import Stock from './pages/Stock';
import AddItem from './pages/AddItem';
import StockTransaction from './pages/StockTransaction';
import 'bootswatch/dist/lux/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
          <Link className="navbar-brand" to="/">Lanka Swisstek</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/items">Items</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/stock">Stock</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-item">Add Item</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/stockTransaction">StockTransaction</Link>
              </li>

            </ul>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/items" element={<Items />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/items" element={<Items />} />
            <Route path="/add-item" element={<AddItem />} />
            <Route path="/stockTransaction" element={<StockTransaction />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
