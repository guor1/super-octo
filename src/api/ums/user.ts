import request from '~/utils/request'
import type { UserState } from '~/types/model/user'
import type { AppMenuRecordRaw } from '~/types'

export interface LoginData {
  username: string
  password: string
}

export interface LoginRes {
  token: string
}

export function login(data: LoginData) {
  return request.post<LoginRes>('/api/user/login', data)
}

export function logout() {
  return request.post<LoginRes>('/api/user/logout')
}

export function getUserInfo() {
  return request.post<UserState>('/api/user/info')
}

export function getMenuList() {
  return request.post<AppMenuRecordRaw[]>('/api/user/menu')
}

export function getUserList(params: any) {
  return request.post<any>('/api/ums/users', params)
}
