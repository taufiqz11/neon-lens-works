import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([imageRef.current, contentRef.current], {
        opacity: 0,
        y: 60,
        filter: 'blur(10px)'
      });

      gsap.set(badgesRef.current?.children || [], {
        opacity: 0,
        y: 30,
        scale: 0.8
      });

      // Create timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      tl.to(imageRef.current, {
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: "power2.out"
      })
      .to(contentRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
      .to(badgesRef.current?.children || [], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    { name: 'HDR Bracketing', color: 'bg-neon-blue' },
    { name: 'Single Exposure', color: 'bg-primary' },
    { name: 'Flambient', color: 'bg-neon-bright' },
    { name: 'Virtual Staging', color: 'bg-neon-dim' },
    { name: 'Quick Turnaround', color: 'bg-primary-glow' },
    { name: 'Quality Control', color: 'bg-neon-glow' },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-slow" />
              <div className="relative w-80 h-80 mx-auto glass rounded-full overflow-hidden border-2 border-glass-border/30 group-hover:border-primary/50 transition-all duration-normal group-hover:scale-105">
                <img 
                  src="https://github.com/taufiqz11/my-pro/blob/df958408c9d59dbf5c86e14d8fe652ad381276d8/pp.jpg?raw=true"
                  alt="Shaik Abdul Taufiq - Photo Editor"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-light">
                About <span className="text-gradient font-semibold">Me</span>
              </h2>
              <p className="text-lg text-foreground-muted leading-relaxed">
                I deliver natural, listing-ready edits with consistent color science and lifelike lighting—optimized for MLS, Airbnb, and luxury portfolios.
              </p>
              <p className="text-base text-foreground-muted leading-relaxed">
                With years of experience in architectural and real estate photography editing, I specialize in creating images that capture the true essence of spaces while enhancing their visual appeal through advanced techniques.
              </p>
            </div>

            {/* Service Badges */}
            <div ref={badgesRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="glass rounded-lg p-4 text-center hover:glass-strong hover:scale-105 transition-all duration-normal group cursor-pointer"
                >
                  <div className={`w-3 h-3 ${service.color} rounded-full mx-auto mb-2 opacity-60 group-hover:opacity-100 group-hover:shadow-glow-soft transition-all duration-normal`} />
                  <span className="text-sm font-medium text-foreground-secondary group-hover:text-foreground transition-colors duration-normal">
                    {service.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;