<template>
  <div>
    <el-card class="box-card" :header="s">
      <div slot="header" class="clearfix">
        <div style="float: right">
          <el-button
            round
            class="el-icon-s-unfold"
            size="mini"
            @click="menuButton"
          />
        </div>
      </div>
      <div id="code01">
        <nuxt-content :document="doc" />
      </div>
      <el-drawer
        size="60%"
        title="我是标题"
        :visible.sync="drawer"
        :with-header="false"
        direction="ltr"
      >
        <Menu />
      </el-drawer>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'ArticlePage',

  async asyncData ({
    $axios,
    $content,
    params
  }) {
    const doc = await $content(params.articleId).fetch()
    console.log(params)
    return {
      doc
    }
  },

  data () {
    return {
      drawer: false,
      ld: null,
      s: false
    }
  },

  mounted () {
    // this.$axios.get('/Spring01.md').then((r) => {
    //   this.md = r.data
    //   this.code = marked(this.md) // 将markdown内容解析
    // })
  },
  methods: {
    menuButton (event) {
      this.drawer = true
      // 修复按钮不失去焦点
      event.target.blur()
    }
  }
}
</script>

<style>
.el-card__header {
  padding: 8px !important;
}

code {
  border-radius: 10px;
  box-shadow: -20px 20px 60px #bebebe,
  20px -20px 60px #ffffff;
}

@media screen and (min-width: 992px) {
  .el-card__header {
    display: none;
  }
}

</style>
