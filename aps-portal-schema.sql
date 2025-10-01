-- Схема базы данных для корпоративного портала АПС (Автоматическая Пожарная Сигнализация)
-- Дата создания: 2025-09-29
-- Адаптировано под предметную область систем пожарной безопасности

-- Подключение необходимых расширений
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Удаление таблиц при пересоздании (для разработки)
DROP TABLE IF EXISTS calculation_results CASCADE;
DROP TABLE IF EXISTS equipment_specifications CASCADE;
DROP TABLE IF EXISTS building_configurations CASCADE;
DROP TABLE IF EXISTS building_types CASCADE;
DROP TABLE IF EXISTS equipment_types CASCADE;
DROP TABLE IF EXISTS aps_projects CASCADE;
DROP TABLE IF EXISTS calculation_templates CASCADE;
DROP TABLE IF EXISTS links CASCADE;
DROP TABLE IF EXISTS units CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Таблица пользователей портала АПС
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(200) NOT NULL, -- ФИО специалиста АПС
    email VARCHAR(255) NOT NULL UNIQUE, -- Электронная почта
    role VARCHAR(20) NOT NULL DEFAULT 'инженер' CHECK (role IN ('администратор', 'инженер', 'проектировщик', 'монтажник')), -- Роль в системе АПС
    company VARCHAR(200), -- Организация/компания
    license_number VARCHAR(100), -- Номер лицензии МЧС (при наличии)
    phone VARCHAR(50), -- Контактный телефон
    specialization VARCHAR(100), -- Специализация (проектирование, монтаж, ТО)
    is_active BOOLEAN DEFAULT TRUE, -- Активность записи
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица единиц измерения (справочник)
CREATE TABLE units (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE, -- Полное название (квадратный метр, штука, метр)
    short_name VARCHAR(20) NOT NULL UNIQUE, -- Сокращение (м², шт, м)
    description TEXT, -- Описание единицы измерения
    category VARCHAR(50), -- Категория (площадь, длина, количество)
    is_active BOOLEAN DEFAULT TRUE, -- Активность записи
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица типов зданий согласно СП 484.1311500.2020
CREATE TABLE building_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(10) NOT NULL UNIQUE, -- Код функционального назначения (Ф1.1, Ф1.3, Ф2.1 и т.д.)
    name VARCHAR(200) NOT NULL, -- Наименование типа здания
    description TEXT, -- Подробное описание и характеристики
    fire_risk_category VARCHAR(10), -- Категория пожарной опасности
    detector_density DECIMAL(5,2) DEFAULT 85.0, -- Нормативная плотность извещателей (м² на 1 извещатель)
    smoke_detector_ratio DECIMAL(3,2) DEFAULT 0.8, -- Доля дымовых извещателей (0.8 = 80%)
    heat_detector_ratio DECIMAL(3,2) DEFAULT 0.2, -- Доля тепловых извещателей (0.2 = 20%)
    manual_call_distance INTEGER DEFAULT 50, -- Максимальное расстояние между ручными извещателями (м)
    sounder_coverage INTEGER DEFAULT 15, -- Радиус действия оповещателя (м)
    is_active BOOLEAN DEFAULT TRUE, -- Активность записи
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица типов оборудования АПС
CREATE TABLE equipment_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(50) NOT NULL, -- Категория оборудования (извещатель, оповещатель, ППКП, кабель)
    name VARCHAR(200) NOT NULL, -- Наименование оборудования
    manufacturer VARCHAR(100), -- Производитель
    model VARCHAR(100), -- Модель
    specifications JSONB, -- Технические характеристики (JSON)
    unit_id UUID REFERENCES units(id) ON DELETE SET NULL, -- Единица измерения
    coverage_area DECIMAL(8,2), -- Площадь покрытия для извещателей (м²)
    detection_type VARCHAR(50), -- Тип обнаружения (дым, тепло, пламя, газ)
    signal_type VARCHAR(50), -- Тип сигнала (аналоговый, пороговый, адресный)
    operating_voltage VARCHAR(20), -- Рабочее напряжение
    current_consumption DECIMAL(8,3), -- Потребление тока (мА)
    protection_class VARCHAR(10), -- Класс защиты (IP54, IP65 и т.д.)
    temperature_range VARCHAR(50), -- Температурный диапазон работы
    price DECIMAL(10,2) DEFAULT 0, -- Стоимость единицы оборудования
    is_active BOOLEAN DEFAULT TRUE, -- Активность записи
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица проектов АПС
CREATE TABLE aps_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(300) NOT NULL, -- Название проекта АПС
    object_name VARCHAR(300) NOT NULL, -- Наименование объекта
    address TEXT, -- Адрес объекта
    building_type_id UUID REFERENCES building_types(id) ON DELETE RESTRICT, -- Тип здания по СП
    description TEXT, -- Описание проекта
    start_date DATE, -- Дата начала проектирования
    completion_date DATE, -- Планируемая дата завершения
    status VARCHAR(50) NOT NULL DEFAULT 'проектирование' CHECK (status IN ('проектирование', 'согласование', 'монтаж', 'пуско_наладка', 'сдача', 'эксплуатация', 'завершен')), -- Статус проекта
    budget DECIMAL(15,2) DEFAULT 0, -- Бюджет проекта
    customer VARCHAR(200), -- Заказчик
    responsible_person UUID REFERENCES users(id) ON DELETE SET NULL, -- Ответственный проектировщик
    fire_load_category VARCHAR(10), -- Категория пожарной нагрузки (А, Б, В, Г, Д)
    explosion_hazard_class VARCHAR(20), -- Класс взрывоопасности (при наличии)
    regulatory_documents TEXT, -- Применимые нормативные документы
    is_active BOOLEAN DEFAULT TRUE, -- Активность записи
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица конфигураций зданий для расчетов
CREATE TABLE building_configurations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES aps_projects(id) ON DELETE RESTRICT, -- Ссылка на проект
    building_name VARCHAR(200), -- Название здания/корпуса
    above_ground_area DECIMAL(10,2) NOT NULL DEFAULT 0, -- Надземная площадь (м²)
    underground_area DECIMAL(10,2) DEFAULT 0, -- Подземная площадь (м²)
    above_ground_floors INTEGER DEFAULT 1, -- Количество надземных этажей
    underground_floors INTEGER DEFAULT 0, -- Количество подземных этажей
    ceiling_height DECIMAL(4,2) DEFAULT 3.0, -- Высота потолков (м)
    total_apartments INTEGER DEFAULT 0, -- Общее количество квартир/помещений
    stairwells_count INTEGER DEFAULT 0, -- Количество лестничных клеток
    elevator_shafts_count INTEGER DEFAULT 0, -- Количество лифтовых шахт
    technical_rooms_count INTEGER DEFAULT 0, -- Количество технических помещений
    parking_spaces INTEGER DEFAULT 0, -- Количество парковочных мест
    building_volume DECIMAL(12,2), -- Объем здания (м³)
    fire_compartments_count INTEGER DEFAULT 1, -- Количество пожарных отсеков
    notes TEXT, -- Дополнительные примечания
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица спецификаций оборудования по проектам
CREATE TABLE equipment_specifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES aps_projects(id) ON DELETE RESTRICT, -- Ссылка на проект
    equipment_type_id UUID REFERENCES equipment_types(id) ON DELETE RESTRICT, -- Тип оборудования
    location VARCHAR(300), -- Место установки/применения
    quantity DECIMAL(10,2) NOT NULL DEFAULT 0, -- Количество
    unit_id UUID REFERENCES units(id) ON DELETE RESTRICT, -- Единица измерения
    unit_price DECIMAL(10,2) DEFAULT 0, -- Цена за единицу
    total_price DECIMAL(15,2) DEFAULT 0, -- Общая стоимость
    installation_method VARCHAR(100), -- Способ монтажа
    cable_type VARCHAR(100), -- Тип кабеля (для кабельной продукции)
    cable_length DECIMAL(10,2), -- Длина кабеля (м)
    protection_zone VARCHAR(100), -- Зона защиты
    detection_zone VARCHAR(100), -- Зона обнаружения
    control_panel_address INTEGER, -- Адрес на ППКП
    loop_number INTEGER, -- Номер шлейфа
    specifications_notes TEXT, -- Примечания к спецификации
    is_main_equipment BOOLEAN DEFAULT TRUE, -- Основное оборудование (не расходные материалы)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица результатов расчетов АПС
CREATE TABLE calculation_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES aps_projects(id) ON DELETE RESTRICT, -- Ссылка на проект
    calculation_type VARCHAR(50) NOT NULL, -- Тип расчета (общий, по_этажам, по_зонам)
    calculation_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(), -- Дата расчета
    parameters JSONB, -- Входные параметры расчета (JSON)
    results JSONB, -- Результаты расчета (JSON)
    smoke_detectors_count INTEGER DEFAULT 0, -- Количество дымовых извещателей
    heat_detectors_count INTEGER DEFAULT 0, -- Количество тепловых извещателей
    flame_detectors_count INTEGER DEFAULT 0, -- Количество пламени извещателей
    gas_detectors_count INTEGER DEFAULT 0, -- Количество газовых извещателей
    manual_call_points_count INTEGER DEFAULT 0, -- Количество ручных извещателей
    sounders_count INTEGER DEFAULT 0, -- Количество звуковых оповещателей
    strobe_lights_count INTEGER DEFAULT 0, -- Количество световых оповещателей
    control_panels_count INTEGER DEFAULT 1, -- Количество приборов управления
    zones_count INTEGER DEFAULT 1, -- Количество зон контроля
    cable_total_length DECIMAL(10,2) DEFAULT 0, -- Общая длина кабеля (м)
    estimated_cost DECIMAL(15,2) DEFAULT 0, -- Расчетная стоимость системы
    calculation_status VARCHAR(20) DEFAULT 'актуальный' CHECK (calculation_status IN ('актуальный', 'устаревший', 'проверен')), -- Статус расчета
    calculated_by UUID REFERENCES users(id) ON DELETE SET NULL, -- Кто выполнил расчет
    verified_by UUID REFERENCES users(id) ON DELETE SET NULL, -- Кто проверил расчет
    verification_date TIMESTAMP WITH TIME ZONE, -- Дата проверки
    notes TEXT, -- Примечания к расчету
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица шаблонов расчетов
CREATE TABLE calculation_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL, -- Название шаблона
    description TEXT, -- Описание назначения шаблона
    building_type_id UUID REFERENCES building_types(id) ON DELETE SET NULL, -- Применимый тип здания
    template_parameters JSONB, -- Параметры шаблона (JSON)
    default_equipment JSONB, -- Оборудование по умолчанию (JSON)
    created_by UUID REFERENCES users(id) ON DELETE SET NULL, -- Автор шаблона
    is_public BOOLEAN DEFAULT FALSE, -- Публичный шаблон (доступен всем)
    usage_count INTEGER DEFAULT 0, -- Количество использований
    is_active BOOLEAN DEFAULT TRUE, -- Активность записи
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица ссылок портала
CREATE TABLE links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL, -- Название ссылки
    url TEXT NOT NULL, -- URL ссылки
    description TEXT, -- Описание ссылки
    category VARCHAR(100), -- Категория (нормативные_документы, калькуляторы, справочники, проектирование)
    subcategory VARCHAR(100), -- Подкатегория для детализации
    icon VARCHAR(100), -- Название иконки для отображения
    color VARCHAR(20), -- Цвет для отображения
    sort_order INTEGER DEFAULT 0, -- Порядок сортировки
    is_active BOOLEAN DEFAULT TRUE, -- Активность записи
    is_external BOOLEAN DEFAULT FALSE, -- Внешняя ссылка (открывается в новом окне)
    access_level VARCHAR(20) DEFAULT 'all' CHECK (access_level IN ('all', 'engineer', 'admin')), -- Уровень доступа
    created_by UUID REFERENCES users(id) ON DELETE SET NULL, -- Кто создал ссылку
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индексы для оптимизации запросов
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_is_active ON users(is_active);
CREATE INDEX idx_building_types_code ON building_types(code);
CREATE INDEX idx_building_types_is_active ON building_types(is_active);
CREATE INDEX idx_equipment_types_category ON equipment_types(category);
CREATE INDEX idx_equipment_types_is_active ON equipment_types(is_active);
CREATE INDEX idx_aps_projects_status ON aps_projects(status);
CREATE INDEX idx_aps_projects_responsible_person ON aps_projects(responsible_person);
CREATE INDEX idx_aps_projects_is_active ON aps_projects(is_active);
CREATE INDEX idx_aps_projects_created_at ON aps_projects(created_at DESC);
CREATE INDEX idx_building_configurations_project_id ON building_configurations(project_id);
CREATE INDEX idx_equipment_specifications_project_id ON equipment_specifications(project_id);
CREATE INDEX idx_equipment_specifications_equipment_type ON equipment_specifications(equipment_type_id);
CREATE INDEX idx_calculation_results_project_id ON calculation_results(project_id);
CREATE INDEX idx_calculation_results_date ON calculation_results(calculation_date DESC);
CREATE INDEX idx_calculation_results_status ON calculation_results(calculation_status);
CREATE INDEX idx_calculation_templates_building_type ON calculation_templates(building_type_id);
CREATE INDEX idx_calculation_templates_is_public ON calculation_templates(is_public);
CREATE INDEX idx_links_category ON links(category);
CREATE INDEX idx_links_is_active ON links(is_active);
CREATE INDEX idx_links_sort_order ON links(sort_order);

-- Функция для автоматического обновления поля updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Триггеры для автоматического обновления updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_units_updated_at
    BEFORE UPDATE ON units
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_building_types_updated_at
    BEFORE UPDATE ON building_types
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_equipment_types_updated_at
    BEFORE UPDATE ON equipment_types
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_aps_projects_updated_at
    BEFORE UPDATE ON aps_projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_building_configurations_updated_at
    BEFORE UPDATE ON building_configurations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_equipment_specifications_updated_at
    BEFORE UPDATE ON equipment_specifications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calculation_results_updated_at
    BEFORE UPDATE ON calculation_results
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calculation_templates_updated_at
    BEFORE UPDATE ON calculation_templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_links_updated_at
    BEFORE UPDATE ON links
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Функция для автоматического расчета общей стоимости в спецификациях оборудования
CREATE OR REPLACE FUNCTION calculate_equipment_total_price()
RETURNS TRIGGER AS $$
BEGIN
    -- Автоматически рассчитываем общую стоимость для спецификаций оборудования
    IF NEW.unit_price IS NOT NULL AND NEW.quantity IS NOT NULL THEN
        NEW.total_price = NEW.unit_price * NEW.quantity;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER calculate_equipment_total_price
    BEFORE INSERT OR UPDATE ON equipment_specifications
    FOR EACH ROW EXECUTE FUNCTION calculate_equipment_total_price();

-- Заполнение базовых единиц измерения для АПС
INSERT INTO units (name, short_name, description, category) VALUES
('Квадратный метр', 'м²', 'Единица измерения площади', 'площадь'),
('Кубический метр', 'м³', 'Единица измерения объема', 'объем'),
('Метр', 'м', 'Единица измерения длины', 'длина'),
('Штука', 'шт', 'Единица измерения количества оборудования', 'количество'),
('Комплект', 'компл', 'Единица измерения наборов оборудования', 'количество'),
('Погонный метр', 'п.м', 'Единица измерения кабельной продукции', 'длина'),
('Точка', 'точка', 'Единица измерения точек подключения', 'количество'),
('Зона', 'зона', 'Единица измерения зон контроля/оповещения', 'количество'),
('Этаж', 'эт', 'Единица измерения этажей здания', 'количество'),
('Помещение', 'пом', 'Единица измерения помещений', 'количество');

-- Заполнение типов зданий согласно СП 484.1311500.2020
INSERT INTO building_types (code, name, description, fire_risk_category, detector_density, smoke_detector_ratio, heat_detector_ratio) VALUES
('Ф1.1', 'Дошкольные образовательные организации, специализированные дома престарелых', 'Здания детских дошкольных образовательных организаций, специализированных домов престарелых и инвалидов', 'Б', 65.0, 0.90, 0.10),
('Ф1.2', 'Гостиницы, общежития, жилые дома квартирного типа', 'Гостиницы, общежития, спальные корпуса санаториев и домов отдыха, кемпингов, мотелей и пансионатов, жилые здания высотой более 28 м', 'В', 85.0, 0.80, 0.20),
('Ф1.3', 'Многоквартирные жилые дома', 'Многоквартирные жилые дома высотой не более 28 м', 'В', 85.0, 0.80, 0.20),
('Ф1.4', 'Одноквартирные и блокированные жилые дома', 'Одноквартирные жилые дома, в том числе блокированные', 'В', 100.0, 0.75, 0.25),
('Ф2.1', 'Театры, кинотеатры, концертные залы', 'Здания театров, кинотеатров, концертных залов, клубов, цирков, спортивных сооружений с трибунами', 'Б', 55.0, 0.85, 0.15),
('Ф2.2', 'Музеи, выставочные залы', 'Здания музеев, выставок, библиотек и других учреждений просветительского назначения', 'В', 75.0, 0.90, 0.10),
('Ф2.3', 'Объекты религиозного назначения', 'Здания культовых учреждений', 'В', 85.0, 0.85, 0.15),
('Ф2.4', 'Объекты досуга и развлечений', 'Здания для развлечений, досуговой деятельности, социального и коммунального назначения', 'Б', 65.0, 0.80, 0.20),
('Ф3.1', 'Больницы и поликлиники', 'Здания организаций здравоохранения и социального обслуживания населения', 'Б', 65.0, 0.85, 0.15),
('Ф3.2', 'Школы, институты, университеты', 'Здания дошкольных образовательных организаций, общеобразовательных организаций, организаций дополнительного образования детей', 'Б', 75.0, 0.85, 0.15),
('Ф3.3', 'Научные и проектные институты', 'Здания организаций научно-исследовательских учреждений', 'В', 85.0, 0.80, 0.20),
('Ф3.4', 'Учебные заведения высшего, среднего и начального профобразования', 'Здания образовательных организаций высшего образования и дополнительного профессионального образования', 'В', 85.0, 0.80, 0.20),
('Ф3.5', 'Учебно-воспитательные учреждения', 'Здания учреждений социального и коммунального назначения', 'Б', 75.0, 0.85, 0.15),
('Ф3.6', 'Спортивные сооружения', 'Здания физкультурно-оздоровительных, спортивных сооружений', 'Б', 85.0, 0.70, 0.30),
('Ф4.1', 'Школы, детские сады, учебные заведения', 'Здания общеобразовательных организаций', 'Б', 75.0, 0.85, 0.15),
('Ф4.2', 'Высшие учебные заведения, институты', 'Здания образовательных организаций высшего образования', 'В', 85.0, 0.80, 0.20),
('Ф4.3', 'Учреждения начального и среднего профобразования', 'Здания образовательных организаций дополнительного образования детей, организаций дополнительного профессионального образования', 'В', 85.0, 0.80, 0.20),
('Ф4.4', 'Прочие образовательные учреждения', 'Прочие здания образовательных организаций', 'В', 85.0, 0.80, 0.20),
('Ф5.1', 'Административные и офисные здания', 'Здания административного назначения', 'В', 85.0, 0.80, 0.20),
('Ф5.2', 'Банки и финансовые учреждения', 'Здания банков, офисных организаций', 'В', 85.0, 0.80, 0.20),
('Ф5.3', 'Объекты торговли, общественного питания и бытового обслуживания', 'Здания, сооружения и помещения объектов торговли', 'Б', 65.0, 0.75, 0.25);

-- Заполнение основных типов оборудования АПС
INSERT INTO equipment_types (category, name, manufacturer, specifications, coverage_area, detection_type, signal_type) VALUES
('Извещатель дымовой', 'ИП 212-141 «Шорох-2»', 'Болид', '{"sensitivity": "0.1 дБ/м", "response_time": "10 сек"}', 85.0, 'дым', 'пороговый'),
('Извещатель дымовой', 'ИП 212-142 «Шорох-2М»', 'Болид', '{"sensitivity": "0.1 дБ/м", "response_time": "10 сек", "address": "адресный"}', 85.0, 'дым', 'адресно-аналоговый'),
('Извещатель тепловой', 'ИП 101-1А-А1', 'Болид', '{"temperature_threshold": "60°C"}', 25.0, 'тепло', 'пороговый'),
('Извещатель тепловой', 'ИП 101-1А-А1Р', 'Болид', '{"temperature_threshold": "60°C", "address": "адресный"}', 25.0, 'тепло', 'адресно-аналоговый'),
('Извещатель ручной', 'ИПР 513-3А «Призма»', 'Болид', '{"activation": "разбитие стекла", "reset": "ключом"}', 1.0, 'ручной', 'пороговый'),
('Оповещатель', 'Свирель-2', 'Болид', '{"sound_level": "100 дБ", "power": "0.1 Вт"}', 200.0, 'звуковой', 'пороговый'),
('Оповещатель', 'Маяк-12-3М', 'Болид', '{"light_power": "3 Вт", "flash_frequency": "1 Гц"}', 100.0, 'световой', 'пороговый'),
('ППКП', 'С2000-КПБ', 'Болид', '{"loops": "2", "addresses": "127", "backup_battery": "7 А·ч"}', 1.0, 'контрольный', 'адресный'),
('ППКП', 'С2000-4', 'Болид', '{"loops": "4", "zones": "4", "backup_battery": "7 А·ч"}', 1.0, 'контрольный', 'пороговый'),
('Кабель', 'КПСЭнг(А)-FRLS 1х2х0,8', 'Рыбинсккабель', '{"conductors": "2", "cross_section": "0.8", "fire_resistant": true}', 1.0, 'кабель', 'пороговый');

-- Заполнение примеров проектов АПС
INSERT INTO aps_projects (name, object_name, address, building_type_id, description, status, budget, customer) VALUES
('АПС жилого комплекса "Солнечный"', 'ЖК "Солнечный"', 'г. Москва, ул. Солнечная, 1', (SELECT id FROM building_types WHERE code = 'Ф1.3' LIMIT 1), 'Проектирование и монтаж адресно-аналоговой системы пожарной сигнализации для многоквартирного жилого дома', 'проектирование', 2500000.00, 'ООО "Солнечный Дом"'),
('АПС административного здания', 'Офисный центр "Престиж"', 'г. Санкт-Петербург, Невский пр., 100', (SELECT id FROM building_types WHERE code = 'Ф5.1' LIMIT 1), 'Модернизация системы пожарной сигнализации административного здания', 'монтаж', 1800000.00, 'ООО "Престиж Недвижимость"'),
('АПС школы №15', 'МАОУ "Школа №15"', 'г. Екатеринбург, ул. Школьная, 15', (SELECT id FROM building_types WHERE code = 'Ф4.1' LIMIT 1), 'Проектирование системы пожарной сигнализации и оповещения для общеобразовательной школы', 'согласование', 950000.00, 'Департамент образования');

-- Заполнение пользователей
INSERT INTO users (full_name, email, role, company, specialization) VALUES
('Иванов Петр Сергеевич', 'ivanov@apsportal.ru', 'администратор', 'ООО "АПС Проект"', 'проектирование'),
('Петрова Анна Викторовна', 'petrova@apsportal.ru', 'проектировщик', 'ИП Петрова А.В.', 'проектирование'),
('Сидоров Алексей Михайлович', 'sidorov@apsportal.ru', 'инженер', 'ООО "Системы Безопасности"', 'монтаж');

-- Заполнение ссылок портала АПС
INSERT INTO links (title, url, description, category, subcategory, icon, color, sort_order, is_external) VALUES
-- Калькуляторы
('Калькулятор АПС', '/calculator/aps', 'Расчет количества извещателей и оборудования АПС', 'калькуляторы', 'основные', 'CalculatorOutlined', '#1677ff', 1, false),
('Расчет кабельных линий', '/calculator/cables', 'Расчет длины и сечения кабелей для АПС', 'калькуляторы', 'дополнительные', 'BranchesOutlined', '#52c41a', 2, false),
('Расчет зон покрытия', '/calculator/zones', 'Расчет зон покрытия извещателей и оповещателей', 'калькуляторы', 'дополнительные', 'RadarChartOutlined', '#fadb14', 3, false),

-- Справочники
('Типы зданий', '/references/building-types', 'Справочник функциональных типов зданий по СП', 'справочники', 'нормативные', 'BuildOutlined', '#722ed1', 10, false),
('Оборудование АПС', '/references/equipment', 'База данных оборудования пожарной сигнализации', 'справочники', 'оборудование', 'AppstoreOutlined', '#fa8c16', 11, false),
('Единицы измерения', '/references/units', 'Справочник единиц измерения для проектирования', 'справочники', 'общие', 'FunctionOutlined', '#eb2f96', 12, false),

-- Проекты и документы
('Проекты АПС', '/projects', 'Управление проектами пожарной сигнализации', 'проектирование', 'основные', 'ProjectOutlined', '#13c2c2', 20, false),
('Спецификации оборудования', '/specifications', 'Ведение спецификаций оборудования по проектам', 'проектирование', 'документы', 'OrderedListOutlined', '#2f54eb', 21, false),
('Результаты расчетов', '/calculations', 'История и архив результатов расчетов АПС', 'проектирование', 'расчеты', 'LineChartOutlined', '#a0d911', 22, false),

-- Нормативные документы
('СП 484.1311500.2020', 'https://docs.cntd.ru/document/573172475', 'Системы противопожарной защиты. Системы пожарной сигнализации и автоматизация систем противопожарной защиты', 'нормативные_документы', 'свод_правил', 'FileTextOutlined', '#cf1322', 30, true),
('СП 5.13130.2009', 'https://docs.cntd.ru/document/1200071148', 'Системы противопожарной защиты. Установки пожарной сигнализации и пожаротушения автоматические', 'нормативные_документы', 'свод_правил', 'FileTextOutlined', '#cf1322', 31, true),
('ГОСТ Р 53325-2012', 'https://docs.cntd.ru/document/1200103505', 'Техника пожарная. Технические средства пожарной автоматики', 'нормативные_документы', 'госты', 'BookOutlined', '#096dd9', 32, true),

-- Инструменты
('Пользователи системы', '/users', 'Управление пользователями портала АПС', 'администрирование', 'пользователи', 'TeamOutlined', '#531dab', 40, false),
('Шаблоны расчетов', '/templates', 'Создание и управление шаблонами расчетов', 'инструменты', 'шаблоны', 'CopyOutlined', '#c41d7f', 41, false);

-- Создание представлений для удобного просмотра данных

-- Представление проектов с детальной информацией
CREATE VIEW v_aps_projects_detailed AS
SELECT
    ap.id,
    ap.name,
    ap.object_name,
    ap.address,
    bt.name as building_type_name,
    bt.code as building_type_code,
    ap.description,
    ap.start_date,
    ap.completion_date,
    ap.status,
    ap.budget,
    ap.customer,
    u.full_name as responsible_person_name,
    ap.fire_load_category,
    ap.created_at,
    ap.updated_at
FROM aps_projects ap
LEFT JOIN building_types bt ON ap.building_type_id = bt.id
LEFT JOIN users u ON ap.responsible_person = u.id
WHERE ap.is_active = TRUE
ORDER BY ap.created_at DESC;

-- Представление спецификаций с расшифровкой
CREATE VIEW v_equipment_specifications_detailed AS
SELECT
    es.id,
    ap.name as project_name,
    et.category as equipment_category,
    et.name as equipment_name,
    et.manufacturer,
    et.model,
    es.location,
    es.quantity,
    u.short_name as unit_name,
    es.unit_price,
    es.total_price,
    es.installation_method,
    es.cable_type,
    es.cable_length,
    es.protection_zone,
    es.control_panel_address,
    es.loop_number,
    es.is_main_equipment,
    es.created_at
FROM equipment_specifications es
JOIN aps_projects ap ON es.project_id = ap.id
JOIN equipment_types et ON es.equipment_type_id = et.id
JOIN units u ON es.unit_id = u.id
ORDER BY es.created_at DESC;

-- Представление результатов расчетов с детализацией
CREATE VIEW v_calculation_results_summary AS
SELECT
    cr.id,
    ap.name as project_name,
    ap.object_name,
    cr.calculation_type,
    cr.calculation_date,
    cr.smoke_detectors_count,
    cr.heat_detectors_count,
    cr.flame_detectors_count,
    cr.gas_detectors_count,
    cr.manual_call_points_count,
    cr.sounders_count,
    cr.strobe_lights_count,
    cr.control_panels_count,
    cr.zones_count,
    cr.cable_total_length,
    cr.estimated_cost,
    cr.calculation_status,
    u1.full_name as calculated_by_name,
    u2.full_name as verified_by_name,
    cr.verification_date,
    cr.created_at
FROM calculation_results cr
JOIN aps_projects ap ON cr.project_id = ap.id
LEFT JOIN users u1 ON cr.calculated_by = u1.id
LEFT JOIN users u2 ON cr.verified_by = u2.id
ORDER BY cr.calculation_date DESC;

-- Комментарии к таблицам
COMMENT ON TABLE users IS 'Пользователи портала АПС - проектировщики, инженеры, монтажники';
COMMENT ON TABLE building_types IS 'Справочник функциональных типов зданий согласно СП 484.1311500.2020';
COMMENT ON TABLE equipment_types IS 'Каталог оборудования АПС с техническими характеристиками';
COMMENT ON TABLE aps_projects IS 'Проекты систем пожарной сигнализации';
COMMENT ON TABLE building_configurations IS 'Конфигурации зданий для расчетов АПС';
COMMENT ON TABLE equipment_specifications IS 'Спецификации оборудования по проектам АПС';
COMMENT ON TABLE calculation_results IS 'Результаты расчетов систем пожарной сигнализации';
COMMENT ON TABLE calculation_templates IS 'Шаблоны расчетов для типовых решений АПС';
COMMENT ON TABLE links IS 'Ссылки портала на калькуляторы, справочники и документы';
COMMENT ON TABLE units IS 'Справочник единиц измерения для проектирования АПС';

COMMENT ON VIEW v_aps_projects_detailed IS 'Детальное представление проектов АПС с дополнительной информацией';
COMMENT ON VIEW v_equipment_specifications_detailed IS 'Детальное представление спецификаций оборудования';
COMMENT ON VIEW v_calculation_results_summary IS 'Сводное представление результатов расчетов АПС';