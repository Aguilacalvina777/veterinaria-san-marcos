import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getProducts,
  getCriticalStockProducts,
  getAppointments,
  getOrders,
  getUsers,
  resetToDefaults
} from '../../services/storageService';
import { formatPrice } from '../../components/ProductCard';

export default function AdminDashboard() {
  const [products] = useState(() => getProducts());
  const [criticalProducts] = useState(() => getCriticalStockProducts());
  const [appointments] = useState(() => getAppointments());
  const [orders] = useState(() => getOrders());
  const [users] = useState(() => getUsers());
  const [resetMessage, setResetMessage] = useState(false);

  const pendingApts = appointments.filter(a => a.status === 'Pendiente').length;
  const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  const handleResetData = () => {
    if (window.confirm('¿Deseas restablecer todos los datos del sistema a los valores iniciales de fábrica?')) {
      resetToDefaults();
      setResetMessage(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold text-dark mb-1">Dashboard Administrativo</h2>
          <p className="text-muted small mb-0">
            Resumen en tiempo real de operaciones, inventario farmacéutico y citas médicas.
          </p>
        </div>

        <button onClick={handleResetData} className="btn btn-outline-secondary btn-sm">
          <i className="bi bi-arrow-counterclockwise me-1"></i>Restablecer datos demo
        </button>
      </div>

      {resetMessage && (
        <div className="alert alert-info py-2 small mb-4">
          Datos restablecidos correctamente. Recargando...
        </div>
      )}

      {/* Critical Stock Alert Banner */}
      {criticalProducts.length > 0 && (
        <div className="alert alert-warning border-warning shadow-sm d-flex align-items-center justify-content-between mb-4">
          <div className="d-flex align-items-center">
            <i className="bi bi-exclamation-triangle-fill fs-3 text-warning me-3"></i>
            <div>
              <strong className="text-dark">¡Alerta de Reposición! Hay {criticalProducts.length} productos con stock crítico:</strong>
              <div className="small text-muted">
                {criticalProducts.map(p => `${p.name} (${p.stock} unid.)`).join(' • ')}
              </div>
            </div>
          </div>
          <Link to="/admin/productos?filter=critical" className="btn btn-warning btn-sm fw-bold text-dark">
            Ver Productos Críticos &rarr;
          </Link>
        </div>
      )}

      {/* KPI Cards matching Figure 9 */}
      <div className="row g-3 mb-4">
        {/* Sales / Compras */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm p-3 text-white h-100" style={{ backgroundColor: '#2563eb' }}>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="small text-white-50 text-uppercase fw-semibold">Ventas Totales</div>
                <h3 className="fw-bolder my-1">{formatPrice(totalSales)}</h3>
                <div className="small text-white-50">{orders.length} órdenes procesadas</div>
              </div>
              <i className="bi bi-cart-check-fill fs-1 text-white-50"></i>
            </div>
          </div>
        </div>

        {/* Products in stock */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm p-3 text-white h-100" style={{ backgroundColor: '#0d9488' }}>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="small text-white-50 text-uppercase fw-semibold">Productos Farmacia</div>
                <h3 className="fw-bolder my-1">{products.length}</h3>
                <div className="small text-white-50">{criticalProducts.length} con stock bajo</div>
              </div>
              <i className="bi bi-box-seam-fill fs-1 text-white-50"></i>
            </div>
          </div>
        </div>

        {/* Registered Users */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm p-3 text-white h-100" style={{ backgroundColor: '#f59e0b' }}>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="small text-white-50 text-uppercase fw-semibold">Usuarios del Sistema</div>
                <h3 className="fw-bolder my-1">{users.length}</h3>
                <div className="small text-white-50">3 roles configurados</div>
              </div>
              <i className="bi bi-people-fill fs-1 text-white-50"></i>
            </div>
          </div>
        </div>

        {/* Pending Appointments */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm p-3 text-white h-100" style={{ backgroundColor: '#dc2626' }}>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="small text-white-50 text-uppercase fw-semibold">Citas por Confirmar</div>
                <h3 className="fw-bolder my-1">{pendingApts}</h3>
                <div className="small text-white-50">{appointments.length} citas totales</div>
              </div>
              <i className="bi bi-calendar-event-fill fs-1 text-white-50"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Navigation Modules matching Figure 9 */}
      <h5 className="fw-bold text-dark mb-3">Módulos de Gestión Rápida</h5>
      <div className="row g-3 mb-5">
        <div className="col-6 col-md-4 col-lg-3">
          <Link to="/admin/ordenes" className="card card-hover text-decoration-none border-0 shadow-sm p-3 text-center bg-white h-100">
            <i className="bi bi-receipt fs-2 text-primary mb-2"></i>
            <h6 className="fw-bold text-dark mb-1">Órdenes</h6>
            <small className="text-muted">Gestión y seguimiento de boletas</small>
          </Link>
        </div>

        <div className="col-6 col-md-4 col-lg-3">
          <Link to="/admin/productos" className="card card-hover text-decoration-none border-0 shadow-sm p-3 text-center bg-white h-100">
            <i className="bi bi-capsule fs-2 text-success mb-2"></i>
            <h6 className="fw-bold text-dark mb-1">Productos</h6>
            <small className="text-muted">Administrar inventario y alertas</small>
          </Link>
        </div>

        <div className="col-6 col-md-4 col-lg-3">
          <Link to="/admin/citas" className="card card-hover text-decoration-none border-0 shadow-sm p-3 text-center bg-white h-100">
            <i className="bi bi-calendar-check fs-2 text-info mb-2"></i>
            <h6 className="fw-bold text-dark mb-1">Citas</h6>
            <small className="text-muted">Confirmar y reagendar agenda</small>
          </Link>
        </div>

        <div className="col-6 col-md-4 col-lg-3">
          <Link to="/admin/fichas" className="card card-hover text-decoration-none border-0 shadow-sm p-3 text-center bg-white h-100">
            <i className="bi bi-clipboard2-pulse fs-2 text-danger mb-2"></i>
            <h6 className="fw-bold text-dark mb-1">Fichas Clínicas</h6>
            <small className="text-muted">Diagnósticos y vacunas</small>
          </Link>
        </div>

        <div className="col-6 col-md-4 col-lg-3">
          <Link to="/admin/categorias" className="card card-hover text-decoration-none border-0 shadow-sm p-3 text-center bg-white h-100">
            <i className="bi bi-tags fs-2 text-warning mb-2"></i>
            <h6 className="fw-bold text-dark mb-1">Categorías</h6>
            <small className="text-muted">Organizar especialidades</small>
          </Link>
        </div>

        <div className="col-6 col-md-4 col-lg-3">
          <Link to="/admin/usuarios" className="card card-hover text-decoration-none border-0 shadow-sm p-3 text-center bg-white h-100">
            <i className="bi bi-people fs-2 text-purple mb-2" style={{ color: '#8b5cf6' }}></i>
            <h6 className="fw-bold text-dark mb-1">Usuarios</h6>
            <small className="text-muted">Cuentas, roles y accesos</small>
          </Link>
        </div>

        <div className="col-6 col-md-4 col-lg-3">
          <Link to="/admin/reportes" className="card card-hover text-decoration-none border-0 shadow-sm p-3 text-center bg-white h-100">
            <i className="bi bi-graph-up fs-2 text-teal mb-2" style={{ color: '#0d9488' }}></i>
            <h6 className="fw-bold text-dark mb-1">Reportes</h6>
            <small className="text-muted">Estadísticas e informes</small>
          </Link>
        </div>

        <div className="col-6 col-md-4 col-lg-3">
          <Link to="/" className="card card-hover text-decoration-none border-0 shadow-sm p-3 text-center bg-white h-100">
            <i className="bi bi-shop fs-2 text-secondary mb-2"></i>
            <h6 className="fw-bold text-dark mb-1">Tienda Web</h6>
            <small className="text-muted">Ver vista pública de la clínica</small>
          </Link>
        </div>
      </div>

      {/* Recent Appointments & Recent Orders tables */}
      <div className="row g-4">
        {/* Recent Appointments */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm p-3 bg-white h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold text-dark mb-0">Citas Recientes en Recepción</h6>
              <Link to="/admin/citas" className="small text-teal fw-semibold" style={{ color: '#0d9488' }}>Ver todas</Link>
            </div>
            <div className="table-responsive">
              <table className="table table-sm align-middle mb-0">
                <thead className="table-light small">
                  <tr>
                    <th>Paciente</th>
                    <th>Servicio</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody className="small">
                  {appointments.slice(0, 4).map(apt => (
                    <tr key={apt.id}>
                      <td>
                        <strong>{apt.petName}</strong> ({apt.species}) <br />
                        <span className="text-muted">{apt.ownerName}</span>
                      </td>
                      <td>{apt.serviceName}</td>
                      <td>{apt.date} {apt.time}</td>
                      <td>
                        <span className={`badge ${
                          apt.status === 'Confirmada' ? 'bg-success' :
                          apt.status === 'Pendiente' ? 'bg-warning text-dark' : 'bg-secondary'
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm p-3 bg-white h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold text-dark mb-0">Últimas Órdenes de Farmacia</h6>
              <Link to="/admin/ordenes" className="small text-teal fw-semibold" style={{ color: '#0d9488' }}>Ver todas</Link>
            </div>
            <div className="table-responsive">
              <table className="table table-sm align-middle mb-0">
                <thead className="table-light small">
                  <tr>
                    <th>Orden</th>
                    <th>Cliente</th>
                    <th>Total</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody className="small">
                  {orders.slice(0, 4).map(order => (
                    <tr key={order.id}>
                      <td className="font-monospace">#{order.id}</td>
                      <td>{order.customer?.firstName} {order.customer?.lastName}</td>
                      <td className="fw-bold text-teal" style={{ color: '#0d9488' }}>{formatPrice(order.total)}</td>
                      <td><span className="badge bg-success">Aprobado</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
