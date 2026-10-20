import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { formatPrice } from '../components/ProductCard';
import ReceiptModal from '../components/ReceiptModal';

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // If accessed directly without state, fallback to sample order
  const order = location.state?.order || {
    id: '20240705',
    createdAt: new Date().toISOString(),
    customer: {
      firstName: 'pedro',
      lastName: 'hacker',
      email: 'pedro.hacker20@example.com',
      street: 'Los crisantemos, Edificio Norte',
      apt: 'Depto 603',
      region: 'Región Metropolitana de Santiago',
      comuna: 'Cerrillos',
      notes: 'El martes no estaremos en el depto, pero puede dejárselo con el conserje.'
    },
    items: [
      {
        code: 'ME004',
        name: 'Nexgard Masticable',
        price: 9500,
        quantity: 1,
        subtotal: 9500,
        image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&auto=format&fit=crop&q=60'
      },
      {
        code: 'ME001',
        name: 'Amoxibay 250mg',
        price: 4200,
        quantity: 1,
        subtotal: 4200,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60'
      },
      {
        code: 'ME021',
        name: 'Omega Vet 3-6-9',
        price: 8900,
        quantity: 1,
        subtotal: 8900,
        image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=500&auto=format&fit=crop&q=60'
      }
    ],
    total: 22600,
    paymentMethod: 'Webpay Plus / Débito'
  };

  useEffect(() => {
    // Confetti effect on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignored if canvas not available
    }
  }, []);

  const handleSendEmail = () => {
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 4000);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-9">
          {/* Success Header Card */}
          <div className="card border-0 shadow-sm p-4 p-md-5 mb-4 bg-white text-center">
            <div className="text-success mb-3">
              <i className="bi bi-check-circle-fill display-3"></i>
            </div>
            <h2 className="fw-bolder text-dark mb-2">
              Se ha realizado la compra. nro #{order.id}
            </h2>
            <p className="text-muted mb-0">
              ¡Muchas gracias por tu compra en Veterinaria San Marcos! Hemos recibido tu pago correctamente.
            </p>
          </div>

          {/* Details Card matching Figure 7 */}
          <div className="card border-0 shadow-sm p-4 bg-white mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
              <h5 className="fw-bold text-dark mb-0">Resumen de la Orden</h5>
              <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2">
                Pago Aprobado
              </span>
            </div>

            {/* Customer information */}
            <h6 className="fw-bold text-muted small text-uppercase mb-3">Información del Cliente</h6>
            <div className="row g-3 mb-4 small bg-light p-3 rounded">
              <div className="col-md-4">
                <span className="text-muted d-block">Nombre:</span>
                <strong className="text-dark">{order.customer?.firstName}</strong>
              </div>
              <div className="col-md-4">
                <span className="text-muted d-block">Apellidos:</span>
                <strong className="text-dark">{order.customer?.lastName}</strong>
              </div>
              <div className="col-md-4">
                <span className="text-muted d-block">Correo:</span>
                <strong className="text-dark">{order.customer?.email}</strong>
              </div>
            </div>

            {/* Delivery Address */}
            <h6 className="fw-bold text-muted small text-uppercase mb-3">Dirección de Entrega</h6>
            <div className="row g-3 mb-4 small bg-light p-3 rounded">
              <div className="col-md-8">
                <span className="text-muted d-block">Calle:</span>
                <strong className="text-dark">{order.customer?.street}</strong>
              </div>
              <div className="col-md-4">
                <span className="text-muted d-block">Departamento:</span>
                <strong className="text-dark">{order.customer?.apt || 'No aplica'}</strong>
              </div>
              <div className="col-md-6">
                <span className="text-muted d-block">Región:</span>
                <strong className="text-dark">{order.customer?.region}</strong>
              </div>
              <div className="col-md-6">
                <span className="text-muted d-block">Comuna:</span>
                <strong className="text-dark">{order.customer?.comuna}</strong>
              </div>
              {order.customer?.notes && (
                <div className="col-12">
                  <span className="text-muted d-block">Indicaciones de entrega:</span>
                  <span className="text-dark">{order.customer.notes}</span>
                </div>
              )}
            </div>

            {/* Items table */}
            <h6 className="fw-bold text-muted small text-uppercase mb-3">Productos Adquiridos</h6>
            <div className="table-responsive mb-4">
              <table className="table align-middle table-sm">
                <thead className="table-light small">
                  <tr>
                    <th style={{ width: '60px' }}>Imagen</th>
                    <th>Nombre</th>
                    <th className="text-end">Precio</th>
                    <th className="text-center">Cantidad</th>
                    <th className="text-end">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="small">
                  {order.items?.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        <img
                          src={item.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100'}
                          alt={item.name}
                          style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '4px' }}
                        />
                      </td>
                      <td className="fw-semibold">{item.name}</td>
                      <td className="text-end">{formatPrice(item.price)}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-end fw-bold">{formatPrice(item.subtotal || item.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total */}
            <div className="text-end mb-4 pt-3 border-top">
              <span className="fs-5 fw-bold text-dark me-3">Total pagado:</span>
              <span className="fs-3 fw-bolder text-teal" style={{ color: '#0d9488' }}>
                {formatPrice(order.total)}
              </span>
            </div>

            {/* Email notice if clicked */}
            {emailSent && (
              <div className="alert alert-success py-2 px-3 small d-flex align-items-center mb-3">
                <i className="bi bi-check-circle-fill me-2"></i>
                <span>¡Copia de la boleta y comprobante enviados a <strong>{order.customer?.email}</strong>!</span>
              </div>
            )}

            {/* Actions matching Figure 7 */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 pt-2">
              <Link to="/catalogo" className="btn btn-outline-secondary">
                <i className="bi bi-shop me-2"></i>Volver a la tienda
              </Link>

              <div className="d-flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowReceiptModal(true)}
                  className="btn btn-danger fw-semibold"
                >
                  <i className="bi bi-file-earmark-pdf me-2"></i>Imprimir boleta en PDF
                </button>
                <button
                  type="button"
                  onClick={handleSendEmail}
                  className="btn btn-primary fw-semibold"
                >
                  <i className="bi bi-envelope-at me-2"></i>Enviar boleta por email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Receipt Modal */}
      {showReceiptModal && (
        <ReceiptModal order={order} onClose={() => setShowReceiptModal(false)} />
      )}
    </div>
  );
}
