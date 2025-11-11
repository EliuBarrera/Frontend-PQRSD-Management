// src/app/utilities/domains/opcionesPqrsd.ts

export const CANALES_RECEPCION = [
  { codigo: "presencial", texto: "Presencial", icono: "fa-building" },
  { codigo: "whatsapp", texto: "WhatsApp", icono: "fa-whatsapp" },
  { codigo: "email", texto: "Correo Electrónico", icono: "fa-envelope" },
  { codigo: "telefono", texto: "Teléfono", icono: "fa-phone" },
  { codigo: "web", texto: "Página Web", icono: "fa-globe" }
];

export const MECANISMOS_RESPUESTA = [
  { codigo: "email", texto: "Correo Electrónico", icono: "fa-envelope" },
  { codigo: "fisico", texto: "Documento Físico", icono: "fa-file-text" },
  { codigo: "telefono", texto: "Llamada Telefónica", icono: "fa-phone" },
  { codigo: "presencial", texto: "Atención Presencial", icono: "fa-building" }
];

export const TIPOS_USUARIO = [
  { codigo: "persona_natural", texto: "Persona Natural", descripcion: "Ciudadano individual" },
  { codigo: "persona_juridica", texto: "Persona Jurídica", descripcion: "Empresa, organización o entidad" },
  { codigo: "autoridad_publica", texto: "Autoridad Pública", descripcion: "Entidad del Estado" },
  { codigo: "periodista", texto: "Periodista", descripcion: "Profesional de medios de comunicación" },
  { codigo: "concejal", texto: "Concejal", descripcion: "Miembro del Concejo Municipal" },
  { codigo: "otro", texto: "Otro", descripcion: "Otros casos especiales" }
];

export const ESTADOS_PQRSD = [
  { id: 1, nombre: "Recibida", descripcion: "PQRSD recibida y registrada", color: "#6c757d" },
  { id: 2, nombre: "En Proceso", descripcion: "PQRSD asignada y en proceso", color: "#f39200" },
  { id: 3, nombre: "Respondida", descripcion: "PQRSD respondida al peticionario", color: "#28a745" },
  { id: 4, nombre: "Cerrada", descripcion: "PQRSD cerrada definitivamente", color: "#1e2b39" },
  { id: 5, nombre: "Vencida", descripcion: "PQRSD vencida sin respuesta", color: "#dc3545" },
  { id: 6, nombre: "Reclasificando", descripcion: "PQRSD en proceso de reclasificación", color: "#ffc107" }
];

export const TIPOS_PQRSD_BASE = [
  {
    id: 1,
    nombre: "Petición de Interés General",
    descripcion: "Petición que no requiere información específica",
    plazo_dias: 15,
    base_normativa: "Artículo 13, Ley 1755 de 2015"
  },
  {
    id: 2,
    nombre: "Petición de Documentos",
    descripcion: "Solicitud de documentos o información",
    plazo_dias: 10,
    base_normativa: "Artículo 14, Ley 1755 de 2015"
  },
  {
    id: 3,
    nombre: "Consulta",
    descripción: "Requerimiento de concepto o criterio",
    plazo_dias: 30,
    base_normativa: "Ley 1755 de 2015"
  },
  {
    id: 4,
    nombre: "Petición entre Autoridades",
    descripcion: "Comunicación entre entidades públicas",
    plazo_dias: 10,
    base_normativa: "Artículo 30, Ley 1755 de 2015"
  },
  {
    id: 5,
    nombre: "Queja",
    descripcion: "Manifestación de inconformidad por un servicio",
    plazo_dias: 15,
    base_normativa: "Artículo 13, Ley 1755 de 2015"
  },
  {
    id: 6,
    nombre: "Reclamo",
    descripcion: "Solicitud de solución a una situación irregular",
    plazo_dias: 15,
    base_normativa: "Artículo 13, Ley 1755 de 2015"
  },
  {
    id: 7,
    nombre: "Sugerencia",
    descripcion: "Propuesta de mejoramiento o innovación",
    plazo_dias: 15,
    base_normativa: "Artículo 13, Ley 1755 de 2015"
  },
  {
    id: 8,
    nombre: "Denuncia por Corrupción",
    descripcion: "Reporte de actos de corrupción",
    plazo_dias: 15,
    base_normativa: "Ley 1755 de 2015"
  },
  {
    id: 9,
    nombre: "Petición de Salud/Seguridad",
    descripcion: "Petición por razones de salud o seguridad con riesgo inminente",
    plazo_dias: 1, // Atención inmediata
    base_normativa: "Artículo 20, Ley 1755 de 2015"
  },
  {
    id: 10,
    nombre: "Petición de Periodista",
    descripcion: "Solicitud de periodista en ejercicio",
    plazo_dias: 7, // Trámite preferencial
    base_normativa: "Artículo 120, Ley 1755 de 2015"
  },
  {
    id: 11,
    nombre: "Solicitud de Informe por Concejales",
    descripcion: "Solicitud de informe realizada por concejales",
    plazo_dias: 5, // Días calendario
    base_normativa: "Artículo 258, Ley 5 de 1992"
  }
];

