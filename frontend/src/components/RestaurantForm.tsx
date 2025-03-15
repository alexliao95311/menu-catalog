// frontend/src/components/RestaurantForm.tsx
import React, { useState } from 'react';

export default function RestaurantForm({ onRestaurantAdded }: { onRestaurantAdded: () => void }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [menu, setMenu] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://127.0.0.1:8000/restaurants/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        description,
        menu,
        price: parseFloat(price)
      })
    });
    if (res.ok) {
      // Optionally clear form fields and trigger a refresh
      setName('');
      setDescription('');
      setMenu('');
      setPrice('');
      onRestaurantAdded();
    } else {
      alert('Failed to add restaurant');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem', border: '1px solid #ddd', margin: '1rem' }}>
      <h2>Add Restaurant</h2>
      <input 
        type="text" 
        placeholder="Restaurant Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        required
      /><br/>
      <textarea 
        placeholder="Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)}
        required
      /><br/>
      <input 
        type="text" 
        placeholder="Menu (Dish Name)" 
        value={menu} 
        onChange={(e) => setMenu(e.target.value)}
      /><br/>
      <input 
        type="number" 
        placeholder="Price" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)}
      /><br/>
      <button type="submit">Add Restaurant</button>
    </form>
  );
}