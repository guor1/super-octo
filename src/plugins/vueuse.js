import { createHead } from '@vueuse/head'

export const install = ({ app }) => {
  const head = createHead()
  app.use(head)
}
