import { useEffect, useRef, useState } from 'react';
import GLOBE from 'vanta/dist/vanta.globe.min.js';
import './Vanta.css';

export default function VantaGlobe() {
  const [vanta, setVanta] = useState<any>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vanta) {
      setVanta(GLOBE({
        el: ref.current,
        gyroControls: true,
        size: 0.8,
        color: 0x0d6efd,
        color2: 0xFFFFFF,
        backgroundColor: 0x141414,
      }));
    }

    return () => {
      if (vanta) {
        vanta.destroy();
      }
    }
  }, [vanta]);

  return <div className="vanta" ref={ref} />;
}
