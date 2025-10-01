// React Hook для работы с расчетами АПС
import { useState, useEffect } from 'react'
import { supabase, TABLES } from '../config/supabase'

export const useCalculations = (projectId = null) => {
  const [calculations, setCalculations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Загрузка расчетов (для проекта или всех)
  const fetchCalculations = async () => {
    try {
      setLoading(true)
      let query = supabase
        .from(TABLES.CALCULATION_RESULTS)
        .select(`
          *,
          aps_projects(name, object_name),
          users!calculated_by(full_name),
          users!verified_by(full_name)
        `)
        .order('calculation_date', { ascending: false })

      if (projectId) {
        query = query.eq('project_id', projectId)
      }

      const { data, error } = await query

      if (error) throw error
      setCalculations(data || [])
    } catch (err) {
      setError(err.message)
      console.error('Ошибка загрузки расчетов:', err)
    } finally {
      setLoading(false)
    }
  }

  // Сохранение нового расчета
  const saveCalculation = async (calculationData) => {
    try {
      // Подготавливаем данные для сохранения
      const calculationRecord = {
        project_id: calculationData.projectId,
        calculation_type: calculationData.calculationType || 'общий',
        parameters: JSON.stringify(calculationData.parameters),
        results: JSON.stringify(calculationData.results),

        // Извлекаем основные показатели из результатов
        smoke_detectors_count: calculationData.results.smokeDetectors || 0,
        heat_detectors_count: calculationData.results.heatDetectors || 0,
        flame_detectors_count: calculationData.results.flameDetectors || 0,
        gas_detectors_count: calculationData.results.gasDetectors || 0,
        manual_call_points_count: calculationData.results.manualCallPoints || 0,
        sounders_count: calculationData.results.sounders || 0,
        strobe_lights_count: calculationData.results.strobeDetectors || 0,
        control_panels_count: calculationData.results.controlPanels || 0,
        zones_count: calculationData.results.zones || 0,
        cable_total_length: calculationData.results.totalCableLength || 0,
        estimated_cost: calculationData.results.totalCost || 0,

        calculation_status: 'актуальный',
        calculated_by: calculationData.calculatedBy,
        notes: calculationData.notes || '',
        calculation_date: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from(TABLES.CALCULATION_RESULTS)
        .insert([calculationRecord])
        .select()

      if (error) throw error

      // Обновляем локальный список
      await fetchCalculations()
      return data[0]
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Обновление расчета
  const updateCalculation = async (calculationId, updates) => {
    try {
      const { data, error } = await supabase
        .from(TABLES.CALCULATION_RESULTS)
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', calculationId)
        .select()

      if (error) throw error

      // Обновляем локальный список
      setCalculations(prev =>
        prev.map(calc =>
          calc.id === calculationId ? { ...calc, ...updates } : calc
        )
      )
      return data[0]
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Пометить расчет как устаревший
  const markAsOutdated = async (calculationId) => {
    return updateCalculation(calculationId, { calculation_status: 'устаревший' })
  }

  // Верификация расчета
  const verifyCalculation = async (calculationId, verifiedBy, notes = '') => {
    return updateCalculation(calculationId, {
      calculation_status: 'проверен',
      verified_by: verifiedBy,
      verification_date: new Date().toISOString(),
      notes: notes
    })
  }

  // Получение расчета по ID с полными данными
  const getCalculation = async (calculationId) => {
    try {
      const { data, error } = await supabase
        .from(TABLES.CALCULATION_RESULTS)
        .select(`
          *,
          aps_projects(*),
          users!calculated_by(full_name, email),
          users!verified_by(full_name, email)
        `)
        .eq('id', calculationId)
        .single()

      if (error) throw error

      // Парсим JSON поля
      if (data.parameters) {
        data.parameters = JSON.parse(data.parameters)
      }
      if (data.results) {
        data.results = JSON.parse(data.results)
      }

      return data
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Сравнение двух расчетов
  const compareCalculations = async (calc1Id, calc2Id) => {
    try {
      const [calc1, calc2] = await Promise.all([
        getCalculation(calc1Id),
        getCalculation(calc2Id)
      ])

      // Создаем объект сравнения
      const comparison = {
        calc1,
        calc2,
        differences: {
          parameters: {},
          results: {}
        }
      }

      // Сравниваем параметры
      if (calc1.parameters && calc2.parameters) {
        Object.keys(calc1.parameters).forEach(key => {
          if (calc1.parameters[key] !== calc2.parameters[key]) {
            comparison.differences.parameters[key] = {
              old: calc1.parameters[key],
              new: calc2.parameters[key]
            }
          }
        })
      }

      // Сравниваем результаты
      if (calc1.results && calc2.results) {
        Object.keys(calc1.results).forEach(key => {
          if (calc1.results[key] !== calc2.results[key]) {
            comparison.differences.results[key] = {
              old: calc1.results[key],
              new: calc2.results[key]
            }
          }
        })
      }

      return comparison
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Загрузка расчетов при монтировании или изменении projectId
  useEffect(() => {
    fetchCalculations()
  }, [projectId])

  return {
    calculations,
    loading,
    error,
    fetchCalculations,
    saveCalculation,
    updateCalculation,
    markAsOutdated,
    verifyCalculation,
    getCalculation,
    compareCalculations,
    setError
  }
}

// Хук для работы с шаблонами расчетов
export const useCalculationTemplates = () => {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from(TABLES.CALCULATION_TEMPLATES)
        .select(`
          *,
          building_types(name, code),
          users!created_by(full_name)
        `)
        .eq('is_active', true)
        .order('usage_count', { ascending: false })

      if (error) throw error
      setTemplates(data || [])
    } catch (err) {
      console.error('Ошибка загрузки шаблонов:', err)
    } finally {
      setLoading(false)
    }
  }

  const createTemplate = async (templateData) => {
    try {
      const { data, error } = await supabase
        .from(TABLES.CALCULATION_TEMPLATES)
        .insert([{
          ...templateData,
          template_parameters: JSON.stringify(templateData.template_parameters),
          default_equipment: JSON.stringify(templateData.default_equipment),
          usage_count: 0
        }])
        .select()

      if (error) throw error
      await fetchTemplates()
      return data[0]
    } catch (err) {
      throw err
    }
  }

  const useTemplate = async (templateId) => {
    try {
      // Увеличиваем счетчик использований
      await supabase
        .from(TABLES.CALCULATION_TEMPLATES)
        .update({ usage_count: supabase.sql`usage_count + 1` })
        .eq('id', templateId)

      // Получаем данные шаблона
      const { data, error } = await supabase
        .from(TABLES.CALCULATION_TEMPLATES)
        .select('*')
        .eq('id', templateId)
        .single()

      if (error) throw error

      // Парсим JSON поля
      data.template_parameters = JSON.parse(data.template_parameters)
      data.default_equipment = JSON.parse(data.default_equipment)

      return data
    } catch (err) {
      throw err
    }
  }

  useEffect(() => {
    fetchTemplates()
  }, [])

  return {
    templates,
    loading,
    fetchTemplates,
    createTemplate,
    useTemplate
  }
}