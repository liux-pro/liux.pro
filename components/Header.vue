<template>
  <el-tabs v-model="activeName" tab-position="left" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">
      <span slot="label"><i class="el-icon-date" /> 我的行程</span>
    </el-tab-pane>
    <el-tab-pane label="配置管理" name="second">
      配置管理
    </el-tab-pane>
    <el-tab-pane label="角色管理" name="third">
      角色管理
    </el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">
      定时任务补偿
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'HeaderComponent'
}
</script>

<style scoped></style>
