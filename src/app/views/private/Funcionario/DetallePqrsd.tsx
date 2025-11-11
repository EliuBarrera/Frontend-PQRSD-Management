import { Card, Nav, Tab, Badge, Button, Table, Alert, Form, Row, Col } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useFormulario } from "../../../utilities/hocks/useFormulario"

// Interfaces para tipado
interface PQRSD {
    id: number;
    numero_radicado: string;
    tipo: string;
    peticionario: string;
    asunto: string;
    contenido: string;
    fecha_radicacion: string;
    fecha_vencimiento: string;
    estado: string;
    prioridad: 'alta' | 'media' | 'baja';
    dependencia: string;
    funcionario_asignado: string;
    canal_recepcion: string;
    tipo_peticionario: string;
    tipo_identificacion: string;
    numero_identificacion: string;
    email: string;
    telefono: string;
    direccion: string;
    fecha_asignacion: string;
    ultima_actualizacion: string;
}

interface MovimientoHistorial {
    id: number;
    fecha: string;
    accion: string;
    usuario: string;
    descripcion: string;
}

interface ArchivoAdjunto {
    id: number;
    nombre: string;
    tipo: string;
    tamaño: string;
    url: string;
}

interface RespuestaPQRSD {
    tipoRespuesta: string;
    estadoResultante: string;
    asunto: string;
    contenido: string;
    notificarUsuario: boolean;
}

