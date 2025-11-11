import { Modal, Button, Form, Alert } from "react-bootstrap"
import { useState } from "react"
import { useFormulario } from "../../../utilities/hocks/useFormulario"

// Interfaces para tipado
interface PQRSD {
    id: number;
    numero_radicado: string;
    dependencia: string;
}

interface SolicitudReclasificacion {
    nuevaDependencia: string;
    motivo: string;
    comentarios: string;
}

interface Props {
    show: boolean;
    onHide: () => void;
    pqrsd: PQRSD | null;
    onSubmit: (solicitud: SolicitudReclasificacion) => void;
}

export const ModalReclasificacion = ({ show, onHide, pqrsd, onSubmit }: Props) => {
    const [enviando, setEnviando] = useState(false);

    // Hook para formulario de reclasificación
    let { 
        nuevaDependencia, 
        motivo, 
        comentarios,
        dobleEnlace, 
        objeto 
    } = useFormulario<SolicitudReclasificacion>({
        nuevaDependencia: "",
        motivo: "",
        comentarios: ""
    });

    const dependenciasDisponibles = [
        { value: "planeacion", label: "Secretaría de Planeación" },
        { value: "obras", label: "Secretaría de Obras Públicas" },
        { value: "hacienda", label: "Secretaría de Hacienda" },
        { value: "cultura", label: "Secretaría de Cultura y Deporte" },
        { value: "alcaldia", label: "Despacho del Alcalde" },
        { value: "juridica", label: "Oficina Jurídica" },
        { value: "contratacion", label: "Oficina de Contratación" },
        { value: "control_interno", label: "Control Interno" }
    ];

    const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
        e.preventDefault();
        
        if (!pqrsd || !nuevaDependencia || !motivo) {
            alert('Por favor complete todos los campos obligatorios');
            return;
        }

        setEnviando(true);
        
        try {
            await onSubmit(objeto);
            
            // Limpiar formulario
            objeto.nuevaDependencia = "";
            objeto.motivo = "";
            objeto.comentarios = "";
            
            onHide();
        } catch (error) {
            console.error('Error al enviar solicitud:', error);
            alert('Error al enviar la solicitud. Intente nuevamente.');
        } finally {
            setEnviando(false);
        }
    };

    const handleClose = () => {
        if (!enviando) {
            objeto.nuevaDependencia = "";
            objeto.motivo = "";
            objeto.comentarios = "";
            onHide();
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/75 backdrop-blur-sm animate-fadeIn"
                onClick={handleClose}
            />
            
            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-popIn">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">
                        Solicitar Reclasificación de PQRSD #{pqrsd?.numero_radicado || ''}
                    </h2>
                    {!enviando && (
                        <button
                            onClick={handleClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Cerrar modal"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    {/* Alert */}
                    <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                        <div className="flex items-start">
                            <svg className="w-5 h-5 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <p className="text-sm text-yellow-800">
                                    Esta acción solicitará la reclasificación de la PQRSD a otra dependencia. 
                                    El administrador revisará su solicitud antes de procesar el cambio.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-5">
                        {/* Dependencia Actual */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Dependencia Actual
                            </label>
                            <input
                                type="text"
                                value={pqrsd?.dependencia || ''} 
                                disabled
                                className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed"
                            />
                        </div>

                        {/* Nueva Dependencia */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nueva Dependencia <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="nuevaDependencia"
                                value={nuevaDependencia}
                                onChange={dobleEnlace}
                                disabled={enviando}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                            >
                                <option value="">Seleccione una dependencia</option>
                                {dependenciasDisponibles.map(dep => (
                                    <option key={dep.value} value={dep.value}>
                                        {dep.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Motivo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Motivo de la Reclasificación <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows={4}
                                name="motivo"
                                value={motivo}
                                onChange={dobleEnlace}
                                placeholder="Explique detalladamente por qué esta PQRSD debe ser reclasificada a otra dependencia..."
                                disabled={enviando}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none transition-colors"
                            />
                            <p className="mt-1.5 text-xs text-gray-500">
                                Sea específico sobre por qué la dependencia actual no puede manejar esta PQRSD
                            </p>
                        </div>

                        {/* Comentarios */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Comentarios Adicionales (Opcional)
                            </label>
                            <textarea
                                rows={2}
                                name="comentarios"
                                value={comentarios}
                                onChange={dobleEnlace}
                                placeholder="Agregue cualquier comentario adicional que considere relevante..."
                                disabled={enviando}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                    <button
                        onClick={handleClose}
                        disabled={enviando}
                        className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={enviando || !nuevaDependencia || !motivo}
                        className="px-5 py-2.5 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                        {enviando ? (
                            <>
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Enviando...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                </svg>
                                Enviar Solicitud
                            </>
                        )}
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes popIn {
                    0% {
                        opacity: 0;
                        transform: scale(0.9) translateY(-20px);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
                
                .animate-popIn {
                    animation: popIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #f59e0b;
                    border-radius: 10px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #d97706;
                }
            `}</style>
        </div>
    );
};

export default ModalReclasificacion;