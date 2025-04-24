import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TopNav from './TopNav';
import BottomNav from './BottomNav';
import './JournalEntries.css';

import exampleImage1 from './assets/Screenshot 2025-04-07 092724.png';
import exampleImage2 from './assets/Screenshot 2025-04-07 092743.png';
import exampleImage3 from './assets/Screenshot 2025-04-07 092755.png';
import exampleImage4 from './assets/Screenshot 2025-04-07 092808.png';
import exampleImage5 from './assets/Screenshot 2025-04-07 092832.png';
import exampleImage6 from './assets/Screenshot 2025-04-07 092844.png';
import exampleImage7 from './assets/Screenshot 2025-04-09 143804.png';
import exampleImage8 from './assets/Screenshot 2025-04-09 143830.png';
import exampleImage9 from './assets/Screenshot 2025-04-09 143916.png';
import exampleImage10 from './assets/Screenshot 2025-04-09 182810.png';
import exampleImage11 from './assets/Screenshot 2025-04-09 182834.png';
import exampleImage12 from './assets/Screenshot 2025-04-09 182852.png';

const hardcodeEntries = [
  {
    id: 1,
    title: "Greece '25",
    date: "March 23rd, 2025",
    photoGroups: [
      {
        id: 1,
        photos: [
          { id: 101, src: exampleImage1 },
          { id: 102, src: exampleImage2 },
          { id: 103, src: exampleImage3 }
        ],
        caption: "The day started with a delightful lunch featuring a creamy seafood pasta, bursting with flavors of garlic and lemon."
      },
      {
        id: 2,
        photos: [
          { id: 201, src: exampleImage4 },
          { id: 202, src: exampleImage5 }
        ],
        caption: "The afternoon was spent immersed in nature, taking a scenic walk through lush forests and alongside peaceful streams."
      }
    ]
  },
  {
    id: 2,
    title: "Paris Weekend",
    date: "February 14th, 2025",
    photoGroups: [
      {
        id: 3,
        photos: [
          { id: 301, src: exampleImage6 },
          { id: 302, src: exampleImage7 }
        ],
        caption: "Exploring the charming streets of Montmartre with their artistic history and vibrant atmosphere."
      }
    ]
  },
  {
    id: 3,
    title: "NYC Trip",
    date: "January 5th, 2025",
    photoGroups: [
      {
        id: 4,
        photos: [
          { id: 401, src: exampleImage8 },
          { id: 402, src: exampleImage9 },
          { id: 403, src: exampleImage10 }
        ],
        caption: "A day of museum hopping and street food adventures in Manhattan."
      },
      {
        id: 5,
        photos: [
          { id: 501, src: exampleImage11 },
          { id: 502, src: exampleImage12 }
        ],
        caption: "Evening walk through Central Park as the city lights began to twinkle."
      }
    ]
  },
  {
    id: 4,
    title: "Home Holidays",
    date: "December 25th, 2024",
    photoGroups: [
      {
        id: 6,
        photos: [
          { id: 601, src: exampleImage1 },
          { id: 602, src: exampleImage3 },
          { id: 603, src: exampleImage5 },
          { id: 604, src: exampleImage7 }
        ],
        caption: "Festive dinner with the family, featuring traditional recipes passed down through generations."
      }
    ]
  }
];

function JournalEntries() {
  const navigate = useNavigate();
  const location = useLocation();
  const [entries, setEntries] = useState([]);
  const [initialized, setInitialized] = useState(false);
  
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
      const entryExists = entries.some(entry => entry.id === newEntry.id);
      
      if (!entryExists) {
        const updatedEntries = [newEntry, ...entries];
        setEntries(updatedEntries);
        localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
      }

      window.history.replaceState({}, document.title);
    }
  }, [location.state, entries, initialized]);

  const handleEntryClick = (entry) => {
    navigate('/timeframe', { 
      state: { 
        photoGroups: entry.photoGroups,
        title: entry.title,
        date: entry.date
      } 
    });
  };

  const handleCreateNew = () => {
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
          <button className="new-entry-button" onClick={handleCreateNew}>
            Create New
          </button>
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
        showNextButton={false}
        showUtilityButtons={true}
      />
    </div>
  );
}

export default JournalEntries;