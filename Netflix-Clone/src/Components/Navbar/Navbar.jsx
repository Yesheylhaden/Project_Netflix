import React, { useEffect, useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCutTrailer = () => {
    const bannerSection = document.getElementById('banner');
    if (bannerSection) {
      bannerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`navbar ${show ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__contents">
        <img
          className="navbar__logo"
          src="http://www.freepnglogos.com/uploads/netflix-logo-0.png"
          alt="Netflix Logo"
        />

        <div className="navbar__right">
          <button className="navbar__button" onClick={handleCutTrailer}>
            Cut Trailer
          </button>
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
