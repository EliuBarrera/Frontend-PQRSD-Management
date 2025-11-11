import React from 'react';

interface Alert {
  id: number;
  type: 'danger' | 'warning' | 'info';
  title: string;
  message: string;
  count?: number;
  actionText: string;
  onAction: () => void;
}

interface Reclassification {
  id: number;
  numeroRadicado: string;
  dependenciaOrigen: string;
  dependenciaDestino: string;
  motivo: string;
  fechaSolicitud: string;
  solicitadoPor: string;
}

interface AlertsAndReclassificationsProps {
  alerts: Alert[];
  reclassifications: Reclassification[];
  onApproveReclassification: (id: number) => void;
  onRejectReclassification: (id: number) => void;
}

const AlertsAndReclassifications: React.FC<AlertsAndReclassificationsProps> = ({
  alerts,
  reclassifications,
  onApproveReclassification,
  onRejectReclassification
}) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'danger': return 'fas fa-exclamation-circle';
      case 'warning': return 'fas fa-clock';
      case 'info': return 'fas fa-info-circle';
      default: return 'fas fa-bell';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <h2 className="h3 mb-4">Alertas y Reclasificaciones</h2>
      
      {/* Panel de Alertas */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Alertas de Vencimiento</h5>
        </div>
        <div className="card-body">
          {alerts.length === 0 ? (
            <div className="text-center py-3">
              <i className="fas fa-check-circle fa-2x text-success mb-2"></i>
              <p className="text-muted mb-0">No hay alertas activas</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div key={alert.id} className={`alert alert-${alert.type}`}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <i className={`${getAlertIcon(alert.type)} me-2`}></i>
                    <strong>{alert.title}</strong>
                    {alert.count && ` (${alert.count})`} - {alert.message}
                  </div>
                  <button
                    className={`btn btn-sm btn-outline-${alert.type}`}
                    onClick={alert.onAction}
                  >
                    {alert.actionText}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Panel de Reclasificaciones */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Solicitudes de Reclasificación</h5>
          <span className="badge bg-warning">
            {reclassifications.length} pendientes
          </span>
        </div>
        <div className="card-body">
          {reclassifications.length === 0 ? (
            <div className="text-center py-4">
              <i className="fas fa-exchange-alt fa-3x text-muted mb-3"></i>
              <h5 className="text-muted">No hay reclasificaciones pendientes</h5>
              <p className="text-muted">Todas las solicitudes han sido procesadas</p>
            </div>
          ) : (
            reclassifications.map((item) => (
              <div key={item.id} className="mb-3 p-3 bg-light rounded">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="flex-grow-1">
                    <h6 className="mb-2">
                      {item.numeroRadicado} - Solicitud de reclasificación
                    </h6>
                    
                    <div className="row mb-2">
                      <div className="col-md-6">
                        <p className="mb-1">
                          <strong>De:</strong> {item.dependenciaOrigen}
                        </p>
                        <p className="mb-1">
                          <strong>Para:</strong> {item.dependenciaDestino}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p className="mb-1">
                          <strong>Solicitado por:</strong> {item.solicitadoPor}
                        </p>
                        <small className="text-muted">
                          {formatDate(item.fechaSolicitud)}
                        </small>
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <strong>Motivo:</strong>
                      <p className="mb-0 mt-1">{item.motivo}</p>
                    </div>
                  </div>
                  
                  <div className="ms-3">
                    <div className="d-flex flex-column gap-2">
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => onApproveReclassification(item.id)}
                        title="Aprobar reclasificación"
                      >
                        <i className="fas fa-check me-1"></i>
                        Aprobar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => onRejectReclassification(item.id)}
                        title="Rechazar reclasificación"
                      >
                        <i className="fas fa-times me-1"></i>
                        Rechazar
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Progress indicator */}
                <div className="mt-3">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <div className="progress" style={{height: '4px'}}>
                        <div 
                          className="progress-bar bg-warning" 
                          role="progressbar" 
                          style={{width: '50%'}}
                        ></div>
                      </div>
                    </div>
                    <small className="ms-2 text-muted">Pendiente de revisión</small>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertsAndReclassifications;