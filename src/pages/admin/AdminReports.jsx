import React from 'react';
import { getProducts, getAppointments, getOrders } from '../../services/storageService';
import { formatPrice } from '../../components/ProductCard';

export default function AdminReports() {
  const products = getProducts();
  const appointments = getAppointments();
  const orders = getOrders();

  const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold text-dark mb-1">Reportes y Métricas Clínicas</h2>
          <p className="text-muted small mb-0">
            Estadísticas digitales de atenciones, pacientes por período y rendimiento de farmacia.
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 bg-white text-center">
            <span className="text-muted small fw-semibold text-uppercase">Total Recaudado en Farmacia</span>
            <h3 className="fw-bolder text-teal my-2" style={{ color: '#0d9488' }}>{formatPrice(totalSales)}</h3>
            <span className="badge bg-success-subtle text-success small">+{orders.length} pedidos completados</span>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 bg-white text-center">
            <span className="text-muted small fw-semibold text-uppercase">Citas Clínicas Gestionadas</span>
            <h3 className="fw-bolder text-primary my-2">{appointments.length}</h3>
            <span className="badge bg-primary-subtle text-primary small">0 extravíos de fichas</span>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 bg-white text-center">
            <span className="text-muted small fw-semibold text-uppercase">Efectividad Asistencia</span>
            <h3 className="fw-bolder text-success my-2">92%</h3>
            <span className="badge bg-success-subtle text-success small">Reducción del 20% histórico de ausencias</span>
          </div>
        </div>
      </div>

      {/* Distribution by species */}
      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm p-4 bg-white h-100">
            <h5 className="fw-bold text-dark mb-3">Distribución de Pacientes por Especie</h5>
            <p className="text-muted small mb-4">
              Porcentaje de consultas realizadas a la fecha en Rancagua.
            </p>

            <div className="mb-3">
              <div className="d-flex justify-content-between small fw-semibold mb-1">
                <span>🐕 Caninos (Perros)</span>
                <span>65% (16 atenciones/día prom.)</span>
              </div>
              <div className="progress" style={{ height: '12px' }}>
                <div className="progress-bar bg-primary" role="progressbar" style={{ width: '65%' }}></div>
              </div>
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between small fw-semibold mb-1">
                <span>🐈 Felinos (Gatos)</span>
                <span>27% (7 atenciones/día prom.)</span>
              </div>
              <div className="progress" style={{ height: '12px' }}>
                <div className="progress-bar bg-info" role="progressbar" style={{ width: '27%' }}></div>
              </div>
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between small fw-semibold mb-1">
                <span>🐇 Aves y Conejos (Exóticos)</span>
                <span>8% (2 atenciones/día prom.)</span>
              </div>
              <div className="progress" style={{ height: '12px' }}>
                <div className="progress-bar bg-warning" role="progressbar" style={{ width: '8%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Services */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm p-4 bg-white h-100">
            <h5 className="fw-bold text-dark mb-3">Servicios de Mayor Demanda</h5>
            <p className="text-muted small mb-3">
              Procedimientos clínicos más requeridos en recepción.
            </p>

            <ul className="list-group list-group-flush small">
              <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                <div>
                  <strong>VA002 &bull; Vacuna sextuple canina</strong>
                  <div className="text-muted">Inmunización anual esencial</div>
                </div>
                <span className="badge bg-light text-dark border">38% de vacunas</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                <div>
                  <strong>SV001 &bull; Consulta médica general</strong>
                  <div className="text-muted">Evaluaciones de rutina</div>
                </div>
                <span className="badge bg-light text-dark border">32% del total</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                <div>
                  <strong>CI003 &bull; Esterilización hembra felina</strong>
                  <div className="text-muted">Quirófano programado</div>
                </div>
                <span className="badge bg-light text-dark border">15% de cirugías</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                <div>
                  <strong>OT003 &bull; Microchip de identificación</strong>
                  <div className="text-muted">Registro oficial en plataforma</div>
                </div>
                <span className="badge bg-light text-dark border">12% de atenciones</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
