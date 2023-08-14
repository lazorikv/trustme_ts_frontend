import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorPopupProps {
  message: string;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ message }) => {

    const navigator = useNavigate();

    const onClose = () => {
        navigator('/')
    }


    return (
        <div className="popup-container">
          <div className="popup">
            <p>{message}</p>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      );
};

export default ErrorPopup;