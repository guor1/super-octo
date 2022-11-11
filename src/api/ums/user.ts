import request from '~/utils/request'
import type { LoginReq, LoginRes, UserState } from '~/types/model/user'

export function doLogin(data: LoginReq) {
  return request.post<LoginRes>('/api/user/login', data)
}

export function doLogout() {
  return request.post<LoginRes>('/api/user/logout')
}

export function getUserInfo() {
  return request.post<UserState>('/api/user/info')
}

export function getUserList(params: any) {
  return request.post<any>('/api/ums/users', params)
}
