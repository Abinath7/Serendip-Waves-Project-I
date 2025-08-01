

import HeroImage from './assets/Hero.jpg';

// Optimized Hero Section as a component
import React, { useState, useContext } from "react";
import DestinationsPage from "./DestinationsPage";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AboutSection from './AboutSection';
import { AuthContext } from './App';

// Optimized Hero Section as a component
const Hero = ({ onBookingClick, bookingError }) => (
  <section
    id="home"
    className="hero-section"
    style={{
      width: "100vw",
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden",
      marginTop: "-80px",
      paddingTop: "80px",
      backgroundImage: `url(${HeroImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    {/* Overlay */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(16,24,32,0.25)",
        zIndex: 1,
      }}
    />
    {/* Hero Content */}
    <div
      style={{
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "center",
        height: "100vh",
        maxWidth: "700px",
        margin: "0 0 0 auto",
        color: "#fff",
        textAlign: "right",
        padding: "0 7vw 0 2vw"
      }}
    >
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
      {bookingError && (
        <div className="alert alert-danger text-center" style={{ margin: '16px auto', maxWidth: 380, fontSize: '1.1rem' }}>{bookingError}</div>
      )}
    </div>
  </section>
);

// Contact Section
const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess('');
    setError('');
  };

  const { isAuthenticated, currentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    // Require login as customer
    const role = currentUser?.role?.toLowerCase();
    if (!isAuthenticated || role !== 'customer') {
      setError('Please login to the website as a customer to submit an enquiry.');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('http://localhost/Project-I/backend/addEnquiries.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(form).toString(),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setSuccess('Thank you for your enquiry! We will get back to you soon.');
        setForm({ name: '', email: '', message: '' });
      } else {
        setError(data.message || 'Failed to submit enquiry.');
      }
    } catch {
      setError('Failed to submit enquiry.');
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="py-5 contact-section" style={{ background: '#ffffff' }}>
      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .contact-section::-webkit-scrollbar { display: none; }
        .contact-section { -ms-overflow-style: none; scrollbar-width: none; }
    `}</style>
    <div className="container">
      <div className="text-center mb-5">
        <h2 className="display-4 fw-bold text-dark mb-3">Contact Us</h2>
        <p className="lead text-muted">Get in touch with us for your next adventure</p>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow">
            <div className="card-body p-5">
                {success && <div className="alert alert-success">{success}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Name</label>
                      <input type="text" className="form-control" placeholder="Your name" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Email</label>
                      <input type="email" className="form-control" placeholder="Your email" name="email" value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Message</label>
                    <textarea className="form-control" rows="5" placeholder="Your message" name="message" value={form.message} onChange={handleChange} required></textarea>
              </div>
                  <button className="btn btn-primary btn-lg w-100" type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
};

// Footer as a top-level component
function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleFooterHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToTop: true } });
    } else {
      scrollToSection("home");
    }
  };
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        {/* Main Footer Content */}
        <div className="row g-4">
          {/* First Column - Logo and Brand */}
          <div className="col-lg-4 col-md-6 text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-3">
              <a href="#home" onClick={handleFooterHomeClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <img 
                  src="/logo.png" 
                  alt="Serendip Waves Logo" 
                  width="70" 
                  height="70" 
                  className="me-3"
                />
                <h5 className="fw-bold mb-0" style={{ color: 'white', marginBottom: 0, cursor: 'pointer' }}>Serendip Waves</h5>
              </a>
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
                  href="/cruise-ships" 
                  className="text-decoration-none text-light"
                  style={{ transition: 'color 0.3s ease' }}
                  onMouseEnter={(e) => e.target.style.color = '#ffd600'}
                  onMouseLeave={(e) => e.target.style.color = '#f8f9fa'}
                >
                  <i className="bi bi-ship me-2 text-white"></i>Cruises
                </a>
              </li>
            </ul>
          </div>
          {/* Third Column - Contact Information */}
          <div className="col-lg-4 col-md-6 text-md-start">
            <h6 className="fw-bold mb-3 text-uppercase" style={{ color: '#ffd600' }}>Contact Info</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="mailto:info@serendipwaves.com"
                  className="text-decoration-none text-light fw-semibold"
                  style={{ transition: 'color 0.3s ease' }}
                  onMouseEnter={e => e.target.style.color = '#ffd600'}
                  onMouseLeave={e => e.target.style.color = '#f8f9fa'}
                >
                  info@serendipwaves.com
                </a>
              </li>
              <li className="mb-2 text-light fw-semibold">
                <a
                  href="tel:+94771234567"
                  className="text-decoration-none text-light fw-semibold"
                  style={{ transition: 'color 0.3s ease' }}
                  onMouseEnter={e => e.target.style.color = '#ffd600'}
                  onMouseLeave={e => e.target.style.color = '#f8f9fa'}
                >
                  +94 77 123 4567
                </a>
              </li>
              <li className="mb-2 text-light fw-semibold">
                Colombo, Sri Lanka
              </li>
            </ul>
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
}

