// frontend/src/components/RestaurantCard.tsx
import React from 'react';

export default function RestaurantCard({ restaurant }: { restaurant: any }) {
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
    </div>
  );
}