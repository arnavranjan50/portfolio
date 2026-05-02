import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Model() {
    const ref = useRef();

    useFrame((state) => {
        ref.current.rotation.y = state.mouse.x * Math.PI;
        ref.current.rotation.x = state.mouse.y * Math.PI;
    });

    return (
        <mesh ref={ref}>
            <torusKnotGeometry args={[1, 0.3, 128, 32]} />
            <meshStandardMaterial color="#00f0ff" />
        </mesh>
    );
}

export default function Scene() {
    return (
        <Canvas>
            <ambientLight intensity={1} />
            <directionalLight position={[2, 2, 5]} />
            <Model />
        </Canvas>
    );
}