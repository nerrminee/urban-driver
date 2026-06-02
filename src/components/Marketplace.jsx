import React, { useState } from 'react';

const Marketplace = ({ onOpenContact, cars = [] }) => {
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedFuel, setSelectedFuel] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCar, setSelectedCar] = useState(null);

  // Filters logic
  const filteredCars = cars.filter(car => {
    const brandMatch = selectedBrand === 'all' || car.brand === selectedBrand;
    const fuelMatch = selectedFuel === 'all' || car.fuel === selectedFuel;
    return brandMatch && fuelMatch;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'mileage-asc') return a.mileage - b.mileage;
    return b.id - a.id; // default featured/recent
  });

  const brandsList = Array.from(new Set(cars.map(c => c.brand)));
  const fuelsList = Array.from(new Set(cars.map(c => c.fuel)));

  return (
    <section id="marketplace" className="section marketplace-section">
      <div className="container">
        <div className="section-header">
          <h2>Nos véhicules d'exception disponibles</h2>
          <p>Tous nos véhicules font l'objet d'une inspection rigoureuse sur 150 points de contrôle et disposent d'un historique 100% transparent.</p>
        </div>

        {/* Filters Controls Panel */}
        <div className="filters-container glass-card">
          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">Marque</label>
              <select 
                value={selectedBrand} 
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="form-control filter-select"
              >
                <option value="all">Toutes les marques</option>
                {brandsList.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Carburant</label>
              <select 
                value={selectedFuel} 
                onChange={(e) => setSelectedFuel(e.target.value)}
                className="form-control filter-select"
              >
                <option value="all">Toutes les énergies</option>
                {fuelsList.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Trier par</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="form-control filter-select"
              >
                <option value="featured">Sélection Urban Driver</option>
                <option value="price-asc">Prix : du moins cher</option>
                <option value="price-desc">Prix : du plus cher</option>
                <option value="mileage-asc">Kilométrage croissant</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cars Showcase Grid */}
        <div className="cars-grid">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <div key={car.id} className="car-card glass-card">
                {car.featured && <span className="featured-badge">Sélection Expert</span>}
                <div className="car-image-wrapper">
                  <img src={car.image} alt={`${car.brand} ${car.model}`} className="car-card-img" />
                </div>
                <div className="car-details">
                  <div className="car-header-row">
                    <h3 className="car-name-title">{car.brand} <span className="car-model-txt">{car.model}</span></h3>
                    <span className="car-price-tag">{car.price.toLocaleString()} €</span>
                  </div>
                  
                  <div className="car-specs-grid">
                    <span className="spec-badge">📅 {car.year}</span>
                    <span className="spec-badge">🏎️ {car.mileage.toLocaleString()} km</span>
                    <span className="spec-badge">⚡ {car.fuel}</span>
                    <span className="spec-badge">⚙️ {car.gearbox}</span>
                  </div>

                  <p className="car-specs-summary">{car.specs}</p>

                  <div className="car-footer-cta">
                    <div>
                      <span className="finance-lbl">Dès</span>
                      <span className="finance-amt">{car.monthly} €<span className="finance-month">/mois</span></span>
                    </div>
                    <button className="btn btn-primary" onClick={() => setSelectedCar(car)}>
                      Voir l'offre
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-cars-fallback glass-card">
              <span className="fallback-icon">🔍</span>
              <h3>Aucun véhicule ne correspond</h3>
              <p>Essayez de modifier vos filtres pour découvrir d'autres véhicules exceptionnels de notre réseau.</p>
              <button 
                className="btn btn-secondary" 
                onClick={() => { setSelectedBrand('all'); setSelectedFuel('all'); setSortBy('featured'); }}
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal Component */}
      {selectedCar && (
        <div className="modal-overlay" onClick={() => setSelectedCar(null)}>
          <div className="car-detail-modal-content glass-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedCar(null)} aria-label="Fermer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="modal-detail-grid">
              <div className="modal-detail-img-box">
                <img src={selectedCar.image} alt={`${selectedCar.brand} ${selectedCar.model}`} />
              </div>
              <div className="modal-detail-info">
                <span className="modal-badge">Garantie 3 Mois NSA Incluse</span>
                <h2>{selectedCar.brand} <span className="text-gradient">{selectedCar.model}</span></h2>
                <span className="modal-price">{selectedCar.price.toLocaleString()} €</span>
                
                <div className="modal-specs-grid">
                  <div className="m-spec">
                    <span className="m-spec-lbl">Année</span>
                    <span className="m-spec-val">{selectedCar.year}</span>
                  </div>
                  <div className="m-spec">
                    <span className="m-spec-lbl">Kilométrage</span>
                    <span className="m-spec-val">{selectedCar.mileage.toLocaleString()} km</span>
                  </div>
                  <div className="m-spec">
                    <span className="m-spec-lbl">Carburant</span>
                    <span className="m-spec-val">{selectedCar.fuel}</span>
                  </div>
                  <div className="m-spec">
                    <span className="m-spec-lbl">Boite de vitesse</span>
                    <span className="m-spec-val">{selectedCar.gearbox}</span>
                  </div>
                </div>

                <div className="modal-desc-box">
                  <h4>Équipements & Caractéristiques :</h4>
                  <p>{selectedCar.specs}</p>
                </div>

                <div className="modal-guarantees-list">
                  <div className="m-g-item">✓ Historique certifié (factures + rapports)</div>
                  <div className="m-g-item">✓ Inspection sur 150 points de contrôle</div>
                  <div className="m-g-item">✓ Éligible au financement et à la livraison</div>
                </div>

                <button 
                  className="btn btn-primary modal-cta-btn" 
                  onClick={() => { setSelectedCar(null); onOpenContact(); }}
                >
                  Réserver un essai / Contacter un conseiller
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .marketplace-section {
          background-color: var(--bg-primary);
        }

        /* Filter bar style */
        .filters-container {
          padding: 24px;
          margin-bottom: 40px;
          border-radius: var(--radius-md);
        }

        .filters-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        @media (max-width: 768px) {
          .filters-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .filter-label {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .filter-select {
          padding: 12px 16px;
          font-size: 0.95rem;
        }

        /* Cars display Grid */
        .cars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        @media (max-width: 992px) {
          .cars-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .cars-grid {
            grid-template-columns: 1fr;
          }
        }

        .car-card {
          position: relative;
          padding: 0;
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
          border-radius: var(--radius-lg);
          transition: transform var(--transition-normal), box-shadow var(--transition-normal);
        }

        .car-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
        }

        .featured-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background-color: var(--primary);
          color: #ffffff;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.75rem;
          padding: 6px 12px;
          border-radius: var(--radius-full);
          z-index: 10;
          box-shadow: 0 4px 10px rgba(var(--primary-rgb), 0.3);
        }

        .car-image-wrapper {
          position: relative;
          width: 100%;
          padding-top: 56.25%; /* 16:9 Aspect Ratio */
          background-color: var(--bg-tertiary);
          overflow: hidden;
        }

        .car-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-slow);
        }

        .car-card:hover .car-card-img {
          transform: scale(1.05);
        }

        .car-details {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          text-align: left;
        }

        .car-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 12px;
        }

        .car-name-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .car-model-txt {
          font-weight: 500;
          color: var(--text-secondary);
        }

        .car-price-tag {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--primary);
        }

        .car-specs-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }

        .spec-badge {
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-light);
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .car-specs-summary {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 24px;
          flex-grow: 1;
        }

        .car-footer-cta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border-light);
          padding-top: 18px;
          margin-top: auto;
        }

        .finance-lbl {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .finance-amt {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
        }

        .finance-month {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-muted);
        }

        .no-cars-fallback {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .fallback-icon {
          font-size: 3rem;
        }

        .no-cars-fallback p {
          color: var(--text-secondary);
          max-width: 400px;
          margin-bottom: 8px;
        }

        /* Detail Modal layout */
        .car-detail-modal-content {
          position: relative;
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUp var(--transition-normal) forwards;
          border-radius: var(--radius-lg);
          padding: 0px;
        }

        .modal-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        @media (max-width: 768px) {
          .modal-detail-grid {
            grid-template-columns: 1fr;
          }
        }

        .modal-detail-img-box {
          position: relative;
          background-color: var(--bg-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 320px;
        }

        .modal-detail-img-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-detail-info {
          padding: 40px;
          text-align: left;
        }

        @media (max-width: 576px) {
          .modal-detail-info {
            padding: 24px;
          }
        }

        .modal-badge {
          display: inline-block;
          background-color: rgba(var(--success-rgb), 0.12);
          border: 1px solid rgba(var(--success-rgb), 0.25);
          color: var(--success);
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.8rem;
          padding: 6px 12px;
          border-radius: var(--radius-full);
          margin-bottom: 16px;
        }

        .modal-detail-info h2 {
          font-size: 2.2rem;
          margin-bottom: 8px;
        }

        .modal-price {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--primary);
          display: block;
          margin-bottom: 24px;
        }

        .modal-specs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .m-spec {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-light);
          padding: 12px;
          border-radius: var(--radius-md);
        }

        .m-spec-lbl {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .m-spec-val {
          display: block;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        .modal-desc-box {
          margin-bottom: 24px;
        }

        .modal-desc-box h4 {
          font-size: 0.95rem;
          margin-bottom: 6px;
        }

        .modal-desc-box p {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .modal-guarantees-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 30px;
        }

        .m-g-item {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--success);
        }

        .modal-cta-btn {
          width: 100%;
          padding: 14px;
        }
      `}</style>
    </section>
  );
};

export default Marketplace;
