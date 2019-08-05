export default {
  data () {
    return {
      rigthsData: [{
        roleName: '1',
        roleDesc: '222'
      }],
      rolesData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      dialogAssignRightsVisible: false,
      rolesId: 0
    }
  },
  created () {
    this.getRights()
    this.AssignRights()
  },
  methods: {
    indexMethod (index) {
      return index
    },
    async getRights () {
      let res = await this.$axios.get('roles')
      this.rigthsData = res.data.data
    },
    async AssignRights () {
      let res = await this.$axios.get('rights/tree')
      this.rolesData = res.data.data
    },
    showAssignRights (row) {
      this.dialogAssignRightsVisible = true
      this.rolesId = row.id
      // 获取第三层的id
      let keys = []
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            // console.log(item3.id)
            keys.push(item3.id)
          })
        })
      })
      // DOM更新完毕后,自动调用回调
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(keys)
      })
    },
    async assignRights () {
      // 获取半选和全选的 key
      console.log(this.$refs.tree)
      let keys1 = this.$refs.tree.getHalfCheckedKeys()
      let keys2 = this.$refs.tree.getCheckedKeys()

      let keys = [...keys1, ...keys2]
      let res = await this.$axios.post(`roles/${this.rolesId}/rights`, {
        rids: keys.join(',')
      })
      if (res.data.meta.status === 200) {
        this.dialogAssignRightsVisible = false
        this.$message({
          message: '角色授权成功',
          type: 'success',
          duration: 800
        })
        this.getRights()
      }
    }
  }
}
