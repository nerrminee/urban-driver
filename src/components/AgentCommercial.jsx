import React, { useState } from 'react';

const AgentCommercial = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [applied, setApplied] = useState(false);
  const [application, setApplication] = useState({
    name: '',
    phone: '',
    city: '',
    experience: 'debutant',
    motivation: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      setApplication({ name: '', phone: '', city: '', experience: 'debutant', motivation: '' });
      setModalOpen(false);
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplication(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="recruitment" className="section recruitment-section">
      <div className="container">
        <div className="recruitment-banner-card glass-card">
          <div className="glowing-bg glowing-primary" style={{ top: '-10%', right: '5%' }}></div>
          
          <div className="recruitment-grid">
            <div className="recruitment-info">
              <span className="recruitment-badge animate-pulse-soft">Opportunité de Carrière</span>
              <h2 className="recruitment-title">Devenez Agent Commercial <span className="text-gradient">Urban Driver</span></h2>
              <p className="recruitment-subtitle">
                Rejoignez un modèle éprouvé et performant depuis plus de 10 ans. Bénéficiez d'un statut indépendant, d'une formation initiale et d'un accompagnement terrain sur-mesure. Aucun investissement de départ requis.
              </p>
              
              <div className="benefits-points-list">
                <div className="benefit-point">
                  <span className="point-icon">💶</span>
                  <div>
                    <strong>Rémunération Attractive</strong>
                    <span>Démarrage moyen à 2 500 €/mois, et jusqu'à 8 000 à 15 000 €/mois pour nos meilleurs agents commerciaux.</span>
                  </div>
                </div>
                
                <div className="benefit-point">
                  <span className="point-icon">🎓</span>
                  <div>
                    <strong>Formation Initiale & Continue</strong>
                    <span>Formation théorique complète et immersion terrain gratuite pour maîtriser nos outils d'évaluation automobile.</span>
                  </div>
                </div>

                <div className="benefit-point">
                  <span className="point-icon">🎯</span>
                  <div>
                    <strong>Outils Digitaux & Leads Fournis</strong>
                    <span>Accédez à notre plateforme d'estimation exclusive et recevez quotidiennement des demandes de vendeurs qualifiés.</span>
                  </div>
                </div>
              </div>

              <button className="btn btn-primary btn-lg recruitment-cta" onClick={() => setModalOpen(true)}>
                Je veux postuler →
              </button>
            </div>

            <div className="recruitment-visual">
              <div className="recruitment-card-glowing glass-card">
                <span className="career-metric-val">2 500 €</span>
                <span className="career-metric-lbl">Démarrage Moyen</span>
                <div className="ticks-decoration" style={{ margin: '16px 0' }}></div>
                <span className="career-metric-val highlight-val">15 000 €</span>
                <span className="career-metric-lbl">Objectif Top Agent</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recruitment Modal Overlay */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setModalOpen(false)} aria-label="Fermer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {applied ? (
              <div className="modal-success">
                <div className="success-icon-wrapper">
                  <svg className="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3>Candidature Reçue !</h3>
                <p>Merci pour votre intérêt envers Urban Driver. Notre responsable du recrutement étudie votre profil et vous recontactera sous 48 heures.</p>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <h2>Postuler comme Agent Commercial</h2>
                  <p>Rejoignez le réseau leader de l'achat/vente d'occasion entre particuliers en complétant ce court formulaire.</p>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                  <div className="form-group">
                    <label className="form-label" htmlFor="rec-name">Nom complet</label>
                    <input
                      type="text"
                      id="rec-name"
                      name="name"
                      required
                      value={application.name}
                      onChange={handleChange}
                      placeholder="Alice Bernard"
                      className="form-control"
                    />
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label" htmlFor="rec-phone">Téléphone</label>
                      <input
                        type="tel"
                        id="rec-phone"
                        name="phone"
                        required
                        value={application.phone}
                        onChange={handleChange}
                        placeholder="06 98 76 54 32"
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="rec-city">Ville de résidence</label>
                      <input
                        type="text"
                        id="rec-city"
                        name="city"
                        required
                        value={application.city}
                        onChange={handleChange}
                        placeholder="Lyon, Paris, Marseille..."
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="rec-exp">Niveau d'expérience commerciale</label>
                    <select
                      id="rec-exp"
                      name="experience"
                      value={application.experience}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="debutant">Débutant (formation complète requise)</option>
                      <option value="intermediaire">1 à 3 ans d'expérience</option>
                      <option value="expert">Plus de 3 ans d'expérience / Profil Senior</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="rec-motivation">Pourquoi voulez-vous nous rejoindre ?</label>
                    <textarea
                      id="rec-motivation"
                      name="motivation"
                      rows="4"
                      required
                      value={application.motivation}
                      onChange={handleChange}
                      placeholder="Décrivez brièvement vos motivations et votre parcours commercial..."
                      className="form-control text-area"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary submit-btn">
                    Envoyer ma candidature
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        .recruitment-section {
          background-color: var(--bg-primary);
        }

        .recruitment-banner-card {
          padding: 60px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          position: relative;
        }

        @media (max-width: 768px) {
          .recruitment-banner-card {
            padding: 30px 20px;
          }
        }

        .recruitment-grid {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 60px;
          align-items: center;
        }

        @media (max-width: 992px) {
          .recruitment-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .recruitment-info {
          text-align: left;
        }

        .recruitment-badge {
          display: inline-flex;
          align-items: center;
          padding: 6px 12px;
          background-color: rgba(var(--accent-rgb), 0.12);
          border: 1px solid rgba(var(--accent-rgb), 0.25);
          color: var(--accent);
          border-radius: var(--radius-full);
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.8rem;
          margin-bottom: 20px;
        }

        .recruitment-title {
          font-size: 2.5rem;
          margin-bottom: 16px;
        }

        .recruitment-subtitle {
          color: var(--text-secondary);
          margin-bottom: 30px;
          font-size: 1.05rem;
          line-height: 1.6;
        }

        .benefits-points-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 36px;
        }

        .benefit-point {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .point-icon {
          font-size: 1.5rem;
          background-color: var(--bg-tertiary);
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid var(--border-light);
        }

        .benefit-point strong {
          display: block;
          font-family: var(--font-heading);
          font-size: 1rem;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .benefit-point span {
          display: block;
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .recruitment-cta {
          padding: 14px 28px;
        }

        /* Right recruitment graphic stats */
        .recruitment-visual {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .recruitment-card-glowing {
          width: 100%;
          max-width: 300px;
          padding: 30px;
          border-radius: var(--radius-lg);
          background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.05) 0%, rgba(var(--accent-rgb), 0.05) 100%);
          border-color: rgba(var(--primary-rgb), 0.15);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          text-align: center;
          animation: float 6s infinite ease-in-out;
        }

        .career-metric-val {
          display: block;
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 900;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .career-metric-lbl {
          display: block;
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 4px;
        }

        .highlight-val {
          color: var(--accent);
          font-size: 2.5rem;
          text-shadow: 0 0 15px rgba(var(--accent-rgb), 0.3);
        }
      `}</style>
    </section>
  );
};

export default AgentCommercial;
