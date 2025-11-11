import { Col, Form, Row, Container, Alert, Table, Card, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useFormulario } from "../../../utilities/hocks/useFormulario";
import { ServicioGet } from "../../../services/ServicioGet";
import { crearMensaje } from "../../../utilities/functions/mensajes";
import { URLS } from "../../../utilities/domains/Urls";
import '../../../styles/pqrsdConsultar.css';
import { BadgeCustom } from "../../../components/shared/BadgeCustom";
import Header from "@/app/components/contenedor/Header";
import Footer from "@/app/components/contenedor/Footer";

interface PqrsdResult {
  id: number;
  numeroRadicado: string;
  tipo?: {
    id: number;
    nombre: string;
    plazoDias: number;
  } | null;
  estado?: {
    id: number;
    nombre: string;
  } | null;
  descripcion: string;
  canalRecepcion: string;
  fechaRadicacion: string;
  fechaAsignacion?: string;
  fechaVencimiento?: string;
  fechaRespuesta?: string;
  funcionarioAsignado?: {
    id: number;
    nombre: string;
    cargo: string;
  } | null;
  dependenciaAsignada?: {
    id: number;
    nombre: string;
  } | null;
  numeroOficio?: string;
  mecanismoRespuesta?: string;
  observaciones?: string;
  requiereReclasificacion: boolean;
  estaVencida: boolean;
  diasRestantes?: number;
  // IDs para compatibilidad
  tipoId?: number;
  estadoId?: number;
  funcionarioAsignadoId?: number;
  dependenciaAsignadaId?: number;
}

interface ApiResponse {
  mensaje: string;
  usuario: {
    id: number;
    tipo: string;
    nombre: string;
    identificacion: string;
    contacto?: string;
    correo?: string;
    direccion?: string;
    telefono?: string;
    fechaRegistro: string;
  };
  pqrsds: PqrsdResult[];
  estadisticas: {
    totalPQRSD: number;
    vencidas: number;
    respondidas: number;
    pendientes: number;
  };
  total: number;
}

