import { useEffect, useRef, useState } from 'react';
import NET from 'vanta/dist/vanta.net.min.js';
import './Vanta.css';

export default function VantaNet() {
  const [vanta, setVanta] = useState<any>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vanta) {
      setVanta(NET({
        el: ref.current,
        gyroControls: true,
        color: 0x0d6efd,
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
