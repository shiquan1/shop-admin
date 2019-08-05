<template>
<div>
  <el-button type='success' plain @click='showCategoriesMobile' >添加分类</el-button>
  <el-table
    :data="categoriesData"
    style="width: 100%"
  >
    <el-table-column type="expand">
      <template slot-scope="scope">
      <el-tree
        :data="scope.row.children"
        :props="defaultProps"
      ></el-tree>
      </template>
    </el-table-column>
    <el-table-column
      label="分类名称"
      prop="cat_name"
      width="180"
    >
    </el-table-column>
    <el-table-column
      label="是否有效"
      prop="cat_deleted"
      width="180"
    >
      <template slot-scope="scope">
        <span> {{ scope.row.cat_deleted ? '否' : '是'}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="层级"
      prop="cat_level"
    >
      <template slot-scope="scope">
        <span v-if='scope.row.cat_level==0'>一级</span>
        <span v-else-if='scope.row.cat_level==1'>二级</span>
        <span v-else>三级</span>
      </template>
    </el-table-column>
  </el-table>
  <!-- 添加分类框 -->
  <el-dialog title="添加分类" :visible.sync="categoriesFormVisible">
  <el-form :model="catFromData" label-width="80px">
    <el-form-item label="分类名称">
      <el-input v-model="catFromData.cat_name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="父级名称" >
          <!-- 级联选择器 -->
        <el-cascader v-model="catFromData.cat_pid_arr" :props="defaultProps1" :options="options" clearable></el-cascader>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="categoriesFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addCat">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
export default {
  /* eslint-disable */
  data () {
    return {
      categoriesData: [{
        cat_name: '大家电',
        cat_deleted: '是',
        cat_level: '一级',
        cat_id: 0
      }],
      defaultProps: {
        children: 'children',
        label: 'cat_name'
      },
      categoriesFormVisible: false,
      // 添加分类对象
      catFromData: {
        cat_name: '', // 分类名称
        cat_pid_arr: [] // 父级名称数组
      },
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则'
        }]
      }],
      defaultProps1: {
        value: 'cat_id',
        label: 'cat_name'
      }
    }
  },
  created () {
    this.getCategories()
    this.getCategories1()
  },
  methods: {
    // 获取列表
    async  getCategories () {
      let res = await this.$axios.get('categories', {
        params: {
          type: []
        }
      })
      this.categoriesData = res.data.data
    },
    // 显示添加框
    showCategoriesMobile () {
      this.categoriesFormVisible = true
    },
    // 加载分类数据
    async getCategories1 () {
      let res = await this.$axios.get('categories', {
        params: {
          type: 2
        }
      })
      this.options = res.data.data
    },
    // 添加分类
    async addCat () {
      const { cat_name, cat_pid_arr } = this.catFromData
      console.log(this.catFromData)
      let res = await this.$axios.post('categories', {
        cat_pid: cat_pid_arr[cat_pid_arr.length - 1], // 父id 指的是数组最后一个元素, 不是整个数组
        cat_name, // 要添加的分类名称 √
        cat_level: 2 // 层级
      })
      console.log(res)
      this.categoriesFormVisible = false
      this.getCategories()
    }
  }
}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
