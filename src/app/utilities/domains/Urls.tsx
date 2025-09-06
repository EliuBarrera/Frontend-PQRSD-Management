export const URLS = {
    URL_BASE: "http://localhost:3000",
    
    /* Autenticación */
    INICIO_SESION: "/api/auth/login",
    
    /* Peticiones para usuario */
    USUARIO_LISTAR: "/api/user/all",
    USUARIO_CREAR: "/api/user/add",
    USUARIO_ACTUALIZAR: "/api/user/update",
    USUARIO_ELIMINAR: "/api/user/delete/:idUsuario",
    USUARIO_BUSCAR_ID: "/api/user/search/:idUsuario",
    USUARIO_BUSCAR_NOMBRE: "/api/user/searchName/:nombreUsuario",
    USUARIO_BUSCAR_IDENTIFICACION: "/api/user/searchIdentification/:identificacion",
    USUARIO_BUSCAR_TIPO: "/api/user/searchType/:tipo",
    USUARIO_VERIFICAR_EXISTENCIA: "/api/user/verify/:identificacion",

    /* Peticiones para tipo PQRSD */
    TIPO_PQRSD_LISTAR: "/api/typePQRSD/all",
    TIPO_PQRSD_CREAR: "/api/typePQRSD/add",
    TIPO_PQRSD_ACTUALIZAR: "/api/typePQRSD/update",
    TIPO_PQRSD_ELIMINAR: "/api/typePQRSD/delete/:idTipoPQRSD",
    TIPO_PQRSD_BUSCAR_ID: "/api/typePQRSD/search/:idTipoPQRSD",
    TIPO_PQRSD_BUSCAR_NOMBRE: "/api/typePQRSD/searchName/:nombreTipoPQRSD",
    TIPO_PQRSD_BUSCAR_PLAZO: "/api/typePQRSD/searchPlazo/:plazoDias",
    TIPO_PQRSD_ESTADISTICAS: "/api/typePQRSD/estadisticas",
    TIPO_PQRSD_VERIFICAR_EXISTENCIA: "/api/typePQRSD/verify/:nombreTipoPQRSD",

    /* Peticiones para PQRSD */
    PQRSD_LISTAR: "/api/PQRSD/all",
    PQRSD_CREAR: "/api/PQRSD/add",
    PQRSD_ACTUALIZAR: "/api/PQRSD/update",
    PQRSD_ELIMINAR: "/api/PQRSD/delete/:idPQRSD",
    PQRSD_BUSCAR_ID: "/api/PQRSD/search/:idPQRSD",
    PQRSD_BUSCAR_USUARIO: "/api/PQRSD/usuario/:idUsuario",
    PQRSD_BUSCAR_ESTADO: "/api/PQRSD/estado/:idEstado",
    PQRSD_BUSCAR_DEPENDENCIA: "/api/PQRSD/dependencia/:idDependencia",
    PQRSD_BUSCAR_TIPO: "/api/PQRSD/tipo/:idTipo",
    PQRSD_BUSCAR_FECHAS: "/api/PQRSD/fechas/:fechaInicio/:fechaFin",
    PQRSD_PROXIMAS_VENCER: "/api/PQRSD/proximas-vencer",
    PQRSD_VENCIDAS: "/api/PQRSD/vencidas",
    PQRSD_ESTADISTICAS: "/api/PQRSD/estadisticas",

    /* Peticiones para dependencia */
    DEPENDENCIA_LISTAR: "/api/dependency/all",
    DEPENDENCIA_CREAR: "/api/dependency/add",
    DEPENDENCIA_ACTUALIZAR: "/api/dependency/update",
    DEPENDENCIA_ELIMINAR: "/api/dependency/delete/:idDependencia",
    DEPENDENCIA_BUSCAR_ID: "/api/dependency/search/:idDependencia",
    DEPENDENCIA_BUSCAR_NOMBRE: "/api/dependency/searchName/:nombreDependencia",
    DEPENDENCIA_BUSCAR_ESTADO: "/api/dependency/searchState/:activa",
    DEPENDENCIA_ESTADISTICAS: "/api/dependency/estadisticas",
    DEPENDENCIA_CON_PQRSD: "/api/dependency/withPQRSD",
    DEPENDENCIA_CON_FUNCIONARIOS: "/api/dependency/withFuncionarios",
    DEPENDENCIA_METRICAS: "/api/dependency/metrics/:idDependencia",
    DEPENDENCIA_VERIFICAR_EXISTENCIA: "/api/dependency/verify/:nombreDependencia",

    /* Peticiones para funcionario */
    FUNCIONARIO_LISTAR: "/api/functionary/all",
    FUNCIONARIO_CREAR: "/api/functionary/add",
    FUNCIONARIO_ACTUALIZAR: "/api/functionary/update",
    FUNCIONARIO_ELIMINAR: "/api/functionary/delete/:idFuncionario",
    FUNCIONARIO_BUSCAR_ID: "/api/functionary/search/:idFuncionario",
    FUNCIONARIO_BUSCAR_NOMBRE: "/api/functionary/searchName/:nombreFuncionario",
    FUNCIONARIO_BUSCAR_DEPENDENCIA: "/api/functionary/searchDependency/:idDependencia",
    FUNCIONARIO_BUSCAR_IDENTIFICACION: "/api/functionary/searchIdentification/:identificacion",

    /* Peticiones para estado PQRSD */
    ESTADO_PQRSD_LISTAR: "/api/statePQRSD/all",
    ESTADO_PQRSD_CREAR: "/api/statePQRSD/add",
    ESTADO_PQRSD_ACTUALIZAR: "/api/statePQRSD/update",
    ESTADO_PQRSD_ELIMINAR: "/api/statePQRSD/delete/:idEstadoPQRSD",
    ESTADO_PQRSD_BUSCAR_ID: "/api/statePQRSD/search/:idEstadoPQRSD",
    ESTADO_PQRSD_BUSCAR_NOMBRE: "/api/statePQRSD/searchName/:nombreEstado",

    /* Peticiones para historial estados */
    HISTORIAL_ESTADO_LISTAR: "/api/historyState/all",
    HISTORIAL_ESTADO_CREAR: "/api/historyState/add",
    HISTORIAL_ESTADO_BUSCAR_PQRSD: "/api/historyState/searchPQRSD/:idPQRSD",
    HISTORIAL_ESTADO_ESTADISTICAS: "/api/historyState/estadisticas",
    HISTORIAL_ESTADO_TIEMPO_PROMEDIO: "/api/historyState/tiempoPromedio",

    /* Peticiones para métricas */
    METRICA_LISTAR: "/api/metric/all",
    METRICA_CREAR: "/api/metric/add",
    METRICA_ACTUALIZAR: "/api/metric/update",
    METRICA_ELIMINAR: "/api/metric/delete/:idMetrica",
    METRICA_BUSCAR_ID: "/api/metric/search/:idMetrica",
    METRICA_BUSCAR_DEPENDENCIA: "/api/metric/dependencia/:idDependencia",
    METRICA_BUSCAR_TIPO: "/api/metric/tipo/:tipo",
    METRICA_BUSCAR_PERIODO: "/api/metric/periodo/:periodo",
    METRICA_DASHBOARD: "/api/metric/dashboard",
    METRICA_ESTADISTICAS: "/api/metric/estadisticas/:periodo",
    METRICA_FECHAS_CALCULO: "/api/metric/fechas-calculo/:fechaInicio/:fechaFin",

    /* Peticiones para reclasificaciones */
    RECLASIFICACION_LISTAR: "/api/reclasification/all",
    RECLASIFICACION_CREAR: "/api/reclasification/add",
    RECLASIFICACION_ACTUALIZAR: "/api/reclasification/update",
    RECLASIFICACION_BUSCAR_ID: "/api/reclasification/search/:idReclasificacion",
    RECLASIFICACION_BUSCAR_PQRSD: "/api/reclasification/pqrsd/:idPQRSD",
    RECLASIFICACION_BUSCAR_FUNCIONARIO: "/api/reclasification/funcionario/:idFuncionario",
    RECLASIFICACION_BUSCAR_ESTADO: "/api/reclasification/estado/:estado",

    /* Peticiones para alertas */
    ALERTA_LISTAR: "/api/alerta/all",
    ALERTA_CREAR: "/api/alerta/add",
    ALERTA_ACTUALIZAR: "/api/alerta/update",
    ALERTA_ELIMINAR: "/api/alerta/delete/:idAlerta",
    ALERTA_BUSCAR_ID: "/api/alerta/search/:idAlerta",
    ALERTA_BUSCAR_PQRSD: "/api/alerta/pqrsd/:idPQRSD",
    ALERTA_BUSCAR_TIPO: "/api/alerta/tipo/:tipo",
    ALERTA_MARCAR_LEIDA: "/api/alerta/markRead/:idAlerta",

    /* Peticiones para administradores */
    ADMINISTRADOR_LISTAR: "/api/admin/all",
    ADMINISTRADOR_CREAR: "/api/admin/add",
    ADMINISTRADOR_ACTUALIZAR: "/api/admin/update",
    ADMINISTRADOR_ELIMINAR: "/api/admin/delete/:idAdministrador",
    ADMINISTRADOR_BUSCAR_ID: "/api/admin/search/:idAdministrador",
    ADMINISTRADOR_BUSCAR_NOMBRE: "/api/admin/searchName/:nombreAdministrador"
};