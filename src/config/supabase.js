// Заглушка для конфигурации Supabase
console.log('Supabase configuration loaded (placeholder)')

// Заглушка для createClient
export const supabase = {
  from: () => ({
    select: () => ({
      eq: () => ({
        order: () => Promise.resolve({ data: [], error: null })
      })
    }),
    insert: () => ({
      select: () => Promise.resolve({ data: [], error: null })
    }),
    update: () => ({
      eq: () => ({
        select: () => Promise.resolve({ data: [], error: null })
      })
    })
  })
}

export const TABLES = {
  USERS: 'users',
  APS_PROJECTS: 'aps_projects',
  BUILDING_TYPES: 'building_types',
  EQUIPMENT_TYPES: 'equipment_types',
  BUILDING_CONFIGURATIONS: 'building_configurations',
  EQUIPMENT_SPECIFICATIONS: 'equipment_specifications',
  CALCULATION_RESULTS: 'calculation_results',
  CALCULATION_TEMPLATES: 'calculation_templates',
  LINKS: 'links',
  UNITS: 'units'
}

export const USER_ROLES = {
  ADMIN: 'администратор',
  ENGINEER: 'инженер',
  DESIGNER: 'проектировщик',
  INSTALLER: 'монтажник'
}

export const PROJECT_STATUS = {
  DESIGN: 'проектирование',
  APPROVAL: 'согласование',
  INSTALLATION: 'монтаж',
  COMMISSIONING: 'пуско_наладка',
  DELIVERY: 'сдача',
  OPERATION: 'эксплуатация',
  COMPLETED: 'завершен'
}