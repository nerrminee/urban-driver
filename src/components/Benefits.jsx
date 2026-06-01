import React from 'react';

const Benefits = () => {
  const benefits = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4l3 3" />
        </svg>
      ),
      title: 'Vendue sous 15 jours',
      desc: 'C\'est la durée moyenne observée sur notre réseau national pour vendre votre véhicule au prix optimisé.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      title: 'Paiement 100% garanti',
      desc: 'Comme chez le notaire, les fonds transitent par un compte séquestre sécurisé agréé par la Banque de France.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
      title: '+25% de gains en moyenne',
      desc: 'Notre modèle collaboratif nous permet de vous restituer jusqu\'à 25% de valeur en plus qu\'une reprise en concession.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: 'Garantie NSA incluse',
      desc: 'Chaque véhicule bénéficie d\'une garantie mécanique moteur-boîte-pont de 3 mois, extensible jusqu\'à 3 ans.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      title: 'Gestion 100% clé en main',
      desc: 'De la prise de clichés professionnels aux formalités d\'immatriculation en passant par la négociation : on gère tout.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      title: 'Frais de service : 0 €',
      desc: 'Notre accompagnement, l\'évaluation à domicile et la publication de l\'annonce sont totalement gratuits pour le vendeur.'
    }
  ];

  return (
    <section id="benefits" className="section benefits-section">
      <div className="container">
        <div className="section-header">
          <h2>Pourquoi choisir Urban Driver ?</h2>
          <p>Nous combinons la rapidité d'un concessionnaire avec le meilleur prix d'une vente de particulier à particulier, la sécurité en plus.</p>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="benefit-card glass-card">
              <div className="benefit-icon-wrapper">
                {benefit.icon}
              </div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-desc">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .benefits-section {
          background-color: var(--bg-primary);
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        @media (max-width: 992px) {
          .benefits-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .benefits-grid {
            grid-template-columns: 1fr;
          }
        }

        .benefit-card {
          text-align: left;
          padding: 36px;
          border-radius: var(--radius-lg);
          transition: transform var(--transition-normal), box-shadow var(--transition-normal);
        }

        .benefit-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
        }

        .benefit-icon-wrapper {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          background-color: rgba(var(--primary-rgb), 0.1);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          transition: all var(--transition-fast);
        }

        .benefit-card:hover .benefit-icon-wrapper {
          background-color: var(--primary);
          color: #ffffff;
          transform: scale(1.05);
        }

        .benefit-icon-wrapper svg {
          width: 26px;
          height: 26px;
        }

        .benefit-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .benefit-desc {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }
      `}</style>
    </section>
  );
};

export default Benefits;
