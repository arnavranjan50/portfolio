import { useEffect, useRef, useCallback } from "react";
import Scene from "./Scene";

export default function PersistentScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const currentScale = useRef(1);
  const currentOpacity = useRef(1);
  const rafId = useRef(0);

  const animate = useCallback(() => {
    if (!containerRef.current) {
      rafId.current = requestAnimationFrame(animate);
      return;
    }

    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const section = scrollY / vh; // 0=hero, 1=about, 2=projects, etc.

    let targetX = 0, targetY = 0, targetScale = 1, targetOpacity = 1;

    if (section <= 1) {
      // Hero → About: shift left, shrink
      const t = Math.max(0, section - 0.3) / 0.7;
      const e = t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2, 2)/2; // quadratic ease
      targetX = e * -15;       // shift LEFT
      targetY = e * 3;
      targetScale = 1 - e * 0.25;
      targetOpacity = 1;
    } else if (section <= 1.6) {
      // About — fade out
      const t = (section - 1) / 0.6;
      targetX = -15;
      targetY = 3 + t * 4;
      targetScale = 0.75 - t * 0.2;
      targetOpacity = 1 - t;
    } else {
      // Everything after — fully hidden
      targetX = -15;
      targetY = 7;
      targetScale = 0.55;
      targetOpacity = 0;
    }

    // Very smooth lerp (lower = smoother)
    currentX.current += (targetX - currentX.current) * 0.03;
    currentY.current += (targetY - currentY.current) * 0.03;
    currentScale.current += (targetScale - currentScale.current) * 0.03;
    currentOpacity.current += (targetOpacity - currentOpacity.current) * 0.04;

    containerRef.current.style.transform =
      `translate(${currentX.current}vw, ${currentY.current}vh) scale(${currentScale.current})`;
    containerRef.current.style.opacity = `${Math.max(0, currentOpacity.current)}`;

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [animate]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        left: "0",
        top: "0",
        width: "100vw",
        height: "100vh",
        zIndex: 1,
        pointerEvents: "none",
        transformOrigin: "center center",
        willChange: "transform, opacity",
        WebkitMaskImage: "radial-gradient(ellipse 80% 75% at 50% 50%, black 45%, transparent 100%)",
        maskImage: "radial-gradient(ellipse 80% 75% at 50% 50%, black 45%, transparent 100%)",
      }}
    >
      <Scene />
    </div>
  );
}
