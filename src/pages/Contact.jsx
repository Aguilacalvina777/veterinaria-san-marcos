import React, { useState } from 'react';
import { clinicInfo } from '../data/mockData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Consulta general',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'El nombre es obligatorio.';
    if (!formData.email.trim()) {
      errs.email = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Ingresa un correo electrónico válido.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'El teléfono es obligatorio para contactarte.';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'El mensaje debe tener al menos 10 caracteres.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: 'Consulta general', message: '' });
  };

  return (
    <div className="container py-5">
      <div className="text-center max-w-xl mx-auto mb-5">
        <span className="badge badge-category mb-2">Canales de Comunicación</span>
        <h1 className="fw-bold text-dark">Ponte en Contacto con Nosotros</h1>
        <p className="text-muted">
          Estamos atentos a resolver todas tus dudas sobre atenciones clínicas, presupuestos de cirugía o stock de fármacos.
        </p>
      </div>

      <div className="row g-5">
        {/* Contact info cards */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm p-4 mb-4 bg-white">
            <h5 className="fw-bold text-dark mb-4">Información de la Clínica</h5>

            <div className="d-flex align-items-start mb-3">
              <div className="rounded p-2 bg-light text-teal me-3" style={{ color: '#0d9488' }}>
                <i className="bi bi-geo-alt-fill fs-5"></i>
              </div>
              <div>
                <strong className="d-block text-dark">Dirección Central</strong>
                <span className="text-muted small">{clinicInfo.address}</span>
              </div>
            </div>

            <div className="d-flex align-items-start mb-3">
              <div className="rounded p-2 bg-light text-teal me-3" style={{ color: '#0d9488' }}>
                <i className="bi bi-telephone-fill fs-5"></i>
              </div>
              <div>
                <strong className="d-block text-dark">Mesa Telefónica</strong>
                <a href={`tel:${clinicInfo.phone}`} className="text-muted small text-decoration-none">{clinicInfo.phone}</a>
              </div>
            </div>

            <div className="d-flex align-items-start mb-3">
              <div className="rounded p-2 bg-light text-teal me-3" style={{ color: '#0d9488' }}>
                <i className="bi bi-whatsapp fs-5 text-success"></i>
              </div>
              <div>
                <strong className="d-block text-dark">WhatsApp Urgencias</strong>
                <span className="text-muted small">{clinicInfo.whatsapp}</span>
              </div>
            </div>

            <div className="d-flex align-items-start">
              <div className="rounded p-2 bg-light text-teal me-3" style={{ color: '#0d9488' }}>
                <i className="bi bi-clock-fill fs-5 text-warning"></i>
              </div>
              <div>
                <strong className="d-block text-dark">Horario de Atención</strong>
                <span className="text-muted small">{clinicInfo.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm p-4 bg-white">
            <h5 className="fw-bold text-dark mb-3">Envíanos un Mensaje Directo</h5>

            {submitted && (
              <div className="alert alert-success d-flex align-items-center mb-4">
                <i className="bi bi-check-circle-fill fs-4 me-3"></i>
                <div>
                  <strong>¡Mensaje enviado con éxito!</strong>
                  <p className="mb-0 small">Nuestra recepcionista te responderá en breve al correo o vía telefónica.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Nombre y Apellido *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="Ej: Juan Pérez"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Correo Electrónico *</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="tu@correo.cl"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Teléfono de Contacto *</label>
                  <input
                    type="tel"
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    placeholder="+56 9 1234 5678"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Motivo del Contacto</label>
                  <select
                    className="form-select"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="Consulta general">Consulta general</option>
                    <option value="Presupuesto de Cirugía">Presupuesto de Cirugía</option>
                    <option value="Disponibilidad de Medicamentos">Disponibilidad de Medicamentos</option>
                    <option value="Exámenes y Laboratorio">Exámenes y Laboratorio</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label small fw-semibold">Mensaje o Detalle del Caso *</label>
                  <textarea
                    rows="4"
                    className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                    placeholder="Escribe aquí tu consulta o especie de mascota..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                  {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                </div>

                <div className="col-12 mt-4">
                  <button type="submit" className="btn btn-primary px-4 fw-semibold">
                    <i className="bi bi-send me-2"></i>Enviar Mensaje
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
