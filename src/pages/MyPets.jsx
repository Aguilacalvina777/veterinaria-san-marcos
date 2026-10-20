import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPetsByOwner, getAppointmentsByOwner, getPets } from '../services/storageService';

export default function MyPets() {
  const { user, login } = useAuth();
  // If user is logged in, show their pets; otherwise show demo pets for Carlos Gonzalez
  const targetUserId = user?.id || 'USR003';
  const pets = getPetsByOwner(targetUserId);
  const appointments = getAppointmentsByOwner(targetUserId);

  const [selectedPet, setSelectedPet] = useState(() => (pets.length > 0 ? pets[0] : null));

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <span className="badge badge-category mb-1">Portal del Tutor de Mascotas</span>
          <h1 className="fw-bold text-dark mb-0">Mis Mascotas, Vacunas y Citas</h1>
          <p className="text-muted small mb-0">
            Ficha clínica digital individual y carnet sanitario de vacunación en línea.
          </p>
        </div>

        <Link to="/agendar" className="btn btn-primary fw-semibold">
          <i className="bi bi-calendar-plus me-2"></i>Nueva Cita
        </Link>
      </div>

      {!user && (
        <div className="alert alert-warning d-flex align-items-center justify-content-between mb-4">
          <div>
            <i className="bi bi-exclamation-circle-fill me-2 fs-5"></i>
            <span>Estás viendo la vista previa como el cliente demo <strong>Carlos González</strong>.</span>
          </div>
          <button
            onClick={() => login('cliente@gmail.com', '123')}
            className="btn btn-warning btn-sm fw-bold text-dark"
          >
            Iniciar sesión como Cliente
          </button>
        </div>
      )}

      <div className="row g-4">
        {/* Left Column: Pet selector cards */}
        <div className="col-lg-4">
          <h5 className="fw-bold text-dark mb-3">Tus Mascotas Registradas</h5>

          <div className="d-flex flex-column gap-3 mb-4">
            {pets.map(pet => (
              <div
                key={pet.id}
                onClick={() => setSelectedPet(pet)}
                className={`card p-3 border-2 ${
                  selectedPet?.id === pet.id ? 'border-primary shadow bg-white' : 'border-light bg-light'
                }`}
                style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
              >
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-3 fs-3"
                    style={{ width: '56px', height: '56px', backgroundColor: '#ccfbf1', color: '#0d9488' }}
                  >
                    {pet.species === 'Perro' ? '🐕' : pet.species === 'Gato' ? '🐈' : '🐇'}
                  </div>
                  <div>
                    <h5 className="fw-bold text-dark mb-0">{pet.name}</h5>
                    <div className="small text-muted">
                      {pet.breed} &bull; {pet.age}
                    </div>
                    <span className="badge bg-secondary-subtle text-secondary small">
                      {pet.gender} &bull; {pet.weight}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Appointments Card */}
          <div className="card border-0 shadow-sm p-3 bg-white">
            <h6 className="fw-bold text-dark mb-3 d-flex align-items-center">
              <i className="bi bi-calendar2-week text-primary me-2"></i>
              Próximas Citas Agendadas ({appointments.length})
            </h6>

            {appointments.length > 0 ? (
              <div className="d-flex flex-column gap-2 small">
                {appointments.map(apt => (
                  <div key={apt.id} className="p-2 border rounded bg-light">
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <strong className="text-dark">{apt.petName}</strong>
                      <span className={`badge ${
                        apt.status === 'Confirmada' ? 'bg-success' :
                        apt.status === 'Pendiente' ? 'bg-warning text-dark' : 'bg-secondary'
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                    <div className="text-muted">{apt.serviceName}</div>
                    <div className="text-teal fw-semibold" style={{ color: '#0d9488' }}>
                      📅 {apt.date} a las {apt.time} hrs
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted small mb-0">No tienes citas programadas actualmente.</p>
            )}
          </div>
        </div>

        {/* Right Column: Selected Pet Digital Record */}
        <div className="col-lg-8">
          {selectedPet ? (
            <div className="d-flex flex-column gap-4">
              {/* Pet Header Card */}
              <div className="card border-0 shadow-sm p-4 bg-white">
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                  <div>
                    <span className="badge badge-category mb-1">Ficha Clínica Digital</span>
                    <h2 className="fw-bold text-dark mb-1">
                      {selectedPet.name} ({selectedPet.species})
                    </h2>
                    <div className="small text-muted">
                      <strong>Raza:</strong> {selectedPet.breed} &bull; <strong>Edad:</strong> {selectedPet.age} &bull; <strong>Peso:</strong> {selectedPet.weight}
                    </div>
                  </div>
                  <div className="text-end">
                    <span className="badge bg-light text-dark border p-2">
                      <i className="bi bi-upc-scan me-1"></i>Microchip: <span className="font-monospace">{selectedPet.chipNumber}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Digital Vaccination Booklet (Carnet de Vacunación) */}
              <div className="card border-0 shadow-sm p-4 bg-white">
                <h5 className="fw-bold text-dark mb-3 d-flex align-items-center">
                  <i className="bi bi-shield-fill-check text-success me-2"></i>
                  Carnet Sanitario de Vacunación
                </h5>
                <p className="text-muted small">
                  Control oficial de vacunas de {selectedPet.name}. Evita pérdidas de carnet físico y monitorea las fechas de refuerzo.
                </p>

                <div className="table-responsive">
                  <table className="table table-hover align-middle table-sm">
                    <thead className="table-light small">
                      <tr>
                        <th>Vacuna</th>
                        <th>Última Aplicación</th>
                        <th>Próximo Refuerzo</th>
                        <th className="text-center">Estado Sanitario</th>
                      </tr>
                    </thead>
                    <tbody className="small">
                      {selectedPet.vaccines?.map((vac, idx) => (
                        <tr key={idx}>
                          <td className="fw-semibold">{vac.name}</td>
                          <td className="text-muted">{vac.date}</td>
                          <td className="fw-bold">{vac.nextDue}</td>
                          <td className="text-center">
                            <span className={`badge ${
                              vac.status === 'Al día' ? 'bg-success' :
                              vac.status === 'Por vencer' ? 'bg-warning text-dark' : 'bg-danger'
                            }`}>
                              {vac.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Consultation Medical History */}
              <div className="card border-0 shadow-sm p-4 bg-white">
                <h5 className="fw-bold text-dark mb-3 d-flex align-items-center">
                  <i className="bi bi-clipboard2-pulse text-danger me-2"></i>
                  Historial de Consultas y Atenciones
                </h5>

                <div className="timeline d-flex flex-column gap-3">
                  {selectedPet.medicalHistory?.map((hist, idx) => (
                    <div key={idx} className="p-3 border rounded-3 bg-light">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <strong className="text-dark fs-6">{hist.reason}</strong>
                          <div className="small text-muted">
                            <i className="bi bi-person-fill text-teal me-1" style={{ color: '#0d9488' }}></i>
                            Atendido por: {hist.vet}
                          </div>
                        </div>
                        <span className="badge bg-light text-dark border">
                          📅 {hist.date}
                        </span>
                      </div>

                      <div className="small mb-2">
                        <strong className="text-dark">Diagnóstico:</strong>
                        <p className="text-muted mb-1">{hist.diagnosis}</p>
                      </div>

                      <div className="small bg-white p-2 rounded border">
                        <strong className="text-teal" style={{ color: '#0d9488' }}>
                          <i className="bi bi-capsule me-1"></i>Tratamiento e Indicaciones:
                        </strong>
                        <p className="text-muted mb-0">{hist.treatment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="card p-5 text-center bg-white border-0 shadow-sm">
              <p className="text-muted">Selecciona una mascota para ver su ficha clínica.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
