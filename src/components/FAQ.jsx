import React, { useState } from 'react';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('vendre');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqData = {
    vendre: [
      {
        q: "Comment garantissez-vous le meilleur prix pour ma voiture ?",
        a: "En agissant comme un tiers de confiance collaboratif, nous éliminons les intermédiaires traditionnels et les marges élevées des concessionnaires. Vous vendez votre véhicule directement à un particulier qualifié, ce qui vous permet de récupérer en moyenne 25% de gains supplémentaires par rapport à une reprise classique."
      },
      {
        q: "Quels documents sont nécessaires pour vendre mon véhicule avec Urban Driver ?",
        a: "Pour finaliser la vente, vous devez fournir : la Carte grise du véhicule, un Certificat de situation administrative (non-gage) de moins de 15 jours, un Contrôle technique de moins de 6 mois (si le véhicule a plus de 4 ans), votre Pièce d'identité, un Justificatif de domicile de moins de 3 mois, ainsi que le carnet d'entretien et les factures associées."
      },
      {
        q: "Combien de temps faut-il pour vendre ma voiture ?",
        a: "La durée moyenne de vente sur notre réseau national est de 15 jours. Selon la demande sur votre modèle, la vente peut même être finalisée sous 24 à 48 heures. Une fois l'acheteur trouvé, nous sécurisons le paiement immédiatement."
      },
      {
        q: "Qui est propriétaire des véhicules en vente chez vous ?",
        a: "Tous les véhicules que nous proposons appartiennent à des particuliers qui nous confient leur vente, en dépôt physique ou virtuel. Urban Driver n'est pas propriétaire des véhicules, mais nous agissons comme tiers de confiance pour garantir une transaction de qualité professionnelle."
      }
    ],
    acheter: [
      {
        q: "Comment garantissez-vous la qualité et l'état des véhicules ?",
        a: "Chaque véhicule présenté sur notre plateforme subit une inspection rigoureuse sur 150 points de contrôle mécaniques et esthétiques. Nous certifions l'historique complet (factures d'entretien, rapports de sinistres). De plus, chaque voiture est livrée avec une garantie minimale de 3 mois NSA, extensible jusqu'à 36 mois."
      },
      {
        q: "Comment s'effectue le paiement de mon futur véhicule ?",
        a: "Pour exclure tout risque de fraude ou de chèque en bois, toutes les transactions passent par un compte séquestre sécurisé, géré par notre partenaire financier agréé par la Banque de France. Les fonds sont sécurisés en amont et libérés instantanément par virement bancaire lors de la remise des clés."
      },
      {
        q: "Proposez-vous des solutions de financement et de livraison ?",
        a: "Oui, absolument ! Tous nos véhicules sont éligibles à des solutions de financement sur-mesure (crédit classique, LOA) directement étudiées avec votre conseiller. De plus, nous disposons d'un service de livraison à domicile disponible partout en France et en Europe."
      },
      {
        q: "Comment se déroule la cession administrative et la carte grise ?",
        a: "Nous prenons en charge 100% des démarches administratives. Nous gérons la déclaration de cession en préfecture et effectuons la demande de nouvelle carte grise à votre place. Vous recevez vos documents officiels directement dans votre boîte aux lettres sous quelques jours."
      }
    ]
  };

  const handleToggle = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setExpandedIndex(null); // collapse all
  };

  return (
    <section id="faq" className="section faq-section">
      <div className="container">
        <div className="section-header">
          <h2>Des questions ? Nous avons les réponses</h2>
          <p>Retrouvez toutes les informations utiles pour vendre ou acheter votre véhicule d'occasion l'esprit tranquille.</p>
        </div>

        {/* Category Selector Tabs */}
        <div className="faq-tabs-container">
          <button 
            className={`faq-tab-btn ${activeCategory === 'vendre' ? 'tab-active' : ''}`}
            onClick={() => handleCategoryChange('vendre')}
          >
            Je souhaite VENDRE
          </button>
          <button 
            className={`faq-tab-btn ${activeCategory === 'acheter' ? 'tab-active' : ''}`}
            onClick={() => handleCategoryChange('acheter')}
          >
            Je souhaite ACHETER
          </button>
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-accordion-list">
          {faqData[activeCategory].map((faq, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div key={idx} className={`faq-accordion-item glass-card ${isExpanded ? 'item-expanded' : ''}`}>
                <button className="faq-question-btn" onClick={() => handleToggle(idx)}>
                  <span>{faq.q}</span>
                  <span className="faq-chevron-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
                <div className="faq-answer-wrapper" style={{ height: isExpanded ? 'auto' : '0px' }}>
                  <div className="faq-answer-content">
                    <p>{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .faq-section {
          background-color: var(--bg-tertiary);
        }

        .faq-tabs-container {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 40px;
        }

        .faq-tab-btn {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.05rem;
          padding: 14px 28px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-medium);
          background-color: var(--bg-secondary);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .faq-tab-btn:hover {
          color: var(--primary);
          border-color: var(--primary);
        }

        .tab-active {
          background-color: var(--primary);
          color: #ffffff !important;
          border-color: var(--primary);
          box-shadow: 0 4px 14px rgba(var(--primary-rgb), 0.3);
        }

        .faq-accordion-list {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .faq-accordion-item {
          padding: 0;
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: border-color var(--transition-fast);
        }

        .item-expanded {
          border-color: var(--primary);
        }

        .faq-question-btn {
          width: 100%;
          padding: 24px;
          background: none;
          border: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--text-primary);
          cursor: pointer;
          gap: 20px;
        }

        .faq-chevron-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: var(--radius-full);
          background-color: var(--bg-primary);
          color: var(--text-muted);
          transition: transform var(--transition-normal), background-color var(--transition-fast), color var(--transition-fast);
          flex-shrink: 0;
        }

        .faq-question-btn:hover .faq-chevron-icon {
          color: var(--primary);
          background-color: rgba(var(--primary-rgb), 0.1);
        }

        .item-expanded .faq-chevron-icon {
          transform: rotate(180deg);
          background-color: var(--primary);
          color: #ffffff !important;
        }

        .faq-answer-wrapper {
          overflow: hidden;
          transition: height var(--transition-normal) ease-in-out;
        }

        .faq-answer-content {
          padding: 0 24px 24px;
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          border-top: 1px solid var(--border-light);
          padding-top: 20px;
        }
      `}</style>
    </section>
  );
};

export default FAQ;
