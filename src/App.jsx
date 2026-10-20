import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Services from './pages/Services';
import Categories from './pages/Categories';
import Offers from './pages/Offers';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import OrderError from './pages/OrderError';
import BookAppointment from './pages/BookAppointment';
import MyPets from './pages/MyPets';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminPatients from './pages/admin/AdminPatients';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCategories from './pages/admin/AdminCategories';
import AdminUsers from './pages/admin/AdminUsers';
import AdminReports from './pages/admin/AdminReports';
import AdminProfile from './pages/admin/AdminProfile';

export default function App() {
  return (
    <Routes>
      {/* Public Store & Clinic Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="/categorias" element={<Categories />} />
        <Route path="/ofertas" element={<Offers />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/compra-exitosa" element={<OrderSuccess />} />
        <Route path="/pago-error" element={<OrderError />} />
        <Route path="/agendar" element={<BookAppointment />} />
        <Route path="/mis-mascotas" element={<MyPets />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
      </Route>

      {/* Admin Panel Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['Administrador', 'Recepcionista']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="citas" element={<AdminAppointments />} />
        <Route path="fichas" element={<AdminPatients />} />
        <Route path="productos" element={<AdminProducts />} />
        <Route path="ordenes" element={<AdminOrders />} />
        <Route path="categorias" element={<AdminCategories />} />
        <Route
          path="usuarios"
          element={
            <ProtectedRoute allowedRoles={['Administrador']}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route path="reportes" element={<AdminReports />} />
        <Route path="perfil" element={<AdminProfile />} />
      </Route>

      {/* 404 Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
