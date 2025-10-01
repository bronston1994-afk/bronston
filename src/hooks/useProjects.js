// React Hook для работы с проектами АПС
import { useState, useEffect } from 'react'
import { supabase, TABLES } from '../config/supabase'

export const useProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Загрузка всех проектов
  const fetchProjects = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from(TABLES.APS_PROJECTS)
        .select(`
          *,
          building_types(name, code),
          users!responsible_person(full_name, email)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (err) {
      setError(err.message)
      console.error('Ошибка загрузки проектов:', err)
    } finally {
      setLoading(false)
    }
  }

  // Создание нового проекта
  const createProject = async (projectData) => {
    try {
      const { data, error } = await supabase
        .from(TABLES.APS_PROJECTS)
        .insert([{
          ...projectData,
          created_at: new Date().toISOString()
        }])
        .select()

      if (error) throw error

      // Обновляем список проектов
      await fetchProjects()
      return data[0]
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Обновление проекта
  const updateProject = async (projectId, updates) => {
    try {
      const { data, error } = await supabase
        .from(TABLES.APS_PROJECTS)
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', projectId)
        .select()

      if (error) throw error

      // Обновляем локальный список
      setProjects(prev =>
        prev.map(project =>
          project.id === projectId ? { ...project, ...updates } : project
        )
      )
      return data[0]
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Удаление проекта (мягкое удаление)
  const deleteProject = async (projectId) => {
    try {
      const { error } = await supabase
        .from(TABLES.APS_PROJECTS)
        .update({
          is_active: false,
          updated_at: new Date().toISOString()
        })
        .eq('id', projectId)

      if (error) throw error

      // Удаляем из локального списка
      setProjects(prev => prev.filter(project => project.id !== projectId))
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Получение проекта по ID
  const getProject = async (projectId) => {
    try {
      const { data, error } = await supabase
        .from(TABLES.APS_PROJECTS)
        .select(`
          *,
          building_types(name, code),
          users!responsible_person(full_name, email),
          building_configurations(*),
          calculation_results(*)
        `)
        .eq('id', projectId)
        .single()

      if (error) throw error
      return data
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Загрузка проектов при монтировании компонента
  useEffect(() => {
    fetchProjects()
  }, [])

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    getProject,
    setError
  }
}

// Дополнительный хук для статистики проектов
export const useProjectStats = () => {
  const [stats, setStats] = useState({
    total: 0,
    byStatus: {},
    totalBudget: 0
  })

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from(TABLES.APS_PROJECTS)
        .select('status, budget')
        .eq('is_active', true)

      if (error) throw error

      const total = data.length
      const byStatus = data.reduce((acc, project) => {
        acc[project.status] = (acc[project.status] || 0) + 1
        return acc
      }, {})
      const totalBudget = data.reduce((sum, project) => sum + (project.budget || 0), 0)

      setStats({ total, byStatus, totalBudget })
    } catch (err) {
      console.error('Ошибка загрузки статистики:', err)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return { stats, fetchStats }
}