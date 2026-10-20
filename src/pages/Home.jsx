import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getServices } from '../services/storageService';
import ProductCard from '../components/ProductCard';
import ServiceCard from '../components/ServiceCard';
import ClinicMap from '../components/ClinicMap';
import { initialBlogPosts } from '../data/mockData';

export default function Home() {
  const [products] = useState(() => getProducts().slice(0, 4));
  const [services] = useState(() => getServices().slice(0, 4));
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div>
      {/* Hero Banner */}
      <section className="py-5 bg-light border-bottom">
        <div className="container">
          <div className="hero-banner p-4 p-md-5 rounded-4 shadow-sm text-white">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <span className="badge bg-white text-dark fw-bold mb-3 px-3 py-2">
                  🐾 Rancagua · Desde 2009 al servicio de tus mascotas
                </span>
                <h1 className="display-4 fw-bolder mb-3">
                  Cuidado Veterinario Integral con Amor y Excelencia
                </h1>
                <p className="lead mb-4 opacity-90">
                  Consultas generales, vacunaciones, cirugías, exámenes diagnósticos y farmacia especializada.
                  Atendemos perros, gatos, aves y conejos con un equipo multidisciplinario dedicado.
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <Link to="/agendar" className="btn btn-warning btn-lg fw-bold px-4 text-dark shadow-sm">
                    <i className="bi bi-calendar-check me-2"></i>Agendar Cita Médica
                  </Link>
                  <Link to="/catalogo" className="btn btn-outline-light btn-lg px-4">
                    <i className="bi bi-shop me-2"></i>Ver Farmacia & Stock
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-4 bg-white border-bottom">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-6 col-md-3">
              <div className="p-3">
                <div className="fs-1 text-teal mb-1" style={{ color: '#0d9488' }}>
                  <i className="bi bi-award-fill"></i>
                </div>
                <h6 className="fw-bold mb-1">+15 Años de Experiencia</h6>
                <p className="text-muted small mb-0">Cuidando mascotas en Rancagua</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3">
                <div className="fs-1 text-teal mb-1" style={{ color: '#0d9488' }}>
                  <i className="bi bi-person-badge-fill"></i>
                </div>
                <h6 className="fw-bold mb-1">Equipo Especializado</h6>
                <p className="text-muted small mb-0">3 médicos y personal certificado</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3">
                <div className="fs-1 text-teal mb-1" style={{ color: '#0d9488' }}>
                  <i className="bi bi-truck"></i>
                </div>
                <h6 className="fw-bold mb-1">Farmacia con Stock Real</h6>
                <p className="text-muted small mb-0">Medicamentos y vacunas trazables</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3">
                <div className="fs-1 text-teal mb-1" style={{ color: '#0d9488' }}>
                  <i className="bi bi-shield-check"></i>
                </div>
                <h6 className="fw-bold mb-1">Historial Clínico Digital</h6>
                <p className="text-muted small mb-0">Fichas y vacunas seguras en línea</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <span className="badge badge-category mb-1">Servicios Destacados</span>
              <h2 className="fw-bold text-dark mb-0">Atención Veterinaria Profesional</h2>
            </div>
            <Link to="/servicios" className="btn btn-outline-primary btn-sm">
              Ver todos ({getServices().length}) <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>

          <div className="row g-4">
            {services.map(service => (
              <div key={service.code} className="col-12 col-md-6 col-lg-3">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-5 bg-white border-top border-bottom">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <span className="badge badge-category mb-1">Farmacia Veterinaria</span>
              <h2 className="fw-bold text-dark mb-0">Medicamentos y Vacunas en Stock</h2>
            </div>
            <Link to="/catalogo" className="btn btn-outline-primary btn-sm">
              Ver catálogo completo <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>

          <div className="row g-4">
            {products.map(product => (
              <div key={product.code} className="col-12 col-sm-6 col-lg-3">
                <ProductCard product={product} onViewDetail={setSelectedProduct} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-4 max-w-xl mx-auto">
            <span className="badge badge-category mb-2">Visítanos en Rancagua</span>
            <h2 className="fw-bold text-dark">¿Cómo Llegar a Nuestra Clínica?</h2>
            <p className="text-muted small">
              Estamos ubicados en Av. Libertador Bernardo O'Higgins 450, con estacionamiento exclusivo para clientes
              y acceso habilitado para urgencias veterinarias.
            </p>
          </div>

          <ClinicMap />
        </div>
      </section>

      {/* Blog Tips Preview */}
      <section className="py-5 bg-white border-top">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <span className="badge badge-category mb-1">Educación y Cuidados</span>
              <h2 className="fw-bold text-dark mb-0">Consejos de Nuestros Veterinarios</h2>
            </div>
            <Link to="/blog" className="btn btn-outline-primary btn-sm">
              Ir al Blog <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>

          <div className="row g-4">
            {initialBlogPosts.map(post => (
              <div key={post.id} className="col-12 col-md-6">
                <div className="card h-100 card-hover border-0 shadow-sm overflow-hidden">
                  <div className="row g-0 h-100">
                    <div className="col-md-5">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="img-fluid h-100 w-100 object-fit-cover"
                      />
                    </div>
                    <div className="col-md-7 d-flex flex-column p-4">
                      <span className="badge badge-category align-self-start mb-2">{post.category}</span>
                      <h5 className="fw-bold text-dark mb-2">{post.title}</h5>
                      <p className="text-muted small mb-3">{post.summary}</p>
                      <div className="mt-auto d-flex justify-content-between align-items-center small text-muted">
                        <span>Por {post.author}</span>
                        <Link to={`/blog/${post.slug}`} className="text-teal fw-bold text-decoration-none" style={{ color: '#0d9488' }}>
                          Leer más &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product detail modal */}
      {selectedProduct && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">{selectedProduct.name}</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedProduct(null)}></button>
              </div>
              <div className="modal-body">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="img-fluid rounded mb-3 w-100"
                  style={{ maxHeight: '220px', objectFit: 'cover' }}
                />
                <div className="d-flex gap-2 mb-2">
                  <span className="badge badge-category">{selectedProduct.category}</span>
                  <span className="badge bg-light text-dark border">🐾 {selectedProduct.species}</span>
                  <span className="badge bg-secondary font-monospace">{selectedProduct.code}</span>
                </div>
                <p className="text-muted small">{selectedProduct.description}</p>
                <ul className="list-group list-group-flush small mb-3">
                  <li className="list-group-item px-0 d-flex justify-content-between">
                    <span className="text-muted">Principio Activo:</span>
                    <span className="fw-semibold">{selectedProduct.activeIngredient}</span>
                  </li>
                  <li className="list-group-item px-0 d-flex justify-content-between">
                    <span className="text-muted">Presentación:</span>
                    <span className="fw-semibold">{selectedProduct.presentation}</span>
                  </li>
                  <li className="list-group-item px-0 d-flex justify-content-between">
                    <span className="text-muted">Stock disponible:</span>
                    <span className="fw-bold text-success">{selectedProduct.stock} unidades</span>
                  </li>
                </ul>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedProduct(null)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
