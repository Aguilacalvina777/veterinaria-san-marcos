import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout, switchDemoRole, isStaff, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const [navCollapsed, setNavCollapsed] = useState(true);
  const navigate = useNavigate();

  const handleToggle = () => setNavCollapsed(!navCollapsed);
  const closeNav = () => setNavCollapsed(true);

  const handleLogout = () => {
    logout();
    closeNav();
    navigate('/');
  };

  return (
    <header className="sticky-top bg-white shadow-sm border-bottom">
      {/* Demo helper banner for evaluation/teachers */}
      <div className="bg-dark text-white py-1 px-3 small d-flex flex-wrap justify-content-between align-items-center">
        <div>
          <span className="badge bg-warning text-dark me-2">Modo Demostración</span>
          <span className="d-none d-md-inline">Cambio rápido de rol:</span>
          <button
            onClick={() => switchDemoRole('Administrador')}
            className={`btn btn-xs btn-outline-light ms-2 py-0 px-2 small ${isAdmin ? 'active bg-light text-dark' : ''}`}
            title="Dra. Carolina Morales"
          >
            Admin
          </button>
          <button
            onClick={() => switchDemoRole('Recepcionista')}
            className={`btn btn-xs btn-outline-light ms-1 py-0 px-2 small ${user?.role === 'Recepcionista' ? 'active bg-light text-dark' : ''}`}
            title="Valeria Muñoz"
          >
            Recepción
          </button>
          <button
            onClick={() => switchDemoRole('Dueño de mascota')}
            className={`btn btn-xs btn-outline-light ms-1 py-0 px-2 small ${user?.role === 'Dueño de mascota' ? 'active bg-light text-dark' : ''}`}
            title="Carlos González"
          >
            Cliente
          </button>
        </div>
        <div className="d-none d-sm-block text-white-50">
          📍 Av. Bernardo O'Higgins 450, Rancagua | 📞 +56 72 223 4567
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-light bg-white py-2">
        <div className="container">
          {/* Logo / Brand */}
          <Link to="/" className="navbar-brand d-flex align-items-center" onClick={closeNav}>
            <span className="me-2 fs-3" role="img" aria-label="patita">🐾</span>
            <div>
              <span className="text-teal fw-bolder fs-4" style={{ color: '#0d9488' }}>SAN MARCOS</span>
              <div className="small text-muted" style={{ fontSize: '0.7rem', marginTop: '-4px' }}>
                CLÍNICA VETERINARIA & TIENDA
              </div>
            </div>
          </Link>

          {/* Hamburger button */}
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={handleToggle}
            aria-controls="mainNavbar"
            aria-expanded={!navCollapsed}
            aria-label="Alternar navegación"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Nav links */}
          <div className={`collapse navbar-collapse ${!navCollapsed ? 'show' : ''}`} id="mainNavbar">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" end className="nav-link px-2" onClick={closeNav}>
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/servicios" className="nav-link px-2" onClick={closeNav}>
                  Servicios
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/catalogo" className="nav-link px-2" onClick={closeNav}>
                  Catálogo
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/categorias" className="nav-link px-2" onClick={closeNav}>
                  Categorías
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/ofertas" className="nav-link px-2" onClick={closeNav}>
                  <span className="badge bg-danger me-1">Hot</span>Ofertas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/nosotros" className="nav-link px-2" onClick={closeNav}>
                  Nosotros & Mapa
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/blog" className="nav-link px-2" onClick={closeNav}>
                  Blog
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contacto" className="nav-link px-2" onClick={closeNav}>
                  Contacto
                </NavLink>
              </li>
            </ul>

            {/* Right actions: Cart and Auth */}
            <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
              {/* Cart Button */}
              <Link
                to="/carrito"
                className="btn btn-outline-success position-relative me-2 d-flex align-items-center"
                onClick={closeNav}
                title="Ver carrito de compras"
              >
                <i className="bi bi-cart3 fs-5 me-1"></i>
                <span className="d-none d-sm-inline fw-semibold">Carrito</span>
                {itemCount > 0 && (
                  <span className="badge bg-danger rounded-pill ms-2" data-testid="cart-badge">
                    {itemCount}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="dropdown">
                  <button
                    className="btn btn-light dropdown-toggle d-flex align-items-center gap-2 border"
                    type="button"
                    data-bs-toggle="dropdown"
                    id="userDropdown"
                  >
                    <i className="bi bi-person-circle fs-5 text-teal" style={{ color: '#0d9488' }}></i>
                    <span className="fw-semibold text-truncate" style={{ maxWidth: '140px' }}>
                      {user.name}
                    </span>
                    <span className="badge bg-info text-dark ms-1 small" style={{ fontSize: '0.68rem' }}>
                      {user.role}
                    </span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0">
                    <li className="dropdown-header">
                      Conectado como: <br />
                      <strong>{user.email}</strong>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    {user.role === 'Dueño de mascota' && (
                      <>
                        <li>
                          <Link to="/agendar" className="dropdown-item" onClick={closeNav}>
                            <i className="bi bi-calendar-plus me-2 text-primary"></i>Agendar Cita
                          </Link>
                        </li>
                        <li>
                          <Link to="/mis-mascotas" className="dropdown-item" onClick={closeNav}>
                            <i className="bi bi-heart-pulse me-2 text-danger"></i>Mis Mascotas & Vacunas
                          </Link>
                        </li>
                      </>
                    )}
                    {isStaff && (
                      <li>
                        <Link to="/admin" className="dropdown-item fw-bold text-success" onClick={closeNav}>
                          <i className="bi bi-speedometer2 me-2"></i>Panel de Administración
                        </Link>
                      </li>
                    )}
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="d-flex gap-2">
                  <Link to="/login" className="btn btn-outline-primary" onClick={closeNav}>
                    Iniciar Sesión
                  </Link>
                  <Link to="/registro" className="btn btn-primary" onClick={closeNav}>
                    Crear Cuenta
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
