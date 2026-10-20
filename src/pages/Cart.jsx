import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../components/ProductCard';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, total, itemCount } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="card shadow-sm border-0 p-5 max-w-md mx-auto bg-white">
          <i className="bi bi-cart-x fs-1 text-muted mb-3"></i>
          <h3 className="fw-bold text-dark">Tu carrito está vacío</h3>
          <p className="text-muted">Aún no has agregado ningún medicamento, vacuna o producto.</p>
          <div className="mt-3">
            <Link to="/catalogo" className="btn btn-primary px-4 fw-semibold">
              <i className="bi bi-shop me-2"></i>Ir a la Farmacia
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold text-dark mb-1">Carrito de Compras</h1>
          <p className="text-muted mb-0">Revisa los productos seleccionados antes de pasar al pago.</p>
        </div>
        <button
          onClick={clearCart}
          className="btn btn-outline-danger btn-sm"
          title="Vaciar todo el carrito"
        >
          <i className="bi bi-trash3 me-1"></i>Limpiar Carrito
        </button>
      </div>

      <div className="row g-4">
        {/* Table of items */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm bg-white overflow-hidden">
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: '80px' }}>Imagen</th>
                    <th>Nombre</th>
                    <th className="text-end">Precio</th>
                    <th className="text-center" style={{ width: '130px' }}>Cantidad</th>
                    <th className="text-end">Subtotal</th>
                    <th className="text-center" style={{ width: '60px' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => {
                    const unitPrice = item.product.offerPrice || item.product.price;
                    const subtotal = unitPrice * item.quantity;

                    return (
                      <tr key={item.product.code} data-testid={`cart-row-${item.product.code}`}>
                        <td>
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="rounded object-fit-cover"
                            style={{ width: '60px', height: '60px' }}
                          />
                        </td>
                        <td>
                          <div className="fw-bold text-dark">{item.product.name}</div>
                          <div className="small text-muted font-monospace">{item.product.code}</div>
                          <div className="small text-muted">{item.product.presentation}</div>
                        </td>
                        <td className="text-end">
                          {item.product.offerPrice ? (
                            <div>
                              <span className="text-danger fw-bold">{formatPrice(unitPrice)}</span> <br />
                              <span className="text-muted small text-decoration-line-through">
                                {formatPrice(item.product.price)}
                              </span>
                            </div>
                          ) : (
                            <span className="fw-semibold">{formatPrice(unitPrice)}</span>
                          )}
                        </td>
                        <td>
                          <div className="input-group input-group-sm">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => updateQuantity(item.product.code, item.quantity - 1)}
                              aria-label="Disminuir cantidad"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              className="form-control text-center"
                              value={item.quantity}
                              readOnly
                            />
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => updateQuantity(item.product.code, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stock}
                              aria-label="Aumentar cantidad"
                            >
                              +
                            </button>
                          </div>
                          {item.quantity >= item.product.stock && (
                            <div className="text-danger small mt-1 text-center" style={{ fontSize: '0.7rem' }}>
                              Máx. stock alcanzado
                            </div>
                          )}
                        </td>
                        <td className="text-end fw-bold text-teal" style={{ color: '#0d9488' }}>
                          {formatPrice(subtotal)}
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() => removeFromCart(item.product.code)}
                            className="btn btn-link text-danger p-0"
                            title="Eliminar producto"
                            data-testid={`remove-${item.product.code}`}
                          >
                            <i className="bi bi-trash fs-5"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-3">
            <Link to="/catalogo" className="btn btn-outline-secondary btn-sm">
              <i className="bi bi-arrow-left me-1"></i>Seguir comprando
            </Link>
          </div>
        </div>

        {/* Summary */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 bg-white">
            <h5 className="fw-bold text-dark mb-3">Resumen del Pedido</h5>

            <div className="d-flex justify-content-between mb-2 small text-muted">
              <span>Productos ({itemCount} unid.):</span>
              <span>{formatPrice(total)}</span>
            </div>

            <div className="d-flex justify-content-between mb-2 small text-muted">
              <span>Envío o retiro en clínica:</span>
              <span className="text-success fw-semibold">Gratis</span>
            </div>

            <div className="d-flex justify-content-between mb-3 small text-muted">
              <span>IVA incluido (19%):</span>
              <span>{formatPrice(Math.round(total * 0.19))}</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between mb-4">
              <span className="fs-5 fw-bold text-dark">Total a pagar:</span>
              <span className="fs-4 fw-bolder text-teal" style={{ color: '#0d9488' }} data-testid="cart-total-amount">
                {formatPrice(total)}
              </span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-primary w-100 py-3 fw-bold fs-6 shadow-sm"
              data-testid="btn-checkout"
            >
              <i className="bi bi-credit-card me-2"></i>Comprar ahora
            </button>

            <div className="mt-3 text-center small text-muted">
              <i className="bi bi-shield-lock me-1"></i>Pago 100% seguro y garantizado
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
