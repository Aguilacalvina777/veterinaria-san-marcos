import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Login from '../pages/Login';
import Contact from '../pages/Contact';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { BrowserRouter } from 'react-router-dom';

describe('Formularios, Validaciones y Eventos', () => {
  it('5. Login muestra mensaje de error si los campos están vacíos al intentar enviar', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    const submitBtn = screen.getByTestId('btn-login-submit');
    fireEvent.click(submitBtn);

    expect(
      await screen.findByText('Por favor ingresa tu correo y contraseña.')
    ).toBeInTheDocument();
  });

  it('6. Login muestra error con credenciales incorrectas', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const submitBtn = screen.getByTestId('btn-login-submit');

    fireEvent.change(emailInput, { target: { value: 'invalido@correo.cl' } });
    fireEvent.change(passInput, { target: { value: 'claveerronea' } });
    fireEvent.click(submitBtn);

    expect(
      await screen.findByText('Correo o contraseña incorrectos.')
    ).toBeInTheDocument();
  });

  it('7. Contact valida campos obligatorios y formato de correo electrónico', async () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );

    const submitBtn = screen.getByRole('button', { name: /Enviar Mensaje/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByText('El nombre es obligatorio.')).toBeInTheDocument();
    expect(await screen.findByText('El correo electrónico es obligatorio.')).toBeInTheDocument();
    expect(await screen.findByText('El teléfono es obligatorio para contactarte.')).toBeInTheDocument();
  });

  it('8. Contact valida longitud mínima del mensaje de consulta', async () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );

    const nameInput = screen.getByPlaceholderText('Ej: Juan Pérez');
    const emailInput = screen.getByPlaceholderText('tu@correo.cl');
    const phoneInput = screen.getByPlaceholderText('+56 9 1234 5678');
    const messageInput = screen.getByPlaceholderText(/Escribe aquí tu consulta/i);
    const submitBtn = screen.getByRole('button', { name: /Enviar Mensaje/i });

    fireEvent.change(nameInput, { target: { value: 'Juan Silva' } });
    fireEvent.change(emailInput, { target: { value: 'juan@test.cl' } });
    fireEvent.change(phoneInput, { target: { value: '+56911223344' } });
    fireEvent.change(messageInput, { target: { value: 'Hola' } }); // < 10 chars

    fireEvent.click(submitBtn);

    expect(
      await screen.findByText('El mensaje debe tener al menos 10 caracteres.')
    ).toBeInTheDocument();
  });
});
