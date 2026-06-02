import React, { useState, useEffect } from 'react';
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
import AdminPanel from './components/AdminPanel';

// Default mock cars to seed localStorage on first visit
const DEFAULT_CARS = [
  {
    id: 1,
    brand: 'Tesla',
    model: 'Model S Plaid',
    year: '2022',
    mileage: 28000,
    fuel: 'Électrique',
    gearbox: 'Automatique',
    price: 64900,
    monthly: 580,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&auto=format&fit=crop&q=80',
    featured: true,
    specs: '1020 ch, 0-100 km/h en 2.1s, Autonomie 600 km, Pilotage automatique.'
  },
  {
    id: 2,
    brand: 'Porsche',
    model: '911 Carrera S',
    year: '2020',
    mileage: 32000,
    fuel: 'Essence',
    gearbox: 'Automatique',
    price: 114500,
    monthly: 1040,
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&auto=format&fit=crop&q=80',
    featured: true,
    specs: '450 ch, Toit ouvrant panoramique, Échappement sport, Phares LED PDLS+.'
  },
  {
    id: 3,
    brand: 'Audi',
    model: 'e-tron GT',
    year: '2023',
    mileage: 14000,
    fuel: 'Électrique',
    gearbox: 'Automatique',
    price: 82900,
    monthly: 740,
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&auto=format&fit=crop&q=80',
    featured: true,
    specs: '530 ch, Quattro, Suspension pneumatique adaptative, Jantes 21".'
  },
  {
    id: 4,
    brand: 'BMW',
    model: 'M4 Competition',
    year: '2021',
    mileage: 41000,
    fuel: 'Essence',
    gearbox: 'Automatique',
    price: 79900,
    monthly: 710,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&auto=format&fit=crop&q=80',
    featured: false,
    specs: '510 ch, Pack carbone extérieur, Affichage tête haute, Sièges M Sport ventilés.'
  },
  {
    id: 5,
    brand: 'Mercedes',
    model: 'AMG CLA 45 S',
    year: '2022',
    mileage: 22000,
    fuel: 'Essence',
    gearbox: 'Automatique',
    price: 62500,
    monthly: 560,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&auto=format&fit=crop&q=80',
    featured: false,
    specs: '421 ch, Transmission intégrale 4MATIC+, Échappement Performance, Pack Nuit.'
  }
];

function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [cars, setCars] = useState([]);
  const [view, setView] = useState('user'); // 'user' | 'admin'

  // Load and seed cars state from localStorage
  useEffect(() => {
    const localData = localStorage.getItem('urban_driver_cars');
    if (localData) {
      try {
        setCars(JSON.parse(localData));
      } catch (e) {
        console.error('Error parsing cars localData, resetting...', e);
        setCars(DEFAULT_CARS);
        localStorage.setItem('urban_driver_cars', JSON.stringify(DEFAULT_CARS));
      }
    } else {
      setCars(DEFAULT_CARS);
      localStorage.setItem('urban_driver_cars', JSON.stringify(DEFAULT_CARS));
    }
  }, []);

  // Hash-based routing logic listener
  useEffect(() => {
    const handleHashChange = () => {
      const isAdmin = window.location.hash === '#/admin';
      setView(isAdmin ? 'admin' : 'user');
      window.scrollTo({ top: 0 });
    };

    // Initial check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Mutation: Add new vehicle
  const handleAddCar = (newCar) => {
    const updated = [newCar, ...cars];
    setCars(updated);
    localStorage.setItem('urban_driver_cars', JSON.stringify(updated));
  };

  // Mutation: Delete a vehicle by ID
  const handleDeleteCar = (id) => {
    const updated = cars.filter(car => car.id !== id);
    setCars(updated);
    localStorage.setItem('urban_driver_cars', JSON.stringify(updated));
  };

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

      {view === 'admin' ? (
        // Render beautiful Admin Panel console
        <AdminPanel 
          cars={cars} 
          onAddCar={handleAddCar} 
          onDeleteCar={handleDeleteCar} 
        />
      ) : (
        // Render standard User Landing page
        <>
          {/* Primary Sticky Header */}
          <Navbar 
            onOpenContact={() => setContactOpen(true)} 
            onScrollToSection={scrollToSection} 
          />

          {/* Main Page Layout */}
          <main>
            <Hero onScrollToSection={scrollToSection} />
            
            <div className="ticks-decoration"></div>
            
            <Marketplace 
              onOpenContact={() => setContactOpen(true)} 
              cars={cars}
            />
            
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
        </>
      )}

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
