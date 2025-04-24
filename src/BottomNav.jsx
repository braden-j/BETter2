import React from 'react';
import './BottomNav.css';

import bookIcon from './assets/BookIcon.png';
import pencilIcon from './assets/PencilIcon.png';
import userIcon from './assets/UserIcon.png';
import nextIcon from './assets/arrow.png';

function BottomNav({ onNextClick, nextLabel = 'Next', showUtilityButtons = true, showNextButton = true }) {
  return (
    <div className="bottom-nav">
      {showUtilityButtons && (
        <div className="bottom-buttons">
          <button>
            <img src={bookIcon} className="icon" alt="Book" />
          </button>
          <button>
            <img src={pencilIcon} className="icon" alt="Pencil" />
          </button>
          <button>
            <img src={userIcon} className="icon" alt="User" />
          </button>
        </div>
      )}

      {showNextButton && (
        <button className="next-btn" onClick={onNextClick}>
          <img src={nextIcon} className="next-button-icon" alt="Next" />
          <span className="next-button-label">{nextLabel}</span>
        </button>
      )}
    </div>
  );
}

export default BottomNav;
