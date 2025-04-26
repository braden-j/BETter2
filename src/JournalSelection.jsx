import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TopNav from './TopNav';
import BottomNav from './BottomNav';
import './JournalSelection.css';
import hardcodeEntries from './hardcodeData';

function JournalSelection() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [selectedEntries, setSelectedEntries] = useState([]);
  
  useEffect(() => {
    const loadEntries = () => {
      try {
        const savedEntries = localStorage.getItem('journalEntries');
        if (savedEntries) {
          const parsedEntries = JSON.parse(savedEntries);
          setEntries(parsedEntries);
        } else {
          setEntries(hardcodeEntries);
          localStorage.setItem('journalEntries', JSON.stringify(hardcodeEntries));
        }
      } catch (error) {
        console.error("Error loading journal entries:", error);
        setEntries(hardcodeEntries);
      }
    };
    
    loadEntries();
  }, []);

  const handleEntrySelect = (entry) => {
    setSelectedEntries(prevSelected => {
      const isAlreadySelected = prevSelected.some(item => item.id === entry.id);
      
      if (isAlreadySelected) {
        return prevSelected.filter(item => item.id !== entry.id);
      } else {
        return [...prevSelected, entry];
      }
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Hardcoded TimeFrame right now, needs to be fixed to use AI
  const handleContinue = () => {
    const allPhotoGroups = [];
    const titles = [];
    const dates = [];
    
    selectedEntries.forEach(entry => {
      entry.photoGroups.forEach(group => {
        allPhotoGroups.push(group);
      });
      
      titles.push(entry.title);
      dates.push(entry.date);
    });
    
    navigate('/timeframe', { 
      state: { 
        photoGroups: allPhotoGroups,
        title: 'New TimeFrame',
        date: dates.join(', ') 
      } 
    });
  };


  const isEntrySelected = (entryId) => {
    return selectedEntries.some(entry => entry.id === entryId);
  };

  return (
    <div className="journal-entries-container">
      <div className="content-area">
        <TopNav 
          title="TimeFrame" 
          showBack={true}
          onBackClick={handleBack}
        />
        
        <div className="journal-entries-header">
          <h2 className="title">Select Journals to Include in Your TimeFrame!</h2>
        </div>
        
        <div className="selection-count">
          {selectedEntries.length} journal{selectedEntries.length !== 1 ? 's' : ''} selected
        </div>
        
        <div className="journal-entries-list">
          {entries.map(entry => (
            <div 
              key={entry.id} 
              className={`journal-entry-box ${isEntrySelected(entry.id) ? 'selected' : ''}`}
              onClick={() => handleEntrySelect(entry)}
            >
              <div className="entry-info">
                <h3 className="entry-title">{entry.title}</h3>
                <span className="entry-date">{entry.date}</span>
              </div>
              
              <div className="entry-photos-grid">
                {entry.photoGroups.slice(0, 1)[0]?.photos.slice(0, 4).map(photo => (
                  <div key={photo.id} className="entry-photo-thumbnail">
                    <img src={photo.src} alt="" className="thumbnail-img" />
                  </div>
                ))}
                {entry.photoGroups.length > 1 && (
                  <div className="more-groups-indicator">
                    +{entry.photoGroups.length - 1} more
                  </div>
                )}
              </div>
              
              <div className={`select-indicator ${isEntrySelected(entry.id) ? 'checked' : ''}`}>
                {isEntrySelected(entry.id) && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav 
        onNextClick={handleContinue}
        nextLabel={`Generate TimeFrame (${selectedEntries.length})`}
        showUtilityButtons={true}
        showNextButton={selectedEntries.length > 0}
      />
    </div>
  );
}

export default JournalSelection;