import React, { useState, useEffect } from 'react';
import RestaurantCard from '../components/RestaurantCard';

interface HomeProps {
  refresh: boolean;
}

export default function Home({ refresh }: HomeProps) {
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    const res = await fetch('http://127.0.0.1:8000/restaurants/');
    const data = await res.json();
    setRestaurants(data);
  };

  // Re-fetch whenever "refresh" changes.
  useEffect(() => {
    fetchRestaurants();
  }, [refresh]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Restaurants</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {restaurants.map((restaurant: any) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} onRestaurantUpdated={fetchRestaurants} />
        ))}
      </div>
    </div>
  );
}