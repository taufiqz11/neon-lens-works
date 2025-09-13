import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(footerRef.current, {
        opacity: 0,
        y: 60,
        filter: 'blur(10px)'
      });

      gsap.to(footerRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate floating particles
      if (particlesRef.current) {
        const particles = particlesRef.current.children;
        Array.from(particles).forEach((particle, index) => {
          gsap.to(particle, {
            y: -10,
            duration: 2 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: index * 0.2
          });
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (href: string) => {
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer ref={footerRef} className="relative py-16 mt-20">
      {/* Floating particles background */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-4 left-1/4 w-2 h-2 bg-primary opacity-40 rounded-full blur-sm" />
        <div className="absolute top-8 right-1/3 w-3 h-3 bg-neon-bright opacity-30 rounded-full blur-md" />
        <div className="absolute bottom-12 left-1/2 w-2 h-2 bg-neon-dim opacity-50 rounded-full blur-sm" />
        <div className="absolute bottom-6 right-1/4 w-4 h-4 bg-primary-glow opacity-20 rounded-full blur-lg" />
        <div className="absolute top-12 left-3/4 w-2 h-2 bg-neon-glow opacity-35 rounded-full blur-sm" />
      </div>

      <div className="container mx-auto px-6">
        {/* Main footer content */}
        <div className="glass rounded-xl p-8 border border-glass-border/30 relative">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            {/* Logo/Name */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-gradient mb-2">
                Shaik Abdul Taufiq
              </h3>
              <p className="text-foreground-muted text-sm">
                Professional Photo Editing & Retouching
              </p>
            </div>

            <nav className="flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-foreground-secondary hover:text-primary transition-colors duration-normal relative group text-sm"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-normal" />
                </button>
              ))}
            </nav>

            {/* Contact info */}
            <div className="text-center md:text-right">
              <p className="text-foreground-muted text-sm mb-1">
                Get in touch
              </p>
              <a 
                href="mailto:taufiqshaikhfz1@gmail.com"
                className="text-primary hover:text-primary-glow transition-colors duration-normal text-sm"
              >
                taufiqshaikhfz1@gmail.com
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 h-px bg-gradient-to-r from-transparent via-glass-border/30 to-transparent" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-sm text-foreground-muted">
            <p>
              © 2024 Shaik Abdul Taufiq. All rights reserved.
            </p>
            <p>
              Crafted with precision and passion
            </p>
          </div>

          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-glow opacity-5 rounded-xl" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;