import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/storageService';
import { formatPrice } from '../components/ProductCard';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    apt: '',
    region: 'Región del Libertador Bernardo O\'Higgins',
    comuna: 'Rancagua',
    notes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('Webpay Plus / Débito');
  const [simulateError, setSimulateError] = useState(false);
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  // Auto-fill customer data if logged in
  useEffect(() => {
    if (user) {
      const parts = (user.name || '').split(' ');
      const firstName = parts[0] || '';
      const lastName = parts.slice(1).join(' ') || '';
      setFormData(prev => ({
        ...prev,
        firstName: prev.firstName || firstName,
        lastName: prev.lastName || lastName,
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
        street: prev.street || user.address || '',
        region: user.region || prev.region,
        comuna: user.city || prev.comuna
      }));
    }
  }, [user]);

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h4>No tienes productos en el carrito para pagar.</h4>
        <Link to="/catalogo" className="btn btn-primary mt-3">Ver Catálogo</Link>
      </div>
    );
  }

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = 'El nombre es obligatorio.';
    if (!formData.lastName.trim()) errs.lastName = 'El apellido es obligatorio.';
    if (!formData.email.trim()) {
      errs.email = 'El correo es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Formato de correo inválido.';
    }
    if (!formData.street.trim()) errs.street = 'La dirección / calle es obligatoria.';
    if (!formData.comuna.trim()) errs.comuna = 'La comuna es obligatoria.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);

      if (simulateError) {
        // Navigate to payment error page with order snapshot
        navigate('/pago-error', {
          state: {
            orderData: {
              id: `2024070${Math.floor(Math.random() * 90 + 10)}`,
              customer: formData,
              items: items.map(i => ({
                code: i.product.code,
                name: i.product.name,
                price: i.product.offerPrice || i.product.price,
                quantity: i.quantity,
                subtotal: (i.product.offerPrice || i.product.price) * i.quantity,
                image: i.product.image
              })),
              total,
              paymentMethod
            }
          }
        });
      } else {
        // Successful payment
        const newOrder = createOrder({
          userId: user?.id || 'ANON',
          customer: formData,
          items: items.map(i => ({
            code: i.product.code,
            name: i.product.name,
            price: i.product.offerPrice || i.product.price,
            quantity: i.quantity,
            subtotal: (i.product.offerPrice || i.product.price) * i.quantity,
            image: i.product.image
          })),
          total,
          paymentMethod
        });

        clearCart();
        navigate('/compra-exitosa', { state: { order: newOrder } });
      }
    }, 1200);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-9">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="fw-bold text-dark mb-1">Finalizar Compra (Checkout)</h1>
              <p className="text-muted mb-0">Completa los datos de despacho y confirma el pago.</p>
            </div>
            <span className="badge bg-primary fs-5 px-3 py-2">
              Total a pagar: {formatPrice(total)}
            </span>
          </div>

          {user && (
            <div className="alert alert-info py-2 px-3 small d-flex align-items-center mb-4">
              <i className="bi bi-person-check-fill fs-5 me-2"></i>
              <span>Has iniciado sesión como <strong>{user.name}</strong>. Tus datos han sido autocompletados.</span>
            </div>
          )}

          {/* Cart items mini table */}
          <div className="card border-0 shadow-sm p-3 mb-4 bg-white">
            <h6 className="fw-bold text-dark mb-3">Detalle de productos a comprar</h6>
            <div className="table-responsive">
              <table className="table table-sm align-middle mb-0">
                <thead className="table-light small">
                  <tr>
                    <th style={{ width: '60px' }}>Imagen</th>
                    <th>Nombre</th>
                    <th className="text-end">Precio</th>
                    <th className="text-center">Cantidad</th>
                    <th className="text-end">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="small">
                  {items.map(item => {
                    const price = item.product.offerPrice || item.product.price;
                    return (
                      <tr key={item.product.code}>
                        <td>
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '4px' }}
                          />
                        </td>
                        <td className="fw-semibold">{item.product.name}</td>
                        <td className="text-end">{formatPrice(price)}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-end fw-bold text-teal" style={{ color: '#0d9488' }}>
                          {formatPrice(price * item.quantity)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Customer Info */}
            <div className="card border-0 shadow-sm p-4 mb-4 bg-white">
              <h5 className="fw-bold text-dark mb-3 pb-2 border-bottom">
                <i className="bi bi-person-lines-fill me-2 text-teal" style={{ color: '#0d9488' }}></i>
                Información del Cliente
              </h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Nombre *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                    placeholder="Pedro"
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  />
                  {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Apellidos *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                    placeholder="Hacker"
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  />
                  {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Correo Electrónico *</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="pedro.hacker20@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Teléfono móvil</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="+56 9 8765 4321"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Delivery address */}
            <div className="card border-0 shadow-sm p-4 mb-4 bg-white">
              <h5 className="fw-bold text-dark mb-3 pb-2 border-bottom">
                <i className="bi bi-geo-alt-fill me-2 text-teal" style={{ color: '#0d9488' }}></i>
                Dirección de Entrega de los Productos
              </h5>
              <div className="row g-3">
                <div className="col-md-8">
                  <label className="form-label small fw-semibold">Calle y Número *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.street ? 'is-invalid' : ''}`}
                    placeholder="Los Crisantemos, Edificio Norte 123"
                    value={formData.street}
                    onChange={e => setFormData({ ...formData, street: e.target.value })}
                  />
                  {errors.street && <div className="invalid-feedback">{errors.street}</div>}
                </div>

                <div className="col-md-4">
                  <label className="form-label small fw-semibold">Departamento (opcional)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Depto 603"
                    value={formData.apt}
                    onChange={e => setFormData({ ...formData, apt: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Región</label>
                  <select
                    className="form-select"
                    value={formData.region}
                    onChange={e => setFormData({ ...formData, region: e.target.value })}
                  >
                    <option value="Región del Libertador Bernardo O'Higgins">Región del Libertador Bernardo O'Higgins</option>
                    <option value="Región Metropolitana de Santiago">Región Metropolitana de Santiago</option>
                    <option value="Región de Valparaíso">Región de Valparaíso</option>
                    <option value="Región del Maule">Región del Maule</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Comuna *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.comuna ? 'is-invalid' : ''}`}
                    placeholder="Rancagua / Cerrillos"
                    value={formData.comuna}
                    onChange={e => setFormData({ ...formData, comuna: e.target.value })}
                  />
                  {errors.comuna && <div className="invalid-feedback">{errors.comuna}</div>}
                </div>

                <div className="col-12">
                  <label className="form-label small fw-semibold">Indicaciones para la entrega (opcional)</label>
                  <textarea
                    rows="2"
                    className="form-control"
                    placeholder="Ej: El martes no estaremos en el depto, pero puede dejárselo al conserje."
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Payment Method & Demo Toggle */}
            <div className="card border-0 shadow-sm p-4 mb-4 bg-white">
              <h5 className="fw-bold text-dark mb-3 pb-2 border-bottom">
                <i className="bi bi-wallet2 me-2 text-teal" style={{ color: '#0d9488' }}></i>
                Medio de Pago
              </h5>

              <div className="row g-3">
                <div className="col-md-4">
                  <div className={`card p-3 h-100 ${paymentMethod === 'Webpay Plus / Débito' ? 'border-primary bg-light' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setPaymentMethod('Webpay Plus / Débito')}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'Webpay Plus / Débito'}
                        onChange={() => setPaymentMethod('Webpay Plus / Débito')}
                      />
                      <label className="form-check-label fw-bold">
                        Webpay Plus
                      </label>
                      <small className="d-block text-muted">Tarjetas de Débito y Crédito</small>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className={`card p-3 h-100 ${paymentMethod === 'Transferencia Bancaria' ? 'border-primary bg-light' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setPaymentMethod('Transferencia Bancaria')}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'Transferencia Bancaria'}
                        onChange={() => setPaymentMethod('Transferencia Bancaria')}
                      />
                      <label className="form-check-label fw-bold">
                        Transferencia
                      </label>
                      <small className="d-block text-muted">Datos bancarios directos</small>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className={`card p-3 h-100 ${paymentMethod === 'Pago en Clínica' ? 'border-primary bg-light' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setPaymentMethod('Pago en Clínica')}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'Pago en Clínica'}
                        onChange={() => setPaymentMethod('Pago en Clínica')}
                      />
                      <label className="form-check-label fw-bold">
                        Pago en Clínica
                      </label>
                      <small className="d-block text-muted">Al retirar tu pedido</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simulation switch for teacher/evaluation testing */}
              <div className="mt-4 pt-3 border-top">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="simulateErrorSwitch"
                    checked={simulateError}
                    onChange={e => setSimulateError(e.target.checked)}
                  />
                  <label className="form-check-label text-muted small" htmlFor="simulateErrorSwitch">
                    <span className="badge bg-warning text-dark me-1">Evaluación EP2</span>
                    Simular rechazo de pasarela de pago (para probar vista de <em>"No se pudo realizar el pago"</em>)
                  </label>
                </div>
              </div>
            </div>

            {/* Pay CTA */}
            <div className="text-end">
              <button
                type="submit"
                disabled={processing}
                className="btn btn-primary btn-lg px-5 fw-bold shadow"
                data-testid="btn-pay"
              >
                {processing ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Procesando pago seguro...
                  </span>
                ) : (
                  <span>
                    <i className="bi bi-lock-fill me-2"></i>Pagar ahora {formatPrice(total)}
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
