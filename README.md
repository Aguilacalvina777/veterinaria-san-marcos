# 🐾 Veterinaria San Marcos - Rancagua
### Proyecto Frontend React + Vite | DSY1104 Desarrollo FullStack II (Forma A) · Evaluación Parcial 2 (EP2)

Bienvenido al sistema web integral de **Veterinaria San Marcos**, clínica veterinaria y farmacia especializada ubicada en Rancagua (Región de O'Higgins), fundada en 2009. Este frontend SPA (Single Page Application) moderno reemplaza los procesos físicos en papel por una plataforma digital centralizada y responsiva.

---

## 🚀 Requisitos y Ejecución Rápida

### 1. Requisitos Previos
- **Node.js**: v18.0.0 o superior (instalado v24.20.0 LTS)
- **NPM**: v9.0.0 o superior

### 2. Puesta en Marcha en Visual Studio Code
Para abrir y ejecutar este proyecto en Visual Studio Code:
```bash

# 1. Abrir en Visual Studio Code
code .

# 2. Instalar dependencias (si es un clon limpio)
npm install

# 3. Iniciar servidor de desarrollo local
npm run dev
```
La aplicación abrirá en: `http://localhost:5173`

---

## 🧪 Pruebas Unitarias y Cobertura (Vitest + React Testing Library)

El proyecto cuenta con **12 pruebas unitarias automatizadas** que validan renderizado condicional, manejo de props y estado, validación de formularios e interacciones con la base de datos simulada en JavaScript.

```bash
# Ejecutar todas las pruebas unitarias
npm test

# Modo interactivo en vivo (watch)
npm run test:watch

# Generar informe de cobertura de código
npm run test:coverage

# Compilar para producción (Build)
npm run build
```

---

## 👥 Cuentas de Acceso de Demostración (RBAC)

Para facilitar la evaluación docente, la barra superior (topbar) incluye un **selector rápido de roles**. También puedes ingresar manualmente en `/login`:

| Rol | Correo Electrónico | Contraseña | Descripción de Permisos |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin@sanmarcos.cl` | `admin` | Acceso total al sistema, gestión de usuarios (RBAC), catálogo, órdenes, reportes y métricas. |
| **Recepcionista** | `recepcion@sanmarcos.cl` | `recep` | Gestión de agenda, confirmación y reagendamiento de citas, registro de fichas clínicas y vacunas. |
| **Dueño de Mascota** | `cliente@gmail.com` | `123` | Solicitud de citas en línea, carnet digital de vacunas, historial clínico propio y tienda con checkout. |

---

## 🗺️ Mapa Interactivo en Rancagua
- Integrado con **Leaflet** y OpenStreetMap sin requerir API keys externas.
- Ubicación georreferenciada de la clínica: **Av. Libertador Bernardo O'Higgins 450, Rancagua** (`lat: -34.1708, lng: -70.7444`).
- Botón **"Indicaciones desde mi ubicación"** mediante la API de Geolocalización de HTML5 (calcula distancia en km y traza la ruta).
- Enlace directo a Google Maps para navegación GPS en vivo.

---

## 📦 Flujo de Compra y Checkout (Figuras 5, 6, 7 y 8)
1. **Carrito (`/carrito`)**: Lista de productos, control interactivo de cantidades con límite por stock físico, subtotales, vaciado y totalizador.
2. **Checkout (`/checkout`)**: Datos del cliente y dirección de despacho (con autocompletado automático si hay sesión iniciada), opciones de pago y **switch interactivo de prueba para simular rechazo de pago**.
3. **Compra Exitosa (`/compra-exitosa`)**: Resumen completo de la orden, número correlativo, animación de confetti, botón de *Imprimir Boleta en PDF* y *Enviar boleta por email*.
4. **Pago con Error (`/pago-error`)**: Interfaz amigable que preserva los ítems del pedido con botón para *Volver a realizar el pago*.

---

## 📂 Estructura del Proyecto
```text
veterinaria-san-marcos/
├── public/
├── src/
│   ├── components/         # Componentes reutilizables (Navbar, Footer, ProductCard, ServiceCard, ClinicMap, ReceiptModal...)
│   ├── context/            # AuthContext (RBAC) y CartContext (Carrito y compras)
│   ├── data/               # mockData.js (26 servicios Forma A + 22 medicamentos con stock real)
│   ├── pages/              # Vistas públicas (Home, Catalog, Services, Categories, Offers, About, Blog, Contact, Cart, Checkout...)
│   │   └── admin/          # Vistas del Panel Administrativo (Dashboard, Citas, Fichas, Productos, Órdenes, Categorías, Usuarios, Reportes, Perfil)
│   ├── services/           # storageService.js (CRUD completo con persistencia en localStorage)
│   ├── styles/             # custom.css (paleta teal/veterinaria, diseño responsivo y estilos de impresión)
│   ├── test/               # Suite de 12 pruebas unitarias con Vitest y RTL
│   ├── App.jsx             # Router principal con rutas públicas y protegidas
│   └── main.jsx            # Punto de entrada de la aplicación
├── package.json
└── vite.config.js
```
