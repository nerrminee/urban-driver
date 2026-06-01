import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ContactModal from './components/ContactModal';
import Hero from './components/Hero';
import EstimationForm from './components/EstimationForm';
import Marketplace from './components/Marketplace';
import Benefits from './components/Benefits';
import Comparison from './components/Comparison';
import Testimonials from './components/Testimonials';
import AgentCommercial from './components/AgentCommercial';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  const [contactOpen, setContactOpen] = useState(false);

  // Smooth scroll helper for absolute section offsets
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="app-root-wrapper">
      {/* Dynamic Background Grids */}
      <div className="global-mesh-grid"></div>

      {/* Primary Sticky Header */}
      <Navbar 
        onOpenContact={() => setContactOpen(true)} 
        onScrollToSection={scrollToSection} 
      />

      {/* Main Page Layout */}
      <main>
        <Hero onScrollToSection={scrollToSection} />
        
        <div className="ticks-decoration"></div>
        
        <Marketplace onOpenContact={() => setContactOpen(true)} />
        
        <div className="ticks-decoration"></div>
        
        <EstimationForm onOpenContact={() => setContactOpen(true)} />
        
        <div className="ticks-decoration"></div>
        
        <Benefits />
        
        <div className="ticks-decoration"></div>
        
        <Comparison />
        
        <div className="ticks-decoration"></div>
        
        <Testimonials />
        
        <div className="ticks-decoration"></div>
        
        <AgentCommercial />
        
        <div className="ticks-decoration"></div>
        
        <FAQ />
      </main>

      {/* Footnotes */}
      <Footer 
        onScrollToSection={scrollToSection} 
        onOpenContact={() => setContactOpen(true)} 
      />

      {/* Universal Floating Modal Overlay */}
      <ContactModal 
        isOpen={contactOpen} 
        onClose={() => setContactOpen(false)} 
      />

      <style>{`
        .app-root-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        /* Ambient subtle background grid for luxury tech aesthetic */
        .global-mesh-grid {
          position: absolute;
          inset: 0;
          z-index: -2;
          pointer-events: none;
          background-image: 
            radial-gradient(var(--border-light) 1px, transparent 1px),
            radial-gradient(var(--border-light) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: 0 0, 20px 20px;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}

export default App;
