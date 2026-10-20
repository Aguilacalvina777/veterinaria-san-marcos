import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../components/ProductCard';

export default function OrderError() {
  const location = useLocation();
  const navigate = useNavigate();

  const orderData = location.state?.orderData || {
    id: '20240705',
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
    total: 22600
  };

  const handleRetry = () => {
    navigate('/checkout');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-9">
          {/* Error Banner */}
          <div className="card border-0 shadow-sm p-4 p-md-5 mb-4 bg-white text-center">
            <div className="text-danger mb-3">
              <i className="bi bi-x-circle-fill display-3"></i>
            </div>
            <h2 className="fw-bolder text-dark mb-2">
              No se pudo realizar el pago. nro #{orderData.id}
            </h2>
            <p className="text-muted mb-4">
              La transacción fue declinada por la entidad financiera o no se completó la confirmación del pago.
              Tus productos continúan guardados en el carrito para que puedas reintentar.
            </p>

            <div>
              <button
                onClick={handleRetry}
                className="btn btn-success btn-lg px-5 py-3 fw-bold text-uppercase shadow-sm"
              >
                <i className="bi bi-arrow-repeat me-2"></i>Volver a Realizar el Pago
              </button>
            </div>
          </div>

          {/* Details Card */}
          <div className="card border-0 shadow-sm p-4 bg-white mb-4">
            <h5 className="fw-bold text-dark mb-3 pb-2 border-bottom">Detalle de la Compra Reintentable</h5>

            <div className="row g-3 mb-4 small bg-light p-3 rounded">
              <div className="col-md-4">
                <span className="text-muted d-block">Nombre:</span>
                <strong className="text-dark">{orderData.customer?.firstName}</strong>
              </div>
              <div className="col-md-4">
                <span className="text-muted d-block">Apellidos:</span>
                <strong className="text-dark">{orderData.customer?.lastName}</strong>
              </div>
              <div className="col-md-4">
                <span className="text-muted d-block">Correo:</span>
                <strong className="text-dark">{orderData.customer?.email}</strong>
              </div>
            </div>

            <div className="row g-3 mb-4 small bg-light p-3 rounded">
              <div className="col-md-8">
                <span className="text-muted d-block">Calle:</span>
                <strong className="text-dark">{orderData.customer?.street}</strong>
              </div>
              <div className="col-md-4">
                <span className="text-muted d-block">Departamento:</span>
                <strong className="text-dark">{orderData.customer?.apt || 'No aplica'}</strong>
              </div>
              <div className="col-md-6">
                <span className="text-muted d-block">Región:</span>
                <strong className="text-dark">{orderData.customer?.region}</strong>
              </div>
              <div className="col-md-6">
                <span className="text-muted d-block">Comuna:</span>
                <strong className="text-dark">{orderData.customer?.comuna}</strong>
              </div>
            </div>

            {/* Items */}
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
                  {orderData.items?.map((item, idx) => (
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

            <div className="text-end pt-3 border-top">
              <span className="fs-5 fw-bold text-dark me-3">Total adeudado:</span>
              <span className="fs-3 fw-bolder text-danger">
                {formatPrice(orderData.total)}
              </span>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <Link to="/carrito" className="btn btn-outline-secondary">
                <i className="bi bi-cart3 me-2"></i>Revisar carrito
              </Link>
              <button onClick={handleRetry} className="btn btn-success fw-bold">
                Reintentar Pago Ahora &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
