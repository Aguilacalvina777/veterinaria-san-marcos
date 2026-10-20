import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getServices, createAppointment, getPetsByOwner } from '../services/storageService';

export default function BookAppointment() {
  const [searchParams] = useSearchParams();
  const preselectedServiceCode = searchParams.get('service') || '';

  const { user } = useAuth();
  const navigate = useNavigate();

  const services = getServices();
  const userPets = user ? getPetsByOwner(user.id) : [];

  const [formData, setFormData] = useState({
    ownerName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    petName: userPets.length > 0 ? userPets[0].name : '',
    species: userPets.length > 0 ? userPets[0].species : 'Perro',
    serviceCode: preselectedServiceCode || (services[0]?.code || 'SV001'),
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    time: '10:00',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [createdApt, setCreatedApt] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.ownerName.trim()) errs.ownerName = 'Nombre del tutor requerido.';
    if (!formData.phone.trim()) errs.phone = 'Teléfono requerido para avisarte de la cita.';
    if (!formData.petName.trim()) errs.petName = 'Indica el nombre de tu mascota.';
    if (!formData.date) errs.date = 'Selecciona una fecha.';
    if (!formData.time) errs.time = 'Selecciona una hora.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const selectedService = services.find(s => s.code === formData.serviceCode);

    const apt = createAppointment({
      ownerId: user?.id || 'GUEST',
      ownerName: formData.ownerName,
      phone: formData.phone,
      email: formData.email,
      petName: formData.petName,
      species: formData.species,
      serviceCode: formData.serviceCode,
      serviceName: selectedService ? selectedService.name : 'Consulta',
      date: formData.date,
      time: formData.time,
      notes: formData.notes
    });

    setCreatedApt(apt);
    setSuccess(true);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-4">
            <span className="badge badge-category mb-2">Atención Médica Online</span>
            <h1 className="fw-bold text-dark">Agendar Cita Médica</h1>
            <p className="text-muted">
              Reserva tu hora veterinaria en línea en Veterinaria San Marcos sin necesidad de llamar por teléfono.
            </p>
          </div>

          {success && createdApt ? (
            <div className="card border-0 shadow-sm p-4 p-md-5 text-center bg-white">
              <div className="text-success mb-3">
                <i className="bi bi-calendar-check-fill display-3"></i>
              </div>
              <h3 className="fw-bold text-dark mb-2">¡Solicitud de Cita Enviada con Éxito!</h3>
              <p className="text-muted mb-4">
                Código de Solicitud: <strong className="font-monospace text-teal">{createdApt.id}</strong> <br />
                Nuestra recepcionista validará tu cupo para <strong>{createdApt.petName}</strong> el día{' '}
                <strong>{createdApt.date} a las {createdApt.time} hrs</strong>.
              </p>

              <div className="alert alert-info py-2 px-3 small mx-auto max-w-md mb-4 text-start">
                <i className="bi bi-info-circle-fill me-2"></i>
                Estado actual: <span className="badge bg-warning text-dark">{createdApt.status}</span>.
                Te notificaremos la confirmación médica.
              </div>

              <div className="d-flex justify-content-center gap-3">
                <button onClick={() => navigate('/mis-mascotas')} className="btn btn-primary">
                  <i className="bi bi-heart-pulse me-2"></i>Ver Mis Mascotas y Citas
                </button>
                <button
                  onClick={() => {
                    setSuccess(false);
                    setCreatedApt(null);
                  }}
                  className="btn btn-outline-secondary"
                >
                  Agendar otra hora
                </button>
              </div>
            </div>
          ) : (
            <div className="card border-0 shadow-sm p-4 p-md-5 bg-white">
              <form onSubmit={handleSubmit} noValidate>
                {/* Pet info */}
                <h5 className="fw-bold text-dark mb-3 pb-2 border-bottom">
                  🐾 Datos del Paciente (Mascota)
                </h5>

                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Nombre de la Mascota *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.petName ? 'is-invalid' : ''}`}
                      placeholder="Ej: Max, Luna, Bobby"
                      value={formData.petName}
                      onChange={e => setFormData({ ...formData, petName: e.target.value })}
                    />
                    {errors.petName && <div className="invalid-feedback">{errors.petName}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Especie</label>
                    <select
                      className="form-select"
                      value={formData.species}
                      onChange={e => setFormData({ ...formData, species: e.target.value })}
                    >
                      <option value="Perro">Perro / Canino</option>
                      <option value="Gato">Gato / Felino</option>
                      <option value="Conejo">Conejo</option>
                      <option value="Ave">Ave</option>
                      <option value="Otro">Otro exótico menor</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold">Servicio o Motivo de Atención *</label>
                    <select
                      className="form-select"
                      value={formData.serviceCode}
                      onChange={e => setFormData({ ...formData, serviceCode: e.target.value })}
                    >
                      {services.map(s => (
                        <option key={s.code} value={s.code}>
                          [{s.category}] {s.name} - ${s.price.toLocaleString('es-CL')} ({s.duration})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Appointment Schedule */}
                <h5 className="fw-bold text-dark mb-3 pb-2 border-bottom">
                  📅 Fecha y Horario Preferido
                </h5>

                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Fecha de Atención *</label>
                    <input
                      type="date"
                      className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                      value={formData.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                    />
                    {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Bloque Horario *</label>
                    <select
                      className="form-select"
                      value={formData.time}
                      onChange={e => setFormData({ ...formData, time: e.target.value })}
                    >
                      <option value="09:00">09:00 hrs</option>
                      <option value="09:45">09:45 hrs</option>
                      <option value="10:30">10:30 hrs</option>
                      <option value="11:15">11:15 hrs</option>
                      <option value="12:00">12:00 hrs</option>
                      <option value="15:00">15:00 hrs</option>
                      <option value="16:00">16:00 hrs</option>
                      <option value="17:00">17:00 hrs</option>
                      <option value="18:00">18:00 hrs</option>
                    </select>
                  </div>
                </div>

                {/* Owner info */}
                <h5 className="fw-bold text-dark mb-3 pb-2 border-bottom">
                  👤 Datos del Tutor / Dueño
                </h5>

                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Tu Nombre Completo *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.ownerName ? 'is-invalid' : ''}`}
                      placeholder="Carlos González"
                      value={formData.ownerName}
                      onChange={e => setFormData({ ...formData, ownerName: e.target.value })}
                    />
                    {errors.ownerName && <div className="invalid-feedback">{errors.ownerName}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Teléfono de Contacto *</label>
                    <input
                      type="tel"
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      placeholder="+56 9 8765 4321"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold">Síntomas o notas para el médico</label>
                    <textarea
                      rows="3"
                      className="form-control"
                      placeholder="Indica síntomas, comportamiento anormal o si requiere refuerzo de vacuna específica..."
                      value={formData.notes}
                      onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    ></textarea>
                  </div>
                </div>

                <div className="text-end">
                  <button type="submit" className="btn btn-primary btn-lg px-5 fw-bold shadow">
                    <i className="bi bi-calendar-check me-2"></i>Confirmar Solicitud de Cita
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
