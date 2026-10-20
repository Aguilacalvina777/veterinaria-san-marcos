import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductCard, { formatPrice } from '../components/ProductCard';
import ServiceCard from '../components/ServiceCard';
import { CartProvider } from '../context/CartContext';
import { BrowserRouter } from 'react-router-dom';

const mockProduct = {
  code: 'ME001',
  category: 'Antibióticos',
  name: 'Amoxibay 250mg',
  activeIngredient: 'Amoxicilina',
  presentation: 'Blíster 10 comp.',
  species: 'Perro / Gato',
  stock: 45,
  criticalStock: 20,
  price: 4200,
  offerPrice: null,
  image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500',
  description: 'Antibiótico bactericida de amplio espectro.'
};

const mockCriticalProduct = {
  ...mockProduct,
  code: 'ME016',
  name: 'Vetmedin 2.5mg',
  stock: 15,
  criticalStock: 20
};

const mockOutOfStockProduct = {
  ...mockProduct,
  code: 'ME999',
  name: 'Fármaco Agotado',
  stock: 0
};

const mockService = {
  code: 'VA002',
  category: 'Vacunación',
  name: 'Vacuna sextuple canina',
  species: 'Perro',
  duration: '10 min',
  price: 18000,
  observations: 'Refuerzo anual contra Parvovirus y Distemper.'
};

describe('Componentes: ProductCard y ServiceCard', () => {
  it('1. ProductCard renderiza correctamente la información del producto y el precio CLP', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    expect(screen.getByText('Amoxibay 250mg')).toBeInTheDocument();
    expect(screen.getByText('ME001')).toBeInTheDocument();
    expect(screen.getByText(/Amoxicilina/)).toBeInTheDocument();
    expect(screen.getByText('Stock: 45 unid.')).toBeInTheDocument();
    expect(screen.getByText(formatPrice(4200))).toBeInTheDocument();
  });

  it('2. ProductCard muestra advertencia condicional cuando el stock es crítico', () => {
    render(
      <CartProvider>
        <ProductCard product={mockCriticalProduct} />
      </CartProvider>
    );

    expect(screen.getByText(/¡Últimas 15 unid.!/)).toBeInTheDocument();
  });

  it('3. ProductCard deshabilita el botón de agregar cuando el stock es 0', () => {
    render(
      <CartProvider>
        <ProductCard product={mockOutOfStockProduct} />
      </CartProvider>
    );

    expect(screen.getByText(/Sin Stock/)).toBeInTheDocument();
    const btn = screen.getByTestId('add-to-cart-ME999');
    expect(btn).toBeDisabled();
  });

  it('4. ServiceCard renderiza nombre, categoría, especie, duración y botón de agendamiento', () => {
    render(
      <BrowserRouter>
        <ServiceCard service={mockService} />
      </BrowserRouter>
    );

    expect(screen.getByText('Vacuna sextuple canina')).toBeInTheDocument();
    expect(screen.getByText('Vacunación')).toBeInTheDocument();
    expect(screen.getByText(/Perro/)).toBeInTheDocument();
    expect(screen.getByText(/10 min/)).toBeInTheDocument();
    expect(screen.getByText(/Refuerzo anual contra Parvovirus/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Agendar/i })).toHaveAttribute(
      'href',
      '/agendar?service=VA002'
    );
  });
});
