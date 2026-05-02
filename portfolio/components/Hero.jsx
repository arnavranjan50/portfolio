import Scene from "./Scene";

export default function Hero() {
    return (
        <div className="h-screen relative flex items-center justify-center">
            <h1 className="absolute text-6xl font-bold z-10">
                ARNAV
            </h1>

            <div className="w-full h-full">
                <Scene />
            </div>
        </div>
    );
}