import type { App } from 'vue'
import { createPinia } from 'pinia'

// https://pinia.esm.dev/
const store = createPinia()

export function setupStore(app: App<Element>) {
  app.use(store)
}

export { store }
