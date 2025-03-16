import React, { useState, useEffect } from 'react';
import './RestaurantForm.css';

interface MenuItem {
  name: string;
  description: string;
  price: string; // keeping as string for input, will convert on submit
}

interface RestaurantFormProps {
  onRestaurantAdded: () => void;
  initialData?: {
    name: string;
    description: string;
    menu_items: MenuItem[];
  };
}

export default function RestaurantForm({ onRestaurantAdded, initialData }: RestaurantFormProps) {
  const [name, setName] = useState(initialData ? initialData.name : '');
  const [description, setDescription] = useState(initialData ? initialData.description : '');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(
    initialData ? initialData.menu_items : [{ name: '', description: '', price: '' }]
  );
  const [adminPassword, setAdminPassword] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setMenuItems(initialData.menu_items);
    }
  }, [initialData]);

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
        admin_password: adminPassword,
        menu_items: formattedMenuItems,
      }),
    });
    if (res.ok) {
      // Clear fields and trigger refresh
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
    <div className="main-content">
      <form onSubmit={handleSubmit} className="restaurant-form">
        <h2>Add Restaurant</h2>
        <input 
          type="text" 
          placeholder="Restaurant Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          required
          className="input-field"
        /><br/>
        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          required
          className="textarea-field"
        /><br/>
        <h3>Menu Items</h3>
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item-container">
            <input 
              type="text" 
              placeholder="Dish Name" 
              value={item.name} 
              onChange={(e) => handleMenuItemChange(index, 'name', e.target.value)}
              required
              className="input-field"
            /><br/>
            <input 
              type="text" 
              placeholder="Dish Description" 
              value={item.description} 
              onChange={(e) => handleMenuItemChange(index, 'description', e.target.value)}
              className="input-field"
            /><br/>
            <input 
              type="number" 
              placeholder="Price" 
              value={item.price} 
              onChange={(e) => handleMenuItemChange(index, 'price', e.target.value)}
              required
              className="input-field"
            /><br/>
          </div>
        ))}
        <button type="button" onClick={addMenuItemField} className="add-menu-item-button">
          Add Another Menu Item
        </button><br/><br/>
        <input 
          type="password" 
          placeholder="Admin Password" 
          value={adminPassword} 
          onChange={(e) => setAdminPassword(e.target.value)}
          required
          className="input-field"
        /><br/>
        <button type="submit" className="submit-button">Add Restaurant</button>
      </form>
    </div>
  );
}