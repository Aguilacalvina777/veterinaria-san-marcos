import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/storageService';
import ProductCard from '../components/ProductCard';

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'Todas';

  const [products] = useState(() => getProducts());
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSpecies, setSelectedSpecies] = useState('Todas');
  const [sortBy, setSortBy] = useState('name-asc');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category));
    return ['Todas', ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchesSearch =
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.activeIngredient.toLowerCase().includes(search.toLowerCase()) ||
          p.code.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
          selectedCategory === 'Todas' || p.category === selectedCategory;

        const matchesSpecies =
          selectedSpecies === 'Todas' || p.species.includes(selectedSpecies);

        const matchesStock = !onlyInStock || p.stock > 0;

        return matchesSearch && matchesCategory && matchesSpecies && matchesStock;
      })
      .sort((a, b) => {
        const priceA = a.offerPrice || a.price;
        const priceB = b.offerPrice || b.price;
        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
        return 0;
      });
  }, [products, search, selectedCategory, selectedSpecies, sortBy, onlyInStock]);

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="mb-4">
        <h1 className="fw-bold text-dark mb-1">Catálogo de Farmacia & Vacunas</h1>
        <p className="text-muted">
          Medicamentos, vacunas, antiparasitarios y suplementos veterinarios con stock actualizado en tiempo real.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="card shadow-sm border-0 mb-4 p-3 bg-white">
        <div className="row g-3">
          {/* Search box */}
          <div className="col-12 col-md-4">
            <label className="form-label small fw-semibold">Buscar producto</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Nombre, principio activo o código..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                data-testid="search-input"
              />
              {search && (
                <button className="btn btn-outline-secondary" onClick={() => setSearch('')}>
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
          </div>

          {/* Category filter */}
          <div className="col-6 col-md-3">
            <label className="form-label small fw-semibold">Categoría</label>
            <select
              className="form-select"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              data-testid="category-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Species filter */}
          <div className="col-6 col-md-2">
            <label className="form-label small fw-semibold">Especie</label>
            <select
              className="form-select"
              value={selectedSpecies}
              onChange={e => setSelectedSpecies(e.target.value)}
            >
              <option value="Todas">Todas</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
            </select>
          </div>

          {/* Sort */}
          <div className="col-6 col-md-3">
            <label className="form-label small fw-semibold">Ordenar por</label>
            <select
              className="form-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="name-asc">Nombre (A - Z)</option>
              <option value="name-desc">Nombre (Z - A)</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>

        {/* Quick filters row */}
        <div className="d-flex flex-wrap align-items-center justify-content-between mt-3 pt-3 border-top gap-2">
          <div className="form-check form-switch mb-0">
            <input
              className="form-check-input"
              type="checkbox"
              id="stockSwitch"
              checked={onlyInStock}
              onChange={e => setOnlyInStock(e.target.checked)}
            />
            <label className="form-check-label small" htmlFor="stockSwitch">
              Mostrar solo productos con stock disponible
            </label>
          </div>

          <div className="small text-muted">
            Mostrando <strong>{filteredProducts.length}</strong> de {products.length} productos
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="row g-4" data-testid="products-grid">
          {filteredProducts.map(product => (
            <div key={product.code} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <ProductCard product={product} onViewDetail={setSelectedProduct} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5 bg-white rounded-3 shadow-sm p-4">
          <i className="bi bi-inbox fs-1 text-muted mb-2 d-block"></i>
          <h5 className="fw-bold text-dark">No se encontraron productos</h5>
          <p className="text-muted small">
            Intenta cambiar los filtros de búsqueda o categoría.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('Todas');
              setSelectedSpecies('Todas');
              setOnlyInStock(false);
            }}
            className="btn btn-outline-primary btn-sm"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* Product Detail Modal */}
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
                <div className="d-flex gap-2 mb-3">
                  <span className="badge badge-category">{selectedProduct.category}</span>
                  <span className="badge bg-light text-dark border">🐾 {selectedProduct.species}</span>
                  <span className="badge bg-secondary font-monospace">{selectedProduct.code}</span>
                </div>
                <p className="text-muted small">{selectedProduct.description}</p>
                <div className="card bg-light border-0 p-3 mb-3 small">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Principio Activo:</span>
                    <strong>{selectedProduct.activeIngredient}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Presentación:</span>
                    <strong>{selectedProduct.presentation}</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Stock actual:</span>
                    <strong className={selectedProduct.stock > 0 ? 'text-success' : 'text-danger'}>
                      {selectedProduct.stock} unidades
                    </strong>
                  </div>
                </div>
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
