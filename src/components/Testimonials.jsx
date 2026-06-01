import React, { useState } from 'react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      name: 'Stéphane D.',
      role: 'Vendeur (Peugeot 3008)',
      avatar: '👨‍💼',
      stars: 5,
      comment: "Incroyable expérience ! J'ai obtenu 3 800 € de plus que l'offre de reprise de ma concession locale. Le paiement via le compte séquestre certifié m'a rassuré à 100%. Tout s'est fait de façon limpide et transparente.",
      badge: '+3 800 € de gain'
    },
    {
      name: 'Marie L.',
      role: 'Acheteuse (Tesla Model 3)',
      avatar: '👩‍💼',
      stars: 5,
      comment: "Acheter un véhicule d'occasion n'a jamais été aussi simple. L'inspection sur 150 points de contrôle et l'historique complet m'ont rassurée immédiatement. La garantie NSA de 3 mois offerte est un vrai plus !",
      badge: 'Achat serein'
    },
    {
      name: 'Thomas R.',
      role: 'Vendeur (Audi A4)',
      avatar: '👨‍💻',
      stars: 5,
      comment: "Le service clé en main est tout simplement fantastique. Un conseiller s'est occupé de rédiger l'annonce, de répondre aux appels et d'organiser les visites à ma place. Voiture vendue en seulement 11 jours !",
      badge: 'Vendu en 11 jours'
    }
  ];

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="section testimonials-section">
      {/* Glowing Backdrop */}
      <div className="glowing-bg glowing-primary" style={{ top: '20%', left: '50%' }}></div>

      <div className="container">
        <div className="section-header">
          <h2>Ils parlent de nous</h2>
          <p>Découvrez les retours d'expérience de nos clients acheteurs et vendeurs qui nous font confiance.</p>
        </div>

        <div className="testimonial-slider-container glass-card">
          <div className="testimonial-slides">
            {reviews.map((r, idx) => (
              <div 
                key={idx} 
                className={`testimonial-slide-card ${idx === activeIndex ? 'slide-active' : ''}`}
                style={{ display: idx === activeIndex ? 'block' : 'none' }}
              >
                <div className="review-badge-highlight">{r.badge}</div>
                <div className="review-rating-row">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <span key={i} className="star-icon">⭐</span>
                  ))}
                </div>
                <p className="review-comment-txt">« {r.comment} »</p>
                
                <div className="reviewer-info-row">
                  <div className="reviewer-avatar">{r.avatar}</div>
                  <div className="reviewer-meta">
                    <span className="reviewer-name">{r.name}</span>
                    <span className="reviewer-role">{r.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Navigation controls */}
          <div className="slider-navigation-row">
            <button className="btn-icon slider-nav-btn" onClick={handlePrev} aria-label="Précédent">
              ←
            </button>
            <div className="slider-dots">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  className={`slider-dot ${idx === activeIndex ? 'dot-active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Slide ${idx + 1}`}
                ></button>
              ))}
            </div>
            <button className="btn-icon slider-nav-btn" onClick={handleNext} aria-label="Suivant">
              →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .testimonials-section {
          background-color: var(--bg-primary);
        }

        .testimonial-slider-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 60px;
          border-radius: var(--radius-lg);
          text-align: center;
          position: relative;
        }

        @media (max-width: 576px) {
          .testimonial-slider-container {
            padding: 30px 20px;
          }
        }

        .testimonial-slides {
          min-height: 280px;
        }

        .review-badge-highlight {
          display: inline-block;
          background-color: rgba(var(--primary-rgb), 0.1);
          color: var(--primary);
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.85rem;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          margin-bottom: 20px;
        }

        .review-rating-row {
          display: flex;
          justify-content: center;
          gap: 4px;
          margin-bottom: 24px;
        }

        .star-icon {
          font-size: 1.2rem;
        }

        .review-comment-txt {
          font-size: 1.25rem;
          color: var(--text-primary);
          line-height: 1.7;
          font-weight: 500;
          font-style: italic;
          margin-bottom: 30px;
        }

        @media (max-width: 576px) {
          .review-comment-txt {
            font-size: 1.05rem;
          }
        }

        .reviewer-info-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
        }

        .reviewer-avatar {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-full);
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
        }

        .reviewer-meta {
          text-align: left;
        }

        .reviewer-name {
          display: block;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-primary);
        }

        .reviewer-role {
          display: block;
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        /* Nav controls style */
        .slider-navigation-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          margin-top: 40px;
          border-top: 1px solid var(--border-light);
          padding-top: 30px;
        }

        .slider-nav-btn {
          font-size: 1.1rem;
          font-weight: bold;
        }

        .slider-dots {
          display: flex;
          gap: 10px;
        }

        .slider-dot {
          width: 10px;
          height: 10px;
          border-radius: var(--radius-full);
          background-color: var(--border-medium);
          border: none;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .dot-active {
          background-color: var(--primary);
          width: 24px;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