export const PqrsdConsultar = () => {
  const [resultados, setResultados] = useState<PqrsdResult[]>([]);
  const [usuarioInfo, setUsuarioInfo] = useState<ApiResponse['usuario'] | null>(null);
  const [estadisticas, setEstadisticas] = useState<ApiResponse['estadisticas'] | null>(null);
  const [mostrarResultados, setMostrarResultados] = useState<boolean>(false);
  const [enProceso, setEnProceso] = useState<boolean>(false);
  const [sinResultados, setSinResultados] = useState<boolean>(false);
  const [cedulaConsulta, setCedulaConsulta] = useState<string>("");

  const [pqrsdSeleccionada, setPqrsdSeleccionada] = useState<PqrsdResult | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  type formulario = React.FormEvent<HTMLFormElement>;
  
  let { identificacion, dobleEnlace } = useFormulario<any>({
    identificacion: ""
  });

  // Función para consultar PQRSD por cédula
  const consultarPqrsd = async (frm: formulario) => {
    frm.preventDefault();
    setEnProceso(true);
    setMostrarResultados(false);
    setSinResultados(false);

    const objFrm = frm.currentTarget;
    objFrm.classList.add("was-validated");

    if (objFrm.checkValidity() === false) {
      frm.preventDefault();
      frm.stopPropagation();
      setEnProceso(false);
      return;
    }

    // Validación de solo números
    if (!/^\d+$/.test(cedulaConsulta)) {
      crearMensaje("error", "Solo se permiten números en el campo de cédula");
      setEnProceso(false);
      return;
    }

    try {
      const urlServicio = URLS.URL_BASE + URLS.PQRSD_BUSCAR_IDENTIFICACION.replace(':identificacion', cedulaConsulta);
      const respuesta: ApiResponse = await ServicioGet.peticionGet(urlServicio);

      console.log('Respuesta del servidor:', respuesta); // Para debugging
      
      if (respuesta && respuesta.pqrsds && respuesta.pqrsds.length > 0) {
        setResultados(respuesta.pqrsds);
        setUsuarioInfo(respuesta.usuario);
        setEstadisticas(respuesta.estadisticas);
        setMostrarResultados(true);
        setSinResultados(false);
        crearMensaje("success", `Se encontraron ${respuesta.total} PQRSD(s) para ${respuesta.usuario.nombre}`);
        console.log(respuesta.pqrsds);
      } else if (respuesta && respuesta.total === 0) {
        // Usuario existe pero no tiene PQRSD
        setResultados([]);
        setUsuarioInfo(respuesta.usuario);
        setEstadisticas(respuesta.estadisticas);
        setMostrarResultados(false);
        setSinResultados(true);
        crearMensaje("info", `Usuario ${respuesta.usuario.nombre} encontrado, pero no tiene PQRSD registradas`);
      } else {
        // Usuario no existe
        setResultados([]);
        setUsuarioInfo(null);
        setEstadisticas(null);
        setMostrarResultados(false);
        setSinResultados(true);
        crearMensaje("warning", "No se encontró ningún usuario con la cédula ingresada");
      }
    } catch (error: any) {
      console.error("Error consultando PQRSD:", error);
      setResultados([]);
      setUsuarioInfo(null);
      setEstadisticas(null);
      setMostrarResultados(false);
      setSinResultados(true);
      
      // Manejo de errores específicos
      if (error.response?.status === 404) {
        crearMensaje("warning", "Usuario no encontrado con la cédula ingresada");
      } else {
        crearMensaje("error", "Error al consultar las PQRSD. Inténtelo nuevamente.");
      }
    } finally {
      setEnProceso(false);
    }
  };

  // Función para manejar solo números en el input
  const handleCedulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    // Solo permitir números
    if (/^\d*$/.test(valor)) {
      setCedulaConsulta(valor);
    }
  };

  // Función para obtener el color del estado
  const obtenerColorEstado = (estado: string): string => {
    switch (estado.toLowerCase()) {
      case 'pendiente': 
        return '#F5B027';
      case 'proceso': 
        return '#916829ff';
      case 'resuelta': 
        return '#00862bff';
      case 'vencida': 
        return '#db1c1cff';
      case 'radicada': 
        return 'gray';
      default: return 'primary';
    }
  };

  const obtenerColorTipo = (tipo: string): string => {
    const tipoNormalizado = tipo.toLowerCase().trim();
    
    // Peticiones (variantes en amarillo/naranja)
    if (tipoNormalizado.includes('petición de interés general')) return '#F5B027';
    if (tipoNormalizado.includes('petición de documentos')) return '#FF9500';
    if (tipoNormalizado.includes('petición de salud') || tipoNormalizado.includes('petición de seguridad')) return '#FF6B00';
    if (tipoNormalizado.includes('petición entre autoridades')) return '#FFA726';
    if (tipoNormalizado.includes('petición')) return '#F39200'; // Color principal IdeaPro
    
    // Consultas (azul claro)
    if (tipoNormalizado.includes('consulta')) return '#2196F3';
    
    // Quejas (rojo)
    if (tipoNormalizado.includes('queja')) return '#F54927';
    
    // Reclamos (morado)
    if (tipoNormalizado.includes('reclamo')) return '#9C27B0';
    
    // Solicitudes (azul oscuro - color IdeaPro)
    if (tipoNormalizado.includes('solicitud de concejal')) return '#1565C0';
    if (tipoNormalizado.includes('solicitud')) return '#1E2B39'; // Color secundario IdeaPro
    
    // Denuncias (negro/gris oscuro)
    if (tipoNormalizado.includes('denuncia')) return '#212121';
    
    // Sugerencias (verde)
    if (tipoNormalizado.includes('sugerencia')) return '#4CAF50';
    
    // Por defecto
    return '#6c757d'; // Bootstrap secondary
  };

  // Función para formatear fecha
  const formatearFecha = (fecha: string) => {
    if (!fecha) return 'No definida';
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Función para limpiar búsqueda
  const limpiarBusqueda = () => {
    const form = document.getElementById('form-consultar') as HTMLFormElement;
    if (form) {
      form.reset();
      form.classList.remove("was-validated");
    }
    setCedulaConsulta("");
    setResultados([]);
    setUsuarioInfo(null);
    setEstadisticas(null);
    setMostrarResultados(false);
    setSinResultados(false);
  };

  const abrirModal = (pqrsd: PqrsdResult) => {
    setPqrsdSeleccionada(pqrsd);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setPqrsdSeleccionada(null);
  };

return (
    <div className="min-h-screen">
      <Header/>
      <main className="flex-1 pt-10 pb-32 px-6">
        <section className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
          <Container className="py-10 px-8">
            <Row className="justify-content-center">
              <Col lg={10} xl={8}>
                <div className="rounded-2xl overflow-hidden shadow-lg mt-4">
                  
                  {/* HEADER SECTION */}
                  <div className="bg-gradient-to-r from-[#f39200] to-[#ffb84d] py-12 px-8 text-center rounded-t-2xl -mx-8 -mt-8 mb-8 relative">
                    {/* Breadcrumb */}
                    <nav aria-label="breadcrumb" className="flex items-center justify-center gap-2 mb-4 text-sm text-white">
                      <Link to="/" className="flex items-center gap-1 hover:underline">
                        <i className="fas fa-home"></i>
                        <span>Inicio</span>
                      </Link>
                      <span>/</span>
                      <span className="font-semibold">Consultar</span>
                    </nav>
                    
                    <h1 className="text-4xl font-bold mb-3 text-[#1e2b39] flex items-center justify-center gap-3">
                      <i className="fas fa-search text-[#f39200]"></i>
                      Consultar Estado PQRSD
                    </h1>
                    <p className="text-[#1e2b39] text-lg opacity-90">
                      Ingrese su número de cédula para consultar el estado de sus solicitudes
                    </p>
                  </div>

                  {/* FORMULARIO DE BÚSQUEDA */}
                  <div className="bg-white p-8 rounded-xl border border-gray-200 mb-6">
                    <h3 className="text-xl font-bold text-[#1e2b39] mb-6 pb-3 border-b-4 border-[#f39200] flex items-center gap-2">
                      <i className="fas fa-user-check"></i>
                      Búsqueda por Cédula
                    </h3>
                    
                    <Form 
                      id="form-consultar"
                      onSubmit={consultarPqrsd}
                      noValidate
                    >
                      <Row className="justify-content-center">
                        <Col md={8} lg={6}>
                          <div className="mb-6">
                            <Form.Label className="block text-sm font-semibold text-gray-700 mb-2">
                              Número de Cédula
                              <span className="text-red-500 ml-1">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              value={cedulaConsulta}
                              onChange={handleCedulaChange}
                              className="w-full px-4 py-3 text-black border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#f39200] focus:ring-2 focus:ring-[#f39200] focus:ring-opacity-20 transition-all"
                              name="identificacion"
                              required
                              placeholder="Ingrese su número de cédula"
                              minLength={6}
                              maxLength={15}
                              disabled={enProceso}
                            />
                            <Form.Control.Feedback type="invalid">
                              Por favor ingrese un número de cédula válido (6-15 dígitos)
                            </Form.Control.Feedback>
                            <Form.Text className="text-sm text-gray-500 mt-2 block">
                              Solo números, sin espacios ni caracteres especiales
                            </Form.Text>
                          </div>
                        </Col>
                      </Row>

                      {/* BOTONES DE BÚSQUEDA */}
                      <div className="flex justify-center gap-4 mt-6">
                        <button 
                          type="button"
                          onClick={limpiarBusqueda}
                          className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 hover:shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                          disabled={enProceso}
                        >
                          <i className="fas fa-eraser"></i>
                          Limpiar
                        </button>
                        
                        <button 
                          type="submit" 
                          className="px-6 py-3 bg-[#f39200] text-white rounded-lg font-semibold hover:bg-[#d17c00] hover:shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                          disabled={enProceso || cedulaConsulta.length < 6}
                        >
                          {enProceso ? (
                            <>
                              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Consultando...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-search"></i>
                              Consultar PQRSD
                            </>
                          )}
                        </button>
                      </div>
                    </Form>
                  </div>

                  {/* INFORMACIÓN DEL USUARIO */}
                  {usuarioInfo && (
                    <div className="mb-6">
                      <Card className="border-2 border-blue-500 rounded-xl overflow-hidden">
                        <Card.Header className="bg-[#1e2b39] py-4">
                          <h5 className="mb-0 text-white text-lg font-bold flex items-center gap-2">
                            <i className="fas fa-user"></i>
                            Información del Usuario
                          </h5>
                        </Card.Header>
                        <Card.Body className="p-6">
                          <Row>
                            <Col className="grid grid-cols-3">
                              <p className="mb-2"><strong className="text-gray-700">Nombre:</strong> <span className="text-gray-900">{usuarioInfo.nombre}</span></p>
                              <p className="mb-2"><strong className="text-gray-700">Identificación:</strong> <span className="text-gray-900">{usuarioInfo.identificacion}</span></p>
                              <p className="mb-2"><strong className="text-gray-700">Tipo:</strong> <span className="text-gray-900">{usuarioInfo.tipo}</span></p>
                            </Col>
                            <Col className="grid grid-cols-3">
                              {usuarioInfo.correo && <p className="mb-2"><strong className="text-gray-700">Correo:</strong> <span className="text-gray-900">{usuarioInfo.correo}</span></p>}
                              {usuarioInfo.telefono && <p className="mb-2"><strong className="text-gray-700">Teléfono:</strong> <span className="text-gray-900">{usuarioInfo.telefono}</span></p>}
                              <p className="mb-2"><strong className="text-gray-700">Registro:</strong> <span className="text-gray-900">{formatearFecha(usuarioInfo.fechaRegistro)}</span></p>
                            </Col>
                          </Row>
                          
                          {estadisticas && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <h6 className="font-bold text-gray-800 mb-3">Resumen PQRSD:</h6>
                              <Row>
                                <div className="grid grid-cols-2">
                                  <Col>
                                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                                      <div className="text-3xl font-bold text-blue-600">{estadisticas.totalPQRSD}</div>
                                      <small className="text-gray-600 font-medium">Total</small>
                                    </div>
                                  </Col>
                                  <Col>
                                    <div className="text-center p-3 bg-green-50 rounded-lg">
                                      <div className="text-3xl font-bold text-green-600">{estadisticas.respondidas}</div>
                                      <small className="text-gray-600 font-medium">Respondidas</small>
                                    </div>
                                  </Col>
                                </div>

                                <div className="grid grid-cols-2">
                                  <Col>
                                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                                      <div className="text-3xl font-bold text-yellow-600">{estadisticas.pendientes}</div>
                                      <small className="text-gray-600 font-medium">Pendientes</small>
                                    </div>
                                  </Col>
                                  <Col>
                                    <div className="text-center p-3 bg-red-50 rounded-lg">
                                      <div className="text-3xl font-bold text-red-600">{estadisticas.vencidas}</div>
                                      <small className="text-gray-600 font-medium">Vencidas</small>
                                    </div>
                                  </Col>
                                </div>
                              </Row>
                            </div>
                          )}
                        </Card.Body>
                      </Card>
                    </div>
                  )}

                  {/* RESULTADOS DE LA BÚSQUEDA */}
                  {mostrarResultados && resultados.length > 0 && (
                    <div className="bg-white p-8 rounded-xl border border-gray-200 mb-6">
                      <h3 className="text-xl font-bold text-[#1e2b39] mb-6 pb-3 border-b-4 border-[#f39200] flex items-center gap-2">
                        <i className="fas fa-list-alt"></i>
                        PQRSD Registradas ({resultados.length})
                      </h3>

                      {/* VISTA PARA ESCRITORIO - TABLA */}
                      <div className="d-none d-md-block overflow-x-auto">
                        <Table responsive hover className="min-w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Radicado</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tipo</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fecha Radicación</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fecha Vencimiento</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Dependencia</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {resultados.map((pqrsd, index) => (
                              <tr 
                                key={pqrsd.id || index} 
                                onClick={() => abrirModal(pqrsd)}
                                className="hover:bg-blue-50 transition-colors cursor-pointer"
                              >
                                <td className="px-4 py-3">
                                  <strong className="text-blue-600 font-semibold">{pqrsd.numeroRadicado || pqrsd.numeroOficio || `PQRSD-${pqrsd.id}`}</strong>
                                </td>
                                <td className="px-4 py-3">
                                  <BadgeCustom 
                                    text={pqrsd.tipo?.nombre || 'No definido'} 
                                    bgColor={obtenerColorTipo(pqrsd.tipo?.nombre || '')} 
                                  />
                                </td>
                                <td className="px-4 py-3">
                                  <BadgeCustom 
                                    text={pqrsd.estado?.nombre || 'No definido'} 
                                    bgColor={obtenerColorEstado(pqrsd.estado?.nombre || '')} 
                                  />
                                </td>
                                <td className="px-4 py-3 text-gray-700">{formatearFecha(pqrsd.fechaRadicacion)}</td>
                                <td className="px-4 py-3">
                                  <div className="flex flex-col">
                                    <span className="text-gray-700">{formatearFecha(pqrsd.fechaVencimiento || '')}</span>
                                    {pqrsd.diasRestantes !== undefined && (
                                      <small className={pqrsd.diasRestantes < 0 ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
                                        {pqrsd.diasRestantes < 0 
                                          ? `Vencida hace ${Math.abs(pqrsd.diasRestantes)} días`
                                          : `${pqrsd.diasRestantes} días restantes`
                                        }
                                      </small>
                                    )}
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-gray-700">{pqrsd.dependenciaAsignada?.nombre || 'Sin asignar'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  )}

                  {/* MENSAJE CUANDO NO HAY RESULTADOS */}
                  {sinResultados && (
                    <div className="p-6">
                      <Alert variant="info" className="text-center border-2 border-blue-300 bg-blue-50 rounded-xl p-6">
                        <i className="fas fa-info-circle text-5xl mb-4 text-[#f39200]"></i>
                        <h5 className="text-xl font-bold text-gray-800 mb-2">
                          {usuarioInfo ? 'Usuario encontrado sin PQRSD' : 'No se encontraron resultados'}
                        </h5>
                        <p className="text-gray-700 mb-4">
                          {usuarioInfo 
                            ? `El usuario ${usuarioInfo.nombre} no tiene PQRSD registradas.`
                            : 'No hay usuarios registrados con el número de cédula ingresado.'
                          }
                          <br />
                          {usuarioInfo ? 'Puede registrar una nueva PQRSD.' : 'Verifique que el número sea correcto o registre una nueva PQRSD.'}
                        </p>
                        <Link 
                          to="/crear" 
                          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                          <i className="fas fa-plus"></i>
                          Registrar Nueva PQRSD
                        </Link>
                      </Alert>
                    </div>
                  )}
                </div>
              </Col>
            </Row>

            {/* INFORMACIÓN ADICIONAL */}
            <Row className="justify-content-center mt-6">
              <Col lg={10} xl={8}>
                <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg p-6 mb-8">
                  <h6 className="text-lg font-bold text-[#1e2b39] mb-4 flex items-center gap-2">
                    <i className="fas fa-info-circle text-[#f39200]"></i>
                    Información sobre Estados
                  </h6>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-3 p-3 bg-gray-50 rounded-lg">
                        <BadgeCustom text="Pendiente" bgColor={obtenerColorEstado("Pendiente")} />
                        <span className="text-sm text-gray-700">PQRSD recibida, pendiente de asignación</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <BadgeCustom text="Proceso" bgColor={obtenerColorEstado("Proceso")} />
                        <span className="text-sm text-gray-700">PQRSD asignada y en análisis</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-3 p-3 bg-gray-50 rounded-lg">
                        <BadgeCustom text="Resuelta" bgColor={obtenerColorEstado("Resuelta")} />
                        <span className="text-sm text-gray-700">PQRSD respondida satisfactoriamente</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <BadgeCustom text="Vencida" bgColor={obtenerColorEstado("Vencida")} />
                        <span className="text-sm text-gray-700">PQRSD que excedió el plazo de respuesta</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <Footer/>

      {/* MODAL PARA LA VENTANA */}
      <Modal 
        show={mostrarModal} 
        onHide={cerrarModal} 
        size="lg"
        centered
        backdrop="static"
        backdropClassName="modal-backdrop-custom"
        dialogClassName="modal-popup-enter modal-compact"
        contentClassName="border-0 shadow-2xl"
      >
        {pqrsdSeleccionada && (
          <>
            {/* Header del Modal con animación */}
            <div className="relative bg-gradient-to-r from-[#1e2b39] via-[#2c3e50] to-[#1e2b39] text-white px-5 py-4 overflow-hidden">
              {/* Efecto de brillo animado */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
              
              <div className="relative z-10 flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#f39200] rounded-full flex items-center justify-center shadow-lg">
                      <i className="fas fa-file-alt text-white text-lg"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Detalle de PQRSD</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded">
                          Radicado
                        </span>
                        <span className="text-sm font-bold text-[#f39200]">
                          {pqrsdSeleccionada.numeroRadicado || pqrsdSeleccionada.numeroOficio || `PQRSD-${pqrsdSeleccionada.id}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={cerrarModal}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-[#f39200] transition-all duration-300 hover:rotate-90 ml-3"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>

              {/* Indicador de estado prominente */}
              <div className="relative z-10 mt-3 flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className="text-xs font-semibold">Estado:</span>
                  <BadgeCustom 
                    text={pqrsdSeleccionada.estado?.nombre || 'No definido'} 
                    bgColor={obtenerColorEstado(pqrsdSeleccionada.estado?.nombre || '')} 
                  />
                </div>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className="text-xs font-semibold">Tipo:</span>
                  <BadgeCustom 
                    text={pqrsdSeleccionada.tipo?.nombre || 'No definido'} 
                    bgColor={obtenerColorTipo(pqrsdSeleccionada.tipo?.nombre || '')} 
                  />
                </div>
                {pqrsdSeleccionada.estaVencida && (
                  <div className="inline-flex items-center gap-2 bg-red-500 px-3 py-1.5 rounded-full animate-pulse">
                    <i className="fas fa-exclamation-triangle text-xs"></i>
                    <span className="text-xs font-bold">VENCIDA</span>
                  </div>
                )}
              </div>
            </div>

            {/* Body del Modal con scroll suave */}
            <Modal.Body className="p-0 bg-gradient-to-b from-white to-gray-50">
              <div className="p-5 max-h-[55vh] overflow-y-auto custom-scrollbar">
                {/* Tarjetas de Información Principal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 rounded-lg border-2 border-orange-200 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-2">
                      <div className="w-10 h-10 bg-[#f39200] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                        <i className="fas fa-calendar-check text-white text-sm"></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-orange-700 uppercase mb-1">Fecha Radicación</p>
                        <p className="text-base font-bold text-gray-800">{formatearFecha(pqrsdSeleccionada.fechaRadicacion)}</p>
                      </div>
                    </div>
                  </div>

                  <div className={`bg-gradient-to-br p-3 rounded-lg border-2 shadow-sm hover:shadow-md transition-all duration-300 ${
                    pqrsdSeleccionada.diasRestantes && pqrsdSeleccionada.diasRestantes < 0 
                      ? 'from-red-50 to-red-100 border-red-200' 
                      : 'from-green-50 to-green-100 border-green-200'
                  }`}>
                    <div className="flex items-start gap-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                        pqrsdSeleccionada.diasRestantes && pqrsdSeleccionada.diasRestantes < 0 
                          ? 'bg-red-500' 
                          : 'bg-green-500'
                      }`}>
                        <i className={`fas ${pqrsdSeleccionada.diasRestantes && pqrsdSeleccionada.diasRestantes < 0 ? 'fa-exclamation-circle' : 'fa-clock'} text-white text-sm`}></i>
                      </div>
                      <div className="flex-1">
                        <p className={`text-xs font-bold uppercase mb-1 ${
                          pqrsdSeleccionada.diasRestantes && pqrsdSeleccionada.diasRestantes < 0 
                            ? 'text-red-700' 
                            : 'text-green-700'
                        }`}>Fecha Vencimiento</p>
                        <p className="text-base font-bold text-gray-800">{formatearFecha(pqrsdSeleccionada.fechaVencimiento || '')}</p>
                        {pqrsdSeleccionada.diasRestantes !== undefined && (
                          <p className={`text-xs font-bold mt-1 flex items-center gap-1 ${
                            pqrsdSeleccionada.diasRestantes < 0 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            <i className={`fas ${pqrsdSeleccionada.diasRestantes < 0 ? 'fa-times-circle' : 'fa-check-circle'}`}></i>
                            {pqrsdSeleccionada.diasRestantes < 0 
                              ? `Vencida hace ${Math.abs(pqrsdSeleccionada.diasRestantes)} días`
                              : `${pqrsdSeleccionada.diasRestantes} días restantes`
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg border-2 border-blue-200 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-2">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                        <i className="fas fa-building text-white text-sm"></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-blue-700 uppercase mb-1">Dependencia</p>
                        <p className="text-sm font-bold text-gray-800 leading-tight">{pqrsdSeleccionada.dependenciaAsignada?.nombre || 'Sin asignar'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg border-2 border-purple-200 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-2">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                        <i className="fas fa-user-tie text-white text-sm"></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-purple-700 uppercase mb-1">Funcionario</p>
                        <p className="text-sm font-bold text-gray-800 leading-tight">{pqrsdSeleccionada.funcionarioAsignado?.nombre || 'Sin asignar'}</p>
                        {pqrsdSeleccionada.funcionarioAsignado?.cargo && (
                          <p className="text-xs text-gray-600 mt-0.5">{pqrsdSeleccionada.funcionarioAsignado.cargo}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Información Adicional Compacta */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-xs font-semibold text-gray-500 mb-1">Canal</p>
                    <p className="text-sm font-bold text-gray-800">{pqrsdSeleccionada.canalRecepcion || 'No definido'}</p>
                  </div>
                  {pqrsdSeleccionada.tipo?.plazoDias && (
                    <div className="bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm">
                      <p className="text-xs font-semibold text-gray-500 mb-1">Plazo Legal</p>
                      <p className="text-sm font-bold text-gray-800">{pqrsdSeleccionada.tipo.plazoDias} días hábiles</p>
                    </div>
                  )}
                </div>

                {/* Descripción */}
                <div className="mb-4">
                  <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-[#f39200] p-4 rounded-r-lg shadow-sm">
                    <h6 className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-sm">
                      <i className="fas fa-align-left text-[#f39200]"></i>
                      Descripción
                    </h6>
                    <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">
                      {pqrsdSeleccionada.descripcion || 'Sin descripción'}
                    </p>
                  </div>
                </div>

                {/* Observaciones */}
                {pqrsdSeleccionada.observaciones && (
                  <div className="mb-4">
                    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-500 p-4 rounded-r-lg shadow-sm">
                      <h6 className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-sm">
                        <i className="fas fa-sticky-note text-yellow-600"></i>
                        Observaciones
                      </h6>
                      <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">
                        {pqrsdSeleccionada.observaciones}
                      </p>
                    </div>
                  </div>
                )}

                {/* Fechas Adicionales */}
                {(pqrsdSeleccionada.fechaAsignacion || pqrsdSeleccionada.fechaRespuesta) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {pqrsdSeleccionada.fechaAsignacion && (
                      <div className="border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-r-lg shadow-sm">
                        <p className="text-xs font-bold text-blue-700 mb-1.5 flex items-center gap-2">
                          <i className="fas fa-calendar-plus"></i>
                          FECHA ASIGNACIÓN
                        </p>
                        <p className="text-sm font-bold text-gray-800">{formatearFecha(pqrsdSeleccionada.fechaAsignacion)}</p>
                      </div>
                    )}
                    {pqrsdSeleccionada.fechaRespuesta && (
                      <div className="border-l-4 border-green-500 bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-r-lg shadow-sm">
                        <p className="text-xs font-bold text-green-700 mb-1.5 flex items-center gap-2">
                          <i className="fas fa-check-circle"></i>
                          FECHA RESPUESTA
                        </p>
                        <p className="text-sm font-bold text-gray-800">{formatearFecha(pqrsdSeleccionada.fechaRespuesta)}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Información Adicional */}
                {(pqrsdSeleccionada.numeroOficio || pqrsdSeleccionada.mecanismoRespuesta) && (
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200 shadow-sm">
                    <h6 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm">
                      <i className="fas fa-info-circle text-[#f39200]"></i>
                      Información Adicional
                    </h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {pqrsdSeleccionada.numeroOficio && (
                        <div className="bg-white p-2.5 rounded-lg">
                          <p className="text-xs font-bold text-gray-500 mb-1">Número de Oficio</p>
                          <p className="text-sm font-semibold text-gray-800">{pqrsdSeleccionada.numeroOficio}</p>
                        </div>
                      )}
                      {pqrsdSeleccionada.mecanismoRespuesta && (
                        <div className="bg-white p-2.5 rounded-lg">
                          <p className="text-xs font-bold text-gray-500 mb-1">Mecanismo de Respuesta</p>
                          <p className="text-sm font-semibold text-gray-800">{pqrsdSeleccionada.mecanismoRespuesta}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Modal.Body>

            {/* Footer con botones */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-5 py-3 border-t-2 border-gray-200 flex justify-end gap-2">
              <button
                onClick={cerrarModal}
                className="px-5 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 flex items-center gap-2 shadow-sm text-sm"
              >
                <i className="fas fa-times"></i>
                Cerrar
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 bg-gradient-to-r from-[#f39200] to-[#ff8c00] text-white rounded-lg font-semibold hover:from-[#d17c00] hover:to-[#e67e00] transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg text-sm"
              >
                <i className="fas fa-print"></i>
                Imprimir
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};