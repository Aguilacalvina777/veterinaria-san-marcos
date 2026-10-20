import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUsers, createUser } from '../services/storageService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('vsm_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  const login = (email, password) => {
    const allUsers = getUsers();
    const found = allUsers.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (!found) {
      return { success: false, message: 'Correo o contraseña incorrectos.' };
    }

    if (!found.active) {
      return { success: false, message: 'Esta cuenta ha sido desactivada por el administrador.' };
    }

    setUser(found);
    localStorage.setItem('vsm_current_user', JSON.stringify(found));
    return { success: true, user: found };
  };

  const register = (userData) => {
    const allUsers = getUsers();
    const exists = allUsers.some(
      u => u.email.toLowerCase() === userData.email.trim().toLowerCase()
    );
    if (exists) {
      return { success: false, message: 'El correo electrónico ya está registrado.' };
    }

    const newUser = createUser({
      ...userData,
      role: 'Dueño de mascota',
      active: true
    });

    setUser(newUser);
    localStorage.setItem('vsm_current_user', JSON.stringify(newUser));
    setUsers(getUsers());
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vsm_current_user');
  };

  // Switch demo account conveniently
  const switchDemoRole = (role) => {
    const allUsers = getUsers();
    const target = allUsers.find(u => u.role === role);
    if (target) {
      setUser(target);
      localStorage.setItem('vsm_current_user', JSON.stringify(target));
      return target;
    }
    return null;
  };

  const isAdmin = user?.role === 'Administrador';
  const isReceptionist = user?.role === 'Recepcionista';
  const isStaff = isAdmin || isReceptionist;
  const isClient = user?.role === 'Dueño de mascota';

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        login,
        register,
        logout,
        switchDemoRole,
        isAdmin,
        isReceptionist,
        isStaff,
        isClient,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
