// frontend/src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import RestaurantCard from '../components/RestaurantCard';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    const res = await fetch('http://127.0.0.1:8000/restaurants/');
    const data = await res.json();
    setRestaurants(data);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Restaurants</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {restaurants.map((restaurant: any) => (
          <RestaurantCard 
            key={restaurant.id} 
            restaurant={restaurant} 
            onRestaurantUpdated={fetchRestaurants} 
          />
        ))}
      </div>
    </div>
  );
}