import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import RestaurantEditForm from './RestaurantEditForm';
import './RestaurantCard.css'; // Ensure this file contains your custom styles

interface RestaurantCardProps {
  restaurant: any;
  onRestaurantUpdated: () => void;
}

export default function RestaurantCard({ restaurant, onRestaurantUpdated }: RestaurantCardProps) {
  const [editing, setEditing] = useState(false);
  const [translatedMenu, setTranslatedMenu] = useState<string | null>(null);
  const [translating, setTranslating] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState<string>("zh-CN");
  const [showQrModal, setShowQrModal] = useState(false);

  // Use Vite's environment variable system for API URL
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://127.0.0.1:8000";

  // Function to handle translation of the restaurant's menu items.
  const handleTranslateMenu = async () => {
    setTranslating(true);
    const menuText = restaurant.menu_items && restaurant.menu_items.length > 0 
      ? restaurant.menu_items
          .map((item: any) => `Dish: ${item.name}\nDescription: ${item.description}\nPrice: ${item.price}`)
          .join("\n\n")
      : "No menu items available.";

    try {
      const response = await fetch(`${API_URL}/translate/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: menuText,
          target_language: targetLanguage  
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

  // Use the environment variable for the QR code URL as well.
  const qrUrl = `${API_URL}/restaurants/${restaurant.id}`;

  return (
    <div className="card">
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

      <div className="translate-section">
        <label htmlFor={`lang-select-${restaurant.id}`} className="translate-label">
          Translate to:
        </label>
        <select
          id={`lang-select-${restaurant.id}`}
          className="translate-dropdown"
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
        >
          <option value="zh-CN">Chinese Simplified</option>
          <option value="zh-TW">Chinese Traditional</option>
          <option value="en">English</option>
        </select>
      </div>

      <button onClick={handleTranslateMenu} disabled={translating} style={{ marginRight: "1rem" }}>
        {translating ? "Translating..." : "Translate Menu"}
      </button>
      <button onClick={toggleEdit} style={{ marginRight: "1rem" }}>
        {editing ? "Cancel Edit" : "Edit"}
      </button>
      <button onClick={() => setShowQrModal(true)}>
        Generate QR Code
      </button>

      {translatedMenu && (
        <div>
          <h4>Translated Menu ({targetLanguage}):</h4>
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
      {showQrModal && (
        <div className="popup-overlay">
          <div className="popup-container">
            <button onClick={() => setShowQrModal(false)} className="close-button">X</button>
            <h3>Scan to view menu</h3>
            <QRCodeCanvas value={qrUrl} size={200} />
            <p>{qrUrl}</p>
          </div>
        </div>
      )}
    </div>
  );
}