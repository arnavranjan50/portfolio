import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "LOCATION", value: "Bengaluru, India" },
  { label: "UNIVERSITY", value: "Presidency University" },
  { label: "FOCUS", value: "AI / ML / THREE.JS" },
  { label: "STATUS", value: "ACTIVE" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current?.querySelectorAll(".anim-in");
      if (els) {
        gsap.fromTo(els, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%", toggleActions: "play none none reverse" },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="iaf-section" style={{
      display: "flex", alignItems: "center", justifyContent: "flex-end", paddingLeft: "48vw",
    }}>
      <div className="hud-bracket hud-bracket--tl" />
      <div className="hud-bracket hud-bracket--tr" />
      <div className="hud-bracket hud-bracket--bl" />
      <div className="hud-bracket hud-bracket--br" />

      <div style={{ maxWidth: "520px" }} ref={contentRef}>
        <div className="anim-in" style={{ opacity: 0 }}>
          <div className="section-label">Mission Briefing</div>
          <div className="section-code">SEC-002 // ABOUT</div>
        </div>
        <div className="accent-line anim-in" style={{ opacity: 0 }} />

        <h2 className="anim-in" style={{
          fontFamily: "var(--iaf-font)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
          fontWeight: 700, color: "#fff", lineHeight: 1.2, margin: "0 0 28px", opacity: 0,
        }}>
          Turning bold ideas into <span style={{ color: "var(--iaf-saffron)" }}>intelligent solutions</span>
        </h2>

        <p className="anim-in" style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--iaf-muted)", margin: "0 0 18px", opacity: 0 }}>
          AI & ML student at Presidency University, Bengaluru, focused on building intelligent, data-driven solutions. From predictive systems to real-world applications,
        </p>
        <p className="anim-in" style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--iaf-muted)", margin: "0 0 32px", opacity: 0 }}>
          Beyond building applications, I am passionate about bringing the tech community together.
        </p>

        <div className="anim-in" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "32px", opacity: 0 }}>
          {stats.map((s) => (
            <div key={s.label} style={{
              padding: "12px 16px", background: "rgba(255,153,51,0.03)",
              border: "1px solid var(--iaf-border)", borderRadius: "6px",
            }}>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--iaf-saffron)", marginBottom: "4px", fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontSize: "0.85rem", color: "#fff" }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="anim-in" style={{ display: "flex", flexWrap: "wrap", gap: "8px", opacity: 0 }}>
          {["Machine Learning", "Python", "React", "Three.js", "TensorFlow", "SQL", "TypeScript", "GSAP"].map((s) => (
            <span key={s} className="iaf-tag" data-magnetic>{s}</span>
          ))}
        </div>
      </div>

      <div style={{
        position: "absolute", left: "46vw", top: "12%", bottom: "12%", width: "1px",
        background: "linear-gradient(to bottom, transparent, rgba(255,153,51,0.12) 30%, rgba(255,153,51,0.12) 70%, transparent)",
        pointerEvents: "none",
      }} />
    </section>
  );
}
