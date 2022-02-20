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
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
    }
  }

  constructor ({ data,api }) {
    this.data = data
    this.api = api
  }
  static get enableLineBreaks() {
    return true;
  }
  render () {
    const wrapper = document.createElement('div')
    const input = document.createElement('code-input')
    input.setAttribute('lang', 'java')
    if (this.data && this.data.code){
      input.value = this.data.code
    }
    this.api.listeners.on(input, 'input', event => {
      let textarea = input.querySelector("textarea")
      let result  = calcTextareaHeight(textarea)
      input.style.height=result.height
    }, false);
    this.api.listeners.on(input, 'keypress', event => {
        console.log(event)
    }, false);

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
