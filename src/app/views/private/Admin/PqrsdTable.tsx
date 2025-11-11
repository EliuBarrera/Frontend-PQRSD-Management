import React from 'react';

export interface PqrsdItem {
  id: number;
  numeroRadicado: string;
  tipo: 'peticion' | 'queja' | 'reclamo' | 'solicitud' | 'denuncia';
  peticionario: string;
  asunto: string;
  fecha: string;
  estado: 'pendiente' | 'proceso' | 'resuelta' | 'vencida';
  dependencia?: string;
  funcionarioAsignado?: string;
}

interface PqrsdTableProps {
  items: PqrsdItem[];
  totalItems: number;
  loading?: boolean;
  onViewDetails: (id: number) => void;
  onAssign?: (id: number) => void;
  onReassign?: (id: number) => void;
}

const PqrsdTable: React.FC<PqrsdTableProps> = ({
  items,
  totalItems,
  loading = false,
  onViewDetails,
  onAssign,
  onReassign
}) => {
  const getBadgeClass = (tipo: string) => {
    const classes = {
      peticion: 'bg-info',
      queja: 'bg-warning text-dark',
      reclamo: 'bg-danger',
      solicitud: 'bg-success',
      denuncia: 'bg-dark'
    };
    return classes[tipo as keyof typeof classes] || 'bg-secondary';
  };

  const getStatusBadgeClass = (estado: string) => {
    const classes = {
      pendiente: 'bg-warning text-dark',
      proceso: 'bg-info',
      resuelta: 'bg-success',
      vencida: 'bg-danger'
    };
    return classes[estado as keyof typeof classes] || 'bg-secondary';
  };

  const getStatusText = (estado: string) => {
    const texts = {
      pendiente: 'Pendiente',
      proceso: 'En proceso',
      resuelta: 'Resuelta',
      vencida: 'Vencida'
    };
    return texts[estado as keyof typeof texts] || estado;
  };

  const getTipoText = (tipo: string) => {
    const texts = {
      peticion: 'Petición',
      queja: 'Queja',
      reclamo: 'Reclamo',
      solicitud: 'Solicitud',
      denuncia: 'Denuncia'
    };
    return texts[tipo as keyof typeof texts] || tipo;
  };

  if (loading) {
    return (
      <div className="card">
        <div className="card-body text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando PQRSD...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Resultados de Búsqueda</h5>
        <span className="badge bg-light text-dark">{totalItems} resultados</span>
      </div>
      <div className="card-body">
        {items.length === 0 ? (
          <div className="text-center py-4">
            <i className="fas fa-search fa-3x text-muted mb-3"></i>
            <h5 className="text-muted">No se encontraron resultados</h5>
            <p className="text-muted">Intenta ajustar los filtros de búsqueda</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th># Radicado</th>
                  <th>Tipo</th>
                  <th>Peticionario</th>
                  <th>Asunto</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.numeroRadicado}</strong>
                    </td>
                    <td>
                      <span className={`badge ${getBadgeClass(item.tipo)}`}>
                        {getTipoText(item.tipo)}
                      </span>
                    </td>
                    <td>{item.peticionario}</td>
                    <td>
                      <span title={item.asunto}>
                        {item.asunto.length > 50 
                          ? `${item.asunto.substring(0, 50)}...` 
                          : item.asunto}
                      </span>
                    </td>
                    <td>{item.fecha}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(item.estado)}`}>
                        {getStatusText(item.estado)}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => onViewDetails(item.id)}
                          title="Ver detalles"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        
                        {item.estado === 'pendiente' && onAssign && (
                          <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() => onAssign(item.id)}
                            title="Asignar"
                          >
                            <i className="fas fa-user-plus"></i>
                          </button>
                        )}
                        
                        {item.estado !== 'resuelta' && onReassign && (
                          <button
                            className="btn btn-sm btn-outline-warning"
                            onClick={() => onReassign(item.id)}
                            title="Reasignar"
                          >
                            <i className="fas fa-exchange-alt"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {items.length > 0 && (
          <nav className="mt-3">
            <ul className="pagination justify-content-end">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">1</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">2</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">3</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default PqrsdTable;