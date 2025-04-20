import React, { useEffect, useState } from 'react';
import './Navbar.css';

function Navbar() {
  // State to determine if the navbar should have the scrolled background
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Function to handle scroll event and change navbar state
    const handleScroll = () => {
      setShow(window.scrollY > 100); // If scrolled down more than 100px, set show to true
    };

    // Add event listener for scroll event
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to scroll the page to the banner section when "Cut Trailer" is clicked
  const handleCutTrailer = () => {
    const bannerSection = document.getElementById('banner'); // Get the banner section by ID
    if (bannerSection) {
      bannerSection.scrollIntoView({ behavior: 'smooth' }); // Scroll to the banner smoothly
    }
  };

  return (
    // Apply navbar--scrolled class when 'show' is true (on scroll)
    <div className={`navbar ${show ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__contents">
        {/* Netflix logo */}
        <img
          className="navbar__logo"
          src="http://www.freepnglogos.com/uploads/netflix-logo-0.png"
          alt="Netflix Logo"
        />

        <div className="navbar__right">
          {/* "Cut Trailer" button */}
          <button className="navbar__button" onClick={handleCutTrailer}>
            Cut Trailer
          </button>
          {/* Avatar image */}
          <img
            className="navbar__avatar"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Avatar"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
