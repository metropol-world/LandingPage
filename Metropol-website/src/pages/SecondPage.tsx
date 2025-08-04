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

             
      <h1 className="second-heading fade-in3">
        want in
        <span className="question-mark">?</span>
      </h1>
    </div>
  );
};

export default SecondPage;
