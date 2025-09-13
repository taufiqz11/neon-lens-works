import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial setup
    gsap.set([textRef.current, progressBarRef.current], { opacity: 0, y: 30 });
    
    // Animate in
    tl.to([textRef.current, progressBarRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out"
    })
    // Progress bar animation
    .to(progressBarRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.out",
    })
    // Exit animation
    .to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.inOut"
    })
    .to(progressBarRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut"
    }, "-=0.3")
    .to(preloaderRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = 'none';
        }
        onComplete();
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
      <div className="text-center space-y-8">
        <div 
          ref={textRef}
          className="text-4xl md:text-6xl font-light tracking-wider text-gradient"
        >
          LOADING
        </div>
        
        <div className="w-80 h-0.5 bg-glass-border/30 rounded-full overflow-hidden">
          <div 
            ref={progressBarRef}
            className="h-full bg-gradient-primary w-0 rounded-full glow-soft"
          />
        </div>
      </div>
      
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20 animate-pulse" />
    </div>
  );
};

export default Preloader;