export const DetallePqrsd = () => {
    const { id } = useParams<{ id: string }>();
    const navegacion = useNavigate();
    const [pqrsd, setPqrsd] = useState<PQRSD | null>(null);
    const [historial, setHistorial] = useState<MovimientoHistorial[]>([]);
    const [archivos, setArchivos] = useState<ArchivoAdjunto[]>([]);
    const [cargando, setCargando] = useState(true);
    const [tabActiva, setTabActiva] = useState('informacion');

    // Hook para formulario de respuesta
    let { 
        tipoRespuesta, 
        estadoResultante, 
        asunto, 
        contenido, 
        notificarUsuario,
        dobleEnlace, 
        objeto 
    } = useFormulario<RespuestaPQRSD>({
        tipoRespuesta: "",
        estadoResultante: "resuelta",
        asunto: "",
        contenido: "",
        notificarUsuario: true
    });

    // Datos de ejemplo
    const pqrsdEjemplo: PQRSD = {
        id: 842,
        numero_radicado: "PQ-0842",
        tipo: "Petición",
        peticionario: "Carlos Rodríguez",
        asunto: "Solicitud de información sobre proyectos de infraestructura",
        contenido: `Me dirijo a ustedes para solicitar información detallada sobre los proyectos de infraestructura programados para el próximo año en el municipio. Específicamente, necesito conocer:

• Proyectos de pavimentación de vías terciarias
• Plan de mantenimiento de puentes vehiculares
• Programación de obras de alcantarillado
• Presupuesto asignado para cada proyecto

Esta información es de vital importancia para una investigación que estoy realizando sobre el desarrollo de infraestructura en la región. Agradezco su pronta respuesta.`,
        fecha_radicacion: "15/08/2023 10:23 AM",
        fecha_vencimiento: "25/08/2023",
        estado: "vencida",
        prioridad: "alta",
        dependencia: "Secretaría de Gobierno",
        funcionario_asignado: "Juan Pérez",
        canal_recepcion: "Página Web",
        tipo_peticionario: "Persona Natural",
        tipo_identificacion: "Cédula de Ciudadanía",
        numero_identificacion: "12.345.678",
        email: "carlos.rodriguez@email.com",
        telefono: "300 123 4567",
        direccion: "Calle 123 #45-67, Barrio Centro",
        fecha_asignacion: "16/08/2023",
        ultima_actualizacion: "20/08/2023"
    };

    const historialEjemplo: MovimientoHistorial[] = [
        {
            id: 1,
            fecha: "15/08/2023 10:23 AM",
            accion: "PQRSD Radicada",
            usuario: "Sistema automático",
            descripcion: "La PQRSD fue radicada exitosamente con el número PQ-0842"
        },
        {
            id: 2,
            fecha: "16/08/2023 09:15 AM",
            accion: "Asignación Inicial",
            usuario: "Admin User",
            descripcion: "La PQRSD fue asignada a la Secretaría de Gobierno"
        },
        {
            id: 3,
            fecha: "16/08/2023 11:40 AM",
            accion: "Cambio de Estado",
            usuario: "Juan Pérez (Secretaría de Gobierno)",
            descripcion: 'Estado cambiado a "En proceso"'
        },
        {
            id: 4,
            fecha: "20/08/2023 03:20 PM",
            accion: "Solicitud de Información Adicional",
            usuario: "Juan Pérez (Secretaría de Gobierno)",
            descripcion: "Se solicitó información adicional a otras dependencias para dar respuesta completa"
        },
        {
            id: 5,
            fecha: "25/08/2023 11:59 PM",
            accion: "Vencimiento de Plazo",
            usuario: "Sistema automático",
            descripcion: "La PQRSD ha superado el plazo establecido para respuesta"
        }
    ];

    const archivosEjemplo: ArchivoAdjunto[] = [
        {
            id: 1,
            nombre: "documento_soporte.pdf",
            tipo: "PDF",
            tamaño: "2.3 MB",
            url: "#"
        },
        {
            id: 2,
            nombre: "imagen_evidencia.jpg",
            tipo: "Imagen",
            tamaño: "1.5 MB",
            url: "#"
        }
    ];

    const cargarDatos = async () => {
        try {
            setCargando(true);
            // Simular carga de datos desde API
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setPqrsd(pqrsdEjemplo);
            setHistorial(historialEjemplo);
            setArchivos(archivosEjemplo);
            
            // Pre-llenar formulario de respuesta
            objeto.asunto = `Respuesta a ${pqrsdEjemplo.asunto}`;
            objeto.contenido = `Estimado(a) ${pqrsdEjemplo.peticionario},

Agradecemos su comunicación mediante la cual solicita información sobre los proyectos de infraestructura programados para el próximo año.

En respuesta a su solicitud, nos complace informarle que:

1. Proyectos de pavimentación de vías terciarias:
   - Corregimiento La Esperanza: 5.2 km
   - Vereda San José: 3.8 km
   - Vereda El Progreso: 4.5 km

2. Plan de mantenimiento de puentes vehiculares:
   - Puente sobre quebrada La Virgen: Reparación de estructura
   - Puente central: Refuerzo de bases y pavimentación
   - Puente vehicular sector industrial: Mantenimiento preventivo

3. Programación de obras de alcantarillado:
   - Barrio Centro: Enero-Marzo 2024
   - Barrio Norte: Abril-Junio 2024
   - Barrio Sur: Julio-Septiembre 2024

4. Presupuesto asignado para cada proyecto:
   - Pavimentación: $2.500 millones
   - Mantenimiento de puentes: $800 millones
   - Alcantarillado: $3.200 millones

Para información más detallada, puede contactarnos directamente en la Secretaría de Gobierno.

Cordialmente,
Juan Pérez
Secretaría de Gobierno`;
            
        } catch (error) {
            console.error("Error al cargar datos:", error);
        } finally {
            setCargando(false);
        }
    };

    const enviarRespuesta = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!pqrsd) return;

        // Simular envío
        const submitBtn = document.querySelector('button[type="submit"]') as HTMLButtonElement;
        if (submitBtn) {
            submitBtn.innerHTML = '<span class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span> Enviando...';
            submitBtn.disabled = true;
        }

        setTimeout(() => {
            alert('¡Respuesta enviada exitosamente! La PQRSD ha sido marcada como resuelta.');
            navegacion('/dash/funcionario/mis-pqrsd');
        }, 2000);
    };

    const guardarBorrador = () => {
        alert('Borrador guardado exitosamente. Puede continuar más tarde.');
    };

    const aplicarPlantilla = (tipoPlantilla: string) => {
        let plantilla = '';
        
        switch(tipoPlantilla) {
            case 'additional-info':
                plantilla = 'Para poder procesar su solicitud, necesitamos información adicional. Por favor, proporcione los siguientes detalles: [detalles específicos requeridos]. Agradecemos su colaboración.';
                break;
            case 'standard':
                plantilla = 'Agradecemos su comunicación. Hemos recibido su solicitud y la estamos procesando. Nos estaremos comunicando con usted en caso de necesitar información adicional.';
                break;
            case 'extension':
                plantilla = 'Debido a la complejidad de su solicitud, necesitamos prorrogar el plazo de respuesta. Le informaremos tan pronto como tengamos una respuesta completa.';
                break;
            case 'documents':
                plantilla = 'Para procesar su solicitud, necesitamos los siguientes documentos: [lista de documentos]. Por favor, adjúntelos en respuesta a este mensaje.';
                break;
        }
        
        objeto.contenido = plantilla;
    };

    const obtenerColorEstado = (estado: string): string => {
        switch (estado.toLowerCase()) {
            case 'pendiente': return 'bg-yellow-500';
            case 'proceso': return 'bg-cyan-500';
            case 'resuelta': return 'bg-green-500';
            case 'vencida': return 'bg-red-500';
            default: return 'bg-blue-500';
        }
    };

    const obtenerColorTipo = (tipo: string): string => {
        switch (tipo.toLowerCase()) {
            case 'petición': return 'bg-cyan-500';
            case 'queja': return 'bg-yellow-500';
            case 'reclamo': return 'bg-red-500';
            case 'solicitud': return 'bg-blue-500';
            case 'denuncia': return 'bg-gray-800';
            default: return 'bg-gray-500';
        }
    };

    const obtenerColorPrioridad = (prioridad: string): string => {
        switch (prioridad) {
            case 'alta': return 'bg-red-500';
            case 'media': return 'bg-yellow-500';
            case 'baja': return 'bg-cyan-500';
            default: return 'bg-gray-500';
        }
    };

    useEffect(() => {
        cargarDatos();
    }, [id]);

    if (cargando) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Cargando detalles de la PQRSD...</p>
            </div>
        );
    }

    if (!pqrsd) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <i className="fas fa-exclamation-triangle text-6xl text-yellow-500 mb-4"></i>
                <h4 className="text-xl font-semibold mb-2">PQRSD no encontrada</h4>
                <p className="text-gray-600 mb-4">No se pudo cargar la información de la PQRSD solicitada.</p>
                <button 
                    onClick={() => navegacion('/dash/funcionario/mis-pqrsd')}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    Volver a mis PQRSD
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-md mb-4">
                <div className="bg-[#1e2b39] text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
                    <h4 className="text-xl font-semibold m-0">Detalle de PQRSD #{pqrsd.numero_radicado}</h4>
                    <button 
                        onClick={() => navegacion('/dash/funcionario/mis-pqrsd')}
                        className="px-4 py-2 border border-white rounded text-white hover:bg-white hover:text-[#1e2b39] transition-colors text-sm"
                    >
                        <i className="fas fa-times mr-2"></i>Cerrar
                    </button>
                </div>
                
                <div className="p-6">
                    {/* Tabs */}
                    <div className="border-b border-gray-200 mb-4">
                        <nav className="flex -mb-px">
                            <button
                                onClick={() => setTabActiva('informacion')}
                                className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                                    tabActiva === 'informacion'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Información
                            </button>
                            <button
                                onClick={() => setTabActiva('historial')}
                                className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                                    tabActiva === 'historial'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Historial
                            </button>
                            <button
                                onClick={() => setTabActiva('respuesta')}
                                className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                                    tabActiva === 'respuesta'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Responder
                            </button>
                        </nav>
                    </div>

                    {/* Tab Content */}
                    
                    {/* Tab Información */}
                    {tabActiva === 'informacion' && (
                        <div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h5 className="text-lg font-semibold mb-4">Información General</h5>
                                    <table className="w-full">
                                        <tbody>
                                            <tr className="border-b">
                                                <th className="text-left py-2 pr-4 w-2/5 font-medium text-gray-700">Número de radicado:</th>
                                                <td className="py-2">{pqrsd.numero_radicado}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="text-left py-2 pr-4 font-medium text-gray-700">Tipo de PQRSD:</th>
                                                <td className="py-2">
                                                    <span className={`${obtenerColorTipo(pqrsd.tipo)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                                                        {pqrsd.tipo}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="text-left py-2 pr-4 font-medium text-gray-700">Fecha de radicación:</th>
                                                <td className="py-2">{pqrsd.fecha_radicacion}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="text-left py-2 pr-4 font-medium text-gray-700">Plazo de respuesta:</th>
                                                <td className="py-2 text-red-600">{pqrsd.fecha_vencimiento} (Vencido)</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="text-left py-2 pr-4 font-medium text-gray-700">Estado actual:</th>
                                                <td className="py-2">
                                                    <span className={`${obtenerColorEstado(pqrsd.estado)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                                                        {pqrsd.estado === 'vencida' ? 'Vencida' : pqrsd.estado}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="text-left py-2 pr-4 font-medium text-gray-700">Prioridad:</th>
                                                <td className="py-2">
                                                    <span className={`${obtenerColorPrioridad(pqrsd.prioridad)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                                                        {pqrsd.prioridad.charAt(0).toUpperCase() + pqrsd.prioridad.slice(1)}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="text-left py-2 pr-4 font-medium text-gray-700">Canal de recepción:</th>
                                                <td className="py-2">{pqrsd.canal_recepcion}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                
                                <div>
                                    <h5 className="text-lg font-semibold mb-4">Información del Peticionario</h5>
                                    <table className="w-full">
                                        <tbody>
                                            <tr className="border-b">
                                                <th className="text-left py-2 pr-4 w-2/5 font-medium text-gray-700">Nombre:</th>
                                                <td className="py-2">{pqrsd.peticionario}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="text-left py-2 pr-4 font-medium text-gray-700">Tipo de peticionario:</th>
                                                <td className="py-2">{pqrsd.tipo_peticionario}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="text-left py-2 pr-4 font-medium text-gray-700">Tipo de identificación:</th>
                                                <td className="py-2">{pqrsd.tipo_identificacion}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="text-left py-2 pr-4 font-medium text-gray-700">Número de identificación:</th>
                                                <td className="py-2">{pqrsd.numero_identificacion}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="text-left py-2 pr-4 font-medium text-gray-700">Correo electrónico:</th>
                                                <td className="py-2">{pqrsd.email}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="text-left py-2 pr-4 font-medium text-gray-700">Teléfono:</th>
                                                <td className="py-2">{pqrsd.telefono}</td>
                                            </tr>
                                            <tr>
                                                <th className="text-left py-2 pr-4 font-medium text-gray-700">Dirección:</th>
                                                <td className="py-2">{pqrsd.direccion}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <div className="mt-6">
                                <h5 className="text-lg font-semibold mb-4">Contenido de la PQRSD</h5>
                                <div className="border rounded-lg shadow-sm">
                                    <div className="p-4">
                                        <h6 className="font-semibold text-base mb-2">Asunto: {pqrsd.asunto}</h6>
                                        <p className="whitespace-pre-line text-gray-700">{pqrsd.contenido}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                                <div>
                                    <h5 className="text-lg font-semibold mb-4">Asignación Actual</h5>
                                    <table className="w-full">
                                        <tbody>
                                            <tr className="border-b">
                                                <th className="text-left py-2 pr-4 w-2/5 font-medium text-gray-700">Dependencia:</th>
                                                <td className="py-2">{pqrsd.dependencia}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="text-left py-2 pr-4 font-medium text-gray-700">Funcionario responsable:</th>
                                                <td className="py-2">{pqrsd.funcionario_asignado}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="text-left py-2 pr-4 font-medium text-gray-700">Fecha de asignación:</th>
                                                <td className="py-2">{pqrsd.fecha_asignacion}</td>
                                            </tr>
                                            <tr>
                                                <th className="text-left py-2 pr-4 font-medium text-gray-700">Última actualización:</th>
                                                <td className="py-2">{pqrsd.ultima_actualizacion}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                
                                <div>
                                    <h5 className="text-lg font-semibold mb-4">Archivos Adjuntos</h5>
                                    <div className="space-y-2">
                                        {archivos.map(archivo => (
                                            <a 
                                                key={archivo.id} 
                                                href={archivo.url}
                                                className="flex justify-between items-center p-3 border rounded hover:bg-gray-50 transition-colors"
                                            >
                                                <div>
                                                    <i className={`fas ${archivo.tipo === 'PDF' ? 'fa-file-pdf text-red-500' : 'fa-file-image text-blue-500'} mr-2`}></i>
                                                    {archivo.nombre}
                                                </div>
                                                <span className="text-sm text-gray-500">{archivo.tamaño}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Tab Historial */}
                    {tabActiva === 'historial' && (
                        <div>
                            <h5 className="text-lg font-semibold mb-6">Historial de Movimientos</h5>
                            
                            <div className="relative pl-8">
                                {/* Línea vertical del timeline */}
                                <div className="absolute left-[11px] top-2 bottom-0 w-0.5 bg-gray-300"></div>
                                
                                {historial.map((movimiento) => (
                                    <div key={movimiento.id} className="relative mb-6">
                                        {/* Punto del timeline */}
                                        <div className="absolute left-[-32px] top-2 w-3 h-3 rounded-full bg-[#f39200] border-2 border-white shadow"></div>
                                        
                                        <div className="bg-white border rounded-lg shadow-sm">
                                            <div className="p-4">
                                                <div className="flex justify-between mb-2">
                                                    <h6 className="font-semibold text-base">{movimiento.accion}</h6>
                                                    <span className="text-sm text-gray-500">{movimiento.fecha}</span>
                                                </div>
                                                <p className="text-sm mb-1 text-gray-700">Por: {movimiento.usuario}</p>
                                                <p className="text-sm text-gray-600">{movimiento.descripcion}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* Tab Respuesta */}
                    {tabActiva === 'respuesta' && (
                        <div>
                            <h5 className="text-lg font-semibold mb-6">Responder PQRSD</h5>
                            
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                                <div className="flex">
                                    <i className="fas fa-info-circle text-blue-500 mr-3 mt-0.5"></i>
                                    <div>
                                        Esta PQRSD está <strong>vencida</strong>. Por favor, priorice su respuesta y notifique al administrador.
                                    </div>
                                </div>
                            </div>
                            
                            <form onSubmit={enviarRespuesta}>
                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tipo de Respuesta *
                                        </label>
                                        <select 
                                            name="tipoRespuesta"
                                            value={tipoRespuesta}
                                            onChange={dobleEnlace}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Seleccione el tipo de respuesta</option>
                                            <option value="email">Correo Electrónico</option>
                                            <option value="physical">Carta Física</option>
                                            <option value="phone">Llamada Telefónica</option>
                                            <option value="other">Otro</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Estado después de responder *
                                        </label>
                                        <select 
                                            name="estadoResultante"
                                            value={estadoResultante}
                                            onChange={dobleEnlace}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="resuelta">Resuelta</option>
                                            <option value="proceso">En proceso (requiere seguimiento)</option>
                                            <option value="pendiente">Pendiente (esperando información)</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Asunto de la respuesta *
                                    </label>
                                    <input 
                                        type="text"
                                        name="asunto"
                                        value={asunto}
                                        onChange={dobleEnlace}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Contenido de la Respuesta *
                                    </label>
                                    <textarea 
                                        rows={8}
                                        name="contenido"
                                        value={contenido}
                                        onChange={dobleEnlace}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Archivos Adjuntos
                                    </label>
                                    <input 
                                        type="file" 
                                        multiple
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        Puede adjuntar hasta 5 archivos (PDF, JPG, PNG). Tamaño máximo por archivo: 5MB
                                    </p>
                                </div>
                                
                                <div className="mb-6">
                                    <label className="flex items-center">
                                        <input 
                                            type="checkbox"
                                            name="notificarUsuario"
                                            checked={notificarUsuario}
                                            onChange={dobleEnlace}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">
                                            Notificar al usuario por correo electrónico
                                        </span>
                                    </label>
                                </div>
                                
                                <div className="flex justify-end gap-3">
                                    <button 
                                        type="button"
                                        onClick={guardarBorrador}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Guardar borrador
                                    </button>
                                    <button 
                                        type="submit"
                                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                    >
                                        <i className="fas fa-paper-plane mr-2"></i>Enviar Respuesta
                                    </button>
                                </div>
                            </form>
                            
                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                <h6 className="font-semibold mb-3">Plantillas de Respuesta Rápida</h6>
                                <div className="flex flex-wrap gap-2">
                                    <button 
                                        type="button"
                                        onClick={() => aplicarPlantilla('additional-info')}
                                        className="px-3 py-2 text-sm border border-blue-500 text-blue-600 rounded hover:bg-blue-50 transition-colors"
                                    >
                                        Solicitud de información adicional
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => aplicarPlantilla('standard')}
                                        className="px-3 py-2 text-sm border border-blue-500 text-blue-600 rounded hover:bg-blue-50 transition-colors"
                                    >
                                        Respuesta estándar
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => aplicarPlantilla('extension')}
                                        className="px-3 py-2 text-sm border border-blue-500 text-blue-600 rounded hover:bg-blue-50 transition-colors"
                                    >
                                        Notificación de prórroga
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => aplicarPlantilla('documents')}
                                        className="px-3 py-2 text-sm border border-blue-500 text-blue-600 rounded hover:bg-blue-50 transition-colors"
                                    >
                                        Solicitud de documentos
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetallePqrsd;