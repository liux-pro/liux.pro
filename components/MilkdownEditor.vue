<template>
  <client-only>
    <div>
      <el-button @click="changeReadOnly">
        readonly
      </el-button>
      <div ref="editor" />
    </div>
  </client-only>
</template>

<script>
export default {
  markdown: null,
  name: 'MilkdownEditor',
  props: {
    msg: {
      type: String, default: 'Start Typing', require: false
    }
  },
  data () {
    return {
      readonly: false,
      md: '# 123'
    }
  },
  mounted () {
    (async () => {
      const {
        nordLight
      } = await import('@milkdown/theme-nord')
      const {
        defaultValueCtx,
        Editor,
        rootCtx,
        editorViewOptionsCtx
      } = await import('@milkdown/core')
      const { commonmark } = await import('@milkdown/preset-commonmark')

      const { listener, listenerCtx } = await import('@milkdown/plugin-listener')

      Editor.make()
        .config((ctx) => {

        })
        .use(listener)

      const editable = () => !this.readonly
      this.e = await Editor.make()
        .config((ctx) => {
          ctx.set(rootCtx, this.$refs.editor)
          ctx.set(defaultValueCtx, this.$props.msg)
          this.markdown = this.$props.msg
          ctx.set(editorViewOptionsCtx, { editable })
          ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
            this.markdown = markdown
            console.log(markdown)
          })
        })
        .use(nordLight)
        .use(commonmark)
        .use(listener)
        .create()
      // setTimeout(() => {
      //   // readonly = true
      //   instance.use(nordDark)
      // }, 5000)
    })()
  },
  methods: {
    changeReadOnly (event) {
      event.target.blur()
      this.readonly = !this.readonly
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 /deep/ .editor {
  padding: 1rem !important;
}

 /deep/ .editor>* {
  margin: 1rem 0 !important;
}
</style>
