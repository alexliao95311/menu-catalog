// frontend/src/App.tsx
import React, { useState } from 'react';
import Home from './pages/Home';
import RestaurantForm from './components/RestaurantForm';

function App() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div>
      <header>
        <h1>Digital Menu App</h1>
        <button onClick={toggleForm}>
          {showForm ? "Close Form" : "Add Restaurant"}
        </button>
      </header>
      {showForm && <RestaurantForm onRestaurantAdded={() => setShowForm(false)} />}
      <Home />
    </div>
  );
}

export default App;