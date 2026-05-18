"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Wraps a 1920px-design page and scales it down to fit any viewport width.
 * - No horizontal scroll ever
 * - Maintains pixel-perfect aspect ratio
 * - Auto-recalculates on resize
 */
export function ScaleWrapper({ children }: { children: React.ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    function recalc() {
      const vw = window.innerWidth;
      const s = Math.min(vw / 1920, 1); // never upscale above 1
      setScale(s);
      if (innerRef.current) {
        // intrinsic height of the design at 1920px
        const intrinsicH = innerRef.current.offsetHeight;
        setHeight(intrinsicH * s);
      }
    }
    recalc();
    window.addEventListener("resize", recalc);
    // Re-measure after assets load
    const t = setTimeout(recalc, 500);
    return () => {
      window.removeEventListener("resize", recalc);
      clearTimeout(t);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: height ? `${height}px` : "auto",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        ref={innerRef}
        style={{
          width: "1920px",
          transformOrigin: "top left",
          transform: `scale(${scale})`,
          position: "absolute",
          top: 0,
          left: "50%",
          marginLeft: `${(-1920 * scale) / 2}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
