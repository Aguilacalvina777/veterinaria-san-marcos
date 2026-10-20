import React from 'react';
import ClinicMap from '../components/ClinicMap';
import { clinicInfo } from '../data/mockData';

export default function About() {
  const team = [
    {
      name: 'Dra. Carolina Morales',
      role: 'Médico Veterinaria Directora',
      specialty: 'Medicina Interna y Cirugía de Tejidos Blandos',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=60'
    },
    {
      name: 'Dr. Roberto Soto',
      role: 'Médico Veterinario Cirujano',
      specialty: 'Traumatología y Anestesiología',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=60'
    },
    {
      name: 'Dra. Camila Fuentes',
      role: 'Médico Veterinaria',
      specialty: 'Dermatología y Animales Exóticos Menores',
      image: 'https://images.unsplash.com/photo-1594824813589-b4f0b2f5d72d?w=400&auto=format&fit=crop&q=60'
    },
    {
      name: 'Diego Araya',
      role: 'Técnico Veterinario',
      specialty: 'Apoyo Quirúrgico y Manejo Hospitalario',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=60'
    },
    {
      name: 'Valeria Muñoz',
      role: 'Recepcionista Administrativa',
      specialty: 'Atención al Cliente y Coordinación de Citas',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60'
    }
  ];

  return (
    <div className="container py-5">
      {/* Clinic Story */}
      <div className="row align-items-center g-5 mb-5">
        <div className="col-lg-6">
          <span className="badge badge-category mb-2">Nuestra Historia</span>
          <h1 className="fw-bold text-dark display-5 mb-4">
            Veterinaria San Marcos: Compromiso y Vocación desde 2009
          </h1>
          <p className="text-muted lead">
            Nacimos en la ciudad de Rancagua con la misión de brindar atención médica compasiva,
            tecnológica y accesible para perros, gatos, aves y conejos.
          </p>
          <p className="text-muted">
            A lo largo de más de 15 años de trayectoria ininterrumpida, hemos atendido a más de 25.000 pacientes,
            modernizando continuamente nuestras instalaciones quirúrgicas, laboratorio de exámenes y sistema de ficha clínica digital
            para que nunca pierdas el historial médico de tu mascota.
          </p>
          <div className="d-flex gap-4 pt-2">
            <div>
              <h3 className="fw-bold text-teal mb-0" style={{ color: '#0d9488' }}>+25</h3>
              <small className="text-muted">Atenciones diarias promedio</small>
            </div>
            <div>
              <h3 className="fw-bold text-teal mb-0" style={{ color: '#0d9488' }}>100%</h3>
              <small className="text-muted">Trazabilidad y registro</small>
            </div>
            <div>
              <h3 className="fw-bold text-teal mb-0" style={{ color: '#0d9488' }}>24/7</h3>
              <small className="text-muted">Urgencias veterinarias</small>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <img
            src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&auto=format&fit=crop&q=60"
            alt="Clínica Veterinaria San Marcos"
            className="img-fluid rounded-4 shadow"
          />
        </div>
      </div>

      {/* Team */}
      <div className="mb-5 py-4">
        <div className="text-center mb-5 max-w-xl mx-auto">
          <span className="badge badge-category mb-2">Profesionales de la Salud</span>
          <h2 className="fw-bold text-dark">Nuestro Equipo Médico y Humano</h2>
          <p className="text-muted small">
            Contamos con médicos veterinarios acreditados, técnicos altamente capacitados y una recepción cálida orientada a tu tranquilidad.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {team.map((member, idx) => (
            <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg">
              <div className="card h-100 border-0 shadow-sm text-center p-3">
                <div className="ratio ratio-1x1 rounded-circle overflow-hidden mx-auto mb-3" style={{ width: '110px' }}>
                  <img src={member.image} alt={member.name} className="object-fit-cover w-100 h-100" />
                </div>
                <h6 className="fw-bold text-dark mb-1">{member.name}</h6>
                <div className="text-teal small fw-semibold mb-1" style={{ color: '#0d9488' }}>{member.role}</div>
                <p className="text-muted small mb-0" style={{ fontSize: '0.78rem' }}>{member.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <div className="mb-5">
        <ClinicMap />
      </div>
    </div>
  );
}
