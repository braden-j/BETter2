import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PhotoUpload from './PhotoUpload';
import GroupPhotos from './GroupPhotos';
import CaptionPhotos from './CaptionPhotos';
import JournalUpload from './JournalUpload';
import TimeFrame from './TimeFrame';
import Generate from './Generate';
import JournalEntries from './JournalEntries';
import JournalSelection from './JournalSelection';
import JournalEntry from './JournalEntry';
import TimeFrameEntries from './TimeFrameEntries';
import './App.css';
import ScrollToTop from './ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Navigate to="/journal-entries" replace />} />
            <Route path="/journal-upload" element={<JournalUpload />} />
            <Route path="/photo-upload" element={<PhotoUpload />} />
            <Route path="/group-photos" element={<GroupPhotos />} />
            <Route path="/caption-photos" element={<CaptionPhotos />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/timeframe" element={<TimeFrame />} />
            <Route path="/journal-entries" element={<JournalEntries />} />
            <Route path="/timeframe-entries" element={<TimeFrameEntries />} />
            <Route path="/journal-entry" element={<JournalEntry />} />
            <Route path="/journal-selection" element={<JournalSelection />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
