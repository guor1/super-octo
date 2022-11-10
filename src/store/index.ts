import type { App } from 'vue'
import { createPinia } from 'pinia'
import { useAppStore } from './modules/appStore'
import { useUserStore } from './modules/userStore'

// https://pinia.esm.dev/
const store = createPinia()

export function setupStore(app: App<Element>) {
  app.use(store)
}

export { store, useAppStore, useUserStore }
