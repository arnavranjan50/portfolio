import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface StartupLoaderProps {
  onComplete: () => void;
}

export default function StartupLoader({ onComplete }: StartupLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [statusLines, setStatusLines] = useState<string[]>([]);
  const progressRef = useRef(0);

  const bootSequence = [
    "INITIALIZING SYSTEM...",
    "LOADING AVIONICS MODULE...",
    "RADAR SYSTEMS — ONLINE",
    "NAVIGATION LINK — ESTABLISHED",
    "HUD OVERLAY — ACTIVE",
    "FLIGHT SYSTEMS — NOMINAL",
    "ALL SYSTEMS OPERATIONAL",
    "WELCOME, PILOT.",
  ];

  useEffect(() => {
    // Animate progress from 0 to 100
    const progressTween = gsap.to(progressRef, {
      current: 100,
      duration: 3.5,
      ease: "power2.inOut",
      onUpdate: () => {
        setProgress(Math.round(progressRef.current));
      },
    });

    // Boot text lines appear sequentially
    bootSequence.forEach((line, i) => {
      const delay = (i / bootSequence.length) * 3.2 + 0.3;
      setTimeout(() => {
        setStatusLines((prev) => [...prev, line]);
      }, delay * 1000);
    });

    // Exit animation after loading completes
    const exitTimer = setTimeout(() => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 1.05,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete,
        });
      }
    }, 4200);

    return () => {
      progressTween.kill();
      clearTimeout(exitTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#050508",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Space Grotesk', monospace",
        overflow: "hidden",
      }}
    >
      {/* Radar grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Radar sweep */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "600px",
          height: "600px",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "1px solid rgba(0, 240, 255, 0.08)",
            position: "relative",
          }}
        >
          {/* Inner circles */}
          <div
            style={{
              position: "absolute",
              inset: "25%",
              borderRadius: "50%",
              border: "1px solid rgba(0, 240, 255, 0.06)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: "45%",
              borderRadius: "50%",
              border: "1px solid rgba(0, 240, 255, 0.04)",
            }}
          />
          {/* Sweeping line */}
          <div
            className="radar-sweep"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "50%",
              height: "2px",
              transformOrigin: "left center",
              background:
                "linear-gradient(90deg, rgba(255, 153, 51, 0.6), transparent)",
            }}
          />
        </div>
      </div>

      {/* Top-left: IAF Badge area */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          left: "40px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* IAF Roundel (saffron-white-green) */}
        <img
          src="/Indian_Air_Force-Logo.wine.svg"
          alt="IAF Logo"
          style={{
            width: "48px",
            height: "48px",
            objectFit: "contain",
            filter: "drop-shadow(0 0 12px rgba(255, 153, 51, 0.4))",
          }}
        />
        <div>
          <div
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              color: "rgba(255, 153, 51, 0.8)",
              fontWeight: 600,
            }}
          >
            INDIAN AIR FORCE
          </div>
          <div
            style={{
              fontSize: "0.55rem",
              letterSpacing: "0.15em",
              color: "rgba(255, 255, 255, 0.3)",
              marginTop: "2px",
            }}
          >
            TOUCH THE SKY WITH GLORY
          </div>
        </div>
      </div>

      {/* Top-right: System status */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          right: "40px",
          textAlign: "right",
        }}
      >
        <div
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            color: "rgba(0, 240, 255, 0.5)",
          }}
        >
          SYS STATUS
        </div>
        <div
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            color: progress < 100 ? "rgba(255, 153, 51, 0.7)" : "rgba(19, 136, 8, 0.9)",
            marginTop: "4px",
            transition: "color 0.3s",
          }}
        >
          {progress < 100 ? "● INITIALIZING" : "● ALL SYSTEMS GO"}
        </div>
      </div>

      {/* Center content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
        }}
      >
        {/* Name */}
        <div>
          <h1
            style={{
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.2em",
              margin: 0,
              lineHeight: 1,
              textShadow: "0 0 30px rgba(255, 153, 51, 0.3)",
            }}
          >
            ARNAV RANJAN
          </h1>
          <div
            style={{
              width: "100%",
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(255, 153, 51, 0.5), transparent)",
              marginTop: "12px",
            }}
          />
        </div>

        {/* Loading pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "50px",
            padding: "12px 32px",
            backdropFilter: "blur(10px)",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.25em",
              color: "rgba(255, 255, 255, 0.6)",
              fontWeight: 500,
            }}
          >
            LOADING
          </span>

          {/* Progress bar */}
          <div
            style={{
              width: "120px",
              height: "3px",
              background: "rgba(255, 255, 255, 0.08)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "linear-gradient(90deg, #FF9933, #00f0ff)",
                borderRadius: "2px",
                transition: "width 0.1s linear",
                boxShadow: "0 0 8px rgba(255, 153, 51, 0.5)",
              }}
            />
          </div>

          <span
            style={{
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "#fff",
              fontVariantNumeric: "tabular-nums",
              minWidth: "38px",
              textAlign: "right",
            }}
          >
            {progress}%
          </span>
        </div>
      </div>

      {/* Boot sequence terminal */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "40px",
          maxWidth: "400px",
        }}
      >
        {statusLines.map((line, i) => (
          <div
            key={i}
            style={{
              fontSize: "0.6rem",
              fontFamily: "'Space Grotesk', monospace",
              letterSpacing: "0.1em",
              color:
                i === statusLines.length - 1
                  ? "rgba(255, 153, 51, 0.9)"
                  : "rgba(0, 240, 255, 0.35)",
              marginBottom: "4px",
              animation: "fadeInLine 0.3s ease-out",
            }}
          >
            <span style={{ color: "rgba(0, 240, 255, 0.2)", marginRight: "8px" }}>
              {">"} 
            </span>
            {line}
            {i === statusLines.length - 1 && (
              <span className="terminal-cursor">▌</span>
            )}
          </div>
        ))}
      </div>

      {/* Bottom-right: Coordinates */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: "40px",
          textAlign: "right",
        }}
      >
        <div
          style={{
            fontSize: "0.55rem",
            letterSpacing: "0.15em",
            color: "rgba(0, 240, 255, 0.3)",
          }}
        >
          LAT 28.6139° N
        </div>
        <div
          style={{
            fontSize: "0.55rem",
            letterSpacing: "0.15em",
            color: "rgba(0, 240, 255, 0.3)",
            marginTop: "2px",
          }}
        >
          LNG 77.2090° E
        </div>
        <div
          style={{
            fontSize: "0.55rem",
            letterSpacing: "0.15em",
            color: "rgba(255, 153, 51, 0.4)",
            marginTop: "6px",
          }}
        >
          NEW DELHI, INDIA
        </div>
      </div>

      {/* Corner HUD brackets */}
      {/* Top-left bracket */}
      <div style={{ position: "absolute", top: "20px", left: "20px", width: "20px", height: "20px", borderTop: "2px solid rgba(255, 153, 51, 0.3)", borderLeft: "2px solid rgba(255, 153, 51, 0.3)" }} />
      {/* Top-right bracket */}
      <div style={{ position: "absolute", top: "20px", right: "20px", width: "20px", height: "20px", borderTop: "2px solid rgba(255, 153, 51, 0.3)", borderRight: "2px solid rgba(255, 153, 51, 0.3)" }} />
      {/* Bottom-left bracket */}
      <div style={{ position: "absolute", bottom: "20px", left: "20px", width: "20px", height: "20px", borderBottom: "2px solid rgba(255, 153, 51, 0.3)", borderLeft: "2px solid rgba(255, 153, 51, 0.3)" }} />
      {/* Bottom-right bracket */}
      <div style={{ position: "absolute", bottom: "20px", right: "20px", width: "20px", height: "20px", borderBottom: "2px solid rgba(255, 153, 51, 0.3)", borderRight: "2px solid rgba(255, 153, 51, 0.3)" }} />
    </div>
  );
}
