import React from "react";
import "../style/Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>About Us</h3>
        <ul>
          <li><a href="/">About</a></li>
          <li><a href="/">Contact Us</a></li>
          <li><a href="/">Help Center</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Community</h3>
        <ul>
          <li><a href="/">Forums</a></li>
          <li><a href="/">Blog</a></li>
          <li><a href="/">Social Media</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Policies</h3>
        <ul>
          <li><a href="/">Privacy Policy</a></li>
          <li><a href="/">Terms and Conditions</a></li>
          <li><a href="/">Cookie Policy</a></li>
        </ul>
      </div>
      <div className="footer-copyright">
        &copy; 2023 NBay, All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
export {}