// frontend/src/App.tsx
import React, { useState } from 'react';
import Home from './pages/Home';
import RestaurantForm from './components/RestaurantForm';
import TranslationForm from './components/TranslationForm';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  // Called when a restaurant is successfully added.
  const handleRestaurantAdded = () => {
    setShowForm(false);
    // Toggle the refresh flag so Home re-fetches restaurants.
    setRefresh((prev) => !prev);
  };

  return (
    <div>
      <header style={{ backgroundColor: "#f0f0f0", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Digital Menu App</h1>
        <button onClick={toggleForm}>
          {showForm ? "Close Form" : "Add Restaurant"}
        </button>
      </header>
      {showForm && <RestaurantForm onRestaurantAdded={handleRestaurantAdded} />}
      <Home refresh={refresh} />
      <TranslationForm />
    </div>
  );
}

export default App;