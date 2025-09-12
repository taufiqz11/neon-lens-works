import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "./ui/button";

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Set initial states
    gsap.set([headlineRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 50,
      filter: "blur(10px)"
    });

    gsap.set(splineRef.current, {
      opacity: 0,
      x: 40
    });

    // Animate in sequence
    tl.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power2.out",
      stagger: 0.1
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3")
    .to(splineRef.current, {
      opacity: 1,
      x: 0,
      duration: 1.2,
      ease: "power2.out"
    }, "-=0.8");

    // Floating orbs animation
    orbsRef.current.forEach((orb, index) => {
      if (orb) {
        gsap.to(orb, {
          y: -20,
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.2
        });
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Spline 3D Background */}
      <div 
        ref={splineRef}
        className="absolute inset-0 w-full h-full"
      >
        <iframe 
          src='https://my.spline.design/celestialflowabstractdigitalform-IgXgFnj3j2nOIoKRxrF2vmGV/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="pointer-events-none"
        />
      </div>

      {/* Floating Neon Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => el && (orbsRef.current[i] = el)}
            className="absolute w-2 h-2 rounded-full neon-glow animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              background: i % 2 === 0 ? 'hsl(var(--neon-blue))' : 'hsl(var(--neon-cyan))',
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 
          ref={headlineRef}
          className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 text-glow"
        >
          Hi, I'm{" "}
          <span className="font-medium bg-gradient-to-r from-neon-blue to-neon-cyan bg-clip-text text-transparent">
            Shaik Abdul Taufiq
          </span>
          <br />
          Photo Editing & Retouching
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl font-light text-muted-foreground mb-8 max-w-3xl mx-auto"
        >
          HDR Bracketing • Single-Exposure Retouch • Flambient • Virtual Staging
        </p>
        
        <div ref={ctaRef}>
          <Button variant="hero" size="lg" className="text-lg px-8 py-4">
            Hire Me
          </Button>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
    </section>
  );
};

export default Hero;