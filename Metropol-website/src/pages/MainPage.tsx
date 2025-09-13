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
  const setX = gsap.quickSetter(el, "x", "px");

  let velocity = 0;
  let pos = -(window.innerWidth * 0.35);
  logoPosRef.current = pos;
  setX(pos);

  const SENS = 0.12;     
  const FRICTION = 0.90; 
  const EPSILON = 0.05;
  const clamp = (v: number) => Math.max(minPos, Math.min(maxPos, v));

  const normDelta = (e: WheelEvent) => {
    let d = e.deltaX || e.deltaY;
    if (e.deltaMode === 1) d *= 16;
    else if (e.deltaMode === 2) d *= window.innerHeight;
    return d;
  };

  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = normDelta(e);
    velocity += -delta * SENS;
  };

  // ✅ Touch Support
  let touchStartX = 0;
  let touchLastX = 0;

  const onTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchLastX = touchStartX;
    }
  };

  const onTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 1) {
      const currentX = e.touches[0].clientX;
      const delta = currentX - touchLastX;
      velocity += delta * SENS * 0.5;
      touchLastX = currentX;
    }
  };

  const animate = () => {
    if (Math.abs(velocity) > EPSILON) {
      pos = clamp(pos + velocity);
      setX(pos);
      logoPosRef.current = pos;
      velocity *= FRICTION;

      if (pos <= minPos && logoRef.current) {
        gsap.to(logoRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => void navigate("/second"),

        });
        return;
      }

      requestAnimationFrame(animate);
    } else {
      velocity = 0;
    }
  };

  const startAnimation = () => {
    if (velocity !== 0) requestAnimationFrame(animate);
  };

  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: false });

  const interval = setInterval(startAnimation, 16);

  return () => {
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
    clearInterval(interval);
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
