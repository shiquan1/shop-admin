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
          <el-submenu :index="item.id +''" v-for='item in list' :key='item.id'>
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="'/' + item1.path" v-for='item1 in item.children' :key='item1.id'>{{ item1.authName }}</el-menu-item>
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
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getMenus()
  },
  methods: {
    async logout () {
      try {
        await this.$confirm('此操作将退出, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        localStorage.removeItem('token')
        this.$message({
          type: 'success',
          message: '退出成功!',
          duration: 800
        })
        this.$router.push('/login')
      } catch (error) {
        this.$message({
          type: 'info',
          message: '取消退出',
          duration: 800
        })
      }
    },
    handleUrlPath () {
      return this.$route.path
    },
    async getMenus () {
      let res = await this.$axios.get('menus')
      this.list = res.data.data
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
  background: rgb(203, 186, 218);
}
.el-main {
  background: rgb(241, 236, 236);
  overflow: hidden;
}
.el-container {
  height: 100%;
}
</style>
