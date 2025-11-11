import { Col, Row, Card, Button, Badge, Table, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { ServicioGet } from "../../../services/ServicioGet"
import { URLS } from "../../../utilities/domains/Urls"
import { BadgeCustom } from "../../../components/shared/BadgeCustom"

// Interfaces para tipado
interface EstadisticasFuncionario {
    asignadas: number;
    pendientes: number;
    en_proceso: number;
    resueltas: number;
    vencidas: number;
    vencen_hoy: number;
    efectividad: number;
}

interface PQRSD {
    id: number;
    numero_radicado: string;
    tipo: string;
    peticionario: string;
    asunto: string;
    fecha_radicacion: string;
    fecha_vencimiento: string;
    estado: string;
    prioridad: 'alta' | 'media' | 'baja';
}

interface AlertaPendiente {
    id: number;
    tipo: 'vencimiento' | 'vencida' | 'asignacion';
    mensaje: string;
    fecha: string;
    prioridad: 'alta' | 'media' | 'baja';
}

interface FuncionarioInfo {
    nombre: string;
    dependencia: string;
    cargo: string;
    email: string;
}

export const DashboardFuncionario = () => {
    const [estadisticas, setEstadisticas] = useState<EstadisticasFuncionario>({
        asignadas: 0,
        pendientes: 0,
        en_proceso: 0,
        resueltas: 0,
        vencidas: 0,
        vencen_hoy: 0,
        efectividad: 0
    });
    const [pqrsdRecientes, setPqrsdRecientes] = useState<PQRSD[]>([]);
    const [alertas, setAlertas] = useState<AlertaPendiente[]>([]);
    const [funcionario, setFuncionario] = useState<FuncionarioInfo>({
        nombre: "Juan Pérez",
        dependencia: "Secretaría de Gobierno",
        cargo: "Funcionario",
        email: "juan.perez@alcaldia.gov.co"
    });
    const [cargando, setCargando] = useState(true);

    const navegacion = useNavigate();

    // Datos de ejemplo
    const estadisticasEjemplo: EstadisticasFuncionario = {
        asignadas: 18,
        pendientes: 7,
        en_proceso: 9,
        resueltas: 2,
        vencidas: 3,
        vencen_hoy: 2,
        efectividad: 11
    };

    const pqrsdRecientesEjemplo: PQRSD[] = [
        {
            id: 842,
            numero_radicado: "PQ-0842",
            tipo: "Petición",
            peticionario: "Carlos Rodríguez",
            asunto: "Solicitud de información sobre proyectos de infraestructura",
            fecha_radicacion: "15/08/2023",
            fecha_vencimiento: "25/08/2023",
            estado: "vencida",
            prioridad: "alta"
        },
        {
            id: 843,
            numero_radicado: "PQ-0843",
            tipo: "Queja",
            peticionario: "María González",
            asunto: "Queja por mal estado de vías en el barrio Centro",
            fecha_radicacion: "16/08/2023",
            fecha_vencimiento: "31/08/2023",
            estado: "pendiente",
            prioridad: "media"
        },
        {
            id: 844,
            numero_radicado: "PQ-0844",
            tipo: "Reclamo",
            peticionario: "Empresa XYZ SAS",
            asunto: "Reclamo por demora en trámite de licencia",
            fecha_radicacion: "17/08/2023",
            fecha_vencimiento: "01/09/2023",
            estado: "proceso",
            prioridad: "baja"
        },
        {
            id: 45,
            numero_radicado: "PQ-0845",
            tipo: "Solicitud",
            peticionario: "Empresa IDEA SAS",
            asunto: "Solicitud de información técnica",
            fecha_radicacion: "17/08/2023",
            fecha_vencimiento: "01/09/2023",
            estado: "proceso",
            prioridad: "baja"
        },
        {
            id: 81,
            numero_radicado: "PQ-0846",
            tipo: "Denuncia",
            peticionario: "Empresa XYZ SAS",
            asunto: "Denuncia sobre irregularidades administrativas",
            fecha_radicacion: "17/08/2023",
            fecha_vencimiento: "01/09/2023",
            estado: "proceso",
            prioridad: "baja"
        }
    ];

    const alertasEjemplo: AlertaPendiente[] = [
        {
            id: 1,
            tipo: 'vencimiento',
            mensaje: 'La PQRSD PQ-0843 vence hoy (31/08/2023)',
            fecha: '31/08/2023',
            prioridad: 'alta'
        },
        {
            id: 2,
            tipo: 'vencida',
            mensaje: 'La PQRSD PQ-0842 está vencida desde hace 6 días',
            fecha: '25/08/2023',
            prioridad: 'alta'
        },
        {
            id: 3,
            tipo: 'asignacion',
            mensaje: 'Nueva PQRSD PQ-0847 asignada - Prioridad alta',
            fecha: '30/08/2023',
            prioridad: 'media'
        }
    ];

    const cargarDatos = async () => {
        try {
            setCargando(true);
            
            // Simular carga desde API
            const urlEstadisticas = URLS.URL_BASE + "/functionary/estadisticas";
            // const respuestaEstadisticas = await ServicioGet.peticionGet(urlEstadisticas);
            
            const urlPqrsdRecientes = URLS.URL_BASE + "/funcionario/pqrsd/recientes";
            // const respuestaPqrsd = await ServicioGet.peticionGet(urlPqrsdRecientes);
            
            const urlAlertas = URLS.URL_BASE + "/funcionario/alertas";
            // const respuestaAlertas = await ServicioGet.peticionGet(urlAlertas);
            
            // Por ahora usamos datos de ejemplo
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setEstadisticas(estadisticasEjemplo);
            setPqrsdRecientes(pqrsdRecientesEjemplo);
            setAlertas(alertasEjemplo);
            
        } catch (error) {
            console.error("Error al cargar datos:", error);
        } finally {
            setCargando(false);
        }
    };

    const obtenerColorEstado = (estado: string): string => {
        switch (estado.toLowerCase()) {
            case 'pendiente': return '#F5B027';
            case 'proceso': return '#152296ff';
            case 'resuelta': return '#00862bff';
            case 'vencida': return '#b44747ff';
            default: return '#3B82F6';
        }
    };

    const obtenerColorTipo = (tipo: string): string => {
        switch (tipo.toLowerCase()) {
            case 'petición': return '#F5B027';
            case 'queja': return '#F54927';
            case 'reclamo': return '#9333EA';
            case 'solicitud': return '#3B82F6';
            case 'denuncia': return '#000000';
            default: return '#6B7280';
        }
    };

    const obtenerColorAlerta = (tipo: string): string => {
        switch (tipo) {
            case 'vencimiento': return 'text-yellow-600';
            case 'vencida': return 'text-red-600';
            case 'asignacion': return 'text-cyan-600';
            default: return 'text-blue-600';
        }
    };

    const obtenerIconoAlerta = (tipo: string): string => {
        switch (tipo) {
            case 'vencimiento': return 'fas fa-clock';
            case 'vencida': return 'fas fa-exclamation-triangle';
            case 'asignacion': return 'fas fa-plus-circle';
            default: return 'fas fa-info-circle';
        }
    };

    const verDetallePqrsd = (id: number) => {
        navegacion(`/funcionario/pqrsd/detalle/${id}`);
    };

    const irAMisPqrsd = () => {
        navegacion('/funcionario/mis-pqrsd');
    };

    const irAEstadisticas = () => {
        navegacion('/funcionario/estadisticas');
    };

    const irAAlertas = () => {
        navegacion('/funcionario/alertas');
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    if (cargando) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
                <p className="mt-4 text-gray-600 font-medium">Cargando dashboard...</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            {/* Header con información del funcionario */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Dashboard - {funcionario.nombre}</h2>
                    <p className="text-gray-600 mt-1">
                        {funcionario.cargo} - {funcionario.dependencia}
                    </p>
                </div>
                <div>
                    <button 
                        onClick={cargarDatos}
                        className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition-colors"
                    >
                        <i className="fas fa-sync-alt mr-2"></i>Actualizar
                    </button>
                </div>
            </div>

            {/* Alertas Importantes */}
            {alertas.length > 0 && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                    <div className="flex justify-between items-start">
                        <div className="flex-grow">
                            <div className="flex items-center mb-2">
                                <i className="fas fa-bell text-yellow-600 mr-2"></i>
                                <h6 className="font-semibold text-gray-800">
                                    Alertas Importantes ({alertas.length})
                                </h6>
                            </div>
                            <div className="space-y-1">
                                {alertas.slice(0, 2).map(alerta => (
                                    <div key={alerta.id} className="text-sm text-gray-700">
                                        <i className={`${obtenerIconoAlerta(alerta.tipo)} mr-2`}></i>
                                        {alerta.mensaje}
                                    </div>
                                ))}
                                {alertas.length > 2 && (
                                    <p className="text-sm text-gray-500 mt-2">
                                        y {alertas.length - 2} alertas más...
                                    </p>
                                )}
                            </div>
                        </div>
                        <button 
                            onClick={irAAlertas}
                            className="px-3 py-1 border border-yellow-600 text-yellow-600 rounded text-sm hover:bg-yellow-50 transition-colors ml-4"
                        >
                            Ver todas
                        </button>
                    </div>
                </div>
            )}

            {/* Estadísticas Cards */}
            <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-4 mb-6">
                {/* Card Asignadas */}
                <div className="bg-white rounded-lg shadow-sm border p-4">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Asignadas a mí</p>
                            <h3 className="text-3xl font-bold text-gray-800">{estadisticas.asignadas}</h3>
                        </div>
                        <div className="text-gray-400">
                            <i className="fas fa-user-check text-3xl"></i>
                        </div>
                    </div>
                    <p className="text-sm text-cyan-600 mb-3">Todas mis PQRSD</p>
                    <button 
                        onClick={irAMisPqrsd}
                        className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded text-sm hover:bg-blue-50 transition-colors"
                    >
                        Ver todas
                    </button>
                </div>

                {/* Card Pendientes */}
                <div className="bg-white rounded-lg shadow-sm border p-4">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Pendientes</p>
                            <h3 className="text-3xl font-bold text-yellow-600">{estadisticas.pendientes}</h3>
                        </div>
                        <div className="text-yellow-500">
                            <i className="fas fa-clock text-3xl"></i>
                        </div>
                    </div>
                    <p className="text-sm text-red-600 mb-3">
                        <i className="fas fa-exclamation-circle mr-1"></i>
                        {estadisticas.vencen_hoy} vencen hoy
                    </p>
                    <button 
                        onClick={() => navegacion('/dash/funcionario/mis-pqrsd?estado=pendiente')}
                        className="w-full px-4 py-2 border border-yellow-600 text-yellow-600 rounded text-sm hover:bg-yellow-50 transition-colors"
                    >
                        Ver pendientes
                    </button>
                </div>

                {/* Card En Proceso */}
                <div className="bg-white rounded-lg shadow-sm border p-4">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">En Proceso</p>
                            <h3 className="text-3xl font-bold text-cyan-600">{estadisticas.en_proceso}</h3>
                        </div>
                        <div className="text-cyan-500">
                            <i className="fas fa-cogs text-3xl"></i>
                        </div>
                    </div>
                    <p className="text-sm text-cyan-600 mb-3">
                        {Math.round((estadisticas.en_proceso / estadisticas.asignadas) * 100)}% de mis PQRSD
                    </p>
                    <button 
                        onClick={() => navegacion('/dash/funcionario/mis-pqrsd?estado=proceso')}
                        className="w-full px-4 py-2 border border-cyan-600 text-cyan-600 rounded text-sm hover:bg-cyan-50 transition-colors"
                    >
                        Ver en proceso
                    </button>
                </div>

                {/* Card Resueltas */}
                <div className="bg-white rounded-lg shadow-sm border p-4">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Resueltas</p>
                            <h3 className="text-3xl font-bold text-green-600">{estadisticas.resueltas}</h3>
                        </div>
                        <div className="text-green-500">
                            <i className="fas fa-check-circle text-3xl"></i>
                        </div>
                    </div>
                    <p className="text-sm text-green-600 mb-3">
                        {estadisticas.efectividad}% de efectividad
                    </p>
                    <button 
                        onClick={() => navegacion('/dash/funcionario/mis-pqrsd?estado=resuelta')}
                        className="w-full px-4 py-2 border border-green-600 text-green-600 rounded text-sm hover:bg-green-50 transition-colors"
                    >
                        Ver resueltas
                    </button>
                </div>
            </div>

            {/* PQRSD Recientes y Alertas */}
            <div className="grid lg:grid-cols-12 gap-4 mb-6">
                {/* PQRSD Recientes */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="bg-[#1e2b39] text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
                            <h5 className="font-semibold">PQRSD Recientes Asignadas</h5>
                            <button 
                                onClick={irAMisPqrsd}
                                className="px-3 py-1 border border-white text-white rounded text-sm hover:bg-white hover:text-[#1e2b39] transition-colors"
                            >
                                Ver todas
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700"># Radicado</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Tipo</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Peticionario</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Asunto</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Estado</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {pqrsdRecientes.map(pqrsd => (
                                        <tr key={pqrsd.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3 font-semibold text-gray-800">{pqrsd.numero_radicado}</td>
                                            <td className="px-4 py-3">
                                                <BadgeCustom text={pqrsd.tipo} bgColor={obtenerColorTipo(pqrsd.tipo)}/>
                                            </td>
                                            <td className="px-4 py-3 text-gray-700">{pqrsd.peticionario}</td>
                                            <td className="px-4 py-3 text-gray-700">
                                                <span title={pqrsd.asunto}>
                                                    {pqrsd.asunto.length > 40 
                                                        ? pqrsd.asunto.substring(0, 40) + "..." 
                                                        : pqrsd.asunto
                                                    }
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <BadgeCustom text={pqrsd.estado} bgColor={obtenerColorEstado(pqrsd.estado)}/>
                                            </td>
                                            <td className="px-4 py-3">
                                                <button 
                                                    onClick={() => verDetallePqrsd(pqrsd.id)}
                                                    className="px-3 py-1 border border-blue-600 text-blue-600 rounded text-sm hover:bg-blue-50 transition-colors"
                                                    title="Ver detalles"
                                                >
                                                    <i className="fas fa-eye"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                {/* Alertas Recientes */}
                <div className="lg:col-span-4">
                    <div className="bg-white rounded-lg shadow-sm h-full">
                        <div className="bg-[#1e2b39] text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
                            <h5 className="font-semibold">
                                <i className="fas fa-bell mr-2"></i>
                                Alertas Recientes
                            </h5>
                            <span className="bg-white text-[#1e2b39] px-2 py-1 rounded text-sm font-semibold">
                                {alertas.length}
                            </span>
                        </div>
                        <div className="p-4">
                            {alertas.length > 0 ? (
                                <>
                                    <div className="space-y-3">
                                        {alertas.map(alerta => (
                                            <div key={alerta.id} className="border-b pb-3 last:border-b-0">
                                                <div className="flex items-start">
                                                    <i className={`${obtenerIconoAlerta(alerta.tipo)} ${obtenerColorAlerta(alerta.tipo)} mr-2 mt-1`}></i>
                                                    <div className="flex-grow">
                                                        <span className={`text-xs font-medium ${obtenerColorAlerta(alerta.tipo)} uppercase`}>
                                                            {alerta.tipo}
                                                        </span>
                                                        <p className="text-sm text-gray-700 mt-1">{alerta.mensaje}</p>
                                                        <p className="text-xs text-gray-500 mt-1">{alerta.fecha}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-center mt-4">
                                        <button 
                                            onClick={irAAlertas}
                                            className="px-4 py-2 border border-blue-600 text-blue-600 rounded text-sm hover:bg-blue-50 transition-colors w-full"
                                        >
                                            Ver todas las alertas
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <i className="fas fa-bell-slash text-4xl text-gray-400 mb-3"></i>
                                    <p className="text-gray-500">No hay alertas pendientes</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Accesos Rápidos */}
            <div className="bg-white rounded-lg shadow-sm">
                <div className="bg-[#1e2b39] text-white px-6 py-4 rounded-t-lg">
                    <h5 className="font-semibold">Accesos Rápidos</h5>
                </div>
                <div className="p-6">
                    <div className="grid md:grid-cols-4 gap-4">
                        <button 
                            onClick={irAMisPqrsd}
                            className="flex flex-col items-center justify-center py-8 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                            <i className="fas fa-list text-4xl mb-3"></i>
                            <span className="font-medium">Mis PQRSD</span>
                        </button>
                        
                        <button 
                            onClick={() => navegacion('/dash/funcionario/mis-pqrsd?estado=pendiente')}
                            className="flex flex-col items-center justify-center py-8 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                        >
                            <i className="fas fa-clock text-4xl mb-3"></i>
                            <span className="font-medium">Pendientes</span>
                        </button>
                        
                        <button 
                            onClick={irAEstadisticas}
                            className="flex flex-col items-center justify-center py-8 border-2 border-cyan-600 text-cyan-600 rounded-lg hover:bg-cyan-50 transition-colors"
                        >
                            <i className="fas fa-chart-bar text-4xl mb-3"></i>
                            <span className="font-medium">Estadísticas</span>
                        </button>
                        
                        <button 
                            onClick={irAAlertas}
                            className="flex flex-col items-center justify-center py-8 border-2 border-yellow-600 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors"
                        >
                            <i className="fas fa-bell text-4xl mb-3"></i>
                            <span className="font-medium">Alertas ({alertas.length})</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardFuncionario;