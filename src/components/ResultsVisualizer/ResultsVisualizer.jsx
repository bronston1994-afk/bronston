// Компонент визуализации результатов расчетов АПС
import React, { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer,
  AreaChart, Area
} from 'recharts'
import './ResultsVisualizer.css'

const ResultsVisualizer = ({ results, project }) => {
  const [activeTab, setActiveTab] = useState('overview')

  if (!results) {
    return (
      <div className="results-placeholder">
        <p>Выполните расчет для просмотра результатов</p>
      </div>
    )
  }

  // Данные для графиков
  const equipmentData = [
    { name: 'Дымовые извещатели', value: results.smokeDetectors, color: '#1677ff' },
    { name: 'Тепловые извещатели', value: results.heatDetectors, color: '#fa8c16' },
    { name: 'Ручные извещатели', value: results.manualCallPoints, color: '#ff4d4f' },
    { name: 'Звуковые оповещатели', value: results.sounders, color: '#52c41a' },
    { name: 'ППКП', value: results.controlPanels, color: '#722ed1' }
  ]

  const costBredownData = [
    { name: 'Извещатели', value: (results.smokeDetectors * 2500 + results.heatDetectors * 1800), color: '#1677ff' },
    { name: 'Оповещатели', value: results.sounders * 800, color: '#52c41a' },
    { name: 'ППКП', value: results.controlPanels * 45000, color: '#722ed1' },
    { name: 'Кабель', value: results.cableLength * 150, color: '#fa8c16' },
    { name: 'Прочее', value: results.totalCost * 0.1, color: '#8c8c8c' }
  ]

  const comparisonData = [
    {
      category: 'Извещатели',
      'Дымовые': results.smokeDetectors,
      'Тепловые': results.heatDetectors
    },
    {
      category: 'Система',
      'Зоны': results.zones,
      'ППКП': results.controlPanels
    },
    {
      category: 'Оповещение',
      'Звуковые': results.sounders,
      'Ручные': results.manualCallPoints
    }
  ]

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(value)
  }

  const formatNumber = (value) => {
    return new Intl.NumberFormat('ru-RU').format(value)
  }

  const tabs = [
    { id: 'overview', label: 'Обзор', icon: '📊' },
    { id: 'equipment', label: 'Оборудование', icon: '🔧' },
    { id: 'costs', label: 'Стоимость', icon: '💰' },
    { id: 'technical', label: 'Технические данные', icon: '⚙️' }
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatNumber(entry.value)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const renderOverview = () => (
    <div className="results-overview">
      <div className="summary-cards">
        <div className="summary-card primary">
          <div className="card-icon">🔥</div>
          <div className="card-content">
            <h3>Общая стоимость</h3>
            <div className="card-value">{formatCurrency(results.totalCost)}</div>
            <div className="card-subtitle">
              {formatCurrency(results.summary?.costPerSquareMeter || 0)}/м²
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">🔍</div>
          <div className="card-content">
            <h3>Всего извещателей</h3>
            <div className="card-value">{formatNumber(results.summary?.totalDetectors || 0)}</div>
            <div className="card-subtitle">
              {Math.round((results.summary?.coverageArea || 0) / (results.summary?.totalDetectors || 1))} м²/извещатель
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">🏗️</div>
          <div className="card-content">
            <h3>Зоны контроля</h3>
            <div className="card-value">{formatNumber(results.zones)}</div>
            <div className="card-subtitle">
              {results.controlPanels} ППКП
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">🔌</div>
          <div className="card-content">
            <h3>Кабель</h3>
            <div className="card-value">{formatNumber(results.cableLength)} м</div>
            <div className="card-subtitle">
              с запасом 15%
            </div>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h4>Распределение оборудования</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={equipmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {equipmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h4>Сравнение по категориям</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="Дымовые" fill="#1677ff" />
              <Bar dataKey="Тепловые" fill="#fa8c16" />
              <Bar dataKey="Зоны" fill="#52c41a" />
              <Bar dataKey="ППКП" fill="#722ed1" />
              <Bar dataKey="Звуковые" fill="#13c2c2" />
              <Bar dataKey="Ручные" fill="#ff4d4f" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )

  const renderEquipment = () => (
    <div className="equipment-details">
      <div className="equipment-table">
        <table>
          <thead>
            <tr>
              <th>Тип оборудования</th>
              <th>Количество</th>
              <th>Единица</th>
              <th>Цена за ед.</th>
              <th>Сумма</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Дымовые извещатели</td>
              <td>{formatNumber(results.smokeDetectors)}</td>
              <td>шт</td>
              <td>{formatCurrency(2500)}</td>
              <td>{formatCurrency(results.smokeDetectors * 2500)}</td>
            </tr>
            <tr>
              <td>Тепловые извещатели</td>
              <td>{formatNumber(results.heatDetectors)}</td>
              <td>шт</td>
              <td>{formatCurrency(1800)}</td>
              <td>{formatCurrency(results.heatDetectors * 1800)}</td>
            </tr>
            <tr>
              <td>Ручные извещатели</td>
              <td>{formatNumber(results.manualCallPoints)}</td>
              <td>шт</td>
              <td>{formatCurrency(1200)}</td>
              <td>{formatCurrency(results.manualCallPoints * 1200)}</td>
            </tr>
            <tr>
              <td>Звуковые оповещатели</td>
              <td>{formatNumber(results.sounders)}</td>
              <td>шт</td>
              <td>{formatCurrency(800)}</td>
              <td>{formatCurrency(results.sounders * 800)}</td>
            </tr>
            <tr>
              <td>ППКП</td>
              <td>{formatNumber(results.controlPanels)}</td>
              <td>шт</td>
              <td>{formatCurrency(45000)}</td>
              <td>{formatCurrency(results.controlPanels * 45000)}</td>
            </tr>
            <tr>
              <td>Кабель пожарный</td>
              <td>{formatNumber(results.cableLength)}</td>
              <td>м</td>
              <td>{formatCurrency(150)}</td>
              <td>{formatCurrency(results.cableLength * 150)}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4"><strong>Итого:</strong></td>
              <td><strong>{formatCurrency(results.totalCost)}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="equipment-chart">
        <h4>Количество оборудования</h4>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={equipmentData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={150} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill="#1677ff" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )

  const renderCosts = () => (
    <div className="costs-analysis">
      <div className="cost-breakdown">
        <h4>Структура стоимости</h4>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={costBredownData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent, value }) =>
                `${name}: ${formatCurrency(value)} (${(percent * 100).toFixed(1)}%)`
              }
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {costBredownData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(value)} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="cost-metrics">
        <div className="metric-card">
          <h5>Стоимость за м²</h5>
          <div className="metric-value">
            {formatCurrency(results.summary?.costPerSquareMeter || 0)}
          </div>
        </div>

        <div className="metric-card">
          <h5>Стоимость за извещатель</h5>
          <div className="metric-value">
            {formatCurrency(Math.round(results.totalCost / (results.summary?.totalDetectors || 1)))}
          </div>
        </div>

        <div className="metric-card">
          <h5>Стоимость за зону</h5>
          <div className="metric-value">
            {formatCurrency(Math.round(results.totalCost / results.zones))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderTechnical = () => (
    <div className="technical-data">
      <div className="tech-specs">
        <h4>Технические характеристики системы</h4>

        <div className="specs-grid">
          <div className="spec-group">
            <h5>Покрытие</h5>
            <div className="spec-item">
              <span>Общая площадь:</span>
              <span>{formatNumber(results.summary?.coverageArea || 0)} м²</span>
            </div>
            <div className="spec-item">
              <span>Плотность извещателей:</span>
              <span>{Math.round((results.summary?.coverageArea || 0) / (results.summary?.totalDetectors || 1))} м²/извещатель</span>
            </div>
            <div className="spec-item">
              <span>Соотношение дым/тепло:</span>
              <span>{Math.round((results.smokeDetectors / (results.smokeDetectors + results.heatDetectors)) * 100)}% / {Math.round((results.heatDetectors / (results.smokeDetectors + results.heatDetectors)) * 100)}%</span>
            </div>
          </div>

          <div className="spec-group">
            <h5>Система управления</h5>
            <div className="spec-item">
              <span>Количество зон:</span>
              <span>{formatNumber(results.zones)}</span>
            </div>
            <div className="spec-item">
              <span>ППКП:</span>
              <span>{formatNumber(results.controlPanels)} шт</span>
            </div>
            <div className="spec-item">
              <span>Зон на ППКП:</span>
              <span>{Math.round(results.zones / results.controlPanels)}</span>
            </div>
          </div>

          <div className="spec-group">
            <h5>Кабельная система</h5>
            <div className="spec-item">
              <span>Общая длина:</span>
              <span>{formatNumber(results.cableLength)} м</span>
            </div>
            <div className="spec-item">
              <span>Запас кабеля:</span>
              <span>15%</span>
            </div>
            <div className="spec-item">
              <span>Метров на м² площади:</span>
              <span>{(results.cableLength / (results.summary?.coverageArea || 1)).toFixed(2)} м/м²</span>
            </div>
          </div>

          <div className="spec-group">
            <h5>Оповещение</h5>
            <div className="spec-item">
              <span>Звуковые оповещатели:</span>
              <span>{formatNumber(results.sounders)} шт</span>
            </div>
            <div className="spec-item">
              <span>Ручные извещатели:</span>
              <span>{formatNumber(results.manualCallPoints)} шт</span>
            </div>
            <div className="spec-item">
              <span>Покрытие оповещателя:</span>
              <span>~{Math.round((results.summary?.coverageArea || 0) / results.sounders)} м²</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="results-visualizer">
      <div className="results-header">
        <h3>Результаты расчета АПС</h3>
        {project && (
          <div className="project-badge">
            {project.name} - {project.object_name}
          </div>
        )}
      </div>

      <div className="results-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="results-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'equipment' && renderEquipment()}
        {activeTab === 'costs' && renderCosts()}
        {activeTab === 'technical' && renderTechnical()}
      </div>
    </div>
  )
}

export default ResultsVisualizer