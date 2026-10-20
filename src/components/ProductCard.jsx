import React from 'react';
import { useCart } from '../context/CartContext';

export function formatPrice(amount) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(amount);
}

export default function ProductCard({ product, onViewDetail }) {
  const { addToCart } = useCart();
  const isOutOfStock = product.stock <= 0;
  const isCriticalStock = product.stock > 0 && product.stock <= (product.criticalStock || 20);

  const handleAdd = (e) => {
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart(product, 1);
    }
  };

  return (
    <div className="card h-100 card-hover shadow-sm border-0 position-relative d-flex flex-column" data-testid={`product-card-${product.code}`}>
      {/* Badges top */}
      <div className="position-absolute top-0 start-0 m-2 d-flex flex-column gap-1" style={{ zIndex: 2 }}>
        <span className="badge badge-category">{product.category}</span>
        {product.offerPrice && (
          <span className="badge bg-danger shadow-sm">
            ¡OFERTA!
          </span>
        )}
      </div>

      <div className="position-absolute top-0 end-0 m-2" style={{ zIndex: 2 }}>
        <span className="badge bg-light text-dark border">
          🐾 {product.species}
        </span>
      </div>

      {/* Image */}
      <div
        className="ratio ratio-4x3 bg-light rounded-top overflow-hidden"
        style={{ cursor: 'pointer' }}
        onClick={() => onViewDetail && onViewDetail(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="img-fluid object-fit-cover w-100 h-100"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="card-body d-flex flex-column p-3">
        <div className="small text-muted mb-1 font-monospace">{product.code}</div>
        <h5
          className="card-title text-dark fw-bold mb-1 text-truncate"
          title={product.name}
          style={{ cursor: 'pointer' }}
          onClick={() => onViewDetail && onViewDetail(product)}
        >
          {product.name}
        </h5>

        <div className="small text-muted mb-2">
          <strong>P. Activo:</strong> {product.activeIngredient} <br />
          <strong>Presentación:</strong> {product.presentation}
        </div>

        {/* Stock status indicator */}
        <div className="mb-3 small">
          {isOutOfStock ? (
            <span className="text-danger fw-semibold">
              <span className="stock-dot stock-critical"></span>Sin Stock
            </span>
          ) : isCriticalStock ? (
            <span className="text-warning fw-semibold" title="Stock bajo en reposición">
              <span className="stock-dot stock-low"></span>¡Últimas {product.stock} unid.!
            </span>
          ) : (
            <span className="text-success fw-semibold">
              <span className="stock-dot stock-good"></span>Stock: {product.stock} unid.
            </span>
          )}
        </div>

        {/* Pricing & CTA */}
        <div className="mt-auto pt-2 border-top d-flex align-items-center justify-content-between">
          <div>
            {product.offerPrice ? (
              <div>
                <span className="text-decoration-line-through text-muted small me-1">
                  {formatPrice(product.price)}
                </span>
                <span className="fw-bolder fs-5 text-danger">
                  {formatPrice(product.offerPrice)}
                </span>
              </div>
            ) : (
              <span className="fw-bolder fs-5 text-dark">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <div className="d-flex gap-1">
            <button
              onClick={() => onViewDetail && onViewDetail(product)}
              className="btn btn-outline-secondary btn-sm"
              title="Ver detalles"
              aria-label="Ver detalles"
            >
              <i className="bi bi-eye"></i>
            </button>
            <button
              onClick={handleAdd}
              disabled={isOutOfStock}
              className={`btn btn-sm ${isOutOfStock ? 'btn-secondary' : 'btn-primary'}`}
              title={isOutOfStock ? 'Sin stock disponible' : 'Agregar al carrito'}
              data-testid={`add-to-cart-${product.code}`}
            >
              <i className="bi bi-cart-plus me-1"></i>
              <span className="d-none d-xl-inline">Agregar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
