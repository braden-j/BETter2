import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
import TopNav from './TopNav';
import './PhotoUpload.css';

import Sunday1 from './assets/Sunday/1.jpg';
import Sunday2 from './assets/Sunday/2.jpg';
import Sunday3 from './assets/Sunday/3.jpg';
import Sunday4 from './assets/Sunday/4.jpg';
import Sunday5 from './assets/Sunday/5.jpg';
import Sunday6 from './assets/Sunday/6.jpeg';
import Sunday7 from './assets/Sunday/7.jpeg';
import Sunday8 from './assets/Sunday/8.png';
import Sunday9 from './assets/Sunday/9.png';
import Sunday10 from './assets/Sunday/10.png';
import Sunday11 from './assets/Sunday/11.png';
import Sunday12 from './assets/Sunday/12.jpg';

function PhotoUpload() {
    const [selectedImages, setSelectedImages] = useState([]);
    const images = [Sunday1, Sunday2, Sunday3, Sunday4, Sunday5, Sunday6, Sunday7, Sunday8, Sunday9, Sunday10, Sunday11, Sunday12];
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
      navigate('/journal-entries');
    };
  
    return (
      <div className="photo-upload-container">
        <div className="content-area">

        <TopNav 
            title="TimeFrame" 
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