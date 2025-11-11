import { Col, Form, Row, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useFormulario } from "../../../utilities/hocks/useFormulario";
import { ServicioGet } from "../../../services/ServicioGet";
import { ServicioPost } from "../../../services/ServicioPost";
import { crearMensaje } from "../../../utilities/functions/mensajes";
import { URLS } from "../../../utilities/domains/Urls";
import { CANALES_RECEPCION } from '../../../utilities/domains/OpcionesPqrsd';
import { TIPOS_USUARIO } from '../../../utilities/domains/OpcionesPqrsd';
import '../../../styles/pqrsdCrear.css';
import Dependencia from "../../../models/Dependencia";
import TipoPqrsd from "../../../models/TipoPqrsd";
import useLandbot from "../../../utilities/hocks/useLandbot";
import Header from "@/app/components/contenedor/Header";
import { FooterInt } from "../../public/shared/FooterInt";
import Footer from "@/app/components/contenedor/Footer";



export const PqrsdCrear = () => {
  useLandbot({
    configUrl: 'https://storage.googleapis.com/landbot.online/v3/H-3126270-O4CHURM95T2PVL7Q/index.json',
    autoLoad: true // Carga con hover/touch
  });

  // Estados para listas
  const [arrTiposPqrsd, setArrTiposPqrsd] = useState<TipoPqrsd[]>([]);
  const [arrDependencias, setArrDependencias] = useState<Dependencia[]>([]);
  const [arrCanales] = useState<any[]>(CANALES_RECEPCION || []);
  const [arrTiposUsuario] = useState<any[]>(TIPOS_USUARIO || []);

  // Estados de control de flujo
  const [pasoActual, setPasoActual] = useState<number>(1); // 1: Buscar cédula, 2: Usuario, 3: PQRSD
  const [cargando, setCargando] = useState<boolean>(true);
  const [consultandoCedula, setConsultandoCedula] = useState<boolean>(false);
  const [creandoUsuario, setCreandoUsuario] = useState<boolean>(false);
  const [enviandoPqrsd, setEnviandoPqrsd] = useState<boolean>(false);

  // Estados del usuario
  const [cedulaConsulta, setCedulaConsulta] = useState<string>("");
  const [usuarioExiste, setUsuarioExiste] = useState<boolean>(false);
  const [usuarioEncontrado, setUsuarioEncontrado] = useState<any>(null);
  const [usuarioCreado, setUsuarioCreado] = useState<boolean>(false);
  const [idUsuarioFinal, setIdUsuarioFinal] = useState<number | null>(null);

  type formulario = React.FormEvent<HTMLFormElement>;

  // Hook para datos del usuario
  let {
    nombre, identificacion, correo, telefono, direccion, tipo,
    dobleEnlace: dobleEnlaceUsuario,
    objeto: objetoUsuario
  } = useFormulario<any>({
    nombre: "",
    identificacion: "",
    correo: "",
    telefono: "",
    direccion: "",
    tipo: ""
  });

  // Hook para datos de la PQRSD
  let {
    tipo_pqrsd_id, descripcion, canal_recepcion, observaciones,
    dobleEnlace: dobleEnlacePqrsd,
    objeto: objetoPqrsd
  } = useFormulario<any>({
    tipo_pqrsd_id: 0,
    descripcion: "",
    canal_recepcion: "",
    observaciones: ""
  });

  const navegacion = useNavigate();


  // Consultar tipos de PQRSD
  const consultarTiposPqrsd = async () => {
    try {
      const urlServicio = URLS.URL_BASE + URLS.TIPO_PQRSD_LISTAR;
      const respuesta = await ServicioGet.peticionGet(urlServicio);
      setArrTiposPqrsd(respuesta);
    } catch (error) {
      console.error("Error consultando tipos PQRSD:", error);
      setArrTiposPqrsd([]);
      crearMensaje("error", "Error al cargar tipos de PQRSD");
    }
  };

  // Consultar dependencias
  const consultarDependencias = async () => {
    try {
      const urlServicio = URLS.URL_BASE + URLS.DEPENDENCIA_LISTAR;
      const respuesta = await ServicioGet.peticionGet(urlServicio);
      setArrDependencias(respuesta);
    } catch (error) {
      console.error("Error consultando dependencias:", error);
      setArrDependencias([]);
      crearMensaje("error", "Error al cargar dependencias");
    }
  };

  // Cargar datos iniciales
  const cargarDatosIniciales = async () => {
    setCargando(true);
    try {
      await Promise.all([
        consultarTiposPqrsd(),
        consultarDependencias()
      ]);
    } catch (error) {
      console.error("Error cargando datos iniciales:", error);
      crearMensaje("error", "Error al cargar los datos del formulario");
    } finally {
      setCargando(false);
    }
  };

  // PASO 1: Consultar usuario por cédula
  const consultarPorCedula = async () => {
    if (!cedulaConsulta.trim()) {
      crearMensaje("warning", "Por favor ingrese un número de identificación");
      return;
    }

    if (cedulaConsulta.length < 6) {
      crearMensaje("warning", "El número de identificación debe tener al menos 6 caracteres");
      return;
    }

    setConsultandoCedula(true);

    try {
      const urlVerificar = URLS.URL_BASE + URLS.USUARIO_BUSCAR_IDENTIFICACION.replace(':identificacion', cedulaConsulta);
      console.log('🔍 URL de consulta:', urlVerificar);

      const respuesta = await ServicioGet.peticionGet(urlVerificar);
      console.log('📦 Respuesta completa del backend:', respuesta);
      console.log('📦 Tipo de respuesta:', typeof respuesta);
      console.log('📦 Es array:', Array.isArray(respuesta));

      // Verificar diferentes estructuras posibles de respuesta
      let usuarioEncontradoData = null;
      let existeUsuario = false;

      // Caso 1: Respuesta directa es el usuario (array o objeto)
      if (Array.isArray(respuesta) && respuesta.length > 0) {
        console.log('✅ Caso 1: Array con usuario encontrado');
        usuarioEncontradoData = respuesta[0];
        existeUsuario = true;
      }
      // Caso 2: Respuesta es un objeto usuario directo
      else if (respuesta && typeof respuesta === 'object' && respuesta.id) {
        console.log('✅ Caso 2: Objeto usuario directo');
        usuarioEncontradoData = respuesta;
        existeUsuario = true;
      }
      // Caso 3: Respuesta tiene estructura con propiedad 'existe'
      else if (respuesta && respuesta.existe === true) {
        console.log('✅ Caso 3: Respuesta con propiedad existe');
        usuarioEncontradoData = respuesta.usuario || respuesta.data;
        existeUsuario = true;
      }
      // Caso 4: Respuesta tiene propiedad 'data' con usuario
      else if (respuesta && respuesta.data && respuesta.data.id) {
        console.log('✅ Caso 4: Respuesta con data');
        usuarioEncontradoData = respuesta.data;
        existeUsuario = true;
      }
      // Caso 5: Array vacío o null/undefined
      else if (!respuesta || (Array.isArray(respuesta) && respuesta.length === 0) || respuesta.existe === false) {
        console.log('❌ Caso 5: Usuario no encontrado');
        existeUsuario = false;
      }

      if (existeUsuario && usuarioEncontradoData) {
        console.log('👤 Datos del usuario encontrado:', usuarioEncontradoData);

        // Usuario encontrado
        setUsuarioExiste(true);
        setUsuarioEncontrado(usuarioEncontradoData);
        setIdUsuarioFinal(usuarioEncontradoData.id);
        setUsuarioCreado(true);
        crearMensaje("success", "Usuario encontrado en el sistema");
        setPasoActual(3); // Ir directo al formulario de PQRSD
      } else {
        console.log('❌ Usuario no encontrado - ir a creación');

        // Usuario no encontrado
        setUsuarioExiste(false);
        setUsuarioEncontrado(null);
        setIdUsuarioFinal(null);
        setUsuarioCreado(false);
        // Prellenar el campo identificación
        objetoUsuario.identificacion = cedulaConsulta;
        crearMensaje("info", "Usuario no encontrado. Complete los datos para crearlo");
        setPasoActual(2); // Ir al formulario de creación de usuario
      }
    } catch (error) {
      console.error("💥 Error consultando usuario:", error);
      crearMensaje("error", "Error al consultar el usuario");

      // En caso de error, asumir que no existe y permitir creación
      setUsuarioExiste(false);
      setUsuarioEncontrado(null);
      setIdUsuarioFinal(null);
      setUsuarioCreado(false);
      objetoUsuario.identificacion = cedulaConsulta;
      setPasoActual(2);
    } finally {
      setConsultandoCedula(false);
    }
  };

  // PASO 2: Crear nuevo usuario
  const crearUsuario = async (frm: formulario) => {
    frm.preventDefault();
    setCreandoUsuario(true);

    const objFrm = frm.currentTarget;
    objFrm.classList.add("was-validated");

    if (objFrm.checkValidity() === false) {
      frm.preventDefault();
      frm.stopPropagation();
      setCreandoUsuario(false);
      return;
    }

    try {
      const datosUsuario = {
        tipo: tipo,
        nombre: nombre,
        identificacion: identificacion,
        contacto: telefono,
        correo: correo,
        direccion: direccion,
        telefono: telefono
      };

      const urlCrearUsuario = URLS.URL_BASE + URLS.USUARIO_CREAR;
      const respuestaUsuario = await ServicioPost.peticionPost(urlCrearUsuario, datosUsuario);

      if (respuestaUsuario && respuestaUsuario.id) {
        setUsuarioCreado(true);
        setIdUsuarioFinal(respuestaUsuario.id);
        setUsuarioEncontrado({
          id: respuestaUsuario.id,
          nombre: nombre,
          identificacion: identificacion,
          correo: correo,
          telefono: telefono,
          direccion: direccion,
          tipo: tipo
        });
        crearMensaje("success", "Usuario creado exitosamente");
        setPasoActual(3); // Ir al formulario de PQRSD
      } else {
        throw new Error("No se pudo crear el usuario");
      }
    } catch (error) {
      console.error("Error creando usuario:", error);
      crearMensaje("error", "Error al crear el usuario. Verifique que los datos sean correctos y no estén duplicados.");
    } finally {
      setCreandoUsuario(false);
    }
  };

  // PASO 3: Crear PQRSD (Versión corregida para manejar la respuesta real del backend)
  const crearPqrsd = async (frm: formulario) => {
    frm.preventDefault();
    setEnviandoPqrsd(true);

    const objFrm = frm.currentTarget;
    objFrm.classList.add("was-validated");

    if (objFrm.checkValidity() === false) {
      frm.preventDefault();
      frm.stopPropagation();
      setEnviandoPqrsd(false);
      return;
    }

    // VERIFICACIÓN CRÍTICA: Asegurar que tenemos un usuario_id válido
    if (!idUsuarioFinal || idUsuarioFinal <= 0) {
      console.error("❌ Error: No hay un ID de usuario válido:", idUsuarioFinal);
      crearMensaje("error", "Error: No se ha podido identificar al usuario. Por favor, comience nuevamente.");
      setEnviandoPqrsd(false);
      return;
    }

    try {
      const datosPqrsd = {
        usuario_id: idUsuarioFinal,
        tipo_pqrsd_id: parseInt(tipo_pqrsd_id.toString()),
        descripcion: descripcion,
        canal_recepcion: canal_recepcion,
        observaciones: observaciones || '',
        estado_id: 1, // Estado inicial
      };

      console.log("📤 Datos que se enviarán al backend:", datosPqrsd);

      const urlServicio = URLS.URL_BASE + URLS.PQRSD_CREAR;
      const respuestaPqrsd = await ServicioPost.peticionPost(urlServicio, datosPqrsd);

      console.log("📦 Respuesta completa del backend:", respuestaPqrsd);
      console.log("📦 Tipo de respuesta:", typeof respuestaPqrsd);

      // MANEJO CORRECTO DE LA RESPUESTA SEGÚN LA ESTRUCTURA REAL
      let pqrsdCreada = false;
      let numeroRadicado = null;
      let idPqrsd = null;

      if (respuestaPqrsd) {
        // Caso 1: Respuesta con mensaje de éxito (tu estructura actual)
        if (respuestaPqrsd.mensaje && respuestaPqrsd.mensaje.includes("éxito")) {
          pqrsdCreada = true;

          // Intentar extraer datos de la PQRSD creada
          if (respuestaPqrsd.pqrsd) {
            numeroRadicado = respuestaPqrsd.pqrsd.numero_oficio ||
              respuestaPqrsd.pqrsd.consecutivo;
            idPqrsd = respuestaPqrsd.pqrsd.id_pqrsd ||
              respuestaPqrsd.pqrsd.id;
          }
        }
        // Caso 2: Respuesta directa con id
        else if (respuestaPqrsd.id || respuestaPqrsd.id_pqrsd || respuestaPqrsd.idPQRSD) {
          pqrsdCreada = true;
          numeroRadicado = respuestaPqrsd.numero_oficio || respuestaPqrsd.consecutivo;
          idPqrsd = respuestaPqrsd.id || respuestaPqrsd.id_pqrsd || respuestaPqrsd.idPQRSD;
        }
        // Caso 3: Respuesta con success = true
        else if (respuestaPqrsd.success === true) {
          pqrsdCreada = true;
          if (respuestaPqrsd.data) {
            numeroRadicado = respuestaPqrsd.data.numero_oficio || respuestaPqrsd.data.consecutivo;
            idPqrsd = respuestaPqrsd.data.id || respuestaPqrsd.data.id_pqrsd;
          }
        }
        // Caso 4: Cualquier respuesta que no sea un error explícito
        else if (typeof respuestaPqrsd === 'object' && !respuestaPqrsd.error) {
          pqrsdCreada = true;
        }
      }

      console.log("✅ Estado de creación:", { pqrsdCreada, numeroRadicado, idPqrsd });

      if (pqrsdCreada) {
        // Construir mensaje de éxito
        let mensajeExito = "PQRSD registrada exitosamente";

        if (numeroRadicado) {
          mensajeExito += ` con radicado: ${numeroRadicado}`;
        } else if (idPqrsd) {
          mensajeExito += ` con ID: ${idPqrsd}`;
        }

        crearMensaje("success", mensajeExito);

        // Redirigir después de mostrar el mensaje
        setTimeout(() => {
          navegacion("/");
        }, 2000);

      } else {
        // Si llegamos aquí, la respuesta no tiene los indicadores esperados
        console.warn("⚠️ Respuesta del backend sin indicadores claros de éxito");
        throw new Error("No se pudo confirmar que la PQRSD fue creada correctamente");
      }

    } catch (error) {
      console.error("💥 Error al crear PQRSD:", error);

      // Verificar si es realmente un error o solo un problema de parsing
      if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as any).message === "string" &&
        ((error as any).message.includes("200") || (error as any).message.includes("201"))
      ) {
        // Si el status es de éxito pero hay error de parsing, asumir que se creó correctamente
        console.log("🔄 Error de parsing pero status exitoso, asumiendo éxito");
        crearMensaje("success", "PQRSD registrada exitosamente");
        setTimeout(() => navegacion("/"), 2000);
      } else {
        // Error real
        let mensajeError = "Error al registrar la PQRSD. Por favor, intente nuevamente.";

        if (typeof error === "object" && error !== null && "message" in error && typeof (error as any).message === "string") {
          mensajeError = (error as any).message;
        }

        crearMensaje("error", mensajeError);
      }
    } finally {
      setEnviandoPqrsd(false);
    }
  };

  // ALTERNATIVA: Función de verificación más robusta
  const verificarExitoPQRSD = (respuesta: any): {
    exitosa: boolean;
    numeroRadicado?: string;
    id?: string | number;
    mensaje: string;
  } => {
    console.log("🔍 Verificando éxito de PQRSD:", respuesta);

    // Lista de patrones que indican éxito
    const patronesExito = [
      // Mensajes de éxito
      () => respuesta?.mensaje?.toLowerCase()?.includes("éxito"),
      () => respuesta?.mensaje?.toLowerCase()?.includes("exitosa"),
      () => respuesta?.mensaje?.toLowerCase()?.includes("creada"),
      () => respuesta?.message?.toLowerCase()?.includes("success"),

      // Propiedades de éxito
      () => respuesta?.success === true,
      () => respuesta?.status === "success",
      () => respuesta?.created === true,

      // IDs presentes
      () => Boolean(respuesta?.id || respuesta?.id_pqrsd || respuesta?.idPQRSD),
      () => Boolean(respuesta?.pqrsd?.id || respuesta?.pqrsd?.id_pqrsd),
      () => Boolean(respuesta?.data?.id || respuesta?.data?.id_pqrsd),

      // Números de radicado
      () => Boolean(respuesta?.numero_oficio || respuesta?.consecutivo),
      () => Boolean(respuesta?.pqrsd?.numero_oficio || respuesta?.pqrsd?.consecutivo),
      () => Boolean(respuesta?.data?.numero_oficio || respuesta?.data?.consecutivo)
    ];

    const esExitosa = patronesExito.some(patron => {
      try {
        return patron();
      } catch {
        return false;
      }
    });

    if (esExitosa) {
      // Extraer información adicional
      const numeroRadicado = respuesta?.numero_oficio ||
        respuesta?.consecutivo ||
        respuesta?.pqrsd?.numero_oficio ||
        respuesta?.pqrsd?.consecutivo ||
        respuesta?.data?.numero_oficio ||
        respuesta?.data?.consecutivo;

      const id = respuesta?.id ||
        respuesta?.id_pqrsd ||
        respuesta?.idPQRSD ||
        respuesta?.pqrsd?.id ||
        respuesta?.pqrsd?.id_pqrsd ||
        respuesta?.data?.id ||
        respuesta?.data?.id_pqrsd;

      return {
        exitosa: true,
        numeroRadicado,
        id,
        mensaje: respuesta?.mensaje || "PQRSD creada exitosamente"
      };
    }

    return {
      exitosa: false,
      mensaje: "No se pudo confirmar la creación de la PQRSD"
    };
  };

  // Volver al paso anterior
  const volverPasoAnterior = () => {
    if (pasoActual > 1) {
      setPasoActual(pasoActual - 1);

      // Reset de estados según el paso
      if (pasoActual === 2) {
        setCedulaConsulta("");
        setUsuarioExiste(false);
        setUsuarioEncontrado(null);
        setUsuarioCreado(false);
        setIdUsuarioFinal(null);
      } else if (pasoActual === 3) {
        // Reset solo del formulario PQRSD
        objetoPqrsd.tipo_pqrsd_id = 0;
        objetoPqrsd.descripcion = "";
        objetoPqrsd.canal_recepcion = "";
        objetoPqrsd.observaciones = "";
      }
    }
  };

  useEffect(() => {
    cargarDatosIniciales();
  }, []);

  // MOSTRAR LOADING MIENTRAS CARGA
  if (cargando) {
    return (
      <div className="pqrsd-container">
        <Container>
          <div className="pqrsd-loading-container">
            <div className="spinner-border pqrsd-spinner" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <h5 className="pqrsd-loading-title">Cargando formulario...</h5>
            <p className="pqrsd-loading-text">Preparando los datos necesarios</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-100">
      <Header/>
      <main className="flex-1 pt-10 pb-32 px-6">
        <section className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
          <div className="py-10 px-8">
            <Row className="justify-content-center">
              <Col lg={10} xl={8}>
                <div className="bg-white rounded-2xl overflow-hidden">
                  
                  {/* HEADER SECTION */}
                  <div className="bg-gradient-to-r from-[#f39200] to-[#ffb84d] py-12 px-8 text-center rounded-t-2xl -mx-8 -mt-8 mb-8">
                    {/* Breadcrumb */}
                    <div className="flex items-center justify-center gap-2 mb-4 text-sm text-white">
                      <i className="fas fa-home"></i>
                      <span>Inicio</span>
                      <span>/</span>
                      <span className="font-semibold">Nueva Solicitud</span>
                    </div>
                    
                    <h1 className="text-4xl font-bold mb-3 text-[#1e2b39] flex items-center justify-center gap-3">
                      <i className="fas fa-file-alt"></i>
                      Registrar Nueva PQRSD
                    </h1>
                    <p className="text-[#1e2b39] text-lg opacity-90">
                      Complete el siguiente formulario para radicar su petición, queja, reclamo, solicitud o denuncia
                    </p>
                  </div>

                  {/* INDICADOR DE PASOS */}
                  <div className="bg-gray-50 py-8 px-6 my-6 rounded-xl">
                    <div className="flex items-center justify-center gap-4">
                      {/* Paso 1 */}
                      <div className="flex flex-col items-center gap-2 flex-1 max-w-xs">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold transition-all ${
                          pasoActual >= 1 
                            ? pasoActual > 1 
                              ? 'bg-green-500 text-white' 
                              : 'bg-[#f39200] text-white shadow-lg'
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          1
                        </div>
                        <div className={`text-sm font-semibold text-center ${
                          pasoActual >= 1 
                            ? pasoActual > 1 
                              ? 'text-green-500' 
                              : 'text-[#f39200]'
                            : 'text-gray-500'
                        }`}>
                          Consultar Cédula
                        </div>
                      </div>

                      {/* Separador */}
                      <div className="w-16 h-0.5 bg-gray-300 -mt-6"></div>

                      {/* Paso 2 */}
                      <div className="flex flex-col items-center gap-2 flex-1 max-w-xs">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold transition-all ${
                          pasoActual >= 2 
                            ? pasoActual > 2 
                              ? 'bg-green-500 text-white' 
                              : 'bg-[#f39200] text-white shadow-lg'
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          2
                        </div>
                        <div className={`text-sm font-semibold text-center ${
                          pasoActual >= 2 
                            ? pasoActual > 2 
                              ? 'text-green-500' 
                              : 'text-[#f39200]'
                            : 'text-gray-500'
                        }`}>
                          Datos Usuario
                        </div>
                      </div>

                      {/* Separador */}
                      <div className="w-16 h-0.5 bg-gray-300 -mt-6"></div>

                      {/* Paso 3 */}
                      <div className="flex flex-col items-center gap-2 flex-1 max-w-xs">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold transition-all ${
                          pasoActual >= 3 
                            ? 'bg-[#f39200] text-white shadow-lg'
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          3
                        </div>
                        <div className={`text-sm font-semibold text-center ${
                          pasoActual >= 3 ? 'text-[#f39200]' : 'text-gray-500'
                        }`}>
                          Crear PQRSD
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PASO 1: CONSULTA POR CÉDULA */}
                  {pasoActual === 1 && (
                    <div className="bg-white p-8 rounded-xl border border-gray-200 mb-6">
                      <h3 className="text-xl font-bold text-[#1e2b39] mb-6 pb-3 border-b-4 border-[#f39200] flex items-center gap-2">
                        <i className="fas fa-search"></i>
                        Consultar Información por Número de Identificación
                      </h3>

                      <Row className="justify-content-center">
                        <Col md={8}>
                          <div className="mb-6">
                            <Form.Label className="block text-sm font-semibold text-gray-700 mb-2">
                              Número de Identificación
                              <span className="text-red-500 ml-1">*</span>
                            </Form.Label>
                            <div className="flex gap-2">
                              <Form.Control
                                type="text"
                                className="flex-1 px-4 py-3 text-black border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#f39200] focus:ring-2 focus:ring-[#f39200] focus:ring-opacity-20 transition-all"
                                value={cedulaConsulta}
                                onChange={(e) => setCedulaConsulta(e.target.value)}
                                placeholder="Ingrese su cédula, NIT o documento de identidad"
                                disabled={consultandoCedula}
                              />
                              <button
                                className="px-6 py-3 bg-[#1e2b39] text-white rounded-lg font-semibold hover:bg-[#2c3e50] hover:shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                type="button"
                                onClick={consultarPorCedula}
                                disabled={consultandoCedula || !cedulaConsulta.trim()}
                              >
                                {consultandoCedula ? (
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
                                    Consultar
                                  </>
                                )}
                              </button>
                            </div>
                            <Form.Text className="text-sm text-gray-500 mt-2">
                              Ingrese su número de identificación para verificar si ya está registrado en el sistema
                            </Form.Text>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  )}

                  {/* PASO 2: FORMULARIO DE USUARIO */}
                  {pasoActual === 2 && (
                    <Form onSubmit={crearUsuario} noValidate validated={creandoUsuario}>
                      <div className="bg-white p-8 rounded-xl border border-gray-200 mb-2">
                        <h3 className="text-xl font-bold text-[#1e2b39] mb-6 pb-3 border-b-4 border-[#f39200] flex items-center gap-2">
                          <i className="fas fa-user-plus"></i>
                          Crear Usuario
                          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-blue-500 text-white ml-2">
                            <i className="fas fa-info-circle mr-1"></i>
                            Usuario no encontrado
                          </span>
                        </h3>

                        <Row>
                          <Col md={6} className="grid grid-cols-2 gap-8">
                            <div>
                              <Form.Label className="block text-sm font-semibold text-gray-700 mb-2">
                                Tipo de Usuario
                                <span className="text-red-500 ml-1">*</span>
                              </Form.Label>
                              <Form.Select
                                className="w-full px-4 py-3 text-black border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#f39200] focus:ring-2 focus:ring-[#f39200] focus:ring-opacity-20 transition-all bg-white"
                                name="tipo"
                                value={tipo}
                                onChange={dobleEnlaceUsuario}
                                required
                              >
                                <option value="">Seleccione el tipo de usuario</option>
                                {arrTiposUsuario.map((objTipo, indice) => (
                                  <option key={indice} value={objTipo.codigo}>
                                    {objTipo.texto}
                                  </option>
                                ))}
                              </Form.Select>
                            </div>

                            <div>
                              <Form.Label className="block text-sm font-semibold text-gray-700 mb-2">
                                Nombre Completo / Razón Social
                                <span className="text-red-500 ml-1">*</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#f39200] focus:ring-2 focus:ring-[#f39200] focus:ring-opacity-20 transition-all"
                                name="nombre"
                                onChange={dobleEnlaceUsuario}
                                value={nombre}
                                required
                                placeholder="Ingrese su nombre completo o razón social"
                              />
                            </div>

                            <div>
                              <Form.Label className="block text-sm font-semibold text-gray-700 mb-2">
                                Número de Identificación
                                <span className="text-red-500 ml-1">*</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                                name="identificacion"
                                onChange={dobleEnlaceUsuario}
                                value={identificacion}
                                required
                                readOnly
                                placeholder="Cédula, NIT o documento de identidad"
                              />
                            </div>
                            
                            <div>
                              <Form.Label className="block text-sm font-semibold text-gray-700 mb-2">
                                Correo Electrónico
                                <span className="text-red-500 ml-1">*</span>
                              </Form.Label>
                              <Form.Control
                                type="email"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#f39200] focus:ring-2 focus:ring-[#f39200] focus:ring-opacity-20 transition-all"
                                name="correo"
                                onChange={dobleEnlaceUsuario}
                                value={correo}
                                required
                                placeholder="ejemplo@correo.com"
                              />
                            </div>

                            <div>
                              <Form.Label className="block text-sm font-semibold text-gray-700 mb-2">
                                Teléfono de Contacto
                                <span className="text-red-500 ml-1">*</span>
                              </Form.Label>
                              <Form.Control
                                type="tel"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#f39200] focus:ring-2 focus:ring-[#f39200] focus:ring-opacity-20 transition-all"
                                name="telefono"
                                onChange={dobleEnlaceUsuario}
                                value={telefono}
                                required
                                placeholder="3001234567"
                              />
                            </div>

                            <div>
                              <Form.Label className="block text-sm font-semibold text-gray-700 mb-2">
                                Dirección
                              </Form.Label>
                              <Form.Control
                                type="text"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#f39200] focus:ring-2 focus:ring-[#f39200] focus:ring-opacity-20 transition-all"
                                name="direccion"
                                onChange={dobleEnlaceUsuario}
                                value={direccion}
                                placeholder="Dirección completa (opcional)"
                              />
                            </div>
                          </Col>
                        </Row>

                        <div className="flex justify-between gap-4 mt-6">
                          <button
                            type="button"
                            className="px-6 py-3 bg-[#1e2b39] text-white rounded-lg font-semibold hover:bg-[#2c3e50] hover:shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                            onClick={volverPasoAnterior}
                            disabled={creandoUsuario}
                          >
                            <i className="fas fa-arrow-left"></i>
                            Volver
                          </button>

                          <button
                            type="submit"
                            className="px-6 py-3 bg-[#f39200] text-white rounded-lg font-semibold hover:bg-[#d17c00] hover:shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                            disabled={creandoUsuario}
                          >
                            {creandoUsuario ? (
                              <>
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Creando Usuario...
                              </>
                            ) : (
                              <>
                                <i className="fas fa-user-plus"></i>
                                Crear Usuario
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}

                  {/* PASO 3: FORMULARIO DE PQRSD */}
                  {pasoActual === 3 && usuarioEncontrado && (
                    <Form onSubmit={crearPqrsd} noValidate validated={enviandoPqrsd}>
                      {/* INFORMACIÓN DEL USUARIO (SOLO LECTURA) */}
                      <div className="bg-white p-8 rounded-xl border border-gray-200 mb-6">
                        <h3 className="text-xl font-bold text-[#1e2b39] mb-6 pb-3 border-b-4 border-[#f39200] flex items-center gap-2">
                          <i className="fas fa-user-check"></i>
                          Información del Peticionario
                          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-green-500 text-white ml-2">
                            <i className="fas fa-check-circle mr-1"></i>
                            {usuarioExiste ? 'Usuario verificado' : 'Usuario creado'}
                          </span>
                        </h3>

                        <Row>
                          <Col md={6} className="grid grid-cols-2 gap-8" >
                            <div className="mb-6">
                              <Form.Label className="block text-sm font-semibold text-gray-700 mb-2">Nombre Completo</Form.Label>
                              <Form.Control
                                type="text"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                                value={usuarioEncontrado.nombre || ''}
                                readOnly
                              />
                            </div>
                            <div className="mb-6">
                              <Form.Label className="block text-sm font-semibold text-gray-700 mb-2">Identificación</Form.Label>
                              <Form.Control
                                type="text"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                                value={usuarioEncontrado.identificacion || ''}
                                readOnly
                              />
                            </div>
                          </Col>
                          <Col md={6} className="grid grid-cols-2 gap-8">
                            <div className="mb-6">
                              <Form.Label className="block text-sm font-semibold text-gray-700 mb-2">Correo Electrónico</Form.Label>
                              <Form.Control
                                type="email"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                                value={usuarioEncontrado.correo || ''}
                                readOnly
                              />
                            </div>
                            <div className="mb-6">
                              <Form.Label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono</Form.Label>
                              <Form.Control
                                type="text"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                                value={usuarioEncontrado.telefono || ''}
                                readOnly
                              />
                            </div>
                          </Col>
                        </Row>
                      </div>

                      {/* FORMULARIO DE PQRSD */}
                      <div className="bg-white p-8 rounded-xl border border-gray-200 mb-6">
                        <h3 className="text-xl font-bold text-[#1e2b39] mb-6 pb-3 border-b-4 border-[#f39200] flex items-center gap-2">
                          <i className="fas fa-file-text"></i>
                          Detalles de la PQRSD
                        </h3>

                        <Row>
                          <Col md={6} className="grid grid-cols-2 gap-8">
                            <div className="mb-6">
                              <Form.Label className="block text-sm font-semibold text-gray-700 mb-2">
                                Tipo de PQRSD
                                <span className="text-red-500 ml-1">*</span>
                              </Form.Label>
                              <Form.Select
                                className="w-full px-4 py-3 text-black border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#f39200] focus:ring-2 focus:ring-[#f39200] focus:ring-opacity-20 transition-all bg-white"
                                name="tipo_pqrsd_id"
                                value={tipo_pqrsd_id}
                                onChange={dobleEnlacePqrsd}
                                required
                              >
                                <option value="">Seleccione el tipo de solicitud</option>
                                {arrTiposPqrsd.map((objTipo, indice) => (
                                  <option key={indice} value={objTipo.idTipoPQRSD}>
                                    {objTipo.nombre} - {objTipo.plazoDias} días hábiles
                                  </option>
                                ))}
                              </Form.Select>
                            </div>

                            <div className="mb-6">
                              <Form.Label className="block text-sm font-semibold text-gray-700 mb-2">
                                Canal de Recepción
                                <span className="text-red-500 ml-1">*</span>
                              </Form.Label>
                              <Form.Select
                                className="w-full px-4 py-3 text-black border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#f39200] focus:ring-2 focus:ring-[#f39200] focus:ring-opacity-20 transition-all bg-white"
                                name="canal_recepcion"
                                value={canal_recepcion}
                                onChange={dobleEnlacePqrsd}
                                required
                              >
                                <option value="">¿Cómo nos contactó?</option>
                                {arrCanales.map((objCanal, indice) => (
                                  <option key={indice} value={objCanal.codigo}>
                                    {objCanal.texto}
                                  </option>
                                ))}
                              </Form.Select>
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col xs={12}>
                            <div className="mb-6">
                              <Form.Label className="block text-sm font-semibold text-gray-700 mb-2">
                                Descripción Detallada
                                <span className="text-red-500 ml-1">*</span>
                              </Form.Label>
                              <Form.Control
                                as="textarea"
                                className="w-full px-4 py-3 text-black border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#f39200] focus:ring-2 focus:ring-[#f39200] focus:ring-opacity-20 transition-all resize-vertical min-h-[150px]"
                                name="descripcion"
                                onChange={dobleEnlacePqrsd}
                                value={descripcion}
                                required
                                placeholder="Describa claramente y con el mayor detalle posible su petición, queja, reclamo, solicitud o denuncia..."
                                rows={5}
                              />
                            </div>

                            <div className="mb-6">
                              <Form.Label className="block text-sm font-semibold text-gray-700 mb-2">
                                Observaciones Adicionales
                              </Form.Label>
                              <Form.Control
                                as="textarea"
                                className="w-full px-4 py-3 text-black border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#f39200] focus:ring-2 focus:ring-[#f39200] focus:ring-opacity-20 transition-all resize-vertical"
                                name="observaciones"
                                onChange={dobleEnlacePqrsd}
                                value={observaciones}
                                placeholder="Información adicional que considere relevante (opcional)..."
                                rows={3}
                              />
                            </div>
                          </Col>
                        </Row>
                      </div>

                      {/* BOTONES */}
                      <div className="flex justify-between gap-4 mb-4 pb-6 border-b border-gray-200">
                        <button
                          type="button"
                          className="px-6 py-3 bg-[#1e2b39] text-white rounded-lg font-semibold hover:bg-[#2c3e50] hover:shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                          onClick={volverPasoAnterior}
                          disabled={enviandoPqrsd}
                        >
                          <i className="fas fa-arrow-left"></i>
                          Volver
                        </button>

                        <button
                          type="submit"
                          className="px-6 py-3 bg-[#f39200] text-white rounded-lg font-semibold hover:bg-[#d17c00] hover:shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                          disabled={enviandoPqrsd}
                        >
                          {enviandoPqrsd ? (
                            <>
                              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Registrando PQRSD...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-paper-plane"></i>
                              Registrar PQRSD
                            </>
                          )}
                        </button>
                      </div>
                    </Form>
                  )}

                  {/* SECCIÓN DE AVISO LEGAL */}
                  {pasoActual === 3 && (
                    <div className="bg-yellow-50 border-2 border-yellow-400 p-8 rounded-xl mb-6">
                      <div className="flex gap-6 items-start">
                        <i className="fas fa-shield-alt text-5xl text-[#f39200] flex-shrink-0"></i>
                        <div className="flex-1">
                          <h6 className="font-bold text-[#1e2b39] mb-3 text-lg">Protección de Datos Personales</h6>
                          <p className="text-gray-700 text-sm leading-relaxed mb-2">
                            Sus datos personales serán tratados conforme a la <strong>Ley 1581 de 2012</strong> y utilizados
                            únicamente para la gestión de su PQRSD. Al enviar este formulario, autoriza el tratamiento
                            de sus datos para dar respuesta a su solicitud.
                          </p>
                          <p className="text-gray-700 text-sm leading-relaxed mb-2">
                            <i className="fas fa-clock mr-1"></i>
                            Los campos marcados con <span className="text-red-500 ml-1">*</span> son obligatorios.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col lg={10} xl={8}>
                <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg p-6 mt-8">
                  <h6 className="text-lg font-bold text-[#1e2b39] mb-4 flex items-center gap-2">
                    <i className="fas fa-info-circle text-[#f39200]"></i>
                    Información Importante
                  </h6>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex gap-3">
                      <i className="fas fa-calendar-check text-3xl text-[#f39200] flex-shrink-0"></i>
                      <div>
                        <strong className="block font-semibold text-gray-800 mb-1">Tiempos de Respuesta:</strong>
                        <p className="text-sm text-gray-600">Según la normatividad vigente (Ley 1755 de 2015)</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <i className="fas fa-bell text-3xl text-[#f39200] flex-shrink-0"></i>
                      <div>
                        <strong className="block font-semibold text-gray-800 mb-1">Seguimiento:</strong>
                        <p className="text-sm text-gray-600">Recibirá notificaciones del estado de su solicitud</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
};