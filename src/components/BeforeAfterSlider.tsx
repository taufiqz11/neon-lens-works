import { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowsHorizontal } from 'phosphor-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  alt: string;
  className?: string;
}

const ImageSkeleton = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-glass-border/20 to-glass-border/10 animate-pulse">
    <div className="absolute inset-4 bg-glass-border/20 rounded-lg animate-pulse" style={{ animationDelay: '0.2s' }} />
  </div>
);

const BeforeAfterSlider = ({ beforeImage, afterImage, alt, className = '' }: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [beforeLoaded, setBeforeLoaded] = useState(false);
  const [afterLoaded, setAfterLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const beforeImgRef = useRef<HTMLImageElement>(null);
  const afterImgRef = useRef<HTMLImageElement>(null);

  const bothImagesLoaded = beforeLoaded && afterLoaded;

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Preload images when visible
  useEffect(() => {
    if (!isVisible) return;

    const preloadImage = (src: string) => {
      const img = new Image();
      img.src = src;
    };

    preloadImage(beforeImage);
    preloadImage(afterImage);
  }, [isVisible, beforeImage, afterImage]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    const clampedPosition = Math.min(Math.max(position, 0), 100);

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      setSliderPosition(clampedPosition);
    });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  }, [isDragging]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging && e.touches[0]) {
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    }
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isDragging, handleMouseMove, handleTouchMove]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition(Math.max(sliderPosition - 5, 0));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition(Math.min(sliderPosition + 5, 100));
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-96 overflow-hidden rounded-xl glass border border-glass-border/30 select-none ${
        bothImagesLoaded ? 'cursor-grab active:cursor-grabbing' : 'cursor-wait'
      } ${className}`}
      onMouseDown={(e) => {
        if (!bothImagesLoaded) return;
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onDragStart={(e) => e.preventDefault()}
      onTouchStart={(e) => {
        if (!bothImagesLoaded) return;
        setIsDragging(true);
        if (e.touches[0]) {
          handleMove(e.touches[0].clientX);
        }
      }}
    >
      {/* Loading Skeleton */}
      {!bothImagesLoaded && <ImageSkeleton />}

      {/* Before Image */}
      {isVisible && (
        <img 
          ref={beforeImgRef}
          src={beforeImage} 
          alt={`${alt} - Before`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            beforeLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          draggable={false}
          onLoad={() => setBeforeLoaded(true)}
          onError={() => setBeforeLoaded(true)}
        />
      )}
      
      {/* After Image with mask */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ 
          clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)`, 
          willChange: 'clip-path' 
        }}
      >
        {isVisible && (
          <img 
            ref={afterImgRef}
            src={afterImage} 
            alt={`${alt} - After`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              afterLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            draggable={false}
            onLoad={() => setAfterLoaded(true)}
            onError={() => setAfterLoaded(true)}
          />
        )}
      </div>

      {/* Slider Line - Only show when images are loaded */}
      {bothImagesLoaded && (
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-glass-border/60 z-10 transition-opacity duration-300"
          style={{ left: `${sliderPosition}%` }}
        />
      )}

      {/* Slider Handle - Only interactive when images are loaded */}
      <div 
        ref={sliderRef}
        className={`absolute top-1/2 w-12 h-12 -translate-y-1/2 -translate-x-1/2 glass rounded-full flex items-center justify-center transition-all duration-normal z-20 border border-glass-border/60 ${
          bothImagesLoaded 
            ? 'cursor-grab active:cursor-grabbing hover:scale-110 hover:border-glass-border/80 opacity-100' 
            : 'cursor-not-allowed opacity-50'
        }`}
        style={{ left: `${sliderPosition}%` }}
        tabIndex={bothImagesLoaded ? 0 : -1}
        onKeyDown={bothImagesLoaded ? handleKeyDown : undefined}
        role="slider"
        aria-valuenow={sliderPosition}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Before and after comparison slider"
        aria-disabled={!bothImagesLoaded}
      >
        <ArrowsHorizontal 
          size={20} 
          className={`transition-colors duration-300 ${
            bothImagesLoaded ? 'text-foreground-secondary' : 'text-foreground-muted'
          }`} 
        />
      </div>

      {/* Labels - Only show when images are loaded */}
      {bothImagesLoaded && (
        <>
          <div className="absolute top-4 left-4 px-3 py-1 glass rounded-md text-sm font-medium text-foreground-secondary">
            Before
          </div>
          <div className="absolute top-4 right-4 px-3 py-1 glass rounded-md text-sm font-medium text-foreground-secondary">
            After
          </div>
        </>
      )}

      {/* Loading indicator */}
      {!bothImagesLoaded && isVisible && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="glass px-4 py-2 rounded-lg text-sm text-foreground-secondary">
            Loading images...
          </div>
        </div>
      )}
    </div>
  );
};

export default BeforeAfterSlider;