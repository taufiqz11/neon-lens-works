import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  const services = [
    "HDR Bracketing",
    "Single Exposure",
    "Flambient",
    "Virtual Staging",
    "24h Turnaround",
    "Quality Control"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      });

      // Set initial states
      gsap.set([imageRef.current, contentRef.current], {
        opacity: 0,
        y: 40,
        filter: "blur(10px)"
      });

      gsap.set(badgesRef.current?.children || [], {
        opacity: 0,
        y: 20,
        scale: 0.9
      });

      // Animate in
      tl.to(imageRef.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power2.out"
      })
      .to(contentRef.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      .to(badgesRef.current?.children || [], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.2");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative w-80 h-80 mx-auto glass-card rounded-full overflow-hidden group">
              <img
                src="https://github.com/taufiqz11/my-pro/blob/df958408c9d59dbf5c86e14d8fe652ad381276d8/pp.jpg"
                alt="Shaik Abdul Taufiq - Professional Photo Editor"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue/20 to-neon-cyan/20 blur-2xl -z-10 scale-110" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-medium mb-6 text-glow">
                About Me
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I deliver natural, listing-ready edits with consistent color science and lifelike lighting—optimized for MLS, Airbnb, and luxury portfolios. With years of experience in architectural photography enhancement, I ensure every image tells a compelling story while maintaining photographic integrity.
              </p>
            </div>

            {/* Service Badges */}
            <div ref={badgesRef} className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {services.map((service, index) => (
                <div
                  key={service}
                  className="glass-card px-4 py-3 rounded-xl text-center group hover:scale-105 transition-all duration-300"
                >
                  <span className="text-sm font-medium text-glass-foreground group-hover:text-neon-blue transition-colors">
                    {service}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="text-2xl font-medium text-neon-blue">500+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-medium text-neon-cyan">24h</div>
                <div className="text-sm text-muted-foreground">Turnaround</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-medium text-primary-glow">99%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;