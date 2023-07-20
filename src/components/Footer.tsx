import React from 'react';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__contact">
        <div className="footer__contact-info">
          <span className="footer__contact-label">Phone:</span>
          <span className="footer__contact-value">123-456-7890</span>
        </div>
        <div className="footer__contact-info">
          <span className="footer__contact-label">Email:</span>
          <span className="footer__contact-value">info@example.com</span>
        </div>
      </div>
      <div className="footer__links">
        <Link to='/aboutus' className="footer__link-button">About Us</Link>
        <Link to='/news' className="footer__link-button">News</Link>
      </div>
    </footer>
  );
};

export default Footer;