import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    code: "OPS-001",
    name: "Animal Detection System using YOLOv11n with CLAHE",
    desc: "Deep learning-based image classification system using CNNs for real-time object detection and analysis.",
    tech: ["Python", "TensorFlow", "OpenCV"],
    status: "DEPLOYED",
  },
  {
    code: "OPS-002",
    name: "Campus Hustlers",
    desc: "An app to help students get part time jobs on campus.",
    tech: ["HTML", "CSS", "JS", "SQL"],
    status: "IN PROGRESS",
  },
  {
    code: "OPS-003",
    name: "AI Based Mental Health Stress Detection using Typing exercises",
    desc: "A ML model trained to detect stress based on typing patterns using Reinforcement Learning.",
    tech: ["Python", "NLTK", "Flask"],
    status: "ACTIVE",
  },
  {
    code: "OPS-004",
    name: "AI based Music Player with AI chat assistant and mood detection",
    desc: "An music player which can detect your mood and play songs accordingly with an added chat assistant.",
    tech: ["React", "PyTorch", "Flask"],
    status: "IN PROGRESS",
  },
];

function statusColor(s: string) {
  if (s === "DEPLOYED") return "#138808";
  if (s === "ACTIVE") return "#00f0ff";
  return "#FF9933";
}

function ProjectCard({ p, index }: { p: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(cardRef.current, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: index * 0.12,
      scrollTrigger: { trigger: cardRef.current, start: "top 85%", toggleActions: "play none none reverse" },
    });
  }, [index]);

  const onEnter = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.borderColor = "rgba(255, 153, 51, 0.5)";
    el.style.transform = "translateY(-6px) scale(1.02)";
    el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.5), 0 0 30px rgba(255,153,51,0.12)";
    const t = el.querySelector(".proj-title") as HTMLElement;
    if (t) t.style.color = "#FF9933";
  };

  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.borderColor = "rgba(255,153,51,0.15)";
    el.style.transform = "translateY(0) scale(1)";
    el.style.boxShadow = "none";
    const t = el.querySelector(".proj-title") as HTMLElement;
    if (t) t.style.color = "#fff";
  };

  const sc = statusColor(p.status);

  return (
    <div
      ref={cardRef}
      data-cursor-label="View Mission"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        background: "rgba(10, 14, 26, 0.7)",
        border: "1px solid rgba(255,153,51,0.15)",
        borderRadius: "8px",
        padding: "28px",
        position: "relative",
        overflow: "hidden",
        opacity: 0,
        cursor: "none",
        transition: "transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <span style={{
          fontFamily: "'Orbitron', sans-serif", fontSize: "0.6rem",
          letterSpacing: "0.2em", color: "#FF9933", fontWeight: 600,
        }}>
          {p.code}
        </span>
        <span style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: "0.65rem",
          letterSpacing: "0.12em", color: sc, fontWeight: 600,
          padding: "3px 12px", border: `1px solid ${sc}33`,
          borderRadius: "999px", background: `${sc}0a`,
        }}>
          ● {p.status}
        </span>
      </div>

      <h3 className="proj-title" style={{
        fontFamily: "'Rajdhani', sans-serif", fontSize: "1.25rem", fontWeight: 700,
        color: "#fff", marginBottom: "10px",
        letterSpacing: "0.02em", lineHeight: 1.3, transition: "color 0.3s ease",
      }}>
        {p.name}
      </h3>

      <p style={{
        fontFamily: "var(--iaf-font)", fontSize: "0.85rem", lineHeight: 1.7,
        color: "var(--iaf-muted)", marginBottom: "20px",
      }}>
        {p.desc}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {p.tech.map((t) => (
          <span key={t} style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: "0.55rem",
            padding: "4px 12px", borderRadius: "999px",
            border: "1px solid rgba(0,240,255,0.2)", color: "rgba(0,240,255,0.7)",
            letterSpacing: "0.1em", fontWeight: 500,
          }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(headerRef.current, { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: headerRef.current, start: "top 80%", toggleActions: "play none none reverse" },
    });
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="iaf-section" style={{ paddingTop: "120px" }}>
      <div className="hud-bracket hud-bracket--tl" />
      <div className="hud-bracket hud-bracket--tr" />
      <div className="hud-bracket hud-bracket--bl" />
      <div className="hud-bracket hud-bracket--br" />

      <div ref={headerRef} style={{ opacity: 0, marginBottom: "48px" }}>
        <div style={{
          fontFamily: "'Orbitron', sans-serif", fontSize: "0.75rem",
          letterSpacing: "0.35em", color: "#FF9933", fontWeight: 700, marginBottom: "6px",
        }}>
          MISSION LOG
        </div>
        <div className="section-code">SEC-003 // PROJECTS</div>
        <div className="accent-line" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
        {projects.map((p, i) => (
          <ProjectCard key={p.code} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}
