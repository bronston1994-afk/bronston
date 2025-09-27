# Примеры использования стилей портала АПС

## Базовая структура портала

```jsx
// Основная структура портала
function PortalLayout() {
  return (
    <div className="portal-container">
      {/* Заголовок портала */}
      <header className="portal-header">
        <nav className="portal-nav">
          <a href="#" className="portal-logo">АПС Калькулятор</a>
          <ul className="portal-menu">
            <li><a href="#calculator">🔧 Калькулятор</a></li>
            <li><a href="#results">📊 Результаты</a></li>
            <li><a href="#help">❓ Справка</a></li>
          </ul>
        </nav>
      </header>

      {/* Основной контент */}
      <main>
        <h1 className="portal-title">Калькулятор пожарного оборудования</h1>

        {/* Карточки с glassmorphism эффектом */}
        <div className="portal-card floating">
          <h2 className="portal-subtitle">Параметры здания</h2>
          <div className="portal-grid">
            <div className="portal-grid-item">
              <label>Площадь здания (м²)</label>
              <input type="number" className="portal-input" placeholder="Введите площадь"/>
            </div>
            <div className="portal-grid-item">
              <label>Тип здания</label>
              <select className="portal-input">
                <option>Офисное</option>
                <option>Складское</option>
                <option>Промышленное</option>
              </select>
            </div>
          </div>

          <button className="portal-button pulse">🔥 Рассчитать оборудование</button>
        </div>
      </main>
    </div>
  );
}
```

## Карточки статистики

```jsx
// Отображение результатов расчета
function ResultsCard({ results }) {
  return (
    <div className="portal-card">
      <h2 className="portal-subtitle">Результаты расчета</h2>

      <div className="portal-stats-grid">
        <div className="portal-stat-card">
          <span className="portal-stat-icon">🔥</span>
          <div className="portal-stat-value">{results.detectors}</div>
          <div className="portal-stat-label">Датчиков пожара</div>
        </div>

        <div className="portal-stat-card">
          <span className="portal-stat-icon">🚨</span>
          <div className="portal-stat-value">{results.alarms}</div>
          <div className="portal-stat-label">Звуковых извещателей</div>
        </div>

        <div className="portal-stat-card">
          <span className="portal-stat-icon">🎛️</span>
          <div className="portal-stat-value">{results.panels}</div>
          <div className="portal-stat-label">Контрольных панелей</div>
        </div>

        <div className="portal-stat-card">
          <span className="portal-stat-icon">🔌</span>
          <div className="portal-stat-value">{results.cables}м</div>
          <div className="portal-stat-label">Длина кабеля</div>
        </div>
      </div>
    </div>
  );
}
```

## Прогресс-бар расчета

```jsx
// Индикатор прогресса вычислений
function CalculationProgress({ progress }) {
  return (
    <div className="portal-card">
      <h3 className="portal-subtitle">🔄 Расчет в процессе...</h3>

      <div className="portal-progress">
        <div
          className="portal-progress-bar"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p>Анализ параметров здания: {progress}%</p>

      {/* Пульсирующий загрузчик */}
      <div className="portal-pulse-loader">
        <div className="portal-pulse-dot"></div>
        <div className="portal-pulse-dot"></div>
        <div className="portal-pulse-dot"></div>
      </div>
    </div>
  );
}
```

## Модальные окна

```jsx
// Модальное окно с детальными результатами
function DetailedResultsModal({ isOpen, onClose, data }) {
  return (
    <div className={`portal-modal ${isOpen ? 'active' : ''}`}>
      <div className="portal-modal-content">
        <h2 className="portal-subtitle">📋 Детальный отчет</h2>

        <div className="portal-grid">
          <div className="portal-grid-item">
            <h4>Дымовые датчики</h4>
            <p>Количество: {data.smokeDetectors}</p>
            <p>Площадь покрытия: {data.smokeArea} м²</p>
          </div>

          <div className="portal-grid-item">
            <h4>Тепловые датчики</h4>
            <p>Количество: {data.heatDetectors}</p>
            <p>Площадь покрытия: {data.heatArea} м²</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button className="portal-button">📄 Скачать отчет</button>
          <button className="portal-button secondary" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
```

## Уведомления

```jsx
// Система тостовых уведомлений
function ToastNotification({ type, title, message, onClose }) {
  return (
    <div className="portal-toast-container">
      <div className={`portal-toast ${type} show`}>
        <div className="portal-toast-header">
          <span className="portal-toast-title">{title}</span>
          <button className="portal-toast-close" onClick={onClose}>×</button>
        </div>
        <div className="portal-toast-body">{message}</div>
      </div>
    </div>
  );
}

// Примеры использования уведомлений
function showNotifications() {
  // Успешный расчет
  showToast('success', '✅ Расчет завершен', 'Все параметры рассчитаны успешно');

  // Предупреждение
  showToast('warning', '⚠️ Внимание', 'Площадь помещения превышает рекомендуемые значения');

  // Ошибка
  showToast('error', '❌ Ошибка', 'Не удалось выполнить расчет. Проверьте входные данные');
}
```

## Аккордеон с настройками

