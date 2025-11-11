import React, { useState } from 'react';

export interface PqrsdFilters {
  numeroRadicado: string;
  tipoPqrsd: string;
  estado: string;
  dependencia: string;
  fechaDesde: string;
  fechaHasta: string;
}

interface PqrsdFiltersProps {
  filters: PqrsdFilters;
  onFiltersChange: (filters: PqrsdFilters) => void;
  onSearch: () => void;
  onClear: () => void;
}

const PqrsdFiltersComponent: React.FC<PqrsdFiltersProps> = ({
  filters,
  onFiltersChange,
  onSearch,
  onClear
}) => {
  const handleInputChange = (field: keyof PqrsdFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [field]: value
    });
  };

  const tiposPqrsd = [
    { value: '', label: 'Todos' },
    { value: 'peticion', label: 'Petición' },
    { value: 'queja', label: 'Queja' },
    { value: 'reclamo', label: 'Reclamo' },
    { value: 'solicitud', label: 'Solicitud' },
    { value: 'denuncia', label: 'Denuncia' }
  ];

  const estados = [
    { value: '', label: 'Todos' },
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'proceso', label: 'En proceso' },
    { value: 'resuelta', label: 'Resuelta' },
    { value: 'vencida', label: 'Vencida' }
  ];

  const dependencias = [
    { value: '', label: 'Todas' },
    { value: 'gobierno', label: 'Secretaría de Gobierno' },
    { value: 'obras', label: 'Secretaría de Obras Públicas' },
    { value: 'planeacion', label: 'Secretaría de Planeación' },
    { value: 'hacienda', label: 'Secretaría de Hacienda' },
    { value: 'cultura', label: 'Secretaría de Cultura' },
    { value: 'alcaldia', label: 'Despacho del Alcalde' }
  ];

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0">Filtros de Búsqueda</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-3 mb-3">
            <label className="form-label">Número de radicado</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ej: PQ-0842"
              value={filters.numeroRadicado}
              onChange={(e) => handleInputChange('numeroRadicado', e.target.value)}
            />
          </div>
          
          <div className="col-md-3 mb-3">
            <label className="form-label">Tipo de PQRSD</label>
            <select
              className="form-select"
              value={filters.tipoPqrsd}
              onChange={(e) => handleInputChange('tipoPqrsd', e.target.value)}
            >
              {tiposPqrsd.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="col-md-3 mb-3">
            <label className="form-label">Estado</label>
            <select
              className="form-select"
              value={filters.estado}
              onChange={(e) => handleInputChange('estado', e.target.value)}
            >
              {estados.map((estado) => (
                <option key={estado.value} value={estado.value}>
                  {estado.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="col-md-3 mb-3">
            <label className="form-label">Dependencia</label>
            <select
              className="form-select"
              value={filters.dependencia}
              onChange={(e) => handleInputChange('dependencia', e.target.value)}
            >
              {dependencias.map((dep) => (
                <option key={dep.value} value={dep.value}>
                  {dep.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Fecha desde</label>
            <input
              type="date"
              className="form-control"
              value={filters.fechaDesde}
              onChange={(e) => handleInputChange('fechaDesde', e.target.value)}
            />
          </div>
          
          <div className="col-md-6 mb-3">
            <label className="form-label">Fecha hasta</label>
            <input
              type="date"
              className="form-control"
              value={filters.fechaHasta}
              onChange={(e) => handleInputChange('fechaHasta', e.target.value)}
            />
          </div>
        </div>
        
        <div className="d-flex justify-content-end">
          <button 
            className="btn btn-outline-secondary me-2"
            onClick={onClear}
          >
            <i className="fas fa-times me-1"></i> Limpiar
          </button>
          <button 
            className="btn btn-primary"
            onClick={onSearch}
          >
            <i className="fas fa-search me-1"></i> Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PqrsdFiltersComponent;