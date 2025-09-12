import { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Prevent scrolling during preloader
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      <div className={`transition-all duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navigation />
        
        <main>
          <section id="hero">
            <Hero />
          </section>
          
          <section id="about">
            <About />
          </section>
          
          <section id="portfolio">
            <Portfolio />
          </section>
          
          <section id="contact">
            <Contact />
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
