import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FloatingOrbs = () => {
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!orbsRef.current) return;

    const orbs = orbsRef.current.children;
    
    Array.from(orbs).forEach((orb, index) => {
      gsap.to(orb, {
        y: -20,
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.8
      });
      
      gsap.to(orb, {
        rotation: 360,
        duration: 20 + index * 5,
        repeat: -1,
        ease: "none"
      });
    });
  }, []);

  return (
    <div ref={orbsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top left orb */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-primary opacity-20 rounded-full blur-xl animate-float" />
      
      {/* Top right orb */}
      <div className="absolute top-40 right-32 w-24 h-24 bg-neon-bright opacity-30 rounded-full blur-lg" />
      
      {/* Bottom left orb */}
      <div className="absolute bottom-32 left-40 w-20 h-20 bg-primary opacity-25 rounded-full blur-md" />
      
      {/* Bottom right orb */}
      <div className="absolute bottom-20 right-20 w-28 h-28 bg-neon-glow opacity-15 rounded-full blur-xl" />
      
      {/* Center floating orb */}
      <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-primary-glow opacity-40 rounded-full blur-sm" />
    </div>
  );
};

export default FloatingOrbs;