import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="container py-5 text-center">
        <div className="card shadow-sm p-5 max-w-md mx-auto border-0">
          <div className="text-danger fs-1 mb-3">
            <i className="bi bi-shield-lock-fill"></i>
          </div>
          <h3 className="fw-bold text-dark">Acceso Restringido</h3>
          <p className="text-muted">
            Tu rol actual (<strong>{user.role}</strong>) no tiene los permisos necesarios para acceder a esta sección.
          </p>
          <div className="mt-3">
            <a href="/" className="btn btn-primary">
              Volver al Inicio
            </a>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
