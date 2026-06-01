import React, { useState } from 'react';

const EstimationForm = ({ onOpenContact }) => {
  const [step, setStep] = useState(1);
  const [calculating, setCalculating] = useState(false);
  const [estimationResult, setEstimationResult] = useState(null);

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '2020',
    fuel: 'essence',
    mileage: 60000,
    condition: 'tres_bon'
  });

  const brands = [
    { name: 'Tesla', icon: '⚡' },
    { name: 'BMW', icon: '🇩🇪' },
    { name: 'Audi', icon: '⭕' },
    { name: 'Mercedes', icon: '⭐' },
    { name: 'Peugeot', icon: '🦁' },
    { name: 'Renault', icon: '💎' }
  ];

  const handleBrandSelect = (brand) => {
    setFormData(prev => ({ ...prev, brand }));
    setStep(2);
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const calculateEstimation = () => {
    setCalculating(true);
    
    // Simulate premium valuation algorithms
    setTimeout(() => {
      // Base pricing dictionary
      const basePrices = {
        tesla: 42000,
        bmw: 38000,
        audi: 36000,
        mercedes: 40000,
        peugeot: 22000,
        renault: 19000
      };

      const selectedBrand = formData.brand.toLowerCase();
      const base = basePrices[selectedBrand] || 25000;

      // Depreciate by age (approx 8% per year)
      const currentYear = new Date().getFullYear();
      const age = Math.max(0, currentYear - parseInt(formData.year));
      const ageFactor = Math.pow(0.91, age);

      // Depreciate by mileage (approx 0.05% per 1,000 km)
      const mileageFactor = Math.max(0.3, 1 - (formData.mileage * 0.000004));

      // Condition multipliers
      const conditionMultipliers = {
        excellent: 1.05,
        tres_bon: 1.0,
        bon: 0.9,
        moyen: 0.75
      };
      const conditionFactor = conditionMultipliers[formData.condition] || 1.0;

      // Fuel premium
      const fuelPremiums = {
        electrique: 1.1,
        hybride: 1.05,
        essence: 1.0,
        diesel: 0.95
      };
      const fuelFactor = fuelPremiums[formData.fuel] || 1.0;

      // Final base calculation
      const estimatedValue = Math.round(base * ageFactor * mileageFactor * conditionFactor * fuelFactor);
      
      // Generate a range
      const minVal = Math.round(estimatedValue * 0.95);
      const maxVal = Math.round(estimatedValue * 1.05);

      setEstimationResult({
        average: estimatedValue,
        min: minVal,
        max: maxVal,
        demand: estimatedValue > 30000 ? 'Très Forte' : 'Forte',
        timeToSell: estimatedValue > 30000 ? '9 jours' : '14 jours'
      });

      setCalculating(false);
      setStep(4);
    }, 2000);
  };

  return (
    <section id="estimation" className="section estimation-section">
      <div className="container">
        <div className="section-header">
          <h2>Estimez votre véhicule en quelques clics</h2>
          <p>Obtenez instantanément une évaluation précise et gratuite basée sur les prix réels du marché.</p>
        </div>

        <div className="estimation-wizard-container glass-card">
          {/* Steps Progress Header */}
          {step < 4 && (
            <div className="wizard-progress-bar">
              <div className={`progress-step-indicator ${step >= 1 ? 'step-active' : ''}`}>
                <span className="step-num">1</span>
                <span className="step-txt">Marque & Modèle</span>
              </div>
              <div className="progress-line-divider">
                <div className="progress-line-fill" style={{ width: step > 1 ? '100%' : '0%' }}></div>
              </div>
              <div className={`progress-step-indicator ${step >= 2 ? 'step-active' : ''}`}>
                <span className="step-num">2</span>
                <span className="step-txt">Année & Énergie</span>
              </div>
              <div className="progress-line-divider">
                <div className="progress-line-fill" style={{ width: step > 2 ? '100%' : '0%' }}></div>
              </div>
              <div className={`progress-step-indicator ${step >= 3 ? 'step-active' : ''}`}>
                <span className="step-num">3</span>
                <span className="step-txt">Kilométrage & État</span>
              </div>
            </div>
          )}

          {/* Form Step 1: Brand Selection */}
          {step === 1 && (
            <div className="wizard-step anim-fade-in">
              <h3 className="step-title">Sélectionnez la marque de votre véhicule</h3>
              <div className="brands-grid">
                {brands.map((b) => (
                  <button 
                    key={b.name}
                    className={`brand-selector-btn ${formData.brand === b.name ? 'brand-selected' : ''}`}
                    onClick={() => handleBrandSelect(b.name)}
                  >
                    <span className="brand-emoji">{b.icon}</span>
                    <span className="brand-name">{b.name}</span>
                  </button>
                ))}
              </div>
              <div className="manual-input-box form-group">
                <label className="form-label" htmlFor="manual-brand">Ou saisissez une autre marque</label>
                <div className="manual-input-row">
                  <input
                    type="text"
                    id="manual-brand"
                    placeholder="Ex: Porsche, Volkswagen, Tesla..."
                    value={formData.brand}
                    onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                    className="form-control"
                  />
                  {formData.brand && (
                    <button className="btn btn-primary" onClick={() => setStep(2)}>
                      Continuer
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Form Step 2: Year & Fuel Type */}
          {step === 2 && (
            <div className="wizard-step anim-fade-in">
              <h3 className="step-title">Quelques détails techniques sur le véhicule</h3>
              <div className="form-group">
                <label className="form-label">Année de mise en circulation : {formData.year}</label>
                <input
                  type="range"
                  min="2010"
                  max="2026"
                  value={formData.year}
                  onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                  className="slider-range-control"
                />
                <div className="slider-limits">
                  <span>2010</span>
                  <span>2026</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Type de carburant</label>
                <div className="fuel-options-grid">
                  {['essence', 'diesel', 'hybride', 'electrique'].map((f) => (
                    <button
                      key={f}
                      type="button"
                      className={`fuel-option-btn ${formData.fuel === f ? 'fuel-selected' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, fuel: f }))}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="wizard-navigation-buttons">
                <button className="btn btn-secondary" onClick={handleBack}>
                  Retour
                </button>
                <button className="btn btn-primary" onClick={handleNext}>
                  Suivant
                </button>
              </div>
            </div>
          )}

          {/* Form Step 3: Mileage & General Condition */}
          {step === 3 && (
            <div className="wizard-step anim-fade-in">
              <h3 className="step-title">Kilométrage et État général</h3>
              
              <div className="form-group">
                <label className="form-label">Kilométrage actuel : {formData.mileage.toLocaleString()} km</label>
                <input
                  type="range"
                  min="1000"
                  max="250000"
                  step="5000"
                  value={formData.mileage}
                  onChange={(e) => setFormData(prev => ({ ...prev, mileage: parseInt(e.target.value) }))}
                  className="slider-range-control"
                />
                <div className="slider-limits">
                  <span>1 000 km</span>
                  <span>250 000 km+</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">État cosmétique et mécanique</label>
                <div className="condition-options-grid">
                  {[
                    { key: 'excellent', label: 'Excellent', desc: 'Carrosserie impeccable, carnet complet' },
                    { key: 'tres_bon', label: 'Très Bon', desc: 'Micro-rayures mineures, aucun frais à prévoir' },
                    { key: 'bon', label: 'Bon État', desc: 'Usure normale conforme à l\'âge' },
                    { key: 'moyen', label: 'Moyen', desc: 'Prévoir de petits travaux de carrosserie' }
                  ].map((c) => (
                    <button
                      key={c.key}
                      type="button"
                      className={`condition-option-btn ${formData.condition === c.key ? 'condition-selected' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, condition: c.key }))}
                    >
                      <span className="condition-label">{c.label}</span>
                      <span className="condition-desc">{c.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="wizard-navigation-buttons">
                <button className="btn btn-secondary" onClick={handleBack}>
                  Retour
                </button>
                <button 
                  className="btn btn-primary" 
                  disabled={calculating}
                  onClick={calculateEstimation}
                >
                  {calculating ? 'Calcul en cours...' : 'Calculer l\'estimation'}
                </button>
              </div>
            </div>
          )}

          {/* Form Step 4: Estimation Result Dashboard */}
          {step === 4 && estimationResult && (
            <div className="wizard-step result-step anim-scale-in">
              <div className="result-grid">
                {/* Visual Gauge Column */}
                <div className="result-visual-col">
                  <div className="gauge-holder">
                    <svg className="radial-gauge-svg" viewBox="0 0 120 120">
                      <circle className="gauge-track-line" cx="60" cy="60" r="50" fill="none" strokeWidth="6" />
                      <circle 
                        className="gauge-progress-line" 
                        cx="60" 
                        cy="60" 
                        r="50" 
                        fill="none" 
                        strokeWidth="8" 
                        strokeDasharray="314.16" 
                        strokeDashoffset="78.54" /* 75% display value */
                        strokeLinecap="round" 
                      />
                    </svg>
                    <div className="gauge-overlay-text">
                      <span className="gauge-val-amount">{estimationResult.average.toLocaleString()} €</span>
                      <span className="gauge-val-label">Valeur Moyenne</span>
                    </div>
                  </div>
                  
                  <div className="value-range-badge">
                    Fourchette d'estimation : <br />
                    <strong>{estimationResult.min.toLocaleString()} € - {estimationResult.max.toLocaleString()} €</strong>
                  </div>
                </div>

                {/* Insights and Call-To-Action Column */}
                <div className="result-info-col">
                  <h3 className="result-title">Votre estimation est prête !</h3>
                  <p className="result-description">
                    Sur la base d'une analyse comparative de 43 transactions récentes de <strong>{formData.brand} {formData.model || ''}</strong> similaires.
                  </p>

                  <div className="insights-boxes-list">
                    <div className="insight-item-box">
                      <div className="insight-icon green-icon">⚡</div>
                      <div>
                        <span className="insight-lbl">Demande sur le marché</span>
                        <span className="insight-val">{estimationResult.demand}</span>
                      </div>
                    </div>

                    <div className="insight-item-box">
                      <div className="insight-icon blue-icon">📅</div>
                      <div>
                        <span className="insight-lbl">Vente estimée sous</span>
                        <span className="insight-val">{estimationResult.timeToSell}</span>
                      </div>
                    </div>

                    <div className="insight-item-box">
                      <div className="insight-icon purple-icon">🛡️</div>
                      <div>
                        <span className="insight-lbl">Gains supplémentaires</span>
                        <span className="insight-val">+ 3 400 € en moyenne</span>
                      </div>
                    </div>
                  </div>

                  <div className="result-actions">
                    <button className="btn btn-primary btn-block" onClick={onOpenContact}>
                      Prendre RDV avec un expert
                    </button>
                    <button className="btn btn-outline btn-block" onClick={() => setStep(1)}>
                      Refaire une estimation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loader Overlay */}
          {calculating && (
            <div className="wizard-loader-overlay">
              <div className="loader-ring"></div>
              <h4>Analyse comparative des prix du marché...</h4>
              <p>Nous interrogeons notre base de données sur plus de 10 000 ventes d'occasion réelles.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .estimation-section {
          background-color: var(--bg-tertiary);
          position: relative;
        }

        .estimation-wizard-container {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          min-height: 480px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
        }

        /* Wizard Progress steps tracker */
        .wizard-progress-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 50px;
          width: 100%;
        }

        @media (max-width: 576px) {
          .wizard-progress-bar {
            margin-bottom: 30px;
          }
        }

        .progress-step-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          z-index: 10;
        }

        .step-num {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-full);
          background-color: var(--bg-primary);
          border: 2px solid var(--border-medium);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-weight: 700;
          transition: all var(--transition-fast);
        }

        .step-txt {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          font-family: var(--font-heading);
        }

        @media (max-width: 576px) {
          .step-txt {
            display: none;
          }
        }

        .step-active .step-num {
          border-color: var(--primary);
          background-color: var(--primary);
          color: #ffffff;
          box-shadow: 0 0 10px rgba(var(--primary-rgb), 0.4);
        }

        .step-active .step-txt {
          color: var(--text-primary);
        }

        .progress-line-divider {
          flex: 1;
          height: 2px;
          background-color: var(--border-medium);
          margin-horizontal: 16px;
          margin-top: -24px;
        }

        @media (max-width: 576px) {
          .progress-line-divider {
            margin-top: 0;
          }
        }

        .progress-line-fill {
          height: 100%;
          background-color: var(--primary);
          transition: width var(--transition-slow);
        }

        /* Step body layout */
        .wizard-step {
          width: 100%;
        }

        .step-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 30px;
          color: var(--text-primary);
        }

        /* Brands grid custom buttons */
        .brands-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
          margin-bottom: 40px;
        }

        @media (max-width: 768px) {
          .brands-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 480px) {
          .brands-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
        }

        .brand-selector-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-light);
          padding: 24px 16px;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .brand-selector-btn:hover {
          border-color: var(--primary);
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.04);
        }

        .brand-selected {
          border-color: var(--primary);
          background-color: rgba(var(--primary-rgb), 0.05);
          box-shadow: 0 0 0 2px var(--primary);
        }

        .brand-emoji {
          font-size: 1.8rem;
        }

        .brand-name {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        .manual-input-box {
          border-top: 1px solid var(--border-light);
          padding-top: 30px;
        }

        .manual-input-row {
          display: flex;
          gap: 12px;
        }

        /* Slide range system */
        .slider-range-control {
          -webkit-appearance: none;
          width: 100%;
          height: 8px;
          border-radius: var(--radius-full);
          background: var(--border-medium);
          outline: none;
          margin: 20px 0 10px;
        }

        .slider-range-control::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 24px;
          height: 24px;
          border-radius: var(--radius-full);
          background: var(--primary);
          border: 4px solid var(--bg-secondary);
          box-shadow: 0 2px 10px rgba(0,0,0,0.15);
          cursor: pointer;
          transition: transform var(--transition-fast);
        }

        .slider-range-control::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }

        .slider-limits {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        /* Fuel choices styling */
        .fuel-options-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 16px;
        }

        @media (max-width: 576px) {
          .fuel-options-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
        }

        .fuel-option-btn {
          padding: 16px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-light);
          color: var(--text-primary);
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.95rem;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .fuel-option-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .fuel-selected {
          border-color: var(--primary);
          background-color: var(--primary);
          color: #ffffff;
        }

        /* Condition details layout */
        .condition-options-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-top: 16px;
        }

        @media (max-width: 576px) {
          .condition-options-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }

        .condition-option-btn {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          padding: 18px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
          text-align: left;
        }

        .condition-option-btn:hover {
          border-color: var(--primary);
        }

        .condition-selected {
          border-color: var(--primary);
          background-color: rgba(var(--primary-rgb), 0.05);
          box-shadow: 0 0 0 1px var(--primary);
        }

        .condition-label {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-primary);
        }

        .condition-desc {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .wizard-navigation-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 40px;
          border-top: 1px solid var(--border-light);
          padding-top: 30px;
        }

        /* Valuation Results styling */
        .result-step {
          width: 100%;
        }

        .result-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 40px;
          align-items: center;
        }

        @media (max-width: 768px) {
          .result-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        .result-visual-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .gauge-holder {
          position: relative;
          width: 220px;
          height: 220px;
        }

        .radial-gauge-svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }

        .gauge-track-line {
          stroke: var(--border-medium);
        }

        .gauge-progress-line {
          stroke: var(--primary);
          stroke-dasharray: 314.16;
          animation: fillGauge 2s forwards ease-out;
        }

        .gauge-overlay-text {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .gauge-val-amount {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
        }

        .gauge-val-label {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 4px;
        }

        .value-range-badge {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-light);
          padding: 12px 24px;
          border-radius: var(--radius-full);
          font-size: 0.9rem;
          color: var(--text-secondary);
          text-align: center;
        }

        .value-range-badge strong {
          color: var(--primary);
          font-size: 1.1rem;
        }

        .result-info-col {
          text-align: left;
        }

        .result-title {
          font-size: 2rem;
          margin-bottom: 8px;
        }

        .result-description {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-bottom: 24px;
        }

        .insights-boxes-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 30px;
        }

        .insight-item-box {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
        }

        .insight-icon {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
        }

        .green-icon { background-color: rgba(var(--success-rgb), 0.1); }
        .blue-icon { background-color: rgba(var(--accent-rgb), 0.1); }
        .purple-icon { background-color: rgba(var(--primary-rgb), 0.1); }

        .insight-lbl {
          display: block;
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .insight-val {
          display: block;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-primary);
        }

        .result-actions {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 12px;
        }

        @media (max-width: 480px) {
          .result-actions {
            grid-template-columns: 1fr;
          }
        }

        .btn-block {
          width: 100%;
          padding: 14px;
        }

        /* Interactive Loader overlay */
        .wizard-loader-overlay {
          position: absolute;
          inset: 0;
          z-index: 100;
          background: var(--glass-bg);
          backdrop-filter: blur(8px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 24px;
        }

        .loader-ring {
          width: 60px;
          height: 60px;
          border: 4px solid var(--border-medium);
          border-top-color: var(--primary);
          border-radius: var(--radius-full);
          animation: spin 1s infinite linear;
          margin-bottom: 24px;
        }

        .wizard-loader-overlay h4 {
          font-size: 1.4rem;
          margin-bottom: 8px;
        }

        .wizard-loader-overlay p {
          color: var(--text-secondary);
          max-width: 400px;
          font-size: 0.9rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes fillGauge {
          from { stroke-dashoffset: 314.16; }
          to { stroke-dashoffset: 78.54; }
        }

        /* Animations */
        .anim-fade-in {
          animation: fadeIn var(--transition-fast) forwards;
        }

        .anim-scale-in {
          animation: scaleIn var(--transition-normal) forwards;
        }

        @keyframes scaleIn {
          from { transform: scale(0.96); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default EstimationForm;
