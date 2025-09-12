import { useState, useEffect } from "react";
import { List, X } from "phosphor-react";
import { Button } from "./ui/button";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Contact", href: "#contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav 
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
          isScrolled ? 'glass-card backdrop-blur-glass' : 'bg-transparent'
        } rounded-2xl px-8 py-4 hidden md:block`}
      >
        <div className="flex items-center space-x-8">
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
        </div>
      </nav>

      {/* Mobile Navigation Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-6 right-6 z-50 md:hidden glass-card p-3 rounded-xl backdrop-blur-glass"
      >
        {isMenuOpen ? (
          <X className="w-6 h-6 text-glass-foreground" />
        ) : (
          <List className="w-6 h-6 text-glass-foreground" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-lg" />
          <div className="absolute inset-0 flex items-center justify-center">
            <nav className="glass-card p-8 rounded-2xl backdrop-blur-glass">
              <div className="flex flex-col space-y-6">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className="text-2xl font-medium text-glass-foreground hover:text-neon-blue transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;