// After Destinations section, before About section
const FleetSection = () => (
  <section id="fleet" style={{
    background: 'linear-gradient(135deg, #e9eff7 0%, #dbe6f6 100%)',
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    color: '#1a237e',
    padding: '0',
    margin: '0',
  }}>
    <div className="container" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '3rem', padding: '3rem 0' }}>
      {/* Left: Image */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src="/ShipBalcony.jpg"
          alt="Our Fleet"
          style={{
            width: '100%',
            maxWidth: '520px',
            height: 'auto',
            borderRadius: '0 0 80px 0',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.13)',
            objectFit: 'cover',
          }}
        />
      </div>
      {/* Right: Text */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', gap: '1.5rem', maxWidth: 600 }}>
        <h1 className="display-3 fw-bold mb-2" style={{ color: '#1a237e', fontWeight: 800, fontSize: '3rem', letterSpacing: '0.5px', textAlign: 'left' }}>
          Our Fleet
        </h1>
        <p className="lead mb-3" style={{ color: '#26334d', fontSize: '1.25rem', textAlign: 'left', fontWeight: 500 }}>
          Discover our magnificent fleet of luxury cruise ships, each designed to provide unforgettable experiences across the world's most beautiful waters.
        </p>
        <Link to="/cruise-ships" className="btn view-all-ships-btn btn-lg mt-2" style={{ alignSelf: 'flex-start' }}>
          View All Ships
        </Link>
      </div>
    </div>
    <style>{`
      @media (max-width: 991.98px) {
        #fleet .container {
          flex-direction: column !important;
          gap: 2rem !important;
          padding: 2rem 0 !important;
        }
        #fleet img {
          max-width: 100% !important;
          border-radius: 0 0 40px 0 !important;
        }
        #fleet h1 {
          font-size: 2.2rem !important;
        }
      }
      @media (max-width: 575.98px) {
        #fleet .container {
          padding: 1rem 0 !important;
        }
        #fleet h1 {
          font-size: 1.5rem !important;
        }
      }
    `}</style>
  </section>
);

