import { useState } from 'react'

function App() {
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
  const [rooms, setRooms] = useState(25)
  const [height, setHeight] = useState(3.0)
  const [buildingType, setBuildingType] = useState('residential_apartment')
  const [detectorCoverage, setDetectorCoverage] = useState(25)
  const [manualCallDistance, setManualCallDistance] = useState(50)
  const [sounderCoverage, setSounderCoverage] = useState(15)
  const [cableReserve, setCableReserve] = useState(15)
  const [zoneSize, setZoneSize] = useState(500)
  const [results, setResults] = useState(null)

  // Состояния для управления модальными окнами
  const [showApartmentsModal, setShowApartmentsModal] = useState(false)
  const [showRoomsModal, setShowRoomsModal] = useState(false)

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

  const styles = {
    body: {
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      width: '100vw',
      overflowX: 'hidden'
    },
    container: {
      width: '100vw',
      maxWidth: 'none',
      margin: 0,
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: 0,
      boxShadow: 'none',
      overflow: 'hidden',
      minHeight: '100vh'
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
      gap: '20px',
      padding: '10px 0'
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
      padding: '20px',
      marginTop: '5px'
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
    },

    // Стили для модальных окон
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    },

    modalContent: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '30px',
      maxWidth: '800px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
      position: 'relative'
    },

    modalTitle: {
      margin: '0 0 8px 0',
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center'
    },

    modalSubtitle: {
      margin: '0 0 25px 0',
      fontSize: '16px',
      color: '#666',
      textAlign: 'center'
    },

    modalGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '25px'
    },

    apartmentInput: {
      display: 'flex',
      flexDirection: 'column'
    },

    modalLabel: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#333',
      marginBottom: '8px'
    },

    modalInput: {
      padding: '12px',
      border: '2px solid #e9ecef',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'border-color 0.3s',
      outline: 'none',
      minWidth: '0'
    },

    modalSummary: {
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '25px'
    },

    summaryItem: {
      fontSize: '16px',
      marginBottom: '8px',
      color: '#333'
    },

    modalButtons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '15px'
    },

    modalCloseButton: {
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '12px 30px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s'
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
              <label style={styles.label}>
                <input
                  type="checkbox"
                  checked={useDetailedApartments}
                  onChange={(e) => setUseDetailedApartments(e.target.checked)}
                  style={{marginRight: '10px'}}
                />
                Детальный выбор квартир по комнатности
              </label>
            </div>

            {!useDetailedApartments ? (
              <div style={styles.inputGroup}>
                <label style={styles.label}>Общее количество квартир</label>
                <input
                  type="number"
                  value={apartmentsCount}
                  onChange={(e) => setApartmentsCount(Number(e.target.value))}
                  style={styles.input}
                  placeholder="Общее количество квартир в здании"
                />
              </div>
            ) : (
              <>
                <div style={styles.inputGroup}>
                  <button
                    onClick={() => setShowApartmentsModal(true)}
                    style={{
                      ...styles.button,
                      backgroundColor: '#007bff',
                      color: 'white',
                      padding: '12px 20px',
                      fontSize: '16px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      width: '100%',
                      transition: 'background-color 0.3s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                  >
                    🏠 Настроить квартиры по комнатности
                  </button>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Общее количество квартир (рассчитано)</label>
                  <input
                    type="number"
                    value={calculatedApartmentsCount}
                    readOnly
                    style={{...styles.input, backgroundColor: '#e9ecef', cursor: 'not-allowed'}}
                    title="Рассчитывается автоматически как сумма всех квартир"
                  />
                </div>

                {calculatedApartmentsCount > 0 && (
                  <div style={{
                    padding: '12px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef',
                    marginTop: '10px'
                  }}>
                    <div style={{fontSize: '14px', color: '#6c757d', marginBottom: '8px'}}>
                      <strong>Текущий состав квартир:</strong>
                    </div>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '8px', fontSize: '13px'}}>
                      {apartment1Room > 0 && <span>1к: {apartment1Room} шт.</span>}
                      {apartment2Room > 0 && <span>2к: {apartment2Room} шт.</span>}
                      {apartment3Room > 0 && <span>3к: {apartment3Room} шт.</span>}
                      {apartment4Room > 0 && <span>4к: {apartment4Room} шт.</span>}
                      {apartment5Room > 0 && <span>5к: {apartment5Room} шт.</span>}
                      {apartment6Room > 0 && <span>6к: {apartment6Room} шт.</span>}
                      {apartment7Room > 0 && <span>7к: {apartment7Room} шт.</span>}
                    </div>
                  </div>
                )}
              </>
            )}

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <input
                  type="checkbox"
                  checked={useDetailedRooms}
                  onChange={(e) => setUseDetailedRooms(e.target.checked)}
                  style={{marginRight: '10px'}}
                />
                Детальный выбор помещений по типам
              </label>
            </div>

            {useDetailedRooms ? (
              <>

                <h3 style={{...styles.sectionTitle, fontSize: '1.2em', marginBottom: '15px', borderBottom: '2px solid #27ae60', marginTop: '20px'}}>
                  <span>🚪</span>
                  Общие помещения
                </h3>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Количество лестничных клеток на 1 этаже</label>
                    <input
                      type="number"
                      value={stairwellCount}
                      onChange={(e) => setStairwellCount(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                    />
                    {stairwellCount > 0 && (
                      <small style={{display: 'block', color: '#666', fontSize: '0.8em', marginTop: '4px'}}>
                        Общее количество лестничных клеток: {stairwellCount} × {totalFloors} этажей = {(stairwellCount * totalFloors)} шт.
                      </small>
                    )}
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Площадь 1 лестничной клетки (м²)</label>
                    <input
                      type="number"
                      value={stairwellArea}
                      onChange={(e) => setStairwellArea(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                      step="0.1"
                    />
                    {stairwellCount > 0 && stairwellArea > 0 && (
                      <small style={{display: 'block', color: '#666', fontSize: '0.8em', marginTop: '4px'}}>
                        Общая площадь лестничных клеток: {stairwellArea} × {(stairwellCount * totalFloors)} = {(stairwellCount * totalFloors * stairwellArea).toFixed(1)} м²
                      </small>
                    )}
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Количество лифтовых холлов на 1 этаже</label>
                    <input
                      type="number"
                      value={elevatorHallCount}
                      onChange={(e) => setElevatorHallCount(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                    />
                    {elevatorHallCount > 0 && (
                      <small style={{display: 'block', color: '#666', fontSize: '0.8em', marginTop: '4px'}}>
                        Общее количество лифтовых холлов: {elevatorHallCount} × {totalFloors} этажей = {(elevatorHallCount * totalFloors)} шт.
                      </small>
                    )}
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Площадь 1 лифтового холла (м²)</label>
                    <input
                      type="number"
                      value={elevatorHallArea}
                      onChange={(e) => setElevatorHallArea(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                      step="0.1"
                    />
                    {elevatorHallCount > 0 && elevatorHallArea > 0 && (
                      <small style={{display: 'block', color: '#666', fontSize: '0.8em', marginTop: '4px'}}>
                        Общая площадь лифтовых холлов: {elevatorHallArea} × {(elevatorHallCount * totalFloors)} = {(elevatorHallCount * totalFloors * elevatorHallArea).toFixed(1)} м²
                      </small>
                    )}
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Количество общих коридоров на 1 этаже</label>
                    <input
                      type="number"
                      value={commonCorridorCount}
                      onChange={(e) => setCommonCorridorCount(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                    />
                    {commonCorridorCount > 0 && (
                      <small style={{display: 'block', color: '#666', fontSize: '0.8em', marginTop: '4px'}}>
                        Общее количество общих коридоров: {commonCorridorCount} × {totalFloors} этажей = {(commonCorridorCount * totalFloors)} шт.
                      </small>
                    )}
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Площадь 1 общего коридора (м²)</label>
                    <input
                      type="number"
                      value={commonCorridorArea}
                      onChange={(e) => setCommonCorridorArea(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                      step="0.1"
                    />
                    {commonCorridorCount > 0 && commonCorridorArea > 0 && (
                      <small style={{display: 'block', color: '#666', fontSize: '0.8em', marginTop: '4px'}}>
                        Общая площадь общих коридоров: {commonCorridorArea} × {(commonCorridorCount * totalFloors)} = {(commonCorridorCount * totalFloors * commonCorridorArea).toFixed(1)} м²
                      </small>
                    )}
                  </div>
                </div>

                <h3 style={{...styles.sectionTitle, fontSize: '1.2em', marginBottom: '15px', borderBottom: '2px solid #f39c12', marginTop: '20px'}}>
                  <span>⚙️</span>
                  Технические помещения
                </h3>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Количество венткамер</label>
                    <input
                      type="number"
                      value={techVentilationCount}
                      onChange={(e) => setTechVentilationCount(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Площадь 1 венткамеры (м²)</label>
                    <input
                      type="number"
                      value={techVentilationArea}
                      onChange={(e) => setTechVentilationArea(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                      step="0.1"
                    />
                    {techVentilationCount > 0 && techVentilationArea > 0 && (
                      <small style={{display: 'block', color: '#666', fontSize: '0.8em', marginTop: '4px'}}>
                        Общая площадь венткамер: {(techVentilationCount * techVentilationArea).toFixed(1)} м²
                      </small>
                    )}
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Количество электрощитовых</label>
                    <input
                      type="number"
                      value={techElectricalCount}
                      onChange={(e) => setTechElectricalCount(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Площадь 1 электрощитовой (м²)</label>
                    <input
                      type="number"
                      value={techElectricalArea}
                      onChange={(e) => setTechElectricalArea(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                      step="0.1"
                    />
                    {techElectricalCount > 0 && techElectricalArea > 0 && (
                      <small style={{display: 'block', color: '#666', fontSize: '0.8em', marginTop: '4px'}}>
                        Общая площадь электрощитовых: {(techElectricalCount * techElectricalArea).toFixed(1)} м²
                      </small>
                    )}
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Количество тепловых пунктов (ИТП)</label>
                    <input
                      type="number"
                      value={techHeatingCount}
                      onChange={(e) => setTechHeatingCount(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Площадь 1 теплового пункта (м²)</label>
                    <input
                      type="number"
                      value={techHeatingArea}
                      onChange={(e) => setTechHeatingArea(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                      step="0.1"
                    />
                    {techHeatingCount > 0 && techHeatingArea > 0 && (
                      <small style={{display: 'block', color: '#666', fontSize: '0.8em', marginTop: '4px'}}>
                        Общая площадь тепловых пунктов: {(techHeatingCount * techHeatingArea).toFixed(1)} м²
                      </small>
                    )}
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Количество насосных станций</label>
                    <input
                      type="number"
                      value={techPumpingCount}
                      onChange={(e) => setTechPumpingCount(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Площадь 1 насосной станции (м²)</label>
                    <input
                      type="number"
                      value={techPumpingArea}
                      onChange={(e) => setTechPumpingArea(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                      step="0.1"
                    />
                    {techPumpingCount > 0 && techPumpingArea > 0 && (
                      <small style={{display: 'block', color: '#666', fontSize: '0.8em', marginTop: '4px'}}>
                        Общая площадь насосных станций: {(techPumpingCount * techPumpingArea).toFixed(1)} м²
                      </small>
                    )}
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Количество трансформаторных подстанций</label>
                    <input
                      type="number"
                      value={techTransformerCount}
                      onChange={(e) => setTechTransformerCount(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Площадь 1 трансформаторной подстанции (м²)</label>
                    <input
                      type="number"
                      value={techTransformerArea}
                      onChange={(e) => setTechTransformerArea(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                      step="0.1"
                    />
                    {techTransformerCount > 0 && techTransformerArea > 0 && (
                      <small style={{display: 'block', color: '#666', fontSize: '0.8em', marginTop: '4px'}}>
                        Общая площадь трансформаторных подстанций: {(techTransformerCount * techTransformerArea).toFixed(1)} м²
                      </small>
                    )}
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Количество слаботочных систем (СС)</label>
                    <input
                      type="number"
                      value={techTelecomCount}
                      onChange={(e) => setTechTelecomCount(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Площадь 1 помещения слаботочных систем (м²)</label>
                    <input
                      type="number"
                      value={techTelecomArea}
                      onChange={(e) => setTechTelecomArea(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                      step="0.1"
                    />
                    {techTelecomCount > 0 && techTelecomArea > 0 && (
                      <small style={{display: 'block', color: '#666', fontSize: '0.8em', marginTop: '4px'}}>
                        Общая площадь слаботочных систем: {(techTelecomCount * techTelecomArea).toFixed(1)} м²
                      </small>
                    )}
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Количество водомерных узлов</label>
                    <input
                      type="number"
                      value={techWaterCount}
                      onChange={(e) => setTechWaterCount(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Площадь 1 водомерного узла (м²)</label>
                    <input
                      type="number"
                      value={techWaterArea}
                      onChange={(e) => setTechWaterArea(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                      step="0.1"
                    />
                    {techWaterCount > 0 && techWaterArea > 0 && (
                      <small style={{display: 'block', color: '#666', fontSize: '0.8em', marginTop: '4px'}}>
                        Общая площадь водомерных узлов: {(techWaterCount * techWaterArea).toFixed(1)} м²
                      </small>
                    )}
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Количество технических этажей/пространств</label>
                    <input
                      type="number"
                      value={techFloorCount}
                      onChange={(e) => setTechFloorCount(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Площадь 1 технического этажа/пространства (м²)</label>
                    <input
                      type="number"
                      value={techFloorArea}
                      onChange={(e) => setTechFloorArea(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                      step="0.1"
                    />
                    {techFloorCount > 0 && techFloorArea > 0 && (
                      <small style={{display: 'block', color: '#666', fontSize: '0.8em', marginTop: '4px'}}>
                        Общая площадь технических этажей/пространств: {(techFloorCount * techFloorArea).toFixed(1)} м²
                      </small>
                    )}
                  </div>
                </div>

                <h3 style={{...styles.sectionTitle, fontSize: '1.2em', marginBottom: '15px', borderBottom: '2px solid #9b59b6', marginTop: '20px'}}>
                  <span>🚗</span>
                  Хранение и парковка
                </h3>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Количество индивидуальных кладовых</label>
                    <input
                      type="number"
                      value={storageCount}
                      onChange={(e) => setStorageCount(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Площадь 1 кладовой (м²)</label>
                    <input
                      type="number"
                      value={storageArea}
                      onChange={(e) => setStorageArea(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                      step="0.1"
                    />
                    {storageCount > 0 && storageArea > 0 && (
                      <small style={{display: 'block', color: '#666', fontSize: '0.8em', marginTop: '4px'}}>
                        Общая площадь кладовых: {(storageCount * storageArea).toFixed(1)} м²
                      </small>
                    )}
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Количество мусоросборных камер</label>
                    <input
                      type="number"
                      value={wasteRoomCount}
                      onChange={(e) => setWasteRoomCount(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Площадь 1 мусоросборной камеры (м²)</label>
                    <input
                      type="number"
                      value={wasteRoomArea}
                      onChange={(e) => setWasteRoomArea(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                      step="0.1"
                    />
                    {wasteRoomCount > 0 && wasteRoomArea > 0 && (
                      <small style={{display: 'block', color: '#666', fontSize: '0.8em', marginTop: '4px'}}>
                        Общая площадь мусоросборных камер: {(wasteRoomCount * wasteRoomArea).toFixed(1)} м²
                      </small>
                    )}
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Количество парковочных мест (подземный паркинг)</label>
                    <input
                      type="number"
                      value={parkingUndergroundCount}
                      onChange={(e) => setParkingUndergroundCount(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Площадь 1 парковочного места (м²)</label>
                    <input
                      type="number"
                      value={parkingUndergroundArea}
                      onChange={(e) => setParkingUndergroundArea(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                      step="0.1"
                    />
                    {parkingUndergroundCount > 0 && parkingUndergroundArea > 0 && (
                      <small style={{display: 'block', color: '#666', fontSize: '0.8em', marginTop: '4px'}}>
                        Общая площадь подземного паркинга: {(parkingUndergroundCount * parkingUndergroundArea).toFixed(1)} м²
                      </small>
                    )}
                  </div>
                </div>

                <h3 style={{...styles.sectionTitle, fontSize: '1.2em', marginBottom: '15px', borderBottom: '2px solid #e67e22', marginTop: '20px'}}>
                  <span>🛡️</span>
                  Охрана и эксплуатация
                </h3>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Количество постов охраны</label>
                    <input
                      type="number"
                      value={securityPostCount}
                      onChange={(e) => setSecurityPostCount(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Площадь 1 поста охраны (м²)</label>
                    <input
                      type="number"
                      value={securityPostArea}
                      onChange={(e) => setSecurityPostArea(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                      step="0.1"
                    />
                    {securityPostCount > 0 && securityPostArea > 0 && (
                      <small style={{display: 'block', color: '#666', fontSize: '0.8em', marginTop: '4px'}}>
                        Общая площадь постов охраны: {(securityPostCount * securityPostArea).toFixed(1)} м²
                      </small>
                    )}
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Количество комнат отдыха персонала</label>
                    <input
                      type="number"
                      value={staffRoomCount}
                      onChange={(e) => setStaffRoomCount(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Площадь 1 комнаты отдыха персонала (м²)</label>
                    <input
                      type="number"
                      value={staffRoomArea}
                      onChange={(e) => setStaffRoomArea(Number(e.target.value))}
                      style={styles.input}
                      min="0"
                      step="0.1"
                    />
                    {staffRoomCount > 0 && staffRoomArea > 0 && (
                      <small style={{display: 'block', color: '#666', fontSize: '0.8em', marginTop: '4px'}}>
                        Общая площадь комнат отдыха персонала: {(staffRoomCount * staffRoomArea).toFixed(1)} м²
                      </small>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div style={styles.inputGroup}>
                <label style={styles.label}>Количество помещений</label>
                <input
                  type="number"
                  value={rooms}
                  onChange={(e) => setRooms(Number(e.target.value))}
                  style={styles.input}
                />
              </div>
            )}

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
              <label style={styles.label}>
                Площадь покрытия 1 датчика (м²)
                <small style={{display: 'block', fontWeight: 'normal', color: '#666', fontSize: '0.8em', marginTop: '4px'}}>
                  Базовая площадь для расчета. Автоматически корректируется по СП 5.13130.2009
                </small>
              </label>
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
                    <span>Общее количество квартир:</span>
                    <span style={styles.resultValue}>{calculatedApartmentsCount} шт.</span>
                  </div>
                  {useDetailedApartments ? (
                    <>
                      {apartment1Room > 0 && <div style={styles.resultItem}>
                        <span>1-комнатные квартиры:</span>
                        <span style={styles.resultValue}>{apartment1Room} шт. ({apartment1Room} комнат)</span>
                      </div>}
                      {apartment2Room > 0 && <div style={styles.resultItem}>
                        <span>2-комнатные квартиры:</span>
                        <span style={styles.resultValue}>{apartment2Room} шт. ({apartment2Room * 2} комнат)</span>
                      </div>}
                      {apartment3Room > 0 && <div style={styles.resultItem}>
                        <span>3-комнатные квартиры:</span>
                        <span style={styles.resultValue}>{apartment3Room} шт. ({apartment3Room * 3} комнат)</span>
                      </div>}
                      {apartment4Room > 0 && <div style={styles.resultItem}>
                        <span>4-комнатные квартиры:</span>
                        <span style={styles.resultValue}>{apartment4Room} шт. ({apartment4Room * 4} комнат)</span>
                      </div>}
                      {apartment5Room > 0 && <div style={styles.resultItem}>
                        <span>5-комнатные квартиры:</span>
                        <span style={styles.resultValue}>{apartment5Room} шт. ({apartment5Room * 5} комнат)</span>
                      </div>}
                      {apartment6Room > 0 && <div style={styles.resultItem}>
                        <span>6-комнатные квартиры:</span>
                        <span style={styles.resultValue}>{apartment6Room} шт. ({apartment6Room * 6} комнат)</span>
                      </div>}
                      {apartment7Room > 0 && <div style={styles.resultItem}>
                        <span>7-комнатные квартиры:</span>
                        <span style={styles.resultValue}>{apartment7Room} шт. ({apartment7Room * 7} комнат)</span>
                      </div>}
                      <div style={styles.resultItem}>
                        <span>Общее количество комнат:</span>
                        <span style={styles.resultValue}>{apartment1Room * 1 + apartment2Room * 2 + apartment3Room * 3 + apartment4Room * 4 + apartment5Room * 5 + apartment6Room * 6 + apartment7Room * 7} шт.</span>
                      </div>
                      <div style={styles.resultItem}>
                        <span>Средняя комнатность:</span>
                        <span style={styles.resultValue}>{averageRoomsPerApartment.toFixed(1)} комнат/квартира</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={styles.resultItem}>
                        <span>Средняя комнатность квартир:</span>
                        <span style={styles.resultValue}>{averageRoomsPerApartment}-комнатные</span>
                      </div>
                      <div style={styles.resultItem}>
                        <span>Общее количество комнат:</span>
                        <span style={styles.resultValue}>{Math.ceil(calculatedApartmentsCount * averageRoomsPerApartment)} шт.</span>
                      </div>
                    </>
                  )}
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
                  {useDetailedRooms && (
                    <>
                      <div style={styles.resultItem}>
                        <span>Общее количество помещений (детально):</span>
                        <span style={styles.resultValue}>{results.calculatedRoomsCount} шт.</span>
                      </div>
                      {results.calculatedRoomsArea > 0 && (
                        <div style={styles.resultItem}>
                          <span>Общая площадь помещений (детально):</span>
                          <span style={styles.resultValue}>{results.calculatedRoomsArea.toFixed(1)} м²</span>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {useDetailedRooms && (
                  <div style={styles.resultCard}>
                    <h3 style={styles.resultCardTitle}>🏠 Детализация по типам помещений</h3>

                    {(stairwellCount > 0 || elevatorHallCount > 0 || commonCorridorCount > 0) && (
                      <div style={{marginBottom: '15px'}}>
                        <strong style={{color: '#27ae60', fontSize: '1.1em'}}>Общие помещения:</strong>
                        {stairwellCount > 0 && <div style={styles.resultItem}>
                          <span>Лестничные клетки:</span>
                          <span style={styles.resultValue}>{stairwellCount * totalFloors} шт. ({stairwellArea > 0 ? `${stairwellArea}м² × ${stairwellCount} × ${totalFloors}эт = ${(stairwellCount * totalFloors * stairwellArea).toFixed(1)}м²` : 'площадь не указана'})</span>
                        </div>}
                        {elevatorHallCount > 0 && <div style={styles.resultItem}>
                          <span>Лифтовые холлы:</span>
                          <span style={styles.resultValue}>{elevatorHallCount * totalFloors} шт. ({elevatorHallArea > 0 ? `${elevatorHallArea}м² × ${elevatorHallCount} × ${totalFloors}эт = ${(elevatorHallCount * totalFloors * elevatorHallArea).toFixed(1)}м²` : 'площадь не указана'})</span>
                        </div>}
                        {commonCorridorCount > 0 && <div style={styles.resultItem}>
                          <span>Общие коридоры:</span>
                          <span style={styles.resultValue}>{commonCorridorCount * totalFloors} шт. ({commonCorridorArea > 0 ? `${commonCorridorArea}м² × ${commonCorridorCount} × ${totalFloors}эт = ${(commonCorridorCount * totalFloors * commonCorridorArea).toFixed(1)}м²` : 'площадь не указана'})</span>
                        </div>}
                      </div>
                    )}

                    {(techVentilationCount > 0 || techElectricalCount > 0 || techHeatingCount > 0 || techPumpingCount > 0 || techTransformerCount > 0 || techTelecomCount > 0 || techWaterCount > 0 || techFloorCount > 0) && (
                      <div style={{marginBottom: '15px'}}>
                        <strong style={{color: '#f39c12', fontSize: '1.1em'}}>Технические помещения:</strong>
                        {techVentilationCount > 0 && <div style={styles.resultItem}>
                          <span>Венткамеры (тепловые датчики):</span>
                          <span style={styles.resultValue}>{techVentilationCount} шт. ({techVentilationArea > 0 ? `${techVentilationArea}м² × ${techVentilationCount} = ${(techVentilationCount * techVentilationArea).toFixed(1)}м²` : 'площадь не указана'})</span>
                        </div>}
                        {techElectricalCount > 0 && <div style={styles.resultItem}>
                          <span>Электрощитовые (тепловые датчики):</span>
                          <span style={styles.resultValue}>{techElectricalCount} шт. ({techElectricalArea > 0 ? `${techElectricalArea}м² × ${techElectricalCount} = ${(techElectricalCount * techElectricalArea).toFixed(1)}м²` : 'площадь не указана'})</span>
                        </div>}
                        {techHeatingCount > 0 && <div style={styles.resultItem}>
                          <span>Тепловые пункты ИТП (тепловые датчики):</span>
                          <span style={styles.resultValue}>{techHeatingCount} шт. ({techHeatingArea > 0 ? `${techHeatingArea}м² × ${techHeatingCount} = ${(techHeatingCount * techHeatingArea).toFixed(1)}м²` : 'площадь не указана'})</span>
                        </div>}
                        {techPumpingCount > 0 && <div style={styles.resultItem}>
                          <span>Насосные станции (тепловые датчики):</span>
                          <span style={styles.resultValue}>{techPumpingCount} шт. ({techPumpingArea > 0 ? `${techPumpingArea}м² × ${techPumpingCount} = ${(techPumpingCount * techPumpingArea).toFixed(1)}м²` : 'площадь не указана'})</span>
                        </div>}
                        {techTransformerCount > 0 && <div style={styles.resultItem}>
                          <span>Трансформаторные подстанции (тепловые датчики):</span>
                          <span style={styles.resultValue}>{techTransformerCount} шт. ({techTransformerArea > 0 ? `${techTransformerArea}м² × ${techTransformerCount} = ${(techTransformerCount * techTransformerArea).toFixed(1)}м²` : 'площадь не указана'})</span>
                        </div>}
                        {techTelecomCount > 0 && <div style={styles.resultItem}>
                          <span>Слаботочные системы (дымовые датчики):</span>
                          <span style={styles.resultValue}>{techTelecomCount} шт. ({techTelecomArea > 0 ? `${techTelecomArea}м² × ${techTelecomCount} = ${(techTelecomCount * techTelecomArea).toFixed(1)}м²` : 'площадь не указана'})</span>
                        </div>}
                        {techWaterCount > 0 && <div style={styles.resultItem}>
                          <span>Водомерные узлы (тепловые датчики):</span>
                          <span style={styles.resultValue}>{techWaterCount} шт. ({techWaterArea > 0 ? `${techWaterArea}м² × ${techWaterCount} = ${(techWaterCount * techWaterArea).toFixed(1)}м²` : 'площадь не указана'})</span>
                        </div>}
                        {techFloorCount > 0 && <div style={styles.resultItem}>
                          <span>Технические этажи/пространства (дымовые датчики):</span>
                          <span style={styles.resultValue}>{techFloorCount} шт. ({techFloorArea > 0 ? `${techFloorArea}м² × ${techFloorCount} = ${(techFloorCount * techFloorArea).toFixed(1)}м²` : 'площадь не указана'})</span>
                        </div>}
                      </div>
                    )}

                    {(storageCount > 0 || wasteRoomCount > 0 || parkingUndergroundCount > 0) && (
                      <div style={{marginBottom: '15px'}}>
                        <strong style={{color: '#9b59b6', fontSize: '1.1em'}}>Хранение и парковка:</strong>
                        {storageCount > 0 && <div style={styles.resultItem}>
                          <span>Индивидуальные кладовые (дымовые датчики):</span>
                          <span style={styles.resultValue}>{storageCount} шт. ({storageArea > 0 ? `${storageArea}м² × ${storageCount} = ${(storageCount * storageArea).toFixed(1)}м²` : 'площадь не указана'})</span>
                        </div>}
                        {wasteRoomCount > 0 && <div style={styles.resultItem}>
                          <span>Мусоросборные камеры (тепловые датчики):</span>
                          <span style={styles.resultValue}>{wasteRoomCount} шт. ({wasteRoomArea > 0 ? `${wasteRoomArea}м² × ${wasteRoomCount} = ${(wasteRoomCount * wasteRoomArea).toFixed(1)}м²` : 'площадь не указана'})</span>
                        </div>}
                        {parkingUndergroundCount > 0 && <div style={styles.resultItem}>
                          <span>Подземный паркинг (дымовые датчики):</span>
                          <span style={styles.resultValue}>{parkingUndergroundCount} шт. ({parkingUndergroundArea > 0 ? `${parkingUndergroundArea}м² × ${parkingUndergroundCount} = ${(parkingUndergroundCount * parkingUndergroundArea).toFixed(1)}м²` : 'площадь не указана'})</span>
                        </div>}
                      </div>
                    )}

                    {(securityPostCount > 0 || staffRoomCount > 0) && (
                      <div style={{marginBottom: '15px'}}>
                        <strong style={{color: '#e67e22', fontSize: '1.1em'}}>Охрана и эксплуатация:</strong>
                        {securityPostCount > 0 && <div style={styles.resultItem}>
                          <span>Посты охраны (дымовые датчики):</span>
                          <span style={styles.resultValue}>{securityPostCount} шт. ({securityPostArea > 0 ? `${securityPostArea}м² × ${securityPostCount} = ${(securityPostCount * securityPostArea).toFixed(1)}м²` : 'площадь не указана'})</span>
                        </div>}
                        {staffRoomCount > 0 && <div style={styles.resultItem}>
                          <span>Комнаты отдыха персонала (дымовые датчики):</span>
                          <span style={styles.resultValue}>{staffRoomCount} шт. ({staffRoomArea > 0 ? `${staffRoomArea}м² × ${staffRoomCount} = ${(staffRoomCount * staffRoomArea).toFixed(1)}м²` : 'площадь не указана'})</span>
                        </div>}
                      </div>
                    )}
                  </div>
                )}

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
                  <div style={styles.resultItem}>
                    <span>Площадь покрытия 1 датчика (расч.):</span>
                    <span style={styles.resultValue}>{results.adjustedDetectorCoverage?.toFixed(1) || detectorCoverage} м²</span>
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

                <div style={styles.resultCard}>
                  <h3 style={styles.resultCardTitle}>📖 Нормативная база (СП 5.13130.2009)</h3>
                  <div style={styles.resultItem}>
                    <span>Максимальная площадь на 1 дым. извещатель:</span>
                    <span style={styles.resultValue}>85 м² (при h ≤ 3.5м)</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Расстояние между извещателями:</span>
                    <span style={styles.resultValue}>≤ 9 м</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Расстояние до стен:</span>
                    <span style={styles.resultValue}>≤ 4.5 м</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Корректировка по высоте:</span>
                    <span style={styles.resultValue}>
                      {height > 3.5 ?
                        `Применена (${height}м > 3.5м)` :
                        'Не требуется'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Модальное окно для выбора квартир */}
      {showApartmentsModal && (
        <div style={styles.modalOverlay} onClick={() => setShowApartmentsModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>🏠 Настройка квартир по комнатности</h2>
            <p style={styles.modalSubtitle}>Укажите количество квартир каждого типа</p>

            <div style={styles.modalGrid}>
              <div style={styles.apartmentInput}>
                <label style={styles.modalLabel}>1-комнатные квартиры</label>
                <input
                  type="number"
                  value={apartment1Room}
                  onChange={(e) => setApartment1Room(Number(e.target.value))}
                  style={styles.modalInput}
                  min="0"
                />
              </div>

              <div style={styles.apartmentInput}>
                <label style={styles.modalLabel}>2-комнатные квартиры</label>
                <input
                  type="number"
                  value={apartment2Room}
                  onChange={(e) => setApartment2Room(Number(e.target.value))}
                  style={styles.modalInput}
                  min="0"
                />
              </div>

              <div style={styles.apartmentInput}>
                <label style={styles.modalLabel}>3-комнатные квартиры</label>
                <input
                  type="number"
                  value={apartment3Room}
                  onChange={(e) => setApartment3Room(Number(e.target.value))}
                  style={styles.modalInput}
                  min="0"
                />
              </div>

              <div style={styles.apartmentInput}>
                <label style={styles.modalLabel}>4-комнатные квартиры</label>
                <input
                  type="number"
                  value={apartment4Room}
                  onChange={(e) => setApartment4Room(Number(e.target.value))}
                  style={styles.modalInput}
                  min="0"
                />
              </div>

              <div style={styles.apartmentInput}>
                <label style={styles.modalLabel}>5-комнатных квартир</label>
                <input
                  type="number"
                  value={apartment5Room}
                  onChange={(e) => setApartment5Room(Number(e.target.value))}
                  style={styles.modalInput}
                  min="0"
                />
              </div>

              <div style={styles.apartmentInput}>
                <label style={styles.modalLabel}>6-комнатных квартир</label>
                <input
                  type="number"
                  value={apartment6Room}
                  onChange={(e) => setApartment6Room(Number(e.target.value))}
                  style={styles.modalInput}
                  min="0"
                />
              </div>

              <div style={styles.apartmentInput}>
                <label style={styles.modalLabel}>7-комнатных квартир</label>
                <input
                  type="number"
                  value={apartment7Room}
                  onChange={(e) => setApartment7Room(Number(e.target.value))}
                  style={styles.modalInput}
                  min="0"
                />
              </div>
            </div>

            <div style={styles.modalSummary}>
              <div style={styles.summaryItem}>
                <strong>Общее количество квартир: {calculatedApartmentsCount} шт.</strong>
              </div>
              <div style={styles.summaryItem}>
                <strong>Общее количество комнат: {apartment1Room * 1 + apartment2Room * 2 + apartment3Room * 3 + apartment4Room * 4 + apartment5Room * 5 + apartment6Room * 6 + apartment7Room * 7} шт.</strong>
              </div>
              <div style={styles.summaryItem}>
                Средняя комнатность: {averageRoomsPerApartment.toFixed(1)} комнат/квартира
              </div>
            </div>

            <div style={styles.modalButtons}>
              <button
                onClick={() => setShowApartmentsModal(false)}
                style={styles.modalCloseButton}
              >
                ✅ Применить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно для выбора помещений */}
      {showRoomsModal && (
        <div style={styles.modalOverlay} onClick={() => setShowRoomsModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>🏗️ Настройка помещений по типам</h2>
            <p style={styles.modalSubtitle}>Укажите количество и площадь помещений каждого типа</p>

            <div style={styles.modalGrid}>
              {/* Здесь будет содержимое для выбора помещений */}
              <div style={{textAlign: 'center', padding: '20px'}}>
                <p>Модальное окно для помещений будет добавлено далее</p>
              </div>
            </div>

            <div style={styles.modalButtons}>
              <button
                onClick={() => setShowRoomsModal(false)}
                style={styles.modalCloseButton}
              >
                ✅ Применить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
