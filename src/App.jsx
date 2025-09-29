import { useState } from 'react'
import './App.css'

function App() {
  // Основные состояния здания
  const [aboveGroundArea, setAboveGroundArea] = useState(5000) // Надземная часть
  const [undergroundArea, setUndergroundArea] = useState(0) // Подземная автостоянка
  const [aboveGroundFloors, SetAboveGroundFloors] = useState(10) // Этажность
  const [undergroundFloors, setUndergroundFloors] = useState(0) // Подземные этажи
  const [apartmentsCount, setApartmentsCount] = useState(100) // Общее количество квартир

  // Детализированный выбор квартир по комнатности
  const [apartment1Room, setApartment1Room] = useState(25) // 1-комнатные
  const [apartment2Room, setApartment2Room] = useState(50) // 2-комнатные
  const [apartment3Room, setApartment3Room] = useState(20) // 3-комнатные
  const [apartment4Room, setApartment4Room] = useState(5) // 4-комнатные
  const [apartment5Room, setApartment5Room] = useState(0) // 5-комнатные
  const [apartment6Room, setApartment6Room] = useState(0) // 6-комнатные
  const [apartment7Room, setApartment7Room] = useState(0) // 7-комнатные
  const [useDetailedApartments, setUseDetailedApartments] = useState(false) // Переключатель режима

  // Детальный выбор помещений по типам
  const [useDetailedRooms, setUseDetailedRooms] = useState(false) // Переключатель детального режима помещений

  // Общие помещения (расчет для 10-секционного комплекса)
  const [stairwellCount, setStairwellCount] = useState(20) // 2 лестницы на секцию
  const [stairwellArea, setStairwellArea] = useState(15) // Типовая площадь лестничной клетки
  const [elevatorHallCount, setElevatorHallCount] = useState(10) // По 1 лифтовому холлу на секцию
  const [elevatorHallArea, setElevatorHallArea] = useState(25) // Типовая площадь лифтового холла
  const [commonCorridorCount, setCommonCorridorCount] = useState(35) // Коридоры на каждом этаже
  const [commonCorridorArea, setCommonCorridorArea] = useState(120) // Средняя площадь коридора

  // Технические помещения (по ТЗ многосекционного комплекса)
  const [techVentilationCount, setTechVentilationCount] = useState(15) // Венткамеры для каждой секции + общие
  const [techVentilationArea, setTechVentilationArea] = useState(35) // Средняя площадь венткамеры
  const [techElectricalCount, setTechElectricalCount] = useState(12) // Электрощитовые секций
  const [techElectricalArea, setTechElectricalArea] = useState(20) // Площадь электрощитовой
  const [techHeatingCount, setTechHeatingCount] = useState(8) // ИТП для секций
  const [techHeatingArea, setTechHeatingArea] = useState(50) // Площадь теплового пункта
  const [techPumpingCount, setTechPumpingCount] = useState(4) // Насосные станции
  const [techPumpingArea, setTechPumpingArea] = useState(30) // Площадь насосной
  const [techTransformerCount, setTechTransformerCount] = useState(2) // Трансформаторные подстанции
  const [techTransformerArea, setTechTransformerArea] = useState(80) // Площадь трансформаторной
  const [techTelecomCount, setTechTelecomCount] = useState(10) // Слаботочные помещения
  const [techTelecomArea, setTechTelecomArea] = useState(15) // Площадь слаботочной
  const [techWaterCount, setTechWaterCount] = useState(6) // Водомерные узлы
  const [techWaterArea, setTechWaterArea] = useState(25) // Площадь водомерного узла
  const [techFloorCount, setTechFloorCount] = useState(3) // Технические этажи
  const [techFloorArea, setTechFloorArea] = useState(500) // Площадь техэтажа

  // Хранение и парковка (по ТЗ с подземной автостоянкой)
  const [storageCount, setStorageCount] = useState(800) // Кладовые для жильцов (по 1 на квартиру)
  const [storageArea, setStorageArea] = useState(4) // Средняя площадь кладовой
  const [wasteRoomCount, setWasteRoomCount] = useState(11) // Мусорные камеры (центральная + в секциях)
  const [wasteRoomArea, setWasteRoomArea] = useState(12) // Площадь мусорной камеры
  const [parkingUndergroundCount, setParkingUndergroundCount] = useState(1) // Общая подземная автостоянка
  const [parkingUndergroundArea, setParkingUndergroundArea] = useState(8000) // Площадь подземной парковки

  // Охрана и эксплуатация (для крупного ЖК)
  const [securityPostCount, setSecurityPostCount] = useState(6) // Посты охраны в вестибюлях
  const [securityPostArea, setSecurityPostArea] = useState(8) // Площадь поста охраны
  const [staffRoomCount, setStaffRoomCount] = useState(4) // Комнаты персонала/консьержей
  const [staffRoomArea, setStaffRoomArea] = useState(12) // Площадь комнаты персонала

  // Настройки системы АПС
  const [rooms, setRooms] = useState(50) // Общие помещения (коридоры, лестницы, технические)
  const [height, setHeight] = useState(3.0) // Высота потолков
  const [buildingType, setBuildingType] = useState('Ф1.3') // Функциональное назначение по СП 484.1311500.2020
  const [detectorCoverage, setDetectorCoverage] = useState(85) // Согласно СП 5.13130.2009
  const [manualCallDistance, setManualCallDistance] = useState(50) // Норматив
  const [sounderCoverage, setSounderCoverage] = useState(15)
  const [cableReserve, setCableReserve] = useState(15) // Стандартный запас кабеля
  const [zoneSize, setZoneSize] = useState(300) // ЗКПС стандартный размер

  // Новые состояния для улучшенной логики СП 484.1311500.2020 - множественный выбор
  const [systemTypes, setSystemTypes] = useState(['адресная']) // Типы систем (множественный выбор)
  const [fireAlgorithms, setFireAlgorithms] = useState(['B']) // Алгоритмы формирования сигнала ПОЖАР (множественный выбор)
  const [planningOptions, setPlanningOptions] = useState(['defined']) // Варианты планировки (множественный выбор)
  const [controlledSystems, setControlledSystems] = useState(['СОУЭ_1-3']) // Управляемые системы
  const [soueOptions, setSoueOptions] = useState(['basic']) // Варианты СОУЭ (множественный выбор)
  const [auptOptions, setAuptOptions] = useState(['none']) // Варианты АУПТ (множественный выбор)

  // Состояния для корпусов и их этажности
  const [buildingCorpuses, setBuildingCorpuses] = useState(3) // Количество корпусов
  const [useDetailedCorpuses, setUseDetailedCorpuses] = useState(false) // Детальная настройка корпусов
  const [corpusesFloors, setCorpusesFloors] = useState({ // Этажность каждого корпуса
    corpus1: 16,
    corpus2: 18,
    corpus3: 20
  })

  // Результаты и состояния интерфейса
  const [results, setResults] = useState(null)
  const [showApartmentsModal, setShowApartmentsModal] = useState(false)
  const [showRoomsModal, setShowRoomsModal] = useState(false)
  const [showAPSSettingsModal, setShowAPSSettingsModal] = useState(false)
  const [showCorpusesModal, setShowCorpusesModal] = useState(false)
  const [activeSection, setActiveSection] = useState('calculator') // Навигация портала

  // Функции для множественного выбора
  const toggleArrayOption = (array, setArray, value) => {
    if (array.includes(value)) {
      setArray(array.filter(item => item !== value))
    } else {
      setArray([...array, value])
    }
  }

  // Структура конкретных моделей оборудования по типам
  const equipmentModels = {
    detectors: {
      name: '🔍 Пожарные извещатели',
      models: {
        // Только нужные модели извещателей
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
        // Только нужные модели
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
        // Только нужные модели
        'ipr513-3am-r3': 'ИПР 513-3АМ-R3 Rubezh (адресный)',
        'udp-513-11': 'УДП 513-11 ИКЗ-R3 "Пуск дымоудаления"'
      }
    },
    sounders: {
      name: '📢 Система оповещения',
      models: {
        // Только нужные модели
        'opop124-r3': 'ОПОП 124-R3 (светозвуковой адресный)',
        'mayak-24-s': 'Маяк-24-С (световой)',
        'mayak-24-kp': 'Маяк-24-КП (комбинированный)'
      }
    },
    powerSupplies: {
      name: '🔌 Источники питания',
      models: {
        // Только нужные модели
        'ivepr-24-r3': 'ИВЭПР 24/2,5 RS-R3 Rubezh (источник питания)',
        'ups-battery-7ah': 'Аккумулятор Delta DTM 12012 (12В 1.2Ач)'
      }
    }
  }

  // Настройки выбора конкретных моделей оборудования
  const [selectedEquipmentModels, setSelectedEquipmentModels] = useState(() => {
    const initial = {}
    Object.keys(equipmentModels).forEach(category => {
      Object.keys(equipmentModels[category].models).forEach(model => {
        initial[model] = true // По умолчанию все модели выбраны
      })
    })
    return initial
  })

  // Дополнительное оборудование (ручное добавление)
  const [customEquipment, setCustomEquipment] = useState([])

  // Функция для выбора всех моделей в категории
  const selectAllModelsInCategory = (category) => {
    const updated = { ...selectedEquipmentModels }
    Object.keys(equipmentModels[category].models).forEach(model => {
      updated[model] = true
    })
    setSelectedEquipmentModels(updated)
  }

  // Функция для отмены выбора всех моделей в категории
  const deselectAllModelsInCategory = (category) => {
    const updated = { ...selectedEquipmentModels }
    Object.keys(equipmentModels[category].models).forEach(model => {
      updated[model] = false
    })
    setSelectedEquipmentModels(updated)
  }

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

  // Функция для получения выбранных моделей по категориям
  const getSelectedModelsByCategory = (categoryKey) => {
    if (!equipmentModels[categoryKey]) return []
    return Object.entries(equipmentModels[categoryKey].models)
      .filter(([modelKey]) => selectedEquipmentModels[modelKey])
      .map(([modelKey, modelName]) => ({ key: modelKey, name: modelName }))
  }

  // Функция для проверки, выбрана ли хотя бы одна модель в категории
  const isCategorySelected = (categoryKey) => {
    if (!equipmentModels[categoryKey]) return false
    return Object.keys(equipmentModels[categoryKey].models)
      .some(modelKey => selectedEquipmentModels[modelKey])
  }

  // Функции для работы с корпусами
  const updateCorpusFloors = (corpusKey, floors) => {
    setCorpusesFloors(prev => ({
      ...prev,
      [corpusKey]: Number(floors)
    }))
  }

  const updateCorpusesCount = (count) => {
    const newCount = Number(count)
    setBuildingCorpuses(newCount)

    // Обновляем объект этажности корпусов
    const newCorpusesFloors = {}
    for (let i = 1; i <= newCount; i++) {
      const corpusKey = `corpus${i}`
      newCorpusesFloors[corpusKey] = corpusesFloors[corpusKey] || aboveGroundFloors
    }
    setCorpusesFloors(newCorpusesFloors)
  }

  const getMaxCorpusFloors = () => {
    if (!useDetailedCorpuses) return aboveGroundFloors
    return Math.max(...Object.values(corpusesFloors))
  }

  const getTotalCorpusFloors = () => {
    if (!useDetailedCorpuses) return buildingCorpuses * aboveGroundFloors
    return Object.values(corpusesFloors).reduce((sum, floors) => sum + floors, 0)
  }

  const calculateEquipment = () => {
    // Используем общую площадь для расчётов
    const area = totalArea

    // Расчёт зон контроля (ЗКПС) согласно СП 484.1311500.2020
    const calculateZKPS = (area, rooms, functionalClass, planningDefined) => {
      // Ограничения для ЗКПС согласно СП 484.1311500.2020:
      // - максимальная площадь: 2000 м²
      // - максимальное количество извещателей: 32 шт
      // - максимальное количество помещений: 5 шт

      const maxZoneArea = 2000 // м²
      const maxDetectorsPerZone = 32 // извещателей
      const maxRoomsPerZone = 5 // помещений

      let zones = 0

      // ОСОБОЕ ТРЕБОВАНИЕ: Каждая квартира должна быть в отдельной ЗКПС
      // с изолятором короткого замыкания
      if (functionalClass === 'Ф1.3' || functionalClass === 'Ф1.2') {
        // Для жилых домов и гостиниц - каждая квартира/номер = отдельная ЗКПС
        zones = calculatedApartmentsCount

        // Добавляем ЗКПС для общих помещений (лестницы, лифтовые холлы, коридоры)
        const commonAreasZones = Math.ceil((stairwellCount + elevatorHallCount + commonCorridorCount) / maxRoomsPerZone)

        // Добавляем ЗКПС для технических помещений
        const techRoomsTotal = techVentilationCount + techElectricalCount + techHeatingCount +
                               techPumpingCount + techTransformerCount + techTelecomCount +
                               techWaterCount + techFloorCount
        const techZones = Math.ceil(techRoomsTotal / maxRoomsPerZone)

        zones += commonAreasZones + techZones

        // Проверяем ограничения по площади (для больших квартир)
        const zonesByArea = Math.ceil(area / maxZoneArea)
        zones = Math.max(zones, zonesByArea)

        return Math.max(calculatedApartmentsCount, zones) // минимум по количеству квартир
      }

      // Для остальных функциональных классов - стандартный расчет
      if (planningDefined) {
        // Если планировка определена - считаем по помещениям
        const roomsInInput = useDetailedRooms ? calculatedRoomsCount : rooms
        zones = Math.ceil(roomsInInput / maxRoomsPerZone)

        // Дополнительно проверяем ограничения по площади
        const zonesByArea = Math.ceil(area / maxZoneArea)
        zones = Math.max(zones, zonesByArea)
      } else {
        // Если планировка не определена - считаем только по площади
        zones = Math.ceil(area / maxZoneArea)
      }

      // Проверка ограничения по количеству извещателей
      // Предварительная оценка: 1 извещатель на 85 м² (средне)
      const estimatedDetectors = Math.ceil(area / 85)
      const zonesByDetectors = Math.ceil(estimatedDetectors / maxDetectorsPerZone)
      zones = Math.max(zones, zonesByDetectors)

      // Особые требования для разных функциональных классов
      if (functionalClass === 'Ф1.1' || functionalClass === 'Ф2.1') {
        // Детские сады, больницы, театры - уменьшенные зоны для безопасности
        zones = Math.ceil(zones * 1.5)
      } else if (functionalClass.startsWith('Ф5')) {
        // Производственные и складские - могут быть увеличенные зоны
        zones = Math.ceil(zones * 0.8)
      }

      return Math.max(1, zones) // минимум 1 зона
    }

    const zones = calculateZKPS(area, rooms, buildingType, planningOptions.includes('defined'))

    // Расчет пожарных отсеков на основе нормативов
    const getFireCompartmentSize = (buildingType) => {
      switch(buildingType) {
        case 'residential_apartment': return 2500 // Жилые дома до 2500 м² на отсек
        case 'office': return 2000 // Офисные здания
        case 'warehouse': return 3000 // Складские помещения
        case 'industrial': return 1800 // Производственные здания
        case 'commercial': return 2200 // Торговые помещения
        case 'parking_underground': return 3000 // Подземные парковки
        default: return 2500
      }
    }

    const compartmentSize = getFireCompartmentSize(buildingType)
    const fireCompartments = Math.max(1, Math.ceil(area / compartmentSize))

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
        // КРИТИЧНО: Все жилые помещения, включая кухни и прихожие, оборудованы автономными дымовыми ИП
        // вне зависимости от этажности здания согласно обновленным требованиям пожарной безопасности
        // Каждая комната, кухня и коридор требует отдельный автономный дымовой извещатель
        const detectors1Room = apartment1Room * (1 + 2) // комнаты + кухня + коридор (автономные ИП)
        const detectors2Room = apartment2Room * (2 + 2) // комнаты + кухня + коридор (автономные ИП)
        const detectors3Room = apartment3Room * (3 + 2) // комнаты + кухня + коридор (автономные ИП)
        const detectors4Room = apartment4Room * (4 + 2) // комнаты + кухня + коридор (автономные ИП)
        const detectors5Room = apartment5Room * (5 + 2) // комнаты + кухня + коридор (автономные ИП)
        const detectors6Room = apartment6Room * (6 + 2) // комнаты + кухня + коридор (автономные ИП)
        const detectors7Room = apartment7Room * (7 + 2) // комнаты + кухня + коридор (автономные ИП)

        totalDetectors = detectors1Room + detectors2Room + detectors3Room + detectors4Room + detectors5Room + detectors6Room + detectors7Room
      } else {
        // Простой режим: используем среднюю комнатность
        // КРИТИЧНО: Автономные дымовые извещатели обязательны для всех жилых помещений
        // независимо от этажности - значительно увеличивает количество датчиков и стоимость
        const detectorsPerApartment = averageRoomsPerApartment + 2 // комнаты + кухня + коридор (автономные ИП)
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

    // Дополнительные датчики для лестничных клеток и лифтовых шахт
    let additionalDetectorsForVerticalPaths = 0
    if (buildingType === 'residential_apartment' && aboveGroundFloors > 3) {
      // Дополнительные датчики в лестничных клетках и лифтовых шахтах для высотных зданий
      const stairwells = Math.ceil(aboveGroundArea / 1000) // Примерно 1 лестничная клетка на 1000 м²
      const elevators = Math.ceil(aboveGroundArea / 2000) // Примерно 1 лифт на 2000 м²
      additionalDetectorsForVerticalPaths = (stairwells + elevators) * Math.ceil(aboveGroundFloors / 2)
    }

    // Корректировка для подземных этажей
    let undergroundDetectors = 0
    if (undergroundArea > 0) {
      // Для подземных этажей используем повышенную плотность из-за особенностей дымоудаления
      undergroundDetectors = Math.ceil(undergroundArea / 70) // Более плотное размещение
    }

    // Итоговое количество датчиков с учетом всех факторов
    totalDetectors = Math.max(totalDetectors, Math.ceil(area / adjustedDetectorCoverage)) + additionalDetectorsForVerticalPaths + undergroundDetectors

    // Определение типа системы АПС согласно СП 484.1311500.2020
    const determineSystemType = (functionalClass, area, height) => {
      // КРИТИЧНО: Адресная система ОБЯЗАТЕЛЬНА для:
      // - высотных зданий (более 28 м)
      // - больших площадей (более 3000 м²)
      // - объектов массового пребывания людей (Ф2, Ф3)
      if (height >= 28 || area >= 3000 ||
          functionalClass.startsWith('Ф2') || functionalClass.startsWith('Ф3')) {
        return 'адресная'
      }

      // Для остальных случаев используем ВЫБРАННЫЙ ПОЛЬЗОВАТЕЛЕМ тип системы
      return systemTypes[0] || 'адресная'
    }

    // Алгоритмы формирования сигнала ПОЖАР согласно СП 484.1311500.2020
    const getFireAlgorithm = (functionalClass) => {
      // КРИТИЧНО: Проверяем сначала выбор пользователя, затем обязательные требования
      const userSelectedAlgorithm = fireAlgorithms[0] || 'B'

      // Алгоритм C (1 извещатель) РЕКОМЕНДУЕТСЯ для особо важных объектов
      // Но пользователь может выбрать другой, если это не противоречит безопасности
      if (functionalClass === 'Ф1.1' || // Детские сады, больницы
          functionalClass === 'Ф2.1' || // Театры, кинотеатры
          functionalClass === 'Ф2.3') { // Спортивные сооружения
        // Если пользователь выбрал менее строгий алгоритм для критичных объектов - используем C
        if (userSelectedAlgorithm === 'A' || userSelectedAlgorithm === 'B') {
          return 'C' // Принудительно устанавливаем более строгий алгоритм
        }
        return userSelectedAlgorithm
      }

      // Алгоритм A (1 дымовой ИЛИ 2 тепловых) РЕКОМЕНДУЕТСЯ для жилых зданий
      // Но пользователь может выбрать более строгий
      if (functionalClass.startsWith('Ф1')) {
        // Если пользователь выбрал более строгий алгоритм - разрешаем
        if (userSelectedAlgorithm === 'C') {
          return 'C'
        }
        // Иначе используем рекомендуемый A для жилых
        return userSelectedAlgorithm === 'A' ? 'A' : userSelectedAlgorithm
      }

      // Для остальных случаев используем ВЫБРАННЫЙ ПОЛЬЗОВАТЕЛЕМ алгоритм
      return userSelectedAlgorithm
    }

    // Определяем фактический тип системы и алгоритм
    const actualSystemType = determineSystemType(buildingType, area, height)
    const actualFireAlgorithm = getFireAlgorithm(buildingType)

    // Расчет соотношения дымовых и тепловых датчиков по СП 484.1311500.2020
    const calculateDetectorRatio = (functionalClass) => {
      const baseRatios = {
        'Ф1.1': { smoke: 0.9, heat: 0.1 }, // Детские сады, больницы - преимущественно дымовые
        'Ф1.2': { smoke: 0.8, heat: 0.2 }, // Гостиницы, общежития
        'Ф1.3': { smoke: 0.75, heat: 0.25 }, // Многоквартирные дома
        'Ф1.4': { smoke: 0.7, heat: 0.3 }, // Одноквартирные дома
        'Ф2.1': { smoke: 0.85, heat: 0.15 }, // Театры, концертные залы
        'Ф2.2': { smoke: 0.8, heat: 0.2 }, // Музеи, выставки
        'Ф2.3': { smoke: 0.7, heat: 0.3 }, // Спортивные сооружения
        'Ф2.4': { smoke: 0.8, heat: 0.2 }, // Библиотеки, клубы
        'Ф3.1': { smoke: 0.75, heat: 0.25 }, // Торговые центры
        'Ф3.2': { smoke: 0.6, heat: 0.4 }, // Предприятия питания
        'Ф3.3': { smoke: 0.8, heat: 0.2 }, // Вокзалы, аэропорты
        'Ф3.4': { smoke: 0.85, heat: 0.15 }, // Поликлиники
        'Ф3.5': { smoke: 0.8, heat: 0.2 }, // Помещения с посетителями
        'Ф3.6': { smoke: 0.75, heat: 0.25 }, // Спортивные залы
        'Ф4.1': { smoke: 0.85, heat: 0.15 }, // Школы, учебные заведения
        'Ф4.2': { smoke: 0.8, heat: 0.2 }, // Научные учреждения
        'Ф4.3': { smoke: 0.8, heat: 0.2 }, // Органы управления, офисы
        'Ф4.4': { smoke: 0.75, heat: 0.25 }, // Пожарные депо, банки
        'Ф5.1': { smoke: 0.4, heat: 0.6 }, // Производственные здания
        'Ф5.2': { smoke: 0.3, heat: 0.7 }, // Складские здания
        'Ф5.3': { smoke: 0.5, heat: 0.5 }, // Сельскохозяйственные здания
      }

      return baseRatios[functionalClass] || { smoke: 0.7, heat: 0.3 }
    }

    // Расчет количества датчиков с учетом алгоритма
    const ratio = calculateDetectorRatio(buildingType)
    let smokeDetectors = Math.ceil(totalDetectors * ratio.smoke)
    let heatDetectors = Math.ceil(totalDetectors * ratio.heat)

    // Корректировка для алгоритма A (1 дымовой ИЛИ 2 тепловых)
    if (actualFireAlgorithm === 'A') {
      // Обеспечиваем соотношение 1:2 для тепловых датчиков
      const adjustedHeat = Math.ceil(smokeDetectors * 2)
      heatDetectors = Math.min(heatDetectors, adjustedHeat)
    }

    // Корректировка для алгоритма C (1 любой извещатель)
    if (actualFireAlgorithm === 'C') {
      // При алгоритме C можно использовать только дымовые для максимальной чувствительности
      smokeDetectors = totalDetectors
      heatDetectors = Math.ceil(totalDetectors * 0.1) // минимальное количество тепловых для технических помещений
    }

    // КРИТИЧНО: Корректировка для АУПТ согласно выбору пользователя
    let auptMultiplier = 1.0
    if (auptOptions.includes('water')) {
      // Водяное АУПТ: 100% дублирование датчиков (алгоритм B)
      auptMultiplier = 2.5 // Увеличение в 2.5 раза как указано в комментариях
    } else if (auptOptions.includes('gas')) {
      // Газовое АУПТ: тройное дублирование датчиков
      auptMultiplier = 3.5 // Увеличение в 3-4 раза как указано в комментариях
    } else if (auptOptions.includes('powder')) {
      // Порошковое АУПТ: увеличение датчиков в 2 раза + специальные модули
      auptMultiplier = 2.0
    } else if (auptOptions.includes('aerosol')) {
      // Аэрозольное АУПТ: минимальное увеличение (+30-50%)
      auptMultiplier = 1.4
    }
    // Если выбрано 'none' - множитель остается 1.0

    if (auptMultiplier > 1.0) {
      smokeDetectors = Math.ceil(smokeDetectors * auptMultiplier)
      heatDetectors = Math.ceil(heatDetectors * auptMultiplier)
      totalDetectors = smokeDetectors + heatDetectors
    }

    const algorithmType = `${actualFireAlgorithm} (${actualSystemType} система)`

    // Расчёт ППКП согласно СП 484.1311500.2020 с правильными запасами
    const calculatePPKP = (zones, functionalClass, systemType, area, totalDetectors) => {
      // Технические характеристики приборов
      const panelCapacities = {
        'адресная': {
          maxZones: 500,
          maxDetectors: 2000,
          maxLineLength: 3000,
          linesPerPanel: 4,
          reserve: 0.2 // 20% запас для адресных систем
        },
        'безадресная': {
          maxZones: 99,
          maxDetectors: 256,
          maxLineLength: 2000,
          linesPerPanel: 2,
          reserve: 0.3 // 30% запас для безадресных систем
        },
        'адресно-аналоговая': {
          maxZones: 1000,
          maxDetectors: 3200,
          maxLineLength: 3500,
          linesPerPanel: 8,
          reserve: 0.15 // 15% запас для адресно-аналоговых систем
        }
      }

      const capacity = panelCapacities[systemType] || panelCapacities['адресная']

      // Расчёт по зонам контроля
      const panelsByZones = Math.ceil(zones / capacity.maxZones)

      // Расчёт по количеству извещателей
      const panelsByDetectors = Math.ceil(totalDetectors / capacity.maxDetectors)

      // Расчёт по длине линий связи (упрощенная формула)
      const estimatedLineLength = Math.sqrt(area) * 4 // периметр + внутренние трассы
      const requiredLines = Math.ceil(estimatedLineLength / capacity.maxLineLength)
      const panelsByLineLength = Math.ceil(requiredLines / capacity.linesPerPanel)

      // Базовое количество приборов
      let basePanels = Math.max(panelsByZones, panelsByDetectors, panelsByLineLength)

      // Минимальное количество - по пожарным отсекам
      basePanels = Math.max(basePanels, fireCompartments)

      // Особые требования для различных функциональных классов
      if (functionalClass === 'Ф1.1' || functionalClass === 'Ф2.1') {
        // Детские сады, больницы, театры - обязательное резервирование
        basePanels = Math.ceil(basePanels * 1.2)
      }

      // Добавляем запас согласно типу системы
      const panelsWithReserve = Math.ceil(basePanels * (1 + capacity.reserve))

      return {
        base: basePanels,
        withReserve: panelsWithReserve,
        reserve: capacity.reserve,
        systemType: systemType,
        estimatedLineLength: estimatedLineLength,
        maxLineLength: capacity.maxLineLength,
        linesPerPanel: capacity.linesPerPanel,
        maxZonesPerPanel: capacity.maxZones
      }
    }

    const ppkpCalculation = calculatePPKP(zones, buildingType, actualSystemType, area, totalDetectors)
    const controlPanels = ppkpCalculation.withReserve

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
      default: // офисное
        soueType = '3-й тип (офисные)'
        sounderMultiplier = 1.0
        break
    }

    // КРИТИЧНО: Корректируем расчет СОУЭ в зависимости от выбора пользователя
    const selectedSoueType = soueOptions.includes('intelligent') ? 'intelligent' : 'basic'
    if (selectedSoueType === 'intelligent') {
      // СОУЭ 4-5 типа: речевое оповещение требует значительно больше оборудования
      sounderMultiplier *= 1.8 // Увеличение на 80% как указано в комментариях
      soueType = '4-5 тип (речевое оповещение)'
    } else {
      // СОУЭ 1-3 типа: стандартное звуковое оповещение (без изменений)
      soueType = '1-3 тип (звуковое оповещение)'
    }

    // Расчёт оповещателей с учётом уровня звука ≥75 дБА, но ≤120 дБА
    const sounderArea = Math.PI * Math.pow(sounderCoverage, 2)
    const sounders = Math.ceil((area / sounderArea) * sounderMultiplier)
    const beacons = Math.ceil(sounders * 0.5) // 50% световых оповещателей

    // Расчет источников питания и АКБ с коэффициентом старения согласно СП 484.1311500.2020
    const calculatePowerAndBatteries = (controlPanels, totalDetectors, sounders) => {
      // Источники питания - один на каждый ППКП
      const powerSupplies = controlPanels

      // Расчет тока потребления системы
      const detectorCurrent = 0.0001 // 0.1 мА на извещатель (дежурный режим)
      const sounderCurrent = 0.05 // 50 мА на оповещатель (режим "Пожар")
      const panelCurrent = 0.5 // 500 мА на прибор управления

      const totalCurrent = (totalDetectors * detectorCurrent) +
                          (sounders * sounderCurrent) +
                          (controlPanels * panelCurrent)

      // Время резервного питания согласно функциональному назначению
      const getReserveTime = (functionalClass) => {
        if (functionalClass === 'Ф1.1' || functionalClass === 'Ф2.1') {
          return 24 // 24 часа для особо важных объектов
        } else if (functionalClass.startsWith('Ф1') || functionalClass.startsWith('Ф2')) {
          return 12 // 12 часов для жилых и общественных зданий
        } else {
          return 6 // 6 часов для производственных и складских
        }
      }

      const reserveTimeHours = getReserveTime(buildingType)

      // Коэффициент старения АКБ согласно СП 484.1311500.2020
      const agingCoefficient = 1.25 // учет старения АКБ за срок службы

      // Коэффициент глубины разряда (85% для свинцово-кислотных АКБ)
      const dischargeCoefficient = 0.85

      // Температурный коэффициент (снижение емкости при низких температурах)
      const temperatureCoefficient = 0.9

      // Требуемая емкость АКБ с учетом всех коэффициентов
      const requiredCapacity = (totalCurrent * reserveTimeHours * agingCoefficient) /
                               (dischargeCoefficient * temperatureCoefficient)

      // Стандартные емкости доступных АКБ (Ач)
      const availableBatteries = [1.2, 1.7, 7, 17, 40, 65, 100]

      // Выбор подходящей емкости
      let selectedCapacity = availableBatteries.find(capacity => capacity >= requiredCapacity) || 100

      // Количество АКБ на один источник питания (обычно 2 для 24В системы)
      const batteriesPerPowerSupply = 2

      // Общее количество АКБ
      const totalBatteries = powerSupplies * batteriesPerPowerSupply

      return {
        powerSupplies: powerSupplies,
        batteries: totalBatteries,
        batteryCapacity: selectedCapacity,
        requiredCapacity: requiredCapacity.toFixed(2),
        reserveTime: reserveTimeHours,
        agingCoefficient: agingCoefficient,
        totalCurrent: totalCurrent.toFixed(3)
      }
    }

    const powerCalculation = calculatePowerAndBatteries(controlPanels, totalDetectors, sounders)
    const powerSupplies = powerCalculation.powerSupplies
    const batteries = powerCalculation.batteries

    // ЦПИУ "Рубеж" исп.02 - верхний уровень управления
    // Расчет ЦПИУ с учетом сложности объекта и количества пожарных отсеков
    let centralControlUnit = Math.ceil(controlPanels / 16) || 1 // 1 ЦПИУ на каждые 16 ППКОП

    // Дополнительные ЦПИУ для крупных объектов с резервированием
    if (fireCompartments > 8 || area > 15000) {
      centralControlUnit = Math.max(centralControlUnit, 2) // Минимум 2 ЦПИУ для крупных объектов
    }

    // Релейные модули для управления сложными системами
    // Базовый расчет релейных модулей
    let relayModules = Math.ceil(zones / 8) + controlPanels * 2 // РМ-1/РМ-4 + дополнительные для лифтов, ПДВ, ОВК

    // КРИТИЧНО: Корректировка для управляемых систем согласно выбору пользователя
    let additionalRelayModules = 0
    if (controlledSystems.includes('СОУЭ_4-5')) {
      // СОУЭ 4-5 типа: увеличение количества модулей в 3-5 раз для управления речевыми зонами
      relayModules = Math.ceil(relayModules * 4) // среднее значение 3-5 раз
    }
    if (controlledSystems.includes('АУПТ')) {
      // Управление АУПТ: 8-12 дополнительных релейных модулей
      additionalRelayModules += 10 // среднее значение 8-12
    }
    if (controlledSystems.includes('ПДЗ')) {
      // Управление ПДЗ: +6-10 релейных модулей для дымоудаления
      additionalRelayModules += 8 // среднее значение 6-10
    }
    if (controlledSystems.includes('ОВК')) {
      // Управление ОВК: +3-6 релейных модулей для вентиляции
      additionalRelayModules += 5 // среднее значение 3-6
    }
    relayModules += additionalRelayModules

    // Расчет дополнительного оборудования АПС
    // ИЗ-1-R3 - изоляторы линий связи (1 на каждые 10 адресных устройств)
    const lineIsolators = Math.ceil((totalDetectors + manualCallPoints) / 10)

    // АМ-4-R3 - адресные метки 4-канальные (для контроля инженерных систем)
    const addressableMarks4ch = controlledSystems.includes('АУПТ') || controlledSystems.includes('ПДЗ') || controlledSystems.includes('ОВК')
      ? Math.ceil(controlPanels * 2) : 0

    // РМ-1К-R3 и РМ-4К-R3 - релейные модули клапанные (для дымоудаления и АУПТ)
    let valveRelayModules1ch = 0
    let valveRelayModules4ch = 0
    if (controlledSystems.includes('ПДЗ')) {
      valveRelayModules4ch += Math.ceil(zones / 4) // для дымоудаления
    }
    if (controlledSystems.includes('АУПТ')) {
      valveRelayModules1ch += Math.ceil(zones / 8) // для пожаротушения
    }

    // МДУ-1С-R3 - модули дистанционного управления (для ручного пуска систем)
    const remoteControlModules = (controlledSystems.includes('АУПТ') || controlledSystems.includes('ПДЗ'))
      ? Math.ceil(controlPanels / 2) : 0

    // УДП 513-11 ИКЗ-R3 "Пуск дымоудаления" - устройства дистанционного пуска
    const smokeExhaustStartDevices = controlledSystems.includes('ПДЗ')
      ? Math.ceil(stairwellCount || Math.ceil(Math.sqrt(area) / 10)) : 0

    // ИО 102-51 НР(черный) - извещатели охранные (для контроля технических помещений)
    const securityDetectors = useDetailedRooms
      ? (techElectricalCount + techTransformerCount + techTelecomCount)
      : Math.ceil(rooms * 0.1) // 10% помещений под охрану

    // Световые оповещатели корректировка на конкретные модели
    const beaconsMayak24S = Math.ceil(beacons * 0.7) // 70% - Маяк-24-С (стандартные)
    const beaconsMayak24KP = Math.ceil(beacons * 0.3) // 30% - Маяк-24-КП (комбинированные)

    // Монтажные коробки не используются в текущем расчете

    // Расчёт кабеля с учётом требований АЛС R3-РУБЕЖ-2ОП
    // Увеличенный запас для сложных объектов
    const adjustedCableReserve = fireCompartments > 5 ? cableReserve + 5 : cableReserve
    const cableMultiplier = 1 + (adjustedCableReserve / 100) // Запас кабеля

    // КСРЭПнг(А)-FRHF для АЛС (адресные линии связи)
    // Длина АЛС ≤ 3000м на линию, 2 линии на прибор
    const alsLength = Math.min(ppkpCalculation.estimatedLineLength, ppkpCalculation.maxLineLength * ppkpCalculation.linesPerPanel)

    // Дополнительный кабель для связи между пожарными отсеками
    const interCompartmentCable = fireCompartments > 1 ? (fireCompartments - 1) * 50 : 0
    const loopCable = Math.ceil(controlPanels * alsLength * cableMultiplier) + interCompartmentCable

    // КПРПГнг(А)-FRHF для питания панелей и источников питания
    const avgPowerRun = Math.sqrt(area) * 0.3 // Средняя длина до щитовых
    const powerCable = Math.ceil(controlPanels * avgPowerRun * cableMultiplier)

    // КПСнг(А)-FRHF для линий оповещения
    const avgSounderRun = Math.sqrt(area) * 0.5 // Длина линий оповещения
    const sounderCable = Math.ceil(sounders * avgSounderRun * 0.7 * cableMultiplier)

    // Расчет монтажных материалов
    const totalCableLength = loopCable + powerCable + sounderCable // Общая длина всех кабелей
    const conduitLength = Math.ceil(totalCableLength * 0.8) // ПВХ труба = 80% от длины кабельных линий
    const brackets = conduitLength * 3 // 3 скобы на 1 метр трубы
    const anchors = conduitLength * 3 // 3 анкера на 1 метр трубы

    // Расчет изоляторов короткого замыкания для помещений МОП
    // Каждое помещение места общего пользования должно быть защищено изолятором КЗ
    let shortCircuitIsolators = 0
    if (useDetailedRooms) {
      // Детальный режим: считаем точное количество помещений МОП
      const mopRoomsCount = (stairwellCount * totalFloors) + // лестничные клетки
                           (elevatorHallCount * totalFloors) + // лифтовые холлы
                           (commonCorridorCount * totalFloors) + // общие коридоры
                           techVentilationCount + techElectricalCount + techHeatingCount + // технические помещения
                           techPumpingCount + techTransformerCount + techTelecomCount +
                           techWaterCount + techFloorCount +
                           storageCount + wasteRoomCount + // складские и мусорокамеры
                           securityPostCount + staffRoomCount // служебные помещения

      shortCircuitIsolators = mopRoomsCount // один изолятор КЗ на каждое помещение МОП
    } else {
      // Простой режим: используем общее количество помещений
      const roomsForCalculation = useDetailedRooms ? calculatedRoomsCount : rooms
      shortCircuitIsolators = roomsForCalculation // каждое общее помещение МОП требует изолятор КЗ
    }

    // Расчет автономных пожарных извещателей для жилых зданий Ф1
    let autonomousDetectors = 0
    if (buildingType === 'Ф1.1' || buildingType === 'Ф1.2' || buildingType === 'Ф1.3' || buildingType === 'Ф1.4') {
      // Для жилых зданий все жилые помещения, включая кухни и прихожие, оборудованы автономными дымовыми ИП
      // вне зависимости от этажности здания согласно обновленным требованиям пожарной безопасности

      if (buildingType === 'Ф1.3' || buildingType === 'Ф1.4') {
        // Многоквартирные и одноквартирные жилые дома
        if (useDetailedApartments) {
          // Детальный расчет: каждая комната, кухня и коридор требует автономный ИП
          autonomousDetectors =
            apartment1Room * (1 + 2) + // комнаты + кухня + коридор
            apartment2Room * (2 + 2) +
            apartment3Room * (3 + 2) +
            apartment4Room * (4 + 2) +
            apartment5Room * (5 + 2) +
            apartment6Room * (6 + 2) +
            apartment7Room * (7 + 2)
        } else {
          // Простой режим: автономные ИП для всех жилых помещений
          const autonomousPerApartment = averageRoomsPerApartment + 2 // комнаты + кухня + коридор
          autonomousDetectors = calculatedApartmentsCount * autonomousPerApartment
        }
      } else if (buildingType === 'Ф1.1' || buildingType === 'Ф1.2') {
        // Для больниц, детских садов, гостиниц - автономные ИП в жилых/спальных помещениях
        const estimatedResidentialRooms = Math.ceil(area / 25) // примерная оценка жилых помещений (палаты, номера)
        autonomousDetectors = estimatedResidentialRooms
      }
    }

    // Получаем выбранные модели по категориям
    const selectedModels = {
      detectors: getSelectedModelsByCategory('detectors'),
      controlPanels: getSelectedModelsByCategory('controlPanels'),
      manualCallPoints: getSelectedModelsByCategory('manualCallPoints'),
      sounders: getSelectedModelsByCategory('sounders'),
      powerSupplies: getSelectedModelsByCategory('powerSupplies'),
      // Удаленные категории: cables, mountingMaterials, additionalEquipment
    }

    // Фильтруем результаты в зависимости от выбранных категорий
    const filteredResults = {
      // Основные результаты расчетов
      smokeDetectors: isCategorySelected('detectors') ? smokeDetectors : 0,
      heatDetectors: isCategorySelected('detectors') ? heatDetectors : 0,
      totalDetectors: isCategorySelected('detectors') ? totalDetectors : 0,
      autonomousDetectors: isCategorySelected('detectors') ? autonomousDetectors : 0,
      controlPanels: isCategorySelected('controlPanels') ? controlPanels : 0,
      manualCallPoints: isCategorySelected('manualCallPoints') ? manualCallPoints : 0,
      sounders: isCategorySelected('sounders') ? sounders : 0,
      beacons: isCategorySelected('sounders') ? beacons : 0,
      powerSupplies: isCategorySelected('powerSupplies') ? powerSupplies : 0,
      batteries: isCategorySelected('powerSupplies') ? batteries : 0,
      boxes: Math.ceil((
        (isCategorySelected('detectors') ? totalDetectors : 0) +
        (isCategorySelected('manualCallPoints') ? manualCallPoints : 0) +
        (isCategorySelected('sounders') ? sounders + beacons : 0)
      ) / 2),
      zones,
      loopCable: loopCable,
      powerCable: powerCable,
      sounderCable: sounderCable,
      relayModules: isCategorySelected('controlPanels') ? relayModules : 0,
      shortCircuitIsolators: isCategorySelected('detectors') ? shortCircuitIsolators : 0,
      // Дополнительное оборудование АПС
      lineIsolators: isCategorySelected('detectors') ? lineIsolators : 0,
      addressableMarks4ch: isCategorySelected('controlPanels') ? addressableMarks4ch : 0,
      valveRelayModules1ch: isCategorySelected('controlPanels') ? valveRelayModules1ch : 0,
      valveRelayModules4ch: isCategorySelected('controlPanels') ? valveRelayModules4ch : 0,
      remoteControlModules: isCategorySelected('controlPanels') ? remoteControlModules : 0,
      smokeExhaustStartDevices: isCategorySelected('manualCallPoints') ? smokeExhaustStartDevices : 0,
      securityDetectors: isCategorySelected('detectors') ? securityDetectors : 0,
      beaconsMayak24S: isCategorySelected('sounders') ? beaconsMayak24S : 0,
      beaconsMayak24KP: isCategorySelected('sounders') ? beaconsMayak24KP : 0,
      algorithmType,
      soueType,
      maxZonesPerPanel: ppkpCalculation.maxZonesPerPanel,
      alsLength: Math.ceil(alsLength),
      totalCableLength: totalCableLength,
      conduitLength: conduitLength,
      brackets: brackets,
      anchors: anchors,
      // Дополнительная информация
      aboveGroundArea,
      undergroundArea,
      totalArea,
      adjustedDetectorCoverage,
      useDetailedRooms,
      calculatedRoomsCount,
      calculatedRoomsArea,
      selectedEquipmentModels,
      selectedModels,
      customEquipment,
      // Информация о пожарных отсеках
      fireCompartments,
      centralControlUnit,
      // Статистика выбора
      categoriesSelected: Object.keys(equipmentModels).filter(cat => isCategorySelected(cat)),
      totalModelsSelected: Object.values(selectedEquipmentModels).filter(Boolean).length,
      totalModelsAvailable: Object.keys(selectedEquipmentModels).length,
      // Детали расчета для пояснений
      calculationDetails: {
        smokeDetectorsCalculation: `Площадь ${area}м² ÷ покрытие ${adjustedDetectorCoverage}м²/ИП × ${(calculateDetectorRatio(buildingType).smoke * 100).toFixed(0)}% (${buildingType}) × алгоритм ${actualFireAlgorithm}`,
        heatDetectorsCalculation: `Площадь ${area}м² ÷ покрытие ${adjustedDetectorCoverage}м²/ИП × ${(calculateDetectorRatio(buildingType).heat * 100).toFixed(0)}% (${buildingType}) × алгоритм ${actualFireAlgorithm}`,
        autonomousDetectorsCalculation: (buildingType === 'Ф1.1' || buildingType === 'Ф1.2' || buildingType === 'Ф1.3' || buildingType === 'Ф1.4') ?
          (buildingType === 'Ф1.3' || buildingType === 'Ф1.4' ?
            `${calculatedApartmentsCount} квартир × ${averageRoomsPerApartment + 2} помещений (комнаты+кухня+коридор)` :
            `Площадь ${area}м² ÷ 25м²/помещение для ${buildingType}`) :
          'Не требуются для данного типа здания',
        totalDetectorsCalculation: `Базовый расчет: ${Math.ceil(area / adjustedDetectorCoverage)}шт, итого с корректировками: ${totalDetectors}шт`,
        controlPanelsCalculation: `${zones} зон ÷ ${ppkpCalculation.maxZonesPerPanel} зон/панель + резерв 20% = ${controlPanels}шт`,
        manualCallPointsCalculation: `Периметр ${Math.ceil(Math.sqrt(area) * 4)}м ÷ 50м + ${buildingType.includes('Ф1') ? 'жилые помещения' : 'дополнительные зоны'} = ${manualCallPoints}шт`,
        soundersCalculation: `Площадь ${area}м² ÷ 60м²/извещатель (СП 3.13130.2009) = ${sounders}шт`,
        zonesCalculation: `${totalDetectors} извещателей ÷ ${buildingType.includes('Ф1') ? '1 зона/помещение для жилых' : '10-15 датчиков/зона'} = ${zones} зон`,
        relayModulesCalculation: `Базовый: ${Math.ceil(zones / 8) + controlPanels * 2}шт + управляемые системы: ${controlledSystems.includes('СОУЭ_4-5') ? 'СОУЭ 4-5 (×4), ' : ''}${controlledSystems.includes('АУПТ') ? 'АУПТ (+10), ' : ''}${controlledSystems.includes('ПДЗ') ? 'ПДЗ (+8), ' : ''}${controlledSystems.includes('ОВК') ? 'ОВК (+5)' : ''} = ${relayModules}шт`,
        shortCircuitIsolatorsCalculation: useDetailedRooms
          ? `Детальный режим: лестницы ${stairwellCount * totalFloors}шт + лифтовые холлы ${elevatorHallCount * totalFloors}шт + коридоры ${commonCorridorCount * totalFloors}шт + техпомещения ${techVentilationCount + techElectricalCount + techHeatingCount + techPumpingCount + techTransformerCount + techTelecomCount + techWaterCount + techFloorCount}шт + служебные ${storageCount + wasteRoomCount + securityPostCount + staffRoomCount}шт = ${shortCircuitIsolators}шт`
          : `Общие помещения МОП: ${rooms}шт × 1 изолятор КЗ на помещение = ${shortCircuitIsolators}шт`,
        area,
        adjustedDetectorCoverage,
        buildingType,
        actualFireAlgorithm,
        actualSystemType,
        calculatedApartmentsCount,
        averageRoomsPerApartment
      }
    }

    setResults(filteredResults)
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
            <p style={{textAlign: 'center', color: 'var(--text-white)', opacity: 0.9, marginBottom: '1rem'}}>
              Расчёт системы автоматической пожарной сигнализации
            </p>
            <div style={{
              background: 'rgba(255, 107, 53, 0.1)',
              border: '1px solid rgba(255, 107, 53, 0.3)',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              <h4 style={{color: 'var(--accent-orange)', margin: '0 0 0.5rem 0'}}>🔥 Калькулятор оборудования АПС</h4>
              <p style={{margin: 0, color: 'var(--text-white)', fontSize: '0.9rem'}}>
                Расчет автоматической пожарной сигнализации<br/>
                Соответствует СП 5.13130.2009 · ГОСТ Р 53325-2012 · Система R3-Рубеж
              </p>
            </div>

            {/* Карточка параметров объекта */}
            <div className="portal-card floating">
              <h2 className="portal-subtitle">🏢 Параметры многофункционального жилого комплекса</h2>

              <div className="portal-grid">
                <div className="portal-grid-item">
                  <label>Площадь надземной части (м²)</label>
                  <input
                    type="number"
                    value={aboveGroundArea}
                    onChange={(e) => setAboveGroundArea(Number(e.target.value))}
                    className="portal-input"
                    placeholder="10 секций: жилые + коммерческие + ФОК"
                  />
                </div>

                <div className="portal-grid-item">
                  <label>Площадь подземной автостоянки (м²)</label>
                  <input
                    type="number"
                    value={undergroundArea}
                    onChange={(e) => setUndergroundArea(Number(e.target.value))}
                    className="portal-input"
                    placeholder="Общая подземная парковка + кладовые + техпомещения"
                  />
                </div>

                <div className="portal-grid-item">
                  <label>Количество корпусов</label>
                  <input
                    type="number"
                    value={buildingCorpuses}
                    onChange={(e) => updateCorpusesCount(e.target.value)}
                    className="portal-input"
                    min="1"
                    max="20"
                  />
                  <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginTop: '0.5rem', display: 'block'}}>
                    Общее количество корпусов здания
                  </small>
                  <button
                    onClick={() => setShowCorpusesModal(true)}
                    className="portal-button"
                    style={{marginTop: '1rem', fontSize: '0.9rem', padding: '0.5rem 1rem'}}
                  >
                    🏗️ Настройка этажности корпусов
                  </button>
                </div>


              </div>

              <div style={{textAlign: 'center', margin: '1.5rem 0', color: 'var(--text-white)', background: 'rgba(255, 107, 53, 0.1)', padding: '1rem', borderRadius: '8px'}}>
                <strong>🏢 Общая площадь: {totalArea.toLocaleString()} м²</strong><br/>
                <span style={{fontSize: '0.9rem'}}>
                  Количество этажей: {useDetailedCorpuses ? getTotalCorpusFloors() : buildingCorpuses * aboveGroundFloors} эт. | Подземных: {undergroundFloors} эт. | Квартир: {calculatedApartmentsCount}
                </span>
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
                  <label>Функциональное назначение (СП 484.1311500.2020)</label>
                  <select
                    value={buildingType}
                    onChange={(e) => setBuildingType(e.target.value)}
                    style={{
                      color: '#000000',
                      backgroundColor: '#ffffff',
                      border: '1px solid #cccccc',
                      fontWeight: 'normal',
                      textShadow: 'none',
                      WebkitAppearance: 'menulist',
                      appearance: 'menulist'
                    }}
                  >
                    <option value="Ф1.1" style={{color: '#000000', backgroundColor: '#ffffff'}}>Ф1.1 - Детские сады, больницы, дома престарелых</option>
                    <option value="Ф1.2" style={{color: '#000000', backgroundColor: '#ffffff'}}>Ф1.2 - Гостиницы, общежития, интернаты</option>
                    <option value="Ф1.3" style={{color: '#000000', backgroundColor: '#ffffff'}}>Ф1.3 - Многоквартирные жилые дома</option>
                    <option value="Ф1.4" style={{color: '#000000', backgroundColor: '#ffffff'}}>Ф1.4 - Одноквартирные жилые дома</option>
                    <option value="Ф2.1" style={{color: '#000000', backgroundColor: '#ffffff'}}>Ф2.1 - Театры, кинотеатры, концертные залы</option>
                    <option value="Ф2.2" style={{color: '#000000', backgroundColor: '#ffffff'}}>Ф2.2 - Музеи, выставки, танцевальные залы</option>
                    <option value="Ф2.3" style={{color: '#000000', backgroundColor: '#ffffff'}}>Ф2.3 - Спортивные сооружения</option>
                    <option value="Ф2.4" style={{color: '#000000', backgroundColor: '#ffffff'}}>Ф2.4 - Библиотеки, клубы</option>
                    <option value="Ф3.1" style={{color: '#000000', backgroundColor: '#ffffff'}}>Ф3.1 - Торговые центры, рынки</option>
                    <option value="Ф3.2" style={{color: '#000000', backgroundColor: '#ffffff'}}>Ф3.2 - Предприятия питания</option>
                    <option value="Ф3.3" style={{color: '#000000', backgroundColor: '#ffffff'}}>Ф3.3 - Вокзалы, аэропорты</option>
                    <option value="Ф3.4" style={{color: '#000000', backgroundColor: '#ffffff'}}>Ф3.4 - Поликлиники, амбулатории</option>
                    <option value="Ф3.5" style={{color: '#000000', backgroundColor: '#ffffff'}}>Ф3.5 - Помещения с посетителями</option>
                    <option value="Ф3.6" style={{color: '#000000', backgroundColor: '#ffffff'}}>Ф3.6 - Спортивные залы без трибун</option>
                    <option value="Ф4.1" style={{color: '#000000', backgroundColor: '#ffffff'}}>Ф4.1 - Школы, учебные заведения</option>
                    <option value="Ф4.2" style={{color: '#000000', backgroundColor: '#ffffff'}}>Ф4.2 - Научные учреждения</option>
                    <option value="Ф4.3" style={{color: '#000000', backgroundColor: '#ffffff'}}>Ф4.3 - Органы управления, проектные организации</option>
                    <option value="Ф4.4" style={{color: '#000000', backgroundColor: '#ffffff'}}>Ф4.4 - Пожарные депо, банки</option>
                    <option value="Ф5.1" style={{color: '#000000', backgroundColor: '#ffffff'}}>Ф5.1 - Производственные здания</option>
                    <option value="Ф5.2" style={{color: '#000000', backgroundColor: '#ffffff'}}>Ф5.2 - Складские здания</option>
                    <option value="Ф5.3" style={{color: '#000000', backgroundColor: '#ffffff'}}>Ф5.3 - Сельскохозяйственные здания</option>
                  </select>
                </div>

                {/* Информация об автономных датчиках для Ф1 зданий */}
                {(buildingType === 'Ф1.1' || buildingType === 'Ф1.2' || buildingType === 'Ф1.3' || buildingType === 'Ф1.4') && (
                  <div className="portal-grid-item" style={{gridColumn: 'span 2'}}>
                    <div style={{
                      background: 'rgba(255, 107, 53, 0.1)',
                      border: '1px solid rgba(255, 107, 53, 0.3)',
                      borderRadius: '8px',
                      padding: '1rem',
                      marginTop: '1rem'
                    }}>
                      <h4 style={{color: '#fc8181', margin: '0 0 0.75rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        🚨 КРИТИЧНО: Требования к автономным ИП для Ф1 зданий
                      </h4>
                      <div style={{color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', lineHeight: '1.5'}}>
                        <p style={{margin: '0 0 0.5rem 0'}}>
                          <strong>⚠️ ОБЯЗАТЕЛЬНО:</strong> Все жилые помещения, включая кухни и прихожие, оборудованы автономными дымовыми ИП вне зависимости от этажности здания
                        </p>
                        <p style={{margin: '0 0 0.5rem 0'}}>
                          <strong>💰 ВЛИЯНИЕ НА СТОИМОСТЬ:</strong> Увеличение общей стоимости проекта на 25-40% за счет дополнительных автономных извещателей
                        </p>
                        <p style={{margin: '0'}}>
                          <strong>📊 РАСЧЕТ:</strong> Каждая комната, кухня и коридор требует отдельный автономный дымовой извещатель согласно обновленным требованиям пожарной безопасности
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="portal-grid-item">
                  <button
                    onClick={() => setShowAPSSettingsModal(true)}
                    className="portal-button"
                    style={{
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      color: 'white',
                      border: 'none',
                      padding: '1rem 1.5rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      marginTop: '1.5rem'
                    }}
                  >
                    ⚙️ Расширенные настройки АПС
                  </button>
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
                  {/* Пожарные извещатели */}
                  <div className="portal-grid-item portal-glow">
                    <h4 style={{color: 'var(--accent-orange)', marginBottom: '1rem'}}>🔍 Пожарные извещатели</h4>
                    <div style={{marginBottom: '0.75rem'}}>
                      <p><strong>ИП 212-64-R3 W2.02 Rubezh (дымовой адресный):</strong> {results.smokeDetectors} шт.</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Площадь контроля: до 85 м²<br/>
                        • Чувствительность: 0.05-0.2 дБ/м<br/>
                        • Питание: 24В от АЛС
                      </small>
                      {results.calculationDetails && (
                        <div style={{marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px'}}>
                          <p style={{color: '#68d391', fontSize: '0.8rem', margin: '0', fontWeight: 'bold'}}>📊 Расчет количества:</p>
                          <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', margin: '0.25rem 0 0 0'}}>
                            {results.calculationDetails.smokeDetectorsCalculation}
                          </p>
                        </div>
                      )}
                    </div>
                    <div style={{marginBottom: '0.75rem'}}>
                      <p><strong>ИП 101-1А-R3 Rubezh (тепловой адресный):</strong> {results.heatDetectors} шт.</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Температура срабатывания: 57°C±5°C<br/>
                        • Тип: максимальный А1<br/>
                        • Питание: 24В от АЛС
                      </small>
                      {results.calculationDetails && (
                        <div style={{marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px'}}>
                          <p style={{color: '#f6ad55', fontSize: '0.8rem', margin: '0', fontWeight: 'bold'}}>🌡️ Расчет количества:</p>
                          <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', margin: '0.25rem 0 0 0'}}>
                            {results.calculationDetails.heatDetectorsCalculation}
                          </p>
                        </div>
                      )}
                    </div>
                    {/* Автономные извещатели для Ф1 зданий */}
                    {(results.autonomousDetectors > 0) && (
                      <div style={{marginBottom: '0.75rem'}}>
                        <p><strong>ИП 212-50М2 (автономный дымовой):</strong> {results.autonomousDetectors} шт.</p>
                        <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                          • Автономное питание: батарея 9В<br/>
                          • Звуковой сигнал: 85 дБ на расстоянии 3м<br/>
                          • Обязательны для всех жилых помещений Ф1<br/>
                          • Установка в каждой комнате, кухне, коридоре
                        </small>
                        {results.calculationDetails && (
                          <div style={{marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px'}}>
                            <p style={{color: '#fc8181', fontSize: '0.8rem', margin: '0', fontWeight: 'bold'}}>🏠 Расчет количества:</p>
                            <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', margin: '0.25rem 0 0 0'}}>
                              {results.calculationDetails.autonomousDetectorsCalculation}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                    <div style={{borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '0.75rem'}}>
                      <p><strong>Всего извещателей:</strong> {results.totalDetectors} шт.</p>
                      <p><strong>Алгоритм работы:</strong> {results.algorithmType}</p>
                      {(buildingType === 'Ф1.1' || buildingType === 'Ф1.2' || buildingType === 'Ф1.3' || buildingType === 'Ф1.4') && (
                        <div style={{marginTop: '0.75rem', padding: '0.75rem', background: 'rgba(255, 107, 53, 0.1)', border: '1px solid rgba(255, 107, 53, 0.3)', borderRadius: '8px'}}>
                          <p style={{color: '#fc8181', fontWeight: 'bold', margin: '0 0 0.5rem 0'}}>⚠️ СТОИМОСТЬ АВТОНОМНЫХ ДАТЧИКОВ ДЛЯ Ф1</p>
                          <small style={{color: 'rgba(255,255,255,0.9)', fontSize: '0.85em'}}>
                            • Дополнительная стоимость автономных ИП: +25-40% к базовой стоимости проекта<br/>
                            • Автономные дымовые ИП обязательны для всех жилых помещений (кухни, коридоры) согласно обновленным требованиям<br/>
                            • Средняя стоимость автономного ИП: 800-1500₽/шт (без монтажа)<br/>
                            • Увеличение общей стоимости системы АПС на 15-30% для жилых зданий
                          </small>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Приборы управления */}
                  <div className="portal-grid-item portal-glow">
                    <h4 style={{color: 'var(--accent-orange)', marginBottom: '1rem'}}>🖥️ Приборы управления</h4>
                    <div style={{marginBottom: '0.75rem'}}>
                      <p><strong>ППКОП 011249-2-1 "Рубеж-2ОП" прот.R3:</strong> {results.controlPanels} шт.</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • До 500 пожарных зон<br/>
                        • 2 АЛС × 3000м каждая<br/>
                        • Протокол R3 Rubezh<br/>
                        • Встроенный БИП 24В/2А
                      </small>
                      {results.calculationDetails && (
                        <div style={{marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px'}}>
                          <p style={{color: '#9f7aea', fontSize: '0.8rem', margin: '0', fontWeight: 'bold'}}>🖥️ Расчет количества:</p>
                          <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', margin: '0.25rem 0 0 0'}}>
                            {results.calculationDetails.controlPanelsCalculation}
                          </p>
                        </div>
                      )}
                    </div>
                    <div style={{marginBottom: '0.75rem'}}>
                      <p><strong>РМ-1/РМ-4-R3 (релейные модули):</strong> {results.relayModules} шт.</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Управление внешним оборудованием<br/>
                        • Контакты: 250В/8А
                      </small>
                      {results.calculationDetails?.relayModulesCalculation && (
                        <div style={{
                          background: 'rgba(72, 187, 120, 0.1)',
                          border: '1px solid rgba(72, 187, 120, 0.3)',
                          borderRadius: '6px',
                          padding: '0.5rem',
                          marginTop: '0.5rem',
                          fontSize: '0.8rem'
                        }}>
                          📋 <strong>Детали расчета:</strong><br/>
                          {results.calculationDetails.relayModulesCalculation}
                        </div>
                      )}
                    </div>
                    <div style={{marginBottom: '0.75rem'}}>
                      <p><strong>ИКЗ-R3 (изоляторы короткого замыкания):</strong> {results.shortCircuitIsolators} шт.</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Защита помещений МОП от КЗ<br/>
                        • Контроль адресной линии связи<br/>
                        • Обязательны для каждого помещения МОП
                      </small>
                      {results.calculationDetails?.shortCircuitIsolatorsCalculation && (
                        <div style={{
                          background: 'rgba(72, 187, 120, 0.1)',
                          border: '1px solid rgba(72, 187, 120, 0.3)',
                          borderRadius: '6px',
                          padding: '0.5rem',
                          marginTop: '0.5rem',
                          fontSize: '0.8rem'
                        }}>
                          📋 <strong>Детали расчета:</strong><br/>
                          {results.calculationDetails.shortCircuitIsolatorsCalculation}
                        </div>
                      )}
                    </div>
                    <div style={{marginBottom: '0.75rem'}}>
                      <p><strong>ИЗ-1-R3 (изоляторы линий связи):</strong> {results.lineIsolators} шт.</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Защита адресных линий от обрывов<br/>
                        • Автоматическое восстановление<br/>
                        • 1 изолятор на каждые 10 адресных устройств
                      </small>
                      <div style={{marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px'}}>
                        <p style={{color: '#38b2ac', fontSize: '0.8rem', margin: '0', fontWeight: 'bold'}}>🔗 Расчет ИЗ-1-R3:</p>
                        <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', margin: '0.25rem 0 0 0'}}>
                          ({results.totalDetectors} извещателей + {results.manualCallPoints} ИПР) ÷ 10 = {results.lineIsolators}шт
                        </p>
                      </div>
                    </div>
                    <div style={{marginBottom: '0.75rem'}}>
                      <p><strong>АМ-4-R3 (адресные метки 4-канальные):</strong> {results.addressableMarks4ch} шт.</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Контроль инженерных систем<br/>
                        • 4 канала контроля<br/>
                        • Для АУПТ, ПДЗ, ОВК
                      </small>
                      {(controlledSystems.includes('АУПТ') || controlledSystems.includes('ПДЗ') || controlledSystems.includes('ОВК')) && (
                        <div style={{marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px'}}>
                          <p style={{color: '#38b2ac', fontSize: '0.8rem', margin: '0', fontWeight: 'bold'}}>📊 Расчет АМ-4-R3:</p>
                          <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', margin: '0.25rem 0 0 0'}}>
                            Для инженерных систем: {results.controlPanels} панелей × 2 = {results.addressableMarks4ch}шт
                          </p>
                        </div>
                      )}
                    </div>
                    <div style={{marginBottom: '0.75rem'}}>
                      <p><strong>РМ-1К-R3 (релейный модуль клапанный 1к):</strong> {results.valveRelayModules1ch} шт.</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Управление клапанами АУПТ<br/>
                        • 1 релейный выход<br/>
                        • Контакты: 250В/8А
                      </small>
                      {controlledSystems.includes('АУПТ') && (
                        <div style={{marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px'}}>
                          <p style={{color: '#38b2ac', fontSize: '0.8rem', margin: '0', fontWeight: 'bold'}}>💧 Расчет РМ-1К-R3:</p>
                          <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', margin: '0.25rem 0 0 0'}}>
                            Для АУПТ: {results.zones} зон ÷ 8 = {results.valveRelayModules1ch}шт
                          </p>
                        </div>
                      )}
                    </div>
                    <div style={{marginBottom: '0.75rem'}}>
                      <p><strong>РМ-4К-R3 (релейный модуль клапанный 4к):</strong> {results.valveRelayModules4ch} шт.</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Управление клапанами дымоудаления<br/>
                        • 4 релейных выхода<br/>
                        • Для систем ПДЗ
                      </small>
                      {controlledSystems.includes('ПДЗ') && (
                        <div style={{marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px'}}>
                          <p style={{color: '#38b2ac', fontSize: '0.8rem', margin: '0', fontWeight: 'bold'}}>🌪️ Расчет РМ-4К-R3:</p>
                          <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', margin: '0.25rem 0 0 0'}}>
                            Для ПДЗ: {results.zones} зон ÷ 4 = {results.valveRelayModules4ch}шт
                          </p>
                        </div>
                      )}
                    </div>
                    <div style={{marginBottom: '0.75rem'}}>
                      <p><strong>МДУ-1С-R3 (модуль дистанционного управления):</strong> {results.remoteControlModules} шт.</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Ручной пуск АУПТ и ПДЗ<br/>
                        • Светодиодная индикация<br/>
                        • Степень защиты IP54
                      </small>
                      {(controlledSystems.includes('АУПТ') || controlledSystems.includes('ПДЗ')) && (
                        <div style={{marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px'}}>
                          <p style={{color: '#38b2ac', fontSize: '0.8rem', margin: '0', fontWeight: 'bold'}}>🎛️ Расчет МДУ-1С-R3:</p>
                          <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', margin: '0.25rem 0 0 0'}}>
                            Дистанционное управление: {results.controlPanels} панелей ÷ 2 = {results.remoteControlModules}шт
                          </p>
                        </div>
                      )}
                    </div>
                    <div style={{borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '0.75rem'}}>
                      <p><strong>Зон контроля:</strong> {results.zones} шт.</p>
                      <p><strong>Макс. зон на прибор:</strong> {results.maxZonesPerPanel}</p>
                      {results.calculationDetails && (
                        <div style={{marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px'}}>
                          <p style={{color: '#38b2ac', fontSize: '0.8rem', margin: '0', fontWeight: 'bold'}}>🎯 Расчет зон:</p>
                          <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', margin: '0.25rem 0 0 0'}}>
                            {results.calculationDetails.zonesCalculation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Ручные пожарные извещатели */}
                  <div className="portal-grid-item portal-glow">
                    <h4 style={{color: 'var(--accent-orange)', marginBottom: '1rem'}}>🚨 Ручные извещатели</h4>
                    <div style={{marginBottom: '0.75rem'}}>
                      <p><strong>ИПР 513-3АМ-R3 Rubezh:</strong> {results.manualCallPoints} шт.</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Адресный протокол R3<br/>
                        • Самовозврат после сброса<br/>
                        • Степень защиты: IP54<br/>
                        • Размещение: не более 50м друг от друга
                      </small>
                      {results.calculationDetails && (
                        <div style={{marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px'}}>
                          <p style={{color: '#fc8181', fontSize: '0.8rem', margin: '0', fontWeight: 'bold'}}>🚨 Расчет количества:</p>
                          <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', margin: '0.25rem 0 0 0'}}>
                            {results.calculationDetails.manualCallPointsCalculation}
                          </p>
                        </div>
                      )}
                    </div>
                    <div style={{marginBottom: '0.75rem'}}>
                      <p><strong>УДП 513-11 ИКЗ-R3 "Пуск дымоудаления":</strong> {results.smokeExhaustStartDevices} шт.</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Ручной пуск систем дымоудаления<br/>
                        • Встроенная защита от КЗ<br/>
                        • Красная кнопка с защитным стеклом
                      </small>
                      {controlledSystems.includes('ПДЗ') && (
                        <div style={{marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px'}}>
                          <p style={{color: '#fc8181', fontSize: '0.8rem', margin: '0', fontWeight: 'bold'}}>🌪️ Расчет УДП:</p>
                          <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', margin: '0.25rem 0 0 0'}}>
                            Для ПДЗ: {useDetailedRooms ? `${stairwellCount} лестничных клеток` : `${Math.ceil(Math.sqrt(totalArea) / 10)} зон`} = {results.smokeExhaustStartDevices}шт
                          </p>
                        </div>
                      )}
                    </div>
                    <div style={{marginBottom: '0.75rem'}}>
                      <p><strong>ИО 102-51 НР (черный):</strong> {results.securityDetectors} шт.</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Охранные извещатели<br/>
                        • Контроль технических помещений<br/>
                        • Нормально разомкнутые контакты
                      </small>
                      <div style={{marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px'}}>
                        <p style={{color: '#fc8181', fontSize: '0.8rem', margin: '0', fontWeight: 'bold'}}>🔒 Расчет охранных ИО:</p>
                        <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', margin: '0.25rem 0 0 0'}}>
                          {useDetailedRooms ?
                            `Техпомещения: ${techElectricalCount + techTransformerCount + techTelecomCount}шт` :
                            `10% от общих помещений: ${rooms} × 0.1 = ${results.securityDetectors}шт`
                          }
                        </p>
                      </div>
                    </div>
                    <div style={{borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '0.75rem'}}>
                      <p><strong>Алгоритм:</strong> A (одноразовое срабатывание)</p>
                      <p><strong>Высота установки:</strong> 1.5м от пола</p>
                    </div>
                  </div>

                  {/* Система оповещения и управления эвакуацией */}
                  <div className="portal-grid-item portal-glow">
                    <h4 style={{color: 'var(--accent-orange)', marginBottom: '1rem'}}>📢 Система оповещения (СОУЭ)</h4>
                    <div style={{marginBottom: '0.75rem'}}>
                      <p><strong>ОПОП 124-R3 (светозвуковой):</strong> {results.sounders} шт.</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Звуковое давление: 75-120 дБА<br/>
                        • Световая индикация: красный светодиод<br/>
                        • Адресный протокол R3
                      </small>
                      {results.calculationDetails && (
                        <div style={{marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px'}}>
                          <p style={{color: '#4299e1', fontSize: '0.8rem', margin: '0', fontWeight: 'bold'}}>🔊 Расчет количества:</p>
                          <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', margin: '0.25rem 0 0 0'}}>
                            {results.calculationDetails.soundersCalculation}
                          </p>
                        </div>
                      )}
                    </div>
                    <div style={{marginBottom: '0.75rem'}}>
                      <p><strong>Маяк-24-С (световой):</strong> {results.beaconsMayak24S} шт.</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Световые сигналы: красный стробоскоп<br/>
                        • Питание: 24В<br/>
                        • Стандартная модель для СОУЭ
                      </small>
                      <div style={{marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px'}}>
                        <p style={{color: '#4299e1', fontSize: '0.8rem', margin: '0', fontWeight: 'bold'}}>💡 Расчет Маяк-24-С:</p>
                        <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', margin: '0.25rem 0 0 0'}}>
                          70% от световых: {Math.ceil(results.beacons * 0.7)} из {results.beacons} = {results.beaconsMayak24S}шт
                        </p>
                      </div>
                    </div>
                    <div style={{marginBottom: '0.75rem'}}>
                      <p><strong>Маяк-24-КП (комбинированный):</strong> {results.beaconsMayak24KP} шт.</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Световые сигналы + звуковой сигнал<br/>
                        • Питание: 24В<br/>
                        • Для людей с нарушением слуха
                      </small>
                      <div style={{marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px'}}>
                        <p style={{color: '#4299e1', fontSize: '0.8rem', margin: '0', fontWeight: 'bold'}}>🔊 Расчет Маяк-24-КП:</p>
                        <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', margin: '0.25rem 0 0 0'}}>
                          30% от световых: {Math.ceil(results.beacons * 0.3)} из {results.beacons} = {results.beaconsMayak24KP}шт (комбинированные)
                        </p>
                      </div>
                    </div>
                    <div style={{borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '0.75rem'}}>
                      <p><strong>Тип СОУЭ:</strong> {results.soueType}</p>
                    </div>
                  </div>

                  {/* Источники электропитания */}
                  <div className="portal-grid-item portal-glow">
                    <h4 style={{color: 'var(--accent-orange)', marginBottom: '1rem'}}>⚡ Электропитание</h4>
                    <div style={{marginBottom: '0.75rem'}}>
                      <p><strong>ИВЭПР 24/2,5 RS-R3 Rubezh:</strong> {results.powerSupplies} шт.</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Выходное напряжение: 24В±10%<br/>
                        • Номинальный ток: 2.5А<br/>
                        • Заряд АКБ: автоматический<br/>
                        • Контроль АКБ и сети 220В
                      </small>
                    </div>
                    <div style={{marginBottom: '0.75rem'}}>
                      <p><strong>Аккумулятор Delta DTM 12012 (12В 1.2Ач):</strong> {results.batteries} шт.</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Герметичная необслуживаемая АКБ<br/>
                        • Время резерва: до 12 часов<br/>
                        • Срок службы: 3-5 лет
                      </small>
                    </div>
                  </div>

                  {/* Дополнительное оборудование */}
                  <div className="portal-grid-item portal-glow">
                    <h4 style={{color: 'var(--accent-orange)', marginBottom: '1rem'}}>🔧 Дополнительное оборудование</h4>
                    <div style={{marginBottom: '0.75rem'}}>
                      <p><strong>Метка адресная АМ-1-R3 Rubezh:</strong> {results.boxes} шт.</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Монтажная коробка для АЛС<br/>
                        • Адресный протокол R3<br/>
                        • Контроль целостности шлейфа
                      </small>
                    </div>
                  </div>
                </div>

                {/* Кабельная продукция и монтажные материалы */}
                <div className="portal-card" style={{marginTop: '2rem', background: 'rgba(255, 255, 255, 0.05)'}}>
                  <h3 style={{color: 'var(--accent-red)', marginBottom: '1rem'}}>📡 Кабельная продукция</h3>
                  <div className="portal-grid">
                    <div className="portal-grid-item">
                      <p><strong>КСРЭПнг(А)-FRHF 1×2×0.97мм² (АЛС):</strong> {results.loopCable} м</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Адресные линии связи R3-РУБЕЖ<br/>
                        • Огнестойкость: 180 мин при 750°C<br/>
                        • Макс. длина одной АЛС: {Math.ceil(results.alsLength)} м<br/>
                        • Сечение: 0.97 мм² (экран + 2 жилы)
                      </small>
                    </div>
                    <div className="portal-grid-item">
                      <p><strong>КПРПГнг(А)-FRHF 3×1.50мм² (питание):</strong> {results.powerCable} м</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Питание приборов 220В AC<br/>
                        • Огнестойкость: 180 мин при 750°C<br/>
                        • Номинальное напряжение: 660В<br/>
                        • 3 жилы (L, N, PE)
                      </small>
                    </div>
                    <div className="portal-grid-item">
                      <p><strong>КПСнг(А)-FRHF 1×2×1.5мм² (оповещение):</strong> {results.sounderCable} м</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Линии оповещателей СОУЭ<br/>
                        • Огнестойкость: 180 мин при 750°C<br/>
                        • Рабочее напряжение: 24В DC<br/>
                        • 2 жилы + экран
                      </small>
                    </div>
                  </div>
                </div>

                {/* Монтажные материалы */}
                <div className="portal-card" style={{marginTop: '2rem', background: 'rgba(255, 255, 255, 0.05)'}}>
                  <h3 style={{color: 'var(--accent-red)', marginBottom: '1rem'}}>🔧 Монтажные материалы</h3>
                  <div className="portal-grid">
                    <div className="portal-grid-item">
                      <p><strong>Общая длина кабелей:</strong> {results.totalCableLength} м</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • АЛС: {results.loopCable} м<br/>
                        • Питание: {results.powerCable} м<br/>
                        • Оповещение: {results.sounderCable} м
                      </small>
                    </div>
                    <div className="portal-grid-item">
                      <p><strong>Труба гофрированная ПВХ d20мм:</strong> {results.conduitLength} м</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Защита кабелей при скрытой прокладке<br/>
                        • Диаметр: 20мм (16мм внутренний)<br/>
                        • Материал: ПВХ, самозатухающий<br/>
                        • Расчет: 80% от общей длины кабелей
                      </small>
                    </div>
                    <div className="portal-grid-item">
                      <p><strong>Скоба металлическая СМО 19-26:</strong> {results.brackets} шт.</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Крепление гофротрубы к основанию<br/>
                        • Диаметр зажима: 19-26мм<br/>
                        • Материал: оцинкованная сталь<br/>
                        • Норма: 3 скобы на 1 метр трубы
                      </small>
                    </div>
                    <div className="portal-grid-item">
                      <p><strong>Анкер-клин 6×60мм металлический:</strong> {results.anchors} шт.</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Крепление к бетонным основаниям<br/>
                        • Диаметр: 6мм, длина: 60мм<br/>
                        • Нагрузка на вырыв: до 1.2 кН<br/>
                        • Норма: 3 анкера на 1 метр трубы
                      </small>
                    </div>
                  </div>
                </div>
                {/* Дополнительная статистика и информация */}
                {results.customEquipment.length > 0 && (
                  <div className="portal-card" style={{marginTop: '2rem', background: 'rgba(138, 43, 226, 0.1)', border: '1px solid rgba(138, 43, 226, 0.3)'}}>
                    <h3 style={{color: '#ba68c8', marginBottom: '1rem'}}>🛠️ Дополнительное оборудование (ручное)</h3>
                    <div className="portal-grid">
                      {results.customEquipment.map((item, index) => (
                        <div key={index} className="portal-grid-item">
                          <p><strong>{item.name}:</strong> {item.quantity} {item.unit}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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

      {/* Модальное окно для настройки корпусов */}
      {showCorpusesModal && (
        <div className={`portal-modal ${showCorpusesModal ? 'active' : ''}`}>
          <div className="portal-modal-content">
            <h3 style={{color: 'var(--text-white)', marginBottom: '1.5rem'}}>Настройка этажности корпусов</h3>

            <div style={{maxHeight: '60vh', overflowY: 'auto'}}>
              <div className="portal-grid">
                {Array.from({length: buildingCorpuses}, (_, index) => {
                  const corpusKey = `corpus${index + 1}`
                  const corpusNumber = index + 1
                  return (
                    <div key={corpusKey} className="portal-grid-item">
                      <label>Корпус {corpusNumber} - этажей</label>
                      <input
                        type="number"
                        value={corpusesFloors[corpusKey] || aboveGroundFloors}
                        onChange={(e) => updateCorpusFloors(corpusKey, Number(e.target.value))}
                        className="portal-input"
                        min="1"
                        max="50"
                      />
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginTop: '0.5rem', display: 'block'}}>
                        Этажность {corpusNumber}-го корпуса
                      </small>
                    </div>
                  )
                })}
              </div>

              {/* Поле для подземных этажей */}
              <div style={{marginTop: '1.5rem', padding: '1rem', background: 'rgba(72, 187, 120, 0.1)', borderRadius: '8px', border: '1px solid rgba(72, 187, 120, 0.3)'}}>
                <h4 style={{color: '#68d391', margin: '0 0 1rem 0'}}>🏗️ Общие параметры</h4>
                <div className="portal-grid-item">
                  <label>Подземные этажи</label>
                  <input
                    type="number"
                    value={undergroundFloors}
                    onChange={(e) => setUndergroundFloors(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                    max="10"
                  />
                  <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginTop: '0.5rem', display: 'block'}}>
                    Количество подземных этажей (парковка, технические помещения)
                  </small>
                </div>
              </div>

              <div style={{marginTop: '1.5rem', padding: '1rem', background: 'rgba(255, 107, 53, 0.1)', borderRadius: '8px', border: '1px solid rgba(255, 107, 53, 0.3)'}}>
                <h4 style={{color: 'var(--accent-orange)', margin: '0 0 0.5rem 0'}}>📊 Сводка по корпусам</h4>
                <p style={{color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', margin: '0.25rem 0'}}>
                  Общее количество корпусов: <strong>{buildingCorpuses}</strong>
                </p>
                <p style={{color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', margin: '0.25rem 0'}}>
                  Максимальная этажность: <strong>{getMaxCorpusFloors()}</strong>
                </p>
                <p style={{color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', margin: '0.25rem 0'}}>
                  Суммарная этажность: <strong>{getTotalCorpusFloors()}</strong>
                </p>
              </div>
            </div>

            <div style={{display: 'flex', gap: '1rem', marginTop: '2rem'}}>
              <button
                onClick={() => {
                  setUseDetailedCorpuses(true)
                  setShowCorpusesModal(false)
                }}
                className="portal-button"
                style={{flex: 1}}
              >
                ✅ Применить настройки
              </button>
              <button
                onClick={() => {
                  setUseDetailedCorpuses(false)
                  setShowCorpusesModal(false)
                }}
                className="portal-button"
                style={{flex: 1, background: 'rgba(160, 174, 192, 0.2)', border: '1px solid rgba(160, 174, 192, 0.3)'}}
              >
                ❌ Отменить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно для настроек АПС */}
      {showAPSSettingsModal && (
        <div className="portal-modal active">
          <div className="portal-modal-content" style={{maxWidth: '900px', maxHeight: '80vh', overflowY: 'auto'}}>
            <h3 style={{color: 'var(--text-white)', marginBottom: '1.5rem', textAlign: 'center'}}>
              ⚙️ Расширенные настройки системы АПС
            </h3>

            {/* Параметры СП 484.1311500.2020 */}
            <div style={{marginBottom: '2rem'}}>
              <h4 style={{color: 'var(--accent-orange)', marginBottom: '1rem'}}>⚖️ Параметры СП 484.1311500.2020</h4>
              <div className="portal-grid">
                <div className="portal-grid-item">
                  <label>Типы систем АПС (множественный выбор)</label>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    padding: '0.75rem'
                  }}>
                    {[
                      {value: 'адресная', label: 'Адресная'},
                      {value: 'безадресная', label: 'Безадресная'},
                      {value: 'адресно-аналоговая', label: 'Адресно-аналоговая'}
                    ].map(option => (
                      <div key={option.value} style={{marginBottom: '0.5rem', display: 'flex', alignItems: 'center'}}>
                        <input
                          type="checkbox"
                          id={`system-${option.value}`}
                          checked={systemTypes.includes(option.value)}
                          onChange={() => toggleArrayOption(systemTypes, setSystemTypes, option.value)}
                          style={{marginRight: '0.5rem'}}
                        />
                        <label htmlFor={`system-${option.value}`} style={{color: 'var(--text-white)', cursor: 'pointer'}}>
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <small style={{
                    color: '#68d391',
                    fontSize: '0.8rem',
                    marginTop: '0.5rem',
                    display: 'block',
                    background: 'rgba(72, 187, 120, 0.1)',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid rgba(72, 187, 120, 0.3)'
                  }}>
                    💡 Выбрано: {systemTypes.join(', ')}
                    <br/><strong>КРИТИЧНОЕ ВЛИЯНИЕ НА РАСЧЕТ:</strong>
                    {systemTypes.includes('адресная') ?
                      ' ⚡ АДРЕСНАЯ СИСТЕМА: Увеличивает стоимость оборудования на 40-60%, но снижает количество ложных срабатываний на 85%. Требует специализированного кабеля и увеличивает сложность монтажа. Обязательна для зданий выше 28м и площадью более 3000м².' : ''}
                    {systemTypes.includes('безадресная') ?
                      ' ⚠️ БЕЗАДРЕСНАЯ СИСТЕМА: Экономия 30-50% на оборудовании, но увеличение количества датчиков на 20-30% для компенсации низкой точности локализации. Высокий риск ложных срабатываний. Ограничения по СП 484.1311500.2020 для крупных объектов.' : ''}
                    {systemTypes.includes('адресно-аналоговая') ?
                      ' 🔥 АДРЕСНО-АНАЛОГОВАЯ: Премиум-класс с увеличением стоимости на 80-120%. Автоматическая компенсация запыления датчиков, программируемые пороги чувствительности. Критично для объектов с высокими требованиями к безопасности.' : ''}
                  </small>
                </div>
                <div className="portal-grid-item">
                  <label>Алгоритмы формирования сигнала ПОЖАР (множественный выбор)</label>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    padding: '0.75rem'
                  }}>
                    {[
                      {value: 'A', label: 'Алгоритм A - 1 дымовой ИЛИ 2 тепловых'},
                      {value: 'B', label: 'Алгоритм B - 2 любых извещателя'},
                      {value: 'C', label: 'Алгоритм C - 1 любой извещатель'}
                    ].map(option => (
                      <div key={option.value} style={{marginBottom: '0.5rem', display: 'flex', alignItems: 'center'}}>
                        <input
                          type="checkbox"
                          id={`algorithm-${option.value}`}
                          checked={fireAlgorithms.includes(option.value)}
                          onChange={() => toggleArrayOption(fireAlgorithms, setFireAlgorithms, option.value)}
                          style={{marginRight: '0.5rem'}}
                        />
                        <label htmlFor={`algorithm-${option.value}`} style={{color: 'var(--text-white)', cursor: 'pointer'}}>
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <small style={{
                    color: '#68d391',
                    fontSize: '0.8rem',
                    marginTop: '0.5rem',
                    display: 'block',
                    background: 'rgba(72, 187, 120, 0.1)',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid rgba(72, 187, 120, 0.3)'
                  }}>
                    💡 Выбрано: {fireAlgorithms.join(', ')}
                    <br/><strong>КРИТИЧНОЕ ВЛИЯНИЕ НА РАСЧЕТ:</strong>
                    {fireAlgorithms.includes('A') ?
                      ' 🔥 АЛГОРИТМ A (1 дымовой ИЛИ 2 тепловых): Стандарт для жилых зданий Ф1. Снижение количества дымовых датчиков на 15-25% при установке тепловых дублеров. РИСК: возможны задержки обнаружения в больших помещениях. Экономия 10-20% на оборудовании.' : ''}
                    {fireAlgorithms.includes('B') ?
                      ' ⚡ АЛГОРИТМ B (2 извещателя): Золотой стандарт надежности. Увеличение количества датчиков на 40-60% для обеспечения дублирования. КРИТИЧНО: обязателен для объектов с массовым пребыванием людей. Увеличение стоимости на 35-45%.' : ''}
                    {fireAlgorithms.includes('C') ?
                      ' 🚨 АЛГОРИТМ C (1 извещатель): Максимальная скорость реагирования для критичных объектов (больницы, детсады). ОПАСНОСТЬ: высокий риск ложных срабатываний. Требует датчики высшего класса. Увеличение стоимости датчиков на 60-80%.' : ''}
                  </small>
                </div>
                <div className="portal-grid-item">
                  <label>Планировка определена (множественный выбор)</label>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    padding: '0.75rem'
                  }}>
                    {[
                      {value: 'defined', label: 'Планировка определена'},
                      {value: 'undefined', label: 'Планировка не определена'}
                    ].map(option => (
                      <div key={option.value} style={{marginBottom: '0.5rem', display: 'flex', alignItems: 'center'}}>
                        <input
                          type="checkbox"
                          id={`planning-${option.value}`}
                          checked={planningOptions.includes(option.value)}
                          onChange={() => toggleArrayOption(planningOptions, setPlanningOptions, option.value)}
                          style={{marginRight: '0.5rem'}}
                        />
                        <label htmlFor={`planning-${option.value}`} style={{color: 'var(--text-white)', cursor: 'pointer'}}>
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <small style={{
                    color: '#68d391',
                    fontSize: '0.8rem',
                    marginTop: '0.5rem',
                    display: 'block',
                    background: 'rgba(72, 187, 120, 0.1)',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid rgba(72, 187, 120, 0.3)'
                  }}>
                    💡 Выбрано: {planningOptions.map(opt => opt === 'defined' ? 'Определена' : 'Не определена').join(', ')}
                    <br/><strong>КРИТИЧНОЕ ВЛИЯНИЕ НА РАСЧЕТ:</strong>
                    {planningOptions.includes('defined') ?
                      ' 📐 ПЛАНИРОВКА ОПРЕДЕЛЕНА: Точный расчет по СП 484.1311500.2020 с оптимизацией количества датчиков на 15-30%. Расчет зон контроля по фактическому количеству помещений (макс. 5 помещений на ЗКПС). ЭКОНОМИЯ: 20-35% на оборудовании за счет точного позиционирования.' : ''}
                    {planningOptions.includes('undefined') ?
                      ' ⚠️ ПЛАНИРОВКА НЕ ОПРЕДЕЛЕНА: Расчет по нормативной плотности размещения (1 датчик на 85м²). Увеличение количества оборудования на 25-40% для создания запаса надежности. РИСК: возможна нехватка датчиков при нестандартной планировке. Обязательно увеличение запаса кабеля на 15%.' : ''}
                  </small>
                </div>
                <div className="portal-grid-item">
                  <label>Типы СОУЭ (множественный выбор)</label>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    padding: '0.75rem'
                  }}>
                    {[
                      {value: 'basic', label: 'СОУЭ 1-3 типа'},
                      {value: 'intelligent', label: 'СОУЭ 4-5 типа'}
                    ].map(option => (
                      <div key={option.value} style={{marginBottom: '0.5rem', display: 'flex', alignItems: 'center'}}>
                        <input
                          type="checkbox"
                          id={`soue-${option.value}`}
                          checked={soueOptions.includes(option.value)}
                          onChange={() => toggleArrayOption(soueOptions, setSoueOptions, option.value)}
                          style={{marginRight: '0.5rem'}}
                        />
                        <label htmlFor={`soue-${option.value}`} style={{color: 'var(--text-white)', cursor: 'pointer'}}>
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <small style={{
                    color: '#68d391',
                    fontSize: '0.8rem',
                    marginTop: '0.5rem',
                    display: 'block',
                    background: 'rgba(72, 187, 120, 0.1)',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid rgba(72, 187, 120, 0.3)'
                  }}>
                    💡 Выбрано: {soueOptions.map(opt => opt === 'basic' ? 'Базовое' : 'Интеллектуальное').join(', ')}
                    <br/><strong>КРИТИЧНОЕ ВЛИЯНИЕ НА РАСЧЕТ:</strong>
                    {soueOptions.includes('basic') ?
                      ' 🔊 СОУЭ 1-3 ТИПА: Базовое звуковое оповещение (тональные сигналы). Стандартное количество звуковых извещателей по СП 3.13130.2009 - 1 на 60м² при высоте потолков до 6м. ЭКОНОМИЯ: базовая стоимость оборудования. ОГРАНИЧЕНИЯ: не подходит для шумных производств.' : ''}
                    {soueOptions.includes('intelligent') ?
                      ' 📢 СОУЭ 4-5 ТИПА: Речевое оповещение с индивидуальными сообщениями по зонам. Увеличение количества оборудования на 60-80%: требуются усилители мощности, блоки управления речевыми сообщениями, громкоговорители вместо сирен. КРИТИЧНО: обязательно для зданий выше 28м и объектов Ф2-Ф4. Увеличение стоимости в 3-5 раз.' : ''}
                  </small>
                </div>
                <div className="portal-grid-item">
                  <label>Типы АУПТ (множественный выбор)</label>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    padding: '0.75rem'
                  }}>
                    {[
                      {value: 'none', label: 'Без АУПТ'},
                      {value: 'water', label: 'Водяное пожаротушение'},
                      {value: 'gas', label: 'Газовое пожаротушение'},
                      {value: 'powder', label: 'Порошковое пожаротушение'},
                      {value: 'aerosol', label: 'Аэрозольное пожаротушение'}
                    ].map(option => (
                      <div key={option.value} style={{marginBottom: '0.5rem', display: 'flex', alignItems: 'center'}}>
                        <input
                          type="checkbox"
                          id={`aupt-${option.value}`}
                          checked={auptOptions.includes(option.value)}
                          onChange={() => toggleArrayOption(auptOptions, setAuptOptions, option.value)}
                          style={{marginRight: '0.5rem'}}
                        />
                        <label htmlFor={`aupt-${option.value}`} style={{color: 'var(--text-white)', cursor: 'pointer'}}>
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <small style={{
                    color: '#68d391',
                    fontSize: '0.8rem',
                    marginTop: '0.5rem',
                    display: 'block',
                    background: 'rgba(72, 187, 120, 0.1)',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid rgba(72, 187, 120, 0.3)'
                  }}>
                    💡 Выбрано: {auptOptions.map(opt =>
                      opt === 'none' ? 'Без АУПТ' :
                      opt === 'water' ? 'Водяное' :
                      opt === 'gas' ? 'Газовое' :
                      opt === 'powder' ? 'Порошковое' :
                      'Аэрозольное').join(', ')}
                    <br/><strong>КРИТИЧНОЕ ВЛИЯНИЕ НА РАСЧЕТ:</strong>
                    {auptOptions.includes('none') ? ' 🚫 БЕЗ АУПТ: Только пожарная сигнализация. Стандартное количество датчиков без дублирования. Базовая стоимость проекта.' : ''}
                    {auptOptions.includes('water') ? ' 💧 ВОДЯНОЕ АУПТ: КРИТИЧНО увеличивает сложность: требуется 100% дублирование датчиков (алгоритм B), дополнительные релейные модули управления насосными станциями, запорной арматурой. Увеличение количества оборудования АПС в 2-2.5 раза.' : ''}
                    {auptOptions.includes('gas') ? ' ⚡ ГАЗОВОЕ АУПТ: МАКСИМАЛЬНАЯ сложность: тройное дублирование датчиков, система блокировки вентиляции, герметизации помещений, управления газовыми клапанами. Увеличение оборудования АПС в 3-4 раза. ОПАСНОСТЬ: требует эвакуацию за 30 сек.' : ''}
                    {auptOptions.includes('powder') ? ' 🌪️ ПОРОШКОВОЕ АУПТ: Специализированные датчики с защитой от ложных срабатываний, модули управления генераторами. Увеличение датчиков в 2 раза + специальные релейные модули.' : ''}
                    {auptOptions.includes('aerosol') ? ' 🌨️ АЭРОЗОЛЬНОЕ АУПТ: Компактные системы с минимальным увеличением АПС оборудования (+30-50%). Автономные генераторы с интеграцией через релейные выходы.' : ''}
                  </small>
                </div>
                <div className="portal-grid-item">
                  <label>Управляемые системы (множественный выбор)</label>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    padding: '0.75rem'
                  }}>
                    {[
                      {value: 'СОУЭ_1-3', label: 'СОУЭ 1-3 типа'},
                      {value: 'СОУЭ_4-5', label: 'СОУЭ 4-5 типа'},
                      {value: 'АУПТ', label: 'Автоматическое пожаротушение'},
                      {value: 'ПДЗ', label: 'Противодымная защита'},
                      {value: 'ОВК', label: 'Общеобменная вентиляция'}
                    ].map(option => (
                      <div key={option.value} style={{marginBottom: '0.5rem', display: 'flex', alignItems: 'center'}}>
                        <input
                          type="checkbox"
                          id={`controlled-${option.value}`}
                          checked={controlledSystems.includes(option.value)}
                          onChange={() => toggleArrayOption(controlledSystems, setControlledSystems, option.value)}
                          style={{marginRight: '0.5rem'}}
                        />
                        <label htmlFor={`controlled-${option.value}`} style={{color: 'var(--text-white)', cursor: 'pointer'}}>
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <small style={{
                    color: '#68d391',
                    fontSize: '0.8rem',
                    marginTop: '0.5rem',
                    display: 'block',
                    background: 'rgba(72, 187, 120, 0.1)',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid rgba(72, 187, 120, 0.3)'
                  }}>
                    💡 Выбрано: {controlledSystems.join(', ')}
                    <br/><strong>КРИТИЧНОЕ ВЛИЯНИЕ НА РАСЧЕТ:</strong>
                    {controlledSystems.includes('СОУЭ_1-3') ? ' 🔊 УПРАВЛЕНИЕ СОУЭ 1-3: Базовые релейные выходы для звуковых извещателей. +2-4 релейных модуля на систему. Стандартная интеграция.' : ''}
                    {controlledSystems.includes('СОУЭ_4-5') ? ' 📢 УПРАВЛЕНИЕ СОУЭ 4-5: КРИТИЧНО усложняет проект: требуются промышленные контроллеры управления речевыми зонами, интеграция с микрофонными консолями, блоки селекции зон. Увеличение количества модулей ввода-вывода в 3-5 раз.' : ''}
                    {controlledSystems.includes('АУПТ') ? ' 💧 УПРАВЛЕНИЕ АУПТ: МАКСИМАЛЬНАЯ сложность: модули управления насосами, контроль давления, управление задвижками, блокировка лифтов. Требует 8-12 дополнительных релейных модулей + модули контроля аналоговых сигналов. Резервирование каналов связи.' : ''}
                    {controlledSystems.includes('ПДЗ') ? ' 🌪️ УПРАВЛЕНИЕ ПДЗ: Управление дымоудалением и подпором воздуха: пуск вентиляторов, управление клапанами дымоудаления, контроль давления в шахтах. +6-10 релейных модулей. Обязательно резервированные каналы.' : ''}
                    {controlledSystems.includes('ОВК') ? ' ❄️ УПРАВЛЕНИЕ ОВК: Отключение общеобменной вентиляции, управление противопожарными клапанами. +3-6 релейных модулей в зависимости от количества систем вентиляции.' : ''}
                  </small>
                </div>
              </div>
            </div>


            {/* Основные параметры */}
            <div style={{marginBottom: '2rem'}}>
              <h4 style={{color: 'var(--accent-orange)', marginBottom: '1rem'}}>Основные параметры</h4>
              <div className="portal-grid">
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
            </div>

            {/* Выбор оборудования для расчета */}
            <div style={{marginBottom: '2rem'}}>
              <h4 style={{color: 'var(--accent-orange)', marginBottom: '1rem'}}>Выбор оборудования для расчета</h4>

              {/* Отображаем каждую категорию оборудования */}
              {Object.entries(equipmentModels).map(([categoryKey, categoryData]) => {
                const categoryModels = Object.keys(categoryData.models)
                const selectedCount = categoryModels.filter(model => selectedEquipmentModels[model]).length
                const allSelected = selectedCount === categoryModels.length

                return (
                  <div key={categoryKey} style={{
                    marginBottom: '1.5rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255, 107, 53, 0.2)'
                  }}>
                    {/* Заголовок категории с кнопкой "Выбрать все" */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem'
                    }}>
                      <h5 style={{
                        color: 'var(--text-white)',
                        margin: 0,
                        fontSize: '1.1rem',
                        fontWeight: '600'
                      }}>
                        {categoryData.name} ({selectedCount}/{categoryModels.length})
                      </h5>

                      <div style={{display: 'flex', gap: '0.5rem'}}>
                        <button
                          onClick={() => selectAllModelsInCategory(categoryKey)}
                          className="portal-button"
                          style={{
                            background: allSelected
                              ? 'linear-gradient(135deg, #27ae60, #229954)'
                              : 'linear-gradient(135deg, #3498db, #2980b9)',
                            padding: '0.5rem 1rem',
                            fontSize: '0.85rem',
                            opacity: allSelected ? 0.7 : 1
                          }}
                          disabled={allSelected}
                        >
                          ✅ Выбрать все
                        </button>

                        <button
                          onClick={() => deselectAllModelsInCategory(categoryKey)}
                          className="portal-button"
                          style={{
                            background: selectedCount === 0
                              ? 'linear-gradient(135deg, #95a5a6, #7f8c8d)'
                              : 'linear-gradient(135deg, #e74c3c, #c0392b)',
                            padding: '0.5rem 1rem',
                            fontSize: '0.85rem',
                            opacity: selectedCount === 0 ? 0.7 : 1
                          }}
                          disabled={selectedCount === 0}
                        >
                          ❌ Отменить все
                        </button>
                      </div>
                    </div>

                    {/* Список моделей в категории */}
                    <div className="portal-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'}}>
                      {Object.entries(categoryData.models).map(([modelKey, modelName]) => (
                        <div key={modelKey} className="portal-grid-item">
                          <label style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.75rem',
                            cursor: 'pointer',
                            padding: '0.75rem',
                            background: selectedEquipmentModels[modelKey]
                              ? 'rgba(255, 107, 53, 0.1)'
                              : 'rgba(255, 255, 255, 0.03)',
                            borderRadius: '8px',
                            border: selectedEquipmentModels[modelKey]
                              ? '1px solid rgba(255, 107, 53, 0.3)'
                              : '1px solid rgba(255, 255, 255, 0.1)',
                            transition: 'all 0.3s ease'
                          }}>
                            <input
                              type="checkbox"
                              checked={selectedEquipmentModels[modelKey] || false}
                              onChange={(e) => setSelectedEquipmentModels({
                                ...selectedEquipmentModels,
                                [modelKey]: e.target.checked
                              })}
                              style={{
                                width: '18px',
                                height: '18px',
                                accentColor: 'var(--accent-orange)',
                                marginTop: '2px'
                              }}
                            />
                            <span style={{
                              color: 'var(--text-white)',
                              fontSize: '0.9rem',
                              lineHeight: '1.4',
                              fontWeight: selectedEquipmentModels[modelKey] ? '500' : '400'
                            }}>
                              {modelName}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Дополнительное оборудование */}
            <div style={{marginBottom: '2rem'}}>
              <h4 style={{color: 'var(--accent-orange)', marginBottom: '1rem'}}>Дополнительное оборудование</h4>
              {customEquipment.map((item, index) => (
                <div key={index} className="portal-grid" style={{marginBottom: '1rem', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px'}}>
                  <div className="portal-grid-item">
                    <label>Название</label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => {
                        const updated = [...customEquipment]
                        updated[index].name = e.target.value
                        setCustomEquipment(updated)
                      }}
                      className="portal-input"
                      placeholder="Название оборудования"
                    />
                  </div>
                  <div className="portal-grid-item">
                    <label>Количество</label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const updated = [...customEquipment]
                        updated[index].quantity = Number(e.target.value)
                        setCustomEquipment(updated)
                      }}
                      className="portal-input"
                      min="1"
                    />
                  </div>
                  <div className="portal-grid-item">
                    <label>Единица измерения</label>
                    <input
                      type="text"
                      value={item.unit}
                      onChange={(e) => {
                        const updated = [...customEquipment]
                        updated[index].unit = e.target.value
                        setCustomEquipment(updated)
                      }}
                      className="portal-input"
                      placeholder="шт., м, кг"
                    />
                  </div>
                  <div className="portal-grid-item" style={{display: 'flex', alignItems: 'end'}}>
                    <button
                      onClick={() => {
                        const updated = customEquipment.filter((_, i) => i !== index)
                        setCustomEquipment(updated)
                      }}
                      className="portal-button"
                      style={{
                        background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                        padding: '0.75rem 1rem',
                        fontSize: '0.9rem'
                      }}
                    >
                      🗑️ Удалить
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setCustomEquipment([...customEquipment, {name: '', quantity: 1, unit: 'шт.'}])}
                className="portal-button"
                style={{
                  background: 'linear-gradient(135deg, #27ae60, #229954)',
                  marginTop: '1rem'
                }}
              >
                ➕ Добавить оборудование
              </button>
            </div>

            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem'}}>
              <button
                onClick={() => setShowAPSSettingsModal(false)}
                className="portal-button"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-orange), var(--accent-red))'
                }}
              >
                ✅ Применить настройки
              </button>
              <button
                onClick={() => setShowAPSSettingsModal(false)}
                className="portal-button secondary"
              >
                ❌ Отмена
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