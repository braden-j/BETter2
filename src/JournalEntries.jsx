import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TopNav from './TopNav';
import BottomNav from './BottomNav';
import './JournalEntries.css';
import hardcodeEntries from './hardcodeData';

function JournalEntries() {
  const navigate = useNavigate();
  const location = useLocation();
  const [entries, setEntries] = useState([]);
  const [initialized, setInitialized] = useState(false);

  // To clear local storage, uncomment this (make sure to comment back after so it doesn't continuously reset)
  // try {
  //   localStorage.removeItem('journalEntries');
  //   console.log('Journal entries have been reset');
  // } catch (e) {
  //   console.error('Failed to reset journal entries:', e);
  // }
  
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
        setInitialized(true);
      } catch (error) {
        console.error("Error loading journal entries:", error);
        setEntries(hardcodeEntries);
        setInitialized(true);
      }
    };
    
    loadEntries();
  }, []);
  
  useEffect(() => {
    if (initialized && location.state?.newEntry) {
      const newEntry = location.state.newEntry;
      setEntries(prevEntries => {
        const entryExists = prevEntries.some(entry => entry.id === newEntry.id);

        if (!entryExists) {
          const updatedEntries = [newEntry, ...prevEntries];
          localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
          return updatedEntries;
        }
        return prevEntries;
      });

      window.history.replaceState({}, document.title);
    }
  }, [location.state, initialized]);


  const handleEntryClick = (entry) => {
    navigate('/timeframe', { 
      state: { 
        photoGroups: entry.photoGroups,
        title: entry.title,
        date: entry.date
      } 
    });
  };

  const handleNext = () => {
    navigate('/photo-upload');
  };

  return (
    <div className="journal-entries-container">
      <div className="content-area">
        <TopNav 
          title="TimeFrame" 
          date="March 23rd"
          showBack={false}
        />
        
        <div className="journal-entries-header">
          <h2 className="title">Your Journals</h2>
        </div>
        
        <div className="journal-entries-list">
          {entries.map(entry => (
            <div 
              key={entry.id} 
              className={"journal-entry-box"}
              onClick={() => handleEntryClick(entry)}
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
            </div>
          ))}
        </div>
      </div>

      <BottomNav 
        onNextClick={handleNext}
        nextLabel="Add Entry"
        showUtilityButtons={true}
      />
    </div>
  );
}

export default JournalEntries;