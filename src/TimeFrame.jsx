import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import './TimeFrame.css';

function TimeFrame() {
  const location = useLocation();
  const groupedPhotos = location.state?.photoGroups || [];
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [currGroup, setCurrGroup] = useState(0);
  
  // make not hardcoded once AI integrated
  const timeFrameCaptions = [
    "The day started with a delightful lunch featuring a creamy seafood pasta, bursting with flavors of garlic and lemon. For dinner, the evening was marked by a flavorful grilled fish paired with perfectly roasted vegetables.",
    "The afternoon was spent immersed in nature, taking a scenic walk through lush forests and alongside peaceful streams. The beauty of the cascading waterfalls was truly mesmerizing, creating a sense of calm and awe.",
    "For lunch, a hearty sandwich packed with fresh ingredients was enjoyed, with every bite offering a burst of flavors. In the evening, the dining experience shifted to a cozy dinner of roasted chicken, accompanied by creamy mashed potatoes and sautéed greens.",
    "The day unfolded with a visit to the nearby hills, where breathtaking panoramic views stretched as far as the eye could see. A hike through the rugged trails led to hidden pockets of beauty, with quiet spots perfect for reflection and adventure.",
    "An invigorating breakfast set the tone for the day, featuring a delicate croissant paired with a cup of freshly brewed coffee. Later, a light lunch of avocado toast brought a perfect balance of richness and freshness. Dinner was a savory affair, with a comforting stew.",
    "A stroll through the charming streets of a quaint village was the perfect afternoon activity. The picturesque houses, cobbled roads, and vibrant flowers set a serene scene, while small cafes invited passersby to pause and savor the moment.",
    "A lively lunch of mixed tapas offered an array of tastes, from salty olives to spicy chorizo. For dinner, the table was graced with a tender steak, cooked to perfection and served with crispy fries.",
    "The day included a leisurely visit to a nearby garden, where vibrant blooms and tall trees provided shade from the midday sun. The air was fresh, and the subtle sounds of birdsong created a peaceful ambiance.",
    "Lunch consisted of a light and refreshing salad, topped with tangy goat cheese, crunchy walnuts, and a drizzle of balsamic reduction. Later, a hearty dinner of beef stew served with crusty bread brought a sense of nostalgia and comfort.",
    "The afternoon was spent along the coastline, with soft sand beneath bare feet and the rhythmic sound of waves crashing in the background. The crisp ocean breeze provided a refreshing respite from the heat of the day.",
    "The day began with a breakfast of poached eggs and roasted vegetables, providing a nutritious start to the day. Midday brought a flavorful vegetable curry, and for dinner, a perfectly cooked salmon fillet accompanied by creamy mashed cauliflower.",
    "A calm afternoon was spent in a peaceful park, where the quiet rustle of leaves in the wind provided a soothing soundtrack to the day. As the day turned to evening, a leisurely dinner of pasta with a rich tomato sauce and fresh herbs provided comfort."
  ];
  
  useEffect(() => {
    if (groupedPhotos.length > 0 && groups.length === 0) {
      setGroups(groupedPhotos);
    }
  }, [location.state, groups.length]);

  // Send back to somewhere else or no where?
  const handleBack = () => {
    const allPhotos = [];
    
    groups.forEach(group => {
      group.photos.forEach(photo => {
        allPhotos.push(photo.src);
      });
    });
    
    navigate('/group-photos', { 
      state: { 
        selectedImages: allPhotos,
        photoGroups: groups 
      } 
    });
  };

  const handleNext = () => {
    if (currGroup < groups.length - 1) {
      setCurrGroup(currGroup + 1);
    }
  };
  
  const handlePrev = () => {
    if (currGroup > 0) {
      setCurrGroup(currGroup - 1);
    }
  };
  
  if (groups.length === 0) {
    return <div className="caption-loading">Loading groups...</div>;
  }
  
  const currentGroup = groups[currGroup];
  const groupMessage = timeFrameCaptions[currGroup]

  return (
    <div className="timeframe-container">
      <TopNav 
        title="TimeFrame" 
        date="March 23rd"
        onBackClick={handleBack}
      />
      
      <div className="timeframe-header">
        <h2 className="timeframe-title">Greece '25</h2>
      </div>
      
      <div className="timeframe-content">
        <div className="group-preview">
          <div className="group-photos">
            {currentGroup.photos.map(photo => (
              <div key={photo.id} className="caption-photo-item">
                <img 
                  src={photo.src} 
                  alt="Group photo" 
                  className="caption-photo"
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="caption-input-container">
          <div className="caption-input" style={{ height: 'auto', paddingTop: '12px' }}>
            {groupMessage}
          </div>
        </div>
      </div>
      
      <div className="caption-navigation">
        <button 
          className="caption-nav-button back"
          onClick={handlePrev}
          disabled={currGroup === 0}
        >
          Previous
        </button>
        <button 
          className="caption-nav-button next"
          onClick={handleNext}
          disabled={currGroup === groups.length - 1}
        >
            Next
        </button>
      </div>
    </div>
  );
}

export default TimeFrame;