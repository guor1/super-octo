export type RoleType = '' | '*' | 'admin' | 'user'

export interface UserState {
  // 用户名
  username?: string
  role: RoleType
}

export interface LoginReq {
  username: string
  password: string
}

export interface LoginRes {
  tokenValue: string
}
