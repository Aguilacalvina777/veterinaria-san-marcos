import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCriticalStockProducts
} from '../../services/storageService';
import { formatPrice } from '../../components/ProductCard';

export default function AdminProducts() {
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') === 'critical';

  const [products, setProducts] = useState(() => getProducts());
  const [search, setSearch] = useState('');
  const [showCriticalOnly, setShowCriticalOnly] = useState(initialFilter);

  // Modal create/edit
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    code: '',
    name: '',
    category: 'Antibióticos',
    activeIngredient: '',
    presentation: 'Blíster 10 comp.',
    species: 'Perro / Gato',
    stock: 20,
    criticalStock: 15,
    price: 5000,
    offerPrice: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60'
  });

  const refresh = () => setProducts(getProducts());

  const handleOpenCreate = () => {
    setIsEditing(false);
    setCurrentProduct({
      code: `ME0${products.length + 1}`,
      name: '',
      category: 'Antibióticos',
      activeIngredient: '',
      presentation: 'Blíster 10 comp.',
      species: 'Perro / Gato',
      stock: 25,
      criticalStock: 15,
      price: 6000,
      offerPrice: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (p) => {
    setIsEditing(true);
    setCurrentProduct({
      ...p,
      offerPrice: p.offerPrice ? String(p.offerPrice) : ''
    });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!currentProduct.name || !currentProduct.code) return;

    if (isEditing) {
      updateProduct(currentProduct.code, currentProduct);
    } else {
      createProduct(currentProduct);
    }

    setShowModal(false);
    refresh();
  };

  const handleDelete = (code) => {
    if (window.confirm(`¿Estás seguro de eliminar el producto ${code}?`)) {
      deleteProduct(code);
      refresh();
    }
  };

  const filtered = products.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.code.toLowerCase().includes(search.toLowerCase()) ||
      p.activeIngredient.toLowerCase().includes(search.toLowerCase());
    const matchCritical = !showCriticalOnly || p.stock <= (p.criticalStock || 20);
    return matchSearch && matchCritical;
  });

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold text-dark mb-1">Inventario de Productos y Farmacia</h2>
          <p className="text-muted small mb-0">
            Control de medicamentos, stock crítico, precios y reposición en bodega.
          </p>
        </div>

        <button onClick={handleOpenCreate} className="btn btn-primary fw-semibold" data-testid="btn-new-product">
          <i className="bi bi-plus-lg me-1"></i>Nuevo Producto
        </button>
      </div>

      {/* Filter Bar */}
      <div className="card border-0 shadow-sm p-3 mb-4 bg-white">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Buscar por código, nombre o principio activo..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="col-12 col-md-6 d-flex justify-content-md-end gap-2">
            <button
              onClick={() => setShowCriticalOnly(!showCriticalOnly)}
              className={`btn btn-sm ${showCriticalOnly ? 'btn-danger' : 'btn-outline-danger'}`}
            >
              <i className="bi bi-exclamation-triangle-fill me-1"></i>
              Listado Productos Críticos ({getCriticalStockProducts().length})
            </button>
            {showCriticalOnly && (
              <button onClick={() => setShowCriticalOnly(false)} className="btn btn-outline-secondary btn-sm">
                Ver todos
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="card border-0 shadow-sm bg-white overflow-hidden">
        <div className="table-responsive">
          <table className="table align-middle mb-0 table-hover">
            <thead className="table-light small">
              <tr>
                <th>Código</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Especie</th>
                <th className="text-center">Stock</th>
                <th className="text-end">Precio Unitario</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody className="small">
              {filtered.map(p => {
                const isCrit = p.stock <= (p.criticalStock || 20);
                return (
                  <tr key={p.code} data-testid={`admin-product-row-${p.code}`}>
                    <td className="font-monospace fw-bold text-teal" style={{ color: '#0d9488' }}>
                      {p.code}
                    </td>
                    <td>
                      <div className="fw-bold text-dark">{p.name}</div>
                      <div className="text-muted small">{p.activeIngredient} &bull; {p.presentation}</div>
                    </td>
                    <td>
                      <span className="badge badge-category">{p.category}</span>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">🐾 {p.species}</span>
                    </td>
                    <td className="text-center">
                      {isCrit ? (
                        <span className="badge badge-critical px-2 py-1">
                          ⚠️ {p.stock} unid. (Crítico)
                        </span>
                      ) : (
                        <span className="badge bg-success-subtle text-success px-2 py-1">
                          {p.stock} unid.
                        </span>
                      )}
                    </td>
                    <td className="text-end">
                      {p.offerPrice ? (
                        <div>
                          <span className="text-danger fw-bold">{formatPrice(p.offerPrice)}</span> <br />
                          <span className="text-muted text-decoration-line-through small">{formatPrice(p.price)}</span>
                        </div>
                      ) : (
                        <span className="fw-bold">{formatPrice(p.price)}</span>
                      )}
                    </td>
                    <td className="text-end">
                      <div className="btn-group btn-group-sm">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="btn btn-outline-primary"
                          title="Editar producto"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(p.code)}
                          className="btn btn-outline-danger"
                          title="Eliminar producto"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Create/Edit */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  {isEditing ? `Editar Producto: ${currentProduct.code}` : 'Nuevo Producto / Medicamento'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSave}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-3">
                      <label className="form-label small fw-semibold">Código *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={currentProduct.code}
                        onChange={e => setCurrentProduct({ ...currentProduct, code: e.target.value })}
                        required
                        disabled={isEditing}
                      />
                    </div>

                    <div className="col-md-5">
                      <label className="form-label small fw-semibold">Nombre Comercial *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ej: Amoxibay 250mg"
                        value={currentProduct.name}
                        onChange={e => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Categoría *</label>
                      <select
                        className="form-select"
                        value={currentProduct.category}
                        onChange={e => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                      >
                        <option value="Antibióticos">Antibióticos</option>
                        <option value="Antiparasitarios">Antiparasitarios</option>
                        <option value="Antiinflamatorios">Antiinflamatorios</option>
                        <option value="Dermatología">Dermatología</option>
                        <option value="Digestivo">Digestivo</option>
                        <option value="Cardíaco">Cardíaco</option>
                        <option value="Analgésicos">Analgésicos</option>
                        <option value="Vacunas">Vacunas</option>
                        <option value="Suplementos">Suplementos</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Principio Activo</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ej: Amoxicilina"
                        value={currentProduct.activeIngredient}
                        onChange={e => setCurrentProduct({ ...currentProduct, activeIngredient: e.target.value })}
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label small fw-semibold">Presentación</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Blíster 10 comp."
                        value={currentProduct.presentation}
                        onChange={e => setCurrentProduct({ ...currentProduct, presentation: e.target.value })}
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label small fw-semibold">Especie</label>
                      <select
                        className="form-select"
                        value={currentProduct.species}
                        onChange={e => setCurrentProduct({ ...currentProduct, species: e.target.value })}
                      >
                        <option value="Perro / Gato">Perro / Gato</option>
                        <option value="Perro">Perro</option>
                        <option value="Gato">Gato</option>
                        <option value="Ave / Conejo">Ave / Conejo</option>
                      </select>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label small fw-semibold">Stock Actual</label>
                      <input
                        type="number"
                        className="form-control"
                        value={currentProduct.stock}
                        onChange={e => setCurrentProduct({ ...currentProduct, stock: e.target.value })}
                        required
                        min="0"
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label small fw-semibold">Stock Crítico</label>
                      <input
                        type="number"
                        className="form-control"
                        value={currentProduct.criticalStock}
                        onChange={e => setCurrentProduct({ ...currentProduct, criticalStock: e.target.value })}
                        required
                        min="1"
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label small fw-semibold">Precio (CLP) *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={currentProduct.price}
                        onChange={e => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                        required
                        min="0"
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label small fw-semibold">Precio Oferta (opcional)</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Opcional"
                        value={currentProduct.offerPrice}
                        onChange={e => setCurrentProduct({ ...currentProduct, offerPrice: e.target.value })}
                        min="0"
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold">Descripción</label>
                      <textarea
                        rows="2"
                        className="form-control"
                        value={currentProduct.description}
                        onChange={e => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary fw-semibold">
                    {isEditing ? 'Guardar Cambios' : 'Crear Producto'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
