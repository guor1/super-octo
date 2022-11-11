import request from '~/utils/request'
import type { AppMenuRecordRaw } from '~/types'

/**
 * 获取用户菜单
 */
export function getMenuList() {
  return request.post<AppMenuRecordRaw[]>('/api/ums/menus')
}
