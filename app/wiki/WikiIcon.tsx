"use client";
import { useState } from "react";
type WikiIconProps = { src: string; alt: string; variant?: "normal" | "fluid"; };
export default function WikiIcon({ src, alt, variant = "normal" }: WikiIconProps) {
  const [failed, setFailed] = useState(false);
  return <div className={`wiki-entry-image ${variant === "fluid" ? "wiki-entry-image-fluid" : ""}`}>
    {!failed ? <img src={src} alt={alt} onError={() => setFailed(true)} /> :
      <svg className="wiki-placeholder-icon" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="3" />
        <path d="M24 25c0-7 4.7-11 11.4-11C42 14 47 18.2 47 24.2c0 5.6-3.4 8.7-8.5 11.7-4 2.4-5.5 4.7-5.5 8.1" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="33" cy="51" r="2.3" fill="currentColor" />
      </svg>}
  </div>;
}
