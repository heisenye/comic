import { createApp, defineComponent } from 'vue'
import {TheButton} from "ui"

export const MessageBox = defineComponent({
  props: {
    msg: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'info'
    },
    click: {
      type: Function
    }
  },
  setup(props) {
    const types = {
      success: { icon: 'fa-circle-check', alertType: 'alert-success' },
      info: { icon: 'fa-circle-info', alertType: 'alert-info' },
      warning: { icon: 'fa-circle-exclamation', alertType: 'alert-warning' },
      error: { icon: 'fa-circle-xmark', alertType: 'alert-error' }
    }

    const className = [
      'alert',
      'fixed',
      "z-50",
      'left-1/2',
      '-translate-x-1/2',
      'bottom-12',
      'w-4/5',
      'max-w-lg',
      'font-Noto',
      'gap-6',
      'xl:gap-8',
      types[props.type].alertType
    ]

    const closeBtnClass = [
      'absolute',
      'right-0',
      'top-0',
      'text-lg',
    ]

    const iconClass = types[props.type].icon

    return () => {
      return (
          <div class={className}>
            <i class={['fa-solid', 'xl:text-lg', '2xl:text-xl', iconClass]}></i>
            <div class='xl:text-lg'>{props.msg}</div>
            <TheButton type={"ghost"} shape={"circle"} size={"sm"} class={closeBtnClass} onClick={props.click}>
              <i class="fa-solid fa-xmark-circle"></i>
            </TheButton>
          </div>
      )
    }
  }
})

function showMsg(msg, type, fn) {
  const div = document.createElement('div')
  document.body.appendChild(div)

  const app = createApp(MessageBox, {
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
  })
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
