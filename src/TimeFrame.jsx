import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import BottomNav from './BottomNav';
import './TimeFrame.css';

function TimeFrame() {
  const location = useLocation();
  const timeframeData = location.state?.timeframeData || {};
  const navigate = useNavigate();

  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [groups, setGroups] = useState([]);
  
  useEffect(() => {
    if (timeframeData.groups && timeframeData.groups.length > 0) {
      setGroups(timeframeData.groups);
    }
  }, [timeframeData]);

  const handleBack = () => {
    navigate('/journal-entries');
  };

  const handleNextGroup = () => {
    if (currentGroupIndex < groups.length - 1) {
      setCurrentGroupIndex(currentGroupIndex + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevGroup = () => {
    if (currentGroupIndex > 0) {
      setCurrentGroupIndex(currentGroupIndex - 1);
      window.scrollTo(0, 0);
    }
  };
  
  if (groups.length === 0) {
    return <div className="caption-loading">Loading timeframe data...</div>;
  }
  
  const currentGroup = groups[currentGroupIndex];

  return (
    <div className="timeframe-container">
      <div className="content-area">
        <TopNav 
          title={timeframeData.title || "TimeFrame"}
          onBackClick={handleBack}
        />
        
        <div className="timeframe-header">
          <h2 className="timeframe-title">{currentGroup.title}</h2>
        </div>
        
        <div className="timeframe-content">
          <div className="group-summary">
            {currentGroup.summary}
          </div>
          
          {currentGroup.photoGroups && currentGroup.photoGroups.map((photoGroup) => (
            <div className="photo-group-container" key={photoGroup.id}>
              <div className="group-preview">
                <div className="group-photos">
                  {photoGroup.photos.map(photo => (
                    <div key={photo.id} className="caption-photo-item">
                      <img 
                        src={photo.src} 
                        alt={`Photo ${photo.id}`}
                        className="caption-photo"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="caption-input-container">
                <div className="caption-input" style={{ height: 'auto', paddingTop: '12px' }}>
                  {photoGroup.caption}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav 
        showNextButton={false}
        showUtilityButtons={true}
      />
    </div>
  );
}

export default TimeFrame;