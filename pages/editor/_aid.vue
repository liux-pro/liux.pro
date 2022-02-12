<template>
  <div>
    <div
      id="vditor"
      v-resize="handleResize"
      :style="{height: editorHeight}"
    />
  </div>
</template>

<script>
import Vditor from 'vditor'
import { compositeKey } from '@/utils/hotkey'
import { sha256 } from '@/utils/EncryptUtils'
import 'vditor/dist/index.css'
import 'vditor/dist/css/content-theme/dark.css'

export default {
  name: 'EditorPage',

  async asyncData ({
    params,
    $axios,
    redirect
  }) {
    let aid = params.aid
    if (!/\d+/.test(aid)) {
      const response = await $axios.$get('/getId')
      aid = response.data
      redirect(`/editor/${aid}`)
    }
    return { aid }
  },
  data () {
    return {
      contentEditor: null,
      editorHeight: 'auto'
    }
  },
  computed: {},
  mounted () {
    this.contentEditor = new Vditor('vditor', {
      icon: 'material',
      theme: 'dark',
      // _lutePath: '',
      preview: {
        theme: {
          // 阻止从默认cdn加载主题
          path: ''
        }
      },
      cdn: '../vditor',
      toolbarConfig: {
        pin: true
      },
      cache: {
        enable: false
      },
      after: () => {
        this.$axios.$get(`/article/${this.aid}`).then(
          (article) => {
            if (article.data) {
              this.contentEditor.setValue(article.data.content)
            }
          }
        )
      },
      upload: {
        accept: 'image/*,.mp3, .wav, .rar',
        token: 'test',
        url: process.env.baseUrl + 'upload',
        linkToImgUrl: process.env.baseUrl + 'imgUrlConvert',
        filename (name) {
          return name
        }
      },
      input: (value) => {
        console.log(value)
        sha256(value.trimRight()).then((hex) => {
          console.log(hex)
          this.$axios.$post(`/article/${this.aid}`, {
            title: 'mytitle',
            content: value
          })
        })
      }
    })
    // hook保存快捷键
    compositeKey('ctrl+s', (e) => {
      e.preventDefault()// 阻止默认的保存动作
      this.$axios.$post(`/article/${this.aid}`, {
        title: 'mytitle',
        content: this.contentEditor.getValue()
      })
    })
    this.handleResize()
  },
  methods: {
    handleResize () {
      if (process.client) {
        const pad = this.$vuetify.application.bar +
          this.$vuetify.application.top
        let workspaceHeight = window.innerHeight - pad

        let breakPointFix = 0
        // todo magic number
        // this.$vuetify.application.footer + this.$vuetify.application.insetFooter 这两个东西在网页打开的时候固化，以后一直不变
        // 即使footer隐藏，他也不变了
        // footer 上加了 hidden-md-and-down 自动隐藏是能工作的，但是以上老是不变
        // switch (this.$vuetify.breakpoint.name) {
        //   case 'xs': breakPointFix = 0; break
        //   case 'sm': breakPointFix = 0; break
        //   case 'md': breakPointFix = 0; break
        //   case 'lg': breakPointFix = -this.$vuetify.application.footer + this.$vuetify.application.insetFooter; break
        //   case 'xl': breakPointFix = -this.$vuetify.application.footer + this.$vuetify.application.insetFooter; break
        //   default :breakPointFix = 0
        // }
        const footerHeight = document.querySelector('footer').clientHeight
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
            breakPointFix = 0
            break
          case 'sm':
            breakPointFix = 0
            break
          case 'md':
            breakPointFix = 0
            break
          case 'lg':
            breakPointFix = footerHeight
            break
          case 'xl':
            breakPointFix = footerHeight
            break
          default :
            breakPointFix = 0
        }
        workspaceHeight -= breakPointFix
        this.editorHeight = workspaceHeight + 'px'
      }
    }
  }
}
</script>

<style scoped>
/deep/ ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/deep/ ::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/deep/ ::-webkit-scrollbar-thumb {
  background: var(--second-color);
  border-radius: 10px;
}

/deep/ ::-webkit-scrollbar-thumb:hover {
  background: rgb(54, 56, 58);
}
/deep/ .vditor-reset{
  padding-left: 50px !important;
  padding-right: 50px !important;
}
</style>
