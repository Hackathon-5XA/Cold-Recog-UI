import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png"; // Correct import for logo
import "../styles/ResultPage.css";

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
      <header className="result-header">
        <h1>COLD RECOG</h1>
        <img src={logo} alt="Cold Recog Logo" className="logo" />
      </header>
      <hr />
      <main className="result-main">
        <div className="image-box">
          {uploadedImage ? (
            <img src={uploadedImage} alt="Uploaded file preview" />
          ) : (
            <p className="placeholder">No uploaded image</p>
          )}
        </div>
        <div className="carousel">
          {matchedImages && matchedImages.length > 0 ? (
            <div className="carousel-content">
              <button className="nav-button" onClick={handlePrev}>
                {"<"}
              </button>
              <div className="carousel-image-box">
                <img
                  src={matchedImages[currentIndex].url}
                  alt={`Matched file preview ${currentIndex + 1}`}
                />
                <p>Match Rate: {matchedImages[currentIndex].matchRate}%</p>
              </div>
              <button className="nav-button" onClick={handleNext}>
                {">"}
              </button>
            </div>
          ) : (
            <p className="placeholder">No Match Found</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ResultPage;
