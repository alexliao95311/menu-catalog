import React, { useState, useEffect } from 'react';
import RestaurantCard from '../components/RestaurantCard';
import "./Home.css";

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
    <div style={{ padding: '1rem', backgroundColor: 'black', height: '100vh' }}>
      <h2 style={{color:"white",backgroundColor: 'black',fontSize:"300%"}}>Restaurants</h2>
      <div style={{backgroundColor: 'black',display: 'flex', flexWrap: 'wrap', }}>
        {restaurants.map((restaurant: any) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} onRestaurantUpdated={fetchRestaurants} />
        ))}
      </div>
    </div>
  );
}
