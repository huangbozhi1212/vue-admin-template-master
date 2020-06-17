import request from '@/utils/request'
export default {
  // 获取Banner分页列表
  getBannerList(page, limit) {
    return request({
      url: `/cmsservice/bannerAdmin/${page}/${limit}`,
      method: 'get'
    })
  },
  // 增加banner
  addBanner(banner) {
    return request({
      url: `/cmsservice/bannerAdmin/save`,
      method: 'post',
      data: banner
    })
  },
  // 更新banner
  updateBanner(banner) {
    return request({
      url: `/cmsservice/bannerAdmin/update`,
      method: 'put',
      data: banner
    })
  },
  // 删除Banner
  removeBannerById(id) {
    return request({
      url: `/cmsservice/bannerAdmin/remove/${id}`,
      method: 'delete'
    })
  },
  //  根据id查询
  getBannerById(id) {
    return request({
      url: `/cmsservice/bannerAdmin/get/${id}`,
      method: 'get'
    })
  }
}
