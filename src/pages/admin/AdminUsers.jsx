import React, { useState } from 'react';
import { getUsers, createUser, updateUser, toggleUserStatus } from '../../services/storageService';

export default function AdminUsers() {
  const [users, setUsers] = useState(() => getUsers());
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: '',
    name: '',
    email: '',
    role: 'Dueño de mascota',
    phone: '',
    rut: '',
    password: ''
  });

  const refresh = () => setUsers(getUsers());

  const handleOpenCreate = () => {
    setIsEditing(false);
    setCurrentUser({
      id: '',
      name: '',
      email: '',
      role: 'Dueño de mascota',
      phone: '',
      rut: '',
      password: '123'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (user) => {
    setIsEditing(true);
    setCurrentUser({ ...user });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!currentUser.name || !currentUser.email) return;

    if (isEditing) {
      updateUser(currentUser.id, currentUser);
    } else {
      createUser(currentUser);
    }

    setShowModal(false);
    refresh();
  };

  const handleToggle = (id) => {
    toggleUserStatus(id);
    refresh();
  };

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold text-dark mb-1">Gestión de Usuarios y Roles (RBAC)</h2>
          <p className="text-muted small mb-0">
            Administración centralizada de cuentas de personal clínico y clientes tutores.
          </p>
        </div>

        <button onClick={handleOpenCreate} className="btn btn-primary fw-semibold">
          <i className="bi bi-person-plus-fill me-1"></i>Nuevo Usuario
        </button>
      </div>

      {/* Search */}
      <div className="card border-0 shadow-sm p-3 mb-4 bg-white">
        <div className="row">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Buscar por nombre, email o rol..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card border-0 shadow-sm bg-white overflow-hidden">
        <div className="table-responsive">
          <table className="table align-middle mb-0 table-hover">
            <thead className="table-light small">
              <tr>
                <th>Usuario</th>
                <th>Rol Asignado</th>
                <th>Contacto</th>
                <th>RUT</th>
                <th className="text-center">Estado</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody className="small">
              {filtered.map(u => (
                <tr key={u.id}>
                  <td>
                    <div className="fw-bold text-dark">{u.name}</div>
                    <div className="text-muted small">{u.email}</div>
                  </td>
                  <td>
                    <span className={`badge ${
                      u.role === 'Administrador' ? 'bg-danger' :
                      u.role === 'Recepcionista' ? 'bg-info text-dark' : 'bg-success'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <div>{u.phone || 'No registrado'}</div>
                  </td>
                  <td className="font-monospace small">
                    {u.rut || 'N/A'}
                  </td>
                  <td className="text-center">
                    {u.active ? (
                      <span className="badge bg-success-subtle text-success">Activo</span>
                    ) : (
                      <span className="badge bg-danger-subtle text-danger">Desactivado</span>
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group btn-group-sm">
                      <button
                        onClick={() => handleOpenEdit(u)}
                        className="btn btn-outline-primary"
                        title="Editar usuario"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        onClick={() => handleToggle(u.id)}
                        className={`btn ${u.active ? 'btn-outline-warning' : 'btn-outline-success'}`}
                        title={u.active ? 'Desactivar cuenta' : 'Activar cuenta'}
                      >
                        <i className={`bi ${u.active ? 'bi-person-x' : 'bi-person-check'}`}></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  {isEditing ? `Editar Usuario: ${currentUser.name}` : 'Crear Nuevo Usuario'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSave}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Nombre Completo *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={currentUser.name}
                      onChange={e => setCurrentUser({ ...currentUser, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Correo Electrónico *</label>
                    <input
                      type="email"
                      className="form-control"
                      value={currentUser.email}
                      onChange={e => setCurrentUser({ ...currentUser, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Rol en el Sistema *</label>
                    <select
                      className="form-select"
                      value={currentUser.role}
                      onChange={e => setCurrentUser({ ...currentUser, role: e.target.value })}
                    >
                      <option value="Administrador">Administrador (Acceso Total)</option>
                      <option value="Recepcionista">Recepcionista / Operador (Gestión Citas y Fichas)</option>
                      <option value="Dueño de mascota">Dueño de mascota (Cliente)</option>
                    </select>
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Teléfono</label>
                      <input
                        type="text"
                        className="form-control"
                        value={currentUser.phone}
                        onChange={e => setCurrentUser({ ...currentUser, phone: e.target.value })}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">RUT</label>
                      <input
                        type="text"
                        className="form-control"
                        value={currentUser.rut}
                        onChange={e => setCurrentUser({ ...currentUser, rut: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      value={currentUser.password}
                      onChange={e => setCurrentUser({ ...currentUser, password: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary fw-semibold">
                    {isEditing ? 'Guardar Cambios' : 'Crear Usuario'}
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
