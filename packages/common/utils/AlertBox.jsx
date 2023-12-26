import { defineComponent } from 'vue'
import { TheButton } from "ui"

export const AlertBox = defineComponent({
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

    const closeBtnClass = [
      'absolute',
      'right-0',
      'top-0',
      'text-lg',
      'xl:text-xl',
      '2xl:text-2xl'
    ]

    const iconClass = types[props.type].icon
    const alertClass = types[props.type].alertType

    return () => {
      return (
          <div class={['alert', 'z-50', 'fixed', 'left-1/2', '-translate-x-1/2', 'bottom-12', 'max-w-lg', 'w-4/5', 'gap-6', 'xl:gap-8', 'font-Noto', alertClass]}>
            <i class={['fa-solid', 'xl:text-lg', '2xl:text-xl', iconClass]}></i>
            <div class='xl:text-lg'>{props.msg}</div>
            <TheButton type="ghost" shape="circle" size="sm" class={closeBtnClass} onClick={props.click}>
              <i class="fa-solid fa-xmark-circle"></i>
            </TheButton>
          </div>
      )
    }
  }
})

export default AlertBox