export const DEPENDENCIAS_BASE = [
  { id: 1, nombre: "Despacho del Alcalde", descripcion: "Oficina principal del alcalde", activa: true },
  { id: 2, nombre: "Secretaría de Planeación y Obras Públicas", descripcion: "Planeación urbana y obras", activa: true },
  { id: 3, nombre: "Secretaría de Gobierno", descripcion: "Administración y gobierno local", activa: true },
  { id: 4, nombre: "Secretaría de Hacienda", descripcion: "Gestión financiera y tributaria", activa: true },
  { id: 5, nombre: "Secretaría de Cultura y Deportes", descripcion: "Promoción cultural y deportiva", activa: true },
  { id: 6, nombre: "Secretaría de Salud", descripcion: "Gestión de salud pública", activa: true },
  { id: 7, nombre: "Secretaría de Educación", descripcion: "Administración educativa", activa: true }
];

export const CONFIGURACION_ALERTAS = {
  DIAS_PREVIOS_VENCIMIENTO: [
    { dias: 1, mensaje: "Vence mañana", color: "#dc3545", urgencia: "alta" },
    { dias: 2, mensaje: "Vence en 2 días", color: "#fd7e14", urgencia: "alta" },
    { dias: 3, mensaje: "Vence en 3 días", color: "#ffc107", urgencia: "media" },
    { dias: 5, mensaje: "Vence en 5 días", color: "#28a745", urgencia: "baja" }
  ],
  TIPOS_ALERTA: [
    { tipo: "vencimiento", nombre: "Próximo Vencimiento", activa: true },
    { tipo: "vencida", nombre: "PQRSD Vencida", activa: true },
    { tipo: "asignacion", nombre: "Nueva Asignación", activa: true },
    { tipo: "reclasificacion", nombre: "Solicitud de Reclasificación", activa: true },
    { tipo: "respuesta", nombre: "Respuesta Registrada", activa: false }
  ]
};

export const REGLAS_VALIDACION = {
  ARCHIVOS: {
    TIPOS_PERMITIDOS: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.txt'],
    TAMAÑO_MAXIMO_MB: 5,
    CANTIDAD_MAXIMA: 5
  },
  TEXTO: {
    DESCRIPCION_MIN_CHARS: 20,
    DESCRIPCION_MAX_CHARS: 2000,
    OBSERVACIONES_MAX_CHARS: 500
  },
  USUARIO: {
    NOMBRE_MIN_CHARS: 3,
    NOMBRE_MAX_CHARS: 100,
    IDENTIFICACION_MIN_CHARS: 6,
    IDENTIFICACION_MAX_CHARS: 20
  }
};

export const MENSAJES_SISTEMA = {
  EXITO: {
    PQRSD_CREADA: "PQRSD registrada exitosamente",
    PQRSD_ACTUALIZADA: "PQRSD actualizada correctamente",
    ASIGNACION_REALIZADA: "Asignación realizada exitosamente",
    RESPUESTA_REGISTRADA: "Respuesta registrada correctamente"
  },
  ERROR: {
    ERROR_CREAR_PQRSD: "Error al registrar la PQRSD",
    ERROR_ACTUALIZAR_PQRSD: "Error al actualizar la PQRSD",
    ARCHIVO_MUY_GRANDE: "El archivo es muy grande (máximo 5MB)",
    TIPO_ARCHIVO_NO_PERMITIDO: "Tipo de archivo no permitido",
    CAMPOS_REQUERIDOS: "Todos los campos obligatorios deben ser diligenciados"
  },
  CONFIRMACION: {
    ELIMINAR_PQRSD: "¿Está seguro de que desea eliminar esta PQRSD?",
    CERRAR_PQRSD: "¿Está seguro de que desea cerrar esta PQRSD?",
    RECLASIFICAR_PQRSD: "¿Confirma la solicitud de reclasificación?"
  }
};

// Funciones utilitarias
export const obtenerTipoPqrsdPorId = (id: number) => {
  return TIPOS_PQRSD_BASE.find(tipo => tipo.id === id);
};

export const obtenerEstadoPorId = (id: number) => {
  return ESTADOS_PQRSD.find(estado => estado.id === id);
};

export const calcularDiasVencimiento = (fechaRadicacion: Date, plazoDias: number): Date => {
  const fecha = new Date(fechaRadicacion);
  fecha.setDate(fecha.getDate() + plazoDias);
  return fecha;
};

export const formatearNumeroOficio = (id: number, year: number = new Date().getFullYear()): string => {
  const consecutivo = String(id).padStart(4, '0');
  return `PQRSD-${year}-${consecutivo}`;
};

export const validarArchivo = (archivo: File): { valido: boolean; mensaje?: string } => {
  const extension = '.' + archivo.name.split('.').pop()?.toLowerCase();
  
  if (!REGLAS_VALIDACION.ARCHIVOS.TIPOS_PERMITIDOS.includes(extension)) {
    return {
      valido: false,
      mensaje: `Tipo de archivo no permitido. Permitidos: ${REGLAS_VALIDACION.ARCHIVOS.TIPOS_PERMITIDOS.join(', ')}`
    };
  }
  
  const tamañoMB = archivo.size / (1024 * 1024);
  if (tamañoMB > REGLAS_VALIDACION.ARCHIVOS.TAMAÑO_MAXIMO_MB) {
    return {
      valido: false,
      mensaje: `El archivo es muy grande. Máximo permitido: ${REGLAS_VALIDACION.ARCHIVOS.TAMAÑO_MAXIMO_MB}MB`
    };
  }
  
  return { valido: true };
};