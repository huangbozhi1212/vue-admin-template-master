<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="banner标题">
        <el-input v-model="banner.title"/>
      </el-form-item>
      <el-form-item label="banner排序">
        <el-input-number v-model="banner.sort" :min="0" controls-position="right"/>
      </el-form-item>
      <el-form-item label="linkUrl">
        <el-input v-model="banner.linkUrl"/>
      </el-form-item>
      <el-upload
        :on-success="uploadSuccess"
        :file-list="fileList"
        :action="BASE_API+'/eduoss/fileoss'"
        class="upload-demo"
        list-type="picture"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
    </el-form>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import banner from '../../../api/cms/banner'
const defaultForm = {
  title: '',
  sort: 0,
  linkUrl: '',
  imageUrl: ''
}
export default {
  data() {
    return {
      banner: {
        imageUrl: ''
      },
      fileList: [],
      saveBtnDisabled: false, // 保存按钮是否禁用,
      // 上传弹框组件是否显示
      imagecropperShow: false,
      imagecropperKey: 0, // 上传组件key值
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
        this.getInfo(id)
      } else {
        // 使用对象拓展运算符，拷贝对象，而不是引用，
        // 否则新增一条记录后，defaultForm就变成了之前新增的teacher的值
        this.banner = { ...defaultForm }
      }
    },
    uploadSuccess(file) {
      this.banner.imageUrl = file.data.url
    },
    getInfo(id) {
      banner.getBannerById(id).then(response => {
        this.banner = response.data.item
        this.fileList = [{ name: `${response.data.item.title}`, url: `${response.data.item.imageUrl}` }]
      })
    },
    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (!this.banner.id) {
        this.saveBanner()
      } else {
        this.updateBanner()
      }
    },
    saveBanner() {
      banner.addBanner(this.banner).then(response => {
        this.fileList = []
        return this.$message({
          type: 'success',
          message: '保存成功!'
        })
      }).then(resposne => {
        this.$router.push({ path: '/cms/banner/list' })
      }).catch((response) => {
        // console.log(response)
        this.$message({
          type: 'error',
          message: '保存失败'
        })
      })
    },
    updateBanner() {
      banner.updateBanner(this.banner).then(response => {
        this.fileList = []
        return this.$message({
          type: 'success',
          message: '保存成功!'
        })
      }).then(resposne => {
        this.$router.push({ path: '/cms/banner/list' })
      }).catch((response) => {
        // console.log(response)
        this.$message({
          type: 'error',
          message: '保存失败'
        })
      })
    }
  }
}

</script>

<style scoped>

</style>
