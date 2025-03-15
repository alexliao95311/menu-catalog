// frontend/src/components/RestaurantForm.tsx
import React, { useState } from 'react';

interface RestaurantFormProps {
  onRestaurantAdded: () => void;
}

export default function RestaurantForm({ onRestaurantAdded }: RestaurantFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [menuItems, setMenuItems] = useState([{ name: '', description: '', price: '' }]);
  const [adminPassword, setAdminPassword] = useState('');

  const handleMenuItemChange = (index: number, field: string, value: string) => {
    const updatedItems = [...menuItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setMenuItems(updatedItems);
  };

  const addMenuItemField = () => {
    setMenuItems([...menuItems, { name: '', description: '', price: '' }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedMenuItems = menuItems.map(item => ({
      name: item.name,
      description: item.description,
      price: parseFloat(item.price),
    }));
    const res = await fetch('http://127.0.0.1:8000/restaurants/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description,
        admin_password: adminPassword,  // Include the admin password here
        menu_items: formattedMenuItems,
      }),
    });
    if (res.ok) {
      // Optionally, clear fields and trigger refresh
      setName('');
      setDescription('');
      setAdminPassword('');
      setMenuItems([{ name: '', description: '', price: '' }]);
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
        type="password" 
        placeholder="Admin Password" 
        value={adminPassword} 
        onChange={(e) => setAdminPassword(e.target.value)}
        required
      /><br/>
      <h3>Menu Items</h3>
      {menuItems.map((item, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
          <input 
            type="text" 
            placeholder="Dish Name" 
            value={item.name} 
            onChange={(e) => handleMenuItemChange(index, 'name', e.target.value)}
            required 
          /><br/>
          <input 
            type="text" 
            placeholder="Dish Description" 
            value={item.description} 
            onChange={(e) => handleMenuItemChange(index, 'description', e.target.value)}
          /><br/>
          <input 
            type="number" 
            placeholder="Price" 
            value={item.price} 
            onChange={(e) => handleMenuItemChange(index, 'price', e.target.value)}
            required 
          /><br/>
        </div>
      ))}
      <button type="button" onClick={addMenuItemField}>Add Another Menu Item</button><br/><br/>
      <button type="submit">Add Restaurant</button>
    </form>
  );
}