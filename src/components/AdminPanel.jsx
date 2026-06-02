import React, { useState, useEffect } from 'react';

const AdminPanel = ({ cars, onAddCar, onDeleteCar }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeTab, setActiveTab] = useState('list'); // 'overview' | 'list' | 'add'
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Form State for New Car
  const initialFormState = {
    brand: '',
    model: '',
    year: new Date().getFullYear().toString(),
    mileage: '',
    fuel: 'Essence',
    gearbox: 'Automatique',
    price: '',
    monthly: '',
    image: '',
    featured: false,
    specs: ''
  };
  const [form, setForm] = useState(initialFormState);

  // Unsigned Cloudinary direct image upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadError('');
    setIsUploading(true);

    if (!file.type.startsWith('image/')) {
      setUploadError('Le fichier sélectionné doit être une image.');
      setIsUploading(false);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError("La taille de l'image ne doit pas dépasser 10 Mo.");
      setIsUploading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'urbandriver');

      const response = await fetch('https://api.cloudinary.com/v1_1/djw220fcf/image/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Cloudinary response failed');
      }

      const data = await response.json();
      if (data.secure_url) {
        setForm(prev => ({ ...prev, image: data.secure_url }));
        setSuccessMsg('Image téléversée avec succès !');
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        throw new Error('secure_url missing from Cloudinary response');
      }
    } catch (err) {
      console.error('Image upload error:', err);
      setUploadError("Échec du téléversement de l'image. Veuillez réessayer.");
    } finally {
      setIsUploading(false);
    }
  };

  // Check login on session startup
  useEffect(() => {
    const loggedIn = sessionStorage.getItem('admin_logged_in') === 'true';
    if (loggedIn) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'urbandriver' && password === '261094') {
      setIsAuthenticated(true);
      setErrorMsg('');
      sessionStorage.setItem('admin_logged_in', 'true');
      setSuccessMsg('Connexion réussie !');
      setTimeout(() => setSuccessMsg(''), 3000);
    } else {
      setErrorMsg('Identifiants incorrects. Veuillez réessayer.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_logged_in');
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();

    if (!form.brand || !form.model || !form.price || !form.image) {
      setErrorMsg('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const newCar = {
      id: Date.now(),
      brand: form.brand,
      model: form.model,
      year: form.year,
      mileage: parseInt(form.mileage) || 0,
      fuel: form.fuel,
      gearbox: form.gearbox,
      price: parseInt(form.price) || 0,
      monthly: parseInt(form.monthly) || Math.round((parseInt(form.price) || 0) * 0.009),
      image: form.image,
      featured: form.featured,
      specs: form.specs || 'Aucune description disponible.'
    };

    onAddCar(newCar);
    setForm(initialFormState);
    setSuccessMsg('Véhicule publié avec succès !');
    setActiveTab('list');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDeleteClick = (id, brand, model) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le véhicule ${brand} ${model} ?`)) {
      onDeleteCar(id);
      setSuccessMsg('Véhicule supprimé avec succès.');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  // Quick statistics computations
  const totalCars = cars.length;
  const avgPrice = totalCars > 0 ? Math.round(cars.reduce((acc, car) => acc + car.price, 0) / totalCars) : 0;
  const electricCount = cars.filter(car => car.fuel === 'Électrique').length;
  const featuredCount = cars.filter(car => car.featured).length;

  // Filter cars based on search query
  const filteredCars = cars.filter(car => {
    const query = searchQuery.toLowerCase();
    return (
      car.brand.toLowerCase().includes(query) ||
      car.model.toLowerCase().includes(query) ||
      car.year.toString().includes(query) ||
      car.fuel.toLowerCase().includes(query)
    );
  });

  const presetImages = [
    { label: 'Porsche 911 (Rouge)', url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&auto=format&fit=crop&q=80' },
    { label: 'Audi e-tron (Gris)', url: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&auto=format&fit=crop&q=80' },
    { label: 'BMW M4 (Jaune)', url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&auto=format&fit=crop&q=80' },
    { label: 'Mercedes AMG (Gris)', url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&auto=format&fit=crop&q=80' },
    { label: 'Tesla S (Blanc)', url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&auto=format&fit=crop&q=80' },
    { label: 'SUV Luxe (Noir)', url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop&q=80' }
  ];

  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="login-mesh-grid"></div>
        <div className="glowing-bg glowing-primary"></div>
        <div className="glowing-bg glowing-accent"></div>

        <div className="login-card glass-card">
          <div className="login-header">
            <svg className="login-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
              <circle cx="7" cy="17" r="2" />
              <path d="M9 17h6" />
              <circle cx="17" cy="17" r="2" />
            </svg>
            <h2>Urban<span className="text-gradient">Console Admin</span></h2>
            <p>Veuillez vous authentifier pour gérer les véhicules.</p>
          </div>

          {errorMsg && (
            <div className="login-alert error-alert">
              <span>⚠️</span> {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label className="form-label" htmlFor="username">Nom d'utilisateur</label>
              <input
                id="username"
                type="text"
                required
                placeholder="Ex: urbandriver"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group password-group">
              <label className="form-label" htmlFor="password">Mot de passe</label>
              <div className="password-input-container">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Saisir votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Afficher le mot de passe"
                >
                  {showPassword ? '🔒' : '👁️'}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary login-btn">
              Se connecter au dashboard
            </button>
          </form>

          <div className="login-footer">
            <a href="#" className="back-link" onClick={(e) => { e.preventDefault(); window.location.hash = ''; }}>
              ← Retour au site principal
            </a>
          </div>
        </div>

        <style>{`
          .admin-login-wrapper {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            position: relative;
            background-color: var(--bg-primary);
            overflow: hidden;
          }

          .login-mesh-grid {
            position: absolute;
            inset: 0;
            z-index: -2;
            pointer-events: none;
            background-image: 
              radial-gradient(var(--border-light) 1px, transparent 1px),
              radial-gradient(var(--border-light) 1px, transparent 1px);
            background-size: 40px 40px;
            background-position: 0 0, 20px 20px;
            opacity: 0.5;
          }

          .login-card {
            width: 100%;
            max-width: 460px;
            text-align: center;
            padding: 48px 36px;
            border-radius: var(--radius-lg);
            animation: float 6s ease-in-out infinite;
          }

          .login-header {
            margin-bottom: 32px;
          }

          .login-logo-icon {
            width: 48px;
            height: 48px;
            color: var(--primary);
            margin-bottom: 16px;
            filter: drop-shadow(0 4px 12px rgba(var(--primary-rgb), 0.3));
          }

          .login-header h2 {
            font-size: 1.8rem;
            margin-bottom: 8px;
          }

          .text-gradient {
            background: linear-gradient(135deg, var(--primary) 30%, var(--accent) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-left: 6px;
          }

          .login-header p {
            color: var(--text-secondary);
            font-size: 0.9rem;
          }

          .login-alert {
            padding: 12px 16px;
            border-radius: var(--radius-sm);
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            gap: 8px;
            text-align: left;
          }

          .error-alert {
            background-color: rgba(239, 68, 68, 0.12);
            border: 1px solid rgba(239, 68, 68, 0.25);
            color: var(--danger);
          }

          .login-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .password-group {
            position: relative;
          }

          .password-input-container {
            position: relative;
            width: 100%;
          }

          .password-toggle {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            font-size: 1.1rem;
            cursor: pointer;
            z-index: 10;
            opacity: 0.6;
            transition: opacity var(--transition-fast);
          }

          .password-toggle:hover {
            opacity: 1;
          }

          .login-btn {
            width: 100%;
            padding: 14px;
            margin-top: 10px;
          }

          .login-footer {
            margin-top: 30px;
            border-top: 1px solid var(--border-light);
            padding-top: 20px;
          }

          .back-link {
            font-family: var(--font-heading);
            font-weight: 600;
            font-size: 0.9rem;
            color: var(--text-muted);
            transition: color var(--transition-fast);
          }

          .back-link:hover {
            color: var(--primary);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      {/* Messages feedback toasts */}
      {successMsg && <div className="toast-notification success-toast">✓ {successMsg}</div>}

      <div className="dashboard-mesh"></div>

      {/* Header bar */}
      <header className="dashboard-header glass-card">
        <div className="header-brand">
          <svg className="header-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
            <circle cx="7" cy="17" r="2" />
            <path d="M9 17h6" />
            <circle cx="17" cy="17" r="2" />
          </svg>
          <div>
            <h1>UrbanConsole <span className="admin-badge">Admin</span></h1>
            <p>Gestion en temps réel de votre catalogue automobile</p>
          </div>
        </div>

        <div className="header-actions">
          <button className="btn btn-outline" onClick={() => window.location.hash = ''}>
            ← Voir le site
          </button>
          <button className="btn btn-secondary logout-btn" onClick={handleLogout}>
            Se déconnecter
          </button>
        </div>
      </header>

      {/* Overview Analytics grid */}
      <section className="dashboard-stats-grid">
        <div className="stat-card glass-card">
          <div className="stat-icon">🚗</div>
          <div className="stat-data">
            <span className="stat-val">{totalCars}</span>
            <span className="stat-lbl">Véhicules en vente</span>
          </div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-icon">💰</div>
          <div className="stat-data">
            <span className="stat-val">{avgPrice.toLocaleString()} €</span>
            <span className="stat-lbl">Prix moyen du catalogue</span>
          </div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-data">
            <span className="stat-val">{electricCount}</span>
            <span className="stat-lbl">Véhicules Électriques</span>
          </div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-data">
            <span className="stat-val">{featuredCount}</span>
            <span className="stat-lbl">Sélection de l'expert</span>
          </div>
        </div>
      </section>

      {/* Main content tabs controls */}
      <div className="dashboard-layout-main">
        <div className="tabs-navigation glass-card">
          <button
            className={`tab-link ${activeTab === 'list' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            📋 Catalogue disponible ({totalCars})
          </button>
          <button
            className={`tab-link ${activeTab === 'add' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            ➕ Publier un nouveau véhicule
          </button>
        </div>

        <div className="dashboard-body">
          {/* Tab 1: List Manager */}
          {activeTab === 'list' && (
            <div className="list-tab-content glass-card">
              <div className="list-tab-header">
                <h3>Gestion du catalogue</h3>
                <div className="search-bar-wrapper">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Rechercher par marque, modèle, énergie, année..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control search-input"
                  />
                </div>
              </div>

              {filteredCars.length > 0 ? (
                <div className="table-responsive">
                  <table className="listings-table">
                    <thead>
                      <tr>
                        <th>Visuel</th>
                        <th>Désignation</th>
                        <th>Année</th>
                        <th>Kilométrage</th>
                        <th>Énergie / Boite</th>
                        <th>Prix (€)</th>
                        <th>Mensualité</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCars.map((car) => (
                        <tr key={car.id} className="listing-row">
                          <td>
                            <div className="table-img-wrapper">
                              <img src={car.image} alt={car.model} className="table-img" />
                            </div>
                          </td>
                          <td>
                            <div className="car-desc-cell">
                              <span className="car-brand-name">{car.brand}</span>
                              <span className="car-model-name">{car.model}</span>
                              {car.featured && <span className="table-featured-badge">Expert</span>}
                            </div>
                          </td>
                          <td><span className="badge-light">{car.year}</span></td>
                          <td><span className="badge-light">{car.mileage.toLocaleString()} km</span></td>
                          <td>
                            <div className="specs-cell">
                              <span className="badge-light">{car.fuel}</span>
                              <span className="badge-light">{car.gearbox}</span>
                            </div>
                          </td>
                          <td><strong className="table-price">{car.price.toLocaleString()} €</strong></td>
                          <td><span className="table-monthly">{car.monthly} €/m</span></td>
                          <td>
                            <button
                              className="btn btn-delete"
                              onClick={() => handleDeleteClick(car.id, car.brand, car.model)}
                            >
                              🗑️ Supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="table-empty">
                  <span>🔍</span>
                  <h4>Aucun véhicule trouvé</h4>
                  <p>Aucun poste ne correspond à votre recherche "{searchQuery}".</p>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Add New Car with Live Preview */}
          {activeTab === 'add' && (
            <div className="add-tab-content">
              <div className="add-tab-grid">
                {/* Form column */}
                <form onSubmit={handleAddSubmit} className="add-form-card glass-card">
                  <h3>Créer une nouvelle offre</h3>
                  <p className="form-subtitle">Tous les champs marqués d'une * sont requis pour la publication.</p>

                  <div className="form-grid-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="brand">Marque *</label>
                      <input
                        id="brand"
                        type="text"
                        required
                        placeholder="Ex: Tesla, Porsche, Peugeot..."
                        value={form.brand}
                        onChange={(e) => setForm({ ...form, brand: e.target.value })}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="model">Modèle *</label>
                      <input
                        id="model"
                        type="text"
                        required
                        placeholder="Ex: Model 3, 911, e-208..."
                        value={form.model}
                        onChange={(e) => setForm({ ...form, model: e.target.value })}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-grid-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="year">Année de mise en circulation *</label>
                      <input
                        id="year"
                        type="number"
                        required
                        min="1990"
                        max="2027"
                        placeholder="Ex: 2023"
                        value={form.year}
                        onChange={(e) => setForm({ ...form, year: e.target.value })}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="mileage">Kilométrage (km) *</label>
                      <input
                        id="mileage"
                        type="number"
                        required
                        min="0"
                        placeholder="Ex: 25000"
                        value={form.mileage}
                        onChange={(e) => setForm({ ...form, mileage: e.target.value })}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-grid-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="fuel">Carburant / Énergie</label>
                      <select
                        id="fuel"
                        value={form.fuel}
                        onChange={(e) => setForm({ ...form, fuel: e.target.value })}
                        className="form-control"
                      >
                        <option value="Essence">Essence</option>
                        <option value="Électrique">Électrique</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Hybride">Hybride</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="gearbox">Boîte de vitesse</label>
                      <select
                        id="gearbox"
                        value={form.gearbox}
                        onChange={(e) => setForm({ ...form, gearbox: e.target.value })}
                        className="form-control"
                      >
                        <option value="Automatique">Automatique</option>
                        <option value="Manuelle">Manuelle</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-grid-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="price">Prix d'achat direct (€) *</label>
                      <input
                        id="price"
                        type="number"
                        required
                        min="1"
                        placeholder="Ex: 45900"
                        value={form.price}
                        onChange={(e) => setForm({ 
                          ...form, 
                          price: e.target.value,
                          monthly: form.monthly || Math.round(e.target.value * 0.009).toString()
                        })}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="monthly">Mensualité de crédit (€/mois)</label>
                      <input
                        id="monthly"
                        type="number"
                        placeholder="Laisser vide pour calcul automatique"
                        value={form.monthly}
                        onChange={(e) => setForm({ ...form, monthly: e.target.value })}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Photo du véhicule *</label>
                    
                    {/* File Upload Zone */}
                    <div className={`upload-dropzone ${isUploading ? 'uploading' : ''}`}>
                      <input
                        type="file"
                        id="image-file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                        className="file-input-hidden"
                      />
                      <label htmlFor="image-file" className="upload-zone-label">
                        {isUploading ? (
                          <div className="upload-spinner-container">
                            <div className="upload-spinner"></div>
                            <p>Téléchargement vers Cloudinary...</p>
                          </div>
                        ) : (
                          <div className="upload-prompt">
                            <span className="upload-icon">📤</span>
                            <p className="upload-main-text">Téléverser depuis votre appareil</p>
                            <p className="upload-sub-text">PNG, JPG, WEBP jusqu'à 10 Mo</p>
                          </div>
                        )}
                      </label>
                    </div>

                    {uploadError && (
                      <div className="upload-error-alert">
                        <span>⚠️</span> {uploadError}
                      </div>
                    )}

                    {form.image && form.image.includes('cloudinary') && (
                      <div className="upload-success-alert">
                        <span>✓</span> Photo téléversée avec succès dans Cloudinary !
                      </div>
                    )}

                    <div className="divider-text">OU SAISIR UNE URL</div>

                    <input
                      id="image"
                      type="url"
                      required
                      placeholder="Coller l'adresse HTTP d'une image (Unsplash, etc.)"
                      value={form.image}
                      onChange={(e) => setForm({ ...form, image: e.target.value })}
                      className="form-control"
                    />

                    {/* Presets Grid */}
                    <div className="preset-suggestions">
                      <span className="preset-title">Ou choisir une image recommandée :</span>
                      <div className="presets-list">
                        {presetImages.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setForm({ ...form, image: preset.url })}
                            className="preset-btn"
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="specs">Équipements & Caractéristiques clés *</label>
                    <textarea
                      id="specs"
                      rows="3"
                      required
                      placeholder="Ex: 510 ch, Toit ouvrant panoramique, Échappement sport, Phares LED..."
                      value={form.specs}
                      onChange={(e) => setForm({ ...form, specs: e.target.value })}
                      className="form-control textarea-control"
                    />
                  </div>

                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={form.featured}
                        onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                      />
                      <span className="custom-chk"></span>
                      Mettre en avant sur la page d'accueil ("Sélection Expert")
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary publish-btn">
                    🚀 Publier instantanément le véhicule
                  </button>
                </form>

                {/* Preview column */}
                <div className="preview-sticky-col">
                  <div className="preview-sticky-container">
                    <div className="preview-badge-status">Aperçu en temps réel sur le site</div>

                    {/* Simulating card display */}
                    <div className="car-card glass-card preview-card">
                      {form.featured && <span className="featured-badge">Sélection Expert</span>}
                      
                      <div className="car-image-wrapper">
                        {form.image ? (
                          <img src={form.image} alt="Preview" className="car-card-img" />
                        ) : (
                          <div className="empty-preview-img">
                            <span>📷</span>
                            <p>Saisissez l'URL d'une image pour afficher le rendu final.</p>
                          </div>
                        )}
                      </div>

                      <div className="car-details">
                        <div className="car-header-row">
                          <h3 className="car-name-title">
                            {form.brand || 'Marque'} <span className="car-model-txt">{form.model || 'Modèle'}</span>
                          </h3>
                          <span className="car-price-tag">
                            {form.price ? parseInt(form.price).toLocaleString() : '0'} €
                          </span>
                        </div>

                        <div className="car-specs-grid">
                          <span className="spec-badge">📅 {form.year || '2024'}</span>
                          <span className="spec-badge">🏎️ {form.mileage ? parseInt(form.mileage).toLocaleString() : '0'} km</span>
                          <span className="spec-badge">⚡ {form.fuel}</span>
                          <span className="spec-badge">⚙️ {form.gearbox}</span>
                        </div>

                        <p className="car-specs-summary">
                          {form.specs || 'Saisissez les caractéristiques pour afficher la description...'}
                        </p>

                        <div className="car-footer-cta">
                          <div>
                            <span className="finance-lbl">Dès</span>
                            <span className="finance-amt">
                              {form.monthly || (form.price ? Math.round(parseInt(form.price) * 0.009) : '0')} €
                              <span className="finance-month">/mois</span>
                            </span>
                          </div>
                          <button type="button" className="btn btn-primary" style={{ pointerEvents: 'none' }}>
                            Voir l'offre
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .admin-dashboard-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 40px 24px 80px;
          min-height: 100vh;
          position: relative;
          color: var(--text-primary);
          text-align: left;
        }

        .dashboard-mesh {
          position: absolute;
          inset: 0;
          z-index: -2;
          pointer-events: none;
          background-image: 
            radial-gradient(var(--border-light) 1px, transparent 1px),
            radial-gradient(var(--border-light) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: 0 0, 20px 20px;
          opacity: 0.4;
        }

        /* Notifications toast */
        .toast-notification {
          position: fixed;
          top: 30px;
          right: 30px;
          padding: 16px 24px;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.95rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          z-index: 9999;
        }

        .success-toast {
          background-color: var(--success);
          color: #ffffff;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Header design */
        .dashboard-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 30px 40px;
          margin-bottom: 40px;
          border-radius: var(--radius-lg);
          gap: 20px;
        }

        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        .header-brand {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .header-logo {
          width: 44px;
          height: 44px;
          color: var(--primary);
          filter: drop-shadow(0 2px 10px rgba(var(--primary-rgb), 0.3));
        }

        .header-brand h1 {
          font-size: 1.8rem;
          font-weight: 800;
          line-height: 1.1;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .admin-badge {
          background-color: var(--primary);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          text-transform: uppercase;
        }

        .header-brand p {
          font-size: 0.88rem;
          color: var(--text-muted);
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .logout-btn {
          background-color: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: var(--danger);
        }

        .logout-btn:hover {
          background-color: var(--danger);
          color: #ffffff;
        }

        /* Analytics counters */
        .dashboard-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }

        @media (max-width: 992px) {
          .dashboard-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .dashboard-stats-grid {
            grid-template-columns: 1fr;
          }
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 24px 30px;
        }

        .stat-icon {
          font-size: 2.2rem;
          width: 55px;
          height: 55px;
          background-color: var(--bg-tertiary);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-light);
        }

        .stat-data {
          display: flex;
          flex-direction: column;
        }

        .stat-val {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .stat-lbl {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        /* Main tabs bar */
        .tabs-navigation {
          display: flex;
          gap: 16px;
          padding: 16px 24px;
          margin-bottom: 24px;
          border-radius: var(--radius-md);
        }

        @media (max-width: 576px) {
          .tabs-navigation {
            flex-direction: column;
            padding: 12px;
            gap: 8px;
          }
        }

        .tab-link {
          background: none;
          border: none;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.95rem;
          padding: 10px 20px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .tab-link:hover {
          color: var(--primary);
          background-color: rgba(var(--primary-rgb), 0.05);
        }

        .active-tab {
          background-color: var(--primary);
          color: #ffffff !important;
          box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.2);
        }

        /* Listing catalog tab styling */
        .list-tab-content {
          padding: 30px 40px;
        }

        .list-tab-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          gap: 20px;
        }

        @media (max-width: 768px) {
          .list-tab-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        .list-tab-header h3 {
          font-size: 1.35rem;
        }

        .search-bar-wrapper {
          position: relative;
          width: 380px;
          max-width: 100%;
        }

        @media (max-width: 768px) {
          .search-bar-wrapper {
            width: 100%;
          }
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1rem;
          opacity: 0.6;
        }

        .search-input {
          padding-left: 44px;
          font-size: 0.9rem;
        }

        .table-responsive {
          width: 100%;
          overflow-x: auto;
        }

        .listings-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .listings-table th {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.82rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 14px 20px;
          border-bottom: 2px solid var(--border-medium);
        }

        .listing-row {
          border-bottom: 1px solid var(--border-light);
          transition: background-color var(--transition-fast);
        }

        .listing-row:hover {
          background-color: rgba(var(--primary-rgb), 0.02);
        }

        .listing-row td {
          padding: 16px 20px;
          vertical-align: middle;
          font-size: 0.92rem;
        }

        .table-img-wrapper {
          width: 70px;
          height: 44px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-light);
        }

        .table-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .car-desc-cell {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .car-brand-name {
          font-weight: 800;
          font-size: 1.05rem;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .car-model-name {
          font-weight: 500;
          color: var(--text-secondary);
        }

        .table-featured-badge {
          background-color: rgba(var(--primary-rgb), 0.12);
          color: var(--primary);
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 2px 6px;
          border-radius: 4px;
          margin-top: 4px;
          display: inline-block;
        }

        .badge-light {
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-light);
          color: var(--text-secondary);
          font-size: 0.8rem;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          white-space: nowrap;
        }

        .specs-cell {
          display: flex;
          gap: 6px;
        }

        .table-price {
          color: var(--primary);
          font-size: 1.05rem;
          font-weight: 800;
        }

        .table-monthly {
          font-size: 0.82rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .btn-delete {
          background-color: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.15);
          color: var(--danger);
          padding: 8px 14px;
          font-size: 0.85rem;
          border-radius: var(--radius-sm);
        }

        .btn-delete:hover {
          background-color: var(--danger);
          color: #ffffff;
          box-shadow: 0 4px 10px rgba(239, 68, 68, 0.2);
        }

        .table-empty {
          padding: 60px;
          text-align: center;
        }

        .table-empty span {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 12px;
        }

        .table-empty h4 {
          margin-bottom: 6px;
        }

        .table-empty p {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        /* Publication Form Tab styling */
        .add-tab-content {
          margin-top: 10px;
        }

        .add-tab-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 30px;
          align-items: start;
        }

        @media (max-width: 992px) {
          .add-tab-grid {
            grid-template-columns: 1fr;
          }
        }

        .add-form-card {
          padding: 40px;
          text-align: left;
        }

        .add-form-card h3 {
          font-size: 1.4rem;
          margin-bottom: 4px;
        }

        .form-subtitle {
          color: var(--text-muted);
          font-size: 0.88rem;
          margin-bottom: 30px;
        }

        .form-grid-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        @media (max-width: 576px) {
          .form-grid-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }

        .textarea-control {
          resize: vertical;
          min-height: 80px;
        }

        /* Preset Images suggestions */
        .preset-suggestions {
          margin-top: 10px;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-light);
          padding: 12px;
          border-radius: var(--radius-sm);
        }

        .preset-title {
          font-size: 0.78rem;
          color: var(--text-secondary);
          font-weight: 600;
          display: block;
          margin-bottom: 8px;
        }

        .presets-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .preset-btn {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-medium);
          padding: 5px 10px;
          font-size: 0.75rem;
          font-weight: 500;
          border-radius: 4px;
          color: var(--text-primary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .preset-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
          background-color: rgba(var(--primary-rgb), 0.05);
        }

        /* Custom Checkbox */
        .checkbox-group {
          margin-top: 24px;
          margin-bottom: 30px;
        }

        .checkbox-label {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .checkbox-label input {
          display: none;
        }

        .custom-chk {
          width: 20px;
          height: 20px;
          border: 2px solid var(--border-medium);
          border-radius: 6px;
          position: relative;
          display: inline-block;
          background-color: var(--bg-secondary);
          transition: all var(--transition-fast);
        }

        .checkbox-label input:checked + .custom-chk {
          background-color: var(--primary);
          border-color: var(--primary);
        }

        .checkbox-label input:checked + .custom-chk::after {
          content: '✓';
          position: absolute;
          color: #ffffff;
          font-size: 0.85rem;
          font-weight: bold;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .publish-btn {
          width: 100%;
          padding: 16px;
        }

        /* Real-time live card preview column styling */
        .preview-sticky-col {
          position: sticky;
          top: 110px;
        }

        .preview-sticky-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .preview-badge-status {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.82rem;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-align: center;
          padding: 8px;
          border: 1px dashed rgba(var(--accent-rgb), 0.4);
          background-color: rgba(var(--accent-rgb), 0.04);
          border-radius: var(--radius-sm);
        }

        .preview-card {
          margin: 0 auto;
          width: 100%;
          max-width: 380px;
          text-align: left;
        }

        .empty-preview-img {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background-color: var(--bg-tertiary);
          border: 2px dashed var(--border-medium);
          border-radius: var(--radius-sm);
          position: absolute;
          inset: 12px;
          text-align: center;
        }

        .empty-preview-img span {
          font-size: 2rem;
          margin-bottom: 8px;
          opacity: 0.5;
        }

        .empty-preview-img p {
          font-size: 0.78rem;
          color: var(--text-muted);
          max-width: 200px;
        }
      `}</style>
    </div>
  );
};

export default AdminPanel;
