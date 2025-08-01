import React from 'react';
import { useNavigate } from 'react-router-dom';

const SecondPage: React.FC = () => {
  const navigate = useNavigate();


  const handleClick = () => {
    navigate('/email');
  };

  return (
    <div className="second-page" onClick={handleClick}>
      <h1 className="second-heading">
        want in
        <span className="question-mark">?</span>
      </h1>
    </div>
  );
};

export default SecondPage;
