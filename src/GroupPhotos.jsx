import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
import TopNav from './TopNav';
import './GroupPhotos.css';

function GroupPhotos() {
  const location = useLocation();
  const selectedImages = location.state?.selectedImages || [];
  const navigate = useNavigate();
  
  const [groups, setGroups] = useState([]);
  const [ungrouped, setUngrouped] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isGrouping, setIsGrouping] = useState(false);
  
  useEffect(() => {
    setUngrouped(selectedImages.map((image, index) => ({
      id: index,
      src: image
    })));
  }, [selectedImages]);

  const handleBack = () => {
    navigate('/photo-upload');
  };

  const handleSaveExit = () => {
    navigate('/');
  };
  
  const togglePhotoSelection = (photo) => {
    if (!isGrouping) return;
    
    if (selected.some(p => p.id === photo.id)) {
      setSelected(selected.filter(p => p.id !== photo.id));
    } else {
      setSelected([...selected, photo]);
    }
  };
  
  const startGrouping = () => {
    setIsGrouping(true);
    setSelected([]);
  };
  
  const cancelGrouping = () => {
    setIsGrouping(false);
    setSelected([]);
  };
  
  const createNewGroup = () => {
    if (selected.length < 2) return;
    
    const newGroup = {
      id: Date.now(),
      photos: [...selected]
    };
    
    setGroups([...groups, newGroup]);
    const selectedIds = selected.map(photo => photo.id);
    setUngrouped(ungrouped.filter(photo => !selectedIds.includes(photo.id)));

    setSelected([]);
    setIsGrouping(false);
  };
  
  const removePhotoFromGroup = (groupId, photoId) => {
    const groupIndex = groups.findIndex(group => group.id === groupId);
    const group = groups[groupIndex];
    const photoToRemove = group.photos.find(photo => photo.id === photoId);
    
    const updatedGroup = {
      ...group,
      photos: group.photos.filter(photo => photo.id !== photoId)
    };
    
    let updatedGroups;
    if (updatedGroup.photos.length <= 1) {
      const photosToReturn = [...group.photos];
      setUngrouped([...ungrouped, ...photosToReturn]);
      updatedGroups = groups.filter(g => g.id !== groupId);
    } else {
      updatedGroups = [...groups];
      updatedGroups[groupIndex] = updatedGroup;
      setUngrouped([...ungrouped, photoToRemove]);
    }
    
    setGroups(updatedGroups);
  };
  
  const deleteGroup = (groupId) => {
    const groupToDelete = groups.find(group => group.id === groupId);
    setUngrouped([...ungrouped, ...groupToDelete.photos]);
    setGroups(groups.filter(group => group.id !== groupId));
  };

  const handleNext = () => {
    const individualGroups = ungrouped.map(photo => ({
      id: `single-${photo.id}`,
      photos: [photo]
    }));
    
    const allGroups = [...groups, ...individualGroups];
    
    navigate('/caption-photos', { 
      state: { 
        photoGroups: allGroups
      } 
    });
  };

  return (
    <div className="selected-photos-container">
      <TopNav 
        title="TimeFrame" 
        date="March 23rd"
        onBackClick={handleBack}
        onSaveExitClick={handleSaveExit}
      />

      <div className="photos-header">
        <h2 className="group-title">Group Your Photos</h2>
        
        {!isGrouping ? (
          <button 
            className="group-action-button"
            onClick={startGrouping}
            disabled={ungrouped.length < 2}
          >
            Create Group
          </button>
        ) : (
          <div className="grouping-actions">
            <button 
              className="group-action-button cancel"
              onClick={cancelGrouping}
            >
              Cancel
            </button>
            <button 
              className="group-action-button confirm"
              onClick={createNewGroup}
              disabled={selected.length < 2}
            >
              Group {selected.length} Photos
            </button>
          </div>
        )}
      </div>
      
      {isGrouping && (
        <div className="selection-instructions">
          <p>Select two or more photos to group them together</p>
        </div>
      )}
      
      {groups.length > 0 && (
        <div className="photo-groups-container">
          <h3 className="groups-title">Photo Groups</h3>
          
          {groups.map(group => (
            <div key={group.id} className="photo-group">
              <div className="group-header">
                <h4 className="group-name">{group.name}</h4>
                <button 
                  className="group-button delete"
                  onClick={() => deleteGroup(group.id)}
                >
                  Delete Group
                </button>
              </div>
              
              <div className="group-images">
                {group.photos.map(photo => (
                  <div 
                    key={photo.id} 
                    className="gallery-item"
                  >
                    <img 
                      src={photo.src} 
                      alt={`Photo in group`} 
                      className="gallery-image"
                    />
                    <button 
                      className="remove-photo-button"
                      onClick={() => removePhotoFromGroup(group.id, photo.id)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {ungrouped.length > 0 && (
        <div className="ungrouped-photos-container">
          <h3 className="ungrouped-title">
            {groups.length > 0 ? "Ungrouped Photos" : "All Photos"}
          </h3>
          
          <div className="image-gallery">
            {ungrouped.map(photo => (
              <div 
                key={photo.id} 
                className={`gallery-item ${isGrouping ? 'selectable' : ''} ${
                  selected.some(p => p.id === photo.id) ? 'selected' : ''
                }`}
                onClick={() => togglePhotoSelection(photo)}
              >
                <img 
                  src={photo.src} 
                  alt={`Photo ${photo.id + 1}`} 
                  className="gallery-image"
                />
                {isGrouping && selected.some(p => p.id === photo.id) && (
                  <div className="selected-indicator">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bottom-nav-container">
        <BottomNav 
          onNextClick={handleNext}
          nextLabel="Submit"
          showUtilityButtons={true}
        />
      </div>
    </div>
  );
}

export default GroupPhotos;