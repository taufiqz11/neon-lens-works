import { useState, useEffect } from 'react';
import { List, X } from 'phosphor-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-40 transition-all duration-normal ${
        isScrolled ? 'glass backdrop-blur-strong' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="https://github.com/taufiqz11/my-pro/blob/0acb8535f8490bcc2337ffb5b348b961d2ed4cbb/Layer%202.png?raw=true"
                alt="Shaik Abdul Taufiq Logo"
                className="h-8 w-auto"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground-secondary hover:text-primary transition-colors duration-normal relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-normal" />
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden glass rounded-lg p-3 hover:glass-strong transition-all duration-normal"
            >
              {isMenuOpen ? <X size={20} /> : <List size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-strong" />
          <div className="absolute top-0 right-0 w-80 h-full glass-strong p-8">
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="glass rounded-lg p-3 hover:glass-strong transition-all duration-normal"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg text-foreground hover:text-primary transition-colors duration-normal"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;