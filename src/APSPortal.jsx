// Главный компонент АПС портала с интегрированными функциями
import React, { useState, useEffect } from 'react'
import './APSPortal.css'

// Создаем заглушки для компонентов, которые еще создаются
const ProjectList = ({ onCreateProject }) => (
  <div style={{ padding: '40px', textAlign: 'center' }}>
    <h2>📁 Проекты АПС</h2>
    <p>Раздел в разработке...</p>
    <button onClick={onCreateProject} style={{
      padding: '10px 20px',
      background: '#1677ff',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer'
    }}>
      + Создать проект
    </button>
  </div>
)

const ProjectForm = ({ onSave, onCancel }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  }}>
    <div style={{
      background: 'white',
      color: '#262626',
      padding: '30px',
      borderRadius: '12px',
      maxWidth: '500px',
      width: '90%'
    }}>
      <h3>Создание проекта</h3>
      <p>Форма создания проекта в разработке...</p>
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button onClick={onCancel} style={{
          padding: '8px 16px',
          background: '#f5f5f5',
          border: '1px solid #d9d9d9',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Отмена
        </button>
        <button onClick={() => onSave({ name: 'Тестовый проект', object_name: 'Тестовый объект' })} style={{
          padding: '8px 16px',
          background: '#1677ff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Сохранить
        </button>
      </div>
    </div>
  </div>
)

const CalculationWizard = ({ project, onSave, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    { title: 'Здание', icon: '🏢' },
    { title: 'Оборудование', icon: '🔧' },
    { title: 'Расчет', icon: '⚙️' },
    { title: 'Результаты', icon: '📊' }
  ]

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        color: '#262626',
        borderRadius: '12px',
        maxWidth: '800px',
        width: '90%',
        maxHeight: '90%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Заголовок */}
        <div style={{
          background: 'linear-gradient(135deg, #1677ff, #0958d9)',
          color: 'white',
          padding: '20px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ margin: 0 }}>🧮 Мастер расчета АПС</h3>
          <button onClick={onCancel} style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}>✕</button>
        </div>

        {/* Прогресс */}
        <div style={{
          background: 'white',
          color: '#262626',
          padding: '20px 30px',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {steps.map((step, index) => (
              <div key={index} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
                opacity: index + 1 <= currentStep ? 1 : 0.5
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: index + 1 <= currentStep ? '#1677ff' : '#f5f5f5',
                  color: index + 1 <= currentStep ? 'white' : '#8c8c8c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  marginBottom: '8px'
                }}>
                  {step.icon}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>
                  {step.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Контент */}
        <div style={{
          flex: 1,
          padding: '30px',
          overflow: 'auto'
        }}>
          {currentStep === 1 && (
            <div>
              <h4>Параметры здания</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Площадь (м²)</label>
                  <input type="number" defaultValue="5000" style={{
                    width: '100%', padding: '8px', border: '1px solid #d9d9d9', borderRadius: '6px'
                  }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Этажи</label>
                  <input type="number" defaultValue="10" style={{
                    width: '100%', padding: '8px', border: '1px solid #d9d9d9', borderRadius: '6px'
                  }} />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h4>Выбор оборудования</h4>
              <div style={{ display: 'grid', gap: '15px' }}>
                {['Дымовые извещатели', 'Тепловые извещатели', 'Ручные извещатели', 'Оповещатели'].map((item, index) => (
                  <label key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input type="checkbox" defaultChecked />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h4>Параметры расчета</h4>
              <div style={{ display: 'grid', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Площадь покрытия извещателя (м²)</label>
                  <input type="number" defaultValue="85" style={{
                    width: '200px', padding: '8px', border: '1px solid #d9d9d9', borderRadius: '6px'
                  }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Тип системы</label>
                  <select style={{
                    width: '200px', padding: '8px', border: '1px solid #d9d9d9', borderRadius: '6px'
                  }}>
                    <option>Адресная</option>
                    <option>Пороговая</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h4>Результаты расчета</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.9rem', color: '#8c8c8c' }}>Дымовые извещатели</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1677ff' }}>47 шт</div>
                </div>
                <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.9rem', color: '#8c8c8c' }}>Тепловые извещатели</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fa8c16' }}>12 шт</div>
                </div>
                <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.9rem', color: '#8c8c8c' }}>Оповещатели</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#52c41a' }}>15 шт</div>
                </div>
                <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.9rem', color: '#8c8c8c' }}>Общая стоимость</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#722ed1' }}>850 000 ₽</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Навигация */}
        <div style={{
          background: 'white',
          color: '#262626',
          padding: '20px 30px',
          borderTop: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            {currentStep > 1 && (
              <button onClick={() => setCurrentStep(currentStep - 1)} style={{
                padding: '8px 16px',
                background: '#f5f5f5',
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
                ← Назад
              </button>
            )}
          </div>

          <div style={{ color: '#8c8c8c', fontSize: '0.9rem' }}>
            Шаг {currentStep} из {steps.length}
          </div>

          <div>
            {currentStep < steps.length ? (
              <button onClick={() => setCurrentStep(currentStep + 1)} style={{
                padding: '8px 16px',
                background: '#1677ff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
                {currentStep === 3 ? 'Рассчитать' : 'Далее'} →
              </button>
            ) : (
              <button onClick={() => {
                onSave({
                  projectId: project?.id,
                  results: {
                    smokeDetectors: 47,
                    heatDetectors: 12,
                    manualCallPoints: 8,
                    sounders: 15,
                    zones: 5,
                    controlPanels: 2,
                    totalCost: 850000
                  }
                })
              }} style={{
                padding: '8px 16px',
                background: '#52c41a',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
                Сохранить расчет
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Заглушки для хуков
const useProjects = () => ({
  projects: [
    {
      id: '1',
      name: 'ЖК "Солнечный"',
      object_name: 'Многоквартирный дом',
      status: 'проектирование',
      budget: 2500000,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Офисный центр "Престиж"',
      object_name: 'Административное здание',
      status: 'монтаж',
      budget: 1800000,
      created_at: new Date().toISOString()
    }
  ],
  createProject: async (data) => console.log('Creating project:', data),
  updateProject: async (id, data) => console.log('Updating project:', id, data),
  fetchProjects: async () => console.log('Fetching projects')
})

const useCalculations = () => ({
  calculations: [
    {
      id: '1',
      aps_projects: { name: 'ЖК "Солнечный"', object_name: 'Многоквартирный дом' },
      calculation_date: new Date().toISOString(),
      smoke_detectors_count: 50,
      heat_detectors_count: 12,
      estimated_cost: 850000
    }
  ],
  saveCalculation: async (data) => console.log('Saving calculation:', data)
})

const APSPortal = () => {
  // Состояния портала
  const [activeSection, setActiveSection] = useState('dashboard')
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showCalculationWizard, setShowCalculationWizard] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [editingProject, setEditingProject] = useState(null)

  // Хуки для работы с данными
  const { projects, createProject, updateProject, fetchProjects } = useProjects()
  const { calculations, saveCalculation } = useCalculations()

  // Статистика портала
  const [portalStats, setPortalStats] = useState({
    totalProjects: 0,
    activeCalculations: 0,
    totalBudget: 0,
    completedProjects: 0
  })

  // Обновление статистики
  useEffect(() => {
    if (projects.length > 0) {
      const stats = {
        totalProjects: projects.length,
        activeCalculations: calculations.length,
        totalBudget: projects.reduce((sum, p) => sum + (p.budget || 0), 0),
        completedProjects: projects.filter(p => p.status === 'завершен').length
      }
      setPortalStats(stats)
    }
  }, [projects, calculations])

  // Навигационное меню
  const navigationSections = [
    {
      id: 'dashboard',
      title: 'Главная',
      icon: '🏠',
      description: 'Обзор портала и статистика'
    },
    {
      id: 'projects',
      title: 'Проекты',
      icon: '📁',
      description: 'Управление проектами АПС'
    },
    {
      id: 'calculator',
      title: 'Калькулятор',
      icon: '🧮',
      description: 'Расчет оборудования АПС'
    },
    {
      id: 'calculations',
      title: 'Расчеты',
      icon: '📊',
      description: 'История расчетов'
    },
    {
      id: 'reports',
      title: 'Отчеты',
      icon: '📋',
      description: 'Экспорт и документы'
    },
    {
      id: 'settings',
      title: 'Настройки',
      icon: '⚙️',
      description: 'Справочники и параметры'
    }
  ]

  // Обработчики событий
  const handleCreateProject = () => {
    setEditingProject(null)
    setShowProjectForm(true)
  }

  const handleEditProject = (project) => {
    setEditingProject(project)
    setShowProjectForm(true)
  }

  const handleSelectProject = (project, action = 'view') => {
    setSelectedProject(project)
    if (action === 'calculate') {
      setShowCalculationWizard(true)
    } else if (action === 'edit') {
      handleEditProject(project)
    }
  }

  const handleSaveProject = async (projectData) => {
    try {
      if (editingProject) {
        await updateProject(editingProject.id, projectData)
      } else {
        await createProject(projectData)
      }
      setShowProjectForm(false)
      setEditingProject(null)
      await fetchProjects()
    } catch (error) {
      console.error('Ошибка сохранения проекта:', error)
      throw error
    }
  }

  const handleSaveCalculation = async (calculationData) => {
    try {
      await saveCalculation(calculationData)
      setShowCalculationWizard(false)
      setSelectedProject(null)
    } catch (error) {
      console.error('Ошибка сохранения расчета:', error)
      throw error
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount || 0)
  }

  // Рендер главной страницы
  const renderDashboard = () => (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Корпоративный портал АПС</h1>
        <p>Система проектирования и расчета автоматических пожарных сигнализаций</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">📁</div>
          <div className="stat-content">
            <h3>Проекты</h3>
            <div className="stat-value">{portalStats.totalProjects}</div>
            <div className="stat-detail">
              {portalStats.completedProjects} завершено
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🧮</div>
          <div className="stat-content">
            <h3>Расчеты</h3>
            <div className="stat-value">{portalStats.activeCalculations}</div>
            <div className="stat-detail">выполнено</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Общий бюджет</h3>
            <div className="stat-value">{formatCurrency(portalStats.totalBudget)}</div>
            <div className="stat-detail">всех проектов</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>Эффективность</h3>
            <div className="stat-value">
              {portalStats.totalProjects > 0
                ? Math.round((portalStats.completedProjects / portalStats.totalProjects) * 100)
                : 0}%
            </div>
            <div className="stat-detail">завершения</div>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Быстрые действия</h2>
        <div className="actions-grid">
          <button
            className="action-card"
            onClick={handleCreateProject}
          >
            <div className="action-icon">➕</div>
            <h3>Новый проект</h3>
            <p>Создать проект АПС</p>
          </button>

          <button
            className="action-card"
            onClick={() => setActiveSection('calculator')}
          >
            <div className="action-icon">🧮</div>
            <h3>Быстрый расчет</h3>
            <p>Расчет без проекта</p>
          </button>

          <button
            className="action-card"
            onClick={() => setActiveSection('projects')}
          >
            <div className="action-icon">📁</div>
            <h3>Все проекты</h3>
            <p>Просмотр и управление</p>
          </button>

          <button
            className="action-card"
            onClick={() => setActiveSection('calculations')}
          >
            <div className="action-icon">📊</div>
            <h3>История расчетов</h3>
            <p>Архив и сравнение</p>
          </button>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Последние проекты</h2>
        <div className="recent-projects">
          {projects.slice(0, 3).map(project => (
            <div key={project.id} className="recent-project">
              <div className="project-info">
                <h4>{project.name}</h4>
                <p>{project.object_name}</p>
                <span className="project-status" style={{
                  backgroundColor: getStatusColor(project.status)
                }}>
                  {project.status}
                </span>
              </div>
              <div className="project-actions">
                <button
                  className="btn-sm btn-primary"
                  onClick={() => handleSelectProject(project, 'calculate')}
                >
                  Расчет
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Рендер калькулятора
  const renderCalculator = () => (
    <div className="calculator-section">
      <div className="section-header">
        <h1>Калькулятор АПС</h1>
        <p>Быстрый расчет оборудования пожарной сигнализации</p>
      </div>

      <div className="calculator-options">
        <div className="calc-option">
          <h3>🎯 Быстрый расчет</h3>
          <p>Расчет по основным параметрам</p>
          <button
            className="btn-primary"
            onClick={() => setShowCalculationWizard(true)}
          >
            Начать расчет
          </button>
        </div>

        <div className="calc-option">
          <h3>📁 Расчет для проекта</h3>
          <p>Привязка расчета к существующему проекту</p>
          <button
            className="btn-secondary"
            onClick={() => setActiveSection('projects')}
          >
            Выбрать проект
          </button>
        </div>
      </div>
    </div>
  )

  // Рендер списка расчетов
  const renderCalculations = () => (
    <div className="calculations-section">
      <div className="section-header">
        <h1>История расчетов</h1>
        <p>Все выполненные расчеты АПС</p>
      </div>

      <div className="calculations-list">
        {calculations.length === 0 ? (
          <div className="empty-state">
            <p>Расчеты не найдены</p>
            <button
              className="btn-primary"
              onClick={() => setActiveSection('calculator')}
            >
              Выполнить первый расчет
            </button>
          </div>
        ) : (
          calculations.map(calc => (
            <div key={calc.id} className="calculation-item">
              <div className="calc-info">
                <h4>{calc.aps_projects?.name || 'Быстрый расчет'}</h4>
                <p>{calc.aps_projects?.object_name}</p>
                <span className="calc-date">
                  {new Date(calc.calculation_date).toLocaleDateString('ru-RU')}
                </span>
              </div>
              <div className="calc-stats">
                <div className="stat">
                  <span>Извещатели:</span>
                  <span>{(calc.smoke_detectors_count || 0) + (calc.heat_detectors_count || 0)}</span>
                </div>
                <div className="stat">
                  <span>Стоимость:</span>
                  <span>{formatCurrency(calc.estimated_cost)}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )

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

  return (
    <div className="aps-portal">
      {/* Боковое меню навигации */}
      <nav className="portal-sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">🔥</span>
            <span className="logo-text">АПС Портал</span>
          </div>
        </div>

        <div className="sidebar-menu">
          {navigationSections.map(section => (
            <button
              key={section.id}
              className={`menu-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <span className="menu-icon">{section.icon}</span>
              <div className="menu-content">
                <span className="menu-title">{section.title}</span>
                <span className="menu-description">{section.description}</span>
              </div>
            </button>
          ))}
        </div>
      </nav>

      {/* Основной контент */}
      <main className="portal-main">
        {activeSection === 'dashboard' && renderDashboard()}
        {activeSection === 'projects' && (
          <ProjectList
            onCreateProject={handleCreateProject}
          />
        )}
        {activeSection === 'calculator' && renderCalculator()}
        {activeSection === 'calculations' && renderCalculations()}
        {activeSection === 'reports' && (
          <div className="section-placeholder">
            <h2>📋 Отчеты и экспорт</h2>
            <p>Раздел в разработке</p>
          </div>
        )}
        {activeSection === 'settings' && (
          <div className="section-placeholder">
            <h2>⚙️ Настройки</h2>
            <p>Справочники и параметры системы</p>
          </div>
        )}
      </main>

      {/* Модальные окна */}
      {showProjectForm && (
        <ProjectForm
          project={editingProject}
          onSave={handleSaveProject}
          onCancel={() => {
            setShowProjectForm(false)
            setEditingProject(null)
          }}
        />
      )}

      {showCalculationWizard && (
        <CalculationWizard
          project={selectedProject}
          onSave={handleSaveCalculation}
          onCancel={() => {
            setShowCalculationWizard(false)
            setSelectedProject(null)
          }}
        />
      )}
    </div>
  )
}

export default APSPortal