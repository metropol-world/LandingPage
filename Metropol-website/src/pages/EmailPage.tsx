import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GraphemeSplitter from "grapheme-splitter";

const EmailPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const displayRef = useRef<HTMLSpanElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const caretRef = useRef<HTMLDivElement | null>(null);

  const isMobile = window.innerWidth <= 768;
  const wrapperWidth = isMobile ? 320 : 725;
  const baseFontSize = isMobile ? 90 : 192;
  const caretWidth = isMobile ? 12 : 28;
  const startOffset = isMobile ? 0 : -50;

  const updateCaretPosition = () => {
    if (inputRef.current && caretRef.current && displayRef.current) {
      const ctx = document.createElement("canvas").getContext("2d");
      ctx!.font = `${baseFontSize}px ${
        getComputedStyle(displayRef.current).fontFamily
      }`;

      const caretIndex = inputRef.current.selectionEnd || 0;
      const substring = email.substring(0, caretIndex);
      const textWidth = ctx!.measureText(substring).width;

      const fullWidth = ctx!.measureText(email || " ").width;
      const scale = fullWidth > 0 ? wrapperWidth / fullWidth : 1;

      const caretPos = Math.max(startOffset + textWidth * scale, startOffset);
      caretRef.current.style.left = `${caretPos}px`;
    }
  };

  const segments: string[] = (() => {
    const hasSeg = typeof (Intl as any)?.Segmenter !== "undefined";
    if (hasSeg) {
      const seg = new (Intl as any).Segmenter(undefined, {
        granularity: "grapheme",
      });
      return Array.from(seg.segment(email), (s: any) => s.segment);
    } else {
      const splitter = new GraphemeSplitter();
      return splitter.splitGraphemes(email);
    }
  })();

  const fallbackChars = "*()+=!@#$%^&_-{}[]|:;\"'<>,.?/`~\\";

  const displayText = segments.map((g, i) => {
    const isFallback = fallbackChars.includes(g);
    return (
      <span key={i} className={isFallback ? "fallback-symbol" : ""}>
        {g}
      </span>
    );
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener("keyup", updateCaretPosition);
      inputRef.current.addEventListener("click", updateCaretPosition);
      inputRef.current.addEventListener("select", updateCaretPosition);
    }
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener("keyup", updateCaretPosition);
        inputRef.current.removeEventListener("click", updateCaretPosition);
        inputRef.current.removeEventListener("select", updateCaretPosition);
      }
    };
  }, [email]);

  useEffect(() => {
    if (displayRef.current && caretRef.current) {
      const ctx = document.createElement("canvas").getContext("2d");
      ctx!.font = `${baseFontSize}px ${
        getComputedStyle(displayRef.current).fontFamily
      }`;
      const textWidth = ctx!.measureText(email || " ").width;

      const scale = textWidth > 0 ? wrapperWidth / textWidth : 1;
      displayRef.current.style.transform = `scaleX(${scale})`;
      displayRef.current.style.transformOrigin = "left center";

      const caretOffset = isMobile ? 2 : 5;
      const caretPosition = Math.min(
        textWidth * scale,
        wrapperWidth - caretWidth - caretOffset
      );
      caretRef.current.style.left = `${caretPosition}px`;
    }
  }, [email, isMobile]);

  const handleSubmit = async () => {
  if (!email.trim()) return;

  try {
    const response = await fetch(`/api/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    console.log("📡 Status:", response.status);

    if (response.ok) {
      console.log("✅ Email saved successfully!");
      navigate("/aftersubmit");
    } else {
      const data = await response.json();
      console.error("❌ Failed:", data.error);
    }
  } catch (error) {
    console.error("❌ Network error:", error);
  }
};


  return (
    <div className="email-page">
    <div className="email-left fade-step1">
      <img
        src="/metropol-logo/Metropol_Logo_Full_Black.png"
        alt="Metropol Logo"
        className="email-logo"
      />
      <p className="email-paragraph">
        We're better in person.
        <br />
        A hundred things are happening in London right now.<br />
        <br />  <br />
        Every day could be new.
      </p>
    </div>

<form
  className="email-form fade-step2"
  onSubmit={(e) => {
    e.preventDefault(); 
    handleSubmit();
  }} 
  //PRESS ENTER ADDED!
>
  <div className="dotted-input-wrapper">
    <input
      ref={inputRef}
      type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="email-input"
      spellCheck={false}
    />
    {!email && <span className="placeholder-text">email</span>}
    <span ref={displayRef} className="email-display">
      {displayText.length ? displayText : ""}
    </span>
    <div className="dotted-line">
      {Array.from({ length: 12 }).map((_, i) => (
        <div className="cube" key={i}></div>
      ))}
    </div>
    <div ref={caretRef} className="custom-caret"></div>
  </div>

  <button type="submit" style={{ display: "none" }}></button>

  <img
    src="/metropol-logo/arrow.png"
    alt="Join"
    onClick={handleSubmit}
    style={{
      background: "none",
      boxShadow: "none",
      display: "block",
      cursor: "pointer",
    }}
    className={isMobile ? "arrow-img-mobile" : "arrow-img-desktop"}
  />
</form>
    </div>
  );
};

export default EmailPage;
