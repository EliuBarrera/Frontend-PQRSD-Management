import React, { useState } from 'react';

export interface Dependencia {
  id: number;
  nombre: string;
  descripcion: string;
  responsableId?: number;
  responsableNombre?: string;
  activa: boolean;
  cantidadFuncionarios?: number;
  cantidadPqrsdAsignadas?: number;
}

export interface NewDependencia {
  nombre: string;
  descripcion: string;
  responsableId?: number;
}

interface DependenciasManagementProps {
  dependencias: Dependencia[];
  funcionarios: Array<{id: number; nombres: string}>;
  onAddDependencia: (dependencia: NewDependencia) => void;
  onEditDependencia: (id: number, dependencia: Partial<Dependencia>) => void;
  onToggleStatus: (id: number) => void;
  onDeleteDependencia: (id: number) => void;
}

const DependenciasManagement: React.FC<DependenciasManagementProps> = ({
  dependencias,
  funcionarios,
  onAddDependencia,
  onEditDependencia,
  onToggleStatus,
  onDeleteDependencia
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<NewDependencia>({
    nombre: '',
    descripcion: '',
    responsableId: undefined
  });

  const resetForm = () => {
    setFormData({
      nombre: '',
      descripcion: '',
      responsableId: undefined
    });
    setEditingId(null);
  };

  const handleOpenModal = (dependencia?: Dependencia) => {
    if (dependencia) {
      setFormData({
        nombre: dependencia.nombre,
        descripcion: dependencia.descripcion,
        responsableId: dependencia.responsableId
      });
      setEditingId(dependencia.id);
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
      onEditDependencia(editingId, formData);
    } else {
      onAddDependencia(formData);
    }
    handleCloseModal();
  };

  const handleInputChange = (field: keyof NewDependencia, value: string | number | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div>
      <h2 className="h3 mb-4">Gestión de Dependencias</h2>
      
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Listado de Dependencias</h5>
          <button
            className="btn btn-primary"
            onClick={() => handleOpenModal()}
          >
            <i className="fas fa-plus me-1"></i> Nueva Dependencia
          </button>
        </div>
        <div className="card-body">
          {dependencias.length === 0 ? (
            <div className="text-center py-4">
              <i className="fas fa-building fa-3x text-muted mb-3"></i>
              <h5 className="text-muted">No hay dependencias registradas</h5>
              <p className="text-muted">Comienza agregando la primera dependencia</p>
            </div>
          ) : (
            <div className="row">
              {dependencias.map((dependencia) => (
                <div key={dependencia.id} className="col-md-6 col-lg-4 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <h5 className="card-title">{dependencia.nombre}</h5>
                        <span className={`badge ${dependencia.activa ? 'bg-success' : 'bg-secondary'}`}>
                          {dependencia.activa ? 'Activa' : 'Inactiva'}
                        </span>
                      </div>
                      
                      <p className="card-text text-muted mb-3">
                        {dependencia.descripcion || 'Sin descripción'}
                      </p>
                      
                      {dependencia.responsableNombre && (
                        <div className="mb-3">
                          <small className="text-muted">Responsable:</small>
                          <div className="fw-bold">{dependencia.responsableNombre}</div>
                        </div>
                      )}
                      
                      <div className="row mb-3">
                        <div className="col-6">
                          <small className="text-muted">Funcionarios</small>
                          <div className="fw-bold text-primary">
                            {dependencia.cantidadFuncionarios || 0}
                          </div>
                        </div>
                        <div className="col-6">
                          <small className="text-muted">PQRSD Asignadas</small>
                          <div className="fw-bold text-warning">
                            {dependencia.cantidadPqrsdAsignadas || 0}
                          </div>
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-1">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleOpenModal(dependencia)}
                            title="Editar dependencia"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className={`btn btn-sm ${dependencia.activa ? 'btn-outline-warning' : 'btn-outline-success'}`}
                            onClick={() => onToggleStatus(dependencia.id)}
                            title={dependencia.activa ? 'Desactivar' : 'Activar'}
                          >
                            <i className={`fas ${dependencia.activa ? 'fa-pause' : 'fa-play'}`}></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => onDeleteDependencia(dependencia.id)}
                            title="Eliminar dependencia"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal para agregar/editar dependencia */}
      {showModal && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingId ? 'Editar Dependencia' : 'Agregar Nueva Dependencia'}
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
                    <label className="form-label">Nombre de la dependencia *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.nombre}
                      onChange={(e) => handleInputChange('nombre', e.target.value)}
                      required
                      placeholder="Ej: Secretaría de Gobierno"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={formData.descripcion}
                      onChange={(e) => handleInputChange('descripcion', e.target.value)}
                      placeholder="Descripción de las funciones y responsabilidades"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Responsable</label>
                    <select
                      className="form-select"
                      value={formData.responsableId || ''}
                      onChange={(e) => handleInputChange('responsableId', e.target.value ? Number(e.target.value) : undefined)}
                    >
                      <option value="">Seleccione un funcionario (opcional)</option>
                      {funcionarios.map((funcionario) => (
                        <option key={funcionario.id} value={funcionario.id}>
                          {funcionario.nombres}
                        </option>
                      ))}
                    </select>
                    <div className="form-text">
                      El responsable será el funcionario principal de esta dependencia
                    </div>
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
                    {editingId ? 'Actualizar' : 'Guardar'} Dependencia
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

export default DependenciasManagement;