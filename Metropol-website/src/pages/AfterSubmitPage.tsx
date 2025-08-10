import React, { useEffect, useState } from 'react';

const AfterSubmitPage: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 20); 
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
         We<span className="question-mark1">'</span>re better in person.<br></br>
         There<span className="question-mark1">'</span>s a 100 things happening in London right now.<br></br>
         Every day could be new.
        </p>
      </div>

      <div className="after-main-text">
        <h1>
          everyday could <br /> be new<span className="question-mark">...</span>
        </h1>
      </div>

    <div className="after-footer fade-in">
  <p
    className="footer-question"
    onClick={async () => {
      const shareData = {
        title: "Metropol",
        text: "Check this out!",
        url: window.location.href
      };

      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else {
          await navigator.clipboard.writeText(window.location.href);
          alert("Link copied to clipboard!");
        }
      } catch (err) {
        console.error("Share failed:", err);
      }
    }}
    style={{ cursor: "pointer" }}
  >
    send to a friend<span className="question-mark1">?</span>
  </p>
</div>

    </div>
  );
};

export default AfterSubmitPage;
