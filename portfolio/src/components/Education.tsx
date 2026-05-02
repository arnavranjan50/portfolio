import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const entries = [
  {
    year: "2024 — Present",
    code: "TRN-003",
    institution: "Presidency University, Bengaluru",
    degree: "B.Tech — Computer Science & Engineering",
    desc: "Specializing in AI/ML, leading hackathon committees, and building intelligent systems.",
  },
  {
    year: "2022 — 2024",
    code: "TRN-002",
    institution: "Kendriya Vidyalaya, Jalahalli East",
    degree: "Senior Secondary (Class XI–XII)",
    desc: "Completed higher secondary education with focus on Science and Mathematics.",
  },
  {
    year: "2019 — 2022",
    code: "TRN-001",
    institution: "Kendriya Vidyalaya, AFS Ojhar",
    degree: "Secondary Education (Class VIII–X)",
    desc: "Built strong academic foundations in an Air Force Station environment.",
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current?.querySelectorAll(".anim-in");
      if (els) {
        gsap.fromTo(els, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%", toggleActions: "play none none reverse" },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="education" className="iaf-section" style={{ paddingTop: "120px" }}>
      <div className="hud-bracket hud-bracket--tl" />
      <div className="hud-bracket hud-bracket--tr" />
      <div className="hud-bracket hud-bracket--bl" />
      <div className="hud-bracket hud-bracket--br" />

      <div className="anim-in" style={{ opacity: 0, marginBottom: "48px" }}>
        <div className="section-label">Training Log</div>
        <div className="section-code">SEC-005 // EDUCATION</div>
        <div className="accent-line" />
      </div>

      <div style={{ position: "relative", paddingLeft: "50px", maxWidth: "700px" }}>
        {/* Timeline line */}
        <div className="timeline-line" />

        {entries.map((e, i) => (
          <div key={e.code} className="anim-in" style={{
            position: "relative", marginBottom: i < entries.length - 1 ? "48px" : 0,
            opacity: 0,
          }}>
            {/* Dot */}
            <div className="timeline-dot" style={{ top: "6px" }} />

            {/* Code + Year */}
            <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "8px" }}>
              <span style={{
                fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--iaf-saffron)",
                fontWeight: 600, background: "rgba(255,153,51,0.06)",
                padding: "3px 10px", borderRadius: "999px", border: "1px solid var(--iaf-border)",
              }}>
                {e.code}
              </span>
              <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--iaf-dim)" }}>
                {e.year}
              </span>
            </div>

            {/* Institution */}
            <h3 style={{
              fontFamily: "var(--iaf-font)", fontSize: "1.15rem", fontWeight: 700,
              color: "#fff", marginBottom: "4px",
            }}>
              {e.institution}
            </h3>

            {/* Degree */}
            <div style={{
              fontSize: "0.85rem", color: "var(--iaf-cyan)", letterSpacing: "0.03em",
              marginBottom: "8px",
            }}>
              {e.degree}
            </div>

            {/* Description */}
            <p style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "var(--iaf-muted)" }}>
              {e.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
