import { Col, Row, Card, Button, Form, Badge, Table } from "react-bootstrap"
import { useEffect, useState } from "react"
import { ServicioGet } from "../../../services/ServicioGet"
import { URLS } from "../../../utilities/domains/Urls"
import { useFormulario } from "../../../utilities/hocks/useFormulario"
import { BadgeCustom } from "../../../components/shared/BadgeCustom"

// Interfaces para tipado
interface EstadisticasDetalladas {
    periodo: string;
    total_asignadas: number;
    resueltas: number;
    pendientes: number;
    en_proceso: number;
    vencidas: number;
    efectividad: number;
    tiempo_promedio_respuesta: number;
    por_tipo: EstadisticaTipo[];
    por_mes: EstadisticaMensual[];
}

interface EstadisticaTipo {
    tipo: string;
    cantidad: number;
    resueltas: number;
    pendientes: number;
    efectividad: number;
}

interface EstadisticaMensual {
    mes: string;
    asignadas: number;
    resueltas: number;
    efectividad: number;
}

interface FiltrosPeriodo {
    fechaInicio: string;
    fechaFin: string;
    periodo: string;
}

export const EstadisticasFuncionario = () => {
    const [estadisticas, setEstadisticas] = useState<EstadisticasDetalladas | null>(null);
    const [cargando, setCargando] = useState(true);

    // Hook para filtros de periodo
    let { fechaInicio, fechaFin, periodo, dobleEnlace, objeto } = 
        useFormulario<FiltrosPeriodo>({
            fechaInicio: "",
            fechaFin: "",
            periodo: "mes_actual"
        });

    // Datos de ejemplo
    const estadisticasEjemplo: EstadisticasDetalladas = {
        periodo: "Agosto 2023",
        total_asignadas: 18,
        resueltas: 12,
        pendientes: 4,
        en_proceso: 2,
        vencidas: 3,
        efectividad: 67,
        tiempo_promedio_respuesta: 8.5,
        por_tipo: [
            {
                tipo: "Petición",
                cantidad: 8,
                resueltas: 6,
                pendientes: 2,
                efectividad: 75
            },
            {
                tipo: "Queja",
                cantidad: 5,
                resueltas: 3,
                pendientes: 1,
                efectividad: 60
            },
            {
                tipo: "Reclamo",
                cantidad: 3,
                resueltas: 2,
                pendientes: 1,
                efectividad: 67
            },
            {
                tipo: "Solicitud",
                cantidad: 2,
                resueltas: 1,
                pendientes: 0,
                efectividad: 50
            }
        ],
        por_mes: [
            { mes: "Junio", asignadas: 15, resueltas: 12, efectividad: 80 },
            { mes: "Julio", asignadas: 20, resueltas: 16, efectividad: 80 },
            { mes: "Agosto", asignadas: 18, resueltas: 12, efectividad: 67 }
        ]
    };

    const cargarEstadisticas = async () => {
        try {
            setCargando(true);
            
            const urlServicio = URLS.URL_BASE + "/funcionario/estadisticas/detalladas";
            // const respuesta = await ServicioGet.peticionGet(urlServicio);
            
            // Simular carga de datos
            await new Promise(resolve => setTimeout(resolve, 1000));
            setEstadisticas(estadisticasEjemplo);
            
        } catch (error) {
            console.error("Error al cargar estadísticas:", error);
        } finally {
            setCargando(false);
        }
    };

    const aplicarFiltro = () => {
        cargarEstadisticas();
    };

    const exportarReporte = () => {
        alert("Funcionalidad de exportación en desarrollo");
    };

    const obtenerColorEfectividad = (efectividad: number): string => {
        if (efectividad >= 80) return '#10c709';
        if (efectividad >= 60) return '#eb0f0f';
        return '#e69706';
    };

    const obtenerColorTipo = (tipo: string): string => {
        switch (tipo.toLowerCase()) {
            case 'petición': return '#F5B027';
            case 'queja': return '#F54927';
            case 'reclamo': return '#a855f7';
            case 'solicitud': return '#3b82f6';
            case 'denuncia': return '#000000';
            default: return '#6b7280';
        }
    };

    useEffect(() => {
        cargarEstadisticas();
    }, []);

    if (cargando) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
                <p className="mt-4 text-gray-600 font-medium">Cargando estadísticas...</p>
            </div>
        );
    }

    if (!estadisticas) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <svg className="w-20 h-20 text-gray-400 mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                <h4 className="text-xl font-semibold text-gray-700 mb-4">No se pudieron cargar las estadísticas</h4>
                <button
                    onClick={cargarEstadisticas}
                    className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Intentar de nuevo
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Mis Estadísticas</h2>
                    <p className="text-gray-600 mt-1">Periodo: {estadisticas.periodo}</p>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={exportarReporte}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Exportar
                    </button>
                    <button 
                        onClick={cargarEstadisticas}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Actualizar
                    </button>
                </div>
            </div>

            {/* Filtros de Periodo */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-[#1e2b39] px-6 py-4">
                    <h5 className="text-lg font-semibold text-white">Filtros de Periodo</h5>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        {/* Periodo predefinido */}
                        <div className="md:col-span-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Periodo predefinido
                            </label>
                            <select
                                name="periodo"
                                value={periodo}
                                onChange={dobleEnlace}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            >
                                <option value="mes_actual">Mes actual</option>
                                <option value="trimestre_actual">Trimestre actual</option>
                                <option value="año_actual">Año actual</option>
                                <option value="ultimos_30_dias">Últimos 30 días</option>
                                <option value="ultimos_90_dias">Últimos 90 días</option>
                                <option value="personalizado">Personalizado</option>
                            </select>
                        </div>

                        {/* Fecha inicio */}
                        <div className="md:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Fecha inicio
                            </label>
                            <input
                                type="date"
                                name="fechaInicio"
                                value={fechaInicio}
                                onChange={dobleEnlace}
                                disabled={periodo !== 'personalizado'}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                            />
                        </div>

                        {/* Fecha fin */}
                        <div className="md:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Fecha fin
                            </label>
                            <input
                                type="date"
                                name="fechaFin"
                                value={fechaFin}
                                onChange={dobleEnlace}
                                disabled={periodo !== 'personalizado'}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                            />
                        </div>

                        {/* Botón aplicar */}
                        <div className="md:col-span-2 flex items-end">
                            <button
                                onClick={aplicarFiltro}
                                className="w-full px-4 py-2.5 text-sm font-medium text-white bg-[#f39200] rounded-lg hover:bg-[#d17c00] transition-colors"
                            >
                                Aplicar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Resumen General */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                    <h3 className="text-3xl font-bold text-blue-600 mb-1">{estadisticas.total_asignadas}</h3>
                    <p className="text-sm text-gray-600">Total Asignadas</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                    <h3 className="text-3xl font-bold text-green-600 mb-1">{estadisticas.resueltas}</h3>
                    <p className="text-sm text-gray-600">Resueltas</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                    <h3 className="text-3xl font-bold text-yellow-600 mb-1">{estadisticas.pendientes}</h3>
                    <p className="text-sm text-gray-600">Pendientes</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                    <h3 className="text-3xl font-bold text-cyan-600 mb-1">{estadisticas.en_proceso}</h3>
                    <p className="text-sm text-gray-600">En Proceso</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                    <h3 className="text-3xl font-bold text-red-600 mb-1">{estadisticas.vencidas}</h3>
                    <p className="text-sm text-gray-600">Vencidas</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                    <h3 className="text-3xl font-bold mb-1" style={{color: obtenerColorEfectividad(estadisticas.efectividad)}}>
                        {estadisticas.efectividad}%
                    </h3>
                    <p className="text-sm text-gray-600">Efectividad</p>
                </div>
            </div>

            {/* Estadísticas por Tipo y Rendimiento por Mes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Estadísticas por Tipo */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-[#1e2b39] px-6 py-4">
                        <h5 className="text-lg font-semibold text-white">Estadísticas por Tipo de PQRSD</h5>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Tipo</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">Total</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">Resueltas</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">Pendientes</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">Efectividad</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {estadisticas.por_tipo.map((tipo, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <BadgeCustom text={tipo.tipo} bgColor={obtenerColorTipo(tipo.tipo)} />
                                        </td>
                                        <td className="px-6 py-4 text-center font-semibold text-gray-900">{tipo.cantidad}</td>
                                        <td className="px-6 py-4 text-center text-green-600 font-medium">{tipo.resueltas}</td>
                                        <td className="px-6 py-4 text-center text-yellow-600 font-medium">{tipo.pendientes}</td>
                                        <td className="px-6 py-4 text-center">
                                            <BadgeCustom text={`${tipo.efectividad}%`} bgColor={obtenerColorEfectividad(tipo.efectividad)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Rendimiento por Mes */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-[#1e2b39] px-6 py-4">
                        <h5 className="text-lg font-semibold text-white">Rendimiento por Mes</h5>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Mes</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">Asignadas</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">Resueltas</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">Efectividad</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {estadisticas.por_mes.map((mes, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-semibold text-gray-900">{mes.mes}</td>
                                        <td className="px-6 py-4 text-center text-gray-700">{mes.asignadas}</td>
                                        <td className="px-6 py-4 text-center text-green-600 font-medium">{mes.resueltas}</td>
                                        <td className="px-6 py-4 text-center">
                                            <BadgeCustom text={`${mes.efectividad}%`} bgColor={obtenerColorEfectividad(mes.efectividad)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Métricas Adicionales */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Métricas de Tiempo */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-[#1e2b39] px-6 py-4">
                        <h5 className="text-lg font-semibold text-white">Métricas de Tiempo</h5>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-2 gap-6 text-center mb-6">
                            <div>
                                <h4 className="text-3xl font-bold text-cyan-600 mb-1">{estadisticas.tiempo_promedio_respuesta}</h4>
                                <p className="text-sm text-gray-600">Días promedio de respuesta</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold text-yellow-600 mb-1">15</h4>
                                <p className="text-sm text-gray-600">Días máximos permitidos</p>
                            </div>
                        </div>
                        
                        <hr className="my-4 border-gray-200" />
                        
                        <div className="relative pt-1">
                            <div className="overflow-hidden h-6 mb-2 text-xs flex rounded-lg bg-gray-200">
                                <div 
                                    style={{width: `${(estadisticas.tiempo_promedio_respuesta / 15) * 100}%`}}
                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-cyan-500 font-medium"
                                >
                                    {estadisticas.tiempo_promedio_respuesta} días
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">Tiempo promedio vs. máximo permitido</p>
                        </div>
                    </div>
                </div>

                {/* Estado General */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-[#1e2b39] px-6 py-4">
                        <h5 className="text-lg font-semibold text-white">Estado General</h5>
                    </div>
                    <div className="p-6 space-y-4">
                        {/* Resueltas */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700">Resueltas</span>
                                <span className="text-sm font-semibold text-gray-900">
                                    {Math.round((estadisticas.resueltas / estadisticas.total_asignadas) * 100)}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div 
                                    className="bg-green-500 h-3 rounded-full transition-all duration-500"
                                    style={{width: `${(estadisticas.resueltas / estadisticas.total_asignadas) * 100}%`}}
                                ></div>
                            </div>
                        </div>

                        {/* En Proceso */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700">En Proceso</span>
                                <span className="text-sm font-semibold text-gray-900">
                                    {Math.round((estadisticas.en_proceso / estadisticas.total_asignadas) * 100)}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div 
                                    className="bg-cyan-500 h-3 rounded-full transition-all duration-500"
                                    style={{width: `${(estadisticas.en_proceso / estadisticas.total_asignadas) * 100}%`}}
                                ></div>
                            </div>
                        </div>

                        {/* Pendientes */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700">Pendientes</span>
                                <span className="text-sm font-semibold text-gray-900">
                                    {Math.round((estadisticas.pendientes / estadisticas.total_asignadas) * 100)}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-ful  l h-3">
                                <div 
                                    className="bg-yellow-500 h-3 rounded-full transition-all duration-500"
                                    style={{width: `${(estadisticas.pendientes / estadisticas.total_asignadas) * 100}%`}}
                                ></div>
                            </div>
                        </div>

                        {/* Vencidas */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700">Vencidas</span>
                                <span className="text-sm font-semibold text-gray-900">
                                    {Math.round((estadisticas.vencidas / estadisticas.total_asignadas) * 100)}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div 
                                    className="bg-red-500 h-3 rounded-full transition-all duration-500"
                                    style={{width: `${(estadisticas.vencidas / estadisticas.total_asignadas) * 100}%`}}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recomendaciones */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-[#1e2b39] px-6 py-4">
                    <h5 className="text-lg font-semibold text-white flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                        </svg>
                        Recomendaciones
                    </h5>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {estadisticas.efectividad < 70 && (
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <p className="text-sm font-semibold text-yellow-800">Mejorar efectividad:</p>
                                        <p className="text-sm text-yellow-700 mt-1">
                                            Su efectividad está por debajo del 70%. Considere revisar los procesos de respuesta.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {estadisticas.vencidas > 0 && (
                            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <p className="text-sm font-semibold text-red-800">PQRSD vencidas:</p>
                                        <p className="text-sm text-red-700 mt-1">
                                            Tiene {estadisticas.vencidas} PQRSD vencidas. Priorice su atención inmediata.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {estadisticas.tiempo_promedio_respuesta > 10 && (
                            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <p className="text-sm font-semibold text-blue-800">Optimizar tiempos:</p>
                                        <p className="text-sm text-blue-700 mt-1">
                                            El tiempo promedio de respuesta es alto. Considere optimizar sus procesos.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {estadisticas.efectividad >= 80 && estadisticas.vencidas === 0 && (
                            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <p className="text-sm font-semibold text-green-800">Excelente trabajo:</p>
                                        <p className="text-sm text-green-700 mt-1">
                                            Mantiene una alta efectividad sin PQRSD vencidas. ¡Continúe así!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EstadisticasFuncionario;