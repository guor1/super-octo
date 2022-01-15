/// <reference types="vite/client" />

declare module '*.vue' {
  import { defineComponent } from 'vue'
  export default defineComponent
}

declare module 'makeit-captcha'
declare module 'nprogress'
