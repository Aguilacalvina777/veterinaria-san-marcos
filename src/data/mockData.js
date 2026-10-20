// Datos iniciales de la Veterinaria San Marcos (Rancagua)
// Forma A - DSY1104 Desarrollo FullStack II

export const initialServices = [
  // Consultas
  {
    code: 'SV001',
    category: 'Consultas',
    name: 'Consulta general',
    species: 'Perro / Gato',
    duration: '30 min',
    price: 15000,
    observations: 'Evaluación clínica preventiva o por síntomas generales.'
  },
  {
    code: 'SV002',
    category: 'Consultas',
    name: 'Consulta urgencia',
    species: 'Perro / Gato',
    duration: '30 min',
    price: 25000,
    observations: 'Fuera de horario +$10.000. Atención prioritaria inmediata.'
  },
  {
    code: 'SV003',
    category: 'Consultas',
    name: 'Control postoperatorio',
    species: 'Perro / Gato',
    duration: '20 min',
    price: 10000,
    observations: 'Revisión de suturas y evolución postquirúrgica.'
  },
  {
    code: 'SV004',
    category: 'Consultas',
    name: 'Consulta ave / conejo',
    species: 'Ave / Conejo',
    duration: '30 min',
    price: 18000,
    observations: 'Atención especializada para animales exóticos menores.'
  },
  {
    code: 'SV005',
    category: 'Consultas',
    name: 'Segunda opinión médica',
    species: 'Todas',
    duration: '40 min',
    price: 20000,
    observations: 'Requiere ficha previa y exámenes anteriores.'
  },

  // Vacunación
  {
    code: 'VA001',
    category: 'Vacunación',
    name: 'Vacuna antirrábica canina',
    species: 'Perro',
    duration: '10 min',
    price: 12000,
    observations: 'Obligatoria por ley. Certificado oficial SAG incluido.'
  },
  {
    code: 'VA002',
    category: 'Vacunación',
    name: 'Vacuna sextuple canina',
    species: 'Perro',
    duration: '10 min',
    price: 18000,
    observations: 'Refuerzo anual contra Parvovirus, Distemper, Hepatitis y más.'
  },
  {
    code: 'VA003',
    category: 'Vacunación',
    name: 'Vacuna bivalente felina',
    species: 'Gato',
    duration: '10 min',
    price: 15000,
    observations: 'Refuerzo anual felino.'
  },
  {
    code: 'VA004',
    category: 'Vacunación',
    name: 'Vacuna triple felina',
    species: 'Gato',
    duration: '10 min',
    price: 17000,
    observations: 'Refuerzo anual. Inmunización completa felina.'
  },
  {
    code: 'VA005',
    category: 'Vacunación',
    name: 'Vacuna Bordetella canina',
    species: 'Perro',
    duration: '10 min',
    price: 14000,
    observations: 'Tos de las perreras. Ideal para hospedajes y parques.'
  },
  {
    code: 'VA006',
    category: 'Vacunación',
    name: 'Vacuna antirrábica felina',
    species: 'Gato',
    duration: '10 min',
    price: 12000,
    observations: 'Obligatoria por ley. Incluye microchip sugerido.'
  },

  // Cirugía
  {
    code: 'CI001',
    category: 'Cirugía',
    name: 'Esterilización hembra canina',
    species: 'Perra',
    duration: '90 min',
    price: 80000,
    observations: 'Incluye anestesia y hospitalización 24h.'
  },
  {
    code: 'CI002',
    category: 'Cirugía',
    name: 'Esterilización macho canino',
    species: 'Perro',
    duration: '60 min',
    price: 60000,
    observations: 'Incluye anestesia y control a los 7 días.'
  },
  {
    code: 'CI003',
    category: 'Cirugía',
    name: 'Esterilización hembra felina',
    species: 'Gata',
    duration: '60 min',
    price: 65000,
    observations: 'Incluye anestesia y hospitalización 12h.'
  },
  {
    code: 'CI004',
    category: 'Cirugía',
    name: 'Esterilización macho felino',
    species: 'Gato',
    duration: '45 min',
    price: 50000,
    observations: 'Incluye anestesia y alta durante la misma jornada.'
  },
  {
    code: 'CI005',
    category: 'Cirugía',
    name: 'Extirpación de tumor cutáneo',
    species: 'Perro / Gato',
    duration: '60 min',
    price: 120000,
    observations: 'Precio referencial; varía según tamaño e histopatología.'
  },
  {
    code: 'CI006',
    category: 'Cirugía',
    name: 'Cesárea de urgencia',
    species: 'Perra / Gata',
    duration: '120 min',
    price: 180000,
    observations: 'Atención obstétrica integral con reanimación neonatal.'
  },

  // Desparasitación
  {
    code: 'DE001',
    category: 'Desparasitación',
    name: 'Desparasitación interna pequeños (<10 kg)',
    species: 'Perro',
    duration: '5 min',
    price: 8000,
    observations: 'Comprimido antiparasitario de amplio espectro.'
  },
  {
    code: 'DE002',
    category: 'Desparasitación',
    name: 'Desparasitación interna medianos (10-25 kg)',
    species: 'Perro',
    duration: '5 min',
    price: 9500,
    observations: 'Dosis calibrada según peso exacto en báscula.'
  },
  {
    code: 'DE003',
    category: 'Desparasitación',
    name: 'Desparasitación interna grandes (>25 kg)',
    species: 'Perro',
    duration: '5 min',
    price: 11000,
    observations: 'Protección para razas grandes.'
  },
  {
    code: 'DE004',
    category: 'Desparasitación',
    name: 'Desparasitación interna felina',
    species: 'Gato',
    duration: '5 min',
    price: 8000,
    observations: 'Pasta o comprimido palatable para gatos.'
  },
  {
    code: 'DE005',
    category: 'Desparasitación',
    name: 'Antiparasitario externo (pipeta)',
    species: 'Perro / Gato',
    duration: '5 min',
    price: 7500,
    observations: 'Incluye aplicación profesional.'
  },

  // Exámenes
  {
    code: 'EX001',
    category: 'Exámenes',
    name: 'Hemograma completo',
    species: 'Perro / Gato',
    duration: '30 min',
    price: 22000,
    observations: 'Resultado en 24-48 h con informe detallado.'
  },
  {
    code: 'EX002',
    category: 'Exámenes',
    name: 'Perfil bioquímico completo',
    species: 'Perro / Gato',
    duration: '30 min',
    price: 35000,
    observations: 'Resultado en 24-48 h (perfil hepático y renal).'
  },
  {
    code: 'EX003',
    category: 'Exámenes',
    name: 'Radiografía (1 proyección)',
    species: 'Perro / Gato',
    duration: '20 min',
    price: 28000,
    observations: 'Imagen digital de alta resolución entregada al correo.'
  },
  {
    code: 'EX004',
    category: 'Exámenes',
    name: 'Ecografía abdominal',
    species: 'Perro / Gato',
    duration: '30 min',
    price: 45000,
    observations: 'Evaluación de órganos internos en tiempo real.'
  },
  {
    code: 'EX005',
    category: 'Exámenes',
    name: 'Test de leishmaniasis',
    species: 'Perro',
    duration: '20 min',
    price: 18000,
    observations: 'Prueba rápida serológica con resultado en 15 minutos.'
  },

  // Otros
  {
    code: 'OT001',
    category: 'Otros',
    name: 'Corte de uñas',
    species: 'Perro / Gato',
    duration: '15 min',
    price: 5000,
    observations: 'Higiene preventiva sin estrés para tu mascota.'
  },
  {
    code: 'OT002',
    category: 'Otros',
    name: 'Limpieza dental',
    species: 'Perro / Gato',
    duration: '45 min',
    price: 55000,
    observations: 'Requiere anestesia general previa revisión de exámenes.'
  },
  {
    code: 'OT003',
    category: 'Otros',
    name: 'Microchip identificación',
    species: 'Perro / Gato',
    duration: '10 min',
    price: 15000,
    observations: 'Incluye registro en la Plataforma Nacional de Mascotas.'
  },
  {
    code: 'OT004',
    category: 'Otros',
    name: 'Hospitalización (por día)',
    species: 'Perro / Gato',
    duration: '24 h',
    price: 30000,
    observations: 'Incluye monitoreo constante, fluidoterapia y alimentación básica.'
  }
];

