import { createPinia } from 'pinia'
import useAppStore from './modules/app'
import useUserStore from './modules/user'

// https://pinia.esm.dev/
const pinia = createPinia()

export { useAppStore, useUserStore }
export default pinia
