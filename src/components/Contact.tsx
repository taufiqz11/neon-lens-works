import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./ui/button";
import { Copy, Envelope, Clock, User } from "phosphor-react";
import { toast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Reset form and show success
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
    
    // Animate button
    gsap.to(e.target, {
      scale: 1.05,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });

    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Email address copied to clipboard.",
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([formRef.current, infoRef.current], {
        opacity: 0,
        y: 40,
        filter: "blur(10px)"
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });

      tl.to([formRef.current, infoRef.current], {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-4 text-glow">
            Let's Work Together
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your images? Get in touch and let's discuss your project requirements.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="contact-form">{/* Form wrapper */}
            <form ref={formRef} onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-glass-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-input border border-input-border rounded-xl focus:ring-2 focus:ring-neon-blue focus:border-transparent transition-all backdrop-blur-sm text-foreground placeholder-muted-foreground"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-glass-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-input border border-input-border rounded-xl focus:ring-2 focus:ring-neon-blue focus:border-transparent transition-all backdrop-blur-sm text-foreground placeholder-muted-foreground"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-glass-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-input border border-input-border rounded-xl focus:ring-2 focus:ring-neon-blue focus:border-transparent transition-all backdrop-blur-sm text-foreground placeholder-muted-foreground resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-6">
            {/* Personal Info */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <User className="w-5 h-5 text-neon-blue" />
                <h3 className="text-lg font-medium text-glass-foreground">Contact Information</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="text-glass-foreground font-medium">Shaik Abdul Taufiq</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-glass-foreground font-medium">taufiqshaikhfz1@gmail.com</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard("taufiqshaikhfz1@gmail.com")}
                      className="p-1 h-auto hover:text-neon-blue"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-5 h-5 text-neon-cyan" />
                <h3 className="text-lg font-medium text-glass-foreground">Working Hours</h3>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Saturday</span>
                  <span className="text-glass-foreground font-medium">9:00 - 19:00 IST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="text-glass-foreground font-medium">On Request</span>
                </div>
              </div>
            </div>

            {/* Service Info */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <Envelope className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-medium text-glass-foreground">Service Details</h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  I specialize in real estate photography enhancement with industry-leading techniques and consistent results.
                </p>
                <div className="space-y-1">
                  <p className="text-glass-foreground font-medium">• 24-hour standard turnaround</p>
                  <p className="text-glass-foreground font-medium">• Rush service available</p>
                  <p className="text-glass-foreground font-medium">• Free revisions included</p>
                  <p className="text-glass-foreground font-medium">• Bulk project discounts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;