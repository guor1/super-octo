import type { UserModule } from '~/types'
import permission from '~/directives/permission'

export const install: UserModule = ({ app }) => {
  app.directive('permission', permission)
}
