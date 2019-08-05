<template>
    <el-table
      :data="goodsData"
      style="width: 100%">
      <el-table-column
        type='index'
        width="50">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goods_number"
        label="商品数量">
      </el-table-column>
      <el-table-column
        prop="add_time"
        label="创建时间">
      </el-table-column>
      <el-table-column
        label="操作">
      </el-table-column>
    </el-table>
</template>

<script>
export default {
  data () {
    return {
      goodsData: [{
        goods_name: '苹果',
        goods_price: '12',
        goods_number: '123',
        add_time: '1512954923'
      }]
    }
  },
  created () {
    this.getGoods()
  },
  methods: {
    async  getGoods () {
      let res = await this.$axios.get('goods', {
        params: {
          query: '',
          pagenum: 1,
          pagesize: 4
        }
      })
      console.log(res)
      this.goodsData = res.data.data.goods
    }
  }
}
</script>

<style>

</style>
