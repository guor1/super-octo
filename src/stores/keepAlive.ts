import { defineStore } from 'pinia'

export const useKeepAliveStore = defineStore('keepAlive', () => {
  const keepLiveRoute = ref([])
  const routeKey = ref('')
  const routeShow = ref(true)

  function pushKeepLive(component: String) {
    if (!keepLiveRoute.value.includes(component))
      keepLiveRoute.value.push(component)
  }

  function removeKeepLive(component: string) {
    const index = keepLiveRoute.value.indexOf(component)
    if (index !== -1)
      keepLiveRoute.value.splice(index, 1)
  }

  function clearKeepLive() {
    keepLiveRoute.value = []
  }

  function setRouteKey(key: string) {
    routeKey.value = key
  }

  function setRouteShow(key: boolean) {
    routeShow.value = key
  }

  return {
    keepLiveRoute,
    routeKey,
    routeShow,
    pushKeepLive,
    removeKeepLive,
    clearKeepLive,
    setRouteKey,
    setRouteShow,
  }
})
