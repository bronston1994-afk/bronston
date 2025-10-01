// Шаг мастера: Результаты расчета
import React from 'react'
import ResultsVisualizer from '../../ResultsVisualizer/ResultsVisualizer'

const ResultsStep = ({ data, onUpdate, errors, isCalculating, project }) => {
  const { results } = data

  if (isCalculating) {
    return (
      <div className="step-content">
        <div className="calculation-progress">
          <div className="progress-spinner"></div>
          <h3>Выполняется расчет АПС...</h3>
          <p>Пожалуйста, подождите. Расчет может занять несколько секунд.</p>

          <div className="progress-steps">
            <div className="progress-step completed">✓ Анализ параметров здания</div>
            <div className="progress-step completed">✓ Выбор оборудования</div>
            <div className="progress-step active">⏳ Расчет количества извещателей</div>
            <div className="progress-step">⏳ Расчет зон и ППКП</div>
            <div className="progress-step">⏳ Расчет кабельной продукции</div>
            <div className="progress-step">⏳ Формирование итогов</div>
          </div>
        </div>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="step-content">
        <div className="no-results">
          <h3>Результаты расчета недоступны</h3>
          <p>Вернитесь к предыдущему шагу и выполните расчет.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="step-content">
      <h2 className="step-title">Результаты расчета АПС</h2>
      <p className="step-description">
        Подробные результаты расчета автоматической пожарной сигнализации
      </p>

      {/* Краткая сводка */}
      <div className="results-summary-quick">
        <div className="summary-card">
          <div className="summary-icon">🔍</div>
          <div className="summary-content">
            <h4>Извещатели</h4>
            <div className="summary-value">
              {(results.smokeDetectors || 0) + (results.heatDetectors || 0)}
            </div>
            <div className="summary-detail">
              {results.smokeDetectors || 0} дымовых + {results.heatDetectors || 0} тепловых
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">🚨</div>
          <div className="summary-content">
            <h4>Оповещение</h4>
            <div className="summary-value">{results.sounders || 0}</div>
            <div className="summary-detail">звуковых оповещателей</div>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">🏗️</div>
          <div className="summary-content">
            <h4>Управление</h4>
            <div className="summary-value">{results.zones || 0}</div>
            <div className="summary-detail">зон, {results.controlPanels || 0} ППКП</div>
          </div>
        </div>

        <div className="summary-card primary">
          <div className="summary-icon">💰</div>
          <div className="summary-content">
            <h4>Стоимость</h4>
            <div className="summary-value">
              {(results.totalCost || 0).toLocaleString('ru-RU')} ₽
            </div>
            <div className="summary-detail">
              {Math.round((results.totalCost || 0) / ((data.building?.aboveGroundArea || 1) + (data.building?.undergroundArea || 0)))} ₽/м²
            </div>
          </div>
        </div>
      </div>

      {/* Детальная визуализация */}
      <div className="results-detailed">
        <ResultsVisualizer results={results} project={project} />
      </div>

      {/* Рекомендации */}
      <div className="calculation-recommendations">
        <h4>Рекомендации и примечания:</h4>
        <div className="recommendations-list">
          {generateRecommendations(results, data)}
        </div>
      </div>

      {/* Нормативные ссылки */}
      <div className="regulatory-references">
        <h4>Нормативные документы:</h4>
        <ul>
          <li>СП 484.1311500.2020 "Системы противопожарной защиты"</li>
          <li>СП 5.13130.2009 "Установки пожарной сигнализации"</li>
          <li>ГОСТ Р 53325-2012 "Техника пожарная"</li>
          <li>НПБ 88-2001 "Установки пожаротушения и сигнализации"</li>
        </ul>
      </div>
    </div>
  )
}

// Функция для генерации рекомендаций
const generateRecommendations = (results, data) => {
  const recommendations = []

  // Анализ плотности извещателей
  const totalArea = (data.building?.aboveGroundArea || 0) + (data.building?.undergroundArea || 0)
  const totalDetectors = (results.smokeDetectors || 0) + (results.heatDetectors || 0)
  const detectorDensity = totalArea / (totalDetectors || 1)

  if (detectorDensity > 100) {
    recommendations.push({
      type: 'warning',
      text: `Плотность извещателей (${detectorDensity.toFixed(1)} м²/извещатель) превышает рекомендуемую. Рассмотрите увеличение количества извещателей.`
    })
  } else if (detectorDensity < 50) {
    recommendations.push({
      type: 'info',
      text: `Плотность извещателей высокая (${detectorDensity.toFixed(1)} м²/извещатель). Возможна оптимизация для снижения стоимости.`
    })
  } else {
    recommendations.push({
      type: 'success',
      text: `Плотность извещателей (${detectorDensity.toFixed(1)} м²/извещатель) соответствует нормативным требованиям.`
    })
  }

  // Анализ соотношения дымовых и тепловых
  const smokeRatio = (results.smokeDetectors || 0) / (totalDetectors || 1)
  if (data.building?.buildingType === 'Ф1.3' && smokeRatio < 0.7) {
    recommendations.push({
      type: 'warning',
      text: 'Для жилых зданий рекомендуется не менее 70% дымовых извещателей.'
    })
  }

  // Анализ зонирования
  const zonesPerPanel = (results.zones || 0) / (results.controlPanels || 1)
  if (zonesPerPanel > 8) {
    recommendations.push({
      type: 'warning',
      text: `Количество зон на один ППКП (${zonesPerPanel.toFixed(1)}) может быть избыточным. Рассмотрите добавление дополнительных приборов.`
    })
  }

  // Анализ стоимости
  const costPerSqm = (results.totalCost || 0) / totalArea
  if (costPerSqm > 1000) {
    recommendations.push({
      type: 'info',
      text: `Стоимость системы (${costPerSqm.toFixed(0)} ₽/м²) относительно высокая. Проверьте выбор оборудования.`
    })
  }

  return recommendations.map((rec, index) => (
    <div key={index} className={`recommendation ${rec.type}`}>
      <span className="recommendation-icon">
        {rec.type === 'success' ? '✅' : rec.type === 'warning' ? '⚠️' : 'ℹ️'}
      </span>
      <span className="recommendation-text">{rec.text}</span>
    </div>
  ))
}

export default ResultsStep