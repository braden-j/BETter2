import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BottomNav.css';

import bookIcon from './assets/BookIcon.png';
import pencilIcon from './assets/PencilIcon.png';
import timeIcon from './assets/TimeIcon.png';
import nextIcon from './assets/arrow.png';

function BottomNav({ onNextClick, nextLabel = 'Next', showUtilityButtons = true, showNextButton = true }) {
  const navigate = useNavigate();

  const handleBookClick = () => navigate('/journal-entries');
  const handlePencilClick = () => navigate('/photo-upload');
  const handleUserClick = () => navigate('/journal-selection');

  return (
    <div className="bottom-nav">
      {showUtilityButtons && (
        <div className="bottom-buttons">
          <button onClick={handleBookClick}>
            <img src={bookIcon} className="icon" alt="Book" />
          </button>
          <button onClick={handlePencilClick}>
            <img src={pencilIcon} className="icon" alt="Pencil" />
          </button>
          <button onClick={handleUserClick}>
            <img src={timeIcon} className="icon" alt="Time" />
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
