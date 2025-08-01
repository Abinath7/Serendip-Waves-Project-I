import React, { useEffect, useRef } from 'react';
import './AboutSection.css';

function useCounterAnimation(ref, end, duration = 1200) {
  useEffect(() => {
    if (!ref.current) return;
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    let current = start;
    const animate = () => {
      current += step;
      if (current > end) current = end;
      ref.current.innerText = current.toLocaleString() + '+';
      if (current < end) requestAnimationFrame(animate);
    };
    animate();
  }, [ref, end, duration]);
}

const AboutSection = () => {
  const cruiseRef = useRef();
  const destRef = useRef();
  const custRef = useRef();
  useCounterAnimation(cruiseRef, 500);
  useCounterAnimation(destRef, 50);
  useCounterAnimation(custRef, 10000);

  return (
    <>
      <section id="about" className="about-luxury-section position-relative" style={{ paddingBottom: '2.5rem' }}>
        <div className="about-wave-bg"></div>
        <div className="container py-5">
          <div className="row align-items-center g-5 flex-column-reverse flex-lg-row">
            {/* Left: Text */}
            <div className="col-lg-6 text-center text-lg-start fade-up">
              <h2 className="about-title display-2 fw-bold mb-2">About Serendip Waves</h2>
              <div className="about-underline mx-auto mx-lg-0 mb-4"></div>
              <p className="lead mb-3" style={{ color: '#0a2540', fontSize: '1.4rem' }}>
                We are passionate about creating unforgettable cruise experiences that combine luxury, adventure, and discovery.
              </p>
              <p className="mb-5" style={{ color: '#0a2540', fontSize: '1.1rem' }}>
                With over 20 years of experience in the cruise industry, we've helped thousands of travelers explore the world's most beautiful destinations. Our commitment to excellence and attention to detail ensures every journey is extraordinary.
              </p>
            </div>
            {/* Right: Image */}
            <div className="col-lg-6 d-flex justify-content-center align-items-center fade-right">
              <div className="about-img-frame position-relative">
                <img src="About us.jpg" alt="About Us" className="about-img" />
                <div className="about-img-reflection"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Stats Block - full width below text and image */}
        <div className="about-stats-block-modern my-5 py-5">
          <div className="container">
            <h2 className="about-stats-title text-center mb-2">Serendip Waves By The Numbers</h2>
            <div className="about-stats-underline mx-auto mb-5"></div>
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-5">
              <div className="about-stat-modern-card">
                <div className="about-stat-modern-value" ref={cruiseRef}>500+</div>
                <div className="about-stat-modern-label">Happy Cruises</div>
              </div>
              <div className="about-stat-modern-card">
                <div className="about-stat-modern-value" ref={destRef}>50+</div>
                <div className="about-stat-modern-label">Destinations</div>
              </div>
              <div className="about-stat-modern-card">
                <div className="about-stat-modern-value" ref={custRef}>10,000+</div>
                <div className="about-stat-modern-label">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
        {/* Why Choose Us */}
        <div className="row mt-5 g-4 why-choose-row text-center">
          <div className="col-12">
            <h4 className="fw-bold mb-4 text-center" style={{ color: '#cda34f' }}>Why Choose Us</h4>
            <div className="d-flex flex-column flex-md-row gap-4 justify-content-center">
              <div className="why-card shadow-sm">
                <i className="bi bi-star-fill why-icon" style={{ color: '#cda34f' }}></i>
                <div className="why-title">Luxury Experience</div>
                <div className="why-desc">Premium ships, gourmet dining, and world-class amenities for every guest.</div>
              </div>
              <div className="why-card shadow-sm">
                <i className="bi bi-shield-check why-icon" style={{ color: '#0a2540' }}></i>
                <div className="why-title">Safety & Trust</div>
                <div className="why-desc">Highest safety standards and trusted by thousands of happy travelers.</div>
              </div>
              <div className="why-card shadow-sm">
                <i className="bi bi-globe why-icon" style={{ color: '#cda34f' }}></i>
                <div className="why-title">Global Destinations</div>
                <div className="why-desc">Explore 50+ breathtaking destinations across the world's oceans.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;