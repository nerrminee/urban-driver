import React, { useState } from 'react';

const Footer = ({ onScrollToSection, onOpenContact }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="footer-container">
      <div className="container footer-content-grid">
        {/* Brand Information column */}
        <div className="footer-brand-col">
          <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <svg className="nav-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
              <circle cx="7" cy="17" r="2" />
              <path d="M9 17h6" />
              <circle cx="17" cy="17" r="2" />
            </svg>
            <span className="logo-text">Urban<span className="logo-accent">Driver</span></span>
          </a>
          <p className="footer-brand-tagline">
            Votre tiers de confiance automobile. Sécurisation complète des paiements, historique transparent et garanties systématiques de 3 à 36 mois.
          </p>
          <div className="social-links-row">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
              📸
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Youtube">
              🎥
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook">
              👥
            </a>
          </div>
        </div>

        {/* Directory Links columns */}
        <div className="footer-links-col">
          <h4 className="footer-section-title">Navigation</h4>
          <ul className="footer-links-list">
            <li><button onClick={() => onScrollToSection('marketplace')}>Catalogue Véhicules</button></li>
            <li><button onClick={() => onScrollToSection('estimation')}>Estimer mon véhicule</button></li>
            <li><button onClick={() => onScrollToSection('how-it-works')}>Comment ça marche ?</button></li>
            <li><button onClick={() => onScrollToSection('faq')}>Questions fréquentes (FAQ)</button></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-section-title">Opportunités</h4>
          <ul className="footer-links-list">
            <li><button onClick={() => onScrollToSection('recruitment')}>Devenir Conseiller Commercial</button></li>
            <li><button onClick={onOpenContact}>Rejoindre nos franchisés</button></li>
            <li><button onClick={onOpenContact}>Devenir partenaire agréé</button></li>
            <li><button onClick={onOpenContact}>Espace Presse</button></li>
          </ul>
        </div>

        {/* Newsletter Subscription Column */}
        <div className="footer-newsletter-col">
          <h4 className="footer-section-title">Newsletter</h4>
          <p className="newsletter-subtitle">
            Abonnez-vous pour recevoir en priorité nos derniers véhicules d'exception en vente.
          </p>
          
          {subscribed ? (
            <div className="newsletter-success">✓ Inscription validée !</div>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-form-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre e-mail"
                className="form-control newsletter-input"
              />
              <button type="submit" className="btn btn-primary newsletter-submit-btn" aria-label="S'abonner">
                →
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Under footer copyright & terms */}
      <div className="footer-sub-bar">
        <div className="container sub-bar-grid">
          <span className="copyright-txt">
            © {new Date().getFullYear()} Urban Driver. Tous droits réservés.
          </span>
          <div className="legal-links">
            <a href="#" onClick={(e) => { e.preventDefault(); onOpenContact(); }}>Politique de confidentialité</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onOpenContact(); }}>Politique des cookies</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onOpenContact(); }}>Mentions Légales</a>
            <a href="#/admin" style={{ color: 'var(--primary)', fontWeight: '600' }}>Espace Admin</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-container {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-light);
          padding: 80px 0 0;
          color: var(--text-secondary);
        }

        .footer-content-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 0.8fr 1.2fr;
          gap: 50px;
          margin-bottom: 60px;
        }

        @media (max-width: 992px) {
          .footer-content-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
        }

        @media (max-width: 576px) {
          .footer-content-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        .footer-brand-col {
          text-align: left;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
        }

        .footer-brand-tagline {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--text-muted);
        }

        .social-links-row {
          display: flex;
          gap: 12px;
        }

        .social-icon-btn {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-sm);
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 1.1rem;
          transition: all var(--transition-fast);
        }

        .social-icon-btn:hover {
          border-color: var(--primary);
          background-color: rgba(var(--primary-rgb), 0.05);
          transform: translateY(-2px);
        }

        /* Nav links columns */
        .footer-links-col {
          text-align: left;
        }

        .footer-section-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-primary);
          margin-bottom: 24px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .footer-links-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .footer-links-list button {
          background: none;
          border: none;
          color: var(--text-muted);
          font-family: var(--font-sans);
          font-size: 0.92rem;
          text-align: left;
          cursor: pointer;
          transition: color var(--transition-fast);
          padding: 0;
        }

        .footer-links-list button:hover {
          color: var(--primary);
        }

        /* Newsletter column */
        .footer-newsletter-col {
          text-align: left;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
        }

        .newsletter-subtitle {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .newsletter-form-row {
          display: flex;
          width: 100%;
          gap: 8px;
        }

        .newsletter-input {
          padding: 12px 16px;
          font-size: 0.9rem;
        }

        .newsletter-submit-btn {
          padding: 12px 18px;
          font-weight: bold;
        }

        .newsletter-success {
          background-color: rgba(var(--success-rgb), 0.12);
          color: var(--success);
          padding: 10px 16px;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          width: 100%;
          font-weight: 600;
        }

        /* Sub footer copyright bar styling */
        .footer-sub-bar {
          border-top: 1px solid var(--border-light);
          padding: 30px 0;
          background-color: var(--bg-primary);
        }

        .sub-bar-grid {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .sub-bar-grid {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
        }

        .legal-links {
          display: flex;
          gap: 24px;
        }

        .legal-links a {
          color: var(--text-muted);
          transition: color var(--transition-fast);
        }

        .legal-links a:hover {
          color: var(--primary);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
