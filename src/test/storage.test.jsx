import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCriticalStockProducts,
  createAppointment,
  updateAppointment,
  createOrder,
  resetToDefaults
} from '../services/storageService';

describe('Capa de Persistencia y Operaciones CRUD (storageService)', () => {
  beforeEach(() => {
    localStorage.clear();
    resetToDefaults();
  });

  it('9. createProduct agrega un nuevo medicamento y lo persiste en localStorage', () => {
    const initialCount = getProducts().length;
    const newProd = {
      code: 'ME999',
      name: 'Antibiótico Test',
      category: 'Antibióticos',
      activeIngredient: 'Cefalexina',
      presentation: 'Blíster 10 comp.',
      species: 'Perro',
      stock: 25,
      criticalStock: 10,
      price: 7500
    };

    const created = createProduct(newProd);
    expect(created.code).toBe('ME999');

    const productsAfter = getProducts();
    expect(productsAfter.length).toBe(initialCount + 1);
    expect(productsAfter.some(p => p.code === 'ME999')).toBe(true);
  });

  it('10. updateProduct actualiza stock y se detecta en el listado de productos críticos', () => {
    // ME001 has initial stock 45, criticalStock 20
    const updated = updateProduct('ME001', { stock: 8 });
    expect(updated.stock).toBe(8);

    const criticalList = getCriticalStockProducts();
    const isNowCritical = criticalList.some(p => p.code === 'ME001');
    expect(isNowCritical).toBe(true);
  });

  it('11. createAppointment genera solicitud con estado inicial "Pendiente" y fecha asociada', () => {
    const apt = createAppointment({
      ownerId: 'USR003',
      ownerName: 'Carlos González',
      petName: 'Max',
      species: 'Perro',
      serviceCode: 'SV001',
      serviceName: 'Consulta general',
      date: '2026-10-30',
      time: '11:00'
    });

    expect(apt.id).toMatch(/^APT/);
    expect(apt.status).toBe('Pendiente');
    expect(apt.petName).toBe('Max');
  });

  it('12. createOrder descuenta inventario automáticamente de los productos adquiridos', () => {
    // Check ME004 initial stock
    const productsBefore = getProducts();
    const nexgardBefore = productsBefore.find(p => p.code === 'ME004');
    const initialStock = nexgardBefore.stock;

    // Place an order for 2 units
    createOrder({
      userId: 'USR003',
      customer: { firstName: 'Cliente', lastName: 'Prueba', email: 'test@correo.cl' },
      items: [
        { code: 'ME004', name: 'Nexgard Masticable', price: 9500, quantity: 2, subtotal: 19000 }
      ],
      total: 19000
    });

    // Verify stock was reduced by 2
    const productsAfter = getProducts();
    const nexgardAfter = productsAfter.find(p => p.code === 'ME004');
    expect(nexgardAfter.stock).toBe(initialStock - 2);
  });
});
