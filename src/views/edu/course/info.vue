<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>
    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
      </el-form-item>
      <!-- 所属分类：级联下拉列表 -->
      <!-- 一级分类 -->
      <el-form-item label="课程类别" >
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="请选择"
          @change="subjectLevelOneChanged">
          <el-option
            v-for="subject in subjectNestedList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>

        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="请选择">
          <el-option
            v-for="subject in subSubjectList"
            :key="subject.value"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
      </el-form-item>
      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select
          v-model="courseInfo.teacherId"
          placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
      </el-form-item>
      <!-- 课程简介-->
      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description"/>
      </el-form-item>
      <!-- 课程封面-->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/eduoss/fileoss'"
          class="avatar-uploader">
          <img :src="courseInfo.cover">
        </el-upload>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import course from '@/api/edu/course'
import subject from '@/api/edu/subject'

const defaultForm = {
  title: '',
  subjectId: '',
  teacherId: '',
  lessonNum: 0,
  description: '',
  cover: 'https://hbz-edu-file.oss-cn-beijing.aliyuncs.com/2020/05/03/7d1256afccf54d8c9f2279e21812299d默认封面.jpg',
  price: 0
}
export default {
  components: { Tinymce }, // 声明组件
  data() {
    return {
      fileList: [], // 上传文件列表
      courseInfo: defaultForm,
      teacherList: [], // 讲师列表
      saveBtnDisabled: false, // 保存按钮是否禁用
      subjectNestedList: [], // 一级分类列表
      subSubjectList: [], // 二级分类列表
      BASE_API: process.env.BASE_API // 获取dev.env.js里面地址
    }
  },
  watch: {
    $route(to, from) {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        // 根据id获取课程基本信息
        this.fetchCourseInfoById(id)
      } else {
        this.courseInfo = { ...defaultForm }
      }
      // 获取讲师列表
      this.initTeacherList()
      // 初始化分类列表
      this.initSubjectList()
    },
    // 获取讲师列表
    initTeacherList() {
      course.getTeacherList().then(response => {
        this.teacherList = response.data.items
      })
    },
    // 获取课程分类
    initSubjectList() {
      subject.getAllSubject().then(response => {
        this.subjectNestedList = response.data.list
      })
    },
    // 当选择一级分类时，触发该方法
    subjectLevelOneChanged(value) {
      console.log(value)
      for (let i = 0; i < this.subjectNestedList.length; i++) {
        if (this.subjectNestedList[i].id === value) {
          this.subSubjectList = this.subjectNestedList[i].children
          this.courseInfo.subjectId = ''
        }
      }
    },
    // 回显下拉框选中内容
    fetchCourseInfoById(id) {
      course.getCourseInfoId(id).then(response => {
        this.courseInfo = response.data.courseInfo
        // 初始化分类列表
        subject.getAllSubject().then(responseSubject => {
          this.subjectNestedList = responseSubject.data.list
          for (let i = 0; i < this.subjectNestedList.length; i++) {
            if (this.subjectNestedList[i].id === this.courseInfo.subjectParentId) {
              this.subSubjectList = this.subjectNestedList[i].children
            }
          }
        })
        // 获取讲师列表
        this.initTeacherList()
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: response.message
        })
      })
    },
    // 图片上传后成功调用
    handleAvatarSuccess(res, file) {
      console.log(res)// 上传响应
      console.log(URL.createObjectURL(file.raw))// base64编码
      this.courseInfo.cover = res.data.url
    },
    // 图片上传前调用的方法
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 更新课程信息
    updateData() {
      this.saveBtnDisabled = true
      course.updateCourseInfoId(this.courseInfo).then(response => {
        console.log(response)
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        return response// 将响应结果传递给then
      }).then(response => {
        this.$router.push({ path: '/edu/course/chapter/' + response.data.courseId })
      }).catch((response) => {
        // console.log(response)
        this.$message({
          type: 'error',
          message: '保存失败'
        })
      })
    },
    next() {
      this.saveBtnDisabled = true
      if (!this.courseInfo.id) {
        this.saveData()
      } else {
        this.updateData()
      }
    },
    // 保存
    saveData() {
      course.saveCourseInfo(this.courseInfo).then(response => {
        console.log(this.courseInfo)
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        return response// 将响应结果传递给then
      }).then(response => {
        this.$router.push({ path: '/edu/course/chapter/' + response.data.courseId })
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: response.message
        })
      })
    }
  }
}
</script>
<style scoped>
  .tinymce-container {
    line-height: 29px;
  }
</style>
