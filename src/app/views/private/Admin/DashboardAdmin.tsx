import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RefreshCw, FileText, Clock, AlertTriangle, TrendingUp } from 'lucide-react';

const DashboardAdmin = () => {
  // Datos para las estadísticas
  const statsData = [
    {
      title: 'Total PQRSD',
      value: '342',
      icon: FileText,
      change: '+18%',
      changeType: 'positive',
      color: 'text-blue-600'
    },
    {
      title: 'Pendientes',
      value: '56',
      icon: Clock,
      subtitle: '12 vencen hoy',
      changeType: 'warning',
      color: 'text-yellow-600'
    },
    {
      title: 'Reclasificaciones',
      value: '8',
      icon: TrendingUp,
      subtitle: '5 pendientes de revisión',
      changeType: 'info',
      color: 'text-cyan-600'
    },
    {
      title: 'Extemporáneas',
      value: '24',
      icon: AlertTriangle,
      change: '+8%',
      changeType: 'negative',
      color: 'text-red-600'
    }
  ];

  // Datos para gráficos
  const typeData = [
    { name: 'Peticiones', value: 120, color: '#3b82f6' },
    { name: 'Quejas', value: 85, color: '#eab308' },
    { name: 'Reclamos', value: 45, color: '#ef4444' },
    { name: 'Solicitudes', value: 60, color: '#06b6d4' },
    { name: 'Denuncias', value: 32, color: '#8b5cf6' }
  ];

  const departmentData = [
    { name: 'Gobierno', value: 65 },
    { name: 'Obras Públicas', value: 89 },
    { name: 'Planeación', value: 45 },
    { name: 'Hacienda', value: 32 },
    { name: 'Cultura', value: 28 },
    { name: 'Alcaldía', value: 83 }
  ];

  const timelineData = [
    { mes: 'Ene', pqrsd: 65 },
    { mes: 'Feb', pqrsd: 59 },
    { mes: 'Mar', pqrsd: 80 },
    { mes: 'Abr', pqrsd: 81 },
    { mes: 'May', pqrsd: 56 },
    { mes: 'Jun', pqrsd: 55 },
    { mes: 'Jul', pqrsd: 40 },
    { mes: 'Ago', pqrsd: 57 }
  ];

  return (
    <div className="w-full space-y-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Dashboard de Administración</h1>
          <p className="text-slate-600 mt-1">Vista general del sistema PQRSD</p>
        </div>
        <button className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-md">
          <RefreshCw className="w-4 h-4" />
          <span>Actualizar</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border-l-4 border-orange-500"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-2">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                  {stat.change && (
                    <p className={`text-sm mt-2 ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change} desde el mes pasado
                    </p>
                  )}
                  {stat.subtitle && (
                    <p className={`text-sm mt-2 ${
                      stat.changeType === 'warning' ? 'text-orange-600' : 'text-cyan-600'
                    }`}>
                      {stat.subtitle}
                    </p>
                  )}
                </div>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-slate-800 mb-4">PQRSD por Tipo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={typeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {typeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-slate-800 mb-4">PQRSD por Dependencia</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#1e293b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Evolución Mensual de PQRSD</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="pqrsd" 
              stroke="#f97316" 
              strokeWidth={3}
              name="PQRSD Recibidas"
              dot={{ fill: '#f97316', r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Alertas Recientes</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-red-900">12 PQRSD vencen hoy</p>
              <p className="text-sm text-red-700">Requieren atención inmediata</p>
            </div>
            <button className="text-sm text-red-600 hover:text-red-800 font-medium">
              Ver detalles
            </button>
          </div>
          <div className="flex items-start space-x-3 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
            <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-yellow-900">24 PQRSD por vencer</p>
              <p className="text-sm text-yellow-700">En los próximos 3 días</p>
            </div>
            <button className="text-sm text-yellow-600 hover:text-yellow-800 font-medium">
              Ver detalles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;