import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/second');
  };

  return (
    <div className="main-page" onClick={handleClick}>
      <img
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
