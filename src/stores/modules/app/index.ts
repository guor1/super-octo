import { defineStore } from 'pinia'
import type { AppState } from './types'
import defaultSettings from '~/config/settings.json'

const useAppStore = defineStore('app', {
  state: (): AppState => ({ ...defaultSettings }),

  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state }
    },
  },

  actions: {
    // Update app settings
    updateSettings(partial: Partial<AppState>) {
      // @ts-expect-error-next-line
      this.$patch(partial)
    },

    // Change theme color
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = 'dark'
        document.body.setAttribute('arco-theme', 'dark')
      }
      else {
        this.theme = 'light'
        document.body.removeAttribute('arco-theme')
      }
    },
  },
})

export default useAppStore
