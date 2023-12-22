import { createApp } from 'vue'
import AlertBox from './AlertBox'
import ToastBox from './ToastBox'

function showMsg({ msg, messageType , popupType = 'alert', toastPos, fn }) {
  const div = document.createElement('div')
  document.body.appendChild(div)
  let box

  switch (popupType) {
    case 'alert':
      box = AlertBox
      break
    case 'toast':
      box = ToastBox
      break
  }

  const type = messageType

  const appProps = {
    msg,
    type,
    click: () => {
      if (fn && typeof fn === 'function') fn()
      setTimeout(() => {
        app.unmount()
        div.remove()
      }, 500)
      div.classList.add('opacity-0', 'transition-opacity')
    }
  }

  if (popupType === 'toast' && toastPos)  appProps.position = toastPos

  const app = createApp(box, appProps)
  app.mount(div)

  setTimeout(() => {
    setTimeout(() => {
      app.unmount()
      div.remove()
    }, 1000)

    div.classList.add('opacity-0', 'transition-opacity')
  }, 2500)
}

export default showMsg