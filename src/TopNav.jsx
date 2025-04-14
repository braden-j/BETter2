import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TopNav.css';

function TopNav({ title, date, onBackClick, showBack = true, onSaveExitClick }) {
  const navigate = useNavigate();

  return (
    <div className="top-nav">
      <div className="timeframe">
        <h3>{title}</h3>
        <div className="date">{date}</div>
      </div>
      <div className="nav-buttons"> 
        {showBack && (<button onClick={onBackClick}>Back</button>)}
        <button onClick={onSaveExitClick}>Save & Exit</button>
      </div>
    </div>
  );
}

export default TopNav;
