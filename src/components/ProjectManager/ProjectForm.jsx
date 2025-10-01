// Компонент формы создания/редактирования проекта АПС
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { supabase, TABLES, PROJECT_STATUS } from '../../config/supabase'
import './ProjectManager.css'

const ProjectForm = ({ project = null, onSave, onCancel }) => {
  const [buildingTypes, setBuildingTypes] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    defaultValues: {
      name: project?.name || '',
      object_name: project?.object_name || '',
      address: project?.address || '',
      building_type_id: project?.building_type_id || '',
      description: project?.description || '',
      start_date: project?.start_date || '',
      completion_date: project?.completion_date || '',
      status: project?.status || 'проектирование',
      budget: project?.budget || '',
      customer: project?.customer || '',
      responsible_person: project?.responsible_person || '',
      fire_load_category: project?.fire_load_category || '',
      explosion_hazard_class: project?.explosion_hazard_class || '',
      regulatory_documents: project?.regulatory_documents || 'СП 484.1311500.2020, СП 5.13130.2009'
    }
  })

  // Загрузка справочных данных
  useEffect(() => {
    const loadReferenceData = async () => {
      try {
        // Загружаем типы зданий
        const { data: buildingTypesData, error: btError } = await supabase
          .from(TABLES.BUILDING_TYPES)
          .select('id, code, name')
          .eq('is_active', true)
          .order('code')

        if (btError) throw btError
        setBuildingTypes(buildingTypesData || [])

        // Загружаем пользователей
        const { data: usersData, error: usersError } = await supabase
          .from(TABLES.USERS)
          .select('id, full_name, role')
          .eq('is_active', true)
          .order('full_name')

        if (usersError) throw usersError
        setUsers(usersData || [])
      } catch (error) {
        console.error('Ошибка загрузки справочных данных:', error)
      }
    }

    loadReferenceData()
  }, [])

  // Обработка отправки формы
  const onSubmit = async (data) => {
    try {
      setLoading(true)
      setSubmitError('')

      // Подготавливаем данные для сохранения
      const projectData = {
        ...data,
        budget: data.budget ? parseFloat(data.budget) : null,
        start_date: data.start_date || null,
        completion_date: data.completion_date || null,
        responsible_person: data.responsible_person || null
      }

      // Вызываем функцию сохранения из родительского компонента
      await onSave(projectData)
    } catch (error) {
      setSubmitError(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Статусы проектов
  const statuses = Object.entries(PROJECT_STATUS).map(([key, value]) => ({
    value,
    label: value.charAt(0).toUpperCase() + value.slice(1).replace('_', '-')
  }))

  // Категории пожарной нагрузки
  const fireLoadCategories = [
    { value: 'А', label: 'А - горючие газы и легковоспламеняющиеся жидкости' },
    { value: 'Б', label: 'Б - горючие пыли и волокна' },
    { value: 'В', label: 'В - горючие и трудногорючие жидкости' },
    { value: 'Г', label: 'Г - горючие вещества и материалы' },
    { value: 'Д', label: 'Д - негорючие вещества в горячем состоянии' }
  ]

  return (
    <div className="project-form-overlay">
      <div className="project-form-modal">
        <div className="project-form-header">
          <h2>{project ? 'Редактирование проекта' : 'Создание нового проекта'}</h2>
          <button type="button" className="close-button" onClick={onCancel}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="project-form">
          {/* Основная информация */}
          <div className="form-section">
            <h3>Основная информация</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Название проекта *</label>
                <input
                  id="name"
                  type="text"
                  {...register('name', {
                    required: 'Название проекта обязательно',
                    minLength: { value: 3, message: 'Минимум 3 символа' }
                  })}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="object_name">Наименование объекта *</label>
                <input
                  id="object_name"
                  type="text"
                  {...register('object_name', {
                    required: 'Наименование объекта обязательно'
                  })}
                  className={errors.object_name ? 'error' : ''}
                />
                {errors.object_name && <span className="error-message">{errors.object_name.message}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Адрес объекта</label>
              <input
                id="address"
                type="text"
                {...register('address')}
                placeholder="г. Город, ул. Улица, д. 00"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Описание проекта</label>
              <textarea
                id="description"
                {...register('description')}
                rows="3"
                placeholder="Краткое описание проекта АПС..."
              />
            </div>
          </div>

          {/* Классификация здания */}
          <div className="form-section">
            <h3>Классификация здания</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="building_type_id">Функциональный тип здания *</label>
                <select
                  id="building_type_id"
                  {...register('building_type_id', {
                    required: 'Выберите тип здания'
                  })}
                  className={errors.building_type_id ? 'error' : ''}
                >
                  <option value="">Выберите тип здания</option>
                  {buildingTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.code} - {type.name}
                    </option>
                  ))}
                </select>
                {errors.building_type_id && <span className="error-message">{errors.building_type_id.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="fire_load_category">Категория пожарной нагрузки</label>
                <select
                  id="fire_load_category"
                  {...register('fire_load_category')}
                >
                  <option value="">Выберите категорию</option>
                  {fireLoadCategories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="explosion_hazard_class">Класс взрывоопасности</label>
              <input
                id="explosion_hazard_class"
                type="text"
                {...register('explosion_hazard_class')}
                placeholder="B-1a, B-1б, B-2a и т.д."
              />
            </div>
          </div>

          {/* Управление проектом */}
          <div className="form-section">
            <h3>Управление проектом</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="status">Статус проекта</label>
                <select
                  id="status"
                  {...register('status')}
                >
                  {statuses.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="responsible_person">Ответственный</label>
                <select
                  id="responsible_person"
                  {...register('responsible_person')}
                >
                  <option value="">Выберите ответственного</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.full_name} ({user.role})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="start_date">Дата начала</label>
                <input
                  id="start_date"
                  type="date"
                  {...register('start_date')}
                />
              </div>

              <div className="form-group">
                <label htmlFor="completion_date">Планируемое завершение</label>
                <input
                  id="completion_date"
                  type="date"
                  {...register('completion_date')}
                />
              </div>
            </div>
          </div>

          {/* Коммерческая информация */}
          <div className="form-section">
            <h3>Коммерческая информация</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="customer">Заказчик</label>
                <input
                  id="customer"
                  type="text"
                  {...register('customer')}
                  placeholder="Наименование организации-заказчика"
                />
              </div>

              <div className="form-group">
                <label htmlFor="budget">Бюджет проекта (руб.)</label>
                <input
                  id="budget"
                  type="number"
                  step="0.01"
                  min="0"
                  {...register('budget')}
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Нормативные документы */}
          <div className="form-section">
            <h3>Нормативные документы</h3>

            <div className="form-group">
              <label htmlFor="regulatory_documents">Применимые документы</label>
              <textarea
                id="regulatory_documents"
                {...register('regulatory_documents')}
                rows="2"
                placeholder="СП 484.1311500.2020, СП 5.13130.2009, ГОСТ Р 53325-2012..."
              />
            </div>
          </div>

          {/* Ошибки */}
          {submitError && (
            <div className="form-error">
              {submitError}
            </div>
          )}

          {/* Кнопки */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Сохранение...' : (project ? 'Обновить' : 'Создать')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProjectForm