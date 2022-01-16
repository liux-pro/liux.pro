<template>
  <div>
    <el-row>
      <el-col :md="4" :lg="4" :xl="4" class="hidden-sm-and-down aaa">
        <Menu />
      </el-col>
    </el-row>
    <el-row>
      <!--      https://blog.csdn.net/qq_41813208/article/details/108425529-->
      <!--      https://blog.csdn.net/sylfffffffff/article/details/105100386-->

      <el-col :md="4" :lg="4" :xl="4" class="hidden-sm-and-down">
        &nbsp;
      </el-col>
      <el-col :xs="24" :sm="24" :md="20" :lg="16" :xl="16">
        <nuxt-child />
      </el-col>
      <el-col :lg="4" :xl="4" class="hidden-md-and-down">
        &nbsp;
      </el-col>
      <!--      <el-col :xs="0" :sm="0" :md="2" :lg="3" :xl="3"></el-col>-->
    </el-row>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'
// import Header from '@/components/Header'

export default {
  name: 'DefaultLayout',
  // components: { Header },
  data () {
    return {}
  },
  methods: {
    goBack () {
      console.log('go back')
    }
  }
}
</script>
<style scoped>
.aaa {
  position: fixed;
  z-index: 9999;
}
</style>
