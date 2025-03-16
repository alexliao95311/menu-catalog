import React from 'react';
import "./About.css";

export default function AboutPage() {
  return (
    <div className="about-container">
      <h1 className="title">About Us</h1>

      <div className="card">
        <h3 className="info-header">Project Overview</h3>
        <p>
        Our app revolutionizes restaurant menu accessibility with AI-powered translations, a digital menu platform, and admin insights. What sets us apart is our ability to seamlessly integrate real-time translations for diverse languages, making menus accessible to a broader audience. Unlike traditional translation tools, our app leverages advanced AI to ensure accuracy and cultural relevance, enhancing the dining experience for both restaurant owners and customers. Restaurant owners can manage their menus effortlessly, while customers enjoy a seamless, multi-language browsing experience, eliminating language barriers and increasing engagement.
        </p>
      </div>

      <div className="card">
        <h3 className="info-header">Mission & Vision</h3>
        <p>
          <strong>Mission:</strong> Our mission is to bridge language barriers in Chinatown and beyond, ensuring that every customer, regardless of language, can easily understand and enjoy their dining experience. We are dedicated to empowering restaurants with cutting-edge, AI-driven solutions that not only streamline menu management but also enhance customer interactions and satisfaction.
        </p>
        <p>
          <strong>Vision:</strong> We envision a world where every dining experience is seamless and inclusive, with no language barriers standing in the way of a customer’s ability to explore, order, and enjoy their meal. Our goal is to provide restaurants with the tools they need to effortlessly communicate their offerings, creating a more connected and enjoyable experience for all.
        </p>
      </div>

      <div className="card">
        <h3 className="info-header">How It Works</h3>
        <ul>
        <li><strong>For Restaurant Owners:</strong> Effortlessly upload, organize, and update menus, categorize dishes, and offer multi-language support, all through a user-friendly platform designed to save time and improve efficiency.</li>
          <li><strong>AI-Powered Translation:</strong> Leverage advanced AI technology to transform menu images into accurate, readable translations, making your offerings accessible to a diverse, global audience.</li>
          <li><strong>For Customers:</strong> Explore restaurant menus in multiple languages, customize your browsing experience by dietary preferences, and easily access menus via convenient QR codes for a seamless dining experience.</li>
          <li><strong>Insights & Analytics:</strong> Unlock valuable insights into customer preferences and behaviors, empowering restaurant owners to optimize menu offerings, improve service, and drive customer satisfaction.</li>
        </ul>
      </div>
    </div>
  );
}
