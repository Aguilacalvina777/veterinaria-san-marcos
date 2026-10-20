import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row g-4">
          {/* Brand info */}
          <div className="col-12 col-md-4">
            <div className="d-flex align-items-center mb-3">
              <span className="fs-2 me-2">🐾</span>
              <h5 className="mb-0 fw-bold text-white">VETERINARIA SAN MARCOS</h5>
            </div>
            <p className="text-secondary small">
              Fundada en 2009 en Rancagua, Región de O'Higgins. Comprometidos con la salud y bienestar
              de tus mascotas a través de medicina veterinaria preventiva, cirugía, laboratorio y farmacia especializada.
            </p>
            <div className="d-flex gap-3 fs-5">
              <a href="#" className="text-white-50 hover-text-white" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white-50 hover-text-white" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white-50 hover-text-white" aria-label="WhatsApp"><i className="bi bi-whatsapp"></i></a>
            </div>
          </div>

          {/* Quick links */}
          <div className="col-6 col-md-2">
            <h6 className="fw-bold text-uppercase text-teal mb-3" style={{ color: '#14b8a6' }}>Navegación</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/" className="text-secondary text-decoration-none">Inicio</Link></li>
              <li className="mb-2"><Link to="/servicios" className="text-secondary text-decoration-none">Servicios Clínicos</Link></li>
              <li className="mb-2"><Link to="/catalogo" className="text-secondary text-decoration-none">Catálogo Farmacia</Link></li>
              <li className="mb-2"><Link to="/categorias" className="text-secondary text-decoration-none">Categorías</Link></li>
              <li className="mb-2"><Link to="/ofertas" className="text-secondary text-decoration-none">Ofertas Especiales</Link></li>
            </ul>
          </div>

          {/* More links */}
          <div className="col-6 col-md-2">
            <h6 className="fw-bold text-uppercase text-teal mb-3" style={{ color: '#14b8a6' }}>Institucional</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/nosotros" className="text-secondary text-decoration-none">Nosotros & Mapa</Link></li>
              <li className="mb-2"><Link to="/blog" className="text-secondary text-decoration-none">Blog de Mascotas</Link></li>
              <li className="mb-2"><Link to="/contacto" className="text-secondary text-decoration-none">Contacto</Link></li>
              <li className="mb-2"><Link to="/agendar" className="text-secondary text-decoration-none">Solicitar Cita</Link></li>
              <li className="mb-2"><Link to="/login" className="text-secondary text-decoration-none">Portal Pacientes</Link></li>
            </ul>
          </div>

          {/* Contact and schedule */}
          <div className="col-12 col-md-4">
            <h6 className="fw-bold text-uppercase text-teal mb-3" style={{ color: '#14b8a6' }}>Atención y Ubicación</h6>
            <ul className="list-unstyled small text-secondary">
              <li className="mb-2 d-flex">
                <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                <span>Av. Libertador Bernardo O'Higgins 450, Rancagua, Región de O'Higgins</span>
              </li>
              <li className="mb-2 d-flex">
                <i className="bi bi-telephone-fill text-success me-2"></i>
                <span>Mesa central: +56 72 223 4567</span>
              </li>
              <li className="mb-2 d-flex">
                <i className="bi bi-envelope-fill text-info me-2"></i>
                <span>contacto@veterinariasanmarcos.cl</span>
              </li>
              <li className="mb-2 d-flex">
                <i className="bi bi-clock-fill text-warning me-2"></i>
                <span>Lun - Vie: 08:30 a 19:30 | Sáb: 09:00 a 14:00 (Urgencias 24/7)</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="d-flex flex-wrap justify-content-between align-items-center small text-secondary">
          <div>
            &copy; {new Date().getFullYear()} Veterinaria San Marcos. Todos los derechos reservados.
          </div>
          <div>
            Proyecto Académico DSY1104 · Desarrollo FullStack II (Forma A)
          </div>
        </div>
      </div>
    </footer>
  );
}
