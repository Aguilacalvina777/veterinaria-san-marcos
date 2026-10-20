import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { clinicInfo } from '../data/mockData';

export default function ClinicMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const userMarkerRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [distanceKm, setDistanceKm] = useState(null);
  const [geoError, setGeoError] = useState(null);
  const [loadingGeo, setLoadingGeo] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Fix default marker icon assets in Leaflet when bundled
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView([clinicInfo.lat, clinicInfo.lng], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contribuyentes'
      }).addTo(map);

      // Clinic custom marker
      const clinicIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div style="background-color: #0d9488; color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.3); border: 2px solid white; font-size: 18px;">
            🐾
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      const marker = L.marker([clinicInfo.lat, clinicInfo.lng], { icon: clinicIcon }).addTo(map);
      marker.bindPopup(`
        <div style="font-family: system-ui; max-width: 220px;">
          <h6 style="color: #0d9488; font-weight: bold; margin-bottom: 4px;">🐾 ${clinicInfo.name}</h6>
          <p style="font-size: 12px; margin-bottom: 4px;">${clinicInfo.address}</p>
          <p style="font-size: 11px; color: #64748b; margin-bottom: 4px;"><strong>Horario:</strong> ${clinicInfo.hours}</p>
          <a href="tel:${clinicInfo.phone}" style="font-size: 12px; color: #0d9488; font-weight: 600;">📞 ${clinicInfo.phone}</a>
        </div>
      `).openPopup();

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Calculate distance between two lat/lng coordinates (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  const handleGetDirections = () => {
    setLoadingGeo(true);
    setGeoError(null);

    if (!navigator.geolocation) {
      setGeoError('Tu navegador no soporta geolocalización.');
      setLoadingGeo(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLoadingGeo(false);
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        const dist = calculateDistance(latitude, longitude, clinicInfo.lat, clinicInfo.lng);
        setDistanceKm(dist);

        if (mapInstanceRef.current) {
          // Add or move user marker
          if (userMarkerRef.current) {
            userMarkerRef.current.setLatLng([latitude, longitude]);
          } else {
            const userIcon = L.divIcon({
              className: 'user-loc-icon',
              html: `
                <div style="background-color: #3b82f6; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.3); border: 2px solid white; font-size: 14px;">
                  📍
                </div>
              `,
              iconSize: [30, 30],
              iconAnchor: [15, 15]
            });

            userMarkerRef.current = L.marker([latitude, longitude], { icon: userIcon })
              .addTo(mapInstanceRef.current)
              .bindPopup('<b>Tu ubicación actual</b>')
              .openPopup();
          }

          // Fit bounds to show both user and clinic
          const bounds = L.latLngBounds([
            [clinicInfo.lat, clinicInfo.lng],
            [latitude, longitude]
          ]);
          mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });

          // Draw polyline connecting them
          L.polyline([
            [latitude, longitude],
            [clinicInfo.lat, clinicInfo.lng]
          ], { color: '#0d9488', dashArray: '5, 10', weight: 4 }).addTo(mapInstanceRef.current);
        }
      },
      (error) => {
        setLoadingGeo(false);
        setGeoError('No se pudo obtener tu ubicación actual. Permiso denegado o señal débil.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${clinicInfo.lat},${clinicInfo.lng}`;

  return (
    <div className="card shadow-sm border-0 overflow-hidden">
      <div className="card-header bg-white py-3 d-flex flex-wrap justify-content-between align-items-center gap-2">
        <div>
          <h5 className="mb-0 fw-bold text-dark">
            <i className="bi bi-geo-alt-fill text-danger me-2"></i>
            Ubicación de la Clínica
          </h5>
          <small className="text-muted">{clinicInfo.address}</small>
        </div>
        <div className="d-flex gap-2">
          <button
            onClick={handleGetDirections}
            disabled={loadingGeo}
            className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
          >
            {loadingGeo ? (
              <span className="spinner-border spinner-border-sm" role="status"></span>
            ) : (
              <i className="bi bi-compass"></i>
            )}
            <span>Indicaciones desde mi ubicación</span>
          </button>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary btn-sm d-flex align-items-center gap-1"
          >
            <i className="bi bi-box-arrow-up-right"></i>
            <span>Google Maps</span>
          </a>
        </div>
      </div>

      {geoError && (
        <div className="alert alert-warning m-3 py-2 small mb-0">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {geoError}
        </div>
      )}

      {distanceKm && (
        <div className="alert alert-success m-3 py-2 small mb-0">
          <i className="bi bi-check-circle-fill me-2"></i>
          Estás aproximadamente a <strong>{distanceKm} km</strong> de Veterinaria San Marcos en Rancagua.
        </div>
      )}

      <div
        ref={mapContainerRef}
        style={{ height: '380px', width: '100%', zIndex: 1 }}
        data-testid="interactive-map"
      ></div>
    </div>
  );
}
