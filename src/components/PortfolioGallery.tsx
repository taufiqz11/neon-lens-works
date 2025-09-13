import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';

interface PortfolioGalleryProps {
  images: Array<{
    beforeImage: string;
    afterImage: string;
  }>;
  title: string;
  className?: string;
}

const PortfolioGallery = ({ images, title, className }: PortfolioGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <div className={className}>
      <div className="relative">
        {/* Main Image Display */}
        <BeforeAfterSlider 
          beforeImage={images[currentIndex].beforeImage}
          afterImage={images[currentIndex].afterImage}
          alt={`${title} - Image ${currentIndex + 1}`}
          className="mb-4"
        />

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <Button
              variant="glass"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-normal"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous image</span>
            </Button>

            <Button
              variant="glass"
              size="icon"
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-normal"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next image</span>
            </Button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs text-foreground-muted">
            {currentIndex + 1} of {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Dots */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-normal ${
                index === currentIndex 
                  ? 'bg-primary scale-125' 
                  : 'bg-foreground-muted/40 hover:bg-foreground-muted/60'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioGallery;