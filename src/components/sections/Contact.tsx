import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Envelope, Clock, Copy, CheckCircle } from 'phosphor-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([formRef.current, infoRef.current], {
        opacity: 0,
        y: 60,
        filter: 'blur(10px)'
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      tl.to(formRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: "power2.out"
      })
      .to(infoRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create email content
    const subject = `New message from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    
    // Create mailto link
    const mailtoLink = `mailto:taufiqshaikhfz1@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success animation
    gsap.to(e.target, {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
    
    // Reset form after a delay
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }, 1000);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('taufiqshaikhfz1@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-light">
            Get In <span className="text-gradient font-semibold">Touch</span>
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            Ready to enhance your photos? Let's discuss your project and create stunning visuals together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div ref={formRef} className="glass rounded-xl p-8 border border-glass-border/30">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground-secondary">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-4 glass rounded-lg bg-input border border-input-border focus:border-primary focus:shadow-glow-soft transition-all duration-normal text-foreground placeholder-foreground-muted"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground-secondary">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-4 glass rounded-lg bg-input border border-input-border focus:border-primary focus:shadow-glow-soft transition-all duration-normal text-foreground placeholder-foreground-muted"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground-secondary">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full p-4 glass rounded-lg bg-input border border-input-border focus:border-primary focus:shadow-glow-soft transition-all duration-normal text-foreground placeholder-foreground-muted resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <Button 
                type="submit"
                variant="neon"
                size="lg"
                className="w-full"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            {/* Personal Info */}
            <div className="glass rounded-xl p-8 border border-glass-border/30">
              <h3 className="text-xl font-semibold mb-6 text-foreground">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 glass rounded-lg flex items-center justify-center">
                    <Envelope size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground-secondary">Email</p>
                    <div className="flex items-center gap-2">
                      <p className="text-foreground font-medium">taufiqshaikhfz1@gmail.com</p>
                      <button
                        onClick={handleCopyEmail}
                        className="p-1 hover:bg-glass-bg/30 rounded transition-colors duration-normal"
                        title="Copy email"
                      >
                        {copiedEmail ? (
                          <CheckCircle size={16} className="text-green-400" />
                        ) : (
                          <Copy size={16} className="text-foreground-muted" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 glass rounded-lg flex items-center justify-center">
                    <Clock size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground-secondary">Working Hours</p>
                    <p className="text-foreground font-medium">Mon–Sat, 1:00–04:00 IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Summary */}
            <div className="glass rounded-xl p-8 border border-glass-border/30">
              <h3 className="text-xl font-semibold mb-6 text-foreground">What I Offer</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground-secondary">Professional photo editing & retouching</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-neon-bright rounded-full" />
                  <span className="text-foreground-secondary">Fast turnaround times (5-12 hours)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-neon-dim rounded-full" />
                  <span className="text-foreground-secondary">Consistent quality & style</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-glow rounded-full" />
                  <span className="text-foreground-secondary">Revision rounds included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-gradient-glow opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-neon-blue opacity-5 rounded-full blur-2xl" />
    </section>
  );
};

export default Contact;