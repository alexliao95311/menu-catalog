import React, { useState } from 'react';
import './RestaurantEditForm.css'; // Import the new CSS file

interface MenuItemForm {
  name: string;
  description: string;
  price: string;
}

interface RestaurantEditFormProps {
  restaurant: any;
  onEditComplete: () => void;
}

export default function RestaurantEditForm({ restaurant, onEditComplete }: RestaurantEditFormProps) {
  const [name, setName] = useState(restaurant.name);
  const [description, setDescription] = useState(restaurant.description);
  const [menuItems, setMenuItems] = useState<MenuItemForm[]>(
    restaurant.menu_items.map((item: any) => ({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
    }))
  );
  const [adminPassword, setAdminPassword] = useState(''); // New state for admin password

  const handleMenuItemChange = (index: number, field: keyof MenuItemForm, value: string) => {
    const updatedItems = [...menuItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setMenuItems(updatedItems);
  };

  const addMenuItemField = () => {
    setMenuItems([...menuItems, { name: '', description: '', price: '' }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedMenuItems = menuItems.map((item) => ({
      name: item.name,
      description: item.description,
      price: parseFloat(item.price),
    }));
    const res = await fetch(`http://127.0.0.1:8000/restaurants/${restaurant.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        description,
        admin_password: adminPassword,  // Include admin password in update request
        menu_items: formattedMenuItems
      })
    });
    if (res.ok) {
      onEditComplete();
    } else {
      alert('Failed to update restaurant');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="restaurant-edit-form">
      <h3>Edit Restaurant</h3>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        required 
        className="input-field"
      /><br/>
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)}
        required
        className="textarea-field"
      /><br/>
      <h4>Menu Items</h4>
      {menuItems.map((item: MenuItemForm, index: number) => (
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
      <button type="button" onClick={addMenuItemField} className="add-menu-item-button">Add Another Menu Item</button><br/><br/>
      <button type="submit" className="submit-button">Update Restaurant</button>
      {/* Input for admin password required for editing */}
      <input 
        type="password" 
        placeholder="Enter Admin Password" 
        value={adminPassword} 
        onChange={(e) => setAdminPassword(e.target.value)}
        required
      /><br/><br/>
      
      <button type="submit">Update Restaurant</button>
    </form>
  );
}
