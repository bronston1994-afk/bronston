import { useState } from 'react'

function App() {
  const [aboveGroundArea, setAboveGroundArea] = useState(800) // Надземная часть
  const [undergroundArea, setUndergroundArea] = useState(200) // Подземная парковка
  const [aboveGroundFloors, setAboveGroundFloors] = useState(3) // Этажи надземной части
  const [undergroundFloors, setUndergroundFloors] = useState(1) // Этажи подземной части
  const [floors, setFloors] = useState(3) // Общее количество этажей (для совместимости)
  const [apartmentsCount, setApartmentsCount] = useState(50) // Количество квартир
  const [roomsPerApartment, setRoomsPerApartment] = useState(2) // Количество комнат в квартире
  const [rooms, setRooms] = useState(25)
  const [height, setHeight] = useState(3.0)
  const [buildingType, setBuildingType] = useState('residential_apartment')
  const [detectorCoverage, setDetectorCoverage] = useState(25)
  const [manualCallDistance, setManualCallDistance] = useState(50)
  const [sounderCoverage, setSounderCoverage] = useState(15)
  const [cableReserve, setCableReserve] = useState(15)
  const [zoneSize, setZoneSize] = useState(500)
  const [results, setResults] = useState(null)

  // Общая площадь здания (надземная + подземная части)
  const totalArea = aboveGroundArea + undergroundArea

  // Общее количество этажей (надземные + подземные)
  const totalFloors = aboveGroundFloors + undergroundFloors

  const calculateEquipment = () => {
    // Используем общую площадь для расчётов
    const area = totalArea

    // Расчёт зон контроля (ЗКПС) - основа для всех расчётов
    const zones = Math.ceil(area / zoneSize)

    // Расчёт датчиков с учётом квартир и комнат для жилых зданий
    let totalDetectors
    if (buildingType === 'residential_apartment') {
      // Для жилых квартир: минимум 1 датчик на комнату + кухня + коридор
      const detectorsPerApartment = roomsPerApartment + 2 // комнаты + кухня + коридор
      totalDetectors = apartmentsCount * detectorsPerApartment
      // Добавляем датчики для общих зон (лестницы, коридоры)
      // Надземные этажи: 2 датчика на этаж, подземные: 1 датчик на этаж
      const aboveGroundCommonDetectors = Math.ceil(aboveGroundFloors * 2)
      const undergroundCommonDetectors = Math.ceil(undergroundFloors * 1)
      const commonAreaDetectors = aboveGroundCommonDetectors + undergroundCommonDetectors
      totalDetectors += commonAreaDetectors
    } else {
      // Для остальных типов помещений - по площади
      totalDetectors = Math.ceil(area / detectorCoverage)
    }

    // Разделение на типы датчиков по принципам безопасности
    let smokeDetectors, heatDetectors, algorithmType
    switch(buildingType) {
      // Жилые помещения
      case 'residential_apartment':
        // Квартиры - преимущественно дымовые для раннего обнаружения
        // В спальнях и гостиных только дымовые, на кухне - тепловые
        const kitchenHeatDetectors = apartmentsCount // по 1 тепловому на кухню
        heatDetectors = kitchenHeatDetectors
        smokeDetectors = totalDetectors - heatDetectors
        algorithmType = 'B (двойное срабатывание ≤60с)'
        break

      // Хранение и парковка
      case 'parking_underground':
        // Подземный паркинг - особые требования по алгоритму С
        smokeDetectors = Math.ceil(totalDetectors * 0.6)
        heatDetectors = Math.ceil(totalDetectors * 0.4)
        algorithmType = 'С (два разных типа ИП)'
        break
      case 'storage_individual':
        // Кладовые - смешанный тип с учётом хранимых материалов
        smokeDetectors = Math.ceil(totalDetectors * 0.7)
        heatDetectors = Math.ceil(totalDetectors * 0.3)
        algorithmType = 'B (двойное срабатывание ≤60с)'
        break
      case 'waste_room':
        // Мусоросборная - повышенная пожароопасность
        smokeDetectors = Math.ceil(totalDetectors * 0.8)
        heatDetectors = Math.ceil(totalDetectors * 0.2)
        algorithmType = 'B (двойное срабатывание ≤60с)'
        break

      // Технические помещения
      case 'tech_ventilation':
      case 'tech_heating':
      case 'tech_pumping':
      case 'tech_water':
      case 'tech_floor':
        // Технические помещения - больше тепловых из-за оборудования
        smokeDetectors = Math.ceil(totalDetectors * 0.4)
        heatDetectors = Math.ceil(totalDetectors * 0.6)
        algorithmType = 'B (двойное срабатывание ≤60с)'
        break
      case 'tech_transformer':
      case 'tech_electrical':
        // Электрические помещения - специальные требования
        smokeDetectors = Math.ceil(totalDetectors * 0.3)
        heatDetectors = Math.ceil(totalDetectors * 0.7)
        algorithmType = 'B (двойное срабатывание ≤60с)'
        break
      case 'tech_telecom':
        // Слаботочные системы - преимущественно дымовые
        smokeDetectors = Math.ceil(totalDetectors * 0.9)
        heatDetectors = Math.ceil(totalDetectors * 0.1)
        algorithmType = 'B (двойное срабатывание ≤60с)'
        break

      // Охрана и эксплуатация
      case 'security_post':
      case 'staff_room':
        // Помещения персонала - как офисные
        smokeDetectors = Math.ceil(totalDetectors * 0.8)
        heatDetectors = Math.ceil(totalDetectors * 0.2)
        algorithmType = 'B (двойное срабатывание ≤60с)'
        break

      // Стандартные типы (для совместимости)
      case 'warehouse':
        smokeDetectors = Math.ceil(totalDetectors * 0.3)
        heatDetectors = Math.ceil(totalDetectors * 0.7)
        algorithmType = 'B (двойное срабатывание ≤60с)'
        break
      case 'industrial':
        smokeDetectors = Math.ceil(totalDetectors * 0.4)
        heatDetectors = Math.ceil(totalDetectors * 0.6)
        algorithmType = 'B (двойное срабатывание ≤60с)'
        break
      case 'residential':
        smokeDetectors = Math.ceil(totalDetectors * 0.9)
        heatDetectors = Math.ceil(totalDetectors * 0.1)
        algorithmType = 'B (двойное срабатывание ≤60с)'
        break
      case 'commercial':
        smokeDetectors = Math.ceil(totalDetectors * 0.85)
        heatDetectors = Math.ceil(totalDetectors * 0.15)
        algorithmType = 'B (двойное срабатывание ≤60с)'
        break
      default: // office
        smokeDetectors = Math.ceil(totalDetectors * 0.8)
        heatDetectors = Math.ceil(totalDetectors * 0.2)
        algorithmType = 'B (двойное срабатывание ≤60с)'
        break
    }

    // Расчёт ППКОП R3-РУБЕЖ-2ОП на основе технических характеристик
    // Один прибор: до 500 пожарных зон, 2 АЛС × 3000м каждая
    const maxZonesPerPanel = 500 // Максимум зон на один прибор
    const maxLineLength = 3000 // Максимальная длина одной АЛС в метрах
    const linesPerPanel = 2 // Количество АЛС на один прибор

    // Расчёт по зонам
    const panelsByZones = Math.ceil(zones / maxZonesPerPanel)

    // Расчёт по длине линий (примерная длина АЛС на основе площади)
    // Расчёт длины кабеля с учётом раздельной этажности
    const aboveGroundLineLength = Math.sqrt(aboveGroundArea) * aboveGroundFloors * 1.5
    const undergroundLineLength = Math.sqrt(undergroundArea) * undergroundFloors * 2.0 // Подземка сложнее для прокладки
    const estimatedLineLength = aboveGroundLineLength + undergroundLineLength
    const requiredLines = Math.ceil(estimatedLineLength / maxLineLength) * Math.ceil(zones / 100) // Дополнительные линии для больших объектов
    const panelsByLineLength = Math.ceil(requiredLines / linesPerPanel)

    // Итоговое количество приборов (по максимальному ограничению)
    const controlPanels = Math.max(1, panelsByZones, panelsByLineLength)

    // Ручные извещатели (алгоритм А - одноразовое срабатывание)
    // По периметру здания и в помещениях согласно нормативам
    const perimeter = 2 * Math.sqrt(area * 2) // примерный периметр здания
    const manualCallPoints = Math.ceil(perimeter / manualCallDistance) + Math.ceil(rooms / 4)

    // Система оповещения по типам помещений (СОУЭ)
    let sounderMultiplier, soueType
    switch(buildingType) {
      // Жилые помещения
      case 'residential_apartment':
        soueType = '3-й тип (жилые секции)'
        sounderMultiplier = 1.0 // Стандартное покрытие для жилых помещений
        break

      // Хранение и парковка
      case 'parking_underground':
        soueType = '4-й тип (парковка)'
        sounderMultiplier = 1.4 // Увеличенное из-за большой площади и акустики
        break
      case 'storage_individual':
        soueType = '2-й тип (кладовые)'
        sounderMultiplier = 1.1 // Стандартное с небольшим запасом
        break
      case 'waste_room':
        soueType = '2-й тип (техпомещения)'
        sounderMultiplier = 1.2 // Повышенные требования из-за опасности
        break

      // Технические помещения
      case 'tech_ventilation':
      case 'tech_heating':
      case 'tech_pumping':
      case 'tech_water':
      case 'tech_floor':
      case 'tech_transformer':
      case 'tech_electrical':
      case 'tech_telecom':
        soueType = '2-й тип (техпомещения)'
        sounderMultiplier = 1.2 // Увеличенное из-за шума оборудования
        break

      // Охрана и эксплуатация
      case 'security_post':
      case 'staff_room':
        soueType = '3-й тип (административные)'
        sounderMultiplier = 1.0 // Стандартное покрытие как для офисов
        break

      // Стандартные типы (для совместимости)
      case 'warehouse':
        soueType = '2-й тип (техпомещения)'
        sounderMultiplier = 1.2
        break
      case 'industrial':
        soueType = '2-й тип (техпомещения)'
        sounderMultiplier = 1.3
        break
      case 'residential':
        soueType = '3-й тип (жилые секции)'
        sounderMultiplier = 1.0
        break
      case 'commercial':
        soueType = '3-й тип (торговые)'
        sounderMultiplier = 1.1
        break
      default: // office
        soueType = '3-й тип (офисные)'
        sounderMultiplier = 1.0
        break
    }

    // Расчёт оповещателей с учётом уровня звука ≥75 дБА, но ≤120 дБА
    const sounderArea = Math.PI * Math.pow(sounderCoverage, 2)
    const sounders = Math.ceil((area / sounderArea) * sounderMultiplier)
    const beacons = Math.ceil(sounders * 0.5) // 50% световых оповещателей

    // Источники питания ИВЭПР 24/2,5 RS-R3 - отдельный для каждой панели ППКОП
    const powerSupplies = controlPanels // По одному источнику питания на каждую панель
    const batteries = powerSupplies * 2 // По 2 аккумулятора 12В 7Ач на источник питания

    // Дополнительные релейные модули для управления системами
    const relayModules = Math.ceil(zones / 10) // РМ-1/РМ-4 для управления оборудованием

    // Монтажные коробки - для всех устройств на шлейфах
    const boxes = Math.ceil((totalDetectors + manualCallPoints + sounders + beacons) / 2)

    // Расчёт кабеля с учётом требований АЛС R3-РУБЕЖ-2ОП
    const cableMultiplier = 1 + (cableReserve / 100) // Запас кабеля

    // КСРЭПнг(А)-FRHF для АЛС (адресные линии связи)
    // Длина АЛС ≤ 3000м на линию, 2 линии на прибор
    const alsLength = Math.min(estimatedLineLength, maxLineLength * linesPerPanel)
    const loopCable = Math.ceil(controlPanels * alsLength * cableMultiplier)

    // КПРПГнг(А)-FRHF для питания панелей и источников питания
    const avgPowerRun = Math.sqrt(area) * 0.3 // Средняя длина до щитовых
    const powerCable = Math.ceil(controlPanels * avgPowerRun * cableMultiplier)

    // КПСнг(А)-FRHF для линий оповещения
    const avgSounderRun = Math.sqrt(area) * 0.5 // Длина линий оповещения
    const sounderCable = Math.ceil(sounders * avgSounderRun * 0.7 * cableMultiplier)

    setResults({
      smokeDetectors,
      heatDetectors,
      totalDetectors,
      controlPanels,
      manualCallPoints,
      sounders,
      beacons,
      powerSupplies,
      batteries,
      boxes,
      zones,
      loopCable,
      powerCable,
      sounderCable,
      relayModules,
      algorithmType,
      soueType,
      maxZonesPerPanel,
      alsLength: Math.ceil(alsLength),
      aboveGroundArea,
      undergroundArea,
      totalArea
    })
  }

  const styles = {
    body: {
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      margin: 0,
      padding: '20px'
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    },
    header: {
      background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
      color: 'white',
      padding: '30px',
      textAlign: 'center'
    },
    headerTitle: {
      fontSize: '2.5em',
      marginBottom: '10px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
    },
    headerSubtitle: {
      fontSize: '1.2em',
      opacity: 0.9
    },
    mainContent: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '30px',
      padding: '30px'
    },
    section: {
      background: 'white',
      borderRadius: '15px',
      padding: '25px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    sectionTitle: {
      fontSize: '1.5em',
      color: '#2c3e50',
      marginBottom: '20px',
      paddingBottom: '10px',
      borderBottom: '3px solid #3498db',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    inputGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: 600,
      color: '#2c3e50',
      fontSize: '0.9em'
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      border: '2px solid #e0e6ed',
      borderRadius: '10px',
      fontSize: '1em',
      transition: 'all 0.3s ease',
      background: '#f8f9fa',
      boxSizing: 'border-box',
      color: '#2c3e50' // Устанавливаем тёмный цвет текста для лучшей видимости
    },
    calculateBtn: {
      background: 'linear-gradient(45deg, #3498db, #2980b9)',
      color: 'white',
      border: 'none',
      padding: '15px 30px',
      borderRadius: '10px',
      fontSize: '1.1em',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: '100%',
      marginTop: '20px'
    },
    results: {
      gridColumn: '1 / -1',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      borderRadius: '15px',
      padding: '30px',
      marginTop: '10px'
    },
    resultsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginTop: '20px'
    },
    resultCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '10px',
      padding: '20px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    resultCardTitle: {
      marginBottom: '15px',
      color: '#fff',
      fontSize: '1.2em'
    },
    resultItem: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
      padding: '8px 0',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    },
    resultValue: {
      fontWeight: 600,
      color: '#ffd700'
    }
  }

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>🔥 Калькулятор АПС</h1>
          <p style={styles.headerSubtitle}>Автоматическая пожарная сигнализация - Расчёт оборудования и кабеля</p>
        </div>

        <div style={styles.mainContent}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <span>🏢</span>
              Параметры объекта
            </h2>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Площадь надземной части (м²)</label>
              <input
                type="number"
                value={aboveGroundArea}
                onChange={(e) => setAboveGroundArea(Number(e.target.value))}
                style={styles.input}
                placeholder="Жилые, офисные, коммерческие помещения"
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Площадь подземной парковки (м²)</label>
              <input
                type="number"
                value={undergroundArea}
                onChange={(e) => setUndergroundArea(Number(e.target.value))}
                style={styles.input}
                placeholder="Автомобильная парковка, технические помещения"
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Общая площадь объекта (м²)</label>
              <input
                type="number"
                value={totalArea}
                readOnly
                style={{...styles.input, backgroundColor: '#e9ecef', cursor: 'not-allowed'}}
                title="Рассчитывается автоматически как сумма надземной и подземной частей"
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Этажи надземной части</label>
              <select
                value={aboveGroundFloors}
                onChange={(e) => setAboveGroundFloors(Number(e.target.value))}
                style={styles.input}
              >
                {Array.from({length: 100}, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Этажи подземной части</label>
              <select
                value={undergroundFloors}
                onChange={(e) => setUndergroundFloors(Number(e.target.value))}
                style={styles.input}
              >
                {Array.from({length: 10}, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Общее количество этажей</label>
              <input
                type="number"
                value={totalFloors}
                readOnly
                style={{...styles.input, backgroundColor: '#e9ecef', cursor: 'not-allowed'}}
                title="Рассчитывается автоматически как сумма надземных и подземных этажей"
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Количество квартир</label>
              <input
                type="number"
                value={apartmentsCount}
                onChange={(e) => setApartmentsCount(Number(e.target.value))}
                style={styles.input}
                placeholder="Общее количество квартир в здании"
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Количество комнат в квартире</label>
              <select
                value={roomsPerApartment}
                onChange={(e) => setRoomsPerApartment(Number(e.target.value))}
                style={styles.input}
              >
                <option value={1}>1-комнатная</option>
                <option value={2}>2-комнатная</option>
                <option value={3}>3-комнатная</option>
                <option value={4}>4-комнатная</option>
                <option value={5}>5-комнатная</option>
                <option value={6}>6+ комнатная</option>
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Количество помещений</label>
              <input
                type="number"
                value={rooms}
                onChange={(e) => setRooms(Number(e.target.value))}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Высота потолков (м)</label>
              <input 
                type="number" 
                step="0.1" 
                value={height} 
                onChange={(e) => setHeight(Number(e.target.value))}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Тип помещения</label>
              <select
                value={buildingType}
                onChange={(e) => setBuildingType(e.target.value)}
                style={styles.input}
              >
                <optgroup label="🏠 Жилые помещения">
                  <option value="residential_apartment">Квартиры жилого комплекса</option>
                </optgroup>

                <optgroup label="🚗 Хранение и парковка">
                  <option value="parking_underground">Подземный паркинг (Ф5.2)</option>
                  <option value="storage_individual">Индивидуальные кладовые</option>
                  <option value="waste_room">Мусоросборная камера</option>
                </optgroup>

                <optgroup label="⚙️ Технические/инженерные">
                  <option value="tech_ventilation">Венткамеры</option>
                  <option value="tech_heating">ИТП (тепловой пункт)</option>
                  <option value="tech_pumping">Насосная станция</option>
                  <option value="tech_transformer">Трансформаторная подстанция</option>
                  <option value="tech_electrical">Электрощитовые</option>
                  <option value="tech_telecom">Слаботочные системы (СС)</option>
                  <option value="tech_water">Водомерные узлы</option>
                  <option value="tech_floor">Технические этажи/пространства</option>
                </optgroup>

                <optgroup label="🛡️ Охрана и эксплуатация">
                  <option value="security_post">Пост охраны</option>
                  <option value="staff_room">Комната отдыха персонала</option>
                </optgroup>

                <optgroup label="📋 Стандартные типы">
                  <option value="office">Офисное здание</option>
                  <option value="warehouse">Складское помещение</option>
                  <option value="industrial">Производственное</option>
                  <option value="commercial">Торговое</option>
                </optgroup>
              </select>
            </div>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <span>⚙️</span>
              Технические параметры
            </h2>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Площадь покрытия 1 датчика (м²)</label>
              <input 
                type="number" 
                value={detectorCoverage} 
                onChange={(e) => setDetectorCoverage(Number(e.target.value))}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Расстояние между ИПР (м)</label>
              <input 
                type="number" 
                value={manualCallDistance} 
                onChange={(e) => setManualCallDistance(Number(e.target.value))}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Радиус действия оповещателя (м)</label>
              <input 
                type="number" 
                value={sounderCoverage} 
                onChange={(e) => setSounderCoverage(Number(e.target.value))}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Запас кабеля (%)</label>
              <input 
                type="number" 
                value={cableReserve} 
                onChange={(e) => setCableReserve(Number(e.target.value))}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Размер зоны (м²)</label>
              <input 
                type="number" 
                value={zoneSize} 
                onChange={(e) => setZoneSize(Number(e.target.value))}
                style={styles.input}
              />
            </div>

            <button style={styles.calculateBtn} onClick={calculateEquipment}>
              🧮 Рассчитать оборудование
            </button>
          </div>

          {results && (
            <div style={styles.results}>
              <h2 style={styles.sectionTitle}>
                <span>📊</span>
                Результаты расчёта
              </h2>
              
              <div style={styles.resultsGrid}>
                <div style={styles.resultCard}>
                  <h3 style={styles.resultCardTitle}>🔍 Датчики пожарной сигнализации</h3>
                  <div style={styles.resultItem}>
                    <span>Извещатель дымовой ИП 212-64-R3 W2.02 Rubezh:</span>
                    <span style={styles.resultValue}>{results.smokeDetectors} шт.</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Извещатель тепловой (аналогичный модели):</span>
                    <span style={styles.resultValue}>{results.heatDetectors} шт.</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Общее количество датчиков:</span>
                    <span style={styles.resultValue}>{results.totalDetectors} шт.</span>
                  </div>
                </div>

                <div style={styles.resultCard}>
                  <h3 style={styles.resultCardTitle}>🚨 Устройства управления и оповещения</h3>
                  <div style={styles.resultItem}>
                    <span>ППКОП 011249-2-1 "Рубеж-2ОП" прот.R3:</span>
                    <span style={styles.resultValue}>{results.controlPanels} шт.</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Извещатель ручной пожарный АМ-4 прот. R3:</span>
                    <span style={styles.resultValue}>{results.manualCallPoints} шт.</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Оповещатель ОПОП 124-R3 (светозвуковой):</span>
                    <span style={styles.resultValue}>{results.sounders} шт.</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Оповещатель световой МАЯК-24-СТ:</span>
                    <span style={styles.resultValue}>{results.beacons} шт.</span>
                  </div>
                </div>

                <div style={styles.resultCard}>
                  <h3 style={styles.resultCardTitle}>🔌 Кабельная продукция</h3>
                  <div style={styles.resultItem}>
                    <span>КСРЭПнг(А)-FRHF 1х2х0.97мм (шлейфы):</span>
                    <span style={styles.resultValue}>{results.loopCable} м</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>КПРПГнг(А)-FRHF 3х1.50 (питание):</span>
                    <span style={styles.resultValue}>{results.powerCable} м</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>КПСнг(А)-FRHF 1х2х1.5 (оповещение):</span>
                    <span style={styles.resultValue}>{results.sounderCable} м</span>
                  </div>
                </div>

                <div style={styles.resultCard}>
                  <h3 style={styles.resultCardTitle}>💰 Дополнительное оборудование</h3>
                  <div style={styles.resultItem}>
                    <span>ИВЭПР 24/2,5 RS-R3 (источники питания):</span>
                    <span style={styles.resultValue}>{results.powerSupplies} шт.</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Аккумуляторы 12В 7Ач (резерв):</span>
                    <span style={styles.resultValue}>{results.batteries} шт.</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Релейные модули РМ-1/РМ-4-R3:</span>
                    <span style={styles.resultValue}>{results.relayModules} шт.</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Метка адресная АМ-1-R3 Rubezh:</span>
                    <span style={styles.resultValue}>{results.boxes} шт.</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Изолятор шлейфа ИЗ-1Б-R3:</span>
                    <span style={styles.resultValue}>{Math.ceil(results.zones/2)} шт.</span>
                  </div>
                </div>

                <div style={styles.resultCard}>
                  <h3 style={styles.resultCardTitle}>🔧 Монтажные материалы</h3>
                  <div style={styles.resultItem}>
                    <span>Труба гофрированная ПВХ d20мм:</span>
                    <span style={styles.resultValue}>{Math.ceil(results.totalDetectors * 10)} м</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Скоба металлическая СМО 19-26:</span>
                    <span style={styles.resultValue}>{Math.ceil(results.totalDetectors * 15)} шт.</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Анкер-клин 6х60мм металлический:</span>
                    <span style={styles.resultValue}>{Math.ceil(results.totalDetectors * 8)} шт.</span>
                  </div>
                </div>

                <div style={styles.resultCard}>
                  <h3 style={styles.resultCardTitle}>🏢 Площади объекта</h3>
                  <div style={styles.resultItem}>
                    <span>Надземная часть:</span>
                    <span style={styles.resultValue}>{results.aboveGroundArea} м²</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Подземная парковка:</span>
                    <span style={styles.resultValue}>{results.undergroundArea} м²</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Общая площадь здания:</span>
                    <span style={styles.resultValue}>{results.totalArea} м²</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Количество квартир:</span>
                    <span style={styles.resultValue}>{apartmentsCount} шт.</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Комнатность квартир:</span>
                    <span style={styles.resultValue}>{roomsPerApartment === 6 ? '6+' : roomsPerApartment}-комнатные</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Общее количество комнат:</span>
                    <span style={styles.resultValue}>{apartmentsCount * roomsPerApartment} шт.</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Этажи надземной части:</span>
                    <span style={styles.resultValue}>{aboveGroundFloors} этажей</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Этажи подземной части:</span>
                    <span style={styles.resultValue}>{undergroundFloors} этажей</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Общее количество этажей:</span>
                    <span style={styles.resultValue}>{totalFloors} этажей</span>
                  </div>
                </div>

                <div style={styles.resultCard}>
                  <h3 style={styles.resultCardTitle}>📊 Параметры системы R3-РУБЕЖ-2ОП</h3>
                  <div style={styles.resultItem}>
                    <span>Расчётное количество зон (ЗКПС):</span>
                    <span style={styles.resultValue}>{results.zones} / {results.maxZonesPerPanel} макс.</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Длина АЛС (адресных линий связи):</span>
                    <span style={styles.resultValue}>{results.alsLength} / 3000м макс.</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Количество АЛС на прибор:</span>
                    <span style={styles.resultValue}>2 линии × 3000м</span>
                  </div>
                </div>

                <div style={styles.resultCard}>
                  <h3 style={styles.resultCardTitle}>📋 Алгоритмы и типы систем</h3>
                  <div style={styles.resultItem}>
                    <span>Алгоритм работы датчиков:</span>
                    <span style={styles.resultValue}>{results.algorithmType}</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Тип системы оповещения (СОУЭ):</span>
                    <span style={styles.resultValue}>{results.soueType}</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Уровень звукового давления:</span>
                    <span style={styles.resultValue}>75-120 дБА</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
