import React, { useState } from 'react';
import { getProducts, getServices } from '../../services/storageService';

export default function AdminCategories() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Antibióticos', type: 'Farmacia', description: 'Tratamientos antimicrobianos de amplio espectro' },
    { id: 2, name: 'Antiparasitarios', type: 'Farmacia', description: 'Control de pulgas, garrapatas y parásitos internos' },
    { id: 3, name: 'Antiinflamatorios', type: 'Farmacia', description: 'AINEs para analgesia y procesos inflamatorios' },
    { id: 4, name: 'Dermatología', type: 'Farmacia', description: 'Shampoos medicados y control de alergias cutáneas' },
    { id: 5, name: 'Digestivo', type: 'Farmacia', description: 'Probióticos y protectores de mucosa gastrointestinal' },
    { id: 6, name: 'Cardíaco', type: 'Farmacia', description: 'Soporte cardiovascular e inodilatadores' },
    { id: 7, name: 'Analgésicos', type: 'Farmacia', description: 'Manejo del dolor agudo y crónico' },
    { id: 8, name: 'Vacunas', type: 'Farmacia', description: 'Biológicos para inmunización activa' },
    { id: 9, name: 'Suplementos', type: 'Farmacia', description: 'Ácidos grasos y condroprotectores articulares' },
    { id: 10, name: 'Consultas', type: 'Servicio Clínico', description: 'Evaluación general y de urgencia' },
    { id: 11, name: 'Vacunación', type: 'Servicio Clínico', description: 'Aplicación profesional de vacunas SAG' },
    { id: 12, name: 'Cirugía', type: 'Servicio Clínico', description: 'Quirófano mayor y menor' },
    { id: 13, name: 'Desparasitación', type: 'Servicio Clínico', description: 'Dosificación por peso exacto' },
    { id: 14, name: 'Exámenes', type: 'Servicio Clínico', description: 'Laboratorio e imagenología digital' },
    { id: 15, name: 'Otros', type: 'Servicio Clínico', description: 'Microchip, dental y hospitalización' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newCat, setNewCat] = useState({ name: '', type: 'Farmacia', description: '' });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newCat.name.trim()) return;

    setCategories([
      ...categories,
      { id: Date.now(), name: newCat.name, type: newCat.type, description: newCat.description }
    ]);
    setShowModal(false);
    setNewCat({ name: '', type: 'Farmacia', description: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Deseas eliminar esta categoría?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const products = getProducts();
  const services = getServices();

  const getUsageCount = (cat) => {
    if (cat.type === 'Farmacia') {
      return products.filter(p => p.category === cat.name).length;
    }
    return services.filter(s => s.category === cat.name).length;
  };

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold text-dark mb-1">Gestión de Categorías</h2>
          <p className="text-muted small mb-0">
            Clasificación de productos de farmacia y servicios clínicos de la clínica.
          </p>
        </div>

        <button onClick={() => setShowModal(true)} className="btn btn-primary fw-semibold">
          <i className="bi bi-plus-lg me-1"></i>Nueva Categoría
        </button>
      </div>

      <div className="card border-0 shadow-sm bg-white overflow-hidden">
        <div className="table-responsive">
          <table className="table align-middle mb-0 table-hover">
            <thead className="table-light small">
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Descripción</th>
                <th className="text-center">Elementos Asociados</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody className="small">
              {categories.map(c => (
                <tr key={c.id}>
                  <td className="fw-bold text-dark">{c.name}</td>
                  <td>
                    <span className={`badge ${c.type === 'Farmacia' ? 'bg-info text-dark' : 'bg-primary'}`}>
                      {c.type}
                    </span>
                  </td>
                  <td className="text-muted">{c.description}</td>
                  <td className="text-center">
                    <span className="badge bg-light text-dark border">
                      {getUsageCount(c)} ítems
                    </span>
                  </td>
                  <td className="text-end">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="btn btn-outline-danger btn-sm"
                      title="Eliminar categoría"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Crear Nueva Categoría</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleCreate}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Nombre de la Categoría *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ej: Fisioterapia, Oncología..."
                      value={newCat.name}
                      onChange={e => setNewCat({ ...newCat, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Tipo de Recurso</label>
                    <select
                      className="form-select"
                      value={newCat.type}
                      onChange={e => setNewCat({ ...newCat, type: e.target.value })}
                    >
                      <option value="Farmacia">Farmacia / Medicamento</option>
                      <option value="Servicio Clínico">Servicio Clínico / Prestación</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Descripción</label>
                    <textarea
                      rows="2"
                      className="form-control"
                      value={newCat.description}
                      onChange={e => setNewCat({ ...newCat, description: e.target.value })}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary fw-semibold">
                    Guardar Categoría
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
