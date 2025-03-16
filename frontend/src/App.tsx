import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ViewRestaurants from './pages/ViewRestaurants';
import RestaurantForm from './components/RestaurantForm';
import backgroundIMG from './red.jpg';
import AboutPage from './pages/About';  // Adjusted import path
import Customer from './pages/customer';  // Correct lowercase import
import RestaurantDetail from './pages/RestaurantDetail';

const TranslationForm: React.FC = () => {
  return (
    <div>
      {/* Your form JSX here */}
    </div>
  );
};

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav
          style={{
            backgroundColor: "black",
            backgroundSize: '50%',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            height: '10%',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            boxShadow: '100px 10px 20px rgba(0, 0, 0, 0.3)',
            color: '#fff'
          }}
        >
          <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            <h1 style={{ fontSize: '200%' }}>DigiMenu</h1>
          </div>
          <div>
            <Link
              to="/"
              style={{ marginRight: '1rem', color: 'white', textDecoration: 'none', fontSize: "25px", margin:"40px" }}
            >
              Home
            </Link>
            <Link
              to="/about"
              style={{ marginRight: '1rem', color: 'white', textDecoration: 'none', fontSize: "25px" }}
            >
              About
            </Link>
          </div>
        </nav>

        <div style={{ paddingTop: '80px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/restaurants" element={<ViewRestaurants refresh={refresh} />} />
            <Route path="/about" element={<AboutPage />} /> {/* About page route added */}
            <Route path="/customer" element={<Customer/>} />  {/* Route to lowercase customer.tsx */}
            <Route path="/restaurants/:id" element={<RestaurantDetail />} />
          </Routes>
          <TranslationForm />
        </div>
      </div>
    </Router>
  );
}

export default App;