const DestinationsSection = () => (
  <section id="destinations-section" style={{
    background: 'linear-gradient(135deg, #e9eff7 0%, #dbe6f6 100%)',
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    color: '#1a237e',
    padding: '0',
    margin: '0',
  }}>
    <div className="container" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '3rem', padding: '3rem 0' }}>
      {/* Left: Image */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src="/destination.jpg"
          alt="Destinations"
          style={{
            width: '100%',
            maxWidth: '520px',
            height: 'auto',
            borderRadius: '0 0 80px 0',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.13)',
            objectFit: 'cover',
          }}
        />
      </div>
      {/* Right: Text */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', gap: '1.5rem', maxWidth: 600 }}>
        <h1 className="display-3 fw-bold mb-2" style={{ color: '#1a237e', fontWeight: 800, fontSize: '3rem', letterSpacing: '0.5px', textAlign: 'left' }}>
          Destinations
        </h1>
        <p className="lead mb-3" style={{ color: '#26334d', fontSize: '1.25rem', textAlign: 'left', fontWeight: 500 }}>
          Explore breathtaking destinations around the world with our premium cruise experiences.
        </p>
        <Link to="/destinations" className="btn view-all-destinations-btn btn-lg mt-2" style={{ alignSelf: 'flex-start' }}>
          View All Destinations
        </Link>
      </div>
    </div>
    <style>{`
      @media (max-width: 991.98px) {
        #destinations-section .container {
          flex-direction: column !important;
          gap: 2rem !important;
          padding: 2rem 0 !important;
        }
        #destinations-section img {
          max-width: 100% !important;
          border-radius: 0 0 40px 0 !important;
        }
        #destinations-section h1 {
          font-size: 2.2rem !important;
        }
      }
      @media (max-width: 575.98px) {
        #destinations-section .container {
          padding: 1rem 0 !important;
        }
        #destinations-section h1 {
          font-size: 1.5rem !important;
        }
      }
    `}</style>
  </section>
);

// Facilities Section (after Destinations)
const FacilitiesSection = () => (
  <section id="facilities-section" style={{
    background: 'linear-gradient(135deg, #f8f9ff 0%, #e8ecf7 100%)',
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    color: '#1a237e',
    padding: '0',
    margin: '0',
  }}>
    <div className="container" style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', gap: '3rem', padding: '3rem 0' }}>
      {/* Right: Image */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src="/facilities.jpg"
          alt="Luxury Facilities"
          style={{
            width: '100%',
            maxWidth: '520px',
            height: 'auto',
            borderRadius: '0 0 80px 0',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.13)',
            objectFit: 'cover',
          }}
        />
      </div>
      {/* Left: Text */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', gap: '1.5rem', maxWidth: 600 }}>
        <h1 className="display-3 fw-bold mb-2" style={{ color: '#1a237e', fontWeight: 800, fontSize: '3rem', letterSpacing: '0.5px', textAlign: 'left' }}>
          Luxury Facilities
        </h1>
        <p className="lead mb-3" style={{ color: '#26334d', fontSize: '1.25rem', textAlign: 'left', fontWeight: 500 }}>
          Experience world-class amenities and facilities designed for your ultimate comfort and entertainment throughout your cruise journey.
        </p>
        <Link to="/things-to-do" className="btn view-all-facilities-btn btn-lg mt-2" style={{ alignSelf: 'flex-start' }}>
          Explore Facilities
        </Link>
      </div>
    </div>
    <style>{`
      @media (max-width: 991.98px) {
        #facilities-section .container {
          flex-direction: column !important;
          gap: 2rem !important;
          padding: 2rem 0 !important;
        }
        #facilities-section img {
          max-width: 100% !important;
          border-radius: 0 0 40px 0 !important;
        }
        #facilities-section h1 {
          font-size: 2.2rem !important;
        }
      }
      @media (max-width: 575.98px) {
        #facilities-section .container {
          padding: 1rem 0 !important;
        }
        #facilities-section h1 {
          font-size: 1.5rem !important;
        }
      }
    `}</style>
  </section>
);

// Our Dining Section (after Facilities)
const DiningSection = () => (
  <section id="dining-section" style={{
    background: 'linear-gradient(135deg, #e9eff7 0%, #dbe6f6 100%)',
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    color: '#1a237e',
    padding: '0',
    margin: '0',
  }}>
    <div className="container" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '3rem', padding: '3rem 0' }}>
      {/* Left: Image */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src="/fine-dining-setup.jpg"
          alt="Gourmet Dining"
          style={{
            width: '100%',
            maxWidth: '520px',
            height: 'auto',
            borderRadius: '0 0 80px 0',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.13)',
            objectFit: 'cover',
          }}
        />
      </div>
      {/* Right: Text */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', gap: '1.5rem', maxWidth: 600 }}>
        <h1 className="display-3 fw-bold mb-2" style={{ color: '#1a237e', fontWeight: 800, fontSize: '3rem', letterSpacing: '0.5px', textAlign: 'left' }}>
          Exquisite Dining
        </h1>
        <p className="lead mb-3" style={{ color: '#26334d', fontSize: '1.25rem', textAlign: 'left', fontWeight: 500 }}>
          Savor culinary excellence with our diverse dining options, featuring gourmet cuisine and special dietary accommodations for every palate.
        </p>
        <Link to="/our-dining" className="btn view-all-dining-btn btn-lg mt-2" style={{ alignSelf: 'flex-start' }}>
          Discover Dining
        </Link>
      </div>
    </div>
    <style>{`
      @media (max-width: 991.98px) {
        #dining-section .container {
          flex-direction: column !important;
          gap: 2rem !important;
          padding: 2rem 0 !important;
        }
        #dining-section img {
          max-width: 100% !important;
          border-radius: 0 0 40px 0 !important;
        }
        #dining-section h1 {
          font-size: 2.2rem !important;
        }
      }
      @media (max-width: 575.98px) {
        #dining-section .container {
          padding: 1rem 0 !important;
        }
        #dining-section h1 {
          font-size: 1.5rem !important;
        }
      }
    `}</style>
  </section>
);

