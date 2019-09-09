<template>
  <div class="app-container">
    <el-form v-loading="spreadFormLoading" ref="spreadForm" :model="spreadForm" :rules="spreadRules" label-width="140px" size="mini">
      <el-form-item label="推广员ID" prop="id">
        <el-col :span="6">
          <el-input v-model="spreadForm.id"/>
        </el-col>
      </el-form-item>
      <el-form-item label="登录名" prop="loginName">
        <el-col :span="6">
          <el-input v-model="spreadForm.loginName"/>
        </el-col>
      </el-form-item>
      <el-form-item label="显示昵称" prop="showName">
        <el-col :span="6">
          <el-input v-model="spreadForm.showName"/>
        </el-col>
      </el-form-item>
      <el-form-item label="父推广员ID" prop="parentId">
        <el-col :span="6">
          <el-input v-model="spreadForm.parentId" disabled/><label>注：默认为顶级推广员</label>
        </el-col>
      </el-form-item>
      <el-form-item label="金币提成比率" >
        <label>{{ spreadForm.ratio + '%' }}</label>
      </el-form-item>
      <el-form-item label="默认密码" >
        <label>123456</label>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addSpreadUser">添加推广员</el-button>
        <el-button type="default" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AddSpreadUserPage',
  data() {
    const customerValidator = (rule, value, callback) => {
      const re = /^\d{1,}$/
      if (value.length === 0) {
        callback(new Error('必填项'))
      } else if (!re.test(value)) {
        callback(new Error('必须为纯数字'))
      } else {
        callback()
      }
    }
    return {
      spreadForm: {
        id: null,
        loginName: null,
        showName: null,
        parentId: 0,
        ratio: 60
      },
      spreadRules: {
        id: [
          { required: true, trigger: 'blur', validator: customerValidator }
        ],
        loginName: [
          { required: true, trigger: 'blur', message: '必填项' },
          { min: 6, trigger: 'blur', message: '登录名长度不能小于6位' }
        ],
        showName: [
          { required: true, trigger: 'blur', message: '必填项' },
          { min: 2, trigger: 'blur', message: '昵称长度不能小于2位' }
        ],
        parentId: [
          { required: true, trigger: 'blur', validator: customerValidator }
        ]
      },
      spreadFormLoading: false
    }
  },
  methods: {
    addSpreadUser() {
      this.$refs['spreadForm'].validate(valid => {
        if (valid) {
          this.spreadFormLoading = true
          this.$store.dispatch('AddSpreadUser', this.spreadForm).then(resp => {
            this.$message({
              message: resp.msg,
              type: 'success'
            })
            this.resetForm()
            this.spreadFormLoading = false
          }).catch(() => {
            this.spreadFormLoading = false
          })
        }
      })
    },
    resetForm() {
      this.spreadForm = {
        id: null,
        loginName: null,
        showName: null,
        parentId: 0,
        ratio: 45
      }
      this.$refs['spreadForm'].resetFields()
    }
  }
}
</script>

<style scoped>

</style>
