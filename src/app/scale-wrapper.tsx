"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const DESIGN_WIDTH = 1920;

// useLayoutEffect côté serveur déclencherait un warning : on bascule sur useEffect côté SSR.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Wrapper qui rend EXACTEMENT la même landing 1920px sur TOUS les viewports :
 * - Auto-scale fluide : scale = min(viewport / 1920, 1)
 * - Desktop, tablette, mobile → même rendu, juste à des tailles différentes
 * - Resize fluide en live (ResizeObserver + window resize)
 * - Aucun scroll horizontal jamais
 * - Pas de FOUC : contenu invisible jusqu'à la première mesure
 * - Zoom utilisateur autorisé (viewport meta) pour lire les détails sur mobile
 */
export function ScaleWrapper({ children }: { children: React.ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(0);
  const [ready, setReady] = useState(false);

  // Mesure synchrone avant peinture pour éviter le flash entre SSR (scale=1) et calcul.
  useIsoLayoutEffect(() => {
    const node = innerRef.current;
    if (!node) return;

    function recalc() {
      const w = window.innerWidth;
      const s = Math.min(w / DESIGN_WIDTH, 1);
      const intrinsicH = node!.offsetHeight;
      setScale(s);
      setHeight(intrinsicH * s);
      setReady(true);
    }

    // Mesure initiale synchrone (avant peinture).
    recalc();

    // Resize viewport.
    window.addEventListener("resize", recalc);
    // Rotation device mobile.
    window.addEventListener("orientationchange", recalc);

    // ResizeObserver pour catcher les reflows internes (polices, images, lazy-load).
    const ro = new ResizeObserver(recalc);
    ro.observe(node);

    // document.fonts.ready : remesure une fois les fonts custom appliquées.
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(recalc).catch(() => {});
    }

    // Filet de sécurité au cas où des images chargent tard.
    const fallback = setTimeout(recalc, 1200);

    return () => {
      window.removeEventListener("resize", recalc);
      window.removeEventListener("orientationchange", recalc);
      ro.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: height ? `${height}px` : "auto",
        overflow: "hidden",
        position: "relative",
        // Tant que la première mesure n'est pas faite, on cache pour éviter le FOUC
        // (SSR rendrait la page à 1920px non scalée → flash visuel).
        visibility: ready ? "visible" : "hidden",
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
