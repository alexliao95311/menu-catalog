import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ViewRestaurants from './pages/ViewRestaurants';
import AboutPage from './pages/About';
import RestaurantForm from './components/RestaurantForm';
import backgroundIMG from './red.jpg';

const TranslationForm: React.FC = () => {
  return (
    <div>
      {/* Your form JSX here */}
    </div>
  );
};

function App() {
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleRestaurantAdded = () => {
    setShowForm(false);
    setRefresh((prev) => !prev);
  };

  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav
          style={{
            backgroundImage: `url(${backgroundIMG})`,
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
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            color: '#fff',
            fontFamily: 'Poppins, sans-serif', /* Apply Poppins font to navbar */
          }}
        >
          <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            <h1 style={{ fontSize: '200%' }}>Digital Menu App</h1>
          </div>
          <div>
            <Link
              to="/"
              style={{
                marginRight: '1rem',
                color: 'white',
                textDecoration: 'none',
                fontFamily: 'Poppins, sans-serif', /* Apply Poppins font to links */
              }}
            >
              Home
            </Link>
            <Link
              to="/restaurants"
              style={{
                marginRight: '1rem',
                color: 'white',
                textDecoration: 'none',
                fontFamily: 'Poppins, sans-serif', /* Apply Poppins font to links */
              }}
            >
              Restaurants
            </Link>
            <button
              onClick={toggleForm}
              style={{
                marginLeft: '1rem',
                padding: '0.5rem 1rem',
                fontSize: '1rem',
                backgroundColor: 'white',
                color: 'black',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '5px',
                height: '100%',
                width: '100%',
                fontFamily: 'Poppins, sans-serif', /* Apply Poppins font to button */
              }}
            >
              {showForm ? 'Close Form' : 'Add Restaurant'}
            </button>
          </div>
        </nav>

        {/* Prevent content from being hidden under fixed navbar */}
        <div style={{ paddingTop: '80px' }}>
          {showForm && <RestaurantForm onRestaurantAdded={handleRestaurantAdded} />}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/restaurants" element={<ViewRestaurants refresh={refresh} />} />
            <Route path="/about" element={<AboutPage refresh={refresh} />} />
          </Routes>
          <TranslationForm />
        </div>
      </div>
    </Router>
  );
}

export default App;
