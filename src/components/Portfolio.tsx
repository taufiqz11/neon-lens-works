import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { Button } from "./ui/button";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const portfolioItems = [
    {
      id: "hdr",
      title: "HDR Bracketing",
      description: "Merge bracketed exposures for perfect dynamic range",
      tags: ["HDR", "Bracketing", "High Dynamic Range"],
      beforeImage: "/api/placeholder/600/400",
      afterImage: "/api/placeholder/600/400"
    },
    {
      id: "single",
      title: "Single Exposure",
      description: "Retouch, color balance, and perspective corrections",
      tags: ["Single", "Retouch", "Color Correction"],
      beforeImage: "/api/placeholder/600/400", 
      afterImage: "/api/placeholder/600/400"
    },
    {
      id: "flambient",
      title: "Flambient",
      description: "Flash and ambient blending for stunning interiors",
      tags: ["Flambient", "Interior", "Lighting"],
      beforeImage: "/api/placeholder/600/400",
      afterImage: "/api/placeholder/600/400"
    },
    {
      id: "staging",
      title: "Virtual Staging",
      description: "Tasteful, realistic furnishings and decor",
      tags: ["Staging", "Virtual", "Furniture"],
      beforeImage: "/api/placeholder/600/400",
      afterImage: "/api/placeholder/600/400"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(cardsRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.9
      });

      // Create scroll trigger for each card
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.1
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-4 text-glow">
            Portfolio
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the transformation power of professional photo editing across different techniques and styles
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {portfolioItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => el && (cardsRef.current[index] = el)}
              className="glass-card rounded-2xl overflow-hidden group"
            >
              {/* Slider */}
              <div className="relative h-64 md:h-80">
                <BeforeAfterSlider
                  beforeImage={item.beforeImage}
                  afterImage={item.afterImage}
                  beforeLabel="Before"
                  afterLabel="After"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-medium text-glass-foreground group-hover:text-neon-blue transition-colors">
                    {item.title}
                  </h3>
                </div>
                
                <p className="text-muted-foreground mb-4">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-muted/30 text-muted-foreground rounded-full border border-glass-border/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Button variant="ghost" className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-all">
                  View Full Set
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            View Complete Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;