import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./RestaurantDetail.css";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface Restaurant {
  id: number;
  name: string;
  description: string;
  image?: string;
  location?: string;
  menu_items: MenuItem[];
}

export default function RestaurantDetail() {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      setError('No restaurant ID provided');
      setLoading(false);
      return;
    }
    fetch(`http://127.0.0.1:8000/restaurants/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Restaurant) => {
        setRestaurant(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching restaurant details:", err);
        setError('Error fetching restaurant details');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading restaurant details...</p>;
  if (error) return <p>{error}</p>;
  if (!restaurant) return <p>No restaurant found.</p>;

  return (
    <div className="detail-overlay">
      <h2>{restaurant.name}</h2>
      <p>{restaurant.description}</p>
      {restaurant.image && (
        <img src={restaurant.image} alt={restaurant.name} style={{ maxWidth: '300px' }} />
      )}
      {restaurant.location && <p>Location: {restaurant.location}</p>}
      <h3>Menu</h3>
      {restaurant.menu_items && restaurant.menu_items.length > 0 ? (
        <ul>
          {restaurant.menu_items.map(item => (
            <li key={item.id}>
              <strong>{item.name}</strong> - {item.description} (${item.price})
            </li>
          ))}
        </ul>
      ) : (
        <p>No menu items available.</p>
      )}
    </div>
  );
}