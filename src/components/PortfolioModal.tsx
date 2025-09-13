import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
interface PortfolioImage {
  beforeImage: string;
  afterImage: string;
}
interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  images: PortfolioImage[];
  description: string;
  tags: string[];
}
const PortfolioModal = ({
  isOpen,
  onClose,
  title,
  images,
  description,
  tags
}: PortfolioModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const animationDuration = 300; // Duration in milliseconds

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
    setTimeout(() => setIsAnimating(false), animationDuration);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
    setTimeout(() => setIsAnimating(false), animationDuration);
  };

  const goToImage = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), animationDuration);
  };

  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full max-h-[90vh] overflow-y-auto glass">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="space-y-2">
            <DialogTitle className="text-2xl font-semibold text-foreground">
              {title}
            </DialogTitle>
            <p className="text-foreground-muted">{description}</p>
            <div className="flex gap-2">
              {tags.map(tag => <span key={tag} className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-md">
                  {tag}
                </span>)}
            </div>
          </div>
          
        </DialogHeader>

        <div className="space-y-6">
          {/* Main Image Display */}
          <div className="relative">
            <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
              <BeforeAfterSlider beforeImage={images[currentIndex]?.beforeImage} afterImage={images[currentIndex]?.afterImage} alt={`${title} comparison ${currentIndex + 1}`} className="w-full h-[400px] md:h-[500px]" />
            </div>
            
            {/* Navigation */}
            {images.length > 1 && <>
                <Button variant="glass" size="icon" onClick={goToPrevious} className="absolute left-4 top-1/2 -translate-y-1/2">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="glass" size="icon" onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>}

            {/* Image Counter */}
            {images.length > 1 && <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-sm text-foreground">
                  {currentIndex + 1} of {images.length}
                </span>
              </div>}
          </div>

          {/* Thumbnail Navigation */}
          {images.length > 1 && <div className="flex gap-2 justify-center flex-wrap">
              {images.map((image, index) => <button key={index} onClick={() => goToImage(index)} className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${index === currentIndex ? 'border-primary shadow-glow-soft' : 'border-glass-border/30 hover:border-primary/50'}`}>
                  <img src={image.beforeImage} alt={`${title} ${index + 1}`} className="w-full h-full object-cover" />
                </button>)}
            </div>}
        </div>
      </DialogContent>
    </Dialog>;
};
export default PortfolioModal;