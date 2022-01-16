<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button
        round
        class="el-icon-menu"
        size="mini"
        @click="drawer = true"
      />
    </div>
    <div id="code01">
      <nuxt-content :document="page" />
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
</template>

<script>

export default {
  name: 'ArticlePage',

  // eslint-disable-next-line require-await
  async asyncData ({
    $axios,
    $content,
    params
  }) {
    const page = await $content(params.articleId).fetch()
    return {
      page
      // 这个变量名不能与data()里面的相同
    }
  },

  data () {
    return {
      drawer: false,
      ld: null
    }
  },

  mounted () {
    // this.$axios.get('/Spring01.md').then((r) => {
    //   this.md = r.data
    //   this.code = marked(this.md) // 将markdown内容解析
    // })
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
</style>
