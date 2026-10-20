import React from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getServices } from '../services/storageService';

export default function Categories() {
  const products = getProducts();
  const services = getServices();

  const productCategories = [
    { name: 'Antibióticos', icon: 'bi-capsule', desc: 'Tratamientos bacterianos respiratorios, dérmicos y digestivos' },
    { name: 'Antiparasitarios', icon: 'bi-bug', desc: 'Pipetas, masticables y comprimidos internos y externos' },
    { name: 'Antiinflamatorios', icon: 'bi-bandaid', desc: 'Manejo del dolor agudo, crónico y postquirúrgico' },
    { name: 'Dermatología', icon: 'bi-droplet-half', desc: 'Shampoos antisépticos, lociones y control de alergias' },
    { name: 'Digestivo', icon: 'bi-heart-pulse', desc: 'Probióticos y protectores gástricos' },
    { name: 'Cardíaco', icon: 'bi-heart', desc: 'Inodilatadores y soporte cardiovascular' },
    { name: 'Analgésicos', icon: 'bi-shield-plus', desc: 'Control del dolor moderado a severo' },
    { name: 'Vacunas', icon: 'bi-shield-check', desc: 'Inmunización canina y felina' },
    { name: 'Suplementos', icon: 'bi-flower1', desc: 'Condroprotectores articulares y omegas' }
  ];

  const serviceCategories = [
    { name: 'Consultas', icon: 'bi-stethoscope', desc: 'Generales, urgencias, controles postoperatorios y exóticos' },
    { name: 'Vacunación', icon: 'bi-shield-fill-check', desc: 'Antirrábica, sextuple, triple felina, bordetella' },
    { name: 'Cirugía', icon: 'bi-scissors', desc: 'Esterilizaciones hembra y macho, cesáreas, tumores' },
    { name: 'Desparasitación', icon: 'bi-capsule-pill', desc: 'Interna y externa por peso' },
    { name: 'Exámenes', icon: 'bi-clipboard-pulse', desc: 'Hemogramas, perfiles bioquímicos, radiografías, ecografías' },
    { name: 'Otros', icon: 'bi-grid', desc: 'Corte de uñas, limpiezas dentales, microchips y hospitalización' }
  ];

  const getProductCount = (catName) => products.filter(p => p.category === catName).length;
  const getServiceCount = (catName) => services.filter(s => s.category === catName).length;

  return (
    <div className="container py-5">
      <div className="text-center mb-5 max-w-2xl mx-auto">
        <span className="badge badge-category mb-2">Explora por Especialidad</span>
        <h1 className="fw-bold text-dark">Categorías del Sistema</h1>
        <p className="text-muted">
          Accede rápidamente a nuestros medicamentos farmacéuticos y servicios clínicos organizados por área de atención.
        </p>
      </div>

      {/* Categorías de Farmacia */}
      <div className="mb-5">
        <h3 className="fw-bold text-dark mb-4 pb-2 border-bottom d-flex align-items-center">
          <i className="bi bi-shop text-teal me-2" style={{ color: '#0d9488' }}></i>
          Farmacia y Medicamentos
        </h3>
        <div className="row g-4">
          {productCategories.map(cat => {
            const count = getProductCount(cat.name);
            return (
              <div key={cat.name} className="col-12 col-sm-6 col-md-4">
                <Link
                  to={`/catalogo?category=${encodeURIComponent(cat.name)}`}
                  className="card h-100 card-hover text-decoration-none border-0 shadow-sm p-4 bg-white"
                >
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{ width: '50px', height: '50px', backgroundColor: '#ccfbf1', color: '#0f766e' }}
                    >
                      <i className={`bi ${cat.icon} fs-4`}></i>
                    </div>
                    <div>
                      <h5 className="fw-bold text-dark mb-0">{cat.name}</h5>
                      <span className="badge bg-light text-muted border small">{count} productos</span>
                    </div>
                  </div>
                  <p className="text-muted small mb-0">{cat.desc}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Categorías de Servicios Clínicos */}
      <div>
        <h3 className="fw-bold text-dark mb-4 pb-2 border-bottom d-flex align-items-center">
          <i className="bi bi-hospital text-teal me-2" style={{ color: '#0d9488' }}></i>
          Servicios Clínicos y Quirúrgicos
        </h3>
        <div className="row g-4">
          {serviceCategories.map(cat => {
            const count = getServiceCount(cat.name);
            return (
              <div key={cat.name} className="col-12 col-sm-6 col-md-4">
                <Link
                  to={`/servicios`}
                  className="card h-100 card-hover text-decoration-none border-0 shadow-sm p-4 bg-white"
                >
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{ width: '50px', height: '50px', backgroundColor: '#e0f2fe', color: '#0284c7' }}
                    >
                      <i className={`bi ${cat.icon} fs-4`}></i>
                    </div>
                    <div>
                      <h5 className="fw-bold text-dark mb-0">{cat.name}</h5>
                      <span className="badge bg-light text-muted border small">{count} prestaciones</span>
                    </div>
                  </div>
                  <p className="text-muted small mb-0">{cat.desc}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
