import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Por favor ingresa tu correo y contraseña.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const res = login(email, password);
      if (res.success) {
        if (res.user.role === 'Administrador' || res.user.role === 'Recepcionista') {
          navigate('/admin');
        } else {
          navigate(from === '/login' ? '/' : from);
        }
      } else {
        setError(res.message);
      }
    }, 400);
  };

  const handleQuickLogin = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    const res = login(demoEmail, demoPass);
    if (res.success) {
      if (res.user.role === 'Administrador' || res.user.role === 'Recepcionista') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-5">
          <div className="card border-0 shadow-sm p-4 p-md-5 bg-white">
            <div className="text-center mb-4">
              <span className="fs-1">🐾</span>
              <h2 className="fw-bold text-dark mt-2">Iniciar Sesión</h2>
              <p className="text-muted small">
                Accede a tu cuenta de Veterinaria San Marcos
              </p>
            </div>

            {error && (
              <div className="alert alert-danger py-2 px-3 small d-flex align-items-center mb-3" data-testid="login-error">
                <i className="bi bi-exclamation-octagon-fill me-2 fs-5"></i>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Correo Electrónico</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-envelope text-muted"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control border-start-0"
                    placeholder="ejemplo@correo.cl"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    data-testid="email-input"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-semibold">Contraseña</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-lock text-muted"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control border-start-0"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    data-testid="password-input"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-100 py-2 fw-bold"
                data-testid="btn-login-submit"
              >
                {loading ? 'Comprobando credenciales...' : 'Entrar al Sistema'}
              </button>
            </form>

            {/* Quick Demo Access for Teachers & Evaluators */}
            <div className="mt-4 pt-3 border-top text-center">
              <span className="badge bg-light text-dark border mb-2">Accesos Rápidos de Demostración</span>
              <div className="d-flex flex-column gap-2 small">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('admin@sanmarcos.cl', 'admin')}
                  className="btn btn-outline-danger btn-sm text-start d-flex justify-content-between align-items-center"
                >
                  <span>👑 <strong>Administrador:</strong> Dra. Carolina Morales</span>
                  <span className="badge bg-danger">admin</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('recepcion@sanmarcos.cl', 'recep')}
                  className="btn btn-outline-info btn-sm text-start d-flex justify-content-between align-items-center text-dark"
                >
                  <span>📋 <strong>Recepcionista:</strong> Valeria Muñoz</span>
                  <span className="badge bg-info text-dark">recep</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('cliente@gmail.com', '123')}
                  className="btn btn-outline-success btn-sm text-start d-flex justify-content-between align-items-center"
                >
                  <span>🐾 <strong>Cliente / Dueño:</strong> Carlos González</span>
                  <span className="badge bg-success">123</span>
                </button>
              </div>
            </div>

            <div className="mt-4 text-center small text-muted">
              ¿No tienes cuenta? <Link to="/registro" className="fw-semibold text-teal" style={{ color: '#0d9488' }}>Regístrate aquí</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
