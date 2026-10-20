import React, { useState, useMemo } from 'react';
import { getServices } from '../services/storageService';
import ServiceCard from '../components/ServiceCard';

export default function Services() {
  const [services] = useState(() => getServices());
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [search, setSearch] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('Todas');

  const categories = ['Todas', 'Consultas', 'Vacunación', 'Cirugía', 'Desparasitación', 'Exámenes', 'Otros'];

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchCategory = activeCategory === 'Todas' || service.category === activeCategory;
      const matchSearch =
        service.name.toLowerCase().includes(search.toLowerCase()) ||
        service.code.toLowerCase().includes(search.toLowerCase()) ||
        (service.observations && service.observations.toLowerCase().includes(search.toLowerCase()));
      const matchSpecies = speciesFilter === 'Todas' || service.species.toLowerCase().includes(speciesFilter.toLowerCase());

      return matchCategory && matchSearch && matchSpecies;
    });
  }, [services, activeCategory, search, speciesFilter]);

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-5">
        <span className="badge badge-category mb-2">Atención Médica Veterinaria</span>
        <h1 className="fw-bold text-dark">Catálogo de Servicios Clínicos</h1>
        <p className="text-muted">
          Ponemos a tu disposición 26 servicios especializados para caninos, felinos, aves y animales exóticos menores
          en nuestra clínica de Rancagua.
        </p>
      </div>

      {/* Category Nav Pills */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`btn btn-sm rounded-pill px-3 fw-semibold ${
              activeCategory === cat ? 'btn-primary' : 'btn-outline-secondary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="row g-3 mb-4 justify-content-center">
        <div className="col-12 col-md-5">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Buscar servicio clínico (ej: Vacuna, Esterilización, Radiografía)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="col-12 col-md-3">
          <select
            className="form-select"
            value={speciesFilter}
            onChange={e => setSpeciesFilter(e.target.value)}
          >
            <option value="Todas">Todas las especies</option>
            <option value="Perro">Perro / Canino</option>
            <option value="Gato">Gato / Felino</option>
            <option value="Conejo">Ave / Conejo</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="row g-4">
        {filteredServices.map(service => (
          <div key={service.code} className="col-12 col-md-6 col-lg-4">
            <ServiceCard service={service} />
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-5 bg-white rounded-3 shadow-sm">
          <p className="text-muted mb-0">No se encontraron servicios con los filtros aplicados.</p>
        </div>
      )}
    </div>
  );
}
