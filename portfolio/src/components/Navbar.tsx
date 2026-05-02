import { useEffect, useRef } from "react";
import gsap from "gsap";

const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "SKILLS", href: "#skills" },
  { label: "EDUCATION", href: "#education" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(navRef.current, { y: -60, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2,
    });
  }, []);

  return (
    <nav ref={navRef} style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "18px 40px", fontFamily: "var(--iaf-font)",
      backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      background: "rgba(5, 5, 8, 0.7)",
      borderBottom: "1px solid var(--iaf-border)", opacity: 0,
    }}>
      {/* Logo */}
      <a href="#hero" style={{
        fontSize: "1.2rem", fontWeight: 700, color: "#fff", textDecoration: "none",
        letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: "10px",
      }}>
        <img
          src="/Indian_Air_Force-Logo.wine.svg"
          alt="IAF Logo"
          style={{
            width: "32px", height: "32px", objectFit: "contain",
            filter: "drop-shadow(0 0 6px rgba(255, 153, 51, 0.3))",
          }}
        />
        <span style={{ color: "var(--iaf-saffron)" }}>A.R.N</span>
      </a>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} className="nav-link" style={{
            fontSize: "0.68rem", fontWeight: 500, color: "var(--iaf-muted)",
            textDecoration: "none", letterSpacing: "0.15em",
            transition: "color 0.3s ease, text-shadow 0.3s ease",
          }}>
            {link.label}
          </a>
        ))}

        <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="resume-btn" style={{
          fontSize: "0.68rem", fontWeight: 600, color: "var(--iaf-saffron)",
          textDecoration: "none", letterSpacing: "0.15em", padding: "8px 20px",
          border: "1px solid rgba(255,153,51,0.4)", borderRadius: "4px",
          transition: "all 0.3s ease",
        }}>
          RESUME
        </a>
      </div>
    </nav>
  );
}
