import tool from '~/utils/tool'

export function permission(data: string) {
  const permissions = tool.data.get('PERMISSIONS')
  if (!permissions)
    return false

  const isHave = permissions.includes(data)
  return isHave
}

export function rolePermission(data: string) {
  const userInfo = tool.data.get('USER_INFO')
  if (!userInfo)
    return false

  const role = userInfo.role
  if (!role)
    return false

  const isHave = role.includes(data)
  return isHave
}
