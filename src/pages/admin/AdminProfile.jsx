import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateUser } from '../../services/storageService';

export default function AdminProfile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (user) {
      updateUser(user.id, { name, phone });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <div className="container-fluid">
      <div className="mb-4">
        <h2 className="fw-bold text-dark mb-1">Mi Perfil de Usuario</h2>
        <p className="text-muted small">Información de cuenta y permisos del sistema.</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm p-4 bg-white">
            {saved && (
              <div className="alert alert-success py-2 px-3 small d-flex align-items-center mb-3">
                <i className="bi bi-check-circle-fill me-2"></i>
                <span>¡Perfil actualizado con éxito!</span>
              </div>
            )}

            <div className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center fs-2 bg-light text-teal"
                style={{ width: '70px', height: '70px', color: '#0d9488' }}
              >
                <i className="bi bi-person-circle"></i>
              </div>
              <div>
                <h4 className="fw-bold text-dark mb-1">{user?.name}</h4>
                <div className="text-muted small mb-1">{user?.email}</div>
                <span className="badge bg-primary">{user?.role}</span>
              </div>
            </div>

            <form onSubmit={handleSave}>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Nombre Completo</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Correo Electrónico (No modificable)</label>
                <input
                  type="email"
                  className="form-control bg-light"
                  value={user?.email || ''}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Teléfono de Contacto</label>
                <input
                  type="text"
                  className="form-control"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label small fw-semibold">Rol Asignado</label>
                <input
                  type="text"
                  className="form-control bg-light"
                  value={user?.role || ''}
                  disabled
                />
              </div>

              <button type="submit" className="btn btn-primary fw-semibold">
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
