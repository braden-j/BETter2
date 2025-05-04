import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TopNav from './TopNav';
import BottomNav from './BottomNav';
import './TimeFrameEntries.css';

function TimeFrameEntries() {
  const navigate = useNavigate();
  const location = useLocation();
  const [timeframes, setTimeframes] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const bottomSpacerRef = useRef(null);

    // To clear local storage, uncomment this (make sure to comment back after so it doesn't continuously reset)
//   try {
//     localStorage.removeItem('timeframes');
//     console.log('Timeframe entries have been reset');
//   } catch (e) {
//     console.error('Failed to reset Timeframe entries:', e);
//   }
  
  useEffect(() => {
    const loadTimeframes = () => {
      try {
        const savedTimeframes = localStorage.getItem('timeframes');
        if (savedTimeframes) {
          const parsedTimeframes = JSON.parse(savedTimeframes);
          setTimeframes(parsedTimeframes);
        } else {
          setTimeframes([]);
        }
        setInitialized(true);
      } catch (error) {
        console.error("Error loading timeframes:", error);
        setTimeframes([]);
        setInitialized(true);
      }
    };
    
    loadTimeframes();
    
    const updateSpacerHeight = () => {
      const bottomNavHeight = document.querySelector('.bottom-nav')?.clientHeight || 70;
      if (bottomSpacerRef.current) {
        bottomSpacerRef.current.style.height = `${bottomNavHeight + 20}px`;
      }
    };
    
    updateSpacerHeight();
    window.addEventListener('resize', updateSpacerHeight);
    
    return () => {
      window.removeEventListener('resize', updateSpacerHeight);
    };
  }, []);
  
  useEffect(() => {
    if (initialized && location.state?.newTimeframe) {
      const newTimeframe = location.state.newTimeframe;

      setTimeframes(prevTimeframes => {
        const timeframeExists = prevTimeframes.some(tf => tf.id === newTimeframe.id);
  
        if (!timeframeExists) {
          const updatedTimeframes = [newTimeframe, ...prevTimeframes];
          localStorage.setItem('timeframes', JSON.stringify(updatedTimeframes));
          return updatedTimeframes;
        }
        return prevTimeframes;
      });
  
      window.history.replaceState({}, document.title);
    }
  }, [location.state, initialized]);  

  const handleTimeframeClick = (timeframe) => {
    navigate('/timeframe', { 
      state: { 
        timeframeData: timeframe
      } 
    });
  };

  const handleNext = () => {
    navigate('/journal-selection');
  };

  const handleViewJournals = () => {
    navigate('/journal-entries');
  };

  const getPreviewPhotos = (timeframe) => {
    const photos = [];
    
    if (timeframe.groups && timeframe.groups.length > 0) {
      for (const group of timeframe.groups) {
        if (group.photoGroups && group.photoGroups.length > 0) {
          for (const photoGroup of group.photoGroups) {
            if (photoGroup.photos && photoGroup.photos.length > 0) {
              photos.push(...photoGroup.photos);
              if (photos.length >= 5) break;
            }
          }
          if (photos.length >= 5) break;
        }
      }
    }
    
    return photos.slice(0, 5);
  };

  const countTotalPhotos = (timeframe) => {
    let totalPhotos = 0;
    
    if (timeframe.groups && timeframe.groups.length > 0) {
      for (const group of timeframe.groups) {
        if (group.photoGroups && group.photoGroups.length > 0) {
          for (const photoGroup of group.photoGroups) {
            if (photoGroup.photos && photoGroup.photos.length > 0) {
              totalPhotos += photoGroup.photos.length;
            }
          }
        }
      }
    }
    
    return totalPhotos;
  };

  return (
    <div className="timeframe-entries-container">
      <div className="content-area">
        <TopNav 
          title="TimeFrame" 
          showBack={false}
        />
        
        <div className="photos-header">
          <h2 className="group-title">Your TimeFrames</h2>
          <button 
            className="group-action-button"
            onClick={handleViewJournals}
          >
            View Journals
          </button>
        </div>
        
        <div className="timeframe-entries-list">
          {timeframes.length === 0 ? (
            <div className="empty-state">
              <p>You haven't created any TimeFrames yet.</p>
              <p>Select journals to create your first TimeFrame!</p>
            </div>
          ) : (
            timeframes.map((timeframe, index) => {
              const previewPhotos = getPreviewPhotos(timeframe);
              const totalPhotos = countTotalPhotos(timeframe);
              const displayedPhotos = previewPhotos.length;
              const remainingPhotos = totalPhotos - displayedPhotos;
              
              return (
                <div 
                  key={timeframe.id || index} 
                  className="timeframe-entry-box"
                  onClick={() => handleTimeframeClick(timeframe)}
                >
                  <div className="entry-info">
                    <h3 className="entry-title">{timeframe.title}</h3>
                    <span className="entry-date">{timeframe.createdAt || "No date"}</span>
                  </div>
                  
                  <div className="entry-photos-grid">
                    {previewPhotos.map((photo, photoIndex) => (
                      <div key={photo.id || photoIndex} className="entry-photo-thumbnail">
                        <img src={photo.src} alt="" className="thumbnail-img" />
                      </div>
                    ))}
                    {remainingPhotos > 0 && (
                      <div className="more-groups-indicator">
                        +{remainingPhotos} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
          <div ref={bottomSpacerRef} className="bottom-spacer"></div>
        </div>
      </div>

      <BottomNav 
        onNextClick={handleNext}
        nextLabel="Create TimeFrame"
        showUtilityButtons={true}
      />
    </div>
  );
}

export default TimeFrameEntries;