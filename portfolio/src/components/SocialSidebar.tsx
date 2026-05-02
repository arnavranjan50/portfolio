import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/arnavranjan50",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arnav-ranjan-972348207/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/arnavranjan50",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/arnav_ranjan18/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

export default function SocialSidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isGroupHovered, setIsGroupHovered] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!sidebarRef.current) return;
    const icons = sidebarRef.current.querySelectorAll(".social-icon");

    gsap.fromTo(
      icons,
      { x: isMobile ? 0 : -30, y: isMobile ? 30 : 0, opacity: 0 },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.5,
      }
    );

    if (!isMobile) {
      const line = sidebarRef.current.querySelector(".social-line");
      if (line) {
        gsap.fromTo(line, { scaleY: 0 }, {
          scaleY: 1, duration: 0.8, ease: "power3.inOut", delay: 1.2,
        });
      }
    }
  }, [isMobile]);

  // When any icon is hovered, glow the entire sidebar group
  const handleGroupEnter = () => setIsGroupHovered(true);
  const handleGroupLeave = () => setIsGroupHovered(false);

  return (
    <div
      ref={sidebarRef}
      className={isMobile ? "social-sidebar-mobile" : ""}
      onMouseEnter={handleGroupEnter}
      onMouseLeave={handleGroupLeave}
      style={{
        position: "fixed",
        left: isMobile ? "0" : "20px",
        bottom: 0,
        right: isMobile ? "0" : "auto",
        zIndex: 900,
        display: "flex",
        flexDirection: isMobile ? "row" : "column",
        alignItems: "center",
        justifyContent: isMobile ? "center" : "flex-start",
        gap: "0px",
        padding: isMobile ? "10px 16px" : "12px 8px",
        borderRadius: isMobile ? "0" : "24px",
        background: isMobile
          ? "rgba(5, 5, 8, 0.9)"
          : isGroupHovered
            ? "rgba(0, 240, 255, 0.04)"
            : "transparent",
        boxShadow: !isMobile && isGroupHovered
          ? "0 0 30px rgba(0, 240, 255, 0.15), 0 0 60px rgba(0, 240, 255, 0.05), inset 0 0 20px rgba(0, 240, 255, 0.03)"
          : "none",
        border: isMobile
          ? "none"
          : isGroupHovered
            ? "1px solid rgba(0, 240, 255, 0.15)"
            : "1px solid transparent",
        borderTop: isMobile ? "1px solid var(--iaf-border)" : "none",
        backdropFilter: isMobile ? "blur(12px)" : "none",
        WebkitBackdropFilter: isMobile ? "blur(12px)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          data-cursor-label={social.label}
          title={social.label}
          style={{
            color: isGroupHovered ? "#00f0ff" : "rgba(255, 255, 255, 0.4)",
            textDecoration: "none",
            padding: isMobile ? "10px 16px" : "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            opacity: 0,
            pointerEvents: "auto",
            filter: isGroupHovered
              ? "drop-shadow(0 0 6px rgba(0, 240, 255, 0.5))"
              : "none",
            transform: isGroupHovered ? "scale(1.15)" : "scale(1)",
          }}
        >
          {social.icon}
        </a>
      ))}

      {/* Vertical line — hidden on mobile */}
      {!isMobile && (
        <div
          className="social-line"
          style={{
            width: "1px",
            height: "90px",
            background: isGroupHovered
              ? "linear-gradient(to bottom, rgba(0, 240, 255, 0.7), transparent)"
              : "linear-gradient(to bottom, rgba(0, 240, 255, 0.4), transparent)",
            marginTop: "12px",
            transformOrigin: "top",
            transition: "background 0.4s ease",
          }}
        />
      )}
    </div>
  );
}
