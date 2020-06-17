import request from '@/utils/request'
export default {
  // 1 生成统计数据
  createStaData(day) {
    return request({
      url: '/staservice/statistics/registerCount/' + day,
      method: 'post'
    })
  },
  // 2 获取统计数据
  getDataSta(searchObj) {
    return request({
      url: `/staservice/statistics/showChart/${searchObj.begin}/${searchObj.end}/${searchObj.type}`,
      method: 'get'
    })
  }
}
