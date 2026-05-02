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

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const greetRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLDivElement>(null);
  const lastNameRef = useRef<HTMLDivElement>(null);
  const roleLabelRef = useRef<HTMLDivElement>(null);
  const roleWord1Ref = useRef<HTMLDivElement>(null);
  const roleWord2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const coordRef = useRef<HTMLDivElement>(null);
  const reportingRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // LEFT — greeting
      if (greetRef.current) {
        gsap.fromTo(greetRef.current,
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
        );
      }

      // LEFT — first name chars
      if (firstNameRef.current) {
        const chars = firstNameRef.current.querySelectorAll(".char");
        gsap.set(chars, { y: 80, opacity: 0, rotateX: -90 });
        gsap.to(chars, {
          y: 0, opacity: 1, rotateX: 0,
          duration: 1.2, stagger: 0.05, ease: "power4.out", delay: 0.5,
        });
      }

      // LEFT — last name chars
      if (lastNameRef.current) {
        const chars = lastNameRef.current.querySelectorAll(".char");
        gsap.set(chars, { y: 80, opacity: 0, rotateX: -90 });
        gsap.to(chars, {
          y: 0, opacity: 1, rotateX: 0,
          duration: 1.2, stagger: 0.05, ease: "power4.out", delay: 0.8,
        });
      }

      if (reportingRef.current) {
        gsap.fromTo(reportingRef.current,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.1 }
        );
      }

      // RIGHT — role label
      if (roleLabelRef.current) {
        gsap.fromTo(roleLabelRef.current,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.0 }
        );
      }

      // RIGHT — role word 1 (ghost)
      if (roleWord1Ref.current) {
        gsap.fromTo(roleWord1Ref.current,
          { x: 80, opacity: 0, skewX: -8 },
          { x: 0, opacity: 1, skewX: 0, duration: 1.2, ease: "power4.out", delay: 1.2 }
        );
      }

      // RIGHT — role word 2 (solid)
      if (roleWord2Ref.current) {
        gsap.fromTo(roleWord2Ref.current,
          { x: 100, opacity: 0, skewX: -8 },
          { x: 0, opacity: 1, skewX: 0, duration: 1.2, ease: "power4.out", delay: 1.4 }
        );
      }

      // Subtitle
      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 2.0 }
        );
      }

      // Coordinates
      if (coordRef.current) {
        gsap.fromTo(coordRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, delay: 2.2 }
        );
      }

      // Glow pulse — name (saffron)
      const nameChars = containerRef.current?.querySelectorAll(".name-char");
      if (nameChars) {
        gsap.to(nameChars, {
          textShadow: "0 0 25px rgba(255, 153, 51, 0.4), 0 0 50px rgba(255, 153, 51, 0.15)",
          duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2.5,
        });
      }

      // Glow pulse — role (cyan)
      const roleEls = containerRef.current?.querySelectorAll(".role-glow");
      if (roleEls) {
        gsap.to(roleEls, {
          textShadow: "0 0 25px rgba(0, 240, 255, 0.35), 0 0 50px rgba(0, 240, 255, 0.1)",
          duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 3,
        });
      }

      // Scroll indicator
      if (scrollRef.current) {
        gsap.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 1, delay: 3 });
        gsap.to(scrollRef.current, {
          y: 8, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 3,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const renderChars = (text: string, cls = "char") =>
    text.split("").map((char, i) => (
      <span key={i} className={`${cls} char`} style={{ display: "inline-block", willChange: "transform, opacity" }}>
        {char}
      </span>
    ));

  return (
    <section
      ref={containerRef}
      className="hero-section"
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: isMobile ? "flex-start" : "center",
        justifyContent: "center",
        overflow: "hidden",
        flexDirection: isMobile ? "column" : "row",
        paddingTop: isMobile ? "25vh" : 0,
      }}
    >
      {/* HUD brackets */}
      <div className="hud-bracket hud-bracket--tl" />
      <div className="hud-bracket hud-bracket--tr" />
      <div className="hud-bracket hud-bracket--bl" />
      <div className="hud-bracket hud-bracket--br" />

      {/* Scanline */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
      }} />

      {/* ===== LEFT — Name ===== */}
      <div className="hero-left" style={{
        position: isMobile ? "relative" : "absolute",
        left: isMobile ? "auto" : "5vw",
        top: isMobile ? "auto" : "50%",
        transform: isMobile ? "none" : "translateY(-50%)",
        zIndex: 10, pointerEvents: "none",
        textAlign: isMobile ? "center" : "left",
        width: isMobile ? "100%" : "auto",
        padding: isMobile ? "0 5vw" : 0,
      }}>
        <div ref={greetRef} style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: "clamp(0.85rem, 1.4vw, 1.1rem)",
          fontStyle: "italic", color: "var(--iaf-saffron)", letterSpacing: "0.15em",
          marginBottom: "10px", opacity: 0, fontWeight: 500,
        }}>
          This is
        </div>

        <div ref={firstNameRef} style={{
          fontFamily: "'Orbitron', sans-serif", fontSize: isMobile ? "clamp(2rem, 10vw, 3rem)" : "clamp(2.2rem, 5.5vw, 5rem)",
          fontWeight: 700, color: "#fff", letterSpacing: "0.1em", lineHeight: 0.95,
          perspective: "1000px", textShadow: "0 0 15px rgba(255, 153, 51, 0.15)",
        }}>
          {renderChars("ARNAV", "name-char")}
        </div>

        <div ref={lastNameRef} style={{
          fontFamily: "'Orbitron', sans-serif", fontSize: isMobile ? "clamp(2rem, 10vw, 3rem)" : "clamp(2.2rem, 5.5vw, 5rem)",
          fontWeight: 700, color: "#fff", letterSpacing: "0.1em", lineHeight: 0.95,
          marginTop: "0.1em", perspective: "1000px", textShadow: "0 0 15px rgba(255, 153, 51, 0.15)",
        }}>
          {renderChars("RANJAN", "name-char")}
        </div>

        <div ref={reportingRef} style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: "clamp(0.9rem, 1.5vw, 1.15rem)",
          fontStyle: "italic", color: "var(--iaf-saffron)", letterSpacing: "0.2em",
          marginTop: "14px", opacity: 0, fontWeight: 600,
        }}>
          Reporting
        </div>
      </div>

      {/* ===== RIGHT — Role ===== */}
      <div className="hero-right" style={{
        position: isMobile ? "relative" : "absolute",
        right: isMobile ? "auto" : "5vw",
        top: isMobile ? "auto" : "50%",
        transform: isMobile ? "none" : "translateY(-50%)",
        zIndex: 10, textAlign: isMobile ? "center" : "right",
        pointerEvents: "none",
        width: isMobile ? "100%" : "auto",
        marginTop: isMobile ? "30px" : 0,
      }}>
        <div ref={roleLabelRef} style={{
          fontFamily: "var(--iaf-font)", fontSize: "clamp(0.85rem, 1.4vw, 1.1rem)",
          fontStyle: "italic", color: "var(--iaf-cyan)", letterSpacing: "0.1em",
          marginBottom: "10px", opacity: 0,
        }}>
          An AI-Powered
        </div>

        <div ref={roleWord1Ref} className="role-glow" style={{
          fontFamily: "var(--iaf-font)", fontSize: isMobile ? "clamp(1.8rem, 9vw, 2.8rem)" : "clamp(2.5rem, 6vw, 5.5rem)",
          fontWeight: 800, color: "rgba(255, 255, 255, 0.08)", letterSpacing: "0.08em",
          lineHeight: 0.95, WebkitTextStroke: "1.5px rgba(0, 240, 255, 0.25)",
          textShadow: "0 0 15px rgba(0, 240, 255, 0.08)", opacity: 0,
        }}>
          ENGINEER
        </div>

        <div ref={roleWord2Ref} className="role-glow" style={{
          fontFamily: "var(--iaf-font)", fontSize: isMobile ? "clamp(1.8rem, 9vw, 2.8rem)" : "clamp(2.5rem, 6vw, 5.5rem)",
          fontWeight: 800, color: "var(--iaf-cyan)", letterSpacing: "0.08em",
          lineHeight: 0.95, marginTop: "0.05em",
          textShadow: "0 0 20px rgba(0, 240, 255, 0.25), 0 0 40px rgba(0, 240, 255, 0.08)",
          opacity: 0,
        }}>
          INNOVATOR
        </div>
      </div>

      {/* ===== BOTTOM — Subtitle ===== */}
      <div style={{
        position: "absolute", bottom: isMobile ? "16vh" : "12vh", left: "50%", transform: "translateX(-50%)",
        zIndex: 10, textAlign: "center", pointerEvents: "none", width: "80%", maxWidth: "600px",
      }}>
        <p ref={subtitleRef} style={{
          fontFamily: "var(--iaf-font)", fontSize: "clamp(0.7rem, 1.1vw, 0.9rem)",
          color: "var(--iaf-muted)", letterSpacing: "0.06em", lineHeight: 1.6, opacity: 0,
        }}>
          Building AI-powered solutions that turn data into real-world impact.
        </p>
      </div>

      {/* Tactical coordinates — bottom right */}
      <div ref={coordRef} style={{
        position: "absolute", bottom: "5vh", right: "5vw", zIndex: 10,
        textAlign: "right", pointerEvents: "none", opacity: 0,
        display: isMobile ? "none" : "block",
      }}>
        <div style={{ fontSize: "0.55rem", letterSpacing: "0.15em", color: "var(--iaf-dim)" }}>
          CALLSIGN: PHOENIX-01
        </div>
        <div style={{ fontSize: "0.55rem", letterSpacing: "0.15em", color: "var(--iaf-dim)", marginTop: "2px" }}>
          28.6139° N · 77.2090° E
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} style={{
        position: "absolute", bottom: "3vh", left: "50%", transform: "translateX(-50%)",
        zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
        opacity: 0, pointerEvents: "none",
      }}>
        <span style={{
          fontFamily: "var(--iaf-font)", fontSize: "0.55rem",
          color: "var(--iaf-dim)", letterSpacing: "0.2em", textTransform: "uppercase",
        }}>
          Scroll
        </span>
        <div style={{
          width: "1px", height: "24px",
          background: "linear-gradient(to bottom, rgba(255, 153, 51, 0.4), transparent)",
        }} />
      </div>

      {/* Vignette */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(5, 5, 8, 0.75) 100%)",
      }} />

      {/* Bottom gradient */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "200px",
        background: "linear-gradient(transparent, var(--iaf-bg))", zIndex: 3, pointerEvents: "none",
      }} />
    </section>
  );
}