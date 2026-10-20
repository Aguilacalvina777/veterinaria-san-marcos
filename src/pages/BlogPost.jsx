import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { initialBlogPosts } from '../data/mockData';

export default function BlogPost() {
  const { slug } = useParams();
  const post = initialBlogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="container py-5 text-center">
        <h2>Artículo no encontrado</h2>
        <Link to="/blog" className="btn btn-primary mt-3">Volver al Blog</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <Link to="/blog" className="text-decoration-none text-teal small fw-bold mb-3 d-inline-block" style={{ color: '#0d9488' }}>
            &larr; Volver a todos los artículos
          </Link>

          <span className="badge badge-category d-inline-block mb-2">{post.category}</span>
          <h1 className="fw-bolder text-dark mb-3">{post.title}</h1>

          <div className="d-flex align-items-center gap-3 text-muted small mb-4 pb-3 border-bottom">
            <span><i className="bi bi-person me-1"></i>{post.author}</span>
            <span>&bull;</span>
            <span><i className="bi bi-calendar3 me-1"></i>{post.date}</span>
          </div>

          <img
            src={post.image}
            alt={post.title}
            className="img-fluid rounded-4 mb-4 w-100 shadow-sm"
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />

          <div className="article-content text-dark lh-lg">
            {post.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="mb-3">{paragraph.trim()}</p>
            ))}
          </div>

          <div className="p-4 bg-light rounded-3 mt-5 d-flex justify-content-between align-items-center">
            <div>
              <h6 className="fw-bold mb-1">¿Tienes dudas sobre la salud de tu mascota?</h6>
              <p className="small text-muted mb-0">Agenda una hora médica con nuestros especialistas en Rancagua.</p>
            </div>
            <Link to="/agendar" className="btn btn-primary btn-sm">
              Agendar Cita
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
