export type RoleType = '' | '*' | 'admin' | 'user'

export interface UserState {
  // 用户名
  username?: string
  role: RoleType
}
