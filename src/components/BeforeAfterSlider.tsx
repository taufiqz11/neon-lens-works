import { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowsHorizontal } from 'phosphor-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  alt: string;
  className?: string;
}

const BeforeAfterSlider = ({ beforeImage, afterImage, alt, className = '' }: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

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
      className={`relative w-full h-96 overflow-hidden rounded-xl glass border border-glass-border/30 cursor-grab active:cursor-grabbing select-none ${className}`}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onDragStart={(e) => e.preventDefault()}
      onTouchStart={(e) => {
        setIsDragging(true);
        if (e.touches[0]) {
          handleMove(e.touches[0].clientX);
        }
      }}
    >
      {/* Before Image */}
      <img 
        src={beforeImage} 
        alt={`${alt} - Before`}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        draggable={false}
      />
      
      {/* After Image with mask */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)`, willChange: 'clip-path' }}
      >
        <img 
          src={afterImage} 
          alt={`${alt} - After`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* Slider Line */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-glass-border/60 z-10"
        style={{ left: `${sliderPosition}%` }}
      />

      {/* Slider Handle */}
      <div 
        ref={sliderRef}
        className="absolute top-1/2 w-12 h-12 -translate-y-1/2 -translate-x-1/2 glass rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 transition-transform duration-normal z-20 border border-glass-border/60 hover:border-glass-border/80"
        style={{ left: `${sliderPosition}%` }}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="slider"
        aria-valuenow={sliderPosition}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Before and after comparison slider"
      >
        <ArrowsHorizontal size={20} className="text-foreground-secondary" />
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 px-3 py-1 glass rounded-md text-sm font-medium text-foreground-secondary">
        Before
      </div>
      <div className="absolute top-4 right-4 px-3 py-1 glass rounded-md text-sm font-medium text-foreground-secondary">
        After
      </div>
    </div>
  );
};

export default BeforeAfterSlider;