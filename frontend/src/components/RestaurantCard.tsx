// frontend/src/components/RestaurantCard.tsx
import React, { useState } from 'react';
import RestaurantEditForm from './RestaurantEditForm';

interface RestaurantCardProps {
  restaurant: any;
  onRestaurantUpdated: () => void;
}

export default function RestaurantCard({ restaurant, onRestaurantUpdated }: RestaurantCardProps) {
  const [editing, setEditing] = useState(false);

  const toggleEdit = () => setEditing((prev) => !prev);

  return (
    <div className="card">
      <h3>{restaurant.name}</h3>
      <p>{restaurant.description}</p>
      {restaurant.menu_items && restaurant.menu_items.length > 0 && (
        <div>
          <h4>Menu Items:</h4>
          <ul>
            {restaurant.menu_items.map((item: any) => (
              <li key={item.id}>
                <strong>{item.name}</strong> - {item.description} (${item.price})
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={toggleEdit}>{editing ? "Cancel" : "Edit"}</button>
      {editing && (
        <RestaurantEditForm 
          restaurant={restaurant} 
          onEditComplete={() => {
            toggleEdit();
            onRestaurantUpdated();
          }} 
        />
      )}
    </div>
  );
}