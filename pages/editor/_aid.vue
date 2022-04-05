<template>
  <div :style="{height: editorHeight}">
    <div
      id="editor"
      v-resize="handleResize"
    />
  </div>
</template>

<script>
// import { sha256 } from '@/utils/EncryptUtils'
import $ from 'jquery'

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

    const response = (await $axios.$get(`/article/${aid}`)).data
    let content = null
    if (response) {
      content = JSON.parse(response.content)
    }
    return {
      aid,
      content
    }
  },
  data () {
    return {
      editor: null,
      editorHeight: 'auto'
    }
  },
  computed: {},
  mounted () {
    // 挂载jquery
    window.$ = window.jQuery = $

    const editorOption = {
      // width: "90%",
      height: '100%',
      path: '/editor-md/lib/',
      theme: 'dark',
      previewTheme: 'dark',
      editorTheme: 'pastel-on-dark',
      // markdown : md,   //动态设置的markdown文本
      codeFold: true,
      // syncScrolling : false,
      saveHTMLToTextarea: true, // 保存 HTML 到 Textarea
      searchReplace: true,
      // watch : false,                // 关闭实时预览
      htmlDecode: 'style,script,iframe|on*', // 开启 HTML 标签解析，为了安全性，默认不开启
      // toolbar  : false,             //关闭工具栏
      // previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
      emoji: true,
      taskList: true,
      tocm: true, // Using [TOCM]
      tex: true, // 开启科学公式TeX语言支持，默认关闭
      flowChart: true, // 开启流程图支持，默认关闭
      sequenceDiagram: true, // 开启时序/序列图支持，默认关闭,
      // dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
      // dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
      // dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
      // dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
      // dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
      imageUpload: true,
      imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
      imageUploadURL: './php/upload.php',
      onload: () => {
        // console.log('onload', this);
        // this.fullscreen();
        // this.unwatch();
        // this.watch().fullscreen();

        // this.setMarkdown("#PHP");
        // this.width("100%");
        // this.height(480);
        // this.resize("100%", 640);
      }
    }

    // 加载editormd
    this.requireEditor(() => {
      // eslint-disable-next-line no-undef
      this.editor = editormd('editor', editorOption)
    })
    // hook保存快捷键
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
    },
    requireEditor (callback) {
      // eslint-disable-next-line no-unused-vars
      const vm = this
      // 设置全局变量，因为editormd依赖jquery
      window.$ = window.jQuery = $
      // 异步加载并执行
      $.getScript('/editor-md/editormd.min.js', function (script) {
        callback()
      })
      // 加载css
      $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', '/editor-md/css/editormd.min.css'))
    },
    handleSave () {
      this.contentEditor.save().then((data) => {
        this.$axios.$post(`/article/${this.aid}`, {
          title: 'mytitle',
          content: JSON.stringify(data)
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
