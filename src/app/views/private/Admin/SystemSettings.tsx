import React, { useState } from 'react';

export interface SystemSettings {
  plazos: {
    peticionGeneral: number;
    peticionDocumentos: number;
    consulta: number;
    peticionAutoridades: number;
    quejasReclamos: number;
    denuncias: number;
    informeConcejales: number;
  };
  alertas: {
    diasAntes: number;
    habilitarNotificaciones: boolean;
    habilitarAlertas: boolean;
    correoNotificaciones: string;
  };
  limites: {
    pqrsdPorFuncionario: number;
  };
}

interface SystemSettingsProps {
  settings: SystemSettings;
  onSave: (settings: SystemSettings) => void;
  onReset: () => void;
  loading?: boolean;
}

const SystemSettingsComponent: React.FC<SystemSettingsProps> = ({
  settings,
  onSave,
  onReset,
  loading = false
}) => {
  const [formData, setFormData] = useState<SystemSettings>(settings);
  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (section: keyof SystemSettings, field: string, value: string | number | boolean) => {
    const newData = {
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value
      }
    };
    setFormData(newData);
    setHasChanges(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setHasChanges(false);
  };

  const handleReset = () => {
    onReset();
    setFormData(settings);
    setHasChanges(false);
  };

  return (
    <div>
      <h2 className="h3 mb-4">Configuración del Sistema</h2>
      
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Parámetros de Configuración</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            
            {/* Sección de Plazos */}
            <div className="row mb-4">
              <div className="col-12">
                <h6 className="fw-bold text-primary mb-3">
                  <i className="fas fa-calendar-alt me-2"></i>
                  Plazos de Respuesta (días hábiles)
                </h6>
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Petición de interés general
                  <small className="text-muted d-block">Ley 1755 de 2015 - Art. 13</small>
                </label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max="30"
                  value={formData.plazos.peticionGeneral}
                  onChange={(e) => handleInputChange('plazos', 'peticionGeneral', Number(e.target.value))}
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Petición de documentos/información
                  <small className="text-muted d-block">Ley 1755 de 2015 - Art. 14</small>
                </label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max="30"
                  value={formData.plazos.peticionDocumentos}
                  onChange={(e) => handleInputChange('plazos', 'peticionDocumentos', Number(e.target.value))}
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Consulta (concepto o criterio)
                  <small className="text-muted d-block">Ley 1755 de 2015</small>
                </label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max="60"
                  value={formData.plazos.consulta}
                  onChange={(e) => handleInputChange('plazos', 'consulta', Number(e.target.value))}
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Peticiones entre autoridades
                  <small className="text-muted d-block">Ley 1755 de 2015 - Art. 30</small>
                </label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max="30"
                  value={formData.plazos.peticionAutoridades}
                  onChange={(e) => handleInputChange('plazos', 'peticionAutoridades', Number(e.target.value))}
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Quejas, reclamos y sugerencias
                  <small className="text-muted d-block">Ley 1755 de 2015 - Art. 13</small>
                </label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max="30"
                  value={formData.plazos.quejasReclamos}
                  onChange={(e) => handleInputChange('plazos', 'quejasReclamos', Number(e.target.value))}
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Denuncias por corrupción
                  <small className="text-muted d-block">Ley 1755 de 2015</small>
                </label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max="30"
                  value={formData.plazos.denuncias}
                  onChange={(e) => handleInputChange('plazos', 'denuncias', Number(e.target.value))}
                />
              </div>
            </div>

            <hr />

            {/* Sección de Alertas */}
            <div className="row mb-4">
              <div className="col-12">
                <h6 className="fw-bold text-warning mb-3">
                  <i className="fas fa-bell me-2"></i>
                  Configuración de Alertas
                </h6>
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Alertas antes del vencimiento (días)</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max="10"
                  value={formData.alertas.diasAntes}
                  onChange={(e) => handleInputChange('alertas', 'diasAntes', Number(e.target.value))}
                />
                <div className="form-text">
                  Se enviarán alertas cuando falten estos días para el vencimiento
                </div>
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Correo para notificaciones</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.alertas.correoNotificaciones}
                  onChange={(e) => handleInputChange('alertas', 'correoNotificaciones', e.target.value)}
                />
              </div>
              
              <div className="col-12">
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="notificationsEnabled"
                    checked={formData.alertas.habilitarNotificaciones}
                    onChange={(e) => handleInputChange('alertas', 'habilitarNotificaciones', e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="notificationsEnabled">
                    Habilitar notificaciones por correo electrónico
                  </label>
                </div>
                
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="alertsEnabled"
                    checked={formData.alertas.habilitarAlertas}
                    onChange={(e) => handleInputChange('alertas', 'habilitarAlertas', e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="alertsEnabled">
                    Habilitar alertas de vencimiento en el sistema
                  </label>
                </div>
              </div>
            </div>

            <hr />

            {/* Sección de Límites */}
            <div className="row mb-4">
              <div className="col-12">
                <h6 className="fw-bold text-info mb-3">
                  <i className="fas fa-users me-2"></i>
                  Límites de Trabajo
                </h6>
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Límite de PQRSD por funcionario</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max="200"
                  value={formData.limites.pqrsdPorFuncionario}
                  onChange={(e) => handleInputChange('limites', 'pqrsdPorFuncionario', Number(e.target.value))}
                />
                <div className="form-text">
                  Número máximo de PQRSD que puede tener asignado un funcionario
                </div>
              </div>
            </div>

            {/* Estado de cambios */}
            {hasChanges && (
              <div className="alert alert-info">
                <i className="fas fa-info-circle me-2"></i>
                Tienes cambios sin guardar en la configuración
              </div>
            )}
            
            {/* Botones de acción */}
            <div className="d-flex justify-content-end">
              <button 
                type="button" 
                className="btn btn-outline-secondary me-2"
                onClick={handleReset}
                disabled={loading}
              >
                <i className="fas fa-undo me-1"></i>
                Restablecer
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading || !hasChanges}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Guardando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save me-1"></i>
                    Guardar Configuración
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SystemSettingsComponent;