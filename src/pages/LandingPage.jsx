import React from "react";
import { Link } from "react-router-dom";
import Header from "../pages/Header";
import "../styles/LandingPage.css";
import detectiveImage from "../assets/detective.png";
import Footer from "../pages/Footer";
const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <main className="landing-main">
        <div className="text-container">
          <h1>COLD RECOG</h1>
          <h2>
            Our innovative system provides rapid, accurate identification of
            unclaimed bodies, ensuring respect and closure for families. Access
            this breakthrough technology easily through our user-friendly web
            app.
          </h2>

          <Link to="/search">
            <button>SEARCH</button>
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
      <Footer />
    </div>
  );
};

export default LandingPage;
