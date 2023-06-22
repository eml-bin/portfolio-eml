/*
  routes.js
    Archivo de Configuración de Rutas

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import Machine from '../views/Machine'
import Schedules from '../views/Schedules'
import Notification from '../views/Notification'
import Manage from '../views/Manage'
import { DashboardRoutes } from '../constants'

const switchRoutes = {
  domain: DashboardRoutes.DOMAIN,
  paths: [
    {
      path: `${DashboardRoutes.Modules.MACHINES}/:id`,
      component: Machine,
      moduleName: DashboardRoutes.Modules.MACHINES
    },
    {
      path: `${DashboardRoutes.Modules.SCHEDULE}/`,
      component: Schedules,
      moduleName: DashboardRoutes.Modules.SCHEDULE
    },
    {
      path: `${DashboardRoutes.Modules.NOTIFICATIONS}/:id?/:type?`,
      component: Notification,
      moduleName: DashboardRoutes.Modules.NOTIFICATIONS
    },
    {
      path: `${DashboardRoutes.Modules.USERS}/`,
      component: Manage,
      moduleName: DashboardRoutes.Modules.USERS
    }
  ]
}

const platformPaths = {
  machinesPath: `${DashboardRoutes.DOMAIN}/${DashboardRoutes.Modules.MACHINES}/`,
  shutdownsPath: `${DashboardRoutes.DOMAIN}/${DashboardRoutes.Modules.SCHEDULE}/`,
  notificationsPath: `${DashboardRoutes.DOMAIN}/${DashboardRoutes.Modules.NOTIFICATIONS}/`,
  managePath: `${DashboardRoutes.DOMAIN}/${DashboardRoutes.Modules.USERS}/`,
}

export { switchRoutes, platformPaths }
