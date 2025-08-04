import React, { useEffect, useState } from 'react';

const AfterSubmitPage: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger the background transition after a slight delay
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 20); // delay ensures React renders red first
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`after-page ${loaded ? 'loaded' : ''}`}>
      <div className="after-header">
        <img 
          src="/metropol-logo/Metropol_Logo_Full_Black.png" 
          alt="Metropol Logo" 
          className="after-logo"
        />
        <p className="after-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Phasellus ut augue lacinia, cursus neque ac, imperdiet est. 
          Cras eu vulputate nibh. Duis pellentesque nec ligula.
        </p>
      </div>

      <div className="after-main-text">
        <h1>
          everyday could <br /> be new<span className="question-mark">...</span>
        </h1>
      </div>

      <div className="after-footer">
        <p className="footer-question">
          send to a friend<span className="question-mark">?</span>
        </p>
        <p className="footer-email">email here</p>
      </div>
    </div>
  );
};

export default AfterSubmitPage;
