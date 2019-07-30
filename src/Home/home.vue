<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span='8'>
          <img
            src="../assets/logo.png"
            alt=""
          >
        </el-col>
        <el-col :span='8'>
          <h1>黑马程序员后台管理</h1>
        </el-col>
        <el-col
          :span='8'
          class="clo3"
        >
          恭喜黑马前端44期年薪200万
          <a
            @click.prevent='logout'
            href="#"
          >退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :router="true"
          :default-active="handleUrlPath()"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/users">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/roles">角色列表</el-menu-item>
              <el-menu-item index="/rights">权限列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('token')
        this.$message({
          type: 'success',
          message: '退出成功!',
          duration: 800
        })
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出',
          duration: 800
        })
      })
    },
    handleUrlPath () {
      return this.$route.path
    }
  }
}
</script>

<style scoped lang='less'>
.el-header {
  background: #ccc;
  padding: 0;
  h1 {
    color: #fff;
    font-size: 26px;
    text-align: center;
    line-height: 60px;
  }
  .clo3 {
    text-align: right;
    padding-right: 30px;
    line-height: 60px;
  }
}
.el-aside {
  background: rgb(119, 167, 119);
}
.el-main {
  background: rgb(179, 102, 102);
}
.el-container {
  height: 100%;
}
</style>
