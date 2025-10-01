// Шаг мастера: Детальные параметры здания (перенесено из старого интерфейса)
import React, { useState } from 'react'

const BuildingStep = ({ data, onUpdate, errors }) => {
  const [activeTab, setActiveTab] = useState('basic')
  const [useDetailedApartments, setUseDetailedApartments] = useState(false)
  const [useDetailedRooms, setUseDetailedRooms] = useState(false)
  const [useDetailedCorpuses, setUseDetailedCorpuses] = useState(false)

  const handleInputChange = (field, value) => {
    onUpdate('building', { ...data.building, [field]: value })
  }

  const handleComplexChange = (category, field, value) => {
    onUpdate('building', {
      ...data.building,
      [category]: {
        ...data.building[category],
        [field]: value
      }
    })
  }

  const buildingTypes = [
    { code: 'Ф1.1', name: 'Детские дошкольные учреждения' },
    { code: 'Ф1.2', name: 'Гостиницы, общежития' },
    { code: 'Ф1.3', name: 'Многоквартирные жилые дома' },
    { code: 'Ф1.4', name: 'Одноквартирные жилые дома' },
    { code: 'Ф2.1', name: 'Театры, кинотеатры' },
    { code: 'Ф3.1', name: 'Больницы' },
    { code: 'Ф4.1', name: 'Школы' },
    { code: 'Ф5.1', name: 'Административные здания' },
    { code: 'Ф5.2', name: 'Банки' },
    { code: 'Ф5.3', name: 'Объекты торговли' }
  ]

  const tabs = [
    { id: 'basic', title: 'Основные', icon: '🏢' },
    { id: 'apartments', title: 'Квартиры', icon: '🏠' },
    { id: 'rooms', title: 'Помещения', icon: '📦' },
    { id: 'technical', title: 'Технические', icon: '⚙️' },
    { id: 'corpuses', title: 'Корпуса', icon: '🏗️' }
  ]

  // Установка значений по умолчанию
  React.useEffect(() => {
    if (!data.building) {
      onUpdate('building', {
        // Основные параметры
        aboveGroundArea: 5000,
        undergroundArea: 0,
        aboveGroundFloors: 10,
        undergroundFloors: 0,
        apartmentsCount: 100,
        ceilingHeight: 3.0,
        buildingType: 'Ф1.3',
        rooms: 50,

        // Детализированные квартиры
        apartments: {
          apartment1Room: 25,
          apartment2Room: 50,
          apartment3Room: 20,
          apartment4Room: 5,
          apartment5Room: 0,
          apartment6Room: 0,
          apartment7Room: 0
        },

        // Общие помещения
        commonRooms: {
          stairwellCount: 20,
          stairwellArea: 15,
          elevatorHallCount: 10,
          elevatorHallArea: 25,
          commonCorridorCount: 35,
          commonCorridorArea: 120
        },

        // Технические помещения
        technical: {
          ventilationCount: 15,
          ventilationArea: 35,
          electricalCount: 12,
          electricalArea: 20,
          heatingCount: 8,
          heatingArea: 50,
          pumpingCount: 4,
          pumpingArea: 30,
          transformerCount: 2,
          transformerArea: 80,
          telecomCount: 10,
          telecomArea: 15,
          waterCount: 6,
          waterArea: 25,
          techFloorCount: 3,
          techFloorArea: 500
        },

        // Хранение и парковка
        storage: {
          storageCount: 800,
          storageArea: 4,
          wasteRoomCount: 11,
          wasteRoomArea: 12,
          parkingUndergroundCount: 1,
          parkingUndergroundArea: 8000
        },

        // Охрана и эксплуатация
        security: {
          securityPostCount: 6,
          securityPostArea: 8,
          staffRoomCount: 4,
          staffRoomArea: 12
        },

        // Корпуса
        corpuses: {
          buildingCorpuses: 3,
          corpusesFloors: {
            corpus1: 16,
            corpus2: 18,
            corpus3: 20
          }
        }
      })
    }
  }, [])

  const renderBasicTab = () => (
    <div className="tab-content">
      <div className="form-section">
        <h3>🏢 Основные параметры здания</h3>

        <div className="form-row">
          <div className="form-group">
            <label>Площадь надземной части (м²) *</label>
            <input
              type="number"
              value={data.building?.aboveGroundArea || 5000}
              onChange={(e) => handleInputChange('aboveGroundArea', Number(e.target.value))}
              className={errors?.aboveGroundArea ? 'error' : ''}
              min="1"
            />
            {errors?.aboveGroundArea && (
              <span className="error-message">{errors.aboveGroundArea}</span>
            )}
          </div>

          <div className="form-group">
            <label>Площадь подземной автостоянки (м²)</label>
            <input
              type="number"
              value={data.building?.undergroundArea || 0}
              onChange={(e) => handleInputChange('undergroundArea', Number(e.target.value))}
              min="0"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Количество надземных этажей *</label>
            <input
              type="number"
              value={data.building?.aboveGroundFloors || 10}
              onChange={(e) => handleInputChange('aboveGroundFloors', Number(e.target.value))}
              className={errors?.aboveGroundFloors ? 'error' : ''}
              min="1"
            />
          </div>

          <div className="form-group">
            <label>Количество подземных этажей</label>
            <input
              type="number"
              value={data.building?.undergroundFloors || 0}
              onChange={(e) => handleInputChange('undergroundFloors', Number(e.target.value))}
              min="0"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Высота потолков (м)</label>
            <input
              type="number"
              step="0.1"
              value={data.building?.ceilingHeight || 3.0}
              onChange={(e) => handleInputChange('ceilingHeight', Number(e.target.value))}
              min="2.5"
              max="6"
            />
          </div>

          <div className="form-group">
            <label>Функциональное назначение *</label>
            <select
              value={data.building?.buildingType || 'Ф1.3'}
              onChange={(e) => handleInputChange('buildingType', e.target.value)}
              className={errors?.buildingType ? 'error' : ''}
            >
              {buildingTypes.map(type => (
                <option key={type.code} value={type.code}>
                  {type.code} - {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Количество квартир/помещений</label>
            <input
              type="number"
              value={data.building?.apartmentsCount || 100}
              onChange={(e) => handleInputChange('apartmentsCount', Number(e.target.value))}
              min="1"
            />
          </div>

          <div className="form-group">
            <label>Общее количество помещений</label>
            <input
              type="number"
              value={data.building?.rooms || 50}
              onChange={(e) => handleInputChange('rooms', Number(e.target.value))}
              min="1"
            />
          </div>
        </div>
      </div>

      <div className="step-summary">
        <h4>📊 Итого по зданию:</h4>
        <div className="summary-grid">
          <div className="summary-item">
            <span>Общая площадь:</span>
            <span>{((data.building?.aboveGroundArea || 0) + (data.building?.undergroundArea || 0)).toLocaleString()} м²</span>
          </div>
          <div className="summary-item">
            <span>Общая этажность:</span>
            <span>{(data.building?.aboveGroundFloors || 0) + (data.building?.undergroundFloors || 0)} эт.</span>
          </div>
          <div className="summary-item">
            <span>Объем здания:</span>
            <span>{(((data.building?.aboveGroundArea || 0) + (data.building?.undergroundArea || 0)) * (data.building?.ceilingHeight || 3)).toLocaleString()} м³</span>
          </div>
        </div>
      </div>
    </div>
  )

  const renderApartmentsTab = () => (
    <div className="tab-content">
      <div className="form-section">
        <h3>🏠 Детализация квартир по комнатности</h3>

        <div className="toggle-section">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={useDetailedApartments}
              onChange={(e) => setUseDetailedApartments(e.target.checked)}
            />
            <span>Использовать детальный расчет по комнатности</span>
          </label>
        </div>

        {useDetailedApartments && (
          <>
            <div className="form-row">
              <div className="form-group">
                <label>1-комнатные квартиры</label>
                <input
                  type="number"
                  value={data.building?.apartments?.apartment1Room || 25}
                  onChange={(e) => handleComplexChange('apartments', 'apartment1Room', Number(e.target.value))}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>2-комнатные квартиры</label>
                <input
                  type="number"
                  value={data.building?.apartments?.apartment2Room || 50}
                  onChange={(e) => handleComplexChange('apartments', 'apartment2Room', Number(e.target.value))}
                  min="0"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>3-комнатные квартиры</label>
                <input
                  type="number"
                  value={data.building?.apartments?.apartment3Room || 20}
                  onChange={(e) => handleComplexChange('apartments', 'apartment3Room', Number(e.target.value))}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>4-комнатные квартиры</label>
                <input
                  type="number"
                  value={data.building?.apartments?.apartment4Room || 5}
                  onChange={(e) => handleComplexChange('apartments', 'apartment4Room', Number(e.target.value))}
                  min="0"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>5-комнатные квартиры</label>
                <input
                  type="number"
                  value={data.building?.apartments?.apartment5Room || 0}
                  onChange={(e) => handleComplexChange('apartments', 'apartment5Room', Number(e.target.value))}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>6-комнатные квартиры</label>
                <input
                  type="number"
                  value={data.building?.apartments?.apartment6Room || 0}
                  onChange={(e) => handleComplexChange('apartments', 'apartment6Room', Number(e.target.value))}
                  min="0"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>7-комнатные квартиры</label>
                <input
                  type="number"
                  value={data.building?.apartments?.apartment7Room || 0}
                  onChange={(e) => handleComplexChange('apartments', 'apartment7Room', Number(e.target.value))}
                  min="0"
                />
              </div>
            </div>

            <div className="apartments-summary">
              <h4>📊 Итого квартир:</h4>
              <div className="summary-grid">
                <div className="summary-item">
                  <span>Всего квартир:</span>
                  <span>{
                    (data.building?.apartments?.apartment1Room || 0) +
                    (data.building?.apartments?.apartment2Room || 0) +
                    (data.building?.apartments?.apartment3Room || 0) +
                    (data.building?.apartments?.apartment4Room || 0) +
                    (data.building?.apartments?.apartment5Room || 0) +
                    (data.building?.apartments?.apartment6Room || 0) +
                    (data.building?.apartments?.apartment7Room || 0)
                  }</span>
                </div>
                <div className="summary-item">
                  <span>Средняя комнатность:</span>
                  <span>{
                    (() => {
                      const total = (data.building?.apartments?.apartment1Room || 0) +
                        (data.building?.apartments?.apartment2Room || 0) +
                        (data.building?.apartments?.apartment3Room || 0) +
                        (data.building?.apartments?.apartment4Room || 0) +
                        (data.building?.apartments?.apartment5Room || 0) +
                        (data.building?.apartments?.apartment6Room || 0) +
                        (data.building?.apartments?.apartment7Room || 0);

                      if (total === 0) return '0';

                      const weighted = (data.building?.apartments?.apartment1Room || 0) * 1 +
                        (data.building?.apartments?.apartment2Room || 0) * 2 +
                        (data.building?.apartments?.apartment3Room || 0) * 3 +
                        (data.building?.apartments?.apartment4Room || 0) * 4 +
                        (data.building?.apartments?.apartment5Room || 0) * 5 +
                        (data.building?.apartments?.apartment6Room || 0) * 6 +
                        (data.building?.apartments?.apartment7Room || 0) * 7;

                      return (weighted / total).toFixed(1);
                    })()
                  }</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )

  const renderRoomsTab = () => (
    <div className="tab-content">
      <div className="form-section">
        <h3>📦 Общие помещения</h3>

        <div className="toggle-section">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={useDetailedRooms}
              onChange={(e) => setUseDetailedRooms(e.target.checked)}
            />
            <span>Использовать детальный расчет помещений</span>
          </label>
        </div>

        {useDetailedRooms && (
          <>
            <h4>🏃 Эвакуационные пути</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Количество лестничных клеток</label>
                <input
                  type="number"
                  value={data.building?.commonRooms?.stairwellCount || 20}
                  onChange={(e) => handleComplexChange('commonRooms', 'stairwellCount', Number(e.target.value))}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Площадь лестничной клетки (м²)</label>
                <input
                  type="number"
                  value={data.building?.commonRooms?.stairwellArea || 15}
                  onChange={(e) => handleComplexChange('commonRooms', 'stairwellArea', Number(e.target.value))}
                  min="0"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Количество лифтовых холлов</label>
                <input
                  type="number"
                  value={data.building?.commonRooms?.elevatorHallCount || 10}
                  onChange={(e) => handleComplexChange('commonRooms', 'elevatorHallCount', Number(e.target.value))}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Площадь лифтового холла (м²)</label>
                <input
                  type="number"
                  value={data.building?.commonRooms?.elevatorHallArea || 25}
                  onChange={(e) => handleComplexChange('commonRooms', 'elevatorHallArea', Number(e.target.value))}
                  min="0"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Количество коридоров</label>
                <input
                  type="number"
                  value={data.building?.commonRooms?.commonCorridorCount || 35}
                  onChange={(e) => handleComplexChange('commonRooms', 'commonCorridorCount', Number(e.target.value))}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Площадь коридора (м²)</label>
                <input
                  type="number"
                  value={data.building?.commonRooms?.commonCorridorArea || 120}
                  onChange={(e) => handleComplexChange('commonRooms', 'commonCorridorArea', Number(e.target.value))}
                  min="0"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )

  const renderTechnicalTab = () => (
    <div className="tab-content">
      <div className="form-section">
        <h3>⚙️ Технические помещения</h3>

        <h4>🌬️ Вентиляция и кондиционирование</h4>
        <div className="form-row">
          <div className="form-group">
            <label>Количество венткамер</label>
            <input
              type="number"
              value={data.building?.technical?.ventilationCount || 15}
              onChange={(e) => handleComplexChange('technical', 'ventilationCount', Number(e.target.value))}
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Площадь венткамеры (м²)</label>
            <input
              type="number"
              value={data.building?.technical?.ventilationArea || 35}
              onChange={(e) => handleComplexChange('technical', 'ventilationArea', Number(e.target.value))}
              min="0"
            />
          </div>
        </div>

        <h4>⚡ Электрооборудование</h4>
        <div className="form-row">
          <div className="form-group">
            <label>Количество электрощитовых</label>
            <input
              type="number"
              value={data.building?.technical?.electricalCount || 12}
              onChange={(e) => handleComplexChange('technical', 'electricalCount', Number(e.target.value))}
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Площадь электрощитовой (м²)</label>
            <input
              type="number"
              value={data.building?.technical?.electricalArea || 20}
              onChange={(e) => handleComplexChange('technical', 'electricalArea', Number(e.target.value))}
              min="0"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Количество трансформаторных</label>
            <input
              type="number"
              value={data.building?.technical?.transformerCount || 2}
              onChange={(e) => handleComplexChange('technical', 'transformerCount', Number(e.target.value))}
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Площадь трансформаторной (м²)</label>
            <input
              type="number"
              value={data.building?.technical?.transformerArea || 80}
              onChange={(e) => handleComplexChange('technical', 'transformerArea', Number(e.target.value))}
              min="0"
            />
          </div>
        </div>

        <h4>🔥 Отопление и водоснабжение</h4>
        <div className="form-row">
          <div className="form-group">
            <label>Количество ИТП</label>
            <input
              type="number"
              value={data.building?.technical?.heatingCount || 8}
              onChange={(e) => handleComplexChange('technical', 'heatingCount', Number(e.target.value))}
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Площадь ИТП (м²)</label>
            <input
              type="number"
              value={data.building?.technical?.heatingArea || 50}
              onChange={(e) => handleComplexChange('technical', 'heatingArea', Number(e.target.value))}
              min="0"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Количество насосных</label>
            <input
              type="number"
              value={data.building?.technical?.pumpingCount || 4}
              onChange={(e) => handleComplexChange('technical', 'pumpingCount', Number(e.target.value))}
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Площадь насосной (м²)</label>
            <input
              type="number"
              value={data.building?.technical?.pumpingArea || 30}
              onChange={(e) => handleComplexChange('technical', 'pumpingArea', Number(e.target.value))}
              min="0"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Количество водомерных узлов</label>
            <input
              type="number"
              value={data.building?.technical?.waterCount || 6}
              onChange={(e) => handleComplexChange('technical', 'waterCount', Number(e.target.value))}
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Площадь водомерного узла (м²)</label>
            <input
              type="number"
              value={data.building?.technical?.waterArea || 25}
              onChange={(e) => handleComplexChange('technical', 'waterArea', Number(e.target.value))}
              min="0"
            />
          </div>
        </div>

        <h4>📡 Связь и технические этажи</h4>
        <div className="form-row">
          <div className="form-group">
            <label>Количество слаботочных</label>
            <input
              type="number"
              value={data.building?.technical?.telecomCount || 10}
              onChange={(e) => handleComplexChange('technical', 'telecomCount', Number(e.target.value))}
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Площадь слаботочной (м²)</label>
            <input
              type="number"
              value={data.building?.technical?.telecomArea || 15}
              onChange={(e) => handleComplexChange('technical', 'telecomArea', Number(e.target.value))}
              min="0"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Количество технических этажей</label>
            <input
              type="number"
              value={data.building?.technical?.techFloorCount || 3}
              onChange={(e) => handleComplexChange('technical', 'techFloorCount', Number(e.target.value))}
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Площадь техэтажа (м²)</label>
            <input
              type="number"
              value={data.building?.technical?.techFloorArea || 500}
              onChange={(e) => handleComplexChange('technical', 'techFloorArea', Number(e.target.value))}
              min="0"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderCorpusesTab = () => (
    <div className="tab-content">
      <div className="form-section">
        <h3>🏗️ Настройка корпусов</h3>

        <div className="form-row">
          <div className="form-group">
            <label>Количество корпусов</label>
            <input
              type="number"
              value={data.building?.corpuses?.buildingCorpuses || 3}
              onChange={(e) => handleComplexChange('corpuses', 'buildingCorpuses', Number(e.target.value))}
              min="1"
              max="10"
            />
          </div>
        </div>

        <div className="toggle-section">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={useDetailedCorpuses}
              onChange={(e) => setUseDetailedCorpuses(e.target.checked)}
            />
            <span>Настроить этажность каждого корпуса отдельно</span>
          </label>
        </div>

        {useDetailedCorpuses && (
          <div className="corpuses-grid">
            {Array.from({ length: data.building?.corpuses?.buildingCorpuses || 3 }, (_, i) => (
              <div key={i} className="corpus-item">
                <label>Корпус {i + 1} (этажей)</label>
                <input
                  type="number"
                  value={data.building?.corpuses?.corpusesFloors?.[`corpus${i + 1}`] || 16}
                  onChange={(e) => handleComplexChange('corpuses', 'corpusesFloors', {
                    ...data.building?.corpuses?.corpusesFloors,
                    [`corpus${i + 1}`]: Number(e.target.value)
                  })}
                  min="1"
                  max="50"
                />
              </div>
            ))}
          </div>
        )}

        {useDetailedCorpuses && (
          <div className="corpuses-summary">
            <h4>📊 Итого по корпусам:</h4>
            <div className="summary-grid">
              <div className="summary-item">
                <span>Максимальная этажность:</span>
                <span>{Math.max(...Object.values(data.building?.corpuses?.corpusesFloors || {}))}</span>
              </div>
              <div className="summary-item">
                <span>Общий объем этажей:</span>
                <span>{Object.values(data.building?.corpuses?.corpusesFloors || {}).reduce((sum, floors) => sum + floors, 0)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="step-content">
      <h2 className="step-title">Детальные параметры здания</h2>
      <p className="step-description">
        Настройте все параметры объекта для точного расчета АПС
      </p>

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
          </button>
        ))}
      </div>

      {/* Контент табов */}
      {activeTab === 'basic' && renderBasicTab()}
      {activeTab === 'apartments' && renderApartmentsTab()}
      {activeTab === 'rooms' && renderRoomsTab()}
      {activeTab === 'technical' && renderTechnicalTab()}
      {activeTab === 'corpuses' && renderCorpusesTab()}
    </div>
  )
}

export default BuildingStep