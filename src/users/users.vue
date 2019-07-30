<template>
  <div>
    <el-table
      :data="usersData"
      style="width: 100%"
    >
      <el-table-column
        prop="username"
        label="姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="状态"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
      >
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="2"
      @current-change='currentPageChanged'
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      usersData: [{
        username: '王小虎',
        email: '1324564@qq.com',
        mobile: 1231234567
      }],
      total: 0
    }
  },
  created () {
    this.getUsersData()
  },
  methods: {
    getUsersData (pagenum = 1) {
      axios.get('http://localhost:8888/api/private/v1/users', {
        params: {
          query: '',
          pagenum,
          pagesize: 2
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        this.usersData = res.data.data.users
        this.total = res.data.data.total
        this.pagenum = res.data.data.pagenum
      })
    },
    currentPageChanged (curPage) {
      console.log(curPage)
      this.getUsersData(curPage)
    }
  }
}
</script>

<style>
</style>
