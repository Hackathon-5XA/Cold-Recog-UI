import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header"; // Import the Header component
import Footer from "./Footer"; // Import the Footer component
import "../styles/ResultPage.css";

// Import FontAwesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ResultPage = () => {
  const location = useLocation();
  const { uploadedImage, matchedImages } = location.state || {};
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % matchedImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + matchedImages.length) % matchedImages.length);
  };

  return (
    <div className="result-page">
      <Header /> {/* Use the Header component */}
      
      <main className="result-main">
        <div className="image-carousel-container">
          <div className="image-box">
            <h1 className="image-title">Uploaded Image</h1>
            {uploadedImage ? (
              <img src={uploadedImage} alt="Uploaded file preview" />
            ) : (
              <p className="placeholder">No uploaded image</p>
            )}
          </div>
          <div className="carousel">
            <h1 className="carousel-title">Matched Results</h1>
            {matchedImages && matchedImages.length > 0 ? (
              <div className="carousel-content">
                <button className="nav-button" onClick={handlePrev}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <div className="carousel-image-box">
                  <img
                    src={matchedImages[currentIndex].url}
                    alt={`Matched file preview ${currentIndex + 1}`}
                  />
                  <p>
                    Match Rate: <br />
                    {matchedImages[currentIndex].matchRate}%
                  </p>
                </div>
                <button className="nav-button" onClick={handleNext}>
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            ) : (
              <p className="placeholder">No Match Found</p>
            )}
          </div>
        </div>
      </main>
      
      <Footer /> {/* Use the Footer component */}
    </div>
  );
};

export default ResultPage;
