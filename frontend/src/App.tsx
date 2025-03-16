import React, { useState } from 'react';
import Home from './pages/Home';
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
    <div>
      {/* Navbar */}
    <nav style={{ 
      backgroundImage: `url(${backgroundIMG})`, 
      backgroundSize: '50%', // Zooms out the image by increasing its size
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
      color: '#fff'
    }}>
        <div className="logo" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          <h1 style={{fontSize:"200%"}}>Digital Menu App</h1>
        </div>
        <div>
          
          <button 
            onClick={toggleForm} 
            style={{ 
              marginLeft: "1rem", 
              padding: "0.5rem 1rem", 
              fontSize: "1rem", 
             /* backgroundColor: "#E3B23C", */
              backgroundColor: "white",
              color: "black", 
              border: "none", 
              cursor: "pointer", 
              borderRadius: "5px" ,
              height: "100%",
              width:"100%"
            }}
          >
            {showForm ? "Close Form" : "Add Restaurant"}
          </button>
        </div>
      </nav>

      {/* Prevent content from being hidden under fixed navbar */}
      <div style={{ paddingTop: "80px" }}>
        {showForm && <RestaurantForm onRestaurantAdded={handleRestaurantAdded} />}
        <Home refresh={refresh} />
        <TranslationForm />
      </div>
    </div>
  );
}

export default App;