import {
  initialProducts,
  initialServices,
  initialUsers,
  initialPets,
  initialAppointments,
  initialOrders
} from '../data/mockData';

const KEYS = {
  PRODUCTS: 'vsm_products',
  SERVICES: 'vsm_services',
  USERS: 'vsm_users',
  PETS: 'vsm_pets',
  APPOINTMENTS: 'vsm_appointments',
  ORDERS: 'vsm_orders',
  CURRENT_USER: 'vsm_current_user',
  CART: 'vsm_cart'
};

// Inicialización de datos en localStorage si no existen
export function initializeStorage() {
  if (!localStorage.getItem(KEYS.PRODUCTS)) {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(initialProducts));
  }
  if (!localStorage.getItem(KEYS.SERVICES)) {
    localStorage.setItem(KEYS.SERVICES, JSON.stringify(initialServices));
  }
  if (!localStorage.getItem(KEYS.USERS)) {
    localStorage.setItem(KEYS.USERS, JSON.stringify(initialUsers));
  }
  if (!localStorage.getItem(KEYS.PETS)) {
    localStorage.setItem(KEYS.PETS, JSON.stringify(initialPets));
  }
  if (!localStorage.getItem(KEYS.APPOINTMENTS)) {
    localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(initialAppointments));
  }
  if (!localStorage.getItem(KEYS.ORDERS)) {
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(initialOrders));
  }
}

// Reset data to defaults
export function resetToDefaults() {
  localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(initialProducts));
  localStorage.setItem(KEYS.SERVICES, JSON.stringify(initialServices));
  localStorage.setItem(KEYS.USERS, JSON.stringify(initialUsers));
  localStorage.setItem(KEYS.PETS, JSON.stringify(initialPets));
  localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(initialAppointments));
  localStorage.setItem(KEYS.ORDERS, JSON.stringify(initialOrders));
  localStorage.removeItem(KEYS.CART);
}

// ==========================================
// CRUD PRODUCTOS (Medicamentos y Vacunas)
// ==========================================
export function getProducts() {
  initializeStorage();
  try {
    return JSON.parse(localStorage.getItem(KEYS.PRODUCTS)) || [];
  } catch {
    return initialProducts;
  }
}

export function getProductByCode(code) {
  const products = getProducts();
  return products.find(p => p.code === code) || null;
}

export function createProduct(productData) {
  const products = getProducts();
  const newProduct = {
    ...productData,
    code: productData.code || `ME0${products.length + 1}`,
    stock: Number(productData.stock || 0),
    criticalStock: Number(productData.criticalStock || 15),
    price: Number(productData.price || 0),
    offerPrice: productData.offerPrice ? Number(productData.offerPrice) : null,
    image: productData.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60'
  };
  products.unshift(newProduct);
  localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  return newProduct;
}

export function updateProduct(code, updatedData) {
  const products = getProducts();
  const index = products.findIndex(p => p.code === code);
  if (index !== -1) {
    products[index] = {
      ...products[index],
      ...updatedData,
      stock: Number(updatedData.stock !== undefined ? updatedData.stock : products[index].stock),
      price: Number(updatedData.price !== undefined ? updatedData.price : products[index].price),
      criticalStock: Number(updatedData.criticalStock !== undefined ? updatedData.criticalStock : products[index].criticalStock),
      offerPrice: updatedData.offerPrice ? Number(updatedData.offerPrice) : null
    };
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
    return products[index];
  }
  return null;
}

export function deleteProduct(code) {
  const products = getProducts();
  const filtered = products.filter(p => p.code !== code);
  localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(filtered));
  return true;
}

export function getCriticalStockProducts() {
  const products = getProducts();
  return products.filter(p => p.stock <= (p.criticalStock || 20));
}

// ==========================================
// SERVICIOS CLÍNICOS (Catálogo)
// ==========================================
export function getServices() {
  initializeStorage();
  try {
    return JSON.parse(localStorage.getItem(KEYS.SERVICES)) || initialServices;
  } catch {
    return initialServices;
  }
}

export function getServiceByCode(code) {
  const services = getServices();
  return services.find(s => s.code === code) || null;
}

