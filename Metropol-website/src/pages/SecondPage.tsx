import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedPixelText from "./animationtest";

const SecondPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/email');
  };

  return (
    <div className="second-page fade-in" onClick={handleClick}>
      <div className="background-animation">
        <AnimatedPixelText />
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation(); // ✅ Prevent parent div from blocking button clicks
          navigate('/email');
        }}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          margin: 0,
          cursor: 'pointer',
          outline: 'none',
          width: '100%',
          textAlign: 'center',
          zIndex: 9999,         // ✅ Ensure button is clickable above animation
          position: 'relative'
        }}
      >
        <h1 className="second-heading fade-in3">
          want in
          <span className="question-mark">?</span>
        </h1>
      </button>
    </div>
  );
};

export default SecondPage;
