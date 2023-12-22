import { defineComponent } from 'vue'
import { TheButton } from 'ui'

const ToastBox = defineComponent({
  props: {
    msg: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'info'
    },
    position: {
      type: Array,
      default: ['center', 'bottom']
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

    const positions = {
      center: 'toast-center',
      top: 'toast-top',
      bottom: 'toast-bottom',
      start: 'toast-start',
      end: 'toast-end',
      middle: 'toast-middle'
    }

    const closeBtnClass = [
      'absolute',
      'right-0',
      'top-0',
      'text-lg',
      'xl:text-xl',
      '2xl:text-2xl'
    ]

    const alertTypeClass = types[props.type].alertType
    const ToastPosClass = props.position.map(pos => positions[pos])

    return () => {
      return (
        <div class={['toast', 'font-Noto', 'z-50', ToastPosClass]}>
          <div class={['alert', 'rounded-lg', alertTypeClass]}>
              <span class='text-sm'>
                {props.msg}
              </span>
          </div>
          <TheButton type="ghost" shape="circle" size="sm" class={closeBtnClass} onClick={props.click}>
            <i class="fa-solid fa-xmark-circle"></i>
          </TheButton>
        </div>
      )
    }
  }
})

export default ToastBox