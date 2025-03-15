// frontend/src/components/RestaurantEditForm.tsx
import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ddd', padding: '1rem', marginTop: '1rem' }}>
      <h3>Edit Restaurant</h3>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        required 
      /><br/>
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)}
        required
      /><br/>
      <h4>Menu Items</h4>
      {menuItems.map((item: MenuItemForm, index: number) => (
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
      <button type="submit">Update Restaurant</button>
    </form>
  );
}