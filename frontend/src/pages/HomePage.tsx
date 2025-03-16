import React from 'react';
import { Link } from 'react-router-dom';
import "./HomePage.css";



export default function HomePage() {
  return (
    <div className="homepage-container">
      <div className="card-containerz">
        {/* Restaurant Owner Card */}

        {/* Tourist Card */}
        <Link to="/customer" className="cardz">
          <h3 className="card-titlez">I'm a Tourist</h3>
          <p className="card-textz">Browse and translate menus instantly, no language barrier!</p>
        </Link>
        <Link to="/restaurants" className="cardz">
          <h3 className="card-titlez">I'm a Restaurant Owner</h3>
          <p className="card-textz">Upload and manage your restaurant menus for easy translation.</p>
        </Link>
      </div>

    </div>
  );
}