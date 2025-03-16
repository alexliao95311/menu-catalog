import React from 'react';
 import RestaurantForm from './RestaurantForm';
 
 interface RestaurantFormPopupProps {
   initialData: {
     name: string;
     description: string;
     menu_items: { name: string; description: string; price: string }[];
   };
   onClose: () => void;
   onRestaurantAdded: () => void;
 }
 
 export default function RestaurantFormPopup({ initialData, onClose, onRestaurantAdded }: RestaurantFormPopupProps) {
   return (
     <div className="popup-overlay">
       <div className="popup-content">
         <button onClick={onClose} className="close-button">X</button>
         <RestaurantForm onRestaurantAdded={onRestaurantAdded} initialData={initialData} />
       </div>
     </div>
   );
 }