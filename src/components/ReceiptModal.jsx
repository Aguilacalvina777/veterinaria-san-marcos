import React from 'react';
import { formatPrice } from './ProductCard';

export default function ReceiptModal({ order, onClose }) {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header bg-light">
            <h5 className="modal-title fw-bold text-dark">
              <i className="bi bi-receipt me-2 text-teal" style={{ color: '#0d9488' }}></i>
              Boleta Electrónica de Venta
            </h5>
            <button type="button" className="btn-close no-print" onClick={onClose} aria-label="Cerrar"></button>
          </div>

          <div className="modal-body p-4" id="printable-receipt">
            {/* Header */}
            <div className="text-center pb-3 border-bottom mb-4">
              <h3 className="fw-bolder mb-1" style={{ color: '#0d9488' }}>🐾 VETERINARIA SAN MARCOS</h3>
              <p className="text-muted small mb-1">RUT: 76.543.210-K | Giro: Servicios Veterinarios y Farmacia</p>
              <p className="text-muted small mb-1">Av. Libertador Bernardo O'Higgins 450, Rancagua</p>
              <div className="badge bg-dark fs-6 px-3 py-2 mt-2">
                BOLETA ELECTRÓNICA Nº {order.id || '20240705'}
              </div>
            </div>

            {/* Info grid */}
            <div className="row mb-4 small">
              <div className="col-sm-6 mb-2">
                <strong>Fecha de emisión:</strong> {new Date(order.createdAt).toLocaleDateString('es-CL', {
                  year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                })} <br />
                <strong>Medio de pago:</strong> {order.paymentMethod || 'Webpay Plus / Tarjeta'} <br />
                <strong>Estado del pago:</strong> <span className="badge bg-success">Aprobado</span>
              </div>
              <div className="col-sm-6 mb-2">
                <strong>Cliente:</strong> {order.customer?.firstName} {order.customer?.lastName} <br />
                <strong>Email:</strong> {order.customer?.email} <br />
                <strong>Dirección:</strong> {order.customer?.street} {order.customer?.apt ? `, ${order.customer?.apt}` : ''}, {order.customer?.comuna}
              </div>
            </div>

            {/* Table */}
            <div className="table-responsive mb-4">
              <table className="table table-bordered table-sm align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Código</th>
                    <th>Descripción</th>
                    <th className="text-center">Cant.</th>
                    <th className="text-end">P. Unitario</th>
                    <th className="text-end">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items?.map((item, idx) => (
                    <tr key={idx}>
                      <td className="font-monospace small">{item.code}</td>
                      <td>{item.name}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-end">{formatPrice(item.price)}</td>
                      <td className="text-end fw-semibold">{formatPrice(item.subtotal || item.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="4" className="text-end fw-bold">Total Pagado:</td>
                    <td className="text-end fw-bolder fs-6 text-teal" style={{ color: '#0d9488' }}>
                      {formatPrice(order.total)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {order.customer?.notes && (
              <div className="p-2 bg-light rounded small text-muted mb-3">
                <strong>Instrucciones de entrega:</strong> {order.customer.notes}
              </div>
            )}

            <div className="text-center small text-muted mt-3">
              ¡Gracias por confiar la salud de tu mascota a Veterinaria San Marcos! <br />
              Documento tributario digital válido para efectos de garantía.
            </div>
          </div>

          <div className="modal-footer bg-light no-print">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
              Cerrar
            </button>
            <button type="button" className="btn btn-primary" onClick={handlePrint}>
              <i className="bi bi-printer me-2"></i>Imprimir Boleta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
