import request from '@/utils/request'

export default {
  saveCourseInfo(courseInfo) {
    return request({
      url: `/eduservice/course/addCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },
  getTeacherList() {
    return request({
      url: `/eduservice/teacher/findAll`,
      method: 'get'
    })
  },
  // 根据课程id查询课程基本信息
  getCourseInfoId(id) {
    return request({
      url: `/eduservice/course/getCourseInfo/${id}`,
      method: 'get'
    })
  },
  // 修改课程信息
  updateCourseInfoId(courseInfo) {
    return request({
      url: `/eduservice/course/updateCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },
  // 查询课程信息
  getCoursePublishInfoById(id) {
    return request({
      url: `/eduservice/course/getPublishCourseInfo/${id}`,
      method: 'get'
    })
  },
  // 课程最终发布
  publishCourse(id) {
    return request({
      url: `/eduservice/course/publishCourse/${id}`,
      method: 'post'
    })
  },
  // 分页查询课程
  getListCourse(page, limit, courseQuery) {
    return request({
      url: `/eduservice/course/${page}/${limit}`,
      method: 'post',
      data: courseQuery
    })
  },
  // 删除课程信息
  removeCourse(courseId) {
    return request({
      url: `/eduservice/course/${courseId}`,
      method: 'delete'
    })
  }
}
