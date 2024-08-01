import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";
import logo from "../assets/logo.png"; // Update the path accordingly
import detectiveImage from "../assets/detective.png"; // Update the path accordingly

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>COLD RECOG</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <main className="landing-main">
        <div className="text-container">
          <h2>
            Our innovative system provides rapid, accurate identification of
            unclaimed bodies, ensuring respect and closure for families. Access
            this breakthrough technology easily through our user-friendly web
            app.
          </h2>
          <Link to="/search">
            <button>START SEARCH</button>
          </Link>
        </div>
        <div className="image-container">
          <img
            src={detectiveImage}
            alt="Detective"
            className="detective-image"
          />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
