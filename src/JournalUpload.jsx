import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import BottomNav from './BottomNav';
import NextButton from './NextButton';
import './JournalUpload.css';

function JournalUpload() {
  const [journalEntry, setJournalEntry] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log('Journal entry submitted:', journalEntry);
    navigate('/photo-upload')
  };

  const handleSaveExit = () => {
    navigate('/');
  };

  return (
    <div className="journal-upload-container">
      <div className="content-area">

        <TopNav 
          title="TimeFrame" 
          date="March 23rd"
          showBack={false}
          onSaveExitClick={handleSaveExit}
        />

        <h2 className="title">Add a Journal Entry</h2>
        <textarea
          className="journal-textarea"
          placeholder="Write your journal entry here..."
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
        />

        <NextButton onClick={handleSubmit} />
      </div>

      <BottomNav 
        showNextButton={false}
        showUtilityButtons={true}
      />
    </div>
  );
}

export default JournalUpload;
