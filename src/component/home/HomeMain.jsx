import React from "react";
import "./HomeMain.css";
import { Link } from "react-router-dom";
function HomeMain() {
  return (
    <div className="video-container">
      <video autoPlay loop muted className="video-background">
        <source src="/Background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay">
        <h1 className="overlay-title">CLOTHIFY</h1>
        <button className="explore-btn">
          <Link to="explore/all">Discover Our Products</Link>
        </button>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 CLOTHIFY. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default HomeMain;
