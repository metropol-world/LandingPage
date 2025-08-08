import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import '../App.css';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const logoRef = useRef<HTMLImageElement | null>(null);
  const logoPosRef = useRef(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const minPos = -window.innerWidth * 2.2; // how far left the logo can go
    const maxPos = 0; // starting point

    const updateLogoPosition = (pos: number) => {
      logoPosRef.current = Math.max(minPos, Math.min(maxPos, pos));
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          x: logoPosRef.current,
          ease: "power1.out",
          duration: 0.1
        });
      }
      // Trigger page change when fully left
      if (logoPosRef.current <= minPos) {
        setTimeout(() => {
          navigate('/second');
        }, 500);
      }
    };

    // Mouse wheel scroll (vertical gestures controlling horizontal movement)
    const handleWheel = (event: WheelEvent) => {
      const deltaX = event.deltaX || event.deltaY; // support trackpad horizontal
      updateLogoPosition(logoPosRef.current - deltaX * 0.35);
    };

    // Horizontal scrollbar movement (if scrollbar is visible)
    const handleScroll = () => {
      updateLogoPosition(-window.scrollX);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navigate, isMobile]);

  return (
    <div
      className="main-page"
      onClick={() => {
        if (isMobile) navigate('/second');
      }}
      style={{ overflow: 'hidden' }} // no page scroll, only logo moves
    >
      <img
        ref={logoRef}
        src="/metropol-logo/Metropol_Logo_Full_Black.png"
        alt="Metropol Logo"
        className="main-logo desktop-only"
      />
      <img
        src="/metropol-logo/Metropol_Logo_Icon_Black.png"
        alt="Metropol Icon"
        className="main-logo mobile-only"
      />
      <p className="copyright">
        <span className="fallback-symbol">©</span> metropol 2025
      </p>
    </div>
  );
};

export default MainPage;
