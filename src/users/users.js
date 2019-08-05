/* eslint-disable camelcase */
export default {
  data () {
    return {
      usersData: [{
        username: '王小虎',
        email: '1324564@qq.com',
        mobile: 1231234567
      }],
      total: 0,
      pagenum: 1,
      input3: '',
      addUserFormVisible: false,
      amendFormVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      amendForm: {
        id: 0,
        username: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 5,
          message: '长度在 3 到 5 个字符',
          trigger: 'blur'
        }
        ],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          min: 4,
          max: 8,
          message: '长度在 4 到 8 个字符',
          trigger: 'blur'
        }
        ],
        email: [{
          pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          message: '格式不正确',
          trigger: 'blur'
        }],
        mobile: [{
          pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
          message: '格式不正确',
          trigger: 'blur'
        }]
      },
      value1: true,
      // 角色列表数据
      rolesData: [],
      // 是否显示分配角色对话框
      dialogAssignRoleVisible: false,
      // 分配角色对话框
      assignRoleForm: {
        // usermname 只负责展示,没有请求使用
        username: '飞哥',
        id: 0, // 用户id
        rid: '' // 角色id
      }
    }
  },
  created () {
    this.getUsersData()
    this.loadRoleData()
  },
  methods: {
    async getUsersData (pagenum = 1, query = '') {
      let res = await this.$axios.get('users', {
        params: {
          query,
          pagenum,
          pagesize: 2
        }
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      })
      this.usersData = res.data.data.users
      this.total = res.data.data.total
      this.pagenum = res.data.data.pagenum
    },
    // 分页
    currentPageChanged (curPage) {
      this.getUsersData(curPage, this.input3)
    },
    // 搜索
    seachUsers () {
      this.getUsersData(1, this.input3)
    },
    // 显示添加框
    showAddUserDialog () {
      this.addUserFormVisible = true
    },
    // 添加用户
    async addUserData () {
      let res = await this.$axios.post('users', this.addUserForm)
      if (res.data.meta.status === 201) {
        this.addUserFormVisible = false
        this.$message({
          message: '添加用户成功',
          type: 'success',
          duration: 800
        })
        this.getUsersData()
      }
    },
    // 重置
    dialogClosed () {
      this.$refs.addUserRef.resetFields()
    },
    // 是否删除弹窗
    async openDelUser (id) {
      await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delUsers(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 删除
    async delUsers (id) {
      let res = await this.$axios.delete(`users/${id}`)
      if (res.data.meta.status === 200) {
        this.getUsersData()
      }
    },
    // 更新状态
    async stateChange (row) {
      const { id, mg_state } = row
      let res = await this.$axios.put(`users/${id}/state/${mg_state}`)
      if (res.data.meta.status === 200) {
        // 1. 提示
        this.$message({
          message: '更新状态成功',
          type: 'success',
          duration: 800
        })
      }
    },
    // 显示编辑用户框
    showamendUsers (row) {
      let { id, username, email, mobile } = row
      this.amendForm.id = id
      this.amendForm.username = username
      this.amendForm.email = email
      this.amendForm.mobile = mobile
      this.amendFormVisible = true
    },
    // 编辑用户
    async amendUsers () {
      let id = this.amendForm.id
      this.amendFormVisible = false
      let res = await this.$axios.put(`users/${id}`, {
        mobile: this.amendForm.mobile,
        email: this.amendForm.email
      })
      if (res.data.meta.status === 200) {
        // 1. 提示
        this.$message({
          message: '编辑成功',
          type: 'success',
          duration: 800
        })
        this.getUsersData(this.pagenum, this.input3)
      }
    },
    // 加载角色
    async loadRoleData () {
      let res = await this.$axios.get('roles')
      console.log(res)
      this.rolesData = res.data.data
    },
    // 展示分配角色对话框
    async showRoleData (row) {
      this.dialogAssignRoleVisible = true
      const { id, username } = row
      this.assignRoleForm.id = id
      this.assignRoleForm.username = username

      let res = await this.$axios.get(`users/${id}`)
      this.assignRoleForm.rid =
        res.data.data.rid === -1 ? '' : res.data.data.rid
    },
    // 分配角色
    async assignRole () {
      const { id, rid } = this.assignRoleForm
      let res = await this.$axios.put(`users/${id}/role`, {
        rid
      })
      if (res.data.meta.status === 200) {
        // 1. 关闭对话框
        this.dialogAssignRoleVisible = false
        // 2. 提示
        this.$message({
          message: '分配角色成功',
          type: 'success',
          duration: 800
        })
        // 3. 刷新
        this.getUsersData(this.pagenum, this.input3)
      }
    }
  }
}
