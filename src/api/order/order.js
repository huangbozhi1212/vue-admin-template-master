import request from '@/utils/request'

export default {
// 订单列表
  getOrderListPage(page, limit, orderQuery) {
    return request({
      url: `/eduorder/order/${page}/${limit}`,
      method: 'post',
      data: orderQuery
    })
  },
  // 根据id查询订单
  getOrderById(id) {
    return request({
      url: `/eduorder/order/getOrderById/${id}`,
      method: 'get'
    })
  }
}
