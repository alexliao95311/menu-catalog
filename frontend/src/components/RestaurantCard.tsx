// frontend/src/components/RestaurantCard.tsx
import React from 'react';

export default function RestaurantCard({ restaurant }: { restaurant: any }) {
  return (
    <div className="card">
      <h3>{restaurant.name}</h3>
      <p>{restaurant.description}</p>
      {restaurant.menu && <p>Menu: {restaurant.menu}</p>}
      {restaurant.price && <p>Price: ${restaurant.price}</p>}
    </div>
  );
}