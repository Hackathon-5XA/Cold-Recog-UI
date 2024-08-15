import React from "react";
import "../styles/Footer.css"; // Import the Footer CSS

const Footer = () => {
  return (
    <footer className="footer">
      <nav>
        <a href="https://github.com/Hackathon-5XA/Cold-Recog-UI/issues">
          <button>Issues</button>
        </a>
        <a href="https://github.com/Hackathon-5XA">
          <button>Repo</button>
        </a>
        <a href="/">
          <button>Privacy Policy</button>
        </a>
      </nav>
      <h1>CopyRight &copy; 5XA</h1>
    </footer>
  );
};

export default Footer;
