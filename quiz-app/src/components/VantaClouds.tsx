import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import CLOUDS from "vanta/dist/vanta.clouds.min";

export default function VantaClouds({
  children,
}: {
  children?: React.ReactNode;
}) {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        CLOUDS({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0x6750a4,
          midtoneColor: 0xb07bac,
          lowlightColor: 0xdfcdde,
          blurFactor: 0.65,
          speed: 0.1,
          zoom: 1.2,
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      style={{ width: "100%", height: "100vh" }}
      className="flex items-center justify-center"
    >
      {children}
    </div>
  );
}
