import React, { useState } from "react";

type Props = {
  url?: string;        
  title?: string;      
  text?: string;     
  className?: string;
};

const ShareButton: React.FC<Props> = ({ url, title = "Check this out", text = "", className }) => {
  const [msg, setMsg] = useState<"idle" | "copied" | "error">("idle");
  const link = url ?? (typeof window !== "undefined" ? window.location.href : "");

  const show = (state: "copied" | "error") => {
    setMsg(state);
    window.setTimeout(() => setMsg("idle"), 1500);
  };

  const copyFallback = async () => {
    try {
      const ta = document.createElement("textarea");
      ta.value = link;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      show("copied");
    } catch {
      show("error");
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url: link });
        return;
      }
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(link);
        show("copied");
      } else {
        await copyFallback();
      }
    } catch {
      await copyFallback();
    }
  };

  return (
    <button onClick={handleShare} className={`share-btn ${className ?? ""}`} aria-live="polite">
      {msg === "copied" ? "Link copied ✔️" : msg === "error" ? "Copy failed" : "Share / Copy Link"}
    </button>
  );
};

export default ShareButton;
