import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const navRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Contact", href: "#contact" }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set([navRef.current], {
        opacity: 0,
        y: 60,
        filter: "blur(10px)"
      });

      // Animate in
      gsap.to([navRef.current], {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });

      // Floating particles animation
      particlesRef.current.forEach((particle, index) => {
        if (particle) {
          gsap.to(particle, {
            y: Math.random() * 40 - 20,
            x: Math.random() * 20 - 10,
            opacity: Math.random() * 0.5 + 0.2,
            duration: 4 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: index * 0.3
          });
        }
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} className="relative py-12 px-6 mt-20">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            ref={(el) => el && (particlesRef.current[i] = el)}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? 'hsl(var(--neon-blue))' : 
                         i % 3 === 1 ? 'hsl(var(--neon-cyan))' : 'hsl(var(--primary-glow))',
              boxShadow: '0 0 10px currentColor'
            }}
          />
        ))}
      </div>

      {/* Glass Bar with Navigation */}
      <div className="relative max-w-4xl mx-auto">
        <div 
          ref={navRef}
          className="glass-card rounded-2xl px-8 py-6 backdrop-blur-glass"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Navigation */}
            <nav className="flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-glass-foreground hover:text-neon-blue transition-colors font-medium relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-blue transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Shaik Abdul Taufiq
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Professional Photo Editing & Retouching
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-32 bg-gradient-to-t from-neon-blue/10 to-transparent blur-3xl -z-10" />
    </footer>
  );
};

export default Footer;