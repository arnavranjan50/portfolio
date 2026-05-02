import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    name: "AI / ML",
    skills: [
      { name: "Python", level: 90 },
      { name: "TensorFlow", level: 80 },
      { name: "Machine Learning", level: 85 },
      { name: "Data Analysis", level: 75 },
    ],
  },
  {
    name: "FRONTEND",
    skills: [
      { name: "React", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Three.js", level: 70 },
      { name: "GSAP", level: 75 },
    ],
  },
  {
    name: "BACKEND / DB",
    skills: [
      { name: "SQL", level: 85 },
      { name: "Node.js", level: 70 },
      { name: "Flask", level: 65 },
      { name: "MongoDB", level: 60 },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current?.querySelectorAll(".anim-in");
      if (els) {
        gsap.fromTo(els, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%", toggleActions: "play none none reverse" },
        });
      }

      // Animate bars
      const bars = sectionRef.current?.querySelectorAll(".skill-fill");
      if (bars) {
        bars.forEach((bar) => {
          const el = bar as HTMLElement;
          const w = el.dataset.level || "0";
          gsap.fromTo(el, { width: "0%" }, {
            width: `${w}%`, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 55%", toggleActions: "play none none reverse" },
          });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="iaf-section" style={{ paddingTop: "120px" }}>
      <div className="hud-bracket hud-bracket--tl" />
      <div className="hud-bracket hud-bracket--tr" />
      <div className="hud-bracket hud-bracket--bl" />
      <div className="hud-bracket hud-bracket--br" />

      <div className="anim-in" style={{ opacity: 0, marginBottom: "48px" }}>
        <div className="section-label">Arsenal</div>
        <div className="section-code">SEC-004 // SKILLS</div>
        <div className="accent-line" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
        {categories.map((cat) => (
          <div key={cat.name} className="anim-in glass-panel" style={{ padding: "28px", opacity: 0 }}>
            <div style={{
              fontSize: "0.65rem", letterSpacing: "0.3em", color: "var(--iaf-saffron)",
              fontWeight: 600, marginBottom: "20px",
            }}>
              {cat.name}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {cat.skills.map((skill) => (
                <div key={skill.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "0.85rem", color: "#fff", letterSpacing: "0.03em" }}>{skill.name}</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--iaf-saffron)", fontWeight: 600 }}>{skill.level}%</span>
                  </div>
                  <div style={{
                    width: "100%", height: "4px", background: "rgba(255,255,255,0.06)",
                    borderRadius: "2px", overflow: "hidden",
                  }}>
                    <div
                      className="skill-fill"
                      data-level={skill.level}
                      style={{
                        height: "100%", width: "0%", borderRadius: "2px",
                        background: "linear-gradient(90deg, var(--iaf-saffron), var(--iaf-cyan))",
                        boxShadow: "0 0 8px rgba(255, 153, 51, 0.3)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
