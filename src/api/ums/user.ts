import request from '~/utils/request'
import type { LoginReq, LoginRes, UserState } from '~/types/model/user'

/**
 * 登录
 */
export function doLogin(data: LoginReq) {
  return request.post<LoginRes>('/api/user/login', data)
}

/**
 * 登出
 */
export function doLogout() {
  return request.post<LoginRes>('/api/user/logout')
}

/**
 * 获取登录用户信息
 */
export function getUserInfo() {
  return request.post<UserState>('/api/user/info')
}

export function getUserList(params: any) {
  return request.post<any>('/api/ums/users', params)
}
