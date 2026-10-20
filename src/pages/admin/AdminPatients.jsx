import React, { useState } from 'react';
import { getPets, addMedicalRecord, addVaccineRecord } from '../../services/storageService';
import { useAuth } from '../../context/AuthContext';

export default function AdminPatients() {
  const [pets, setPets] = useState(() => getPets());
  const [selectedPet, setSelectedPet] = useState(() => pets[0] || null);
  const [search, setSearch] = useState('');
  const { user } = useAuth();

  // New consultation state
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [consultationData, setConsultationData] = useState({
    vet: user?.name || 'Dra. Carolina Morales',
    reason: '',
    diagnosis: '',
    treatment: ''
  });

  // New vaccine state
  const [showVaccineModal, setShowVaccineModal] = useState(false);
  const [vaccineData, setVaccineData] = useState({
    name: 'Vacuna antirrábica canina',
    date: new Date().toISOString().split('T')[0],
    nextDue: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0],
    status: 'Al día'
  });

  const refreshPets = () => {
    const updated = getPets();
    setPets(updated);
    if (selectedPet) {
      const match = updated.find(p => p.id === selectedPet.id);
      setSelectedPet(match || updated[0]);
    }
  };

  const handleAddConsultation = (e) => {
    e.preventDefault();
    if (!consultationData.reason || !consultationData.diagnosis) return;

    addMedicalRecord(selectedPet.id, consultationData);
    setShowConsultationModal(false);
    setConsultationData({
      vet: user?.name || 'Dra. Carolina Morales',
      reason: '',
      diagnosis: '',
      treatment: ''
    });
    refreshPets();
  };

  const handleAddVaccine = (e) => {
    e.preventDefault();
    addVaccineRecord(selectedPet.id, vaccineData);
    setShowVaccineModal(false);
    refreshPets();
  };

  const filteredPets = pets.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.ownerName.toLowerCase().includes(search.toLowerCase()) ||
    (p.chipNumber && p.chipNumber.includes(search))
  );

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold text-dark mb-1">Fichas Clínicas Digitales</h2>
          <p className="text-muted small mb-0">
            Registro clínico centralizado: atenciones, diagnósticos y carnet sanitario de vacunación.
          </p>
        </div>
      </div>

      <div className="row g-4">
        {/* Left: Patient List */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-3 bg-white mb-3">
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text bg-light border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Buscar por paciente, tutor o chip..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="d-flex flex-column gap-2" style={{ maxHeight: '550px', overflowY: 'auto' }}>
              {filteredPets.map(pet => (
                <div
                  key={pet.id}
                  onClick={() => setSelectedPet(pet)}
                  className={`p-3 rounded border text-start ${
                    selectedPet?.id === pet.id ? 'border-primary bg-light shadow-sm' : 'border-light'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <strong className="text-dark">{pet.name}</strong>
                    <span className="badge bg-secondary font-monospace small" style={{ fontSize: '0.65rem' }}>
                      {pet.chipNumber ? pet.chipNumber.slice(-6) : 'SIN CHIP'}
                    </span>
                  </div>
                  <div className="small text-muted mb-1">
                    🐾 {pet.species} &bull; {pet.breed} ({pet.age})
                  </div>
                  <div className="small text-teal fw-semibold" style={{ color: '#0d9488' }}>
                    <i className="bi bi-person me-1"></i>Tutor: {pet.ownerName}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Selected Patient Record */}
        <div className="col-lg-8">
          {selectedPet ? (
            <div className="d-flex flex-column gap-4">
              {/* Patient Banner */}
              <div className="card border-0 shadow-sm p-4 bg-white">
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                  <div>
                    <span className="badge badge-category mb-1">Ficha ID: {selectedPet.id}</span>
                    <h3 className="fw-bold text-dark mb-1">
                      {selectedPet.name} ({selectedPet.species})
                    </h3>
                    <div className="small text-muted">
                      <strong>Tutor:</strong> {selectedPet.ownerName} &bull; <strong>Raza:</strong> {selectedPet.breed} &bull; <strong>Peso:</strong> {selectedPet.weight}
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      onClick={() => setShowConsultationModal(true)}
                      className="btn btn-primary btn-sm fw-semibold"
                    >
                      <i className="bi bi-plus-circle me-1"></i>Registrar Consulta
                    </button>
                    <button
                      onClick={() => setShowVaccineModal(true)}
                      className="btn btn-success btn-sm fw-semibold"
                    >
                      <i className="bi bi-shield-plus me-1"></i>Aplicar Vacuna
                    </button>
                  </div>
                </div>
              </div>

              {/* Vaccination Card */}
              <div className="card border-0 shadow-sm p-4 bg-white">
                <h5 className="fw-bold text-dark mb-3">Historial de Vacunación</h5>
                <div className="table-responsive">
                  <table className="table table-sm align-middle mb-0">
                    <thead className="table-light small">
                      <tr>
                        <th>Vacuna</th>
                        <th>Fecha Aplicación</th>
                        <th>Próximo Refuerzo</th>
                        <th className="text-center">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="small">
                      {selectedPet.vaccines?.map((v, i) => (
                        <tr key={i}>
                          <td className="fw-semibold">{v.name}</td>
                          <td>{v.date}</td>
                          <td className="fw-bold">{v.nextDue}</td>
                          <td className="text-center">
                            <span className={`badge ${
                              v.status === 'Al día' ? 'bg-success' :
                              v.status === 'Por vencer' ? 'bg-warning text-dark' : 'bg-danger'
                            }`}>
                              {v.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Consultation History */}
              <div className="card border-0 shadow-sm p-4 bg-white">
                <h5 className="fw-bold text-dark mb-3">Atenciones Médicas Registradas</h5>
                <div className="d-flex flex-column gap-3">
                  {selectedPet.medicalHistory?.map((hist, i) => (
                    <div key={i} className="p-3 border rounded bg-light">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <strong className="text-dark fs-6">{hist.reason}</strong>
                          <div className="small text-muted">Médico: {hist.vet}</div>
                        </div>
                        <span className="badge bg-light text-dark border">📅 {hist.date}</span>
                      </div>
                      <div className="small mb-1">
                        <strong>Diagnóstico:</strong> <span className="text-muted">{hist.diagnosis}</span>
                      </div>
                      <div className="small">
                        <strong>Tratamiento:</strong> <span className="text-muted">{hist.treatment}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="card p-5 text-center bg-white border-0 shadow-sm">
              <p className="text-muted">Selecciona una mascota del listado para gestionar su ficha.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal: New Consultation */}
      {showConsultationModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Nueva Atención: {selectedPet?.name}</h5>
                <button type="button" className="btn-close" onClick={() => setShowConsultationModal(false)}></button>
              </div>
              <form onSubmit={handleAddConsultation}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Médico Veterinario Responsable</label>
                    <input
                      type="text"
                      className="form-control"
                      value={consultationData.vet}
                      onChange={e => setConsultationData({ ...consultationData, vet: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Motivo de Consulta</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ej: Control postoperatorio, decaimiento..."
                      value={consultationData.reason}
                      onChange={e => setConsultationData({ ...consultationData, reason: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Diagnóstico Clínico</label>
                    <textarea
                      rows="2"
                      className="form-control"
                      placeholder="Evaluación médica detallada..."
                      value={consultationData.diagnosis}
                      onChange={e => setConsultationData({ ...consultationData, diagnosis: e.target.value })}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Tratamiento y Medicamentos Recetados</label>
                    <textarea
                      rows="2"
                      className="form-control"
                      placeholder="Fármacos, posología y próximo control..."
                      value={consultationData.treatment}
                      onChange={e => setConsultationData({ ...consultationData, treatment: e.target.value })}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowConsultationModal(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary fw-semibold">
                    Guardar Ficha
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal: New Vaccine */}
      {showVaccineModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Registrar Vacuna: {selectedPet?.name}</h5>
                <button type="button" className="btn-close" onClick={() => setShowVaccineModal(false)}></button>
              </div>
              <form onSubmit={handleAddVaccine}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Nombre de la Vacuna</label>
                    <input
                      type="text"
                      className="form-control"
                      value={vaccineData.name}
                      onChange={e => setVaccineData({ ...vaccineData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Fecha de Inoculación</label>
                    <input
                      type="date"
                      className="form-control"
                      value={vaccineData.date}
                      onChange={e => setVaccineData({ ...vaccineData, date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Fecha Próximo Refuerzo</label>
                    <input
                      type="date"
                      className="form-control"
                      value={vaccineData.nextDue}
                      onChange={e => setVaccineData({ ...vaccineData, nextDue: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowVaccineModal(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-success fw-semibold">
                    Registrar en Carnet
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
