import { useState } from 'react'

function App() {
  const [area, setArea] = useState(1000)
  const [floors, setFloors] = useState(3)
  const [rooms, setRooms] = useState(25)
  const [height, setHeight] = useState(3.0)
  const [buildingType, setBuildingType] = useState('office')
  const [detectorCoverage, setDetectorCoverage] = useState(25)
  const [manualCallDistance, setManualCallDistance] = useState(50)
  const [sounderCoverage, setSounderCoverage] = useState(15)
  const [cableReserve, setCableReserve] = useState(15)
  const [zoneSize, setZoneSize] = useState(500)
  const [results, setResults] = useState(null)

  const calculateEquipment = () => {
    // Расчёт датчиков
    const totalDetectors = Math.ceil(area / detectorCoverage)
    
    // Разделение на типы датчиков в зависимости от типа здания
    let smokeDetectors, heatDetectors
    switch(buildingType) {
      case 'warehouse':
        smokeDetectors = Math.ceil(totalDetectors * 0.3)
        heatDetectors = Math.ceil(totalDetectors * 0.7)
        break
      case 'industrial':
        smokeDetectors = Math.ceil(totalDetectors * 0.4)
        heatDetectors = Math.ceil(totalDetectors * 0.6)
        break
      default:
        smokeDetectors = Math.ceil(totalDetectors * 0.8)
        heatDetectors = Math.ceil(totalDetectors * 0.2)
    }

    // Расчёт зон
    const zones = Math.ceil(area / zoneSize)
    
    // Приёмно-контрольные приборы (1 на 4 зоны, минимум 1)
    const controlPanels = Math.max(1, Math.ceil(zones / 4))

    // Ручные извещатели (по периметру + в помещениях)
    const perimeter = 2 * Math.sqrt(area * 2) // примерный периметр
    const manualCallPoints = Math.ceil(perimeter / manualCallDistance) + Math.ceil(rooms / 4)

    // Оповещатели
    const sounderArea = Math.PI * Math.pow(sounderCoverage, 2)
    const sounders = Math.ceil(area / sounderArea)
    const beacons = Math.ceil(sounders * 0.5) // 50% световых от звуковых

    // Источники питания и аккумуляторы
    const powerSupplies = Math.ceil(zones / 2)
    const batteries = powerSupplies * 2 // по 2 аккумулятора на ИП

    // Монтажные коробки (по 1 на каждые 2 устройства)
    const boxes = Math.ceil((totalDetectors + manualCallPoints + sounders + beacons) / 2)

    // Расчёт кабеля
    const avgCableRun = Math.sqrt(area) // средняя длина прокладки
    const cableMultiplier = 1 + (cableReserve / 100)
    
    const loopCable = Math.ceil(totalDetectors * avgCableRun * 0.8 * cableMultiplier)
    const powerCable = Math.ceil(powerSupplies * avgCableRun * 0.6 * cableMultiplier)
    const sounderCable = Math.ceil(sounders * avgCableRun * 0.7 * cableMultiplier)

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
      sounderCable
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
      boxSizing: 'border-box'
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
              <label style={styles.label}>Общая площадь объекта (м²)</label>
              <input 
                type="number" 
                value={area} 
                onChange={(e) => setArea(Number(e.target.value))}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Количество этажей</label>
              <input 
                type="number" 
                value={floors} 
                onChange={(e) => setFloors(Number(e.target.value))}
                style={styles.input}
              />
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
              <label style={styles.label}>Тип объекта</label>
              <select 
                value={buildingType} 
                onChange={(e) => setBuildingType(e.target.value)}
                style={styles.input}
              >
                <option value="office">Офисное здание</option>
                <option value="warehouse">Складское помещение</option>
                <option value="residential">Жилое здание</option>
                <option value="industrial">Производственное</option>
                <option value="commercial">Торговое</option>
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
                    <span>Дымовые датчики:</span>
                    <span style={styles.resultValue}>{results.smokeDetectors} шт.</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Тепловые датчики:</span>
                    <span style={styles.resultValue}>{results.heatDetectors} шт.</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Общее количество:</span>
                    <span style={styles.resultValue}>{results.totalDetectors} шт.</span>
                  </div>
                </div>

                <div style={styles.resultCard}>
                  <h3 style={styles.resultCardTitle}>🚨 Устройства управления и оповещения</h3>
                  <div style={styles.resultItem}>
                    <span>Приёмно-контрольные приборы:</span>
                    <span style={styles.resultValue}>{results.controlPanels} шт.</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Извещатели ручные (ИПР):</span>
                    <span style={styles.resultValue}>{results.manualCallPoints} шт.</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Звуковые оповещатели:</span>
                    <span style={styles.resultValue}>{results.sounders} шт.</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Световые оповещатели:</span>
                    <span style={styles.resultValue}>{results.beacons} шт.</span>
                  </div>
                </div>

                <div style={styles.resultCard}>
                  <h3 style={styles.resultCardTitle}>🔌 Кабельная продукция</h3>
                  <div style={styles.resultItem}>
                    <span>Кабель шлейфа (КПСнг(А)-FRLS 1x2x0.75):</span>
                    <span style={styles.resultValue}>{results.loopCable} м</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Кабель питания (ВВГнг(А)-LS 3x1.5):</span>
                    <span style={styles.resultValue}>{results.powerCable} м</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Кабель оповещения (КПСнг(А)-FRLS 1x2x1.5):</span>
                    <span style={styles.resultValue}>{results.sounderCable} м</span>
                  </div>
                </div>

                <div style={styles.resultCard}>
                  <h3 style={styles.resultCardTitle}>💰 Дополнительное оборудование</h3>
                  <div style={styles.resultItem}>
                    <span>Источники питания:</span>
                    <span style={styles.resultValue}>{results.powerSupplies} шт.</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Аккумуляторы 12В 7Ач:</span>
                    <span style={styles.resultValue}>{results.batteries} шт.</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Монтажные коробки:</span>
                    <span style={styles.resultValue}>{results.boxes} шт.</span>
                  </div>
                  <div style={styles.resultItem}>
                    <span>Расчётное количество зон:</span>
                    <span style={styles.resultValue}>{results.zones} зон</span>
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
