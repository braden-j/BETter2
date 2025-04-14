import React from 'react';
import './NextButton.css';
import nextIcon from './assets/arrow.png';

function NextButton({ onClick, label = "Next" }) {
    return (
    <div className="custom-next-button-container">
      {label && <span className="custom-next-button-label">{label}</span>}
      <div className="custom-next-button" onClick={onClick}>
        <img 
          src={nextIcon} 
          alt="Next" 
          className="next-button-icon" 
        />
      </div>
    </div>
  );
}

export default NextButton;