import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
import TopNav from './TopNav';
import './PhotoUpload.css';

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

function PhotoUpload() {
    const [selectedImages, setSelectedImages] = useState([]);
    const images = [exampleImage1, exampleImage2, exampleImage3, exampleImage4, exampleImage5, exampleImage6, exampleImage7, exampleImage8, exampleImage9, exampleImage10, exampleImage11, exampleImage12];
    const navigate = useNavigate();
    
    const handleImageClick = (image) => {
      if (selectedImages.includes(image)) {
        setSelectedImages(selectedImages.filter(img => img !== image));
      } else {
        setSelectedImages([...selectedImages, image]);
      }
    };
  
    const handleNext = () => {
      navigate('/group-photos', { state: { selectedImages } });
    };

    const handleBack = () => {
      navigate('/journal-upload');
    };
  
    return (
      <div className="photo-upload-container">
        <div className="content-area">

        <TopNav 
            title="TimeFrame" 
            date="March 23rd"
            onBackClick={handleBack}
        />

          <h2 className="title">Any photos to add?</h2>
          <div className="image-gallery">
            {images.map((image, index) => (
              <div 
                key={index} 
                className={`gallery-item ${selectedImages.includes(image) ? 'selected' : ''}`}
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="gallery-image"
                />
                {selectedImages.includes(image) && (
                  <div className="selected-indicator">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>
  
        <BottomNav 
          onNextClick={handleNext} 
          nextLabel="Upload Photos"
          showUtilityButtons={true}
        />
      </div>
    );
  }
  
  export default PhotoUpload;