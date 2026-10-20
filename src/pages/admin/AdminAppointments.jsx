import React, { useState } from 'react';
import { getAppointments, updateAppointment, deleteAppointment } from '../../services/storageService';

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState(() => getAppointments());
  const [filterStatus, setFilterStatus] = useState('Todas');
  const [search, setSearch] = useState('');
  const [editingApt, setEditingApt] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  const refresh = () => setAppointments(getAppointments());

  const handleStatusChange = (id, newStatus) => {
    updateAppointment(id, { status: newStatus });
    refresh();
  };

  const handleOpenReschedule = (apt) => {
    setEditingApt(apt);
    setNewDate(apt.date);
    setNewTime(apt.time);
  };

  const handleSaveReschedule = (e) => {
    e.preventDefault();
    if (editingApt && newDate && newTime) {
      updateAppointment(editingApt.id, {
        date: newDate,
        time: newTime,
        status: 'Reagendada'
      });
      setEditingApt(null);
      refresh();
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta cita del registro?')) {
      deleteAppointment(id);
      refresh();
    }
  };

  const filtered = appointments.filter(apt => {
    const matchStatus = filterStatus === 'Todas' || apt.status === filterStatus;
    const matchSearch =
      apt.petName.toLowerCase().includes(search.toLowerCase()) ||
      apt.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      apt.serviceName.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold text-dark mb-1">Gestión de Citas y Agenda</h2>
          <p className="text-muted small mb-0">
            Modulo de recepción: confirma, reagenda y completa atenciones clínicas en tiempo real.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="card border-0 shadow-sm p-3 mb-4 bg-white">
        <div className="row g-3">
          <div className="col-12 col-md-5">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Buscar por paciente, dueño o servicio..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12 col-md-4">
            <select
              className="form-select"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="Todas">Todos los estados</option>
              <option value="Pendiente">Pendiente de confirmación</option>
              <option value="Confirmada">Confirmadas</option>
              <option value="Reagendada">Reagendadas</option>
              <option value="Completada">Completadas</option>
              <option value="Cancelada">Canceladas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card border-0 shadow-sm bg-white overflow-hidden">
        <div className="table-responsive">
          <table className="table align-middle mb-0 table-hover">
            <thead className="table-light small">
              <tr>
                <th>ID</th>
                <th>Paciente</th>
                <th>Tutor / Dueño</th>
                <th>Servicio</th>
                <th>Fecha y Hora</th>
                <th>Estado</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody className="small">
              {filtered.map(apt => (
                <tr key={apt.id}>
                  <td className="font-monospace fw-semibold text-muted">{apt.id}</td>
                  <td>
                    <strong>{apt.petName}</strong> <br />
                    <span className="badge bg-light text-dark border">🐾 {apt.species}</span>
                  </td>
                  <td>
                    <div>{apt.ownerName}</div>
                    {apt.phone && <div className="text-muted small"><i className="bi bi-telephone me-1"></i>{apt.phone}</div>}
                  </td>
                  <td>
                    <span className="fw-semibold">{apt.serviceName}</span>
                    {apt.notes && <div className="text-muted small text-truncate" style={{ maxWidth: '200px' }}>{apt.notes}</div>}
                  </td>
                  <td>
                    <div className="fw-bold">{apt.date}</div>
                    <div className="text-teal" style={{ color: '#0d9488' }}>{apt.time} hrs</div>
                  </td>
                  <td>
                    <span className={`badge ${
                      apt.status === 'Confirmada' ? 'bg-success' :
                      apt.status === 'Pendiente' ? 'bg-warning text-dark' :
                      apt.status === 'Reagendada' ? 'bg-info text-dark' :
                      apt.status === 'Completada' ? 'bg-primary' : 'bg-secondary'
                    }`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="text-end">
                    <div className="btn-group btn-group-sm">
                      {apt.status === 'Pendiente' && (
                        <button
                          onClick={() => handleStatusChange(apt.id, 'Confirmada')}
                          className="btn btn-outline-success"
                          title="Confirmar cita"
                        >
                          <i className="bi bi-check-lg"></i>
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenReschedule(apt)}
                        className="btn btn-outline-primary"
                        title="Reagendar fecha/hora"
                      >
                        <i className="bi bi-calendar-event"></i>
                      </button>
                      {apt.status !== 'Completada' && (
                        <button
                          onClick={() => handleStatusChange(apt.id, 'Completada')}
                          className="btn btn-outline-info"
                          title="Marcar como atendida"
                        >
                          <i className="bi bi-check2-all"></i>
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(apt.id)}
                        className="btn btn-outline-danger"
                        title="Eliminar registro"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reschedule Modal */}
      {editingApt && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  Reagendar Cita #{editingApt.id} - {editingApt.petName}
                </h5>
                <button type="button" className="btn-close" onClick={() => setEditingApt(null)}></button>
              </div>
              <form onSubmit={handleSaveReschedule}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Nueva Fecha</label>
                    <input
                      type="date"
                      className="form-control"
                      value={newDate}
                      onChange={e => setNewDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Nuevo Horario</label>
                    <select
                      className="form-select"
                      value={newTime}
                      onChange={e => setNewTime(e.target.value)}
                      required
                    >
                      <option value="09:00">09:00 hrs</option>
                      <option value="10:00">10:00 hrs</option>
                      <option value="11:00">11:00 hrs</option>
                      <option value="12:00">12:00 hrs</option>
                      <option value="15:00">15:00 hrs</option>
                      <option value="16:00">16:00 hrs</option>
                      <option value="17:00">17:00 hrs</option>
                      <option value="18:00">18:00 hrs</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setEditingApt(null)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary fw-semibold">
                    Guardar Nuevo Horario
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