// ==========================================
// CRUD CITAS / SOLICITUDES
// ==========================================
export function getAppointments() {
  initializeStorage();
  try {
    return JSON.parse(localStorage.getItem(KEYS.APPOINTMENTS)) || [];
  } catch {
    return initialAppointments;
  }
}

export function getAppointmentsByOwner(ownerId) {
  const appointments = getAppointments();
  return appointments.filter(a => a.ownerId === ownerId);
}

export function createAppointment(aptData) {
  const appointments = getAppointments();
  const newApt = {
    id: `APT${String(Date.now()).slice(-6)}`,
    status: 'Pendiente',
    createdAt: new Date().toISOString().split('T')[0],
    ...aptData
  };
  appointments.unshift(newApt);
  localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(appointments));
  return newApt;
}

export function updateAppointment(id, updateFields) {
  const appointments = getAppointments();
  const index = appointments.findIndex(a => a.id === id);
  if (index !== -1) {
    appointments[index] = { ...appointments[index], ...updateFields };
    localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(appointments));
    return appointments[index];
  }
  return null;
}

export function deleteAppointment(id) {
  const appointments = getAppointments();
  const filtered = appointments.filter(a => a.id !== id);
  localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(filtered));
  return true;
}

// ==========================================
// CRUD USUARIOS (RBAC)
// ==========================================
export function getUsers() {
  initializeStorage();
  try {
    return JSON.parse(localStorage.getItem(KEYS.USERS)) || [];
  } catch {
    return initialUsers;
  }
}

export function getUserById(id) {
  const users = getUsers();
  return users.find(u => u.id === id) || null;
}

export function createUser(userData) {
  const users = getUsers();
  const newUser = {
    id: `USR${String(Date.now()).slice(-4)}`,
    active: true,
    createdAt: new Date().toISOString().split('T')[0],
    ...userData
  };
  users.push(newUser);
  localStorage.setItem(KEYS.USERS, JSON.stringify(users));
  return newUser;
}

export function updateUser(id, updateFields) {
  const users = getUsers();
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updateFields };
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    return users[index];
  }
  return null;
}

export function toggleUserStatus(id) {
  const users = getUsers();
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index].active = !users[index].active;
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    return users[index];
  }
  return null;
}

// ==========================================
// CRUD ÓRDENES / CHECKOUT
// ==========================================
export function getOrders() {
  initializeStorage();
  try {
    return JSON.parse(localStorage.getItem(KEYS.ORDERS)) || [];
  } catch {
    return initialOrders;
  }
}

export function createOrder(orderData) {
  const orders = getOrders();
  const newOrder = {
    id: `ORD${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'Aprobado',
    ...orderData
  };

  // Descontar inventario de los productos comprados
  const products = getProducts();
  newOrder.items.forEach(item => {
    const pIndex = products.findIndex(p => p.code === item.code);
    if (pIndex !== -1) {
      products[pIndex].stock = Math.max(0, products[pIndex].stock - item.quantity);
    }
  });
  localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));

  orders.unshift(newOrder);
  localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
  return newOrder;
}

export function getOrderById(id) {
  const orders = getOrders();
  return orders.find(o => o.id === id) || null;
}

// ==========================================
// PACIENTES Y FICHAS CLÍNICAS
// ==========================================
export function getPets() {
  initializeStorage();
  try {
    return JSON.parse(localStorage.getItem(KEYS.PETS)) || [];
  } catch {
    return initialPets;
  }
}

export function getPetsByOwner(ownerId) {
  const pets = getPets();
  return pets.filter(p => p.ownerId === ownerId);
}

export function addMedicalRecord(petId, record) {
  const pets = getPets();
  const pet = pets.find(p => p.id === petId);
  if (pet) {
    if (!pet.medicalHistory) pet.medicalHistory = [];
    pet.medicalHistory.unshift({
      date: new Date().toISOString().split('T')[0],
      ...record
    });
    localStorage.setItem(KEYS.PETS, JSON.stringify(pets));
    return pet;
  }
  return null;
}

export function addVaccineRecord(petId, vaccine) {
  const pets = getPets();
  const pet = pets.find(p => p.id === petId);
  if (pet) {
    if (!pet.vaccines) pet.vaccines = [];
    pet.vaccines.unshift(vaccine);
    localStorage.setItem(KEYS.PETS, JSON.stringify(pets));
    return pet;
  }
  return null;
}
