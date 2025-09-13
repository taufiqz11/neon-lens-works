import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import PortfolioGallery from '@/components/PortfolioGallery';
import PortfolioModal from '@/components/PortfolioModal';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children || [];
      
      gsap.set(cards, {
        opacity: 0,
        y: 80,
        scale: 0.9
      });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const portfolioSections = [
    {
      id: 'hdr',
      title: 'HDR Bracketing',
      description: 'Merge bracketed exposures for perfect balance',
      tags: ['HDR', 'Multiple Exposures'],
      images: [
        {
          beforeImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/57f12aa3b49a34b74926278d920c5e23c1d6df96/DJI_0428.jpg',
          afterImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/57f12aa3b49a34b74926278d920c5e23c1d6df96/DJI_0428_hdr.jpg',
        },
        {
          beforeImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/e0470a463da94ec991a6f2d84de223ade47ef8ca/DSC05295.jpg',
          afterImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/e0470a463da94ec991a6f2d84de223ade47ef8ca/DSC05295_hdr.jpg',
        },
        {
          beforeImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/e1e0c5351b4914166ed2e38f5ff701bc53fff735/IMG_8147.jpg',
          afterImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/e1e0c5351b4914166ed2e38f5ff701bc53fff735/IMG_8147_hdr.jpg',
        },
      ],
    },
    {
      id: 'single',
      title: 'Single Exposure',
      description: 'Color balance, perspective fixes, and enhancement',
      tags: ['Retouch', 'Color Correction'],
      images: [
        {
          beforeImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/328c8337e91732ec933fc2645f9f6b9a04c14c71/Debbie%20-%20Revere-2938.jpg',
          afterImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/328c8337e91732ec933fc2645f9f6b9a04c14c71/Debbie%20-%20Revere-2938_hdr.jpg',
        },
        {
          beforeImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/9fd1ecd626fe873a9489c538fe3ea8b37f6886c3/Debbie%20-%20Revere-2958.jpg',
          afterImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/9fd1ecd626fe873a9489c538fe3ea8b37f6886c3/Debbie%20-%20Revere-2958_hdr.jpg',
        },
        {
          beforeImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/fef77934024e1fe7bac4ad96b9bb841231ae41d4/Debbie%20-%20Revere-2973.jpg',
          afterImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/fef77934024e1fe7bac4ad96b9bb841231ae41d4/Debbie%20-%20Revere-2973_hdr.jpg',
        },
      ],
    },
    {
      id: 'flambient',
      title: 'Flambient',
      description: 'Flash and ambient blending for perfect interiors',
      tags: ['Flambient', 'Interior'],
      images: [
        {
          beforeImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/1f9428c94ed9236a94156e272fc68e5483b9b70d/DSC_5475.jpg',
          afterImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/1f9428c94ed9236a94156e272fc68e5483b9b70d/DSC_5477_hdr.jpg',
        },
        {
          beforeImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/cb4361606b7b283124d53e1cff5f526f72c919b6/DSC_5490.jpg',
          afterImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/cb4361606b7b283124d53e1cff5f526f72c919b6/DSC_5492_hdr.jpg',
        },
        {
          beforeImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/bc833a7caf83c8f1a910d753631ac93421e5fc7a/DSC_5589.jpg',
          afterImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/bc833a7caf83c8f1a910d753631ac93421e5fc7a/DSC_5591_hdr.jpg',
        },
      ],
    },
    {
      id: 'staging',
      title: 'Virtual Staging',
      description: 'Tasteful, realistic furnishing additions',
      tags: ['Staging', 'Virtual'],
      images: [
        {
          beforeImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/dac321e43b5b7d914c5d90caac9a8960457bd948/-5d-aYsO2g7U.jpg',
          afterImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/dac321e43b5b7d914c5d90caac9a8960457bd948/-5d-aYsO2g7UVR.png',
        },
        {
          beforeImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/60f94fc83afe3966a591f84bbc5c27de1c5540cf/1447c.jpg',
          afterImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/60f94fc83afe3966a591f84bbc5c27de1c5540cf/1447c.png',
        },
        {
          beforeImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/0551b5e448c6efb7524a068a8173a0c39ba2a331/modern-empty-room.jpg',
          afterImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/0551b5e448c6efb7524a068a8173a0c39ba2a331/-4d-aYsO2U.png',
        },
      ],
    },
    {
      id: 'removal',
      title: 'Item Removal',
      description: 'Clean, natural object removal (clutter, wires, signage) while preserving textures, reflections, and shadows',
      tags: ['Item Removal'],
      images: [
        {
          beforeImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/b43ab240f859ebcc682657a387f622507e028c74/deepskiesd(13of75).jpg',
          afterImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/b43ab240f859ebcc682657a387f622507e028c74/deepskiesd(13of75)_IR.jpg',
        },
        {
          beforeImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/0459dbeb58f3519f5137ffd98e40f70ebd6fefa6/DSC_1927.jpg',
          afterImage: 'https://raw.githubusercontent.com/taufiqz11/test-images/0459dbeb58f3519f5137ffd98e40f70ebd6fefa6/DSC_1927_IR.jpg',
        },
      ],
    },
  ];

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-light">
            My <span className="text-gradient font-semibold">Portfolio</span>
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            Explore my work across different editing styles and techniques. Each project showcases attention to detail and professional quality.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
          {portfolioSections.map((section, index) => (
            <div 
              key={section.id}
              className={`glass rounded-xl p-6 hover:glass-strong hover:scale-105 transition-all duration-normal group border border-glass-border/30 hover:border-primary/30 ${section.id === 'removal' ? 'md:col-span-2 md:justify-self-center md:max-w-xl' : ''}`}
              style={{ 
                '--delay': `${index * 0.1}s`,
                animationDelay: 'var(--delay)' 
              } as React.CSSProperties}
            >
              {/* Header */}
              <div className="mb-6 space-y-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-normal">
                    {section.title}
                  </h3>
                  <div className="flex gap-2 justify-center md:justify-end">
                    {section.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-foreground-muted">
                  {section.description}
                </p>
              </div>

              {/* Portfolio Gallery */}
              <PortfolioGallery 
                images={section.images}
                title={section.title}
                className="mb-6"
              />

              {/* CTA */}
              <div className="flex justify-center">
                <Button 
                  variant="glass" 
                  className="group-hover:bg-primary/10 group-hover:border-primary/50"
                  onClick={() => setSelectedPortfolio(section.id)}
                >
                  View Full Set
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-normal">
                    →
                  </span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-glow opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-primary opacity-5 rounded-full blur-2xl" />

      {/* Portfolio Modal */}
      {selectedPortfolio && (
        <PortfolioModal
          isOpen={!!selectedPortfolio}
          onClose={() => setSelectedPortfolio(null)}
          title={portfolioSections.find(s => s.id === selectedPortfolio)?.title || ''}
          description={portfolioSections.find(s => s.id === selectedPortfolio)?.description || ''}
          tags={portfolioSections.find(s => s.id === selectedPortfolio)?.tags || []}
          images={portfolioSections.find(s => s.id === selectedPortfolio)?.images || []}
        />
      )}
    </section>
  );
};

export default Portfolio;