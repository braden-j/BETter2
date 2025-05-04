import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import BottomNav from './BottomNav';
import './TimeFrame.css';

function TimeFrame() {
  const location = useLocation();
  const timeframeData = location.state?.timeframeData || {};
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (timeframeData.groups && timeframeData.groups.length > 0) {
      setGroups(timeframeData.groups);
    }
  }, [timeframeData]);

  const handleBack = () => {
    navigate('/journal-entries');
  };

  if (groups.length === 0) {
    return <div className="caption-loading">Loading timeframe data...</div>;
  }

  return (
    <div className="timeframe-container">
      <div className="content-area">
        <TopNav 
          title={"TimeFrame"}
          onBackClick={handleBack}
        />

        <div className="timeframe-header">
          <h2 className="timeframe-title">{timeframeData.title}</h2>
        </div>

        <div className="timeframe-content">
          <div className="group-summary">
            {timeframeData.summary}
          </div>

          {groups.map((group, groupIndex) => (
            <div key={groupIndex} className="theme-section" style={{ marginTop: '2rem' }}>
              <div className="caption-input-container">
                <div className="caption-input" style={{ height: 'auto', paddingTop: '12px', fontWeight: 'bold' }}>
                  {group.title}: <span style={{ fontWeight: 'normal' }}>{group.summary}</span>
                </div>
              </div>

              {group.photoGroups.map((photoGroup, groupIdx) => (
                <div className="photo-group-container" key={photoGroup.id || groupIdx}>
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
                </div>
              ))}
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