export const initialProducts = [
  {
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
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60',
    description: 'Antibiótico bactericida de amplio espectro para infecciones respiratorias, dérmicas y urogenitales.'
  },
  {
    code: 'ME002',
    category: 'Antibióticos',
    name: 'Enrox 50mg',
    activeIngredient: 'Enrofloxacino',
    presentation: 'Blíster 10 comp.',
    species: 'Perro / Gato',
    stock: 30,
    criticalStock: 20,
    price: 6800,
    offerPrice: 5990,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&auto=format&fit=crop&q=60',
    description: 'Fluoroquinolona potente para afecciones bacterianas complejas de tejidos blandos y vías urinarias.'
  },
  {
    code: 'ME003',
    category: 'Antibióticos',
    name: 'Metrobay 250mg',
    activeIngredient: 'Metronidazol',
    presentation: 'Blíster 10 comp.',
    species: 'Perro / Gato',
    stock: 28,
    criticalStock: 20,
    price: 3900,
    offerPrice: null,
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=500&auto=format&fit=crop&q=60',
    description: 'Antiprotozoario y antibacteriano para diarreas por Giardia y bacterias anaerobias.'
  },
  {
    code: 'ME004',
    category: 'Antiparasitarios',
    name: 'Nexgard Masticable',
    activeIngredient: 'Afoxolaner',
    presentation: 'Masticable 1 unid.',
    species: 'Perro',
    stock: 60,
    criticalStock: 25,
    price: 9500,
    offerPrice: 8490,
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&auto=format&fit=crop&q=60',
    description: 'Comprimido masticable con sabor a carne que elimina pulgas y garrapatas durante 30 días.'
  },
  {
    code: 'ME005',
    category: 'Antiparasitarios',
    name: 'Bravecto Masticable',
    activeIngredient: 'Fluralaner',
    presentation: 'Masticable 1 unid.',
    species: 'Perro',
    stock: 40,
    criticalStock: 20,
    price: 18900,
    offerPrice: null,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop&q=60',
    description: 'Protección continua de 12 semanas (3 meses completos) contra pulgas y garrapatas en una sola toma.'
  },
  {
    code: 'ME006',
    category: 'Antiparasitarios',
    name: 'Revolution Plus',
    activeIngredient: 'Selamectina + Sarolaner',
    presentation: 'Pipeta 1 unid.',
    species: 'Gato',
    stock: 35,
    criticalStock: 15,
    price: 14500,
    offerPrice: 12990,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop&q=60',
    description: 'Solución tópica de amplio espectro contra pulgas, ácaros de las orejas, gusanos intestinales y del corazón.'
  },
  {
    code: 'ME007',
    category: 'Antiparasitarios',
    name: 'Drontal Plus Perro',
    activeIngredient: 'Praziquantel + Pamoato',
    presentation: 'Comprimido 1 unid.',
    species: 'Perro',
    stock: 80,
    criticalStock: 30,
    price: 3200,
    offerPrice: null,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&auto=format&fit=crop&q=60',
    description: 'Antiparasitario interno oral contra tenias, nemátodos y Giardia canina.'
  },
  {
    code: 'ME008',
    category: 'Antiparasitarios',
    name: 'Milbemax Gato',
    activeIngredient: 'Milbemicina + Praziq.',
    presentation: 'Comprimido 2 unid.',
    species: 'Gato',
    stock: 50,
    criticalStock: 20,
    price: 6800,
    offerPrice: null,
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500&auto=format&fit=crop&q=60',
    description: 'Comprimidos pequeños de fácil deglución para el control de parásitos gastrointestinales felinos.'
  },
  {
    code: 'ME009',
    category: 'Antiinflamatorios',
    name: 'Meloxicam 1mg',
    activeIngredient: 'Meloxicam',
    presentation: 'Blíster 10 comp.',
    species: 'Perro / Gato',
    stock: 55,
    criticalStock: 20,
    price: 4500,
    offerPrice: null,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&auto=format&fit=crop&q=60',
    description: 'Antiinflamatorio no esteroidal (AINE) con acción analgésica para dolores articulares y postoperatorios.'
  },
  {
    code: 'ME010',
    category: 'Antiinflamatorios',
    name: 'Carprofen 50mg',
    activeIngredient: 'Carprofeno',
    presentation: 'Blíster 10 comp.',
    species: 'Perro',
    stock: 30,
    criticalStock: 15,
    price: 9800,
    offerPrice: 8500,
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=500&auto=format&fit=crop&q=60',
    description: 'Manejo del dolor y la inflamación asociados a la osteoartritis canina.'
  },
  {
    code: 'ME011',
    category: 'Dermatología',
    name: 'Clorhexidina Shampoo',
    activeIngredient: 'Clorhexidina 2%',
    presentation: 'Frasco 250ml',
    species: 'Perro / Gato',
    stock: 25,
    criticalStock: 15,
    price: 8900,
    offerPrice: null,
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&auto=format&fit=crop&q=60',
    description: 'Shampoo antiséptico para el control de piodermas y dermatitis bacterianas en piel sensible.'
  },
  {
    code: 'ME012',
    category: 'Dermatología',
    name: 'Malaseb Shampoo',
    activeIngredient: 'Miconazol + Clorhex.',
    presentation: 'Frasco 250ml',
    species: 'Perro / Gato',
    stock: 20,
    criticalStock: 15,
    price: 12500,
    offerPrice: 10990,
    image: 'https://images.unsplash.com/photo-1560743641-3914f2c45636?w=500&auto=format&fit=crop&q=60',
    description: 'Tratamiento antimicótico y antibacteriano de vanguardia para dermatitis por Malassezia.'
  },
  {
    code: 'ME013',
    category: 'Dermatología',
    name: 'Apoquel 16mg',
    activeIngredient: 'Oclacitinib',
    presentation: 'Blíster 10 comp.',
    species: 'Perro',
    stock: 18, // Crítico!
    criticalStock: 20,
    price: 22000,
    offerPrice: null,
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=500&auto=format&fit=crop&q=60',
    description: 'Control rápido y eficaz de la picazón por dermatitis alérgica y atópica en perros.'
  },
  {
    code: 'ME014',
    category: 'Digestivo',
    name: 'Probifor Probiótico',
    activeIngredient: 'Bacillus clausii',
    presentation: 'Sobre 5ml x10',
    species: 'Perro / Gato',
    stock: 40,
    criticalStock: 15,
    price: 5600,
    offerPrice: 4990,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&auto=format&fit=crop&q=60',
    description: 'Restaurador de la flora intestinal tras tratamientos antibióticos o episodios de diarrea.'
  },
  {
    code: 'ME015',
    category: 'Digestivo',
    name: 'Omeprazol 10mg Vet',
    activeIngredient: 'Omeprazol',
    presentation: 'Blíster 10 comp.',
    species: 'Perro / Gato',
    stock: 35,
    criticalStock: 15,
    price: 3800,
    offerPrice: null,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&auto=format&fit=crop&q=60',
    description: 'Protector gástrico inhibidor de la bomba de protones para gastritis y úlceras.'
  },
  {
    code: 'ME016',
    category: 'Cardíaco',
    name: 'Vetmedin 2.5mg',
    activeIngredient: 'Pimobendan',
    presentation: 'Blíster 10 comp.',
    species: 'Perro',
    stock: 15, // Crítico!
    criticalStock: 20,
    price: 28000,
    offerPrice: null,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&auto=format&fit=crop&q=60',
    description: 'Inodilatador indicado para el tratamiento de la insuficiencia cardíaca congestiva canina.'
  },
  {
    code: 'ME017',
    category: 'Analgésicos',
    name: 'Tramadol 50mg Vet',
    activeIngredient: 'Tramadol',
    presentation: 'Blíster 10 comp.',
    species: 'Perro',
    stock: 22,
    criticalStock: 15,
    price: 5200,
    offerPrice: null,
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&auto=format&fit=crop&q=60',
    description: 'Analgésico de acción central para dolor moderado a severo agudo o crónico.'
  },
  {
    code: 'ME018',
    category: 'Vacunas',
    name: 'Nobivac DHPPi',
    activeIngredient: 'Vacuna polivalente',
    presentation: 'Vial 1 dosis',
    species: 'Perro',
    stock: 48,
    criticalStock: 20,
    price: 8500,
    offerPrice: null,
    image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=500&auto=format&fit=crop&q=60',
    description: 'Inmunización activa contra Distemper, Adenovirus canino tipo 1, Parvovirus e Influenza.'
  },
  {
    code: 'ME019',
    category: 'Vacunas',
    name: 'Nobivac Rabies',
    activeIngredient: 'Vacuna antirrábica',
    presentation: 'Vial 1 dosis',
    species: 'Perro / Gato',
    stock: 60,
    criticalStock: 25,
    price: 5800,
    offerPrice: null,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=60',
    description: 'Vacuna inactivada contra la Rabia, confiere inmunidad sólida por un año.'
  },
  {
    code: 'ME020',
    category: 'Vacunas',
    name: 'Felocell CVR',
    activeIngredient: 'Vacuna triple felina',
    presentation: 'Vial 1 dosis',
    species: 'Gato',
    stock: 36,
    criticalStock: 15,
    price: 7200,
    offerPrice: 6500,
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&auto=format&fit=crop&q=60',
    description: 'Protección contra Rinotraqueítis viral, Calicivirus y Panleucopenia felina.'
  },
  {
    code: 'ME021',
    category: 'Suplementos',
    name: 'Omega Vet 3-6-9',
    activeIngredient: 'Ácidos grasos omega',
    presentation: 'Frasco 100ml',
    species: 'Perro / Gato',
    stock: 30,
    criticalStock: 15,
    price: 9900,
    offerPrice: 8900,
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=500&auto=format&fit=crop&q=60',
    description: 'Favorece la salud cardiovascular, articulaciones sanas y un pelaje brillante y sedoso.'
  },
  {
    code: 'ME022',
    category: 'Suplementos',
    name: 'Condrovet Forte',
    activeIngredient: 'Condroitín + Glucosamina',
    presentation: 'Blíster 30 comp.',
    species: 'Perro',
    stock: 25,
    criticalStock: 15,
    price: 14500,
    offerPrice: null,
    image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=500&auto=format&fit=crop&q=60',
    description: 'Condroprotector recomendado para desgaste articular, displasia y perros senior.'
  }
];

