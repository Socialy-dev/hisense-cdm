"use client";

import { useEffect } from "react";
import type {
  AnchorHTMLAttributes,
  MouseEvent,
  ReactNode,
} from "react";

type ScrollLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick"
> & {
  targetId: string;
  children: ReactNode;
  offset?: number;
};

function scrollToTarget(targetId: string, offset = 0) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const targetTop = window.scrollY + target.getBoundingClientRect().top - offset;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
}

export function ScrollLink({
  targetId,
  offset = 0,
  children,
  ...props
}: ScrollLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToTarget(targetId, offset);
    window.history.pushState(null, "", `#${targetId}`);
  };

  return (
    <a href={`#${targetId}`} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

export function ScrollHashHandler() {
  useEffect(() => {
    if (!window.location.hash) return;
    const targetId = decodeURIComponent(window.location.hash.slice(1));

    const delays = [0, 100, 350, 900];
    const timers = delays.map((delay) =>
      window.setTimeout(() => scrollToTarget(targetId), delay),
    );

    return () => timers.forEach(window.clearTimeout);
  }, []);

  return null;
}
