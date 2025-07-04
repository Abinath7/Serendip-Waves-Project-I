import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import cruis1 from './assets/cruis1.avif';
import cruis2 from './assets/cruis2.webp';
import cruis3 from './assets/cruis3.jpg';
import cruis4 from './assets/cruis4.webp';
import cruis5 from './assets/cruis5.webp';
import cruis6 from './assets/cruis6.webp';

// Shuffle images and assign randomly to ships
const cruiseImages = [cruis1, cruis2, cruis3, cruis4, cruis5, cruis6];
const shuffledImages = cruiseImages.sort(() => 0.5 - Math.random());

// Cruise ship data with dummy details
const cruiseShips = [
  {
    id: 1,
    name: "Serendip Dream",
    class: "Luxury Class",
    capacity: "2,500 passengers",
    pools: "4 pools",
    restaurants: "12 restaurants",
    width: "150 feet",
    decks: "18 decks",
    yearBuilt: "2023",
    flag: "🇱🇰 Sri Lanka",
    description: "The crown jewel of our fleet, Serendip Dream offers unparalleled luxury with world-class amenities, gourmet dining, and exclusive entertainment venues.",
    image: shuffledImages[0]
  },
  {
    id: 2,
    name: "Serendip Majesty",
    class: "Premium Class",
    capacity: "2,000 passengers",
    pools: "3 pools",
    restaurants: "8 restaurants",
    width: "140 feet",
    decks: "16 decks",
    yearBuilt: "2022",
    flag: "🇬🇷 Greece",
    description: "Experience the perfect blend of elegance and adventure aboard Serendip Majesty, featuring stunning architecture and innovative entertainment options.",
    image: shuffledImages[1]
  },
  {
    id: 3,
    name: "Serendip Explorer",
    class: "Explorer Class",
    capacity: "1,800 passengers",
    pools: "2 pools",
    restaurants: "6 restaurants",
    width: "130 feet",
    decks: "14 decks",
    yearBuilt: "2021",
    flag: "🇳🇴 Norway",
    description: "Designed for the adventurous spirit, Serendip Explorer combines comfort with exploration, perfect for discovering remote destinations and natural wonders.",
    image: shuffledImages[2]
  },
  {
    id: 4,
    name: "Serendip Serenade",
    class: "Royal Class",
    capacity: "2,200 passengers",
    pools: "4 pools",
    restaurants: "10 restaurants",
    width: "145 feet",
    decks: "17 decks",
    yearBuilt: "2023",
    flag: "🇯🇵 Japan",
    description: "Serendip Serenade embodies timeless elegance with modern sophistication, offering guests a truly regal experience with personalized service and exclusive amenities.",
    image: shuffledImages[3]
  },
  {
    id: 5,
    name: "Serendip Adventurer",
    class: "Adventure Class",
    capacity: "1,500 passengers",
    pools: "2 pools",
    restaurants: "5 restaurants",
    width: "125 feet",
    decks: "13 decks",
    yearBuilt: "2022",
    flag: "🇦🇺 Australia",
    description: "Built for thrill-seekers and nature lovers, Serendip Adventurer offers unique experiences with specialized equipment for diving, kayaking, and wildlife viewing.",
    image: shuffledImages[4]
  },
  {
    id: 6,
    name: "Serendip Harmony",
    class: "Harmony Class",
    capacity: "2,800 passengers",
    pools: "5 pools",
    restaurants: "15 restaurants",
    width: "160 feet",
    decks: "20 decks",
    yearBuilt: "2024",
    flag: "🇨🇦 Canada",
    description: "The largest and most innovative ship in our fleet, Serendip Harmony redefines luxury cruising with cutting-edge technology and unprecedented entertainment options.",
    image: shuffledImages[5]
  }
];

const CruiseShipsPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  console.log("CruiseShipsPage component is rendering!");

  // Add CSS for smooth scrolling and full-screen sections
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      .cruise-ship-section {
        scroll-snap-align: start;
      }
      body {
        overflow-x: hidden;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    console.log("CruiseShipsPage useEffect running");
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      
      // Calculate active section based on scroll position
      const sections = document.querySelectorAll('.cruise-ship-section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionHeight = window.innerHeight;
        const sectionMiddle = rect.top + rect.height / 2;
        const viewportMiddle = window.innerHeight / 2;
        
        if (Math.abs(sectionMiddle - viewportMiddle) < sectionHeight / 2) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    // Add smooth scrolling behavior to the page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const scrollToSection = (index) => {
    const sections = document.querySelectorAll('.cruise-ship-section');
    sections[index].scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewDestinations = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById("destinations");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      const el = document.getElementById("destinations");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff', paddingTop: '80px' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container text-center text-white">
          <h1 className="display-3 fw-bold mb-4">
            Our Fleet
          </h1>
          <p className="lead mb-5">
            Discover our magnificent fleet of luxury cruise ships, each designed to provide 
            unforgettable experiences across the world's most beautiful waters.
          </p>
          
          <div className="mt-5">
            <Link to="/" className="btn btn-outline-light btn-lg me-3">
              ← Back to Home
            </Link>
            <a href="#destinations" className="btn btn-warning btn-lg" onClick={handleViewDestinations}>
              View Destinations
            </a>
          </div>
        </div>
      </section>

      {/* Navigation Dots */}
      <div style={{
        position: 'fixed',
        right: '30px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        {cruiseShips.map((ship, index) => (
          <button
            key={ship.id}
            onClick={() => scrollToSection(index)}
            className={`btn btn-sm rounded-circle ${
              activeSection === index ? 'btn-warning' : 'btn-outline-light'
            }`}
            style={{
              width: '12px',
              height: '12px',
              padding: 0,
              border: '2px solid',
              transition: 'all 0.3s ease',
              boxShadow: activeSection === index ? '0 0 10px rgba(255, 193, 7, 0.5)' : 'none'
            }}
            title={ship.name}
          />
        ))}
      </div>

      {/* Cruise Ships Sections */}
      {cruiseShips.map((ship, index) => (
        <section
          key={ship.id}
          className="cruise-ship-section"
          style={{
            height: '100vh',
            padding: '0',
            background: index % 2 === 0 ? '#f8f9fa' : '#ffffff',
            display: 'flex',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          <div className="container h-100">
            <div className="row align-items-center h-100">
              {/* Image Section */}
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '20px',
                  padding: '20px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  height: '500px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <img
                    src={ship.image}
                    alt={ship.name}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '15px',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                    }}
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="col-lg-6">
                <div style={{ padding: '40px 20px' }}>
                  {/* Ship Header */}
                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-3">
                      <span style={{ fontSize: '2rem', marginRight: '15px' }}>{ship.flag}</span>
                      <div>
                        <h2 className="fw-bold mb-1" style={{ 
                          fontSize: '2.5rem',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}>
                          {ship.name}
                        </h2>
                      </div>
                    </div>
                    <p className="lead text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                      {ship.description}
                    </p>
                  </div>

                  {/* Ship Stats */}
                  <div className="row mb-4">
                    <div className="col-6 mb-3">
                      <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
                        <div className="card-body text-center p-3">
                          <div className="fw-bold text-primary" style={{ fontSize: '1.2rem' }}>
                            {ship.capacity}
                          </div>
                          <div className="text-muted small">Capacity</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
                        <div className="card-body text-center p-3">
                          <div className="fw-bold text-primary" style={{ fontSize: '1.2rem' }}>
                            {ship.pools}
                          </div>
                          <div className="text-muted small">Pools</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
                        <div className="card-body text-center p-3">
                          <div className="fw-bold text-primary" style={{ fontSize: '1.2rem' }}>
                            {ship.restaurants}
                          </div>
                          <div className="text-muted small">Restaurants</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
                        <div className="card-body text-center p-3">
                          <div className="fw-bold text-primary" style={{ fontSize: '1.2rem' }}>
                            {ship.decks}
                          </div>
                          <div className="text-muted small">Decks</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="text-center">
                    <a href="#destinations" className="btn btn-warning btn-lg px-5 py-3 fw-bold" style={{ borderRadius: '25px' }} onClick={handleViewDestinations}>
                      View Destinations
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Footer Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '60px 0',
        color: 'white'
      }}>
        <div className="container text-center">
          <h3 className="fw-bold mb-4">Ready to Set Sail?</h3>
          <p className="lead mb-4">
            Choose your perfect ship and embark on an unforgettable journey with Serendip Waves.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/" className="btn btn-outline-light btn-lg">
              Back to Home
            </Link>
            <a href="#destinations" className="btn btn-warning btn-lg" onClick={handleViewDestinations}>
              View Destinations
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CruiseShipsPage;
