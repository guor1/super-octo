import MakeitCaptcha from 'makeit-captcha'
import { UserModule } from '~/types'

// 行为验证码插件
export const install: UserModule = ({ app }) => {
  app.use(MakeitCaptcha)
}
