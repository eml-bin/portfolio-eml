/*
  permissions.js
    Definición de permisos estáticos y dinámicos por tipo de rol.

# 05/03/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import { DashboardRoutes } from "../constants"

const permissions = {
  Superusuario: {
    modules: [
      DashboardRoutes.Modules.MACHINES,
      DashboardRoutes.Modules.SCHEDULE,
      DashboardRoutes.Modules.NOTIFICATIONS,
      DashboardRoutes.Modules.USERS,
      "settings"
    ],
    static: [
      "schedules:create",
    ]
  },

  Administrador: {
    modules: [
      DashboardRoutes.Modules.MACHINES,
      DashboardRoutes.Modules.SCHEDULE,
      DashboardRoutes.Modules.NOTIFICATIONS,
      DashboardRoutes.Modules.USERS,
      "settings"
    ],
    static: [
      "schedules:create",
    ]
  },

  Operador: {
    modules: [
      DashboardRoutes.Modules.MACHINES,
      DashboardRoutes.Modules.SCHEDULE,
      DashboardRoutes.Modules.NOTIFICATIONS,
    ],
  },

  Proveedor: {
    modules: [
      DashboardRoutes.Modules.MACHINES,
      DashboardRoutes.Modules.SCHEDULE,
      DashboardRoutes.Modules.NOTIFICATIONS,
    ],
    static: [
    ]
  }
}

const checkModuleAccess = (role, module) => {

  let permissionsList = permissions[role]
  let modulesPermissions = permissionsList.modules

  if (modulesPermissions && modulesPermissions.includes(module)) {
    return true
  }
}

export { permissions, checkModuleAccess }