export const initialUsers = [
  {
    id: 'USR001',
    name: 'Dra. Carolina Morales',
    email: 'admin@sanmarcos.cl',
    password: 'admin',
    role: 'Administrador',
    phone: '+56 9 9123 4567',
    rut: '14.567.890-2',
    active: true,
    createdAt: '2024-01-15'
  },
  {
    id: 'USR002',
    name: 'Valeria Muñoz',
    email: 'recepcion@sanmarcos.cl',
    password: 'recep',
    role: 'Recepcionista',
    phone: '+56 9 8456 7890',
    rut: '17.345.678-K',
    active: true,
    createdAt: '2024-02-01'
  },
  {
    id: 'USR003',
    name: 'Carlos González',
    email: 'cliente@gmail.com',
    password: '123',
    role: 'Dueño de mascota',
    phone: '+56 9 7654 3210',
    rut: '18.987.654-3',
    active: true,
    address: 'Av. Millán 450, Depto 302',
    region: 'Región del Libertador Bernardo O\'Higgins',
    city: 'Rancagua',
    createdAt: '2024-03-10'
  }
];

export const initialPets = [
  {
    id: 'PET001',
    ownerId: 'USR003',
    ownerName: 'Carlos González',
    name: 'Max',
    species: 'Perro',
    breed: 'Golden Retriever',
    age: '3 años',
    weight: '28 kg',
    gender: 'Macho',
    chipNumber: '981098102384756',
    medicalHistory: [
      {
        date: '2024-09-12',
        vet: 'Dra. Carolina Morales',
        reason: 'Control anual y Vacuna Sextuple',
        diagnosis: 'Paciente en excelente condición nutricional.',
        treatment: 'Vacuna sextuple aplicada (VA002). Próxima antirrábica en 30 días.'
      },
      {
        date: '2024-05-18',
        vet: 'Dr. Roberto Soto',
        reason: 'Otitis externa leve',
        diagnosis: 'Dermatitis e inflamación de conducto auditivo derecho.',
        treatment: 'Limpieza ótica con clorhexidina + Gotas óticas antibióticas por 7 días.'
      }
    ],
    vaccines: [
      { name: 'Vacuna antirrábica canina', date: '2024-04-10', nextDue: '2025-04-10', status: 'Al día' },
      { name: 'Vacuna sextuple canina', date: '2024-09-12', nextDue: '2025-09-12', status: 'Al día' },
      { name: 'Vacuna Bordetella canina', date: '2023-11-05', nextDue: '2024-11-05', status: 'Por vencer' }
    ]
  },
  {
    id: 'PET002',
    ownerId: 'USR003',
    ownerName: 'Carlos González',
    name: 'Luna',
    species: 'Gato',
    breed: 'Siamés',
    age: '2 años',
    weight: '3.8 kg',
    gender: 'Hembra',
    chipNumber: '981098105554321',
    medicalHistory: [
      {
        date: '2024-08-20',
        vet: 'Dra. Carolina Morales',
        reason: 'Esterilización programada',
        diagnosis: 'Ovariohisterectomía sin complicaciones.',
        treatment: 'Reposo relativo 7 días, Meloxicam 1mg (ME009) por 3 días.'
      }
    ],
    vaccines: [
      { name: 'Vacuna triple felina', date: '2024-08-01', nextDue: '2025-08-01', status: 'Al día' },
      { name: 'Vacuna antirrábica felina', date: '2023-10-15', nextDue: '2024-10-15', status: 'Vencida' }
    ]
  }
];

