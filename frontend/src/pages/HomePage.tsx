import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to Our Restaurant App!</h1>
      <p>This is your home page. Start by exploring the best restaurants around.</p>
      <Link to="/restaurants">
        <button>View Restaurants</button>
      </Link>
    </div>
  );
}