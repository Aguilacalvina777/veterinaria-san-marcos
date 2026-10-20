import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useCart } from '../context/CartContext';

export default function PublicLayout() {
  const { notification } = useCart();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      {/* Cart floating toast / notification banner */}
      {notification && (
        <div
          className="position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 1080 }}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast show align-items-center text-white bg-dark border-0 shadow-lg" role="alert">
            <div className="d-flex">
              <div className="toast-body d-flex align-items-center gap-2">
                <i className="bi bi-info-circle-fill text-warning"></i>
                <span>{notification}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
