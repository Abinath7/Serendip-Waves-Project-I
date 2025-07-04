import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ isScrolled, onLoginClick, onSignupClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 992);
      if (window.innerWidth >= 992) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    setIsMenuOpen(false);
    if (onLoginClick) {
      onLoginClick();
    }
  };

  const handleSignupClick = () => {
    console.log('handleSignupClick called');
    setIsMenuOpen(false);
    if (onSignupClick) {
      console.log('onSignupClick prop exists, calling it');
      onSignupClick();
    } else {
      console.log('onSignupClick prop is missing');
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(sectionId), 100);
    } else {
      scrollToSection(sectionId);
    }
  };

  return (
    <>
      <style>{`
        .navbar .btn-login {
          transition: all 0.2s;
        }
        .navbar .btn-login:hover {
          background: #ffd600 !important;
          border-color: #ffd600 !important;
          color: #222 !important;
        }
      `}</style>
      <nav 
        className="navbar navbar-expand-lg position-fixed w-100 top-0 start-0 px-2"
        style={{ 
          zIndex: 9999, 
          background: '#fff',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          padding: '6px 0',
          minHeight: '60px',
          maxHeight: '80px',
          borderBottom: '1px solid #eee'
        }}
      >
        <div className="container-fluid px-0 d-flex justify-content-between align-items-center">
          {/* Logo and Brand */}
          <div className="d-flex align-items-center">
            <Link to="/" className="navbar-brand d-flex align-items-center fw-bold fs-5 me-4" style={{ 
              color: '#1a237e', 
              fontFamily: 'Montserrat, Arial, sans-serif', 
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }}>
              <img src="/logo.png" alt="Serendip Waves Logo" width="90" height="90" className="me-2" style={{ maxHeight: '70px', width: 'auto', objectFit: 'contain', verticalAlign: 'middle' }} />
              <span style={{ fontWeight: 700, fontSize: '2.1rem', letterSpacing: '0.04em', color: '#1a237e', lineHeight: 1.1 }}>serendip<br/>waves</span>
            </Link>
          </div>
          {/* Centered Nav Links */}
          {isLargeScreen && (
            <div className="d-flex align-items-center gap-4 mx-auto" style={{ flex: 1, justifyContent: 'center' }}>
              <a href="#home" className="nav-link fw-semibold" onClick={e => handleNavClick(e, 'home')} style={{ 
                color: '#222', 
                textDecoration: 'none',
                fontSize: '1.05rem',
                padding: '6px 18px',
                fontWeight: 500
              }}>Home</a>
              <a href="#destinations" className="nav-link fw-semibold" onClick={e => handleNavClick(e, 'destinations')} style={{ 
                color: '#222', 
                textDecoration: 'none',
                fontSize: '1.05rem',
                padding: '6px 18px',
                fontWeight: 500
              }}>Destination</a>
              <Link to="/cruise-ships" className="nav-link fw-semibold" style={{ 
                color: '#222',
                textDecoration: 'none',
                fontSize: '1.05rem',
                padding: '6px 18px',
                fontWeight: 500
              }}>Cruises</Link>
              <Link to="/customer-dashboard" className="nav-link fw-semibold" style={{ 
                color: '#222',
                textDecoration: 'none',
                fontSize: '1.05rem',
                padding: '6px 18px',
                fontWeight: 500
              }}>Customer Dashboard</Link>
              <a href="#about" className="nav-link fw-semibold" onClick={e => handleNavClick(e, 'about')} style={{ 
                color: '#222',
                fontSize: '1.05rem',
                padding: '6px 18px',
                fontWeight: 500
              }}>About Us</a>
              <a href="#contact" className="nav-link fw-semibold" onClick={e => handleNavClick(e, 'contact')} style={{ 
                color: '#222',
                fontSize: '1.05rem',
                padding: '6px 18px',
                fontWeight: 500
              }}>Contact</a>
              <Link to="/super-admin" className="nav-link fw-semibold">Super Admin Dashboard</Link>
            </div>
          )}
          {/* Login Button */}
          <div className="d-flex align-items-center gap-3">
            <button 
              onClick={handleLoginClick}
              className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2 ms-2 btn-login"
              style={{ 
                borderRadius: '22px',
                padding: '7px 24px',
                fontSize: '1.05rem',
                fontWeight: 500,
                border: '1.5px solid #222',
                background: '#fff',
                color: '#222',
                boxShadow: 'none',
                transition: 'all 0.2s',
              }}
            >
              Login
            </button>
          </div>
        </div>
        {/* Collapsible Navigation Menu for Small Screens */}
        {!isLargeScreen && isMenuOpen && (
          <div className="collapse navbar-collapse show d-lg-none" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="#home" className="nav-link fw-semibold" onClick={e => handleNavClick(e, 'home')} style={{ 
                  color: '#fff', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '1rem',
                  padding: '10px 15px',
                  borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="#destinations" className="nav-link fw-semibold" onClick={e => handleNavClick(e, 'destinations')} style={{ 
                  color: '#fff', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '1rem',
                  padding: '10px 15px',
                  borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}>
                  Destination
                </a>
              </li>
              <li className="nav-item">
                <Link to="/cruise-ships" className="nav-link fw-semibold" onClick={handleNavLinkClick} style={{ 
                  color: '#fff',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '1rem',
                  padding: '10px 15px',
                  borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}>
                  Cruises
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/customer-dashboard" className="nav-link fw-semibold" onClick={handleNavLinkClick} style={{ 
                  color: '#fff',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '1rem',
                  padding: '10px 15px',
                  borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}>
                  Customer Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <a href="#about" className="nav-link fw-semibold" onClick={e => handleNavClick(e, 'about')} style={{ 
                  color: '#fff',
                  transition: 'color 0.3s ease',
                  fontSize: '1rem',
                  padding: '10px 15px',
                  borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}>
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-link fw-semibold" onClick={e => handleNavClick(e, 'contact')} style={{ 
                  color: '#fff',
                  transition: 'color 0.3s ease',
                  fontSize: '1rem',
                  padding: '10px 15px',
                  borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}>
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <Link to="/super-admin" className="nav-link fw-semibold">Super Admin Dashboard</Link>
              </li>
              <li className="nav-item">
                <button 
                  onClick={handleSignupClick}
                  className="nav-link fw-semibold w-100 text-start border-0 bg-transparent" 
                  style={{ 
                    color: '#ffd600',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    fontSize: '1rem',
                    padding: '10px 15px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <i className="bi bi-person-plus me-2"></i>Sign Up
                </button>
              </li>
              <li className="nav-item">
                <button 
                  onClick={handleLoginClick}
                  className="nav-link fw-semibold w-100 text-start border-0 bg-transparent" 
                  style={{ 
                    color: '#fff',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    fontSize: '1rem',
                    padding: '10px 15px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <i className="bi bi-person-circle me-2"></i>Login
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
