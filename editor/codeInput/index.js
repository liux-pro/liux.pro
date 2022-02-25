import './code-input.css'
import './liux.pro.code.css'
import codeInput from './code-input'
import Prism from 'prismjs'
import calcTextareaHeight from '@/utils/calcTextareaHeight'

codeInput.registerTemplate('syntax-highlighted', codeInput.templates.prism(Prism))

class CodeInput {
  static get toolbox () {
    return {
      title: 'Image',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>'
    }
  }

  constructor ({
    data,
    api
  }) {
    this.data = data
    this.api = api
  }

  static get enableLineBreaks () {
    return true
  }

  render () {
    const wrapper = document.createElement('div')
    wrapper.classList.add("code-wrapper")
    const input = document.createElement('code-input')
    input.setAttribute('lang', 'java')
    if (this.data && this.data.code) {
      input.value = this.data.code
    }
    //输入文字后重新计算dom高度
    this.api.listeners.on(input, 'input', event => {
      let textarea = input.querySelector('textarea')
      textarea.setAttribute('wrap', 'off')
      let result = calcTextareaHeight(textarea)
      //magic
      input.style.height = (parseInt(result.height.replace('px'))) + 'px'
    }, false)
    //监听输入框渲染到dom
    const observer = new MutationObserver((mutations) => {
      if (document.contains(input)) {
        //发个事件过去，让上面的代码重新计算高度
        input.dispatchEvent(new Event('input'))
        observer.disconnect()
      }
    })
    observer.observe(document, {
      attributes: false,
      childList: true,
      characterData: false,
      subtree: true
    })

    wrapper.appendChild(input)

    return wrapper
  }

  save (blockContent) {
    const input = blockContent.querySelector('code-input')

    return {
      code: input.value
    }
  }
}

export default CodeInput