```jsx
// Секции с расширяемыми настройками
function SettingsAccordion({ settings, onUpdate }) {
  const [openSections, setOpenSections] = useState(['basic']);

  const toggleSection = (section) => {
    setOpenSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="portal-card">
      <h2 className="portal-subtitle">⚙️ Настройки расчета</h2>

      <div className="portal-accordion">
        <div className={`portal-accordion-item ${openSections.includes('basic') ? 'open' : ''}`}>
          <div
            className="portal-accordion-header"
            onClick={() => toggleSection('basic')}
          >
            <span>🏢 Основные параметры</span>
            <span className="portal-accordion-icon">▼</span>
          </div>
          <div className="portal-accordion-content">
            <div className="portal-accordion-body">
              <label>Запас кабеля (%)</label>
              <input
                type="number"
                className="portal-input"
                value={settings.cableReserve}
                onChange={(e) => onUpdate('cableReserve', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={`portal-accordion-item ${openSections.includes('advanced') ? 'open' : ''}`}>
          <div
            className="portal-accordion-header"
            onClick={() => toggleSection('advanced')}
          >
            <span>🔬 Расширенные настройки</span>
            <span className="portal-accordion-icon">▼</span>
          </div>
          <div className="portal-accordion-content">
            <div className="portal-accordion-body">
              <label>Соотношение дым/тепло датчиков</label>
              <div className="portal-slider">
                <input
                  type="range"
                  className="portal-slider"
                  min="0"
                  max="100"
                  value={settings.smokeHeatRatio}
                  onChange={(e) => onUpdate('smokeHeatRatio', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Вкладки с результатами

```jsx
// Организация результатов по вкладкам
function ResultsTabs({ results }) {
  const [activeTab, setActiveTab] = useState('equipment');

  return (
    <div className="portal-card">
      <div className="portal-tabs">
        <div className="portal-tab-list">
          <button
            className={`portal-tab-button ${activeTab === 'equipment' ? 'active' : ''}`}
            onClick={() => setActiveTab('equipment')}
          >
            🔥 Оборудование
          </button>
          <button
            className={`portal-tab-button ${activeTab === 'cables' ? 'active' : ''}`}
            onClick={() => setActiveTab('cables')}
          >
            🔌 Кабели
          </button>
          <button
            className={`portal-tab-button ${activeTab === 'costs' ? 'active' : ''}`}
            onClick={() => setActiveTab('costs')}
          >
            💰 Стоимость
          </button>
        </div>

        <div className="portal-tab-content">
          {activeTab === 'equipment' && (
            <div>
              <h3>Требуемое оборудование</h3>
              <p>Датчики пожара: {results.detectors} шт.</p>
              <p>Звуковые извещатели: {results.alarms} шт.</p>
            </div>
          )}

          {activeTab === 'cables' && (
            <div>
              <h3>Кабельная продукция</h3>
              <p>Общая длина: {results.totalCables} м</p>
              <p>С учетом запаса: {results.cablesWithReserve} м</p>
            </div>
          )}

          {activeTab === 'costs' && (
            <div>
              <h3>Ориентировочная стоимость</h3>
              <p>Оборудование: {results.equipmentCost} ₽</p>
              <p>Монтаж: {results.installCost} ₽</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

## Статусные бейджи

```jsx
// Отображение статуса различных элементов
function EquipmentStatus({ items }) {
  return (
    <div className="portal-card">
      <h2 className="portal-subtitle">📋 Статус оборудования</h2>

      {items.map(item => (
        <div key={item.id} className="portal-grid-item" style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{item.name}</span>
            <span className={`portal-status-badge ${item.status}`}>
              {item.status === 'active' && '✅ Активен'}
              {item.status === 'warning' && '⚠️ Предупреждение'}
              {item.status === 'error' && '❌ Ошибка'}
              {item.status === 'inactive' && '⭕ Неактивен'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
```

## Эффекты свечения

```jsx
// Применение специальных эффектов для важных элементов
function CriticalAlert({ message }) {
  return (
    <div className="portal-card portal-glow">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span className="portal-icon">🚨</span>
        <div>
          <h3 style={{ margin: 0, color: '#fc8181' }}>Критическое предупреждение</h3>
          <p style={{ margin: '0.5rem 0 0 0' }}>{message}</p>
        </div>
      </div>
      <button className="portal-button pulse" style={{ marginTop: '1rem' }}>
        🔧 Исправить проблему
      </button>
    </div>
  );
}
```

## CSS переменные для кастомизации

```css
/* Переопределение цветовой схемы */
:root {
  /* Основные цвета (можно изменить для других тем) */
  --primary-dark: #1a365d;      /* Темно-синий */
  --primary-medium: #2d3748;    /* Серо-синий */
  --accent-orange: #ff6b35;     /* Оранжевый акцент */
  --accent-red: #e53e3e;        /* Красный акцент */

  /* Альтернативная зеленая тема */
  --alt-primary: #1a4d3a;       /* Темно-зеленый */
  --alt-accent: #38a169;        /* Зеленый акцент */

  /* Фиолетовая тема */
  --purple-primary: #44337a;    /* Темно-фиолетовый */
  --purple-accent: #9f7aea;     /* Фиолетовый акцент */
}
```

Эти стили создают современный, профессиональный интерфейс для портала АПС калькулятора с огненной тематикой, glassmorphism эффектами и плавными анимациями.