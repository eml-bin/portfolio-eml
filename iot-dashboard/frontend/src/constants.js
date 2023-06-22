// import multivac from '../../src/assets/svg/logo.svg'
// import weber from '../../src/assets/svg/logo-white.svg'

import iconWeber from './assets/img/weber-icon.png'
import iconMultivac from './assets/img/multivac-icon.png'

let API_HOST = "http://host.docker.internal:8000"
let MQTT_HOST = "ws://host.docker.internal:9001"

if (process.env.NODE_ENV === "production") {
    API_HOST = 'http://localhost:8000'
    MQTT_HOST = 'ws://localhost:9001/'
}

export const HOSTS = {
    MQTT: MQTT_HOST,
    API: {
        ALARMS: `${API_HOST}/api/alarms`,
        EXPORT: `${API_HOST}/api/export`,
        COUNTERS: `${API_HOST}/api/counters`,
        FAMILIES: `${API_HOST}/api/families`,
        HISTORY: `${API_HOST}/api/history`,
        LOGIN: `${API_HOST}/api/login`,
        MACHINES: `${API_HOST}/api/machines`,
        PROFILES: `${API_HOST}/api/profiles`,
        RANGES: `${API_HOST}/api/ranges`,
        SCHEDULE: `${API_HOST}/api/schedule`,
        SCHEDULES: `${API_HOST}/api/schedules`,
        SHUTDOWNS: `${API_HOST}/api/shutdowns`,
        VARIABLES: `${API_HOST}/api/variables`,
    },
    TOPICS: {
        VARIABLES: {
            REALTIME: `variables_realtime`,
            NOTIFICATIONS: `notifications`,
        },
        MACHINE: {
            STATUS: `kepserver_machine_status`
        }
    }
}

export const Images = {
    Icons: {
        WEBER_ICON: iconWeber,
        MULTIVAC_ICON: iconMultivac
    }
}

export const DashboardRoutes = { 
    DOMAIN: "/platform",
    Modules: {
        MACHINES: "machines",
        SCHEDULE: "schedules",
        NOTIFICATIONS: "notifications",
        USERS: "users"
    }
}