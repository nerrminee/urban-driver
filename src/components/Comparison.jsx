import React from 'react';

const Comparison = () => {
  const criteria = [
    {
      name: 'Vitesse de vente',
      partner: { val: '14 jours (Moyenne)', success: true },
      alone: { val: 'Plusieurs mois', success: false },
      dealer: { val: '2-3 heures', success: true }
    },
    {
      name: 'Prix de vente obtenu',
      partner: { val: 'Optimisé (+25% vs Concession)', success: true },
      alone: { val: 'Moyen (négociations rudes)', success: false },
      dealer: { val: 'Très faible (-25% de décote)', success: false }
    },
    {
      name: 'Sécurité de paiement',
      partner: { val: '100% sécurisé (Banque de France)', success: true },
      alone: { val: 'Risqué (chèques sans provision, fraudes)', success: false },
      dealer: { val: 'Garanti', success: true }
    },
    {
      name: 'Gestion administrative',
      partner: { val: 'Clé en main (Urban Driver gère tout)', success: true },
      alone: { val: 'Fastidieuse (à votre charge)', success: false },
      dealer: { val: 'Prise en charge', success: true }
    },
    {
      name: 'Garantie acheteur',
      partner: { val: 'Garantie NSA 3 à 36 mois incluse', success: true },
      alone: { val: 'Aucune garantie (risques de vices cachés)', success: false },
      dealer: { val: 'Inclus (souvent payant)', success: true }
    }
  ];

  return (
    <section id="how-it-works" className="section comparison-section">
      <div className="container">
        <div className="section-header">
          <h2>Où est-il plus rentable de vendre son véhicule ?</h2>
          <p>Découvrez comment se positionne notre accompagnement face aux canaux de vente traditionnels.</p>
        </div>

        <div className="comparison-table-wrapper glass-card">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="criteria-header-cell">Critères</th>
                <th className="brand-header-cell">
                  <div className="brand-header-badge">Urban Driver</div>
                </th>
                <th>Vente seul</th>
                <th>Reprise concession</th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((c, idx) => (
                <tr key={idx}>
                  <td className="criteria-cell">{c.name}</td>
                  <td className="brand-cell">
                    <span className="cell-indicator-icon">✓</span>
                    {c.partner.val}
                  </td>
                  <td className="other-cell">
                    <span className={`cell-indicator-icon ${c.alone.success ? 'text-success' : 'text-danger'}`}>
                      {c.alone.success ? '✓' : '✗'}
                    </span>
                    {c.alone.val}
                  </td>
                  <td className="other-cell">
                    <span className={`cell-indicator-icon ${c.dealer.success ? 'text-success' : 'text-danger'}`}>
                      {c.dealer.success ? '✓' : '✗'}
                    </span>
                    {c.dealer.val}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .comparison-section {
          background-color: var(--bg-tertiary);
        }

        .comparison-table-wrapper {
          padding: 0;
          overflow-x: auto;
          border-radius: var(--radius-lg);
        }

        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.95rem;
        }

        .comparison-table th, .comparison-table td {
          padding: 24px 30px;
          border-bottom: 1px solid var(--border-light);
        }

        .comparison-table th {
          font-family: var(--font-heading);
          font-weight: 700;
          color: var(--text-primary);
          background-color: var(--bg-secondary);
        }

        .criteria-header-cell {
          width: 25%;
        }

        .brand-header-cell {
          width: 38%;
          background-color: rgba(var(--primary-rgb), 0.04) !important;
          border-bottom: 2px solid var(--primary) !important;
        }

        .brand-header-badge {
          display: inline-block;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.15rem;
          color: var(--primary);
        }

        .criteria-cell {
          font-weight: 700;
          color: var(--text-primary);
          background-color: var(--bg-secondary);
        }

        .brand-cell {
          font-weight: 600;
          color: var(--text-primary);
          background-color: rgba(var(--primary-rgb), 0.02);
          border-left: 1px solid rgba(var(--primary-rgb), 0.08);
          border-right: 1px solid rgba(var(--primary-rgb), 0.08);
        }

        .cell-indicator-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: var(--radius-full);
          margin-right: 10px;
          font-weight: bold;
        }

        .brand-cell .cell-indicator-icon {
          color: var(--primary);
          background-color: rgba(var(--primary-rgb), 0.12);
        }

        .other-cell {
          color: var(--text-secondary);
        }

        .text-success {
          color: var(--success);
          background-color: rgba(var(--success-rgb), 0.12);
        }

        .text-danger {
          color: var(--danger);
          background-color: rgba(239, 68, 68, 0.12);
        }

        @media (max-width: 768px) {
          .comparison-table th, .comparison-table td {
            padding: 16px 20px;
            font-size: 0.85rem;
          }
          .brand-header-badge {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Comparison;
