import React, { useState } from 'react';

const ContactModal = ({ isOpen, onClose }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'estimation',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API Submission
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', phone: '', email: '', subject: 'estimation', message: '' });
      onClose();
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Fermer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {formSubmitted ? (
          <div className="modal-success">
            <div className="success-icon-wrapper">
              <svg className="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3>Message Envoyé !</h3>
            <p>Un conseiller Urban Driver va vous recontacter par téléphone dans un délai de 2 heures maximum pour étudier votre projet.</p>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <h2>Contacter un conseiller</h2>
              <p>Discutons de votre projet d'achat ou de vente de véhicule d'occasion. Notre accompagnement est 100% gratuit.</p>
              <div className="modal-contact-details" aria-label="Coordonnées Urban Driver">
                <a href="mailto:Accueil.urbandriver@gmail.com">Accueil.urbandriver@gmail.com</a>
                <a href="tel:+33756880819">+33 7 56 88 08 19</a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Nom complet</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jean Dupont"
                  className="form-control"
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Téléphone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="06 12 34 56 78"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jean.dupont@example.com"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="subject">Votre besoin</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="estimation">Estimer et vendre mon véhicule</option>
                  <option value="buy">Rechercher / Acheter une voiture</option>
                  <option value="partner">Devenir partenaire / franchise</option>
                  <option value="agent">Postuler comme agent commercial</option>
                  <option value="other">Autre demande</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Détails de votre demande (facultatif)</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Indiquez ici la marque, le modèle, ou tout autre détail pertinent..."
                  className="form-control text-area"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary submit-btn">
                Planifier un appel téléphonique
              </button>
            </form>
          </>
        )}
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn var(--transition-fast) forwards;
        }

        .modal-content {
          position: relative;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUp var(--transition-normal) forwards;
          border-radius: var(--radius-lg);
          padding: 40px;
        }

        .modal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .modal-close-btn:hover {
          color: var(--danger);
        }

        .modal-close-btn svg {
          width: 24px;
          height: 24px;
        }

        .modal-header {
          margin-bottom: 28px;
        }

        .modal-header h2 {
          font-size: 2rem;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .modal-header p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .modal-contact-details {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 18px;
          margin-top: 16px;
        }

        .modal-contact-details a {
          color: var(--primary);
          font-weight: 700;
          font-size: 0.95rem;
          overflow-wrap: anywhere;
        }

        .modal-contact-details a:hover {
          color: var(--accent);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 576px) {
          .form-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }

        .text-area {
          resize: vertical;
          min-height: 100px;
        }

        .submit-btn {
          width: 100%;
          padding: 16px;
          font-size: 1rem;
          margin-top: 10px;
        }

        /* Success screen styling */
        .modal-success {
          text-align: center;
          padding: 30px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        .success-icon-wrapper {
          width: 72px;
          height: 72px;
          border-radius: var(--radius-full);
          background-color: rgba(var(--success-rgb), 0.15);
          color: var(--success);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: scaleUp var(--transition-normal);
        }

        .success-icon {
          width: 36px;
          height: 36px;
        }

        .modal-success h3 {
          font-size: 1.8rem;
          color: var(--text-primary);
        }

        .modal-success p {
          color: var(--text-secondary);
          max-width: 420px;
          font-size: 1.05rem;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ContactModal;
