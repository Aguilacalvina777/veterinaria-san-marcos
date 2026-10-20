import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rut: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [errorBanner, setErrorBanner] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'El nombre completo es requerido.';
    if (!formData.email.trim()) {
      errs.email = 'El correo electrónico es requerido.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'El formato del correo es inválido.';
    }
    if (!formData.phone.trim()) errs.phone = 'El teléfono de contacto es requerido.';
    if (!formData.password || formData.password.length < 4) {
      errs.password = 'La contraseña debe tener al menos 4 caracteres.';
    }
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Las contraseñas no coinciden.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorBanner('');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const res = register({
      name: formData.name,
      email: formData.email,
      rut: formData.rut,
      phone: formData.phone,
      password: formData.password
    });

    if (res.success) {
      navigate('/mis-mascotas');
    } else {
      setErrorBanner(res.message);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm p-4 p-md-5 bg-white">
            <div className="text-center mb-4">
              <span className="fs-1">🐾</span>
              <h2 className="fw-bold text-dark mt-2">Crear Cuenta de Tutor</h2>
              <p className="text-muted small">
                Regístrate para agendar horas y consultar la ficha clínica digital de tus mascotas
              </p>
            </div>

            {errorBanner && (
              <div className="alert alert-danger py-2 px-3 small mb-3">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {errorBanner}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label small fw-semibold">Nombre y Apellido *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="Ej: Sofía Valenzuela"
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
                    placeholder="sofia@ejemplo.cl"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Teléfono Celular *</label>
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
                  <label className="form-label small fw-semibold">RUT (opcional para boleta)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="19.876.543-2"
                    value={formData.rut}
                    onChange={e => setFormData({ ...formData, rut: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Contraseña *</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Confirmar Contraseña *</label>
                  <input
                    type="password"
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                  {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                </div>

                <div className="col-12 mt-4">
                  <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
                    Registrarme e Ingresar
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-4 text-center small text-muted">
              ¿Ya estás registrado? <Link to="/login" className="fw-semibold text-teal" style={{ color: '#0d9488' }}>Inicia sesión aquí</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
