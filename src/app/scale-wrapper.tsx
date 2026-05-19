"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MobileLanding } from "./mobile-landing";

const DESIGN_WIDTH = 1920;
const MOBILE_BREAKPOINT = 768; // < 768px → version mobile native

// useLayoutEffect côté serveur déclencherait un warning : on bascule sur useEffect côté SSR.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Wrapper responsive :
 * - Desktop / tablette (≥768px) : design 1920px auto-scalé pour remplir la largeur
 * - Mobile (<768px) : version single-column mobile-native (même contenu, layout adapté)
 * - Resize fluide en live (ResizeObserver + window resize + orientationchange)
 * - Aucun scroll horizontal jamais
 * - Pas de FOUC : contenu invisible jusqu'à la première mesure
 */
export function ScaleWrapper({ children }: { children: React.ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(0);
  const [vw, setVw] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  useIsoLayoutEffect(() => {
    function recalc() {
      const w = window.innerWidth;
      setVw(w);
      const node = innerRef.current;
      if (w >= MOBILE_BREAKPOINT && node) {
        const s = Math.min(w / DESIGN_WIDTH, 1);
        setScale(s);
        setHeight(node.offsetHeight * s);
      }
      setReady(true);
    }

    recalc();

    window.addEventListener("resize", recalc);
    window.addEventListener("orientationchange", recalc);

    // ResizeObserver pour catcher les reflows internes (fonts, images, lazy-load).
    let ro: ResizeObserver | null = null;
    if (innerRef.current) {
      ro = new ResizeObserver(recalc);
      ro.observe(innerRef.current);
    }

    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(recalc).catch(() => {});
    }

    const fallback = setTimeout(recalc, 1200);

    return () => {
      window.removeEventListener("resize", recalc);
      window.removeEventListener("orientationchange", recalc);
      ro?.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  const isMobile = vw !== null && vw < MOBILE_BREAKPOINT;

  // Tant qu'on n'a pas mesuré côté client, on cache pour éviter le mismatch SSR.
  if (!ready) {
    return (
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          visibility: "hidden",
        }}
      >
        <div
          ref={innerRef}
          style={{ width: DESIGN_WIDTH, position: "absolute" }}
        >
          {children}
        </div>
      </div>
    );
  }

  // Mobile : on rend la version mobile native (même contenu, layout adapté).
  if (isMobile) {
    return <MobileLanding />;
  }

  // Desktop / tablette : design 1920px scalé.
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
          width: `${DESIGN_WIDTH}px`,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
          position: "absolute",
          top: 0,
          left: "50%",
          marginLeft: `${(-DESIGN_WIDTH * scale) / 2}px`,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}
