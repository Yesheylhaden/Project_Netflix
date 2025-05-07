import React, { useEffect, useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [showBackground, setShowBackground] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setShowBackground(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveLink(sectionId);
    }
  };

  const handleProfileClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={`navbar ${showBackground ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__contents">
        <img
          className="navbar__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
          onClick={() => scrollToSection('home')}
        />

        <div className="navbar__links">
          <button 
            className={`navbar__link ${activeLink === 'home' ? 'active' : ''}`}
            onClick={() => scrollToSection('home')}
          >
            Home
          </button>
          <button 
            className={`navbar__link ${activeLink === 'tv-shows' ? 'active' : ''}`}
            onClick={() => scrollToSection('tv-shows')}
          >
            TV Shows
          </button>
          <button 
            className={`navbar__link ${activeLink === 'movies' ? 'active' : ''}`}
            onClick={() => scrollToSection('movies')}
          >
            Movies
          </button>
          <button 
            className={`navbar__link ${activeLink === 'new' ? 'active' : ''}`}
            onClick={() => scrollToSection('new')}
          >
            New & Popular
          </button>
          <button 
            className={`navbar__link ${activeLink === 'my-list' ? 'active' : ''}`}
            onClick={() => scrollToSection('my-list')}
          >
            My List
          </button>
        </div>

        <div className="navbar__right">
          <div className="navbar__search">
            <svg className="navbar__search-icon" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </div>
          
          <div className="navbar__profile" onClick={handleProfileClick}>
            <img
              className="navbar__avatar"
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="Profile"
            />
            {showMenu && (
              <div className="navbar__dropdown">
                <div className="dropdown__item">Account</div>
                <div className="dropdown__item">Help Center</div>
                <div className="dropdown__item">Sign out of Netflix</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;