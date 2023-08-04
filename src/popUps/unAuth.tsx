import React from 'react';
import '../styles/UnauthorizedPopup.css';

interface UnauthorizedPopupProps {
  onLoginClick: () => void;
}

const UnauthorizedPopup: React.FC<UnauthorizedPopupProps> = ({ onLoginClick }) => {
  return (
    <div className="popup-container">
      <div className="popup">
        <p>Unauthorized access. Please login to continue.</p>
        <button onClick={onLoginClick}>Go to Login</button>
      </div>
    </div>
  );
};

export default UnauthorizedPopup;