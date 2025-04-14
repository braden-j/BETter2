import React from 'react';
import './BottomNav.css';

import bookIcon from './assets/BookIcon.png';
import pencilIcon from './assets/PencilIcon.png';
import userIcon from './assets/UserIcon.png';

function BottomNav({ onNextClick, nextLabel, showUtilityButtons = true }) {
  return (
    <div className="bottom-nav">
      {showUtilityButtons && (
        <div className="bottom-buttons">
          <button> 
            <img src={bookIcon}  className="icon" />
          </button>
          <button> 
            <img src={pencilIcon}  className="icon" />
          </button>
          <button> 
            <img src={userIcon}  className="icon" />
          </button>
        </div>
      )}
      <button 
        className="next-btn" 
        onClick={onNextClick}
      >
        {nextLabel || 'Next'}
      </button>
    </div>
  );
}

export default BottomNav;
