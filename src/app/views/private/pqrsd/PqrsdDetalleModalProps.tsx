import { Modal } from "react-bootstrap";
import { BadgeCustom } from "../../../components/shared/BadgeCustom";

interface PqrsdDetalleModalProps {
  show: boolean;
  onHide: () => void;
  pqrsd: any; // Usa tu interface PqrsdResult aquí
  formatearFecha: (fecha: string) => string;
  obtenerColorEstado: (estado: string) => string;
  obtenerColorTipo: (tipo: string) => string;
}

export const PqrsdDetalleModal: React.FC<PqrsdDetalleModalProps> = ({
  show,
  onHide,
  pqrsd,
  formatearFecha,
  obtenerColorEstado,
  obtenerColorTipo
}) => {
  if (!pqrsd) return null;

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      size="sm"
      centered
      className="pqrsd-modal"
    >
      {/* Header del Modal */}
      <div className="bg-gradient-to-r from-[#1e2b39] to-[#2c3e50] text-white px-6 py-4 rounded-t-xl">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold mb-1 flex items-center gap-2">
              <i className="fas fa-file-alt text-[#f39200]"></i>
              Detalle de PQRSD
            </h3>
            <p className="text-sm text-gray-300">
              Radicado: <span className="font-semibold text-[#f39200]">
                {pqrsd.numeroRadicado || pqrsd.numeroOficio || `PQRSD-${pqrsd.id}`}
              </span>
            </p>
          </div>
          <button 
            onClick={onHide}
            className="text-white hover:text-[#f39200] transition-colors p-2"
          >
            <i className="fas fa-times text-2xl"></i>
          </button>
        </div>
      </div>

      {/* Body del Modal */}
      <Modal.Body className="p-6 bg-white">
        {/* Estado y Tipo */}
        <div className="flex flex-wrap gap-3 mb-6 pb-4 border-b-2 border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-600">Estado:</span>
            <BadgeCustom 
              text={pqrsd.estado?.nombre || 'No definido'} 
              bgColor={obtenerColorEstado(pqrsd.estado?.nombre || '')} 
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-600">Tipo:</span>
            <BadgeCustom 
              text={pqrsd.tipo?.nombre || 'No definido'} 
              bgColor={obtenerColorTipo(pqrsd.tipo?.nombre || '')} 
            />
          </div>
          {pqrsd.estaVencida && (
            <div className="flex items-center gap-2">
              <BadgeCustom 
                text="⚠️ VENCIDA" 
                bgColor="#dc3545" 
              />
            </div>
          )}
        </div>

        {/* Información General */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <i className="fas fa-calendar-check text-[#f39200] text-xl mt-1"></i>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Fecha Radicación</p>
                <p className="text-base font-bold text-gray-800">{formatearFecha(pqrsd.fechaRadicacion)}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <i className="fas fa-clock text-[#f39200] text-xl mt-1"></i>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Fecha Vencimiento</p>
                <p className="text-base font-bold text-gray-800">{formatearFecha(pqrsd.fechaVencimiento || '')}</p>
                {pqrsd.diasRestantes !== undefined && (
                  <p className={`text-xs font-medium mt-1 ${pqrsd.diasRestantes < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {pqrsd.diasRestantes < 0 
                      ? `⚠️ Vencida hace ${Math.abs(pqrsd.diasRestantes)} días`
                      : `✓ ${pqrsd.diasRestantes} días restantes`
                    }
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <i className="fas fa-building text-[#f39200] text-xl mt-1"></i>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Dependencia</p>
                <p className="text-base font-bold text-gray-800">{pqrsd.dependenciaAsignada?.nombre || 'Sin asignar'}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <i className="fas fa-user-tie text-[#f39200] text-xl mt-1"></i>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Funcionario Asignado</p>
                <p className="text-base font-bold text-gray-800">{pqrsd.funcionarioAsignado?.nombre || 'Sin asignar'}</p>
                {pqrsd.funcionarioAsignado?.cargo && (
                  <p className="text-xs text-gray-600 mt-1">{pqrsd.funcionarioAsignado.cargo}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <i className="fas fa-envelope text-[#f39200] text-xl mt-1"></i>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Canal de Recepción</p>
                <p className="text-base font-bold text-gray-800">{pqrsd.canalRecepcion || 'No definido'}</p>
              </div>
            </div>
          </div>

          {pqrsd.tipo?.plazoDias && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <i className="fas fa-hourglass-half text-[#f39200] text-xl mt-1"></i>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Plazo Legal</p>
                  <p className="text-base font-bold text-gray-800">{pqrsd.tipo.plazoDias} días hábiles</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Descripción */}
        <div className="mb-6">
          <div className="bg-blue-50 border-l-4 border-[#f39200] p-4 rounded-r-lg">
            <h6 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <i className="fas fa-align-left text-[#f39200]"></i>
              Descripción
            </h6>
            <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">
              {pqrsd.descripcion || 'Sin descripción'}
            </p>
          </div>
        </div>

        {/* Observaciones */}
        {pqrsd.observaciones && (
          <div className="mb-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
              <h6 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <i className="fas fa-sticky-note text-yellow-600"></i>
                Observaciones
              </h6>
              <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">
                {pqrsd.observaciones}
              </p>
            </div>
          </div>
        )}

        {/* Fechas Adicionales */}
        {(pqrsd.fechaAsignacion || pqrsd.fechaRespuesta) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {pqrsd.fechaAsignacion && (
              <div className="border-l-4 border-blue-500 bg-blue-50 p-3 rounded-r-lg">
                <p className="text-xs font-semibold text-blue-700 mb-1">FECHA ASIGNACIÓN</p>
                <p className="text-sm font-bold text-gray-800">{formatearFecha(pqrsd.fechaAsignacion)}</p>
              </div>
            )}
            {pqrsd.fechaRespuesta && (
              <div className="border-l-4 border-green-500 bg-green-50 p-3 rounded-r-lg">
                <p className="text-xs font-semibold text-green-700 mb-1">FECHA RESPUESTA</p>
                <p className="text-sm font-bold text-gray-800">{formatearFecha(pqrsd.fechaRespuesta)}</p>
              </div>
            )}
          </div>
        )}

        {/* Información Adicional */}
        {(pqrsd.numeroOficio || pqrsd.mecanismoRespuesta) && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h6 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <i className="fas fa-info-circle text-[#f39200]"></i>
              Información Adicional
            </h6>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pqrsd.numeroOficio && (
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">Número de Oficio:</p>
                  <p className="text-sm text-gray-800">{pqrsd.numeroOficio}</p>
                </div>
              )}
              {pqrsd.mecanismoRespuesta && (
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">Mecanismo de Respuesta:</p>
                  <p className="text-sm text-gray-800">{pqrsd.mecanismoRespuesta}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal.Body>

      {/* Footer del Modal */}
      <div className="bg-gray-50 px-6 py-4 rounded-b-xl border-t border-gray-200 flex justify-end gap-3">
        <button
          onClick={onHide}
          className="px-6 py-2.5 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300 flex items-center gap-2"
        >
          <i className="fas fa-times"></i>
          Cerrar
        </button>
        <button
          onClick={() => window.print()}
          className="px-6 py-2.5 bg-[#f39200] text-white rounded-lg font-semibold hover:bg-[#d17c00] transition-all duration-300 flex items-center gap-2"
        >
          <i className="fas fa-print"></i>
          Imprimir
        </button>
      </div>
    </Modal>
  );
};