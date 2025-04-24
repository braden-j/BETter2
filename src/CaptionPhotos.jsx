import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import './CaptionPhotos.css';

function CaptionPhotos() {
  const location = useLocation();
  const groupedPhotos = location.state?.photoGroups || [];
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [currGroup, setCurrGroup] = useState(0);
  const [caption, setCaption] = useState('');
  const [allCaptions, setAllCaptions] = useState({});
  
  useEffect(() => {
    if (groupedPhotos.length > 0 && groups.length === 0) {
      setGroups(groupedPhotos.map(group => ({
        ...group,
        caption: group.caption || ''
      })));
      
      const initialCaptions = {};
      groupedPhotos.forEach(group => {
        initialCaptions[group.id] = group.caption || '';
      });
      setAllCaptions(initialCaptions);
    }
  }, [location.state, groups.length]);
  
  useEffect(() => {
    if (groups.length > 0) {
      setCaption(allCaptions[groups[currGroup].id] || '');
    }
  }, [currGroup, groups, allCaptions]);

  const handleBack = () => {
    const allPhotos = [];
    
    groups.forEach(group => {
      group.photos.forEach(photo => {
        allPhotos.push(photo.src);
      });
    });
    
    navigate('/group-photos', { 
      state: { 
        selectedImages: allPhotos,
        photoGroups: groups 
      } 
    });
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleNext = () => {
    const currentGroup = groups[currGroup];
    const updatedCaptions = { ...allCaptions, [currentGroup.id]: caption };
    setAllCaptions(updatedCaptions);
    const updatedGroups = [...groups];
    
    updatedGroups[currGroup] = {
      ...updatedGroups[currGroup],
      caption: caption
    };
    setGroups(updatedGroups);
    
    if (currGroup < groups.length - 1) {
      setCurrGroup(currGroup + 1);
    } else {
      finishCaptioning(updatedGroups);
    }
  };
  
  const handlePrev = () => {
    const currentGroup = groups[currGroup];
    const updatedCaptions = { ...allCaptions, [currentGroup.id]: caption };
    setAllCaptions(updatedCaptions);
    
    const updatedGroups = [...groups];
    updatedGroups[currGroup] = {
      ...updatedGroups[currGroup],
      caption: caption
    };
    setGroups(updatedGroups);
    
    if (currGroup > 0) {
      setCurrGroup(currGroup - 1);
    }
  };
  
  const finishCaptioning = (updatedGroups) => {
    navigate('/timeframe', { 
      state: { 
        photoGroups: updatedGroups 
      }
    });
  };
  
  if (groups.length === 0) {
    return <div className="caption-loading">Loading groups...</div>;
  }
  
  const currentGroup = groups[currGroup];
  const isLastGroup = currGroup === groups.length - 1;

  return (
    <div className="caption-groups-container">
      <TopNav 
        title="TimeFrame" 
        date="March 23rd"
        onBackClick={handleBack}
      />
      
      <div className="caption-header">
        <h2 className="title">Caption Your Groups</h2>
        <div className="group-progress">
          Group {currGroup + 1} of {groups.length}
        </div>
      </div>
      
      <div className="caption-content">
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
          <label htmlFor="group-caption" className="caption-label">
            Add a caption for this group:
          </label>
          <textarea
            id="group-caption"
            value={caption}
            onChange={handleCaptionChange}
            placeholder="Enter a meaningful caption..."
            className="caption-input"
          />
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
        >
          {isLastGroup ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default CaptionPhotos;