import { useEffect, useState } from "react";
import Lenis from "lenis";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import MagneticCursor from "./components/MagneticCursor";
import StartupLoader from "./components/StartupLoader";
import Navbar from "./components/Navbar";
import SocialSidebar from "./components/SocialSidebar";
import PersistentScene from "./components/PersistentScene";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  return (
    <>
      {loading && <StartupLoader onComplete={() => setLoading(false)} />}
      {!loading && (
        <>
          <MagneticCursor />
          <Navbar />
          <SocialSidebar />
          <PersistentScene />
          <main style={{ position: "relative", zIndex: 2 }}>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Education />
            <Contact />
          </main>
        </>
      )}
    </>
  );
}

export default App;