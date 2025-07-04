import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// All destination data in this file
const destinations = [
  {
    country: "Greece",
    shipName: "Mediterranean Dream",
    nights: "7 Nights",
    price: "$2,500",
    flag: "🇬🇷",
    image: "Greece.jpg",
    description: "Explore the stunning Greek islands with crystal clear waters and ancient ruins."
  },
  {
    country: "Norway",
    shipName: "Northern Lights Explorer",
    nights: "10 Nights",
    price: "$3,100",
    flag: "🇳🇴",
    image: "norway.jpg",
    description: "Witness the magical Northern Lights and fjords of Norway."
  },
  {
    country: "Caribbean",
    shipName: "Tropical Paradise",
    nights: "8 Nights",
    price: "$2,800",
    flag: "🇯🇲",
    image: "Careebean.jpg",
    description: "Relax in the warm Caribbean waters with pristine beaches."
  },
  {
    country: "Alaska",
    shipName: "Glacier Adventure",
    nights: "12 Nights",
    price: "$3,600",
    flag: "🇺🇸",
    image: "Alaska.jpg",
    description: "Experience the majestic glaciers and wildlife of Alaska."
  },
  {
    country: "Japan",
    shipName: "Cherry Blossom Voyage",
    nights: "9 Nights",
    price: "$3,200",
    flag: "🇯🇵",
    image: "japan.jpg",
    description: "Discover the beauty of Japanese culture and cherry blossoms."
  },
  {
    country: "Australia",
    shipName: "Great Barrier Reef",
    nights: "11 Nights",
    price: "$3,900",
    flag: "🇦🇺",
    image: "Australia.jpg",
    description: "Explore the world's largest coral reef system."
  }
];

const DestinationsPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [animating, setAnimating] = useState(false);
  const [buttonActive, setButtonActive] = useState(null); // 'left' or 'right' for click feedback
  const totalSlides = Math.ceil(destinations.length / 3);
  const slideRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextSlide = () => {
    if (animating) return;
    setDirection(1);
    setButtonActive('right');
    setAnimating(true);
    setTimeout(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
      setAnimating(false);
      setButtonActive(null);
    }, 300);
  };

  const prevSlide = () => {
    if (animating) return;
    setDirection(-1);
    setButtonActive('left');
    setAnimating(true);
    setTimeout(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
      setAnimating(false);
      setButtonActive(null);
    }, 300);
  };

  const getCurrentDestinations = () => {
    const startIndex = currentSlide * 3;
    return destinations.slice(startIndex, startIndex + 3);
  };

  // For sliding effect
  const slideWidth = 370; // card width + gap
  const translateX = -currentSlide * slideWidth * 3;

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <section
        id="destinations"
        style={{
          background: "#fff",
          padding: "3rem 0",
          minHeight: "100vh",
          width: "100vw",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2 className="text-center mb-2 fw-bold" style={{ fontSize: "2.5rem" }}>
          Featured Destinations
        </h2>
        <p className="lead text-muted text-center mb-5" style={{ fontSize: "1.2rem", maxWidth: 600, margin: "0 auto" }}>
          Discover breathtaking destinations around the world with our premium cruise experiences
        </p>
        <div style={{ position: 'relative', width: '100%', maxWidth: 1200, margin: '0 auto', minHeight: 350 }}>
          {/* Left Scroll Button */}
          <button
            onClick={prevSlide}
            aria-label="Scroll Left"
            tabIndex={0}
            disabled={animating}
            style={{
              position: 'absolute',
              left: 10,
              top: '50%',
              transform: `translateY(-50%) scale(${buttonActive === 'left' ? 0.92 : 1})`,
              zIndex: 2,
              background: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: 64,
              height: 64,
              boxShadow: buttonActive === 'left' ? '0 0 0 6px #1976d222, 0 8px 32px #1976d244' : '0 4px 16px rgba(25, 118, 210, 0.10)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: animating ? 'not-allowed' : 'pointer',
              transition: 'box-shadow 0.2s, background 0.2s, transform 0.12s',
              outline: 'none',
              opacity: animating ? 0.7 : 1,
            }}
            onMouseOver={e => e.currentTarget.style.boxShadow = '0 0 0 6px #1976d222, 0 8px 24px #1976d244'}
            onMouseOut={e => e.currentTarget.style.boxShadow = buttonActive === 'left' ? '0 0 0 6px #1976d222, 0 8px 32px #1976d244' : '0 4px 16px rgba(25, 118, 210, 0.10)'}
            onMouseDown={() => setButtonActive('left')}
            onMouseUp={() => setButtonActive(null)}
            onBlur={() => setButtonActive(null)}
          >
            {/* Blue left arrow SVG, larger and bolder */}
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 31L14 19L24 7" stroke="#1976d2" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {/* Right Scroll Button */}
          <button
            onClick={nextSlide}
            aria-label="Scroll Right"
            tabIndex={0}
            disabled={animating}
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: `translateY(-50%) scale(${buttonActive === 'right' ? 0.92 : 1})`,
              zIndex: 2,
              background: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: 64,
              height: 64,
              boxShadow: buttonActive === 'right' ? '0 0 0 6px #1976d222, 0 8px 32px #1976d244' : '0 4px 16px rgba(25, 118, 210, 0.10)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: animating ? 'not-allowed' : 'pointer',
              transition: 'box-shadow 0.2s, background 0.2s, transform 0.12s',
              outline: 'none',
              opacity: animating ? 0.7 : 1,
            }}
            onMouseOver={e => e.currentTarget.style.boxShadow = '0 0 0 6px #1976d222, 0 8px 24px #1976d244'}
            onMouseOut={e => e.currentTarget.style.boxShadow = buttonActive === 'right' ? '0 0 0 6px #1976d222, 0 8px 32px #1976d244' : '0 4px 16px rgba(25, 118, 210, 0.10)'}
            onMouseDown={() => setButtonActive('right')}
            onMouseUp={() => setButtonActive(null)}
            onBlur={() => setButtonActive(null)}
          >
            {/* Blue right arrow SVG, larger and bolder */}
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 7L24 19L14 31" stroke="#1976d2" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {/* Slide Wrapper */}
          <div
          style={{
              overflow: 'hidden',
            width: '100%',
              minHeight: 350,
              borderRadius: 32,
              position: 'relative',
            background: 'rgba(255,255,255,0.25)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            border: '1px solid rgba(255,255,255,0.18)',
              margin: '0 auto',
            }}
          >
            <div
              ref={slideRef}
              style={{
                display: 'flex',
                transition: animating ? 'transform 0.3s cubic-bezier(.77,0,.18,1)' : 'none',
                transform: `translateX(${-currentSlide * slideWidth * 1}px)`,
                gap: '2rem',
                padding: '2rem 1rem',
                minHeight: 350,
          }}
        >
              {destinations.map((destination, idx) => (
            <div
              key={destination.country}
              style={{
                display: "inline-block",
                width: 350,
                minWidth: 300,
                maxWidth: 350,
                background: "rgba(255,255,255,0.7)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
                backdropFilter: "blur(8px)",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.18)",
                marginRight: "1rem",
                overflow: "hidden",
              }}
            >
              <img
                src={destination.image}
                alt={destination.country}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                }}
              />
              <div style={{ padding: "1.5rem", textAlign: "left" }}>
                <h4 style={{ fontWeight: "bold", marginBottom: "0.5rem", textAlign: "left" }}>{destination.country}</h4>
                <div style={{
                  fontSize: "0.98rem",
                  color: "#444",
                  marginBottom: "1rem",
                  textAlign: "left",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                }}>
                  {destination.description}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                  <div style={{ fontWeight: "bold", color: "#222", fontSize: "1.1rem", textAlign: "left" }}>
                    {destination.nights}
                  </div>
                  <div style={{ fontWeight: "bold", color: "#007bff", fontSize: "1.05rem", textAlign: "right" }}>
                    {destination.price}
                  </div>
                </div>
              </div>
            </div>
          ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationsPage; 