const HomePage = ({ onBookingClick }) => {
  const { isAuthenticated, currentUser } = useContext(AuthContext);
  const [bookingError, setBookingError] = useState("");

  const handleBookingClick = () => {
    const role = currentUser?.role?.toLowerCase();
    if (!isAuthenticated || role !== "customer") {
      setBookingError("Please Login to the Website");
      setTimeout(() => setBookingError(""), 3000);
      return;
    }
    setBookingError("");
    onBookingClick();
  };

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <Hero onBookingClick={handleBookingClick} bookingError={bookingError} />
      <DestinationsSection />
      <FacilitiesSection />
      <DiningSection />
      <FleetSection />
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
          alignItems: center;
          justifyContent: center;
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
        .view-all-ships-btn {
          background: #0ca172ff;
          color: #fff;
          border: none;
          font-weight: 700;
          letter-spacing: 0.03em;
          box-shadow: 0 4px 18px rgba(16,35,71,0.12);
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
        }
        .view-all-ships-btn:hover, .view-all-ships-btn:focus {
          background: #1a237e;
          color: #fff;
          box-shadow: 0 6px 24px rgba(16,35,71,0.18);
        }
        .view-all-destinations-btn {
          background: #185a9d;
          color: #fff;
          border: none;
          font-weight: 700;
          letter-spacing: 0.03em;
          box-shadow: 0 4px 18px rgba(24,90,157,0.12);
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
        }
        .view-all-destinations-btn:hover, .view-all-destinations-btn:focus {
          background: #43cea2;
          color: #fff;
          box-shadow: 0 6px 24px rgba(24,90,157,0.18);
        }
        .view-all-facilities-btn {
          background: #6c5ce7;
          color: #fff;
          border: none;
          font-weight: 700;
          letter-spacing: 0.03em;
          box-shadow: 0 4px 18px rgba(108,92,231,0.12);
          
          transform: translateY(0);
        }
        .view-all-facilities-btn:hover, .view-all-facilities-btn:focus {
          background: #a29bfe;
          color: #fff;
          box-shadow: 0 8px 32px rgba(108,92,231,0.25);
          transform: translateY(-2px);
        }
        .view-all-dining-btn {
          background: #fd79a8;
          color: #fff;
          border: none;
          font-weight: 700;
          letter-spacing: 0.03em;
          box-shadow: 0 4px 18px rgba(253,121,168,0.12);
          
          transform: translateY(0);
        }
        .view-all-dining-btn:hover, .view-all-dining-btn:focus {
          background: #e84393;
          color: #fff;
          box-shadow: 0 8px 32px rgba(253,121,168,0.25);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default HomePage;