// src/CameraComponent.js
import React, { useRef, useState, useEffect } from 'react';

function CameraComponent() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setError('Unable to access camera. Please check permissions.');
      }
    }
    startCamera();
  }, []);

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL('image/png');
      setCapturedImage(imageDataUrl);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Camera Access</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <video ref={videoRef} style={{ width: '300px', border: '1px solid #ccc' }} />
          <br />
          <button onClick={captureImage} style={{ marginTop: '10px' }}>Capture Image</button>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {capturedImage && (
        <div style={{ marginTop: '20px' }}>
          <h3>Captured Image:</h3>
          <img src={capturedImage} alt="Captured" style={{ width: '300px', border: '1px solid #ccc' }} />
        </div>
      )}
    </div>
  );
}

export default CameraComponent;