/*
  Can.js (Component)
    Componente que valida los permisos disponibles por rol del usuario.

# 05/03/2020
@ Eduardo Muñoz (eduardo@gestalabs.com)
*/

import { permissions }  from '../../configuration/permissions'

const check = (permissions, role, action, data) => {

  let permissionsList = permissions[role]

  if (!permissionsList) return false

  let staticPermissions = permissionsList.static
  let modulesPermissions = permissionsList.modules

  if (modulesPermissions && modulesPermissions.includes(action)) {
    return true
  }

  if (staticPermissions && staticPermissions.includes(action)) return true

  let dynamicPermissions = permissionsList.dynamic

  if (dynamicPermissions) {
    let permissionCondition = dynamicPermissions[action]

    if (!permissionCondition) return false

    return permissionCondition(data)
  }

  return false
}

const Can = (props) => (
  check(permissions, props.role, props.perform, props.data)
  ? props.yes()
  : props.no()
)

Can.defaultProps = {
  yes: () => null,
  no:() => null
}

export default Can
