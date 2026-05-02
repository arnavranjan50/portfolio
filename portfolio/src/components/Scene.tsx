import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { Environment, ContactShadows, useGLTF, Center } from "@react-three/drei";
import type { Group } from "three";

// Global mouse position (normalized -1 to 1)
const globalMouse = { x: 0, y: 0 };

function Model() {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF("/mig-29_-_fighter_jet_-_free.glb");

  useFrame(() => {
    if (!groupRef.current) return;

    const targetY = globalMouse.x * Math.PI * 0.35;
    const targetX = globalMouse.y * Math.PI * 0.2;

    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.08;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.08;
  });

  return (
    <group ref={groupRef} castShadow>
      <Center>
        <primitive object={scene} scale={0.1} />
      </Center>
    </group>
  );
}

useGLTF.preload("/mig-29_-_fighter_jet_-_free.glb");

export default function Scene() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      globalMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      globalMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [-1, 1.5, 8], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent", width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" castShadow />
      <directionalLight position={[-3, 2, -2]} intensity={0.8} color="#4488ff" />
      <directionalLight position={[0, -3, -5]} intensity={1.2} color="#00f0ff" />
      <ambientLight intensity={0.15} color="#111133" />

      <Environment preset="city" background={false} />
      <Model />

      <ContactShadows
        position={[0, -3.5, 0]}
        opacity={0.5}
        scale={20}
        blur={3}
        far={6}
        color="#00f0ff"
      />
    </Canvas>
  );
}
