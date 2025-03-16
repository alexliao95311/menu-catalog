import React from 'react';
import "./About.css";

export default function AboutPage() {
  return (
    <div className="about-container">
      <h1 className="title">About Us</h1>

      <div className="card">
        <h3 className="info-header">Project Overview</h3>
        <p>
          Our app revolutionizes restaurant menu accessibility with AI-powered translations, a digital menu platform, and 
          admin insights. Restaurant owners can manage their menus effortlessly, while customers enjoy a seamless, 
          multi-language browsing experience.
        </p>
      </div>

      <div className="card">
        <h3 className="info-header">Mission & Vision</h3>
        <p>
          We aim to bridge language barriers in Chinatown and beyond, ensuring that every customer, regardless of their 
          language, can understand what they’re ordering. Our vision is to empower restaurants with smart, AI-driven solutions 
          that enhance customer experiences.
        </p>
        <p>
          <strong>Mission:</strong> To empower Chinatown restaurants with innovative digital tools that enhance accessibility, streamline management, and improve customer engagement.
        </p>
        <p>
          <strong>Vision:</strong> A seamless dining experience where language barriers are eliminated, and every restaurant can showcase its offerings effortlessly.
        </p>
      </div>

      <div className="card">
        <h3 className="info-header">How It Works</h3>
        <ul>
        <li><strong>For Restaurant Owners:</strong> Easily upload and manage menus, categorize dishes, and provide multi-language support.</li>
          <li><strong>AI-Powered Translation:</strong> Convert menu images into readable, translated text for a wider audience.</li>
          <li><strong>For Customers:</strong> Browse restaurant menus in multiple languages, filter by dietary preferences, and access menus via QR codes.</li>
          <li><strong>Insights & Analytics:</strong> Gain valuable data on customer preferences and optimize restaurant offerings.</li>
        </ul>
      </div>
    </div>
  );
}
