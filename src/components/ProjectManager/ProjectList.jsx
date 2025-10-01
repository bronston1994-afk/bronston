// Компонент списка проектов АПС
import React, { useState } from 'react'
import { useProjects } from '../../hooks/useProjects'
import './ProjectManager.css'

const ProjectList = ({ onSelectProject, onCreateProject }) => {
  const { projects, loading, error, deleteProject } = useProjects()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('created_at')

  // Фильтрация и сортировка проектов
  const filteredProjects = projects
    .filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.object_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.customer?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === 'created_at') return new Date(b.created_at) - new Date(a.created_at)
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'budget') return (b.budget || 0) - (a.budget || 0)
      return 0
    })

  // Статусы проектов для фильтра
  const statuses = [
    { value: 'all', label: 'Все статусы' },
    { value: 'проектирование', label: 'Проектирование' },
    { value: 'согласование', label: 'Согласование' },
    { value: 'монтаж', label: 'Монтаж' },
    { value: 'пуско_наладка', label: 'Пуско-наладка' },
    { value: 'сдача', label: 'Сдача' },
    { value: 'эксплуатация', label: 'Эксплуатация' },
    { value: 'завершен', label: 'Завершен' }
  ]

  const getStatusColor = (status) => {
    const colors = {
      'проектирование': '#1677ff',
      'согласование': '#fadb14',
      'монтаж': '#fa8c16',
      'пуско_наладка': '#52c41a',
      'сдача': '#722ed1',
      'эксплуатация': '#13c2c2',
      'завершен': '#52c41a'
    }
    return colors[status] || '#666'
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount || 0)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU')
  }

  if (loading) {
    return (
      <div className="project-list-loading">
        <div className="loading-spinner"></div>
        <p>Загрузка проектов...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="project-list-error">
        <p>Ошибка загрузки проектов: {error}</p>
      </div>
    )
  }

  return (
    <div className="project-list">
      {/* Заголовок и кнопка создания */}
      <div className="project-list-header">
        <h2>Проекты АПС</h2>
        <button className="btn-primary" onClick={onCreateProject}>
          + Создать проект
        </button>
      </div>

      {/* Фильтры и поиск */}
      <div className="project-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Поиск по названию, объекту или заказчику..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            {statuses.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="created_at">По дате создания</option>
            <option value="name">По названию</option>
            <option value="budget">По бюджету</option>
          </select>
        </div>
      </div>

      {/* Статистика */}
      <div className="project-stats">
        <div className="stat-item">
          <span className="stat-label">Всего проектов:</span>
          <span className="stat-value">{filteredProjects.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Общий бюджет:</span>
          <span className="stat-value">
            {formatCurrency(filteredProjects.reduce((sum, p) => sum + (p.budget || 0), 0))}
          </span>
        </div>
      </div>

      {/* Список проектов */}
      <div className="projects-grid">
        {filteredProjects.length === 0 ? (
          <div className="no-projects">
            <p>Проекты не найдены</p>
            {searchTerm || statusFilter !== 'all' ? (
              <button
                className="btn-secondary"
                onClick={() => {
                  setSearchTerm('')
                  setStatusFilter('all')
                }}
              >
                Сбросить фильтры
              </button>
            ) : (
              <button className="btn-primary" onClick={onCreateProject}>
                Создать первый проект
              </button>
            )}
          </div>
        ) : (
          filteredProjects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-card-header">
                <h3 className="project-name">{project.name}</h3>
                <span
                  className="project-status"
                  style={{ backgroundColor: getStatusColor(project.status) }}
                >
                  {project.status}
                </span>
              </div>

              <div className="project-card-body">
                <div className="project-info">
                  <div className="info-row">
                    <span className="info-label">Объект:</span>
                    <span className="info-value">{project.object_name}</span>
                  </div>
                  {project.address && (
                    <div className="info-row">
                      <span className="info-label">Адрес:</span>
                      <span className="info-value">{project.address}</span>
                    </div>
                  )}
                  {project.customer && (
                    <div className="info-row">
                      <span className="info-label">Заказчик:</span>
                      <span className="info-value">{project.customer}</span>
                    </div>
                  )}
                  {project.building_types && (
                    <div className="info-row">
                      <span className="info-label">Тип здания:</span>
                      <span className="info-value">
                        {project.building_types.code} - {project.building_types.name}
                      </span>
                    </div>
                  )}
                  {project.budget && (
                    <div className="info-row">
                      <span className="info-label">Бюджет:</span>
                      <span className="info-value budget">{formatCurrency(project.budget)}</span>
                    </div>
                  )}
                  {project.users && (
                    <div className="info-row">
                      <span className="info-label">Ответственный:</span>
                      <span className="info-value">{project.users.full_name}</span>
                    </div>
                  )}
                </div>

                <div className="project-dates">
                  <div className="date-info">
                    <span className="date-label">Создан:</span>
                    <span className="date-value">{formatDate(project.created_at)}</span>
                  </div>
                  {project.start_date && (
                    <div className="date-info">
                      <span className="date-label">Начало:</span>
                      <span className="date-value">{formatDate(project.start_date)}</span>
                    </div>
                  )}
                  {project.completion_date && (
                    <div className="date-info">
                      <span className="date-label">Завершение:</span>
                      <span className="date-value">{formatDate(project.completion_date)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="project-card-actions">
                <button
                  className="btn-secondary"
                  onClick={() => onSelectProject(project)}
                >
                  Открыть
                </button>
                <button
                  className="btn-primary"
                  onClick={() => onSelectProject(project, 'calculate')}
                >
                  Расчет АПС
                </button>
                <button
                  className="btn-danger"
                  onClick={() => {
                    if (window.confirm(`Удалить проект "${project.name}"?`)) {
                      deleteProject(project.id)
                    }
                  }}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ProjectList