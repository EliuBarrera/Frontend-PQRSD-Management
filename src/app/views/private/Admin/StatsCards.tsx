import React from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: string;
  iconColor: string;
  trend?: {
    value: string;
    type: 'success' | 'danger' | 'info' | 'warning';
    text: string;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, iconColor, trend }) => {
  const getTrendIcon = (type: string) => {
    switch (type) {
      case 'success': return 'fas fa-arrow-up';
      case 'danger': return 'fas fa-exclamation-circle';
      case 'info': return 'fas fa-info-circle';
      case 'warning': return 'fas fa-exclamation-triangle';
      default: return 'fas fa-arrow-up';
    }
  };

  return (
    <div className="col-xl-3 col-md-6 mb-3">
      <div className="card stats-card h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div>
              <h6 className="card-subtitle mb-1 text-muted">{title}</h6>
              <h3 className="fw-bold mb-0">{value}</h3>
            </div>
            <div className="align-self-center">
              <i className={`${icon} fa-2x ${iconColor}`}></i>
            </div>
          </div>
          {trend && (
            <p className="card-text small mt-2">
              <span className={`text-${trend.type}`}>
                <i className={getTrendIcon(trend.type)}></i> {trend.value}
              </span> {trend.text}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

interface StatsCardsProps {
  totalPqrsd: number;
  pendientes: number;
  reclasificaciones: number;
  extemporaneas: number;
  vencenHoy?: number;
  reclasificacionesPendientes?: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({
  totalPqrsd,
  pendientes,
  reclasificaciones,
  extemporaneas,
  vencenHoy = 0,
  reclasificacionesPendientes = 0
}) => {
  return (
    <div className="row mb-4">
      <StatCard
        title="Total PQRSD"
        value={totalPqrsd}
        icon="fas fa-file-alt"
        iconColor="text-gray"
        trend={{
          value: "18%",
          type: "success",
          text: "desde el mes pasado"
        }}
      />
      
      <StatCard
        title="Pendientes"
        value={pendientes}
        icon="fas fa-clock"
        iconColor="text-warning"
        trend={{
          value: `${vencenHoy} vencen hoy`,
          type: "danger",
          text: ""
        }}
      />
      
      <StatCard
        title="Reclasificaciones"
        value={reclasificaciones}
        icon="fas fa-exchange-alt"
        iconColor="text-info"
        trend={{
          value: `${reclasificacionesPendientes} pendientes`,
          type: "info",
          text: "de revisión"
        }}
      />
      
      <StatCard
        title="Extemporáneas"
        value={extemporaneas}
        icon="fas fa-exclamation-triangle"
        iconColor="text-danger"
        trend={{
          value: "8%",
          type: "danger",
          text: "desde el mes pasado"
        }}
      />
    </div>
  );
};

export default StatsCards;