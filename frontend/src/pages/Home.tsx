import React, { useState, useEffect, useRef } from 'react';
import RestaurantCard from '../components/RestaurantCard';
import RestaurantFormPopup from '../components/RestaurantFormPopup';
import "./Home.css";

interface HomeProps {
  refresh: boolean;
}

export default function Home({ refresh }: HomeProps) {
  const [restaurants, setRestaurants] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [menuJson, setMenuJson] = useState(null);  // JSON from /upload_menu/
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fetchRestaurants = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/restaurants/');
      const data = await res.json();
      setRestaurants(data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [refresh]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error starting camera", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleUploadMenuClick = async () => {
    setCameraActive(true);
    await startCamera();
  };

  const captureAndProcess = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL('image/png');

      // Stop camera and hide overlay
      stopCamera();
      setCameraActive(false);
      
      setUploading(true);
      try {
        const response = await fetch('http://127.0.0.1:8000/upload_menu/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: imageDataUrl })
        });
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        const data = await response.json();
        // Save JSON and show the form popup with pre-filled data
        setMenuJson(data);
        setShowFormPopup(true);
      } catch (error) {
        console.error("Error uploading menu:", error);
        setErrorMessage("Error uploading menu");
      }
      setUploading(false);
      fetchRestaurants();
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Restaurants</h2>
      <button onClick={handleUploadMenuClick} disabled={uploading}>
        {uploading ? "Processing..." : "Upload Menu"}
      </button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {restaurants.map((restaurant: any) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} onRestaurantUpdated={fetchRestaurants} />
        ))}
      </div>
      {cameraActive && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000
        }}>
          <video ref={videoRef} style={{ width: '80%', maxWidth: '400px' }} />
          <button onClick={captureAndProcess} style={{ marginTop: '1rem' }}>
            Capture & Process Menu
          </button>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <button onClick={() => { stopCamera(); setCameraActive(false); }} style={{ marginTop: '1rem' }}>
            Cancel
          </button>
        </div>
      )}
      {showFormPopup && menuJson && (
        <RestaurantFormPopup
          initialData={menuJson}
          onClose={() => setShowFormPopup(false)}
          onRestaurantAdded={() => {
            setShowFormPopup(false);
            setMenuJson(null);
            fetchRestaurants();
          }}
        />
      )}
    </div>
  );
}