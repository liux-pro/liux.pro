<template>
  <client-only>
    <div ref="editor" />
  </client-only>
</template>

<script>
export default {
  name: 'MilkdownEditor',
  props: {
    msg: String
  },
  mounted () {
    (async () => {
      const { nord } = await import('@milkdown/theme-nord')
      const {
        defaultValueCtx,
        Editor,
        rootCtx,
        editorViewOptionsCtx
      } = await import('@milkdown/core')
      const { commonmark } = await import('@milkdown/preset-commonmark')
      let readonly = false
      const editable = () => !readonly
      await Editor.make()
        .config((ctx) => {
          ctx.set(rootCtx, this.$refs.editor)
          ctx.set(defaultValueCtx, this.$props.msg)
          ctx.set(editorViewOptionsCtx, { editable })
        })
        .use(nord)
        .use(commonmark)
        .create()
      setTimeout(() => {
        readonly = true
      }, 5000)
    })()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