export const initialAppointments = [
  {
    id: 'APT001',
    ownerId: 'USR003',
    ownerName: 'Carlos González',
    petName: 'Max',
    species: 'Perro',
    serviceCode: 'VA005',
    serviceName: 'Vacuna Bordetella canina',
    date: '2026-10-25',
    time: '11:00',
    notes: 'Refuerzo antes de viaje a la playa.',
    status: 'Confirmada',
    createdAt: '2026-10-20'
  },
  {
    id: 'APT002',
    ownerId: 'USR003',
    ownerName: 'Carlos González',
    petName: 'Luna',
    species: 'Gato',
    serviceCode: 'VA006',
    serviceName: 'Vacuna antirrábica felina',
    date: '2026-10-28',
    time: '16:30',
    notes: 'Vacuna vencida, requiere actualización urgente.',
    status: 'Pendiente',
    createdAt: '2026-10-20'
  },
  {
    id: 'APT003',
    ownerId: 'USR999',
    ownerName: 'María Ignacia Rojas',
    petName: 'Bobby',
    species: 'Perro',
    serviceCode: 'OT002',
    serviceName: 'Limpieza dental',
    date: '2026-10-22',
    time: '09:00',
    notes: 'Tiene sarro acumulado en molares superiores.',
    status: 'Confirmada',
    createdAt: '2026-10-19'
  }
];

