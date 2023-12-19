import { createApp, defineComponent } from 'vue'

export const Loader = defineComponent({
  render() {
    const className = [
      'fixed',
      'top-1/2',
      'left-1/2',
      'loading',
      'loading-lg',
      'transform',
      '-translate-x-1/2',
      '-translate-y-1/2'
    ]

    return (
      <>
        <div class={className}></div>
      </>
    )
  }
})

function showLoader() {
  const div = document.createElement('div')
  document.body.appendChild(div)

  const app = createApp(Loader)
  app.mount(div)

  return {
    remove() {
      div.classList.add('opacity-0', 'transition-opacity', 'duration-1000', 'ease-in-out')

      setTimeout(() => {
        app.unmount()
        div.remove()
      }, 1200)
    }
  }
}

export default showLoader
