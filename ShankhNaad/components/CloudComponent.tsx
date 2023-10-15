import React, { useEffect, useRef } from 'react';
import Image from 'next/image';


const HaloComponent: React.FC = () => {
  const elementRef = useRef(null);
  let vantaEffect;

  useEffect(() => {
    if (elementRef.current) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.157.0/three.min.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const vantaScript = document.createElement('script');
        vantaScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.21/vanta.halo.min.js';
        vantaScript.async = true;

        vantaScript.onload = () => {
          // Initialize VANTA.HALO and store the effect instance
          vantaEffect = VANTA.HALO({
            el: elementRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: true,
            minHeight: 200.00,
            minWidth: 200.00,
            amplitudeFactor: 3, // Updated size to 2.3
            xOffset: 0.02,
            yOffset: 0.00, // Updated x-offset to 0.12
            size: 2.7,
          });
        };

        document.body.appendChild(vantaScript);
      };
    }

    // Cleanup the effect when the component is unmounted
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }

      const scripts = document.querySelectorAll('script[src^="https://cdnjs.cloudflare.com"]');
      scripts.forEach((script) => script.remove());
    };
  }, []);

  return (
    <div ref={elementRef} className="align-center justify-between" style={{ width: '100%', height: '100vh', textAlign: 'center'}}>
      <div className="flex justify-center items-center h-screen">
          <Image
            src="/../public/logo.png"
            alt=""
            className="object-contain opacity-100 group-hover:scale-110"
            width={600}
            height={600}
            draggable="false"
            />
        </div>
    </div>
  );
};

export default HaloComponent;
