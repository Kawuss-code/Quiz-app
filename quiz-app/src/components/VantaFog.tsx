import { useEffect, useRef, useState } from "react";
import FOG from "vanta/dist/vanta.fog.min";
import * as THREE from "three";

function VantaFog({ children }: { children?: React.ReactNode }) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      const effect = FOG({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        highlightColor: 0x9c27b0, // jasne refleksy mgły
        midtoneColor: 0x7b1fa2, // średni fiolet
        lowlightColor: 0x4a148c, // ciemny fiolet
        baseColor: 0x1a0033, // tło: nocne niebo
        blurFactor: 0.7,
        speed: 1.0,
        zoom: 1.2,
      });

      setVantaEffect(effect);
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} className="w-full h-screen relative">
      <div className="absolute inset-0 z-10 flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}

export default VantaFog;
