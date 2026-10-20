import React, { useState } from 'react';
import { getOrders } from '../../services/storageService';
import { formatPrice } from '../../components/ProductCard';
import ReceiptModal from '../../components/ReceiptModal';

export default function AdminOrders() {
  const [orders] = useState(() => getOrders());
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = orders.filter(o =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.customer?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
    o.customer?.lastName?.toLowerCase().includes(search.toLowerCase()) ||
    o.customer?.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold text-dark mb-1">Órdenes y Boletas Electrónicas</h2>
          <p className="text-muted small mb-0">
            Seguimiento de compras de farmacia, datos de facturación y comprobantes tributarios.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="card border-0 shadow-sm p-3 mb-4 bg-white">
        <div className="row">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Buscar por número de orden, cliente o email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card border-0 shadow-sm bg-white overflow-hidden">
        <div className="table-responsive">
          <table className="table align-middle mb-0 table-hover">
            <thead className="table-light small">
              <tr>
                <th>Nº Orden</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Dirección Despacho</th>
                <th className="text-center">Productos</th>
                <th className="text-end">Monto Total</th>
                <th className="text-center">Estado</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody className="small">
              {filtered.map(order => (
                <tr key={order.id}>
                  <td className="font-monospace fw-bold text-teal" style={{ color: '#0d9488' }}>
                    #{order.id}
                  </td>
                  <td className="text-muted">
                    {new Date(order.createdAt).toLocaleDateString('es-CL', {
                      day: '2-digit', month: '2-digit', year: 'numeric'
                    })}
                  </td>
                  <td>
                    <div className="fw-bold text-dark">{order.customer?.firstName} {order.customer?.lastName}</div>
                    <div className="text-muted small">{order.customer?.email}</div>
                  </td>
                  <td>
                    <div className="small text-truncate" style={{ maxWidth: '180px' }}>
                      {order.customer?.street}, {order.customer?.comuna}
                    </div>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-light text-dark border">
                      {order.items?.length || 0} artículos
                    </span>
                  </td>
                  <td className="text-end fw-bold text-teal" style={{ color: '#0d9488' }}>
                    {formatPrice(order.total)}
                  </td>
                  <td className="text-center">
                    <span className="badge bg-success">Aprobado</span>
                  </td>
                  <td className="text-end">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="btn btn-outline-primary btn-sm"
                    >
                      <i className="bi bi-receipt me-1"></i>Ver Boleta
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipt Modal */}
      {selectedOrder && (
        <ReceiptModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
}
