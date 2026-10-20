import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from './ProductCard';

export default function ServiceCard({ service }) {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Consultas': return 'bi-stethoscope text-primary';
      case 'Vacunación': return 'bi-shield-check text-success';
      case 'Cirugía': return 'bi-heart-pulse-fill text-danger';
      case 'Desparasitación': return 'bi-capsule text-warning';
      case 'Exámenes': return 'bi-clipboard2-pulse text-info';
      default: return 'bi-activity text-secondary';
    }
  };

  return (
    <div className="card h-100 card-hover shadow-sm border-0 d-flex flex-column" data-testid={`service-card-${service.code}`}>
      <div className="card-body d-flex flex-column p-4">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="d-flex align-items-center gap-2">
            <i className={`bi ${getCategoryIcon(service.category)} fs-4`}></i>
            <span className="badge badge-category">{service.category}</span>
          </div>
          <span className="badge bg-light text-muted border font-monospace small">
            {service.code}
          </span>
        </div>

        <h5 className="card-title fw-bold text-dark mt-2 mb-2">
          {service.name}
        </h5>

        <div className="d-flex flex-wrap gap-2 mb-3 small">
          <span className="badge bg-light text-dark border">
            🐾 {service.species}
          </span>
          <span className="badge bg-light text-dark border">
            ⏱️ {service.duration}
          </span>
        </div>

        {service.observations && (
          <p className="card-text text-muted small mb-4 flex-grow-1">
            {service.observations}
          </p>
        )}

        <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between">
          <div>
            <div className="text-muted small">Valor atención</div>
            <div className="fw-bolder fs-4 text-teal" style={{ color: '#0d9488' }}>
              {formatPrice(service.price)}
            </div>
          </div>

          <Link
            to={`/agendar?service=${service.code}`}
            className="btn btn-outline-primary btn-sm"
          >
            <i className="bi bi-calendar-check me-1"></i>
            Agendar
          </Link>
        </div>
      </div>
    </div>
  );
}
