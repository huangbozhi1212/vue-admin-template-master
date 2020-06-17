import request from '@/utils/request'

export default {
  // 讲师列表
  getTeacherListPage(current, limit, teacherQuery) {
    return request({
      url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
      method: 'post',
      data: teacherQuery
    })
  },
  // 删除讲师
  removeById(teacherId) {
    return request({
      url: `/eduservice/teacher/${teacherId}`,
      method: 'delete'
    })
  },
  // 新增讲师
  save(teacher) {
    return request({
      url: `/eduservice/teacher/addTeacher`,
      method: 'post',
      data: teacher
    })
  },
  // 根据id查询讲师
  getById(id) {
    return request({
      url: `/eduservice/teacher/getTeacher/${id}`,
      method: 'get'
    })
  },
  // 修改讲师
  updateById(teacher) {
    return request({
      url: `/eduservice/teacher/updateTeacher`,
      method: 'post',
      data: teacher
    })
  }
}
