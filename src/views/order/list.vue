<template>
  <div>
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="orderQuery.courseTitle" placeholder="课程标题"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="orderQuery.teacherName" placeholder="讲师名称"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="orderQuery.status" clearable placeholder="订单状态">
          <el-option :value="0" label="未支付"/>
          <el-option :value="1" label="已支付"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="orderQuery.payType" clearable placeholder="支付类型">
          <el-option :value="1" label="微信"/>
          <el-option :value="2" label="支付宝"/>
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="orderQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="orderQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
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
      <el-table-column prop="courseTitle" label="课程名称" width="160" />
      <el-table-column prop="" label="课程封面">
        <!--加入下面的内容,scope.row代表这一行,img是显示这一行的哪个字段,我的是img,你的自己看下-->
        <template slot-scope="scope" class="demo-image__preview">
        <el-image :src="scope.row.courseCover" :alt="scope.row.courseTitle" fit="contain"/></template>
      </el-table-column>
      <el-table-column prop="teacherName" label="讲师名称" width="90" />
      <el-table-column prop="nickname" label="会员昵称" width="90" />
      <el-table-column prop="totalFee" label="订单金额" width="90" />
      <el-table-column label="订单状态" width="90">
        <template slot-scope="scope">
          {{ scope.row.status===0?'未支付':'已支付' }}
        </template>
      </el-table-column>
      <el-table-column label="支付类型" width="90">
        <template slot-scope="scope">
          {{ scope.row.payType===1?'微信':'支付宝' }}
        </template>
      </el-table-column>
      <el-table-column prop="gmtCreate" label="订单创建时间" width="160"/>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="success" plain size="mini" @click="detail(scope.row.id)">详细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogTableVisible" title="订单详细">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="orderDetail.courseCover" style="width: 632.5px;height: auto">
        <div>
          <!--          <span style="margin: 2px">订单号：{{ orderDetail.orderNo }}</span>-->
          <!--          <span style="margin: 2px">课程id：{{ orderDetail.courseId }}</span>-->
          <!--          <span style="margin: 2px">课程名称：{{ orderDetail.courseTitle }}</span>-->
          <!--          <span style="margin: 2px">讲师名称：{{ orderDetail.teacherName }}</span>-->
          <!--          <span style="margin: 2px">会员id：{{ orderDetail.memberId }}</span>-->
          <!--          <span style="margin: 2px">会员昵称：{{ orderDetail.nickname }}</span>-->
          <!--          <span style="margin: 2px">会员手机：{{ orderDetail.mobile }}</span>-->
          <!--          <span style="margin: 2px">订单金额：{{ orderDetail.totalFee }}</span>-->
          <!--          <span style="margin: 2px">支付类型：{{ orderDetail.payType===1?'微信':'支付宝' }}</span>-->
          <!--          <span style="margin: 2px">订单状态：{{ orderDetail.payType===0?'未支付':'已支付' }}</span>-->
          <!--          <span style="margin: 2px">创建订单时间：{{ orderDetail.gmtCreate }}</span>-->
          <table class="gridtable">
            <tr>
              <th class="th">订单号</th><th class="td">{{ orderDetail.orderNo }}</th><th class="th">课程id</th><th class="td">{{ orderDetail.courseId }}</th><th class="th">课程名称</th><th class="td">{{ orderDetail.courseTitle }}</th>
            </tr>
            <tr>
              <td class="th">讲师名称</td><td class="td">{{ orderDetail.teacherName }}</td><td class="th">会员id</td><td class="td">{{ orderDetail.memberId }}</td><td class="th">会员昵称</td><td class="td">{{ orderDetail.nickname }}</td>
            </tr>
            <tr>
              <td class="th">会员手机</td><td class="td">{{ orderDetail.mobile }}</td><td class="th">订单金额</td><td class="td">{{ orderDetail.totalFee }}</td><td class="th">支付类型</td><td class="td">{{ orderDetail.payType===1?'微信':'支付宝' }}</td>
            </tr>
            <tr>
              <td class="th">订单状态</td><td class="td">{{ orderDetail.payType===0?'未支付':'已支付' }}</td><td class="th">创建订单时间</td><td class="td">{{ orderDetail.gmtCreate }}</td><td class="th"/><td class="td"/>
            </tr>
          </table>
        </div>
      </el-card>
    </el-dialog>

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
// 引入调用的teacher.js文件
import order from '@/api/order/order'
export default {
  data() {
    return {
      dialogTableVisible: false,
      list: null, // 查询之后接口返回集合
      page: 1, // 当前页
      limit: 5, // 每页记录数
      total: 0, // 总记录数
      orderQuery: {},
      orderDetail: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 讲师列表
    getList(page = 1) {
      this.page = page
      order.getOrderListPage(this.page, this.limit, this.orderQuery).then(
        response => {
          // 请求成功
          this.list = response.data.records
          this.total = response.data.total
        }
      ).catch(
        error => {
          console.log(error)
        }
      )
    },
    // 详细
    detail(id) {
      order.getOrderById(id).then(
        response => {
          // 请求成功
          this.orderDetail = response.data.order
        }
      ).catch(
        error => {
          console.log(error)
        }
      )
      this.dialogTableVisible = true
    },
    // 清空
    resetData() {
      this.orderQuery = {}
      this.getList()
    }
  }
}
</script>

<style scoped>
  table.gridtable {
    font-family: verdana,arial,sans-serif;
    font-size:11px;
    color:#333333;
    border-color: #EBEEF5;
    border-collapse: collapse;
  }
  .th {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #EBEEF5;
  }
  .td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #EBEEF5;
  }
</style>
