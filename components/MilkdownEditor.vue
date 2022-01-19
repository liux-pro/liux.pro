<template>
  <client-only>
    <div>
      <v-btn class="float-left" @click="changeReadOnly">
        readonly
      </v-btn>
      <v-btn class="float-left" @click="markdownStrong">
        strong
      </v-btn>
      <div ref="editor" :style="'height:'+height+'px'" />
    </div>
  </client-only>
</template>

<script>
export default {
  markdown: null,
  name: 'MilkdownEditor',
  props: {
    msg: {
      type: String,
      default: 'Start Typing',
      require: false
    }
  },
  data () {
    return {
      readonly: false,
      md: '# 123'
    }
  },
  computed: {
    height () {
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
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': breakPointFix = 0; break
          case 'sm': breakPointFix = 0; break
          case 'md': breakPointFix = 0; break
          case 'lg': breakPointFix = 36; break
          case 'xl': breakPointFix = 36; break
          default :breakPointFix = 0
        }
        workspaceHeight -= breakPointFix
        return workspaceHeight
      } else {
        return 0
      }
    }
  },
  async mounted () {
    const {
      nordDark
    } = await import('@milkdown/theme-nord')
    const {
      tooltip
    } = await import('@milkdown/plugin-tooltip')
    const {
      defaultValueCtx,
      Editor,
      rootCtx,
      editorViewOptionsCtx
    } = await import('@milkdown/core')
    const { commonmark } = await import('@milkdown/preset-commonmark')

    const {
      listener,
      listenerCtx
    } = await import('@milkdown/plugin-listener')

    this.nordDark = nordDark
    this.tooltip = tooltip
    this.defaultValueCtx = defaultValueCtx
    this.Editor = Editor
    this.rootCtx = rootCtx
    this.editorViewOptionsCtx = editorViewOptionsCtx
    this.listener = listener
    this.listenerCtx = listenerCtx

    const editable = () => !this.readonly
    this.editor = await Editor.make()
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
      .use(nordDark)
      .use(commonmark)
      .use(listener)
      .use(tooltip)
      .create()
      // setTimeout(() => {
      //   // readonly = true
      //   instance.use(nordDark)
      // }, 5000)
  },
  methods: {
    changeReadOnly (event) {
      this.readonly = !this.readonly
    },
    markdownStrong () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/deep/ .editor {
  padding: 1rem !important;
}

/deep/ .milkdown {
  height:  100%;
  overflow: auto;
}

/deep/ .editor > * {
  margin: 1rem 0 !important;
}
</style>
