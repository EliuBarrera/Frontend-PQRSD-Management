import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
  correo: string;
  password: string;
  tipoUsuario: 'funcionario' | 'administrador';
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    correo: '',
    password: '',
    tipoUsuario: 'funcionario'
  });

  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name as keyof LoginFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};
    
    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = 'Formato de correo inválido';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Aquí iría la lógica de autenticación con el backend
      // Por ahora simulamos una validación básica
      await simulateLogin(formData);
      
      // Redirigir según el tipo de usuario
      if (formData.tipoUsuario === 'administrador') {
        navigate('/admin/');
      } else {
        navigate('/functionary/');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setErrors({ correo: 'Credenciales incorrectas' });
    } finally {
      setIsLoading(false);
    }
  };

  // Función simulada de login - reemplazar con llamada real al API
  const simulateLogin = (data: LoginFormData): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulación básica de validación
        if (data.correo === 'admin@ideapro.com' && data.password === '123456') {
          resolve();
        } else if (data.correo === 'funcionario@ideapro.com' && data.password === '123456') {
          resolve();
        } else {
          reject(new Error('Credenciales incorrectas'));
        }
      }, 1000);
    });
  };

  return (

    <div className="flex items-center justify-center h-150">
      <div className="text-slate-700 bg-white rounded-2xl shadow-lg p-10 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Acceso al Sistema PQRSD</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Selector de tipo de usuario */}
          <div className="flex justify-between items-center">
            <label htmlFor="tipoUsuario">Tipo de Usuario</label>
            <select
              id="tipoUsuario"
              name="tipoUsuario"
              value={formData.tipoUsuario}
              onChange={handleInputChange}
              className='border border-gray-400 bg-gray-200 px-3 py-2 rounded-md'
              required
            >
              <option value="funcionario">Funcionario</option>
              <option value="administrador">Administrador</option>
            </select>
            {errors.tipoUsuario && <span className="text-sm w-45 md:w-65">{errors.tipoUsuario}</span>}
          </div>

          {/* Campo de correo */}
          <div className="flex justify-between items-center">
            <label htmlFor="correo">Correo electrónico</label>
            <div>
              <input
                type="email"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleInputChange}
                className={`form-control ${errors.correo ? 'error' : ''} w-45 md:w-65`}
                required
                autoComplete="username"
                placeholder="ejemplo@correo.com"
              />
              {errors.correo && <span className="text-[#f39200] text-sm w-45 md:w-65">{errors.correo}</span>}
            </div>
          </div>

          {/* Campo de contraseña */}
          <div className="flex justify-between items-center">
            <label htmlFor="password">Contraseña</label>
            <div className="grid grid-row-2">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-control ${errors.password ? 'error' : ''} mb-2 w-45 md:w-65`}
                required
                autoComplete="current-password"
                placeholder="• • • • • • • • • • • •"
              />
              {errors.password && <span className="text-[#f39200] text-sm w-45 md:w-65">{errors.password}</span>}
            </div>
          </div>

          {/* Botón de envío */}
          <button 
            type="submit" 
            className={`btn login-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;