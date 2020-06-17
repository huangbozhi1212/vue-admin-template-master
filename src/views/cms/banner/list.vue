<template>
  <div>
    <el-table
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>
      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="100" />
      <el-table-column prop="linkUrl" label="linkUrl" width="100" />
      <el-table-column prop="" label="banner" >
        <!--加入下面的内容,scope.row代表这一行,img是显示这一行的哪个字段,我的是img,你的自己看下-->
        <template slot-scope="scope" class="demo-image__preview" style="width: 100px; height: 100px" >
          <el-image :src="scope.row.imageUrl" :alt="scope.row.title" fit="contain"/>
        </template>
      </el-table-column>
      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>
      <el-table-column prop="sort" label="排序" width="60" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/cms/banner/form/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeBannerById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
// 引入调用的banner.js文件
import banner from '@/api/cms/banner'
export default {
  data() {
    return {
      list: null, // 查询之后接口返回集合
      page: 1, // 当前页
      limit: 10, // 每页记录数
      total: 0 // 总记录数
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // banner列表
    getList(page = 1) {
      this.page = page
      banner.getBannerList(this.page, this.limit).then(
        response => {
          // 请求成功
          console.log(response)
          this.list = response.data.items
          this.total = response.data.total
        }
      ).catch(
        error => {
          console.log(error)
        }
      )
    },
    // 删除banner
    removeBannerById(id) {
      this.$confirm('此操作将删除该banner, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用删除方法
        banner.removeBannerById(id).then(
          response => { // 删除成功
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          }
        )
      })
    }
  }
}
</script>

<style scoped>

</style>
