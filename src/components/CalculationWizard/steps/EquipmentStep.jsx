// Шаг мастера: Детальный выбор оборудования (перенесено из старого интерфейса)
import React, { useState } from 'react'

const EquipmentStep = ({ data, onUpdate, errors }) => {
  const [activeTab, setActiveTab] = useState('detectors')

  // Структура конкретных моделей оборудования (из старого интерфейса)
  const equipmentModels = {
    detectors: {
      name: '🔍 Пожарные извещатели',
      models: {
        'ip212-64-r3': 'ИП 212-64-R3 W2.02 Rubezh (дымовой адресный)',
        'ip101-1a-r3': 'ИП 101-1А-R3 Rubezh (тепловой адресный)',
        'iz-1-r3': 'ИЗ-1-R3 (изолятор линий связи)',
        'ikz-r3': 'ИКЗ-R3 (изолятор короткого замыкания)',
        'io-102-51': 'ИО 102-51 НР (черный) (охранный извещатель)'
      }
    },
    controlPanels: {
      name: '🖥️ Приборы управления',
      models: {
        'rubezh-2op': 'ППКОП 011249-2-1 "Рубеж-2ОП" прот.R3',
        'rm-1-r3': 'РМ-1-R3 (релейный модуль 1 канал)',
        'rm-4-r3': 'РМ-4-R3 (релейный модуль 4 канала)',
        'rm-1k-r3': 'РМ-1К-R3 (релейный модуль клапанный 1 канал)',
        'rm-4k-r3': 'РМ-4К-R3 (релейный модуль клапанный 4 канала)',
        'am-1-r3': 'АМ-1-R3 (адресная метка 1-канальная)',
        'am-4-r3': 'АМ-4-R3 (адресная метка 4-канальная)',
        'mdu-1s-r3': 'МДУ-1С-R3 (модуль дистанционного управления)'
      }
    },
    manualCallPoints: {
      name: '🚨 Ручные извещатели',
      models: {
        'ipr513-3am-r3': 'ИПР 513-3АМ-R3 Rubezh (адресный)',
        'udp-513-11': 'УДП 513-11 ИКЗ-R3 "Пуск дымоудаления"'
      }
    },
    sounders: {
      name: '📢 Система оповещения',
      models: {
        'opop124-r3': 'ОПОП 124-R3 (светозвуковой адресный)',
        'mayak-24-s': 'Маяк-24-С (световой)',
        'mayak-24-kp': 'Маяк-24-КП (комбинированный)'
      }
    },
    powerSupplies: {
      name: '🔌 Источники питания',
      models: {
        'ivepr-24-r3': 'ИВЭПР 24/2,5 RS-R3 Rubezh (источник питания)',
        'ups-battery-7ah': 'Аккумулятор Delta DTM 12012 (12В 1.2Ач)'
      }
    },
    cables: {
      name: '🔌 Кабельная продукция',
      models: {
        'kpsrng-frls-2x2x0.5': 'КПСРнг(А)-FRLS 2х2х0.5 (пожарный кабель)',
        'kpsrng-frls-2x2x0.75': 'КПСРнг(А)-FRLS 2х2х0.75 (пожарный кабель)',
        'kpsrng-frls-4x2x0.5': 'КПСРнг(А)-FRLS 4х2х0.5 (пожарный кабель)',
        'kpsrng-frls-4x2x0.75': 'КПСРнг(А)-FRLS 4х2х0.75 (пожарный кабель)',
        'vvgng-frls-3x1.5': 'ВВГнг(А)-FRLS 3х1.5 (силовой кабель)',
        'vvgng-frls-3x2.5': 'ВВГнг(А)-FRLS 3х2.5 (силовой кабель)'
      }
    }
  }

  const tabs = [
    { id: 'detectors', title: 'Извещатели', icon: '🔍' },
    { id: 'controlPanels', title: 'Управление', icon: '🖥️' },
    { id: 'manualCallPoints', title: 'Ручные', icon: '🚨' },
    { id: 'sounders', title: 'Оповещение', icon: '📢' },
    { id: 'powerSupplies', title: 'Питание', icon: '🔌' },
    { id: 'cables', title: 'Кабели', icon: '🔌' },
    { id: 'apsSettings', title: 'Настройки АПС', icon: '⚙️' }
  ]

  // Установка значений по умолчанию
  React.useEffect(() => {
    if (!data.equipment) {
      // Инициализация выбранного оборудования
      const selectedModels = {}
      Object.keys(equipmentModels).forEach(category => {
        Object.keys(equipmentModels[category].models).forEach(model => {
          selectedModels[model] = true // По умолчанию все модели выбраны
        })
      })

      onUpdate('equipment', {
        selectedModels,
        customEquipment: [],
        // Настройки системы АПС (из старого интерфейса)
        apsSettings: {
          detectorCoverage: 85, // Согласно СП 5.13130.2009
          manualCallDistance: 50, // Норматив
          sounderCoverage: 15,
          cableReserve: 15, // Стандартный запас кабеля
          zoneSize: 300, // ЗКПС стандартный размер
          systemTypes: ['адресная'], // Типы систем
          fireAlgorithms: ['B'], // Алгоритмы формирования сигнала ПОЖАР
          planningOptions: ['defined'], // Варианты планировки
          controlledSystems: ['СОУЭ_1-3'], // Управляемые системы
          soueOptions: ['basic'], // Варианты СОУЭ
          auptOptions: ['none'] // Варианты АУПТ
        }
      })
    }
  }, [])

  const handleModelToggle = (modelKey) => {
    const currentSelection = data.equipment?.selectedModels || {}
    onUpdate('equipment', {
      ...data.equipment,
      selectedModels: {
        ...currentSelection,
        [modelKey]: !currentSelection[modelKey]
      }
    })
  }

  const selectAllModelsInCategory = (category) => {
    const currentSelection = data.equipment?.selectedModels || {}
    const updated = { ...currentSelection }

    Object.keys(equipmentModels[category].models).forEach(model => {
      updated[model] = true
    })

    onUpdate('equipment', {
      ...data.equipment,
      selectedModels: updated
    })
  }

  const deselectAllModelsInCategory = (category) => {
    const currentSelection = data.equipment?.selectedModels || {}
    const updated = { ...currentSelection }

    Object.keys(equipmentModels[category].models).forEach(model => {
      updated[model] = false
    })

    onUpdate('equipment', {
      ...data.equipment,
      selectedModels: updated
    })
  }

  const addCustomEquipment = () => {
    const name = prompt('Введите название оборудования:')
    if (name && name.trim()) {
      const currentCustom = data.equipment?.customEquipment || []
      onUpdate('equipment', {
        ...data.equipment,
        customEquipment: [...currentCustom, {
          id: Date.now(),
          name: name.trim(),
          category: 'custom',
          selected: true
        }]
      })
    }
  }

  const removeCustomEquipment = (id) => {
    const currentCustom = data.equipment?.customEquipment || []
    onUpdate('equipment', {
      ...data.equipment,
      customEquipment: currentCustom.filter(item => item.id !== id)
    })
  }

  const handleAPSSettingChange = (setting, value) => {
    onUpdate('equipment', {
      ...data.equipment,
      apsSettings: {
        ...data.equipment?.apsSettings,
        [setting]: value
      }
    })
  }

  const toggleArrayOption = (setting, value) => {
    const currentArray = data.equipment?.apsSettings?.[setting] || []
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]

    handleAPSSettingChange(setting, newArray)
  }

  const renderEquipmentCategory = (categoryKey) => {
    const category = equipmentModels[categoryKey]
    if (!category) return null

    const selectedModels = data.equipment?.selectedModels || {}
    const selectedCount = Object.keys(category.models).filter(model => selectedModels[model]).length
    const totalCount = Object.keys(category.models).length

    return (
      <div className="tab-content">
        <div className="equipment-category">
          <div className="category-header">
            <h3>{category.name}</h3>
            <div className="category-controls">
              <span className="selection-count">
                Выбрано: {selectedCount} из {totalCount}
              </span>
              <button
                className="btn-secondary btn-sm"
                onClick={() => selectAllModelsInCategory(categoryKey)}
                type="button"
              >
                Выбрать все
              </button>
              <button
                className="btn-secondary btn-sm"
                onClick={() => deselectAllModelsInCategory(categoryKey)}
                type="button"
              >
                Снять все
              </button>
            </div>
          </div>

          <div className="equipment-grid">
            {Object.entries(category.models).map(([modelKey, modelName]) => (
              <div key={modelKey} className="equipment-item">
                <label className="equipment-label">
                  <input
                    type="checkbox"
                    checked={selectedModels[modelKey] || false}
                    onChange={() => handleModelToggle(modelKey)}
                  />
                  <div className="equipment-info">
                    <span className="equipment-name">{modelName}</span>
                    <span className="equipment-key">{modelKey}</span>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Пользовательское оборудование для каждой категории */}
        {categoryKey === 'powerSupplies' && (
          <div className="custom-equipment-section">
            <div className="section-header">
              <h4>📦 Дополнительное оборудование</h4>
              <button
                className="btn-primary btn-sm"
                onClick={addCustomEquipment}
                type="button"
              >
                + Добавить оборудование
              </button>
            </div>

            <div className="custom-equipment-list">
              {(data.equipment?.customEquipment || []).map(item => (
                <div key={item.id} className="custom-equipment-item">
                  <span className="custom-equipment-name">{item.name}</span>
                  <button
                    className="btn-danger btn-sm"
                    onClick={() => removeCustomEquipment(item.id)}
                    type="button"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderAPSSettingsTab = () => {
    const settings = data.equipment?.apsSettings || {}

    return (
      <div className="tab-content">
        <div className="aps-settings">
          <h3>⚙️ Настройки системы АПС</h3>

          <div className="settings-section">
            <h4>📏 Параметры размещения</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Площадь покрытия извещателя (м²)</label>
                <input
                  type="number"
                  value={settings.detectorCoverage || 85}
                  onChange={(e) => handleAPSSettingChange('detectorCoverage', Number(e.target.value))}
                  min="50"
                  max="120"
                />
                <small>Согласно СП 5.13130.2009</small>
              </div>

              <div className="form-group">
                <label>Расстояние до ручного извещателя (м)</label>
                <input
                  type="number"
                  value={settings.manualCallDistance || 50}
                  onChange={(e) => handleAPSSettingChange('manualCallDistance', Number(e.target.value))}
                  min="30"
                  max="60"
                />
                <small>Норматив размещения</small>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Площадь покрытия оповещателя (м²)</label>
                <input
                  type="number"
                  value={settings.sounderCoverage || 15}
                  onChange={(e) => handleAPSSettingChange('sounderCoverage', Number(e.target.value))}
                  min="10"
                  max="30"
                />
              </div>

              <div className="form-group">
                <label>Запас кабеля (%)</label>
                <input
                  type="number"
                  value={settings.cableReserve || 15}
                  onChange={(e) => handleAPSSettingChange('cableReserve', Number(e.target.value))}
                  min="10"
                  max="25"
                />
                <small>Стандартный запас</small>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Размер зоны (м²)</label>
                <input
                  type="number"
                  value={settings.zoneSize || 300}
                  onChange={(e) => handleAPSSettingChange('zoneSize', Number(e.target.value))}
                  min="200"
                  max="500"
                />
                <small>ЗКПС стандартный размер</small>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h4>🔄 Типы систем</h4>
            <div className="checkbox-group">
              {['адресная', 'пороговая', 'адресно-аналоговая'].map(type => (
                <label key={type} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={settings.systemTypes?.includes(type) || false}
                    onChange={() => toggleArrayOption('systemTypes', type)}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="settings-section">
            <h4>🔥 Алгоритмы формирования сигнала ПОЖАР</h4>
            <div className="checkbox-group">
              {['A', 'B', 'C'].map(algorithm => (
                <label key={algorithm} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={settings.fireAlgorithms?.includes(algorithm) || false}
                    onChange={() => toggleArrayOption('fireAlgorithms', algorithm)}
                  />
                  <span>Алгоритм {algorithm}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="settings-section">
            <h4>🏗️ Варианты планировки</h4>
            <div className="checkbox-group">
              {['defined', 'open', 'mixed'].map(option => (
                <label key={option} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={settings.planningOptions?.includes(option) || false}
                    onChange={() => toggleArrayOption('planningOptions', option)}
                  />
                  <span>
                    {option === 'defined' && 'Определенная планировка'}
                    {option === 'open' && 'Открытая планировка'}
                    {option === 'mixed' && 'Смешанная планировка'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="settings-section">
            <h4>🎛️ Управляемые системы</h4>
            <div className="checkbox-group">
              {['СОУЭ_1-3', 'СОУЭ_4-5', 'АУПТ', 'Дымоудаление', 'Лифты'].map(system => (
                <label key={system} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={settings.controlledSystems?.includes(system) || false}
                    onChange={() => toggleArrayOption('controlledSystems', system)}
                  />
                  <span>{system}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="settings-section">
            <h4>📢 Варианты СОУЭ</h4>
            <div className="checkbox-group">
              {['basic', 'advanced', 'voice'].map(option => (
                <label key={option} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={settings.soueOptions?.includes(option) || false}
                    onChange={() => toggleArrayOption('soueOptions', option)}
                  />
                  <span>
                    {option === 'basic' && 'Базовая СОУЭ'}
                    {option === 'advanced' && 'Расширенная СОУЭ'}
                    {option === 'voice' && 'Речевая СОУЭ'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="settings-section">
            <h4>🚿 Варианты АУПТ</h4>
            <div className="checkbox-group">
              {['none', 'water', 'foam', 'gas'].map(option => (
                <label key={option} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={settings.auptOptions?.includes(option) || false}
                    onChange={() => toggleArrayOption('auptOptions', option)}
                  />
                  <span>
                    {option === 'none' && 'Без АУПТ'}
                    {option === 'water' && 'Водяное пожаротушение'}
                    {option === 'foam' && 'Пенное пожаротушение'}
                    {option === 'gas' && 'Газовое пожаротушение'}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Подсчет выбранного оборудования
  const getSelectionSummary = () => {
    const selectedModels = data.equipment?.selectedModels || {}
    const customEquipment = data.equipment?.customEquipment || []

    const selectedByCategory = {}
    let totalSelected = 0

    Object.entries(equipmentModels).forEach(([categoryKey, category]) => {
      const selected = Object.keys(category.models).filter(model => selectedModels[model]).length
      selectedByCategory[categoryKey] = {
        selected,
        total: Object.keys(category.models).length,
        name: category.name
      }
      totalSelected += selected
    })

    return {
      byCategory: selectedByCategory,
      totalSelected: totalSelected + customEquipment.length,
      customCount: customEquipment.length
    }
  }

  const summary = getSelectionSummary()

  return (
    <div className="step-content">
      <h2 className="step-title">Детальный выбор оборудования АПС</h2>
      <p className="step-description">
        Выберите конкретные модели оборудования и настройте параметры системы
      </p>

      {/* Общая сводка */}
      <div className="equipment-summary">
        <h4>📊 Общая сводка оборудования:</h4>
        <div className="summary-grid">
          <div className="summary-item">
            <span>Всего выбрано:</span>
            <span>{summary.totalSelected} позиций</span>
          </div>
          <div className="summary-item">
            <span>Дополнительное:</span>
            <span>{summary.customCount} позиций</span>
          </div>
        </div>
      </div>

      {/* Табы навигации */}
      <div className="tabs-navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-title">{tab.title}</span>
            {tab.id !== 'apsSettings' && summary.byCategory[tab.id] && (
              <span className="tab-count">
                {summary.byCategory[tab.id].selected}/{summary.byCategory[tab.id].total}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Контент табов */}
      {activeTab === 'apsSettings' ? renderAPSSettingsTab() : renderEquipmentCategory(activeTab)}
    </div>
  )
}

export default EquipmentStep