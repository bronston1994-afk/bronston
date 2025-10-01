// Пошаговый мастер расчетов АПС
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import BuildingStep from './steps/BuildingStep'
import EquipmentStep from './steps/EquipmentStep'
import CalculationStep from './steps/CalculationStep'
import ResultsStep from './steps/ResultsStep'
import './CalculationWizard.css'

const CalculationWizard = ({ project = null, onSave, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [calculationData, setCalculationData] = useState({
    // Данные здания
    building: {
      aboveGroundArea: 5000,
      undergroundArea: 0,
      aboveGroundFloors: 10,
      undergroundFloors: 0,
      ceilingHeight: 3.0,
      buildingType: 'Ф1.3',
      apartmentsCount: 100,
      rooms: 50,
      fireLoadCategory: '',
      explosionHazardClass: ''
    },
    // Выбранное оборудование
    equipment: {
      selectedModels: {},
      customEquipment: [],
      useCustomOnly: false
    },
    // Параметры расчета
    calculation: {
      detectorCoverage: 85,
      manualCallDistance: 50,
      sounderCoverage: 15,
      cableReserve: 15,
      zoneSize: 300,
      systemTypes: ['адресная'],
      fireAlgorithms: ['B'],
      planningOptions: ['defined']
    },
    // Результаты
    results: null
  })

  const [isCalculating, setIsCalculating] = useState(false)
  const [errors, setErrors] = useState({})

  // Шаги мастера
  const steps = [
    {
      id: 1,
      title: 'Здание',
      subtitle: 'Параметры объекта',
      icon: '🏢',
      component: BuildingStep
    },
    {
      id: 2,
      title: 'Оборудование',
      subtitle: 'Выбор моделей АПС',
      icon: '🔧',
      component: EquipmentStep
    },
    {
      id: 3,
      title: 'Расчет',
      subtitle: 'Параметры расчета',
      icon: '⚙️',
      component: CalculationStep
    },
    {
      id: 4,
      title: 'Результаты',
      subtitle: 'Итоги расчета',
      icon: '📊',
      component: ResultsStep
    }
  ]

  // Загрузка данных проекта при инициализации
  useEffect(() => {
    if (project) {
      setCalculationData(prev => ({
        ...prev,
        building: {
          ...prev.building,
          buildingType: project.building_types?.code || 'Ф1.3',
          fireLoadCategory: project.fire_load_category || '',
          explosionHazardClass: project.explosion_hazard_class || ''
        }
      }))
    }
  }, [project])

  // Переход к следующему шагу
  const nextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep === 3) {
        // Выполняем расчет перед переходом к результатам
        performCalculation()
      }
      setCurrentStep(prev => Math.min(prev + 1, steps.length))
    }
  }

  // Переход к предыдущему шагу
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  // Переход к конкретному шагу
  const goToStep = (stepNumber) => {
    if (stepNumber <= currentStep || validateStepsUpTo(stepNumber - 1)) {
      setCurrentStep(stepNumber)
    }
  }

  // Валидация текущего шага
  const validateCurrentStep = () => {
    const stepErrors = {}

    switch (currentStep) {
      case 1: // Здание
        if (!calculationData.building.aboveGroundArea || calculationData.building.aboveGroundArea <= 0) {
          stepErrors.aboveGroundArea = 'Площадь должна быть больше 0'
        }
        if (!calculationData.building.aboveGroundFloors || calculationData.building.aboveGroundFloors <= 0) {
          stepErrors.aboveGroundFloors = 'Количество этажей должно быть больше 0'
        }
        if (!calculationData.building.buildingType) {
          stepErrors.buildingType = 'Выберите тип здания'
        }
        break

      case 2: // Оборудование
        const hasSelectedEquipment = Object.values(calculationData.equipment.selectedModels).some(Boolean) ||
                                   calculationData.equipment.customEquipment.length > 0
        if (!hasSelectedEquipment) {
          stepErrors.equipment = 'Выберите хотя бы одну модель оборудования'
        }
        break

      case 3: // Расчет
        if (!calculationData.calculation.systemTypes.length) {
          stepErrors.systemTypes = 'Выберите тип системы'
        }
        break
    }

    setErrors(stepErrors)
    return Object.keys(stepErrors).length === 0
  }

  // Валидация шагов до указанного
  const validateStepsUpTo = (stepNumber) => {
    // Упрощенная валидация для навигации
    return true
  }

  // Выполнение расчета
  const performCalculation = async () => {
    setIsCalculating(true)

    try {
      // Имитируем расчет (замените на реальную логику)
      await new Promise(resolve => setTimeout(resolve, 2000))

      const results = calculateAPS(calculationData)

      setCalculationData(prev => ({
        ...prev,
        results
      }))
    } catch (error) {
      console.error('Ошибка расчета:', error)
      setErrors({ calculation: 'Ошибка при выполнении расчета' })
    } finally {
      setIsCalculating(false)
    }
  }

  // Функция расчета АПС (упрощенная версия)
  const calculateAPS = (data) => {
    const { building, equipment, calculation } = data
    const totalArea = building.aboveGroundArea + building.undergroundArea

    // Базовые расчеты
    const smokeDetectors = Math.ceil(totalArea / calculation.detectorCoverage * 0.8)
    const heatDetectors = Math.ceil(totalArea / calculation.detectorCoverage * 0.2)
    const manualCallPoints = Math.ceil(building.aboveGroundFloors * 2)
    const sounders = Math.ceil(totalArea / (calculation.sounderCoverage * calculation.sounderCoverage * Math.PI))
    const zones = Math.ceil(totalArea / calculation.zoneSize)
    const controlPanels = Math.max(1, Math.ceil(zones / 4))

    // Кабель
    const cableLength = Math.ceil(totalArea * 0.1 * (1 + calculation.cableReserve / 100))

    // Стоимость (примерная)
    const totalCost = smokeDetectors * 2500 + heatDetectors * 1800 +
                     manualCallPoints * 1200 + sounders * 800 +
                     controlPanels * 45000 + cableLength * 150

    return {
      smokeDetectors,
      heatDetectors,
      manualCallPoints,
      sounders,
      zones,
      controlPanels,
      cableLength,
      totalCost,
      calculationDate: new Date().toISOString(),
      summary: {
        totalDetectors: smokeDetectors + heatDetectors,
        totalDevices: smokeDetectors + heatDetectors + manualCallPoints + sounders,
        coverageArea: totalArea,
        costPerSquareMeter: Math.round(totalCost / totalArea)
      }
    }
  }

  // Обновление данных шага
  const updateStepData = (stepKey, data) => {
    setCalculationData(prev => ({
      ...prev,
      [stepKey]: {
        ...prev[stepKey],
        ...data
      }
    }))
  }

  // Сохранение расчета
  const handleSave = async () => {
    try {
      const saveData = {
        projectId: project?.id,
        calculationType: 'пошаговый_мастер',
        parameters: {
          building: calculationData.building,
          equipment: calculationData.equipment,
          calculation: calculationData.calculation
        },
        results: calculationData.results,
        calculatedBy: 'current-user-id', // Получить из контекста авторизации
        notes: `Расчет выполнен через пошаговый мастер`
      }

      await onSave(saveData)
    } catch (error) {
      console.error('Ошибка сохранения:', error)
      setErrors({ save: 'Ошибка при сохранении расчета' })
    }
  }

  const CurrentStepComponent = steps[currentStep - 1]?.component

  return (
    <div className="calculation-wizard">
      {/* Заголовок */}
      <div className="wizard-header">
        <h2>Мастер расчета АПС</h2>
        {project && (
          <div className="project-info">
            <span className="project-name">{project.name}</span>
            <span className="project-object">{project.object_name}</span>
          </div>
        )}
        <button className="close-button" onClick={onCancel}>✕</button>
      </div>

      {/* Индикатор прогресса */}
      <div className="wizard-progress">
        <div className="steps-indicator">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`step-indicator ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
              onClick={() => goToStep(step.id)}
            >
              <div className="step-circle">
                {currentStep > step.id ? '✓' : step.icon}
              </div>
              <div className="step-info">
                <div className="step-title">{step.title}</div>
                <div className="step-subtitle">{step.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Контент текущего шага */}
      <div className="wizard-content">
        {CurrentStepComponent && (
          <CurrentStepComponent
            data={calculationData}
            onUpdate={updateStepData}
            errors={errors}
            isCalculating={isCalculating}
            project={project}
          />
        )}
      </div>

      {/* Навигация */}
      <div className="wizard-navigation">
        <div className="nav-left">
          {currentStep > 1 && (
            <button
              className="btn-secondary"
              onClick={prevStep}
              disabled={isCalculating}
            >
              ← Назад
            </button>
          )}
        </div>

        <div className="nav-center">
          <span className="step-counter">
            Шаг {currentStep} из {steps.length}
          </span>
        </div>

        <div className="nav-right">
          {currentStep < steps.length ? (
            <button
              className="btn-primary"
              onClick={nextStep}
              disabled={isCalculating}
            >
              {currentStep === 3 ? 'Рассчитать' : 'Далее'} →
            </button>
          ) : (
            <div className="final-actions">
              <button
                className="btn-secondary"
                onClick={onCancel}
              >
                Закрыть
              </button>
              <button
                className="btn-primary"
                onClick={handleSave}
                disabled={!calculationData.results}
              >
                Сохранить расчет
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Индикатор загрузки */}
      {isCalculating && (
        <div className="calculation-loading">
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Выполняется расчет АПС...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default CalculationWizard