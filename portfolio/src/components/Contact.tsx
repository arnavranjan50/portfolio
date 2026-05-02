import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const socials = [
  { label: "GitHub", href: "https://github.com/arnavranjan50", icon: "GH" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/arnav-ranjan-972348207/", icon: "LI" },
  { label: "X / Twitter", href: "https://x.com/arnavranjan50", icon: "X" },
  { label: "Instagram", href: "https://www.instagram.com/arnav_ranjan18/", icon: "IG" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll(".c-anim");
    const ctx = gsap.context(() => {
      els.forEach((el, i) => {
        gsap.fromTo(el, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSocialEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.borderColor = "#FF9933";
    el.style.color = "#FF9933";
    el.style.boxShadow = "0 0 20px rgba(255,153,51,0.2), 0 0 40px rgba(255,153,51,0.08)";
    el.style.background = "rgba(255,153,51,0.08)";
    el.style.transform = "translateY(-3px)";
  };

  const handleSocialLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.borderColor = "rgba(255,153,51,0.15)";
    el.style.color = "rgba(255,255,255,0.5)";
    el.style.boxShadow = "none";
    el.style.background = "transparent";
    el.style.transform = "translateY(0)";
  };

  return (
    <section ref={sectionRef} id="contact" className="iaf-section" style={{
      paddingTop: "120px", display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      <div className="hud-bracket hud-bracket--tl" />
      <div className="hud-bracket hud-bracket--tr" />
      <div className="hud-bracket hud-bracket--bl" />
      <div className="hud-bracket hud-bracket--br" />

      <div className="c-anim" style={{ opacity: 0, textAlign: "center", marginBottom: "48px" }}>
        <div className="section-label">Establish Comms</div>
        <div className="section-code">SEC-006 // CONTACT</div>
        <div className="accent-line" style={{ margin: "0 auto 28px" }} />
      </div>

      <h2 className="c-anim" style={{
        fontFamily: "var(--iaf-font)", fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
        fontWeight: 700, color: "#fff", textAlign: "center", marginBottom: "12px",
        letterSpacing: "0.02em", opacity: 0,
      }}>
        Ready to <span style={{ color: "var(--iaf-saffron)" }}>collaborate</span>?
      </h2>

      <p className="c-anim" style={{
        fontSize: "0.95rem", color: "var(--iaf-muted)", textAlign: "center",
        maxWidth: "500px", lineHeight: 1.7, marginBottom: "40px", opacity: 0,
      }}>
        Open for opportunities, collaborations, and interesting conversations.
        Drop a message or connect through the channels below.
      </p>

      {/* Email CTA */}
      <a
        href="mailto:arnavranjan50@gmail.com"
        className="c-anim"
        data-magnetic
        style={{
          display: "inline-flex", alignItems: "center", gap: "12px",
          padding: "16px 36px", borderRadius: "6px",
          background: "rgba(255,153,51,0.06)", border: "1px solid #FF9933",
          color: "#FF9933", textDecoration: "none",
          fontFamily: "var(--iaf-font)", fontSize: "0.85rem", fontWeight: 600,
          letterSpacing: "0.15em", transition: "all 0.3s ease", opacity: 0,
          pointerEvents: "auto",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.background = "rgba(255,153,51,0.12)";
          el.style.boxShadow = "0 0 25px rgba(255,153,51,0.2), 0 0 50px rgba(255,153,51,0.08)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.background = "rgba(255,153,51,0.06)";
          el.style.boxShadow = "none";
        }}
      >
        <span style={{ fontSize: "1.1rem" }}>✉</span>
        SEND TRANSMISSION
      </a>

      {/* Social links */}
      <div className="c-anim" style={{
        display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "48px", opacity: 0,
        justifyContent: "center",
      }}>
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            data-cursor-label={s.label}
            title={s.label}
            onMouseEnter={handleSocialEnter}
            onMouseLeave={handleSocialLeave}
            style={{
              width: "52px", height: "52px", borderRadius: "8px",
              border: "1px solid rgba(255,153,51,0.15)", display: "flex",
              alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.5)", textDecoration: "none",
              fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em",
              transition: "all 0.3s ease", pointerEvents: "auto",
            }}
          >
            {s.icon}
          </a>
        ))}
      </div>

      {/* Footer */}
      <div className="c-anim" style={{
        marginTop: "56px", textAlign: "center", opacity: 0,
        paddingBottom: "60px",
      }}>
        <div style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--iaf-dim)" }}>
          FREQ: 121.5 MHz · CHANNEL: OPEN · ENCRYPTION: NONE
        </div>
        <div style={{ fontSize: "0.55rem", letterSpacing: "0.15em", color: "var(--iaf-dim)", marginTop: "4px" }}>
          © 2026 ARNAV RANJAN · ALL SYSTEMS NOMINAL
        </div>
      </div>
    </section>
  );
}
