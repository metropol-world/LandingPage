import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import '../App.css';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const logoRef = useRef<HTMLImageElement | null>(null);
  const logoPosRef = useRef(0);
  const isMobile = window.innerWidth <= 768; 

  useEffect(() => {
    if (isMobile) return; 

const handleWheel = (event: WheelEvent) => {
  if (event.deltaX !== 0 || event.deltaY !== 0) {
    // Invert both scroll directions
    logoPosRef.current -= (event.deltaY + event.deltaX) * 0.3;

    const minPos = -window.innerWidth * 2;
    if (logoPosRef.current < minPos) logoPosRef.current = minPos;

 if (logoRef.current) {
  gsap.to(logoRef.current, {
    x: logoPosRef.current,
    ease: 'none', // no easing, just a direct position change
    duration: 0 // instant
  });
}


    if (logoPosRef.current <= minPos) {
      setTimeout(() => {
        navigate('/second');
      }, 500);
    }
  }
};


    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [navigate, isMobile]);

  return (
    <div
      className="main-page"
      onClick={() => isMobile && navigate('/second')}
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
