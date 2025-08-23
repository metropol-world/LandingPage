import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import '../App.css';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const logoRef = useRef<HTMLImageElement | null>(null);
  const logoPosRef = useRef(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const goSecond = () => { navigate("/second"); };

  useEffect(() => {
  if (isMobile) return;
  const el = logoRef.current;
  if (!el) return;

  const maxPos = 0;
  const minPos = -window.innerWidth * 2.2;


  const START_X = -(window.innerWidth * 0.35);

  const setX = gsap.quickSetter(el, "x", "px");
  gsap.killTweensOf(el);
  logoPosRef.current = START_X;
  setX(START_X);

  const normDelta = (e: WheelEvent) => {
    let d = e.deltaX || e.deltaY;
    if (e.deltaMode === 1) d *= 16;
    else if (e.deltaMode === 2) d *= window.innerHeight;
    return d;
  };

  const SENS = 0.1;
  const clamp = (v: number) => Math.max(minPos, Math.min(maxPos, v));

  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    const d = normDelta(e);
    logoPosRef.current = clamp(logoPosRef.current - d * SENS);
    setX(logoPosRef.current);

    if (logoPosRef.current <= minPos && logoRef.current) {
     gsap.to(logoRef.current!, {
  opacity: 0,
  duration: 1,
  ease: "power2.out",
  onComplete: goSecond
});
    }
  };

  const onScroll = () => {
    logoPosRef.current = clamp(-window.scrollX);
    setX(logoPosRef.current);
  };

  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("scroll", onScroll);
  };
}, [navigate, isMobile]);


  useEffect(() => {
  if (isMobile) return;
  const el = logoRef.current;
  if (!el) return;

  const maxPos = 0;
  const minPos = -window.innerWidth * 2.2;

  logoPosRef.current = 0;
  const targetPosRef = { current: 0 };

  const setX = gsap.quickSetter(el, "x", "px");
  gsap.killTweensOf(el);
  setX(0); 

  const normDelta = (e: WheelEvent) => {
    let d = e.deltaX || e.deltaY;
    if (e.deltaMode === 1) d *= 16;
    else if (e.deltaMode === 2) d *= window.innerHeight;
    return d;
  };

  const SENS = 0.35; 
  const clamp = (v: number) => Math.max(minPos, Math.min(maxPos, v));

const onWheel = (e: WheelEvent) => {
  e.preventDefault();
  const d = normDelta(e);

  logoPosRef.current = clamp(logoPosRef.current - d * SENS);
  setX(logoPosRef.current);


  if (logoPosRef.current <= minPos) {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          navigate("/second");
        }
      });
    }
  }
};


  const onScroll = () => {
    logoPosRef.current = clamp(-window.scrollX);
    setX(logoPosRef.current);
  };

  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("scroll", onScroll);
  };
}, [navigate, isMobile]);


  return (
    <div
      className="main-page"
      onClick={() => {
        if (isMobile) navigate('/second');
      }}
      style={{ overflow: 'hidden' }} 
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
