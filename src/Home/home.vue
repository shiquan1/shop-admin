<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

}
</script>

<style scoped>
.el-header {
  background: #ccc
}
.el-aside {
  background: rgb(119, 167, 119)
}
.el-main {
  background: rgb(179, 102, 102)
}
.el-container {
  height: 100%
}
</style>
