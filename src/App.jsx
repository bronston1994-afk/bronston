import { useState } from 'react'
import './App.css'

function App() {
  // Основные состояния здания
  const [aboveGroundArea, setAboveGroundArea] = useState(5000) // Надземная часть
  const [undergroundArea, setUndergroundArea] = useState(0) // Подземная автостоянка
  const [aboveGroundFloors, setAboveGroundFloors] = useState(10) // Этажность
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
  const [buildingType, setBuildingType] = useState('residential_apartment')
  const [detectorCoverage, setDetectorCoverage] = useState(85) // Согласно СП 5.13130.2009
  const [manualCallDistance, setManualCallDistance] = useState(50) // Норматив
  const [sounderCoverage, setSounderCoverage] = useState(15)
  const [cableReserve, setCableReserve] = useState(15) // Стандартный запас кабеля
  const [zoneSize, setZoneSize] = useState(300) // ЗКПС стандартный размер

  // Результаты и состояния интерфейса
  const [results, setResults] = useState(null)
  const [showApartmentsModal, setShowApartmentsModal] = useState(false)
  const [showRoomsModal, setShowRoomsModal] = useState(false)
  const [showAPSSettingsModal, setShowAPSSettingsModal] = useState(false)
  const [activeSection, setActiveSection] = useState('calculator') // Навигация портала

  // Структура конкретных моделей оборудования по типам
  const equipmentModels = {
    detectors: {
      name: '🔍 Пожарные извещатели',
      models: {
        // Дымовые извещатели
        'ip212-64-r3': 'ИП 212-64-R3 W2.02 Rubezh (дымовой адресный)',
        'ip212-141': 'ИП 212-141 (дымовой неадресный)',
        'ip212-50m2': 'ИП 212-50М2 (дымовой радиоканальный)',
        'ip212-45': 'ИП 212-45 "Пожтехника" (дымовой оптико-электронный)',
        'ip212-87': 'ИП 212-87 "Аргус-Спектр" (дымовой адресный)',
        // Тепловые извещатели
        'ip101-1a-r3': 'ИП 101-1А-R3 Rubezh (тепловой адресный)',
        'ip101-10': 'ИП 101-10 (тепловой неадресный)',
        'ip101-23': 'ИП 101-23-А1R "Аргус-Спектр" (тепловой адресный)',
        'ip101-1a': 'ИП 101-1А "Пожтехника" (тепловой максимальный)',
        // Комбинированные извещатели
        'ip212-50m': 'ИП 212-50М "Болид" (дымовой+тепловой)',
        'ip212-142': 'ИП 212-142 (дымовой+тепловой неадресный)'
      }
    },
    controlPanels: {
      name: '🖥️ Приборы управления',
      models: {
        // ППКОП серии Рубеж
        'rubezh-2op': 'ППКОП 011249-2-1 "Рубеж-2ОП" прот.R3',
        'rubezh-aars': 'ППКОП "Рубеж-ААРС" (адресно-аналоговый)',
        'rubezh-op-plus': 'ППКОП "Рубеж-ОП-ПЛЮС" (расширенная версия)',
        // Болид серия
        'bolid-c2000': 'С2000-КДЛ (контроллер двухпроводной линии)',
        'bolid-c2000-4': 'С2000-4 (прибор приемно-контрольный)',
        'bolid-c2000-m': 'С2000-М (контроллер управления)',
        // Аргус-Спектр
        'argus-as': 'AS-03 "Аргус-Спектр" (адресная система)',
        'argus-as-08': 'AS-08 "Аргус-Спектр" (8 шлейфов)',
        // Релейные модули
        'rm-1-r3': 'РМ-1-R3 (релейный модуль 1 канал)',
        'rm-4-r3': 'РМ-4-R3 (релейный модуль 4 канала)',
        'rm-8-r3': 'РМ-8-R3 (релейный модуль 8 каналов)',
        // Модули расширения
        'mio-1-r3': 'МИО-1-R3 (модуль ввода-вывода)',
        'mi-4-r3': 'МИ-4-R3 (модуль индикации)',
        'mu-4-r3': 'МУ-4-R3 (модуль управления)'
      }
    },
    manualCallPoints: {
      name: '🚨 Ручные извещатели',
      models: {
        // Адресные ИПР
        'ipr513-3am-r3': 'ИПР 513-3АМ-R3 Rubezh (адресный)',
        'ipr513-10a': 'ИПР 513-10А "Аргус-Спектр" (адресный)',
        'ipr513-3a': 'ИПР 513-3А "Болид" (адресный)',
        // Неадресные ИПР
        'ipr513-3m': 'ИПР 513-3М (неадресный)',
        'ipr513-1m': 'ИПР 513-1М (неадресный стандартный)',
        'ipr513-2m': 'ИПР 513-2М (неадресный с световой индикацией)',
        // Специальные ИПР
        'ipr-ex': 'ИПР-Ex (взрывозащищенный)',
        'ipr513-10': 'ИПР 513-10 (влагозащищенный IP65)',
        'ipr513-11': 'ИПР 513-11 (морозостойкий до -40°C)',
        'ipr513-marine': 'ИПР 513-МР (морского исполнения)'
      }
    },
    sounders: {
      name: '📢 Система оповещения',
      models: {
        // Адресные оповещатели
        'opop124-r3': 'ОПОП 124-R3 (светозвуковой адресный)',
        'opop125-r3': 'ОПОП 125-R3 (речевой адресный)',
        'mayak-12-r3': 'МАЯК-12-R3 (световой адресный)',
        // Световые оповещатели
        'mayak-24-st': 'МАЯК-24-СТ (световой стробоскопический)',
        'mayak-12-k': 'МАЯК-12-К (световой проблесковый)',
        'mayak-220': 'МАЯК-220 (световой сетевой)',
        'mayak-24-z': 'МАЯК-24-З (зуммер со световой индикацией)',
        // Звуковые оповещатели
        'ton-3': 'ТОН-3 (звуковой сирена)',
        'revun': 'РЕВУН (звуковой модулированный)',
        'signal-20': 'СИГНАЛ-20 (звуковой громкоговоритель)',
        'gong': 'ГОНГ (звуковой традиционный)',
        // Речевые оповещатели
        'opop-1': 'ОПОП-1 (речевой оповещатель)',
        'rec-1': 'РЕЧ-1 (речевой блок управления)',
        'micro-30': 'МИКРО-30 (громкоговоритель речевой)',
        // Комбинированные
        'soue-combo': 'СОУЭ-КОМБО (свето-звуко-речевой)',
        'alarm-universal': 'СИГНАЛ-УНИВЕРСАЛ (настраиваемый тип сигнала)'
      }
    },
    powerSupplies: {
      name: '🔌 Источники питания',
      models: {
        // Источники питания Рубеж
        'ivepr-24-r3': 'ИВЭПР 24/2,5 RS-R3 Rubezh (источник питания)',
        'bip-12-0.5': 'БИП-12-0,5 (блок питания 12В 0,5А)',
        'bip-24-1': 'БИП-24-1 (блок питания 24В 1А)',
        'bip-24-2': 'БИП-24-2 (блок питания 24В 2А)',
        'bip-24-5': 'БИП-24-5 (блок питания 24В 5А)',
        // Источники питания Болид
        'rip-12-rs': 'РИП-12 исп.01 (источник питания резервированный)',
        'rip-24-rs': 'РИП-24 исп.01 (источник питания 24В)',
        'ups-s24-0.5': 'ИБП-С24-0,5 (источник бесперебойного питания)',
        // Аккумуляторы
        'ups-battery-7ah': 'Аккумулятор Delta DTM 12012 (12В 1.2Ач)',
        'ups-battery-17ah': 'Аккумулятор Delta DTM 12017 (12В 1.7Ач)',
        'ups-battery-7ah-big': 'Аккумулятор Delta DTM 1207 (12В 7Ач)',
        'ups-battery-17ah-big': 'Аккумулятор Delta DTM 1217 (12В 17Ач)',
        'ups-battery-40ah': 'Аккумулятор Delta GEL 12-40 (12В 40Ач)',
        // Преобразователи
        'dc12-24': 'ПН 12/24-1 (преобразователь напряжения)',
        'dc24-12': 'ПН 24/12-2 (преобразователь обратный)'
      }
    },
    cables: {
      name: '🔗 Кабельная продукция',
      models: {
        // АЛС кабели (адресные линии связи)
        'ksrepng-frhf': 'КСРЭПнг(А)-FRHF 1×2×0.97мм² (АЛС кабель)',
        'ksrepng-frhf-08': 'КСРЭПнг(А)-FRHF 1×2×0.8мм² (АЛС облегченный)',
        'ksrepng-frhf-12': 'КСРЭПнг(А)-FRHF 1×2×1.2мм² (АЛС усиленный)',
        // Силовые кабели
        'kprpng-frhf': 'КПРПГнг(А)-FRHF 3×1.5мм² (силовой кабель)',
        'vvgng-ls-3x15': 'ВВГнг-LS 3×1.5мм² (питающий кабель)',
        'vvgng-ls-3x25': 'ВВГнг-LS 3×2.5мм² (питающий усиленный)',
        'vvgng-ls-5x25': 'ВВГнг-LS 5×2.5мм² (трехфазный с заземлением)',
        // Кабели оповещения (СОУЭ)
        'kpsng-frhf': 'КПСнг(А)-FRHF 1×2×1.5мм² (кабель оповещения)',
        'kpsng-frhf-075': 'КПСнг(А)-FRHF 1×2×0.75мм² (оповещение легкий)',
        'kpsng-frhf-4x15': 'КПСнг(А)-FRHF 4×1.5мм² (многоканальное оповещение)',
        // Витые пары и слаботочные
        'j-y-st-y-2x2x08': 'J-Y(St)Y 2×2×0.8мм² (витая пара экранированная)',
        'utp-cat5e': 'UTP Cat.5e 4×2×0.5мм² (витая пара стандартная)',
        'ftp-cat6': 'FTP Cat.6 4×2×0.57мм² (витая пара экранированная)',
        // Коаксиальные кабели
        'rg6-frhf': 'RG-6нг(А)-FRHF (коаксиальный 75 Ом)',
        'rg11-frhf': 'RG-11нг(А)-FRHF (коаксиальный усиленный)',
        // Оптоволоконные кабели
        'ok-frhf-4': 'ОК-НРСЛТнг(А)-FRHF 4ОВ (оптоволокно 4 жилы)',
        'ok-frhf-8': 'ОК-НРСЛТнг(А)-FRHF 8ОВ (оптоволокно 8 жил)'
      }
    },
    mountingMaterials: {
      name: '🔧 Монтажные материалы',
      models: {
        // Гофротрубы и каналы
        'conduit-pvc-16': 'Труба гофрированная ПВХ d16мм (легкая серия)',
        'conduit-pvc-20': 'Труба гофрированная ПВХ d20мм (стандартная)',
        'conduit-pvc-25': 'Труба гофрированная ПВХ d25мм (усиленная)',
        'conduit-pvc-32': 'Труба гофрированная ПВХ d32мм (тяжелая серия)',
        'cable-channel-25x16': 'Кабель-канал 25×16мм (пластиковый)',
        'cable-channel-40x25': 'Кабель-канал 40×25мм (усиленный)',
        'cable-channel-60x40': 'Кабель-канал 60×40мм (магистральный)',
        // Крепежные элементы для труб
        'bracket-smo-16-20': 'Скоба металлическая СМО 16-20 (для d16-20мм)',
        'bracket-smo-19-26': 'Скоба металлическая СМО 19-26 (для d20-25мм)',
        'bracket-smo-25-32': 'Скоба металлическая СМО 25-32 (для d25-32мм)',
        'bracket-plastic-20': 'Скоба пластиковая d20мм (быстрый монтаж)',
        'bracket-plastic-25': 'Скоба пластиковая d25мм (усиленная)',
        // Анкерные болты и дюбели
        'anchor-6x60': 'Анкер-клин 6×60мм металлический (для бетона)',
        'anchor-8x80': 'Анкер-клин 8×80мм усиленный (для тяжелых нагрузок)',
        'anchor-10x100': 'Анкер-клин 10×100мм сверхпрочный',
        'dowel-6x40': 'Дюбель пластиковый 6×40мм (для кирпича)',
        'dowel-8x50': 'Дюбель пластиковый 8×50мм (универсальный)',
        'dowel-nail-6x60': 'Дюбель-гвоздь 6×60мм (быстрый монтаж)',
        // Монтажные коробки и боксы
        'junction-box': 'Коробка монтажная УК-2П (стандартная)',
        'junction-box-3p': 'Коробка монтажная УК-3П (увеличенная)',
        'junction-box-ip65': 'Коробка монтажная IP65 (влагозащищенная)',
        'distribution-box-12': 'Бокс распределительный на 12 модулей',
        'distribution-box-24': 'Бокс распределительный на 24 модуля',
        'wall-box-detector': 'Коробка настенная для извещателей',
        // Стяжки и организаторы кабелей
        'cable-ties': 'Стяжки кабельные 4.8×300мм (стандартные)',
        'cable-ties-heavy': 'Стяжки кабельные 7.6×400мм (усиленные)',
        'cable-ties-releasable': 'Стяжки кабельные многоразовые',
        'spiral-wrap-10': 'Спиральная обмотка d10мм (защита кабелей)',
        'spiral-wrap-15': 'Спиральная обмотка d15мм (для пучков)',
        'cable-holder-adhesive': 'Держатель кабеля самоклеящийся',
        // Маркировка и идентификация
        'cable-marker-set': 'Маркеры кабельные самоклеящиеся (комплект)',
        'label-printer-tape': 'Лента для принтера этикеток (12мм)',
        'identification-sleeve': 'Кабельные муфты маркировочные',
        'warning-tape': 'Лента сигнальная «КАБЕЛЬ» (для укладки)',
        // Изоляционные и защитные материалы
        'insulation-tape': 'Изолента ПВХ черная 19мм×20м',
        'heat-shrink-tube': 'Термоусадочная трубка набор (разные диаметры)',
        'cable-protection-sleeve': 'Защитная оплетка кабеля самозакрывающаяся',
        'fireproof-mastic': 'Мастика огнезащитная для кабельных проходок',
        'fireproof-pillow': 'Подушки огнезащитные для кабельных каналов'
      }
    },
    additionalEquipment: {
      name: '🔬 Дополнительное оборудование',
      models: {
        // Изоляторы и согласующие устройства
        'isolator-iz-1b-r3': 'Изолятор шлейфа ИЗ-1Б-R3 (автоматическое восстановление)',
        'isolator-iz-2b-r3': 'Изолятор шлейфа ИЗ-2Б-R3 (двойной)',
        'terminator-r3': 'Терминатор R3 (оконечное сопротивление АЛС)',
        'repeater-r3': 'Повторитель R3 (усиление сигнала АЛС)',
        // Адресные метки и модули
        'addressable-mark-am1-r3': 'Метка адресная АМ-1-R3 (контроль целостности)',
        'addressable-mark-am2-r3': 'Метка адресная АМ-2-R3 (с индикацией)',
        'input-module-vm-r3': 'Модуль ввода ВМ-R3 (контроль сухих контактов)',
        'output-module-um-r3': 'Модуль управления УМ-R3 (реле выходы)',
        // GSM и сетевые модули
        'gsm-module-r3': 'GSM-модуль R3 (передача на пульт охраны)',
        'ethernet-module-r3': 'Ethernet-модуль R3 (сетевое подключение)',
        'radio-module-r3': 'Радио-модуль R3 (беспроводная связь)',
        'wifi-module-r3': 'WiFi-модуль R3 (беспроводной интернет)',
        // Пульты управления и индикации
        'control-panel-pdu-r3': 'Пульт дистанционного управления ПДУ-R3',
        'indicator-panel-pi-r3': 'Пульт индикации ПИ-R3 (графический)',
        'mimic-panel-large': 'Мнемосхема объекта (большая настенная)',
        'led-indicator-matrix': 'Светодиодная матрица индикации зон',
        // Системы передачи извещений
        'radio-channel-r3': 'Радиоканал R3 (передача на 40км)',
        'optic-channel-r3': 'Оптический канал R3 (по оптоволокну)',
        'pstn-communicator': 'Коммуникатор PSTN (по телефонной линии)',
        'ip-communicator': 'IP-коммуникатор (по интернет)',
        // Резервное и аварийное питание
        'ups-1000va': 'ИБП 1000ВА (для серверного оборудования)',
        'ups-3000va': 'ИБП 3000ВА (для крупных систем)',
        'generator-interface': 'Модуль сопряжения с генератором',
        'voltage-monitor': 'Контроллер напряжения сети (мониторинг 220В)',
        // Системы автоматического пожаротушения
        'fire-pump-controller': 'Контроллер пожарного насоса',
        'smoke-extraction-controller': 'Контроллер дымоудаления',
        'fire-damper-controller': 'Контроллер противопожарных клапанов',
        'sprinkler-valve-controller': 'Контроллер спринклерных задвижек'
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

  const calculateEquipment = () => {
    // Используем общую площадь для расчётов
    const area = totalArea

    // Расчёт зон контроля (ЗКПС) - основа для всех расчётов
    const zones = Math.ceil(area / zoneSize)

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

    // Расчёт ППКОП R3-РУБЕЖ-2ОП для многосекционного жилого комплекса
    // По ТЗ: в каждом пожарном отсеке - 1 прибор "R3-Рубеж-2ОП"
    const maxZonesPerPanel = 500 // Максимум зон на один прибор
    const maxLineLength = 3000 // Максимальная длина одной АЛС в метрах
    const linesPerPanel = 2 // Количество АЛС на один прибор

    // Для жилого комплекса из 10 секций + подземная автостоянка
    // По ТЗ: 11 пожарных отсеков требуют 11 приборов управления
    // (fireCompartments уже объявлен выше)

    // Расчёт по зонам с учетом сложности объекта
    const panelsByZones = Math.ceil(zones / maxZonesPerPanel)

    // Расчёт по длине линий для многосекционного комплекса
    // Увеличенные коэффициенты для сложной архитектуры
    const aboveGroundLineLength = Math.sqrt(aboveGroundArea) * Math.sqrt(aboveGroundFloors) * 2.2 // Сложная геометрия
    const undergroundLineLength = Math.sqrt(undergroundArea) * undergroundFloors * 2.5 // Подземная парковка
    const estimatedLineLength = aboveGroundLineLength + undergroundLineLength
    const requiredLines = Math.ceil(estimatedLineLength / maxLineLength)
    const panelsByLineLength = Math.ceil(requiredLines / linesPerPanel)

    // Итоговое количество приборов (минимум по количеству пожарных отсеков)
    const controlPanels = Math.max(fireCompartments, panelsByZones, panelsByLineLength)

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

    // Источники питания ИВЭПР 24/2,5 RS-R3 для многосекционного комплекса
    const powerSupplies = controlPanels // По одному источнику на каждый ППКОП
    const batteries = powerSupplies * 2 // По 2 аккумулятора Delta DTM 12012 (12В 1.2Ач)

    // ЦПИУ "Рубеж" исп.02 - верхний уровень управления
    // Расчет ЦПИУ с учетом сложности объекта и количества пожарных отсеков
    let centralControlUnit = Math.ceil(controlPanels / 16) || 1 // 1 ЦПИУ на каждые 16 ППКОП

    // Дополнительные ЦПИУ для крупных объектов с резервированием
    if (fireCompartments > 8 || area > 15000) {
      centralControlUnit = Math.max(centralControlUnit, 2) // Минимум 2 ЦПИУ для крупных объектов
    }

    // Релейные модули для управления сложными системами
    const relayModules = Math.ceil(zones / 8) + controlPanels * 2 // РМ-1/РМ-4 + дополнительные для лифтов, ПДВ, ОВК

    // Монтажные коробки - для всех устройств на шлейфах
    const boxes = Math.ceil((totalDetectors + manualCallPoints + sounders + beacons) / 2)

    // Расчёт кабеля с учётом требований АЛС R3-РУБЕЖ-2ОП
    // Увеличенный запас для сложных объектов
    const adjustedCableReserve = fireCompartments > 5 ? cableReserve + 5 : cableReserve
    const cableMultiplier = 1 + (adjustedCableReserve / 100) // Запас кабеля

    // КСРЭПнг(А)-FRHF для АЛС (адресные линии связи)
    // Длина АЛС ≤ 3000м на линию, 2 линии на прибор
    const alsLength = Math.min(estimatedLineLength, maxLineLength * linesPerPanel)

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

    // Получаем выбранные модели по категориям
    const selectedModels = {
      detectors: getSelectedModelsByCategory('detectors'),
      controlPanels: getSelectedModelsByCategory('controlPanels'),
      manualCallPoints: getSelectedModelsByCategory('manualCallPoints'),
      sounders: getSelectedModelsByCategory('sounders'),
      powerSupplies: getSelectedModelsByCategory('powerSupplies'),
      cables: getSelectedModelsByCategory('cables'),
      mountingMaterials: getSelectedModelsByCategory('mountingMaterials'),
      additionalEquipment: getSelectedModelsByCategory('additionalEquipment')
    }

    // Фильтруем результаты в зависимости от выбранных категорий
    const filteredResults = {
      // Основные результаты расчетов
      smokeDetectors: isCategorySelected('detectors') ? smokeDetectors : 0,
      heatDetectors: isCategorySelected('detectors') ? heatDetectors : 0,
      totalDetectors: isCategorySelected('detectors') ? totalDetectors : 0,
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
      loopCable: isCategorySelected('cables') ? loopCable : 0,
      powerCable: isCategorySelected('cables') ? powerCable : 0,
      sounderCable: isCategorySelected('cables') ? sounderCable : 0,
      relayModules: isCategorySelected('controlPanels') ? relayModules : 0,
      algorithmType,
      soueType,
      maxZonesPerPanel,
      alsLength: Math.ceil(alsLength),
      totalCableLength: isCategorySelected('cables') ? totalCableLength : 0,
      conduitLength: isCategorySelected('mountingMaterials') ? conduitLength : 0,
      brackets: isCategorySelected('mountingMaterials') ? brackets : 0,
      anchors: isCategorySelected('mountingMaterials') ? anchors : 0,
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
      totalModelsAvailable: Object.keys(selectedEquipmentModels).length
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
                  <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginTop: '0.5rem', display: 'block'}}>
                    Включает: квартиры, ПОН, торговлю, ресторан, ФОК
                  </small>
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
                  <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginTop: '0.5rem', display: 'block'}}>
                    ПО № 11: паркинг, кладовые, технические, мусорные
                  </small>
                </div>

                <div className="portal-grid-item">
                  <label>Максимальная этажность секций</label>
                  <input
                    type="number"
                    value={aboveGroundFloors}
                    onChange={(e) => setAboveGroundFloors(Number(e.target.value))}
                    className="portal-input"
                    min="1"
                  />
                  <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginTop: '0.5rem', display: 'block'}}>
                    Максимальная этажность здания
                  </small>
                </div>

                <div className="portal-grid-item">
                  <label>Подземные этажи</label>
                  <input
                    type="number"
                    value={undergroundFloors}
                    onChange={(e) => setUndergroundFloors(Number(e.target.value))}
                    className="portal-input"
                    min="0"
                  />
                  <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginTop: '0.5rem', display: 'block'}}>
                    Количество подземных этажей (парковка, технические помещения)
                  </small>
                </div>
              </div>

              <div style={{textAlign: 'center', margin: '1.5rem 0', color: 'var(--text-white)', background: 'rgba(255, 107, 53, 0.1)', padding: '1rem', borderRadius: '8px'}}>
                <strong>🏢 Общая площадь: {totalArea.toLocaleString()} м²</strong><br/>
                <span style={{fontSize: '0.9rem'}}>
                  Макс. этажность: {aboveGroundFloors} эт. | Подземных: {undergroundFloors} эт. | Квартир: {calculatedApartmentsCount}
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
                    </div>
                    <div style={{marginBottom: '0.75rem'}}>
                      <p><strong>ИП 101-1А-R3 Rubezh (тепловой адресный):</strong> {results.heatDetectors} шт.</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Температура срабатывания: 57°C±5°C<br/>
                        • Тип: максимальный А1<br/>
                        • Питание: 24В от АЛС
                      </small>
                    </div>
                    <div style={{borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '0.75rem'}}>
                      <p><strong>Всего извещателей:</strong> {results.totalDetectors} шт.</p>
                      <p><strong>Алгоритм работы:</strong> {results.algorithmType}</p>
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
                    </div>
                    <div style={{marginBottom: '0.75rem'}}>
                      <p><strong>РМ-1/РМ-4-R3 (релейные модули):</strong> {results.relayModules} шт.</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Управление внешним оборудованием<br/>
                        • Контакты: 250В/8А
                      </small>
                    </div>
                    <div style={{borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '0.75rem'}}>
                      <p><strong>Зон контроля:</strong> {results.zones} шт.</p>
                      <p><strong>Макс. зон на прибор:</strong> {results.maxZonesPerPanel}</p>
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
                    </div>
                    <div style={{marginBottom: '0.75rem'}}>
                      <p><strong>МАЯК-24-СТ (световой):</strong> {results.beacons} шт.</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Световые сигналы: красный стробоскоп<br/>
                        • Питание: 24В<br/>
                        • Для людей с нарушением слуха
                      </small>
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
                    <div style={{marginBottom: '0.75rem'}}>
                      <p><strong>Изолятор шлейфа ИЗ-1Б-R3:</strong> {Math.ceil(results.zones/2)} шт.</p>
                      <small style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.85em'}}>
                        • Изоляция поврежденных участков АЛС<br/>
                        • Автоматическое восстановление
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

      {/* Модальное окно для настроек АПС */}
      {showAPSSettingsModal && (
        <div className="portal-modal active">
          <div className="portal-modal-content" style={{maxWidth: '900px', maxHeight: '80vh', overflowY: 'auto'}}>
            <h3 style={{color: 'var(--text-white)', marginBottom: '1.5rem', textAlign: 'center'}}>
              ⚙️ Расширенные настройки системы АПС
            </h3>

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