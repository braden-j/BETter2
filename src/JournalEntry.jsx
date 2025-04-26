import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import BottomNav from './BottomNav';
import './JournalEntry.css';

function JournalEntry() {
  const location = useLocation();
  const groupedPhotos = location.state?.photoGroups || [];
  const journalTitle = location.state?.title || "TimeFrame";
  const journalDate = location.state?.date || "March 23rd";
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [currGroup, setCurrGroup] = useState(0);
  
  useEffect(() => {
    if (groupedPhotos.length > 0 && groups.length === 0) {
      setGroups(groupedPhotos);
    }
  }, [location.state, groups.length]);

  const handleBack = () => {
    navigate('/journal-entries');
  };

  const handleNext = () => {
    if (currGroup < groups.length - 1) {
      setCurrGroup(currGroup + 1);
    }
  };
  
  const handlePrev = () => {
    if (currGroup > 0) {
      setCurrGroup(currGroup - 1);
    }
  };
  
  if (groups.length === 0) {
    return <div className="caption-loading">Loading groups...</div>;
  }
  
  const currentGroup = groups[currGroup];
  const groupCaption = currentGroup.caption || "No caption available for this group of photos.";

  return (
    <div className="timeframe-container">
      <div className="content-area">
        <TopNav 
          title="TimeFrame" 
          onBackClick={handleBack}
        />
        <div className="timeframe-header">
          <h2 className="timeframe-title">{journalTitle}</h2>
          <div className="group-progress">
            Group {currGroup + 1} of {groups.length}
          </div>
        </div>
        
        <div className="timeframe-content">
          <div className="group-preview">
            <div className="group-photos">
              {currentGroup.photos.map(photo => (
                <div key={photo.id} className="caption-photo-item">
                  <img 
                    src={photo.src} 
                    alt="Group photo" 
                    className="caption-photo"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="caption-input-container">
            <div className="caption-input" style={{ height: 'auto', paddingTop: '12px' }}>
              {groupCaption}
            </div>
          </div>
        </div>
        
        <div className="caption-navigation">
          <button 
            className="caption-nav-button back"
            onClick={handlePrev}
            disabled={currGroup === 0}
          >
            Previous
          </button>
          <button 
            className="caption-nav-button next"
            onClick={handleNext}
            disabled={currGroup === groups.length - 1}
          >
            Next
          </button>
        </div>
      </div>

      <BottomNav 
        showNextButton={false}
        showUtilityButtons={true}
      />
    </div>
  );
}

export default JournalEntry;
