import { useState } from 'react'
import './App.css'

function App() {
  // Основные состояния здания
  const [aboveGroundArea, setAboveGroundArea] = useState(800) // Надземная часть
  const [undergroundArea, setUndergroundArea] = useState(200) // Подземная парковка
  const [aboveGroundFloors, setAboveGroundFloors] = useState(3) // Этажи надземной части
  const [undergroundFloors, setUndergroundFloors] = useState(1) // Этажи подземной части
  const [apartmentsCount, setApartmentsCount] = useState(50) // Общее количество квартир

  // Детализированный выбор квартир по комнатности
  const [apartment1Room, setApartment1Room] = useState(10) // Количество 1-комнатных квартир
  const [apartment2Room, setApartment2Room] = useState(20) // Количество 2-комнатных квартир
  const [apartment3Room, setApartment3Room] = useState(15) // Количество 3-комнатных квартир
  const [apartment4Room, setApartment4Room] = useState(3) // Количество 4-комнатных квартир
  const [apartment5Room, setApartment5Room] = useState(2) // Количество 5-комнатных квартир
  const [apartment6Room, setApartment6Room] = useState(0) // Количество 6-комнатных квартир
  const [apartment7Room, setApartment7Room] = useState(0) // Количество 7-комнатных квартир
  const [useDetailedApartments, setUseDetailedApartments] = useState(false) // Переключатель режима

  // Детальный выбор помещений по типам
  const [useDetailedRooms, setUseDetailedRooms] = useState(false) // Переключатель детального режима помещений

  // Общие помещения
  const [stairwellCount, setStairwellCount] = useState(0)
  const [stairwellArea, setStairwellArea] = useState(0)
  const [elevatorHallCount, setElevatorHallCount] = useState(0)
  const [elevatorHallArea, setElevatorHallArea] = useState(0)
  const [commonCorridorCount, setCommonCorridorCount] = useState(0)
  const [commonCorridorArea, setCommonCorridorArea] = useState(0)

  // Технические помещения
  const [techVentilationCount, setTechVentilationCount] = useState(0)
  const [techVentilationArea, setTechVentilationArea] = useState(0)
  const [techElectricalCount, setTechElectricalCount] = useState(0)
  const [techElectricalArea, setTechElectricalArea] = useState(0)
  const [techHeatingCount, setTechHeatingCount] = useState(0)
  const [techHeatingArea, setTechHeatingArea] = useState(0)
  const [techPumpingCount, setTechPumpingCount] = useState(0)
  const [techPumpingArea, setTechPumpingArea] = useState(0)
  const [techTransformerCount, setTechTransformerCount] = useState(0)
  const [techTransformerArea, setTechTransformerArea] = useState(0)
  const [techTelecomCount, setTechTelecomCount] = useState(0)
  const [techTelecomArea, setTechTelecomArea] = useState(0)
  const [techWaterCount, setTechWaterCount] = useState(0)
  const [techWaterArea, setTechWaterArea] = useState(0)
  const [techFloorCount, setTechFloorCount] = useState(0)
  const [techFloorArea, setTechFloorArea] = useState(0)

  // Хранение и парковка
  const [storageCount, setStorageCount] = useState(0)
  const [storageArea, setStorageArea] = useState(0)
  const [wasteRoomCount, setWasteRoomCount] = useState(0)
  const [wasteRoomArea, setWasteRoomArea] = useState(0)
  const [parkingUndergroundCount, setParkingUndergroundCount] = useState(0)
  const [parkingUndergroundArea, setParkingUndergroundArea] = useState(0)

  // Охрана и эксплуатация
  const [securityPostCount, setSecurityPostCount] = useState(0)
  const [securityPostArea, setSecurityPostArea] = useState(0)
  const [staffRoomCount, setStaffRoomCount] = useState(0)
  const [staffRoomArea, setStaffRoomArea] = useState(0)

  // Настройки системы АПС
  const [rooms, setRooms] = useState(25)
  const [height, setHeight] = useState(3.0)
  const [buildingType, setBuildingType] = useState('residential_apartment')
  const [detectorCoverage, setDetectorCoverage] = useState(25)
  const [manualCallDistance, setManualCallDistance] = useState(50)
  const [sounderCoverage, setSounderCoverage] = useState(15)
  const [cableReserve, setCableReserve] = useState(15)
  const [zoneSize, setZoneSize] = useState(500)

  // Результаты и состояния интерфейса
  const [results, setResults] = useState(null)
  const [showApartmentsModal, setShowApartmentsModal] = useState(false)
  const [showRoomsModal, setShowRoomsModal] = useState(false)
  const [activeSection, setActiveSection] = useState('calculator') // Навигация портала

  // Общая площадь здания (надземная + подземная части)
  const totalArea = aboveGroundArea + undergroundArea

  // Общее количество этажей (надземные + подземные)
  const totalFloors = aboveGroundFloors + undergroundFloors

  // Расчет общих характеристик квартир
  const calculatedApartmentsCount = useDetailedApartments
    ? apartment1Room + apartment2Room + apartment3Room + apartment4Room + apartment5Room + apartment6Room + apartment7Room
    : apartmentsCount

  // Средняя комнатность при детальном режиме
  const averageRoomsPerApartment = useDetailedApartments && calculatedApartmentsCount > 0
    ? (apartment1Room * 1 + apartment2Room * 2 + apartment3Room * 3 + apartment4Room * 4 + apartment5Room * 5 + apartment6Room * 6 + apartment7Room * 7) / calculatedApartmentsCount
    : 2

  // Расчет общего количества помещений при детальном режиме
  const calculatedRoomsCount = useDetailedRooms
    ? (stairwellCount * totalFloors) + (elevatorHallCount * totalFloors) + (commonCorridorCount * totalFloors) +
      techVentilationCount + techElectricalCount + techHeatingCount + techPumpingCount + techTransformerCount + techTelecomCount + techWaterCount + techFloorCount +
      storageCount + wasteRoomCount + parkingUndergroundCount +
      securityPostCount + staffRoomCount
    : rooms

  // Расчет общей площади помещений при детальном режиме
  const calculatedRoomsArea = useDetailedRooms
    ? (stairwellArea * stairwellCount * totalFloors) + (elevatorHallArea * elevatorHallCount * totalFloors) + (commonCorridorArea * commonCorridorCount * totalFloors) +
      (techVentilationArea * techVentilationCount) + (techElectricalArea * techElectricalCount) + (techHeatingArea * techHeatingCount) + (techPumpingArea * techPumpingCount) + (techTransformerArea * techTransformerCount) + (techTelecomArea * techTelecomCount) + (techWaterArea * techWaterCount) + (techFloorArea * techFloorCount) +
      (storageArea * storageCount) + (wasteRoomArea * wasteRoomCount) + (parkingUndergroundArea * parkingUndergroundCount) +
      (securityPostArea * securityPostCount) + (staffRoomArea * staffRoomCount)
    : 0

  const calculateEquipment = () => {
    // Используем общую площадь для расчётов
    const area = totalArea

    // Расчёт зон контроля (ЗКПС) - основа для всех расчётов
    const zones = Math.ceil(area / zoneSize)

    // Расчёт максимальной площади покрытия одним дымовым извещателем согласно СП 5.13130.2009
    // Базовое значение 85 м² при высоте до 3.5м, уменьшается при большей высоте
    const getMaxDetectorCoverage = (ceilingHeight, baseArea = 85) => {
      if (ceilingHeight <= 3.5) {
        return baseArea
      } else if (ceilingHeight <= 6.0) {
        // При высоте 3.5-6м площадь уменьшается пропорционально
        return Math.max(baseArea * (3.5 / ceilingHeight), 55)
      } else {
        // При высоте свыше 6м - минимальная площадь
        return 55
      }
    }

    // Корректированная площадь покрытия с учетом высоты помещения
    const adjustedDetectorCoverage = getMaxDetectorCoverage(height)

    // Расчёт датчиков с учётом квартир и комнат для жилых зданий
    let totalDetectors
    if (buildingType === 'residential_apartment') {
      if (useDetailedRooms) {
        // Детальный режим помещений: точный расчет по типам помещений
        let detectorsByRoomType = 0

        // Общие помещения (учитываем количество этажей)
        detectorsByRoomType += (stairwellCount * totalFloors)     // лестничные клетки - дымовые
        detectorsByRoomType += (elevatorHallCount * totalFloors)  // лифтовые холлы - дымовые
        detectorsByRoomType += (commonCorridorCount * totalFloors) // общие коридоры - дымовые

        // Технические помещения
        detectorsByRoomType += techVentilationCount // венткамеры
        detectorsByRoomType += techElectricalCount  // электрощитовые
        detectorsByRoomType += techHeatingCount     // ИТП
        detectorsByRoomType += techPumpingCount     // насосные станции
        detectorsByRoomType += techTransformerCount // трансформаторные
        detectorsByRoomType += techTelecomCount     // слаботочные
        detectorsByRoomType += techWaterCount       // водомерные узлы
        detectorsByRoomType += techFloorCount       // технические этажи

        // Хранение и парковка
        detectorsByRoomType += storageCount           // кладовые
        detectorsByRoomType += wasteRoomCount         // мусорные камеры
        detectorsByRoomType += parkingUndergroundCount // подземная парковка

        // Охрана и эксплуатация
        detectorsByRoomType += securityPostCount // посты охраны
        detectorsByRoomType += staffRoomCount    // комнаты персонала

        totalDetectors = detectorsByRoomType

        // Дополнительная проверка по площади помещений (если указана)
        if (calculatedRoomsArea > 0) {
          const detectorsByRoomArea = Math.ceil(calculatedRoomsArea / adjustedDetectorCoverage)
          totalDetectors = Math.max(totalDetectors, detectorsByRoomArea)
        }

      } else if (useDetailedApartments) {
        // Детальный режим квартир: считаем датчики для каждого типа квартир
        const detectors1Room = apartment1Room * (1 + 2) // комнаты + кухня + коридор
        const detectors2Room = apartment2Room * (2 + 2) // комнаты + кухня + коридор
        const detectors3Room = apartment3Room * (3 + 2) // комнаты + кухня + коридор
        const detectors4Room = apartment4Room * (4 + 2) // комнаты + кухня + коридор
        const detectors5Room = apartment5Room * (5 + 2) // комнаты + кухня + коридор
        const detectors6Room = apartment6Room * (6 + 2) // комнаты + кухня + коридор
        const detectors7Room = apartment7Room * (7 + 2) // комнаты + кухня + коридор

        totalDetectors = detectors1Room + detectors2Room + detectors3Room + detectors4Room + detectors5Room + detectors6Room + detectors7Room
      } else {
        // Простой режим: используем среднюю комнатность
        const detectorsPerApartment = averageRoomsPerApartment + 2 // комнаты + кухня + коридор
        totalDetectors = calculatedApartmentsCount * detectorsPerApartment
      }

      // Добавляем датчики для общих зон, если не используется детальный режим помещений
      if (!useDetailedRooms) {
        // Надземные этажи: 2 датчика на этаж, подземные: 1 датчик на этаж
        const aboveGroundCommonDetectors = Math.ceil(aboveGroundFloors * 2)
        const undergroundCommonDetectors = Math.ceil(undergroundFloors * 1)
        const commonAreaDetectors = aboveGroundCommonDetectors + undergroundCommonDetectors
        totalDetectors += commonAreaDetectors
      }

      // Проверяем соответствие нормативу по площади (СП 5.13130.2009)
      const detectorsByArea = Math.ceil(area / adjustedDetectorCoverage)
      totalDetectors = Math.max(totalDetectors, detectorsByArea)
    } else {
      // Для остальных типов помещений - по площади с учётом высоты потолков
      totalDetectors = Math.ceil(area / adjustedDetectorCoverage)
    }

    // Разделение на типы датчиков по принципам безопасности
    let smokeDetectors, heatDetectors, algorithmType
    switch(buildingType) {
      // Жилые помещения
      case 'residential_apartment': {
        if (useDetailedRooms) {
          // Детальный режим помещений: точное разделение по типам
          // Тепловые датчики в технических помещениях и мусорных камерах
          const techHeatDetectors = techVentilationCount + techHeatingCount + techElectricalCount + techPumpingCount + techTransformerCount + techWaterCount
          const wasteHeatDetectors = wasteRoomCount // мусорные камеры - тепловые из-за возможности самовозгорания

          heatDetectors = techHeatDetectors + wasteHeatDetectors
          smokeDetectors = totalDetectors - heatDetectors
        } else {
          // Стандартный режим: по 1 тепловому на кухню в квартире
          const kitchenHeatDetectors = calculatedApartmentsCount // по 1 тепловому на кухню
          heatDetectors = kitchenHeatDetectors
          smokeDetectors = totalDetectors - heatDetectors
        }
        algorithmType = 'B (двойное срабатывание ≤60с)'
        break
      }

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
    const roomsForCalculation = useDetailedRooms ? calculatedRoomsCount : rooms
    const manualCallPoints = Math.ceil(perimeter / manualCallDistance) + Math.ceil(roomsForCalculation / 4)

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
      totalArea,
      adjustedDetectorCoverage,
      useDetailedRooms,
      calculatedRoomsCount,
      calculatedRoomsArea
    })
  }

  return (
    <div>
      {/* Навигационная панель портала */}
      <header className="portal-header">
        <nav className="portal-nav">
          <a href="#" className="portal-logo">
            Портал АПС
          </a>
          <ul className="portal-menu">
            <li><a href="#" onClick={() => setActiveSection('calculator')}>Калькулятор</a></li>
            <li><a href="#" onClick={() => setActiveSection('history')}>История</a></li>
            <li><a href="#" onClick={() => setActiveSection('settings')}>Настройки</a></li>
            <li><a href="#" onClick={() => setActiveSection('help')}>Справка</a></li>
          </ul>
        </nav>
      </header>

      {/* Основной контейнер портала */}
      <div className="portal-container">
        {activeSection === 'calculator' && (
          <>
            <h1 className="portal-title">Калькулятор оборудования АПС</h1>
            <p style={{textAlign: 'center', color: 'var(--text-white)', opacity: 0.9, marginBottom: '2rem'}}>
              Автоматическая пожарная сигнализация - Расчёт оборудования и кабеля
            </p>

            {/* Карточка параметров объекта */}
            <div className="portal-card floating">
              <h2 className="portal-subtitle">Параметры объекта</h2>

              <div className="portal-grid">
                <div className="portal-grid-item">
                  <label>Площадь надземной части (м²)</label>
                  <input
                    type="number"
                    value={aboveGroundArea}
                    onChange={(e) => setAboveGroundArea(Number(e.target.value))}
                    className="portal-input"
                    placeholder="Жилые, офисные, коммерческие помещения"
                  />
                </div>

                <div className="portal-grid-item">
                  <label>Площадь подземной части (м²)</label>
                  <input
                    type="number"
                    value={undergroundArea}
                    onChange={(e) => setUndergroundArea(Number(e.target.value))}
                    className="portal-input"
                    placeholder="Паркинги, технические помещения"
                  />
                </div>

                <div className="portal-grid-item">
                  <label>Этажи надземной части</label>
                  <input
                    type="number"
                    value={aboveGroundFloors}
                    onChange={(e) => setAboveGroundFloors(Number(e.target.value))}
                    className="portal-input"
                    min="1"
                  />
                </div>

                <div className="portal-grid-item">
                  <label>Этажи подземной части</label>
                  <input
                    type="number"
                    value={undergroundFloors}
                    onChange={(e) => setUndergroundFloors(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                  />
                </div>
              </div>

              <div style={{textAlign: 'center', margin: '1.5rem 0', color: 'var(--text-white)'}}>
                <strong>Общая площадь: {totalArea.toLocaleString()} м² | Всего этажей: {totalFloors}</strong>
              </div>

              {/* Настройки квартир */}
              <div className="portal-grid">
                <div className="portal-grid-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={useDetailedApartments}
                      onChange={(e) => setUseDetailedApartments(e.target.checked)}
                      style={{marginRight: '10px'}}
                    />
                    Детализированный подсчёт по типам квартир
                  </label>
                  {!useDetailedApartments && (
                    <input
                      type="number"
                      value={apartmentsCount}
                      onChange={(e) => setApartmentsCount(Number(e.target.value))}
                      className="portal-input"
                      placeholder="Общее количество квартир"
                      style={{marginTop: '10px'}}
                    />
                  )}
                </div>

                {useDetailedApartments && (
                  <div className="portal-grid-item">
                    <button
                      onClick={() => setShowApartmentsModal(true)}
                      className="portal-button"
                    >
                      Настроить квартиры ({calculatedApartmentsCount} шт.)
                    </button>
                  </div>
                )}
              </div>

              {/* Настройки помещений */}
              <div className="portal-grid">
                <div className="portal-grid-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={useDetailedRooms}
                      onChange={(e) => setUseDetailedRooms(e.target.checked)}
                      style={{marginRight: '10px'}}
                    />
                    Детализированный подсчёт по типам помещений
                  </label>
                  {!useDetailedRooms && (
                    <input
                      type="number"
                      value={rooms}
                      onChange={(e) => setRooms(Number(e.target.value))}
                      className="portal-input"
                      placeholder="Общее количество помещений"
                      style={{marginTop: '10px'}}
                    />
                  )}
                </div>

                {useDetailedRooms && (
                  <div className="portal-grid-item">
                    <button
                      onClick={() => setShowRoomsModal(true)}
                      className="portal-button"
                    >
                      Настроить помещения ({calculatedRoomsCount} шт.)
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Карточка настроек системы */}
            <div className="portal-card">
              <h2 className="portal-subtitle">Настройки системы АПС</h2>

              <div className="portal-grid">
                <div className="portal-grid-item">
                  <label>Высота потолков (м)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="portal-input"
                    step="0.1"
                    min="2.0"
                  />
                </div>

                <div className="portal-grid-item">
                  <label>Тип здания</label>
                  <select
                    value={buildingType}
                    onChange={(e) => setBuildingType(e.target.value)}
                    className="portal-input"
                  >
                    <option value="residential_apartment">Жилой дом (квартиры)</option>
                    <option value="office">Офисное здание</option>
                    <option value="warehouse">Складское помещение</option>
                    <option value="industrial">Производственное здание</option>
                    <option value="commercial">Торговое помещение</option>
                    <option value="parking_underground">Подземная парковка</option>
                  </select>
                </div>

                <div className="portal-grid-item">
                  <label>Покрытие датчика (м²)</label>
                  <input
                    type="number"
                    value={detectorCoverage}
                    onChange={(e) => setDetectorCoverage(Number(e.target.value))}
                    className="portal-input"
                    min="1"
                  />
                </div>

                <div className="portal-grid-item">
                  <label>Расстояние между ИПР (м)</label>
                  <input
                    type="number"
                    value={manualCallDistance}
                    onChange={(e) => setManualCallDistance(Number(e.target.value))}
                    className="portal-input"
                    min="1"
                  />
                </div>

                <div className="portal-grid-item">
                  <label>Радиус оповещателя (м)</label>
                  <input
                    type="number"
                    value={sounderCoverage}
                    onChange={(e) => setSounderCoverage(Number(e.target.value))}
                    className="portal-input"
                    min="1"
                  />
                </div>

                <div className="portal-grid-item">
                  <label>Запас кабеля (%)</label>
                  <input
                    type="number"
                    value={cableReserve}
                    onChange={(e) => setCableReserve(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                    max="50"
                  />
                </div>

                <div className="portal-grid-item">
                  <label>Размер зоны (м²)</label>
                  <input
                    type="number"
                    value={zoneSize}
                    onChange={(e) => setZoneSize(Number(e.target.value))}
                    className="portal-input"
                    min="100"
                  />
                </div>
              </div>

              <div style={{textAlign: 'center', marginTop: '2rem'}}>
                <button
                  onClick={calculateEquipment}
                  className="portal-button pulse"
                  style={{fontSize: '1.1em', padding: '1.2rem 3rem'}}
                >
                  🔥 Рассчитать оборудование
                </button>
              </div>
            </div>

            {/* Результаты расчетов */}
            {results && (
              <div className="portal-card">
                <h2 className="portal-subtitle">Результаты расчёта</h2>

                <div className="portal-grid">
                  {/* Извещатели */}
                  <div className="portal-grid-item portal-glow">
                    <h4 style={{color: 'var(--accent-orange)', marginBottom: '1rem'}}>🔍 Пожарные извещатели</h4>
                    <p><strong>Дымовые:</strong> {results.smokeDetectors} шт.</p>
                    <p><strong>Тепловые:</strong> {results.heatDetectors} шт.</p>
                    <p><strong>Всего:</strong> {results.totalDetectors} шт.</p>
                    <p><strong>Алгоритм:</strong> {results.algorithmType}</p>
                  </div>

                  {/* Управление */}
                  <div className="portal-grid-item portal-glow">
                    <h4 style={{color: 'var(--accent-orange)', marginBottom: '1rem'}}>🖥️ Приборы управления</h4>
                    <p><strong>ППКОП R3-РУБЕЖ-2ОП:</strong> {results.controlPanels} шт.</p>
                    <p><strong>Зон контроля:</strong> {results.zones} шт.</p>
                    <p><strong>Макс. зон на прибор:</strong> {results.maxZonesPerPanel}</p>
                    <p><strong>Релейные модули:</strong> {results.relayModules} шт.</p>
                  </div>

                  {/* Ручные извещатели */}
                  <div className="portal-grid-item portal-glow">
                    <h4 style={{color: 'var(--accent-orange)', marginBottom: '1rem'}}>🚨 Ручные извещатели</h4>
                    <p><strong>ИПР 513-3AM:</strong> {results.manualCallPoints} шт.</p>
                    <p><strong>Алгоритм:</strong> A (одноразовое срабатывание)</p>
                  </div>

                  {/* Оповещение */}
                  <div className="portal-grid-item portal-glow">
                    <h4 style={{color: 'var(--accent-orange)', marginBottom: '1rem'}}>📢 Система оповещения</h4>
                    <p><strong>Звуковые оповещатели:</strong> {results.sounders} шт.</p>
                    <p><strong>Световые оповещатели:</strong> {results.beacons} шт.</p>
                    <p><strong>Тип СОУЭ:</strong> {results.soueType}</p>
                  </div>

                  {/* Питание */}
                  <div className="portal-grid-item portal-glow">
                    <h4 style={{color: 'var(--accent-orange)', marginBottom: '1rem'}}>⚡ Электропитание</h4>
                    <p><strong>ИВЭПР 24/2,5 RS-R3:</strong> {results.powerSupplies} шт.</p>
                    <p><strong>Аккумуляторы 12В 7Ач:</strong> {results.batteries} шт.</p>
                  </div>

                  {/* Монтаж */}
                  <div className="portal-grid-item portal-glow">
                    <h4 style={{color: 'var(--accent-orange)', marginBottom: '1rem'}}>🔧 Монтажные изделия</h4>
                    <p><strong>Монтажные коробки:</strong> {results.boxes} шт.</p>
                  </div>
                </div>

                {/* Кабельная продукция */}
                <div className="portal-card" style={{marginTop: '2rem', background: 'rgba(255, 255, 255, 0.05)'}}>
                  <h3 style={{color: 'var(--accent-red)', marginBottom: '1rem'}}>📡 Кабельная продукция</h3>
                  <div className="portal-grid">
                    <div className="portal-grid-item">
                      <p><strong>КСРЭПнг(А)-FRHF 1×2×0.8 (АЛС):</strong> {results.loopCable} м</p>
                      <small style={{opacity: 0.8}}>Максимальная длина АЛС: {results.alsLength} м</small>
                    </div>
                    <div className="portal-grid-item">
                      <p><strong>КПРПГнг(А)-FRHF 3×1.5 (питание):</strong> {results.powerCable} м</p>
                    </div>
                    <div className="portal-grid-item">
                      <p><strong>КПСнг(А)-FRHF 2×0.75 (оповещение):</strong> {results.sounderCable} м</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Другие секции портала */}
        {activeSection === 'history' && (
          <div className="portal-card">
            <h2 className="portal-subtitle">История расчетов</h2>
            <p style={{color: 'var(--text-white)', textAlign: 'center', padding: '2rem'}}>
              История расчетов будет доступна в следующих версиях портала.
            </p>
          </div>
        )}

        {activeSection === 'settings' && (
          <div className="portal-card">
            <h2 className="portal-subtitle">Настройки портала</h2>
            <p style={{color: 'var(--text-white)', textAlign: 'center', padding: '2rem'}}>
              Настройки портала будут доступны в следующих версиях.
            </p>
          </div>
        )}

        {activeSection === 'help' && (
          <div className="portal-card">
            <h2 className="portal-subtitle">Справочная информация</h2>
            <div style={{color: 'var(--text-white)', padding: '1rem'}}>
              <h4>Нормативные документы:</h4>
              <ul>
                <li>СП 5.13130.2009 "Системы противопожарной защиты"</li>
                <li>ГОСТ Р 53325-2012 "Техника пожарная"</li>
                <li>НПБ 88-2001* "Установки пожаротушения и сигнализации"</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Модальное окно настройки квартир */}
      {showApartmentsModal && (
        <div className={`portal-modal ${showApartmentsModal ? 'active' : ''}`}>
          <div className="portal-modal-content">
            <h3 style={{color: 'var(--text-white)', marginBottom: '1.5rem'}}>Настройка количества квартир по комнатности</h3>

            <div className="portal-grid">
              <div className="portal-grid-item">
                <label>1-комнатные квартиры</label>
                <input
                  type="number"
                  value={apartment1Room}
                  onChange={(e) => setApartment1Room(Number(e.target.value))}
                  className="portal-input"
                  min="0"
                />
              </div>
              <div className="portal-grid-item">
                <label>2-комнатные квартиры</label>
                <input
                  type="number"
                  value={apartment2Room}
                  onChange={(e) => setApartment2Room(Number(e.target.value))}
                  className="portal-input"
                  min="0"
                />
              </div>
              <div className="portal-grid-item">
                <label>3-комнатные квартиры</label>
                <input
                  type="number"
                  value={apartment3Room}
                  onChange={(e) => setApartment3Room(Number(e.target.value))}
                  className="portal-input"
                  min="0"
                />
              </div>
              <div className="portal-grid-item">
                <label>4-комнатные квартиры</label>
                <input
                  type="number"
                  value={apartment4Room}
                  onChange={(e) => setApartment4Room(Number(e.target.value))}
                  className="portal-input"
                  min="0"
                />
              </div>
              <div className="portal-grid-item">
                <label>5-комнатные квартиры</label>
                <input
                  type="number"
                  value={apartment5Room}
                  onChange={(e) => setApartment5Room(Number(e.target.value))}
                  className="portal-input"
                  min="0"
                />
              </div>
              <div className="portal-grid-item">
                <label>6-комнатные квартиры</label>
                <input
                  type="number"
                  value={apartment6Room}
                  onChange={(e) => setApartment6Room(Number(e.target.value))}
                  className="portal-input"
                  min="0"
                />
              </div>
              <div className="portal-grid-item">
                <label>7-комнатные квартиры</label>
                <input
                  type="number"
                  value={apartment7Room}
                  onChange={(e) => setApartment7Room(Number(e.target.value))}
                  className="portal-input"
                  min="0"
                />
              </div>
            </div>

            <div style={{textAlign: 'center', marginTop: '2rem', color: 'var(--text-white)'}}>
              <p><strong>Общее количество квартир: {calculatedApartmentsCount}</strong></p>
              {calculatedApartmentsCount > 0 && (
                <p>Средняя комнатность: {averageRoomsPerApartment.toFixed(1)} комнат</p>
              )}
            </div>

            <div style={{textAlign: 'center', marginTop: '2rem'}}>
              <button
                onClick={() => setShowApartmentsModal(false)}
                className="portal-button"
              >
                ✅ Применить настройки
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно настройки помещений */}
      {showRoomsModal && (
        <div className={`portal-modal ${showRoomsModal ? 'active' : ''}`}>
          <div className="portal-modal-content">
            <h3 style={{color: 'var(--text-white)', marginBottom: '1.5rem'}}>Детализированный подсчёт помещений</h3>

            <div style={{maxHeight: '60vh', overflowY: 'auto'}}>
              {/* Общие помещения */}
              <h4 style={{color: 'var(--accent-orange)', marginTop: '1.5rem'}}>Общие помещения</h4>
              <div className="portal-grid">
                <div className="portal-grid-item">
                  <label>Лестничные клетки на 1 этаже</label>
                  <input
                    type="number"
                    value={stairwellCount}
                    onChange={(e) => setStairwellCount(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                  />
                  <label style={{marginTop: '0.5rem'}}>Площадь 1 лестничной клетки (м²)</label>
                  <input
                    type="number"
                    value={stairwellArea}
                    onChange={(e) => setStairwellArea(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div className="portal-grid-item">
                  <label>Лифтовые холлы на 1 этаже</label>
                  <input
                    type="number"
                    value={elevatorHallCount}
                    onChange={(e) => setElevatorHallCount(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                  />
                  <label style={{marginTop: '0.5rem'}}>Площадь 1 лифтового холла (м²)</label>
                  <input
                    type="number"
                    value={elevatorHallArea}
                    onChange={(e) => setElevatorHallArea(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              {/* Технические помещения */}
              <h4 style={{color: 'var(--accent-orange)', marginTop: '1.5rem'}}>Технические помещения</h4>
              <div className="portal-grid">
                <div className="portal-grid-item">
                  <label>Венткамеры</label>
                  <input
                    type="number"
                    value={techVentilationCount}
                    onChange={(e) => setTechVentilationCount(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                  />
                  <label style={{marginTop: '0.5rem'}}>Площадь (м²)</label>
                  <input
                    type="number"
                    value={techVentilationArea}
                    onChange={(e) => setTechVentilationArea(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div className="portal-grid-item">
                  <label>Электрощитовые</label>
                  <input
                    type="number"
                    value={techElectricalCount}
                    onChange={(e) => setTechElectricalCount(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                  />
                  <label style={{marginTop: '0.5rem'}}>Площадь (м²)</label>
                  <input
                    type="number"
                    value={techElectricalArea}
                    onChange={(e) => setTechElectricalArea(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div className="portal-grid-item">
                  <label>Теплопункты</label>
                  <input
                    type="number"
                    value={techHeatingCount}
                    onChange={(e) => setTechHeatingCount(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                  />
                  <label style={{marginTop: '0.5rem'}}>Площадь (м²)</label>
                  <input
                    type="number"
                    value={techHeatingArea}
                    onChange={(e) => setTechHeatingArea(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div className="portal-grid-item">
                  <label>Насосные станции</label>
                  <input
                    type="number"
                    value={techPumpingCount}
                    onChange={(e) => setTechPumpingCount(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                  />
                  <label style={{marginTop: '0.5rem'}}>Площадь (м²)</label>
                  <input
                    type="number"
                    value={techPumpingArea}
                    onChange={(e) => setTechPumpingArea(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div className="portal-grid-item">
                  <label>Трансформаторные</label>
                  <input
                    type="number"
                    value={techTransformerCount}
                    onChange={(e) => setTechTransformerCount(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                  />
                  <label style={{marginTop: '0.5rem'}}>Площадь (м²)</label>
                  <input
                    type="number"
                    value={techTransformerArea}
                    onChange={(e) => setTechTransformerArea(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div className="portal-grid-item">
                  <label>Телекоммуникационные</label>
                  <input
                    type="number"
                    value={techTelecomCount}
                    onChange={(e) => setTechTelecomCount(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                  />
                  <label style={{marginTop: '0.5rem'}}>Площадь (м²)</label>
                  <input
                    type="number"
                    value={techTelecomArea}
                    onChange={(e) => setTechTelecomArea(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div className="portal-grid-item">
                  <label>Водопроводные узлы</label>
                  <input
                    type="number"
                    value={techWaterCount}
                    onChange={(e) => setTechWaterCount(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                  />
                  <label style={{marginTop: '0.5rem'}}>Площадь (м²)</label>
                  <input
                    type="number"
                    value={techWaterArea}
                    onChange={(e) => setTechWaterArea(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div className="portal-grid-item">
                  <label>Технические этажи</label>
                  <input
                    type="number"
                    value={techFloorCount}
                    onChange={(e) => setTechFloorCount(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                  />
                  <label style={{marginTop: '0.5rem'}}>Площадь (м²)</label>
                  <input
                    type="number"
                    value={techFloorArea}
                    onChange={(e) => setTechFloorArea(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              {/* Хранение и парковка */}
              <h4 style={{color: 'var(--accent-orange)', marginTop: '1.5rem'}}>Хранение и парковка</h4>
              <div className="portal-grid">
                <div className="portal-grid-item">
                  <label>Кладовые</label>
                  <input
                    type="number"
                    value={storageCount}
                    onChange={(e) => setStorageCount(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                  />
                  <label style={{marginTop: '0.5rem'}}>Площадь (м²)</label>
                  <input
                    type="number"
                    value={storageArea}
                    onChange={(e) => setStorageArea(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div className="portal-grid-item">
                  <label>Мусорные камеры</label>
                  <input
                    type="number"
                    value={wasteRoomCount}
                    onChange={(e) => setWasteRoomCount(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                  />
                  <label style={{marginTop: '0.5rem'}}>Площадь (м²)</label>
                  <input
                    type="number"
                    value={wasteRoomArea}
                    onChange={(e) => setWasteRoomArea(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div className="portal-grid-item">
                  <label>Подземные парковки</label>
                  <input
                    type="number"
                    value={parkingUndergroundCount}
                    onChange={(e) => setParkingUndergroundCount(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                  />
                  <label style={{marginTop: '0.5rem'}}>Площадь (м²)</label>
                  <input
                    type="number"
                    value={parkingUndergroundArea}
                    onChange={(e) => setParkingUndergroundArea(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              {/* Общие коридоры */}
              <h4 style={{color: 'var(--accent-orange)', marginTop: '1.5rem'}}>Общие коридоры</h4>
              <div className="portal-grid">
                <div className="portal-grid-item">
                  <label>Коридоры на 1 этаже</label>
                  <input
                    type="number"
                    value={commonCorridorCount}
                    onChange={(e) => setCommonCorridorCount(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                  />
                  <label style={{marginTop: '0.5rem'}}>Площадь 1 коридора (м²)</label>
                  <input
                    type="number"
                    value={commonCorridorArea}
                    onChange={(e) => setCommonCorridorArea(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              {/* Охрана и эксплуатация */}
              <h4 style={{color: 'var(--accent-orange)', marginTop: '1.5rem'}}>Охрана и эксплуатация</h4>
              <div className="portal-grid">
                <div className="portal-grid-item">
                  <label>Посты охраны</label>
                  <input
                    type="number"
                    value={securityPostCount}
                    onChange={(e) => setSecurityPostCount(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                  />
                  <label style={{marginTop: '0.5rem'}}>Площадь (м²)</label>
                  <input
                    type="number"
                    value={securityPostArea}
                    onChange={(e) => setSecurityPostArea(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div className="portal-grid-item">
                  <label>Комнаты персонала</label>
                  <input
                    type="number"
                    value={staffRoomCount}
                    onChange={(e) => setStaffRoomCount(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                  />
                  <label style={{marginTop: '0.5rem'}}>Площадь (м²)</label>
                  <input
                    type="number"
                    value={staffRoomArea}
                    onChange={(e) => setStaffRoomArea(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
            </div>

            <div style={{textAlign: 'center', marginTop: '2rem', color: 'var(--text-white)'}}>
              <p><strong>Общее количество помещений: {calculatedRoomsCount}</strong></p>
              {calculatedRoomsArea > 0 && (
                <p>Общая площадь помещений: {calculatedRoomsArea.toFixed(1)} м²</p>
              )}
            </div>

            <div style={{textAlign: 'center', marginTop: '2rem'}}>
              <button
                onClick={() => setShowRoomsModal(false)}
                className="portal-button"
              >
                ✅ Применить настройки
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Футер портала */}
      <footer style={{
        background: 'rgba(26, 54, 93, 0.8)',
        color: 'var(--text-white)',
        textAlign: 'center',
        padding: '2rem',
        marginTop: '3rem',
        borderTop: '1px solid rgba(255, 107, 53, 0.2)'
      }}>
        <p>&copy; 2024 Портал АПС. Система расчета пожарной сигнализации</p>
        <p style={{opacity: 0.7, fontSize: '0.9em'}}>
          Расчеты выполняются согласно СП 5.13130.2009 и ГОСТ Р 53325-2012
        </p>
      </footer>
    </div>
  )
}

export default App