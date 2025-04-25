import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TopNav from './TopNav';
import BottomNav from './BottomNav';
import './Generate.css';

import GenerateIcon from './assets/GenTimeFrame.png'

function Generate() {
    const location = useLocation();
    const photoGroups = location.state?.photoGroups || [];
    const navigate = useNavigate();

    // Send back to caption photos instead?
    const handleBack = () => {
        const allPhotos = [];
    
        photoGroups.forEach(group => {
          group.photos.forEach(photo => {
            allPhotos.push(photo.src);
          });
        });
    
        navigate('/journal-entries', {
          state: {
            selectedImages: allPhotos,
            photoGroups: photoGroups
          }
        });
    };

    const handleButtonClick = () => {
        navigate('/timeframe', { 
          state: { 
            photoGroups: photoGroups 
          } 
        });
    };
  
    return (
      <div className="action-page-container">
        <div className="content-area">
          <TopNav 
            title="TimeFrame" 
            date="March 23rd"
            onBackClick={handleBack}
          />
  
          <h2 className="title">Generate TimeFrame?</h2>
  
          <div className="button-container">
            <button 
              className="large-button" 
              onClick={handleButtonClick}
            >
              <img src={GenerateIcon} alt="Start" className="button-icon" />
            </button>
          </div>
        </div>

        <BottomNav 
          showNextButton={false}
          showUtilityButtons={true}
        />
      </div>
    );
  }
export default Generate;
