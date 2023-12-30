import service from './service'
import msg from '../constants/msg'
import showMsg from '../utils/showMsg'

function createRequest() {
  const cache = new Map()
  const timeStamps = new Map()

  function execute(config, { useCache = true, useThrottle = false, throttleTime = 3000 } = {}) {
    const configKey = JSON.stringify(config)
    const now = Date.now()
    const prev = timeStamps.get(configKey)

    if (useThrottle && prev && now - prev < throttleTime) {
      showMsg({
        msg: msg['TOO_MANY_REQUESTS'],
        messageType: 'warning',
        popupType: 'alert'
      })
      throw new Error(msg['TOO_MANY_REQUESTS'])
    }
    timeStamps.set(configKey, now)

    const { method = 'GET' } = config
    if (method.toUpperCase() !== 'GET') {
      return service(config)
        .then((response) => response.data)
        .catch((error) => {
          throw error
        })
    }

    if (useCache && cache.has(configKey)) {
      return cache.get(configKey)
    }

    return service(config)
      .then((response) => {
        if (useCache) {
          cache.set(configKey, Promise.resolve(response.data))
        }
        return response.data
      })
      .catch(error => {
        if (useCache) {
          cache.delete(configKey)
        }
        throw error
      })
  }


  return execute
}

const request = createRequest()

export default request
