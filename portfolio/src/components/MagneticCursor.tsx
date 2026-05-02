import { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";

// Detect touch device
const isTouchDevice = () =>
  typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

export default function MagneticCursor() {
  // Don't render on touch devices
  if (isTouchDevice()) return null;

  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const outerPos = useRef({ x: 0, y: 0 });
  const innerPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const isHovering = useRef(false);
  const [cursorLabel, setCursorLabel] = useState("");

  const animate = useCallback(() => {
    // Outer ring — slow follow (lerp 0.12)
    outerPos.current.x += (mousePos.current.x - outerPos.current.x) * 0.12;
    outerPos.current.y += (mousePos.current.y - outerPos.current.y) * 0.12;

    // Inner dot — faster follow (lerp 0.25)
    innerPos.current.x += (mousePos.current.x - innerPos.current.x) * 0.25;
    innerPos.current.y += (mousePos.current.y - innerPos.current.y) * 0.25;

    if (outerRef.current) {
      outerRef.current.style.transform = `translate(${outerPos.current.x - 22}px, ${outerPos.current.y - 22}px)`;
    }
    if (innerRef.current) {
      innerRef.current.style.transform = `translate(${innerPos.current.x - 4}px, ${innerPos.current.y - 4}px)`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnterLink = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      // Skip elements marked to ignore cursor
      if (target.hasAttribute("data-cursor-ignore") || target.closest("[data-cursor-ignore]")) return;
      isHovering.current = true;
      const label = target.getAttribute("data-cursor-label") || "";
      const isSocial = target.classList.contains("social-icon");
      setCursorLabel(label);

      if (outerRef.current) {
        gsap.to(outerRef.current, {
          width: isSocial ? 70 : 56,
          height: isSocial ? 70 : 56,
          borderColor: "rgba(0, 240, 255, 0.9)",
          boxShadow: isSocial
            ? "0 0 25px rgba(0, 240, 255, 0.5), 0 0 50px rgba(0, 240, 255, 0.2), inset 0 0 15px rgba(0, 240, 255, 0.1)"
            : "0 0 15px rgba(0, 240, 255, 0.4), 0 0 30px rgba(0, 240, 255, 0.15)",
          background: isSocial
            ? "rgba(0, 240, 255, 0.06)"
            : "rgba(0, 240, 255, 0.03)",
          duration: 0.35,
          ease: "power2.out",
        });
      }
      if (innerRef.current) {
        gsap.to(innerRef.current, {
          scale: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
      if (labelRef.current && label) {
        gsap.to(labelRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeaveLink = () => {
      isHovering.current = false;
      setCursorLabel("");

      if (outerRef.current) {
        gsap.to(outerRef.current, {
          width: 44,
          height: 44,
          borderColor: "rgba(0, 240, 255, 0.4)",
          boxShadow: "0 0 8px rgba(0, 240, 255, 0.15)",
          background: "transparent",
          duration: 0.35,
          ease: "power2.out",
        });
      }
      if (innerRef.current) {
        gsap.to(innerRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
      if (labelRef.current) {
        gsap.to(labelRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.2,
          ease: "power2.in",
        });
      }
    };

    const handleMouseDown = () => {
      if (outerRef.current) {
        gsap.to(outerRef.current, { scale: 0.85, duration: 0.15 });
      }
    };

    const handleMouseUp = () => {
      if (outerRef.current) {
        gsap.to(outerRef.current, {
          scale: 1,
          duration: 0.15,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Attach to all interactive elements
    const attachListeners = () => {
      const interactives = document.querySelectorAll(
        "a, button, [data-magnetic], .social-icon, .nav-link, .resume-btn"
      );
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterLink);
        el.removeEventListener("mouseleave", handleMouseLeaveLink);
        el.addEventListener("mouseenter", handleMouseEnterLink);
        el.addEventListener("mouseleave", handleMouseLeaveLink);
      });
    };

    // Small delay for DOM readiness
    const timeout = setTimeout(attachListeners, 200);

    // Re-attach on DOM changes
    const observer = new MutationObserver(() => {
      attachListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    rafId.current = requestAnimationFrame(animate);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  return (
    <>
      {/* Outer ring — glowing */}
      <div
        ref={outerRef}
        className="cursor-outer"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "2px solid rgba(0, 240, 255, 0.4)",
          boxShadow: "0 0 8px rgba(0, 240, 255, 0.15)",
          background: "transparent",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "width 0.3s ease, height 0.3s ease",
        }}
      >
        {/* Cursor label */}
        <div
          ref={labelRef}
          style={{
            position: "absolute",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.5rem",
            fontWeight: 600,
            color: "rgba(0, 240, 255, 0.9)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            opacity: 0,
            transform: "scale(0.8)",
            pointerEvents: "none",
          }}
        >
          {cursorLabel}
        </div>
      </div>

      {/* Inner dot */}
      <div
        ref={innerRef}
        className="cursor-inner"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#00f0ff",
          boxShadow: "0 0 6px rgba(0, 240, 255, 0.6)",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
        }}
      />
    </>
  );
}
