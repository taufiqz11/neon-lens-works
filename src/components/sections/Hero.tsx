import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import FloatingOrbs from '@/components/FloatingOrbs';
const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const tl = gsap.timeline({
      delay: 0.5
    });

    // Set initial states
    gsap.set([headlineRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)'
    });

    // Animate elements in sequence
    tl.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: "power2.out"
    }).to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4").to(ctaRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3");
    return () => {
      tl.kill();
    };
  }, []);
  const handleCTAClick = () => {
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FloatingOrbs />
      
      <div ref={heroRef} className="container mx-auto px-6 flex items-center justify-center relative z-10">
        {/* Centered Content */}
        <div className="text-center space-y-8 max-w-4xl">
          <div ref={headlineRef} className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-tight">
              Hi, I'm{' '}
              <span className="text-gradient font-semibold">
                Shaik Abdul Taufiq
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground-secondary">Real Estate Photo Editor</h2>
          </div>

          <div ref={subtitleRef} className="space-y-4">
            <p className="text-lg md:text-xl text-foreground-muted leading-relaxed max-w-3xl mx-auto">
              HDR Bracketing • Single-Exposure Retouch • Flambient • Virtual Staging
            </p>
            <p className="text-base md:text-lg text-foreground-muted leading-relaxed max-w-2xl mx-auto">
              Delivering natural, listing-ready edits with consistent color science and lifelike lighting—optimized for MLS, Airbnb, and luxury portfolios.
            </p>
          </div>

          <div ref={ctaRef}>
            <Button variant="hero" size="hero" onClick={handleCTAClick} className="group">
              Hire Me
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-normal">
                →
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-glow opacity-10 animate-pulse" />
    </section>;
};
export default Hero;