import React, { useState, useEffect } from "react";
import Home from "./assets/Home.jpg";
import DestinationsPage from "./DestinationsPage";

// Hero Section
const Hero = ({ onBookingClick }) => {
  return (
    <section
      id="home"
      className="hero-section"
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: `url(${Home}) center center / cover no-repeat`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 0,
        margin: 0,
        marginTop: "-80px",
        paddingTop: "80px",
        boxSizing: "border-box",
        position: "relative"
      }}
    >
      {/* Overlay for contrast */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(16,24,32,0.55)",
        zIndex: 1
      }} />
      <div style={{
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        height: "100vh",
        maxWidth: "700px",
        paddingLeft: "7vw",
        color: "#fff"
      }}>
        <h1 style={{
          fontWeight: 900,
          fontSize: "3.2rem",
          lineHeight: 1.1,
          marginBottom: "1.2rem",
          letterSpacing: "-2px",
          textShadow: "0 2px 12px rgba(0,0,0,0.25)"
        }}>
          EXPLORE THE<br />WORLD WITH<br />SERENDIP WAVES
        </h1>
        <p style={{
          fontSize: "1.1rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 400,
          marginBottom: "2.2rem",
          color: "#e0e0e0",
          textShadow: "0 1px 6px rgba(0,0,0,0.18)"
        }}>
          WHERE LUXURY MEETS THE SEA<br />EVERY JOURNEY, A MASTERPIECE.
        </p>
        <button
          className="btn btn-lg px-5 py-3 hero-cta-btn shadow"
          style={{
            background: '#ffd600',
            color: '#222',
            fontWeight: 600,
            borderRadius: '2rem',
            fontSize: '1.25rem',
            border: 'none',
            boxShadow: '0 2px 12px rgba(0,0,0,0.10)'
          }}
          onClick={onBookingClick}
        >
          Book Now
        </button>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => (
  <section id="about" className="py-5" style={{ background: '#f8f9fa' }}>
    <div className="container">
      {/* About Content */}
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="display-5 fw-bold mb-4">About Serendip Waves</h2>
          <p className="lead mb-4">
            We are passionate about creating unforgettable cruise experiences that combine luxury, adventure, and discovery.
          </p>
          <p className="mb-4">
            With over 20 years of experience in the cruise industry, we've helped thousands of travelers explore the world's most beautiful destinations. Our commitment to excellence and attention to detail ensures every journey is extraordinary.
          </p>
          <div className="row text-center">
            <div className="col-4">
              <h3 className="fw-bold text-primary">500+</h3>
              <p className="text-muted">Happy Cruises</p>
            </div>
            <div className="col-4">
              <h3 className="fw-bold text-primary">50+</h3>
              <p className="text-muted">Destinations</p>
            </div>
            <div className="col-4">
              <h3 className="fw-bold text-primary">10K+</h3>
              <p className="text-muted">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>
      {/* About Image */}
      <div className="row mb-5">
        <div className="col-12 d-flex justify-content-center">
          <img 
            src="About us.jpg" 
            alt="About Us" 
            className="img-fluid rounded shadow"
            style={{ borderRadius: '20px', maxWidth: '1000px', width: '100%',height:'500px',objectFit:'cover' }}
          />
        </div>
      </div>
      {/* Mission Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-lg h-100 mb-4" style={{ borderRadius: '20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="card-body p-5 text-white">
              <div className="text-center mb-4">
                <i className="fas fa-bullseye fa-3x mb-3" style={{ color: '#ffd600' }}></i>
                <h3 className="fw-bold mb-3">Our Mission</h3>
              </div>
              <p className="lead mb-0" style={{ lineHeight: '1.8' }}>
                Our mission is to revolutionize cruise ship management by delivering an intelligent, secure, and integrated digital platform. We aim to simplify operations, reduce manual inefficiencies, and enhance coordination between staff and passengers, while ensuring industry compliance and superior service quality for a modern maritime experience.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Vision Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-lg h-100" style={{ borderRadius: '20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="card-body p-5 text-white">
              <div className="text-center mb-4">
                <i className="fas fa-eye fa-3x mb-3" style={{ color: '#ffd600' }}></i>
                <h3 className="fw-bold mb-3">Our Vision</h3>
              </div>
              <p className="lead mb-0" style={{ lineHeight: '1.8' }}>
                We envision Serendib Waves as a leading digital solution in the cruise industry, empowering operators through technology-driven efficiency. By embracing smart automation and real-time analytics, we strive to support sustainable growth, elevate passenger satisfaction, and become a benchmark for future-ready, scalable cruise management systems worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Contact Section
const ContactSection = () => (
  <section id="contact" className="py-5" style={{ background: '#ffffff' }}>
    <div className="container">
      <div className="text-center mb-5">
        <h2 className="display-4 fw-bold text-dark mb-3">Contact Us</h2>
        <p className="lead text-muted">Get in touch with us for your next adventure</p>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow">
            <div className="card-body p-5">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Name</label>
                  <input type="text" className="form-control" placeholder="Your name" />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input type="email" className="form-control" placeholder="Your email" />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Message</label>
                <textarea className="form-control" rows="5" placeholder="Your message"></textarea>
              </div>
              <button className="btn btn-primary btn-lg w-100">Send Message</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Footer
const Footer = () => (
  <footer className="bg-dark text-white py-5">
    <div className="container">
      {/* Main Footer Content */}
      <div className="row g-4">
        {/* First Column - Logo and Brand */}
        <div className="col-lg-4 col-md-6 text-center text-md-start">
          <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-3">
            <img 
              src="/logo.png" 
              alt="Serendip Waves Logo" 
              width="70" 
              height="70" 
              className="me-3"
            />
            <h5 className="fw-bold mb-0">Serendip Waves</h5>
          </div>
          <p className="text-muted mb-0" style={{ lineHeight: '1.6' }}>
            Your journey to paradise starts here. We specialize in creating unforgettable cruise experiences that combine luxury, adventure, and discovery across the world's most beautiful destinations.
          </p>
        </div>

        {/* Second Column - Quick Links */}
        <div className="col-lg-4 col-md-6 text-center text-md-start">
          <h6 className="fw-bold mb-3 text-uppercase" style={{ color: '#ffd600' }}>Quick Links</h6>
          <ul className="list-unstyled">
            <li className="mb-2">
              <a 
                href="#home" 
                className="text-decoration-none text-light"
                style={{ transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => e.target.style.color = '#ffd600'}
                onMouseLeave={(e) => e.target.style.color = '#f8f9fa'}
              >
                <i className="bi bi-house me-2 text-white"></i>Home
              </a>
            </li>
            <li className="mb-2">
              <a 
                href="#destinations" 
                className="text-decoration-none text-light"
                style={{ transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => e.target.style.color = '#ffd600'}
                onMouseLeave={(e) => e.target.style.color = '#f8f9fa'}
              >
                <i className="bi bi-geo-alt me-2 text-white"></i>Destinations
              </a>
            </li>
            <li className="mb-2">
              <a 
                href="#about" 
                className="text-decoration-none text-light"
                style={{ transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => e.target.style.color = '#ffd600'}
                onMouseLeave={(e) => e.target.style.color = '#f8f9fa'}
              >
                <i className="bi bi-info-circle me-2 text-white"></i>About Us
              </a>
            </li>
            <li className="mb-2">
              <a 
                href="#contact" 
                className="text-decoration-none text-light"
                style={{ transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => e.target.style.color = '#ffd600'}
                onMouseLeave={(e) => e.target.style.color = '#f8f9fa'}
              >
                <i className="bi bi-envelope me-2 text-white"></i>Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Third Column - Contact Information */}
        <div className="col-lg-4 col-md-6 text-center text-md-start">
          <h6 className="fw-bold mb-3 text-uppercase" style={{ color: '#ffd600' }}>Contact Info</h6>
          <div className="mb-3">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-2">
              <i className="bi bi-envelope me-3 text-white" style={{ width: '20px' }}></i>
              <a 
                href="mailto:info@serendipwaves.com" 
                className="text-decoration-none text-light"
                style={{ transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => e.target.style.color = '#ffd600'}
                onMouseLeave={(e) => e.target.style.color = '#f8f9fa'}
              >
                info@serendipwaves.com
              </a>
            </div>
            <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-2">
              <i className="bi bi-telephone me-3 text-white" style={{ width: '20px' }}></i>
              <a 
                href="tel:+94771234567" 
                className="text-decoration-none text-light"
                style={{ transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => e.target.style.color = '#ffd600'}
                onMouseLeave={(e) => e.target.style.color = '#f8f9fa'}
              >
                +94 77 123 4567
              </a>
            </div>
            <div className="d-flex align-items-center justify-content-center justify-content-md-start">
              <i className="bi bi-geo-alt me-3 text-white" style={{ width: '20px' }}></i>
              <span className="text-light">Colombo, Sri Lanka</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright and Social Media */}
      <div className="border-top border-secondary pt-4 mt-4">
        <div className="row align-items-center">
          {/* Copyright */}
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="text-light mb-0">
              © 2025 Serendip Waves. All rights reserved.
            </p>
          </div>
          
          {/* Social Media Icons */}
          <div className="col-md-6 text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-decoration-none"
                style={{ transition: 'transform 0.3s ease' }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <i className="bi bi-facebook fs-5 text-white"></i>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-decoration-none"
                style={{ transition: 'transform 0.3s ease' }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <i className="bi bi-instagram fs-5 text-white"></i>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-decoration-none"
                style={{ transition: 'transform 0.3s ease' }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <i className="bi bi-youtube fs-5 text-white"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const HomePage = ({ onBookingClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <Hero onBookingClick={onBookingClick} />
      <DestinationsPage />
      <AboutSection />
      <ContactSection />
      <Footer />
      <style>{`
        body, html, #root {
          margin: 0 !important;
          padding: 0 !important;
          min-height: 100vh !important;
          min-width: 100vw !important;
          width: 100% !important;
          height: 100% !important;
          overflow-x: hidden !important;
          background: transparent !important;
        }
        * {
          box-sizing: border-box;
        }
        .hero-section {
          min-height: 100vh !important;
          width: 100vw !important;
          min-width: 100vw !important;
          padding: 0 !important;
          margin: 0 !important;
          background-size: cover !important;
          background-position: center center !important;
          background-repeat: no-repeat !important;
          position: relative !important;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: -80px !important;
          padding-top: 80px !important;
          height: calc(100vh + 80px) !important;
          min-height: calc(100vh + 80px) !important;
          overflow: hidden !important;
        }
        .hero-content {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
        }
        .hero-cta-btn {
          background: #ffd600;
          color: #222;
          border: none;
          font-weight: 600;
          border-radius: 2rem;
          font-size: 1.25rem;
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
        }
        .hero-cta-btn:hover, .hero-cta-btn:focus {
          background: #ffb300;
          color: #fff;
          box-shadow: 0 4px 24px rgba(13,110,253,0.18);
        }
        .destination-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .destination-card:hover {
          transform: translateY(-10px);
        }
        .destination-card:hover .card {
          box-shadow: 0 20px 40px rgba(0,0,0,0.2) !important;
        }
        .card {
          transition: all 0.3s ease;
        }
        .card:hover {
          transform: scale(1.02);
        }
        .flag-icon {
          transition: transform 0.3s ease;
        }
        .destination-card:hover .flag-icon {
          transform: scale(1.1);
        }
        @media (max-width: 767.98px) {
          .hero-content h1 {
            font-size: 2.2rem;
          }
          .hero-content p {
            font-size: 1rem;
          }
        }
        @media (max-width: 575.98px) {
          .hero-content h1 {
            font-size: 1.8rem;
          }
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          scroll-behavior: smooth;
        }
      `}</style>
      {/* Bootstrap Icons CDN for search icon */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" />
    </div>
  );
};

export default HomePage;
