import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import BottomNav from './BottomNav';
import './JournalUpload.css';

function JournalUpload() {
  const [journalEntry, setJournalEntry] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log('Journal entry submitted:', journalEntry);
    navigate('/photo-upload')
  };

  return (
    <div className="journal-upload-container">
      <div className="content-area">

        <TopNav 
          title="TimeFrame" 
          showBack={false}
        />

        <h2 className="title">Add a Journal Entry</h2>
        <textarea
          className="journal-textarea"
          placeholder="Write your journal entry here..."
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
        />
      </div>

      <BottomNav 
        onNextClick={handleSubmit}
        nextLabel="Next"
        showUtilityButtons={true}
      />
    </div>
  );
}

export default JournalUpload;
