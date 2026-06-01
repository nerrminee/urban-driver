import React from 'react';

const Hero = ({ onScrollToSection }) => {
  return (
    <section className="hero-section">
      {/* Dynamic Glowing Accents */}
      <div className="glowing-bg glowing-primary"></div>
      <div className="glowing-bg glowing-accent"></div>

      <div className="container hero-container">
        {/* Left Content Side */}
        <div className="hero-content">
          <div className="hero-badge animate-pulse-soft">
            <span className="badge-dot"></span>
            Tiers de confiance automobile certifié
          </div>
          
          <h1 className="hero-title">
            Vendre ou acheter votre véhicule d'occasion en <span className="text-gradient">toute sérénité</span>.
          </h1>
          
          <p className="hero-subtitle">
            Urban Driver gère tout de A à Z : estimation gratuite, sécurisation du paiement Banque de France, formalités carte grise et garantie 3 mois minimum. Vendez sous 15 jours avec +25% de gains supplémentaires.
          </p>

          <div className="hero-ctas">
            <button 
              className="btn btn-primary btn-lg" 
              onClick={() => onScrollToSection('estimation')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="btn-icon-svg">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Estimer mon véhicule
            </button>
            
            <button 
              className="btn btn-outline btn-lg" 
              onClick={() => onScrollToSection('marketplace')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="btn-icon-svg">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
                <line x1="15" y1="3" x2="15" y2="21" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="3" y1="15" x2="21" y2="15" />
              </svg>
              Explorer les voitures
            </button>
          </div>

          {/* Stats Bar */}
          <div className="hero-stats">
            <div className="stat-card">
              <span className="stat-value">15 jours</span>
              <span className="stat-label">Délai moyen de vente</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">0 €</span>
              <span className="stat-label">Service 100% gratuit</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">+25%</span>
              <span className="stat-label">De gains vs concession</span>
            </div>
          </div>
        </div>

        {/* Right Graphic Side */}
        <div className="hero-graphic">
          <div className="graphic-backdrop">
            <div className="glowing-circle"></div>
          </div>
          <img 
            src="/hero-car.png" 
            alt="Sleek electric luxury vehicle showcasing Urban Driver premium branding" 
            className="hero-image"
          />
          
          {/* Trust Floating Badge */}
          <div className="floating-badge badge-top-right glass-card">
            <div className="floating-badge-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <span className="badge-title">Paiement Garanti</span>
              <span className="badge-subtitle">Compte Séquestre Agréé</span>
            </div>
          </div>

          <div className="floating-badge badge-bottom-left glass-card">
            <div className="floating-badge-icon accent-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <span className="badge-title">Garantie NSA 3 Mois</span>
              <span className="badge-subtitle">Extension jusqu'à 3 ans</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding: 160px 0 100px;
          min-height: 90vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: radial-gradient(circle at 80% 20%, rgba(var(--primary-rgb), 0.05) 0%, transparent 50%);
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
        }

        @media (max-width: 992px) {
          .hero-section {
            padding: 120px 0 60px;
          }
          .hero-container {
            grid-template-columns: 1fr;
            gap: 50px;
            text-align: center;
          }
        }

        /* Left side content styles */
        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          z-index: 10;
        }

        @media (max-width: 992px) {
          .hero-content {
            align-items: center;
          }
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background-color: rgba(var(--primary-rgb), 0.12);
          border: 1px solid rgba(var(--primary-rgb), 0.25);
          color: var(--primary);
          border-radius: var(--radius-full);
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.85rem;
          margin-bottom: 24px;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background-color: var(--primary);
          border-radius: var(--radius-full);
          box-shadow: 0 0 8px var(--primary);
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -0.04em;
          margin-bottom: 20px;
          text-align: left;
        }

        @media (max-width: 992px) {
          .hero-title {
            text-align: center;
            font-size: 2.8rem;
          }
        }

        @media (max-width: 576px) {
          .hero-title {
            font-size: 2.2rem;
          }
        }

        .text-gradient {
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 36px;
          max-width: 600px;
          text-align: left;
        }

        @media (max-width: 992px) {
          .hero-subtitle {
            text-align: center;
            margin-inline: auto;
          }
        }

        .hero-ctas {
          display: flex;
          gap: 16px;
          margin-bottom: 48px;
          width: 100%;
        }

        @media (max-width: 992px) {
          .hero-ctas {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .hero-ctas {
            flex-direction: column;
            gap: 12px;
          }
        }

        .btn-lg {
          padding: 14px 28px;
          font-size: 1.05rem;
        }

        .btn-icon-svg {
          width: 20px;
          height: 20px;
        }

        /* Stats system */
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          width: 100%;
          border-top: 1px solid var(--border-light);
          padding-top: 32px;
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        @media (max-width: 992px) {
          .stat-card {
            align-items: center;
            text-align: center;
          }
        }

        .stat-value {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--primary);
          line-height: 1;
          margin-bottom: 6px;
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        /* Right side graphic styles */
        .hero-graphic {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
        }

        .graphic-backdrop {
          position: absolute;
          width: 110%;
          height: 110%;
          z-index: -1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .glowing-circle {
          width: 70%;
          height: 70%;
          background: radial-gradient(circle, rgba(var(--primary-rgb), 0.2) 0%, transparent 65%);
          border-radius: var(--radius-full);
          filter: blur(40px);
          animation: pulse-soft 6s infinite ease-in-out;
        }

        .hero-image {
          width: 100%;
          max-width: 520px;
          height: auto;
          filter: drop-shadow(0 15px 40px rgba(0, 0, 0, 0.2));
          animation: float 5s infinite ease-in-out;
          transform-style: preserve-3d;
        }

        /* Floating badges for modern aesthetic */
        .floating-badge {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 20px;
          border-radius: var(--radius-md);
          z-index: 12;
          width: 240px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          text-align: left;
        }

        .badge-top-right {
          top: 10%;
          right: -5%;
          animation: float 6s infinite ease-in-out;
        }

        .badge-bottom-left {
          bottom: 10%;
          left: -5%;
          animation: float 5.5s infinite ease-in-out;
        }

        @media (max-width: 1200px) {
          .badge-top-right {
            right: 0;
          }
          .badge-bottom-left {
            left: 0;
          }
        }

        @media (max-width: 576px) {
          .floating-badge {
            display: none;
          }
        }

        .floating-badge-icon {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          background-color: rgba(var(--success-rgb), 0.15);
          color: var(--success);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .floating-badge-icon.accent-icon {
          background-color: rgba(var(--accent-rgb), 0.15);
          color: var(--accent);
        }

        .floating-badge-icon svg {
          width: 20px;
          height: 20px;
        }

        .badge-title {
          display: block;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .badge-subtitle {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }
      `}</style>
    </section>
  );
};

export default Hero;
