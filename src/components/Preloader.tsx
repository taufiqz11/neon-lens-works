import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial setup
    gsap.set([progressRef.current, textRef.current], { opacity: 0 });

    // Animate in
    tl.to(textRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    })
    .to(progressRef.current, {
      opacity: 1,
      duration: 0.3
    }, "-=0.2")
    .to(progressRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.out",
      onComplete: () => {
        // Exit animation
        gsap.to(preloaderRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            onComplete();
          }
        });
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="text-center">
        <div 
          ref={textRef}
          className="mb-8 text-2xl font-light tracking-widest text-glow"
        >
          LOADING
        </div>
        <div className="w-64 h-0.5 bg-muted rounded-full overflow-hidden">
          <div 
            ref={progressRef}
            className="h-full w-0 bg-gradient-to-r from-neon-blue to-neon-cyan neon-glow rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;