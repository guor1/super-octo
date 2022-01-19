import tool from '~/utils/tool'

export function permission (data) {
  const permissions = tool.data.get('PERMISSIONS')
  if (!permissions)
    return false

  const isHave = permissions.includes(data)
  return isHave
}

export function rolePermission (data) {
  const userInfo = tool.data.get('USER_INFO')
  if (!userInfo)
    return false

  const role = userInfo.role
  if (!role)
    return false

  const isHave = role.includes(data)
  return isHave
}
