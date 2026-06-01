import React, { useState, useEffect } from 'react';

const Navbar = ({ onOpenContact, onScrollToSection }) => {
  const [theme, setTheme] = useState('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Initialize theme from system or localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'; // default to premium dark theme
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Listen to scroll events to apply sticky effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const navItems = [
    { label: 'Catalogue', target: 'marketplace' },
    { label: 'Estimer mon véhicule', target: 'estimation' },
    { label: 'Comment ça marche ?', target: 'how-it-works' },
    { label: 'Pourquoi nous ?', target: 'benefits' },
    { label: 'FAQ', target: 'faq' },
    { label: 'Rejoindre l\'équipe', target: 'recruitment' }
  ];

  const handleNavClick = (target) => {
    setMobileMenuOpen(false);
    onScrollToSection(target);
  };

  return (
    <>
      <nav className={`nav-bar-container ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo */}
          <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <svg className="nav-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
              <circle cx="7" cy="17" r="2" />
              <path d="M9 17h6" />
              <circle cx="17" cy="17" r="2" />
            </svg>
            <span className="logo-text">Urban<span className="logo-accent">Driver</span></span>
          </a>

          {/* Desktop Navigation */}
          <div className="nav-desktop-links">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                className="nav-link-btn"
                onClick={() => handleNavClick(item.target)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="nav-actions">
            {/* Theme Toggle Button */}
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Changer de thème">
              {theme === 'light' ? (
                <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.22" x2="5.64" y2="17.78" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>

            {/* CTA Contact Button */}
            <button className="btn btn-primary nav-cta-btn" onClick={onOpenContact}>
              Contacter un conseiller
            </button>

            {/* Mobile Menu Toggle */}
            <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
              {mobileMenuOpen ? (
                <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'drawer-open' : ''}`}>
        <div className="drawer-overlay" onClick={() => setMobileMenuOpen(false)}></div>
        <div className="drawer-content">
          <div className="drawer-header">
            <span className="logo-text">Urban<span className="logo-accent">Driver</span></span>
            <button className="drawer-close-btn" onClick={() => setMobileMenuOpen(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className="drawer-links">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                className="drawer-link-btn"
                onClick={() => handleNavClick(item.target)}
              >
                {item.label}
              </button>
            ))}
            <button
              className="btn btn-primary drawer-cta-btn"
              onClick={() => { setMobileMenuOpen(false); onOpenContact(); }}
            >
              Contacter un conseiller
            </button>
          </div>
        </div>
      </div>

      <style>{`
        /* Sticky navbar glassmorphism container */
        .nav-bar-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background: rgba(var(--bg-primary) === '#09090e' ? '9, 9, 14' : '248, 250, 252', 0.2);
          backdrop-filter: blur(0px);
          -webkit-backdrop-filter: blur(0px);
          border-bottom: 1px solid transparent;
          transition: all var(--transition-normal);
        }

        .nav-scrolled {
          background: var(--glass-bg);
          backdrop-filter: blur(var(--glass-blur));
          -webkit-backdrop-filter: blur(var(--glass-blur));
          border-bottom: 1px solid var(--glass-border);
          box-shadow: 0 4px 20px 0 var(--glass-shadow);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: var(--text-primary);
        }

        .nav-logo-icon {
          width: 32px;
          height: 32px;
          color: var(--primary);
          filter: drop-shadow(0 2px 8px rgba(var(--primary-rgb), 0.3));
          transition: transform var(--transition-fast);
        }

        .nav-logo:hover .nav-logo-icon {
          transform: rotate(-5deg) scale(1.05);
        }

        .logo-text {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.5rem;
          letter-spacing: -0.04em;
        }

        .logo-accent {
          color: var(--primary);
        }

        .nav-desktop-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-link-btn {
          background: none;
          border: none;
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color var(--transition-fast);
          padding: 8px 0;
          position: relative;
        }

        .nav-link-btn::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--primary);
          transition: width var(--transition-fast);
        }

        .nav-link-btn:hover {
          color: var(--primary);
        }

        .nav-link-btn:hover::after {
          width: 100%;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .theme-toggle-btn {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .theme-toggle-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
          background-color: rgba(var(--primary-rgb), 0.05);
          transform: scale(1.05);
        }

        .theme-icon {
          width: 20px;
          height: 20px;
        }

        .nav-cta-btn {
          padding: 10px 20px;
          font-size: 0.9rem;
        }

        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
        }

        .menu-icon {
          width: 28px;
          height: 28px;
        }

        /* Mobile Drawer styling */
        .mobile-nav-drawer {
          position: fixed;
          inset: 0;
          z-index: 1100;
          visibility: hidden;
          transition: visibility var(--transition-normal);
        }

        .mobile-nav-drawer.drawer-open {
          visibility: visible;
        }

        .drawer-overlay {
          position: absolute;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          opacity: 0;
          transition: opacity var(--transition-normal);
        }

        .mobile-nav-drawer.drawer-open .drawer-overlay {
          opacity: 1;
        }

        .drawer-content {
          position: absolute;
          top: 0;
          right: 0;
          width: 320px;
          max-width: 85%;
          height: 100%;
          background-color: var(--bg-secondary);
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
          transform: translateX(100%);
          transition: transform var(--transition-normal);
          padding: 30px 24px;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .mobile-nav-drawer.drawer-open .drawer-content {
          transform: translateX(0);
        }

        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .drawer-close-btn {
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
        }

        .drawer-close-btn svg {
          width: 24px;
          height: 24px;
        }

        .drawer-links {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .drawer-link-btn {
          background: none;
          border: none;
          text-align: left;
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color var(--transition-fast);
          padding: 10px 0;
          border-bottom: 1px solid var(--border-light);
        }

        .drawer-link-btn:hover {
          color: var(--primary);
        }

        .drawer-cta-btn {
          width: 100%;
          margin-top: 10px;
          padding: 14px;
        }

        @media (max-width: 992px) {
          .nav-desktop-links, .nav-cta-btn {
            display: none;
          }
          .mobile-menu-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
