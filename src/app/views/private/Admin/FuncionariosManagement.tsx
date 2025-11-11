import React, { useState } from 'react';

export interface Funcionario {
  id: number;
  nombres: string;
  identificacion: string;
  correo: string;
  cargo: string;
  dependenciaId: number;
  dependenciaNombre: string;
  activo: boolean;
  fechaCreacion: string;
}

export interface NewFuncionario {
  nombres: string;
  identificacion: string;
  correo: string;
  cargo: string;
  dependenciaId: number;
}

interface FuncionariosManagementProps {
  funcionarios: Funcionario[];
  dependencias: Array<{id: number; nombre: string}>;
  onAddFuncionario: (funcionario: NewFuncionario) => void;
  onEditFuncionario: (id: number, funcionario: Partial<Funcionario>) => void;
  onToggleStatus: (id: number) => void;
  onDeleteFuncionario: (id: number) => void;
}

const FuncionariosManagement: React.FC<FuncionariosManagementProps> = ({
  funcionarios,
  dependencias,
  onAddFuncionario,
  onEditFuncionario,
  onToggleStatus,
  onDeleteFuncionario
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<NewFuncionario>({
    nombres: '',
    identificacion: '',
    correo: '',
    cargo: '',
    dependenciaId: 0
  });

  const resetForm = () => {
    setFormData({
      nombres: '',
      identificacion: '',
      correo: '',
      cargo: '',
      dependenciaId: 0
    });
    setEditingId(null);
  };

  const handleOpenModal = (funcionario?: Funcionario) => {
    if (funcionario) {
      setFormData({
        nombres: funcionario.nombres,
        identificacion: funcionario.identificacion,
        correo: funcionario.correo,
        cargo: funcionario.cargo,
        dependenciaId: funcionario.dependenciaId
      });
      setEditingId(funcionario.id);
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onEditFuncionario(editingId, formData);
    } else {
      onAddFuncionario(formData);
    }
    handleCloseModal();
  };

  const handleInputChange = (field: keyof NewFuncionario, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div>
      <h2 className="h3 mb-4">Gestión de Funcionarios</h2>
      
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Listado de Funcionarios</h5>
          <button
            className="btn btn-primary"
            onClick={() => handleOpenModal()}
          >
            <i className="fas fa-plus me-1"></i> Nuevo Funcionario
          </button>
        </div>
        <div className="card-body">
          {funcionarios.length === 0 ? (
            <div className="text-center py-4">
              <i className="fas fa-users fa-3x text-muted mb-3"></i>
              <h5 className="text-muted">No hay funcionarios registrados</h5>
              <p className="text-muted">Comienza agregando el primer funcionario</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Identificación</th>
                    <th>Correo</th>
                    <th>Cargo</th>
                    <th>Dependencia</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {funcionarios.map((funcionario) => (
                    <tr key={funcionario.id}>
                      <td>{funcionario.nombres}</td>
                      <td>{funcionario.identificacion}</td>
                      <td>{funcionario.correo}</td>
                      <td>{funcionario.cargo}</td>
                      <td>{funcionario.dependenciaNombre}</td>
                      <td>
                        <span className={`badge ${funcionario.activo ? 'bg-success' : 'bg-secondary'}`}>
                          {funcionario.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleOpenModal(funcionario)}
                            title="Editar funcionario"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className={`btn btn-sm ${funcionario.activo ? 'btn-outline-warning' : 'btn-outline-success'}`}
                            onClick={() => onToggleStatus(funcionario.id)}
                            title={funcionario.activo ? 'Desactivar' : 'Activar'}
                          >
                            <i className={`fas ${funcionario.activo ? 'fa-pause' : 'fa-play'}`}></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => onDeleteFuncionario(funcionario.id)}
                            title="Eliminar funcionario"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal para agregar/editar funcionario */}
      {showModal && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingId ? 'Editar Funcionario' : 'Agregar Nuevo Funcionario'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nombres completos *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.nombres}
                      onChange={(e) => handleInputChange('nombres', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Número de identificación *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.identificacion}
                      onChange={(e) => handleInputChange('identificacion', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Correo electrónico *</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.correo}
                      onChange={(e) => handleInputChange('correo', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Cargo *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.cargo}
                      onChange={(e) => handleInputChange('cargo', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Dependencia *</label>
                    <select
                      className="form-select"
                      value={formData.dependenciaId}
                      onChange={(e) => handleInputChange('dependenciaId', Number(e.target.value))}
                      required
                    >
                      <option value={0}>Seleccione una dependencia</option>
                      {dependencias.map((dep) => (
                        <option key={dep.id} value={dep.id}>
                          {dep.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingId ? 'Actualizar' : 'Guardar'} Funcionario
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FuncionariosManagement;