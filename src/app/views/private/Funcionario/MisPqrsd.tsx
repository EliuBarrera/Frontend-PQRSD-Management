import { Col, Form, Row, Button, Table, Badge, Card } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { URLS } from "../../../utilities/domains/Urls"
import { useEffect, useState } from "react"
import { ServicioGet } from "../../../services/ServicioGet"
import { useFormulario } from "../../../utilities/hocks/useFormulario"
import { BadgeCustom } from "../../../components/shared/BadgeCustom"

// Interfaces para tipado
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
    dependencia: string;
    funcionario_asignado: string;
}

interface EstadisticasFuncionario {
    asignadas: number;
    pendientes: number;
    en_proceso: number;
    resueltas: number;
    vencidas: number;
}

interface FiltrosBusqueda {
    palabraClave: string;
    estado: string;
    tipo: string;
    prioridad: string;
}

export const MisPqrsd = () => {
    const [arrPqrsd, setArrPqrsd] = useState<PQRSD[]>([]);
    const [estadisticas, setEstadisticas] = useState<EstadisticasFuncionario>({
        asignadas: 0,
        pendientes: 0,
        en_proceso: 0,
        resueltas: 0,
        vencidas: 0
    });
    const [totalResultados, setTotalResultados] = useState<number>(0);

    // Hook personalizado para manejo del formulario de filtros
    let { palabraClave, estado, tipo, prioridad, dobleEnlace, objeto } = 
        useFormulario<FiltrosBusqueda>({
            palabraClave: "",
            estado: "",
            tipo: "",
            prioridad: ""
        });

    const navegacion = useNavigate();

    // Datos de ejemplo basados en el HTML
    const pqrsdEjemplo: PQRSD[] = [
        {
            id: 842,
            numero_radicado: "PQ-0842",
            tipo: "Petición",
            peticionario: "Carlos Rodríguez",
            asunto: "Solicitud de información sobre proyectos de infraestructura",
            fecha_radicacion: "15/08/2023",
            fecha_vencimiento: "25/08/2023",
            estado: "vencida",
            prioridad: "alta",
            dependencia: "Secretaría de Gobierno",
            funcionario_asignado: "Juan Pérez"
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
            prioridad: "media",
            dependencia: "Secretaría de Gobierno",
            funcionario_asignado: "Juan Pérez"
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
            prioridad: "baja",
            dependencia: "Secretaría de Gobierno",
            funcionario_asignado: "Juan Pérez"
        },
        {
            id: 845,
            numero_radicado: "PQ-0845",
            tipo: "Solicitud",
            peticionario: "Javier López",
            asunto: "Solicitud de apoyo para evento cultural",
            fecha_radicacion: "18/08/2023",
            fecha_vencimiento: "02/09/2023",
            estado: "resuelta",
            prioridad: "baja",
            dependencia: "Secretaría de Gobierno",
            funcionario_asignado: "Juan Pérez"
        },
        {
            id: 846,
            numero_radicado: "PQ-0846",
            tipo: "Denuncia",
            peticionario: "Ana Martínez",
            asunto: "Denuncia por presunta irregularidad en contratación",
            fecha_radicacion: "19/08/2023",
            fecha_vencimiento: "03/09/2023",
            estado: "pendiente",
            prioridad: "alta",
            dependencia: "Secretaría de Gobierno",
            funcionario_asignado: "Juan Pérez"
        }
    ];

    const cargarDatos = async () => {
        try {
            // Simular carga desde API
            const urlServicio = URLS.URL_BASE + "/funcionario/pqrsd";
            // const respuesta = await ServicioGet.peticionGet(urlServicio);
            
            // Por ahora usamos datos de ejemplo
            setArrPqrsd(pqrsdEjemplo);
            setTotalResultados(pqrsdEjemplo.length);
            
            // Calcular estadísticas
            const stats = pqrsdEjemplo.reduce((acc, pqrsd) => {
                acc.asignadas++;
                switch(pqrsd.estado) {
                    case 'pendiente': acc.pendientes++; break;
                    case 'proceso': acc.en_proceso++; break;
                    case 'resuelta': acc.resueltas++; break;
                    case 'vencida': acc.vencidas++; break;
                }
                return acc;
            }, { asignadas: 0, pendientes: 0, en_proceso: 0, resueltas: 0, vencidas: 0 });
            
            setEstadisticas(stats);
        } catch (error) {
            console.error("Error al cargar datos:", error);
            setArrPqrsd([]);
            setTotalResultados(0);
        }
    };

    const filtrarPqrsd = () => {
        let resultados = pqrsdEjemplo;

        if (objeto.palabraClave) {
            const termino = objeto.palabraClave.toLowerCase();
            resultados = resultados.filter(pqrsd => 
                pqrsd.numero_radicado.toLowerCase().includes(termino) ||
                pqrsd.peticionario.toLowerCase().includes(termino) ||
                pqrsd.asunto.toLowerCase().includes(termino)
            );
        }

        if (objeto.estado) {
            resultados = resultados.filter(pqrsd => pqrsd.estado === objeto.estado);
        }

        if (objeto.tipo) {
            resultados = resultados.filter(pqrsd => pqrsd.tipo.toLowerCase().includes(objeto.tipo));
        }

        if (objeto.prioridad) {
            resultados = resultados.filter(pqrsd => pqrsd.prioridad === objeto.prioridad);
        }

        setArrPqrsd(resultados);
        setTotalResultados(resultados.length);
    };

    const limpiarFiltros = () => {
        objeto.palabraClave = "";
        objeto.estado = "";
        objeto.tipo = "";
        objeto.prioridad = "";
        setArrPqrsd(pqrsdEjemplo);
        setTotalResultados(pqrsdEjemplo.length);
    };

    const verDetalle = (id: number) => {
        navegacion(`/dash/funcionario/pqrsd/detalle/${id}`);
    };

    const responderPqrsd = (id: number) => {
        navegacion(`/dash/funcionario/pqrsd/responder/${id}`);
    };

    const reclasificarPqrsd = (id: number) => {
        navegacion(`/dash/funcionario/pqrsd/reclasificar/${id}`);
    };

    const verRespuesta = (id: number) => {
        navegacion(`/dash/funcionario/pqrsd/respuesta/${id}`);
    };

    const obtenerColorEstado = (estado: string): string => {
        switch (estado.toLowerCase()) {
            case 'pendiente': return '#F5B027';
            case 'proceso': return '#ccf527ff';
            case 'resuelta': return '#00862bff';
            case 'vencida': return '#b44747ff';
            default: return '#6366f1';
        }
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

    const obtenerColorPrioridad = (prioridad: string): string => {
        switch (prioridad) {
            case 'alta': return '#dc2626';
            case 'media': return '#f59e0b';
            case 'baja': return '#06b6d4';
            default: return '#6b7280';
        }
    };

    const esVencida = (fechaVencimiento: string, estado: string): boolean => {
        if (estado === 'resuelta') return false;
        const hoy = new Date();
        const vencimiento = new Date(fechaVencimiento.split('/').reverse().join('-'));
        return vencimiento < hoy;
    };

    const venceHoy = (fechaVencimiento: string, estado: string): boolean => {
        if (estado === 'resuelta') return false;
        const hoy = new Date().toDateString();
        const vencimiento = new Date(fechaVencimiento.split('/').reverse().join('-')).toDateString();
        return vencimiento === hoy;
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-900">Mis PQRSD Asignadas</h2>
                <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Exportar
                    </button>
                    <button 
                        onClick={cargarDatos}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Actualizar
                    </button>
                </div>
            </div>

            {/* Estadísticas Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {/* Card 1: Asignadas */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Asignadas a mí</p>
                            <h3 className="text-3xl font-bold text-gray-900">{estadisticas.asignadas}</h3>
                        </div>
                        <div className="p-3 bg-gray-100 rounded-lg">
                            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-sm text-blue-600 mt-3">Todas mis PQRSD</p>
                </div>

                {/* Card 2: Pendientes */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Pendientes</p>
                            <h3 className="text-3xl font-bold text-gray-900">{estadisticas.pendientes}</h3>
                        </div>
                        <div className="p-3 bg-yellow-100 rounded-lg">
                            <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-sm text-red-600 mt-3 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        2 vencen hoy
                    </p>
                </div>

                {/* Card 3: En Proceso */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">En Proceso</p>
                            <h3 className="text-3xl font-bold text-gray-900">{estadisticas.en_proceso}</h3>
                        </div>
                        <div className="p-3 bg-cyan-100 rounded-lg">
                            <svg className="w-6 h-6 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-sm text-cyan-600 mt-3">
                        <span className="font-semibold">
                            {estadisticas.asignadas > 0 ? Math.round((estadisticas.en_proceso / estadisticas.asignadas) * 100) : 0}%
                        </span> de mis PQRSD
                    </p>
                </div>

                {/* Card 4: Resueltas */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Resueltas</p>
                            <h3 className="text-3xl font-bold text-gray-900">{estadisticas.resueltas}</h3>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-sm text-green-600 mt-3">
                        <span className="font-semibold">
                            {estadisticas.asignadas > 0 ? Math.round((estadisticas.resueltas / estadisticas.asignadas) * 100) : 0}%
                        </span> de efectividad
                    </p>
                </div>
            </div>

            {/* Filtros de Búsqueda */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-[#1e2b39] px-6 py-4">
                    <h4 className="text-lg font-semibold text-white">Filtros de Búsqueda</h4>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        {/* Palabra clave */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Palabra clave
                            </label>
                            <input
                                type="text"
                                name="palabraClave"
                                value={palabraClave}
                                onChange={dobleEnlace}
                                placeholder="Número, asunto, peticionario..."
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                        </div>

                        {/* Estado */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Estado
                            </label>
                            <select
                                name="estado"
                                value={estado}
                                onChange={dobleEnlace}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            >
                                <option value="">Todos</option>
                                <option value="pendiente">Pendiente</option>
                                <option value="proceso">En proceso</option>
                                <option value="resuelta">Resuelta</option>
                                <option value="vencida">Vencida</option>
                            </select>
                        </div>

                        {/* Tipo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tipo
                            </label>
                            <select
                                name="tipo"
                                value={tipo}
                                onChange={dobleEnlace}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            >
                                <option value="">Todos</option>
                                <option value="peticion">Petición</option>
                                <option value="queja">Queja</option>
                                <option value="reclamo">Reclamo</option>
                                <option value="solicitud">Solicitud</option>
                                <option value="denuncia">Denuncia</option>
                            </select>
                        </div>

                        {/* Prioridad */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Prioridad
                            </label>
                            <select
                                name="prioridad"
                                value={prioridad}
                                onChange={dobleEnlace}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            >
                                <option value="">Todas</option>
                                <option value="alta">Alta</option>
                                <option value="media">Media</option>
                                <option value="baja">Baja</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={limpiarFiltros}
                            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Limpiar
                        </button>
                        <button
                            onClick={filtrarPqrsd}
                            className="px-5 py-2.5 text-sm font-medium text-white bg-[#f39200] rounded-lg hover:bg-[#d17c00] transition-colors"
                        >
                            Aplicar Filtros
                        </button>
                    </div>
                </div>
            </div>

            {/* Lista de PQRSD */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-[#1e2b39] px-6 py-4 flex justify-between items-center">
                    <h4 className="text-lg font-semibold text-white">Mis PQRSD Asignadas</h4>
                    <div className="flex gap-2 bg-yellow-500 rounded-lg p-1">
                        <button className="p-2 text-white hover:bg-yellow-600 rounded transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button className="p-2 text-white hover:bg-yellow-600 rounded transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    # Radicado
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    Tipo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    Peticionario
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    Asunto
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    Fecha radicación
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    Plazo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {arrPqrsd.length > 0 ? (
                                arrPqrsd.map((pqrsd) => (
                                    <tr key={pqrsd.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                            {pqrsd.numero_radicado}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <BadgeCustom text={pqrsd.tipo} bgColor={obtenerColorTipo(pqrsd.tipo)} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {pqrsd.peticionario}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
                                            <span title={pqrsd.asunto}>
                                                {pqrsd.asunto.length > 50 
                                                    ? pqrsd.asunto.substring(0, 50) + "..." 
                                                    : pqrsd.asunto
                                                }
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {pqrsd.fecha_radicacion}
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                                            esVencida(pqrsd.fecha_vencimiento, pqrsd.estado) 
                                                ? 'text-red-600 font-semibold' 
                                                : venceHoy(pqrsd.fecha_vencimiento, pqrsd.estado) 
                                                    ? 'text-yellow-600 font-semibold' 
                                                    : 'text-gray-700'
                                        }`}>
                                            {pqrsd.fecha_vencimiento}
                                            {esVencida(pqrsd.fecha_vencimiento, pqrsd.estado) && ' (Vencido)'}
                                            {venceHoy(pqrsd.fecha_vencimiento, pqrsd.estado) && ' (Hoy)'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <BadgeCustom text={pqrsd.estado} bgColor={obtenerColorEstado(pqrsd.estado)} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => verDetalle(pqrsd.id)}
                                                    title="Ver detalles"
                                                    className="p-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
                                                {pqrsd.estado !== 'resuelta' && (
                                                    <>
                                                        <button
                                                            onClick={() => responderPqrsd(pqrsd.id)}
                                                            title="Responder"
                                                            className="p-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => reclasificarPqrsd(pqrsd.id)}
                                                            title="Solicitar reclasificación"
                                                            className="p-2 text-yellow-600 border border-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                            </svg>
                                                        </button>
                                                    </>
                                                )}
                                                {pqrsd.estado === 'resuelta' && (
                                                    <button
                                                        onClick={() => verRespuesta(pqrsd.id)}
                                                        title="Ver respuesta"
                                                        className="p-2 text-cyan-600 border border-cyan-600 rounded-lg hover:bg-cyan-50 transition-colors"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            <p className="text-lg font-medium">No se encontraron PQRSD asignadas</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer con paginación */}
                {arrPqrsd.length > 0 && (
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                        <nav className="flex justify-center">
                            <ul className="flex items-center gap-2">
                                <li>
                                    <button 
                                        disabled
                                        className="px-4 py-2 text-sm font-medium text-gray-400 bg-white border border-gray-300 rounded-lg cursor-not-allowed"
                                    >
                                        Anterior
                                    </button>
                                </li>
                                <li>
                                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg">
                                        1
                                    </button>
                                </li>
                                <li>
                                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                        2
                                    </button>
                                </li>
                                <li>
                                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                        Siguiente
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MisPqrsd