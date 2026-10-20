import React from 'react';
import { Link } from 'react-router-dom';
import { initialBlogPosts } from '../data/mockData';

export default function Blog() {
  return (
    <div className="container py-5">
      <div className="text-center max-w-2xl mx-auto mb-5">
        <span className="badge badge-category mb-2">Comunidad y Cuidados</span>
        <h1 className="fw-bold text-dark">Blog de Bienestar Animal</h1>
        <p className="text-muted">
          Artículos redactados por el equipo médico de Veterinaria San Marcos para promover la tenencia responsable
          y la prevención de enfermedades en perros y gatos.
        </p>
      </div>

      <div className="row g-4">
        {initialBlogPosts.map(post => (
          <div key={post.id} className="col-12 col-md-6">
            <div className="card h-100 card-hover border-0 shadow-sm overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="card-img-top object-fit-cover"
                style={{ height: '240px' }}
              />
              <div className="card-body p-4 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge badge-category">{post.category}</span>
                  <small className="text-muted">{post.date}</small>
                </div>
                <h4 className="fw-bold text-dark mb-2">{post.title}</h4>
                <p className="text-muted small mb-4 flex-grow-1">{post.summary}</p>
                <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                  <span className="small text-muted">
                    <i className="bi bi-person me-1"></i>{post.author}
                  </span>
                  <Link to={`/blog/${post.slug}`} className="btn btn-outline-primary btn-sm">
                    Leer artículo completo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
