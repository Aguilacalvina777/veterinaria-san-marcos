import React, { useState } from 'react';
import { getProducts } from '../services/storageService';
import ProductCard from '../components/ProductCard';

export default function Offers() {
  const [products] = useState(() => getProducts().filter(p => p.offerPrice != null));
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="container py-5">
      {/* Banner */}
      <div className="p-4 p-md-5 mb-5 rounded-4 bg-gradient text-white shadow-sm" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}>
        <div className="row align-items-center">
          <div className="col-lg-8">
            <span className="badge bg-warning text-dark fw-bold mb-2 px-3 py-2">
              🔥 PRECIOS ESPECIALES DEL MES
            </span>
            <h1 className="display-5 fw-bold mb-3">Ofertas y Descuentos Exclusivos</h1>
            <p className="lead mb-0 opacity-90">
              Aprovecha rebajas directas en antiparasitarios, shampoos dermatológicos, vacunas y antiinflamatorios
              para mantener a tu regalón siempre protegido al mejor precio.
            </p>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold text-dark mb-0">Productos en Promoción ({products.length})</h4>
        <span className="badge bg-danger fs-6 px-3 py-2">Hasta 20% OFF</span>
      </div>

      <div className="row g-4">
        {products.map(product => (
          <div key={product.code} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ProductCard product={product} onViewDetail={setSelectedProduct} />
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">{selectedProduct.name}</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedProduct(null)}></button>
              </div>
              <div className="modal-body">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="img-fluid rounded mb-3 w-100"
                  style={{ maxHeight: '240px', objectFit: 'cover' }}
                />
                <p className="text-muted small">{selectedProduct.description}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedProduct(null)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