export const initialOrders = [
  {
    id: 'ORD20240705',
    userId: 'USR003',
    customer: {
      firstName: 'Pedro',
      lastName: 'Hacker',
      email: 'pedro.hacker20@example.com',
      street: 'Los Crisantemos, Edificio Norte',
      apt: 'Depto 603',
      region: 'Región Metropolitana de Santiago',
      comuna: 'Cerrillos',
      notes: 'El martes no estaremos en el depto, pero puede dejárselo con el conserje.'
    },
    items: [
      { code: 'ME004', name: 'Nexgard Masticable', price: 9500, quantity: 1, subtotal: 9500 },
      { code: 'ME001', name: 'Amoxibay 250mg', price: 4200, quantity: 1, subtotal: 4200 },
      { code: 'ME021', name: 'Omega Vet 3-6-9', price: 8900, quantity: 1, subtotal: 8900 }
    ],
    total: 22600,
    status: 'Aprobado',
    paymentMethod: 'Webpay Plus / Débito',
    createdAt: '2026-10-18T15:30:00'
  }
];

export const clinicInfo = {
  name: 'Veterinaria San Marcos',
  founded: '2009',
  address: 'Av. Libertador Bernardo O\'Higgins 450, Rancagua',
  city: 'Rancagua',
  region: 'Región del Libertador General Bernardo O\'Higgins',
  lat: -34.1708,
  lng: -70.7444,
  phone: '+56 72 223 4567',
  whatsapp: '+56 9 8765 4321',
  email: 'contacto@veterinariasanmarcos.cl',
  hours: 'Lunes a Viernes: 08:30 a 19:30 | Sábados: 09:00 a 14:00 (Urgencias 24/7)'
};

export const initialBlogPosts = [
  {
    id: 'blog-1',
    slug: 'calendario-vacunacion-perros-gatos',
    title: 'Calendario de Vacunación: ¿Por qué es vital respetar las fechas?',
    author: 'Dra. Carolina Morales',
    date: '14 Octubre 2026',
    category: 'Vacunación',
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&auto=format&fit=crop&q=60',
    summary: 'Aprende las diferencias entre vacunas obligatorias como la antirrábica y las polivalentes esenciales para cachorros y adultos.',
    content: `
      La vacunación es el pilar de la medicina veterinaria preventiva. En Chile, la Ley de Tenencia Responsable establece la obligatoriedad de la vacuna antirrábica para perros y gatos a partir de los 2 meses de vida, con revacunación anual.

      ### En perros:
      - **A las 6-8 semanas**: Primera dosis Puppy DP (Distemper y Parvovirus).
      - **A las 10-12 semanas**: Vacuna Sextuple (refuerza inmunidad general).
      - **A las 16 semanas**: Vacuna Antirrábica obligatoria + Refuerzo Sextuple.
      - **Anual**: Refuerzo de Sextuple, Antirrábica y Bordetella (tos de las perreras).

      ### En gatos:
      - **A los 2 meses**: Vacuna Triple Felina (Rinotraqueítis, Calicivirus y Panleucopenia).
      - **A los 3 meses**: Refuerzo Triple Felina + Leucemia si sale al exterior.
      - **A los 4 meses**: Vacuna Antirrábica.
      
      Recuerda que una mascota sin vacunas al día está expuesta a patógenos letales presentes en plazas y veredas.
    `
  },
  {
    id: 'blog-2',
    slug: 'cuidados-postoperatorios-esterilizacion',
    title: 'Guía de Cuidados Postoperatorios tras una Esterilización',
    author: 'Dr. Roberto Soto',
    date: '02 Octubre 2026',
    category: 'Cirugía',
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&auto=format&fit=crop&q=60',
    summary: 'Pasos clave para que tu mascota se recupere rápida y confortablemente en casa tras la cirugía.',
    content: `
      La esterilización es uno de los procedimientos quirúrgicos más seguros y recomendados. Sin embargo, los primeros 5 a 7 días posteriores requieren atención de la familia tutora.

      ### Recomendaciones indispensables:
      1. **Uso de Body Quirúrgico o Collar Isabelino**: Es fundamental impedir que el paciente lama o muerda las suturas.
      2. **Reposo relativo**: Evitar saltos a camas o sillones y paseos extensos durante 7 días.
      3. **Cumplir analgesia**: Administrar estrictamente los medicamentos indicados por el médico (como Meloxicam o Tramadol). Nunca dar paracetamol o ibuprofeno a una mascota, ¡son tóxicos!
      4. **Control a los 7 días**: Asistir a la revisión médica en Veterinaria San Marcos para evaluar la cicatrización.
    `
  }
];
