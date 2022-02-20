<template>
  <div>
    <div
      id="editor"
      v-resize="handleResize"
      :style="{height: editorHeight}"
      :class="editorCLass"
    />
    <v-btn
      color="pink"
      fab
      dark
      small
      absolute
      bottom
      left
      @click="handleSave"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
// import { sha256 } from '@/utils/EncryptUtils'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import CodeInput from '@/editor/codeInput/index'
import { compositeKey } from '@/utils/hotkey'
import 'prismjs/components/prism-java'

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
      contentEditor: null,
      editorHeight: 'auto'
    }
  },
  computed: {
    editorCLass () {
      if (this.$nuxt.$vuetify.theme.isDark) {
        return ['dark']
      } else {
        return []
      }
    }

  },
  mounted () {
    this.contentEditor = new EditorJS({
      holder: 'editor',
      tools: {
        header: {
          class: Header,
          inlineToolbar: true
        },
        code: {
          class: CodeInput
        }
      },
      data: this.content
    })
    // hook保存快捷键
    compositeKey('ctrl+s', (e) => {
      e.preventDefault()// 阻止默认的保存动作
      this.handleSave()
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
$menu-background: rgb(39, 39, 39);

.dark {
  ::v-deep {
    .ce-toolbar {
      //tune按钮
      .ce-toolbar__settings-btn {
        color: inherit;
      }

      //加号按钮
      .ce-toolbar__plus {
        color: inherit;
      }
    }

    //加号点开之后
    .ce-toolbox {
      background-color: $menu-background;
      border-radius: 5px;

      .ce-toolbox__button {
        margin-left: 0;
        color: inherit;
      }
    }

    //tune点开的菜单
    .ce-settings {
      background-color: $menu-background;
      border-style: none;

      .ce-settings__button {
        color: inherit;
      }
    }

    //选中的部分
    ::selection {
      background: $menu-background;
    }

    //选中block内容后弹出的菜单
    .ce-inline-toolbar {
      background: $menu-background;
      color: inherit;
      border-style: none;
    }

    //选中后点转换弹出的菜单
    .ce-conversion-toolbar {
      background-color: $menu-background;

      .ce-conversion-tool__icon {
        background-color: $menu-background;
      }

      .ce-conversion-tool--focused {
        background-color: $menu-background;
      }
    }

  }
}

.dark {
  ::v-deep {
    .ce-toolbar__settings-btn:hover, .ce-inline-tool:hover,
    .ce-inline-toolbar__dropdown:hover, .ce-toolbar__plus:hover,
    .ce-toolbox__button:hover {
      background: gray;
      color: white;
    }
  }
}

//block选中后的框
::v-deep .ce-block--selected .ce-block__content {
  background-color: rgb(112, 112, 112);
  border-radius: 10px;
}
</style>

<style>
#editor {
  overflow: auto;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
}

::-webkit-scrollbar-thumb {
  background: rgb(54, 56, 58);
}

::-webkit-scrollbar-thumb:hover {
  background: grey;
}
</style>
<style>
.theme--dark.v-application code{
  background-color: unset;
}
</style>
