// Шаг мастера: Параметры расчета
import React from 'react'

const CalculationStep = ({ data, onUpdate, errors }) => {
  const handleInputChange = (field, value) => {
    onUpdate('calculation', { [field]: value })
  }

  const handleArrayToggle = (field, value) => {
    const current = data.calculation[field] || []
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value]

    onUpdate('calculation', { [field]: updated })
  }

  const systemTypes = [
    { value: 'пороговая', label: 'Пороговая система' },
    { value: 'адресная', label: 'Адресная система' },
    { value: 'адресно-аналоговая', label: 'Адресно-аналоговая система' }
  ]

  const fireAlgorithms = [
    { value: 'A', label: 'Алгоритм A - по одному извещателю' },
    { value: 'B', label: 'Алгоритм B - по двум извещателям' },
    { value: 'C', label: 'Алгоритм C - комбинированный' }
  ]

  const planningOptions = [
    { value: 'defined', label: 'Планировка определена' },
    { value: 'undefined', label: 'Планировка не определена' }
  ]

  return (
    <div className="step-content">
      <h2 className="step-title">Параметры расчета</h2>
      <p className="step-description">
        Настройте параметры расчета АПС согласно нормативным требованиям
      </p>

      <div className="form-section">
        <h3>Система пожарной сигнализации</h3>

        <div className="form-group">
          <label>Тип системы *</label>
          {errors.systemTypes && (
            <span className="error-message">{errors.systemTypes}</span>
          )}
          <div className="checkbox-group">
            {systemTypes.map(type => (
              <label key={type.value} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={data.calculation.systemTypes.includes(type.value)}
                  onChange={() => handleArrayToggle('systemTypes', type.value)}
                />
                <span>{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Алгоритм формирования сигнала "ПОЖАР"</label>
          <div className="checkbox-group">
            {fireAlgorithms.map(algorithm => (
              <label key={algorithm.value} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={data.calculation.fireAlgorithms.includes(algorithm.value)}
                  onChange={() => handleArrayToggle('fireAlgorithms', algorithm.value)}
                />
                <span>{algorithm.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Планировка помещений</label>
          <div className="checkbox-group">
            {planningOptions.map(option => (
              <label key={option.value} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={data.calculation.planningOptions.includes(option.value)}
                  onChange={() => handleArrayToggle('planningOptions', option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Параметры извещателей</h3>

        <div className="form-row">
          <div className="form-group">
            <label>Площадь покрытия извещателя (м²)</label>
            <input
              type="number"
              value={data.calculation.detectorCoverage}
              onChange={(e) => handleInputChange('detectorCoverage', Number(e.target.value))}
              min="50"
              max="120"
            />
            <small>Стандарт: 85 м² для дымовых извещателей</small>
          </div>

          <div className="form-group">
            <label>Расстояние между ручными извещателями (м)</label>
            <input
              type="number"
              value={data.calculation.manualCallDistance}
              onChange={(e) => handleInputChange('manualCallDistance', Number(e.target.value))}
              min="30"
              max="70"
            />
            <small>Стандарт: 50 м согласно СП 5.13130.2009</small>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Радиус действия оповещателя (м)</label>
            <input
              type="number"
              value={data.calculation.sounderCoverage}
              onChange={(e) => handleInputChange('sounderCoverage', Number(e.target.value))}
              min="10"
              max="25"
            />
            <small>Стандарт: 15 м для звуковых оповещателей</small>
          </div>

          <div className="form-group">
            <label>Максимальная площадь зоны (м²)</label>
            <input
              type="number"
              value={data.calculation.zoneSize}
              onChange={(e) => handleInputChange('zoneSize', Number(e.target.value))}
              min="200"
              max="500"
            />
            <small>Стандарт: 300 м² для одной зоны контроля</small>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Дополнительные параметры</h3>

        <div className="form-row">
          <div className="form-group">
            <label>Запас кабеля (%)</label>
            <input
              type="number"
              value={data.calculation.cableReserve}
              onChange={(e) => handleInputChange('cableReserve', Number(e.target.value))}
              min="10"
              max="30"
            />
            <small>Рекомендуется: 15% для монтажных запасов</small>
          </div>
        </div>
      </div>

      <div className="calculation-notes">
        <h4>Примечания к расчету:</h4>
        <ul>
          <li>Расчет выполняется согласно СП 484.1311500.2020 и СП 5.13130.2009</li>
          <li>Для жилых зданий применяется алгоритм B (по двум извещателям)</li>
          <li>Площадь покрытия может корректироваться в зависимости от типа здания</li>
          <li>Количество зон ограничено требованиями к ППКП</li>
        </ul>
      </div>

      <div className="step-summary">
        <h4>Итоговые настройки:</h4>
        <div className="summary-items">
          <div className="summary-item">
            <span>Тип системы:</span>
            <span>{data.calculation.systemTypes.join(', ') || 'Не выбран'}</span>
          </div>
          <div className="summary-item">
            <span>Алгоритм пожара:</span>
            <span>{data.calculation.fireAlgorithms.join(', ') || 'Не выбран'}</span>
          </div>
          <div className="summary-item">
            <span>Площадь покрытия:</span>
            <span>{data.calculation.detectorCoverage} м²</span>
          </div>
          <div className="summary-item">
            <span>Размер зоны:</span>
            <span>{data.calculation.zoneSize} м²</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalculationStep