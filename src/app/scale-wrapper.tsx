"use client";

import { useEffect, useRef, useState } from "react";

const DESIGN_WIDTH = 1920;
const MOBILE_BREAKPOINT = 768; // en dessous on propose la version desktop forcée

/**
 * Wrapper qui rend la page 1920px design parfaitement adaptable :
 * - Desktop (≥768px) : auto-scale fluide pour remplir la largeur du viewport
 * - Mobile (<768px) : message "Optimisé pour desktop" + option voir quand même
 * - Resize fluide en live
 * - Aucun scroll horizontal jamais
 */
export function ScaleWrapper({ children }: { children: React.ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(0);
  const [vw, setVw] = useState<number | null>(null);
  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    function recalc() {
      const w = window.innerWidth;
      setVw(w);
      // scale = min(viewport / 1920, 1) → on ne grossit jamais au-delà du design 1920px
      const s = Math.min(w / DESIGN_WIDTH, 1);
      setScale(s);
      if (innerRef.current) {
        const intrinsicH = innerRef.current.offsetHeight;
        setHeight(intrinsicH * s);
      }
    }
    recalc();
    window.addEventListener("resize", recalc);
    // Re-mesure quand les fonts/images chargent
    const t1 = setTimeout(recalc, 300);
    const t2 = setTimeout(recalc, 1500);
    return () => {
      window.removeEventListener("resize", recalc);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const isMobile = vw !== null && vw < MOBILE_BREAKPOINT;
  const showMobileMessage = isMobile && !forceShow;

  return (
    <>
      {/* Overlay mobile : message "Optimisé pour desktop" */}
      {showMobileMessage && (
        <div className="fixed inset-0 z-[100] bg-[#0e1a1f] flex flex-col items-center justify-center px-6 text-center">
          <div className="text-[64px] mb-6">🖥️</div>
          <h1
            className="text-white text-2xl font-extrabold uppercase mb-3 tracking-tight"
            style={{ fontFamily: "var(--font-barlow), sans-serif" }}
          >
            Cette maquette est optimisée pour ordinateur
          </h1>
          <p className="text-white/60 text-base leading-relaxed mb-8 max-w-sm">
            Pour profiter pleinement de l'expérience Hisense × Coupe du Monde
            2026, ouvre cette page sur un écran d'au moins 768px de large.
          </p>
          <button
            onClick={() => setForceShow(true)}
            className="bg-[#00b3ac] text-[#0e1a1f] font-semibold px-6 py-3 rounded-full text-sm hover:opacity-85 transition-opacity"
          >
            Voir quand même →
          </button>
          <p className="mt-8 text-white/30 text-xs tracking-widest uppercase">
            Hisense · Sponsor officiel · FIFA World Cup 2026™
          </p>
        </div>
      )}

      {/* Le wrapper de scale lui-même */}
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
            width: `${DESIGN_WIDTH}px`,
            transformOrigin: "top left",
            transform: `scale(${scale})`,
            position: "absolute",
            top: 0,
            left: "50%",
            marginLeft: `${(-DESIGN_WIDTH * scale) / 2}px`,
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
