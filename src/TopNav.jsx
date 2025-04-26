import React from 'react';
import './TopNav.css';

function TopNav({ title, date = "April 26th", onBackClick, showBack = true }) {
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