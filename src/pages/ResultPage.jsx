import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png"; // Correct import for logo
import "../styles/ResultPage.css";

const ResultPage = () => {
  const location = useLocation();
  const { uploadedImage } = location.state || {};

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
        <div className="image-box">
          <p className="placeholder">Result image will appear here</p>
        </div>
      </main>
    </div>
  );
};

export default ResultPage;
