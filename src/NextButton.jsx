import React from 'react';
import './NextButton.css';
import nextIcon from './assets/arrow.png';

function NextButton({ onClick }) {
  return (
    <div className="custom-next-button" onClick={onClick}>
      <img 
        src={nextIcon} 
        alt="Next" 
        className="next-button-icon" 
      />
    </div>
  );
}

export default NextButton;