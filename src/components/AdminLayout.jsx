import React from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Admin Top Navbar */}
      <header className="navbar navbar-dark bg-dark sticky-top flex-md-nowrap p-2 shadow">
        <div className="container-fluid">
          <Link to="/admin" className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 fw-bold">
            🐾 PANEL VET SAN MARCOS
          </Link>
          <div className="d-flex align-items-center gap-3">
            <span className="text-white-50 small d-none d-sm-inline">
              {user?.name} ({user?.role})
            </span>
            <Link to="/" className="btn btn-outline-light btn-sm">
              <i className="bi bi-shop me-1"></i>Ir a la Tienda
            </Link>
            <button onClick={handleLogout} className="btn btn-danger btn-sm">
              <i className="bi bi-box-arrow-right"></i>
            </button>
          </div>
        </div>
      </header>

      <div className="container-fluid">
        <div className="row">
          {/* Admin Sidebar Navigation */}
          <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block admin-sidebar collapse show p-3">
            <div className="position-sticky pt-3">
              <ul className="nav flex-column gap-1">
                <li className="nav-item">
                  <NavLink to="/admin" end className="nav-link d-flex align-items-center gap-2">
                    <i className="bi bi-speedometer2 text-primary fs-5"></i>
                    <span>Dashboard</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin/citas" className="nav-link d-flex align-items-center gap-2">
                    <i className="bi bi-calendar-check text-info fs-5"></i>
                    <span>Citas y Agenda</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin/fichas" className="nav-link d-flex align-items-center gap-2">
                    <i className="bi bi-clipboard2-pulse text-danger fs-5"></i>
                    <span>Fichas Clínicas</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin/productos" className="nav-link d-flex align-items-center gap-2">
                    <i className="bi bi-capsule text-success fs-5"></i>
                    <span>Productos y Stock</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin/ordenes" className="nav-link d-flex align-items-center gap-2">
                    <i className="bi bi-receipt text-warning fs-5"></i>
                    <span>Órdenes y Boletas</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin/categorias" className="nav-link d-flex align-items-center gap-2">
                    <i className="bi bi-tags text-secondary fs-5"></i>
                    <span>Categorías</span>
                  </NavLink>
                </li>
                {isAdmin && (
                  <li className="nav-item">
                    <NavLink to="/admin/usuarios" className="nav-link d-flex align-items-center gap-2">
                      <i className="bi bi-people-fill text-primary fs-5"></i>
                      <span>Usuarios (RBAC)</span>
                    </NavLink>
                  </li>
                )}
                <li className="nav-item">
                  <NavLink to="/admin/reportes" className="nav-link d-flex align-items-center gap-2">
                    <i className="bi bi-graph-up-arrow text-teal fs-5" style={{ color: '#0d9488' }}></i>
                    <span>Reportes & KPIs</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin/perfil" className="nav-link d-flex align-items-center gap-2">
                    <i className="bi bi-person-gear text-dark fs-5"></i>
                    <span>Mi Perfil</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>

          {/* Main Content Area */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
