import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TopNav.css';

function TopNav({ title, date, onBackClick, showBack = true }) {
  const navigate = useNavigate();

  return (
    <div className="top-nav">
      <div className="back-button">
        <button 
          onClick={onBackClick} 
          style={{ visibility: showBack ? 'visible' : 'hidden' }}
        >
          Back
        </button>
      </div>
      <div className="title">
        <h3>{title}</h3>
      </div>
      <div className="date-display">
        {date}
      </div>
    </div>
  );
}

export default TopNav;