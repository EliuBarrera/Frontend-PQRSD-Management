// ServicioPost.ts - Versión mejorada con debug
export class ServicioPost {
  
  public static peticionPost = async (urlServicio: string, objetoEnviar: any) => {
    console.group("🚀 SERVICIO POST DEBUG");
    console.log("📡 URL:", urlServicio);
    console.log("📦 Datos a enviar:", objetoEnviar);
    
    try {
      const configuracion = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objetoEnviar)
      };
      
      console.log("⚙️ Configuración fetch:", configuracion);
      
      const respuesta = await fetch(urlServicio, configuracion);
      
      console.log("📥 Status respuesta:", respuesta.status);
      console.log("📥 Status text:", respuesta.statusText);
      console.log("📥 Es OK (200-299):", respuesta.ok);
      console.log("📥 Headers:", Object.fromEntries(respuesta.headers.entries()));
      
      // Verificar si la respuesta es exitosa (incluyendo 201 Created)
      if (respuesta.ok) {
        const contentType = respuesta.headers.get("content-type");
        console.log("📄 Content-Type:", contentType);
        
        if (contentType && contentType.includes("application/json")) {
          const datosRespuesta = await respuesta.json();
          console.log("✅ Respuesta JSON exitosa:", datosRespuesta);
          console.groupEnd();
          return datosRespuesta;
        } else {
          // Si no es JSON, intentar obtener como texto
          const textoRespuesta = await respuesta.text();
          console.log("✅ Respuesta texto exitosa:", textoRespuesta);
          console.groupEnd();
          
          // Devolver un objeto estándar si no hay JSON
          return {
            success: true,
            status: respuesta.status,
            message: textoRespuesta || "Operación exitosa",
            data: null
          };
        }
      } else {
        // Manejar errores HTTP
        console.error("❌ Error HTTP:", respuesta.status, respuesta.statusText);
        
        let mensajeError = `Error ${respuesta.status}: ${respuesta.statusText}`;
        let datosError = null;
        
        try {
          // Intentar obtener detalles del error
          const contentType = respuesta.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            datosError = await respuesta.json();
            mensajeError = datosError.message || datosError.error || mensajeError;
          } else {
            const textoError = await respuesta.text();
            if (textoError) mensajeError = textoError;
          }
        } catch (errorParseError) {
          console.warn("⚠️ No se pudo parsear error del servidor");
        }
        
        console.error("❌ Mensaje error final:", mensajeError);
        console.error("❌ Datos error:", datosError);
        console.groupEnd();
        
        throw new Error(mensajeError);
      }
      
    } catch (error) {
      console.error("💥 Error en petición POST:", error);
      console.groupEnd();
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error("Error de conexión. Verifique su conexión a internet.");
      }
      
      throw error;
    }
  };
}

// // Versión alternativa con async/await más robusta
// export class ServicioPostRobusto {
  
//   public static async peticionPost(url: string, datos: any): Promise<any> {
//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout
    
//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//         },
//         body: JSON.stringify(datos),
//         signal: controller.signal
//       });

//       clearTimeout(timeoutId);

//       console.log(`[${new Date().toISOString()}] POST ${url} -> ${response.status}`);

//       // Manejar respuestas exitosas (200-299)
//       if (response.ok) {
//         const contentType = response.headers.get('content-type');
        
//         if (contentType?.includes('application/json')) {
//           const result = await response.json();
//           console.log('✅ Respuesta exitosa:', result);
//           return result;
//         } else {
//           // Respuesta no JSON pero exitosa
//           const text = await response.text();
//           return {
//             success: true,
//             message: 'Operación completada exitosamente',
//             data: text,
//             status: response.status
//           };
//         }
//       } 
      
//       // Manejar errores HTTP
//       let errorMessage = `Error HTTP ${response.status}`;
//       try {
//         const errorData = await response.json();
//         errorMessage = errorData.message || errorData.error || errorMessage;
//       } catch {
//         errorMessage += `: ${response.statusText}`;
//       }
      
//       throw new Error(errorMessage);

//     } catch (error: any) {
//       clearTimeout(timeoutId);
      
//       if (error.name === 'AbortError') {
//         throw new Error('La solicitud excedió el tiempo límite');
//       }
      
//       if (error instanceof TypeError && error.message.includes('fetch')) {
//         throw new Error('Error de conexión. Verifique su internet.');
//       }
      
//       console.error('Error en petición POST:', error);
//       throw error;
//     }
//   }
// }