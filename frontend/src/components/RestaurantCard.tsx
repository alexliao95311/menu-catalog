// frontend/src/components/RestaurantCard.tsx
import React, { useState } from 'react';
import RestaurantEditForm from './RestaurantEditForm';

interface RestaurantCardProps {
  restaurant: any;
  onRestaurantUpdated: () => void;
}

export default function RestaurantCard({ restaurant, onRestaurantUpdated }: RestaurantCardProps) {
  const [editing, setEditing] = useState(false);
  const [translatedMenu, setTranslatedMenu] = useState<string | null>(null);
  const [translating, setTranslating] = useState(false);

  // Function to handle translation of the restaurant's menu items.
  const handleTranslateMenu = async () => {
    setTranslating(true);
    // Combine menu items into one text block.
    const menuText = restaurant.menu_items && restaurant.menu_items.length > 0 
      ? restaurant.menu_items
          .map((item: any) => `Dish: ${item.name}\nDescription: ${item.description}\nPrice: ${item.price}`)
          .join("\n\n")
      : "No menu items available.";

    try {
      const response = await fetch("http://127.0.0.1:8000/translate/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: menuText,
          target_language: "zh-CN"  // Change target_language as needed ("zh-TW" or "en")
        })
      });
      if (response.ok) {
        const data = await response.json();
        setTranslatedMenu(data.translated_text);
      } else {
        alert("Translation failed");
      }
    } catch (error) {
      console.error("Error translating menu:", error);
    } finally {
      setTranslating(false);
    }
  };

  const toggleEdit = () => setEditing((prev) => !prev);

  return (
    <div className="card" style={{}}>
      <h3>{restaurant.name}</h3>
      <p>{restaurant.description}</p>
      {restaurant.menu_items && restaurant.menu_items.length > 0 ? (
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
      ) : (
        <p>No menu items available.</p>
      )}
      <button onClick={handleTranslateMenu} disabled={translating} style={{ marginRight: "1rem" }}>
        {translating ? "Translating..." : "Translate Menu"}
      </button>
      <button onClick={toggleEdit}>
        {editing ? "Cancel Edit" : "Edit"}
      </button>
      {translatedMenu && (
        <div style={{}}>
          <h4>Translated Menu (Chinese Simplified):</h4>
          <pre style={{ whiteSpace: "pre-wrap" }}>{translatedMenu}</pre>
        </div>
      )}
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