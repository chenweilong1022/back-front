<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="changePasswordRules" label-width="120px">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-col :span="6">
          <el-input v-model="form.oldPassword" name="oldPassword" type="password"/>
        </el-col>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-col :span="6">
          <el-input v-model="form.newPassword" name="newPassword" type="password"/>
        </el-col>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-col :span="6">
          <el-input v-model="form.confirmPassword" name="confirmPassword" type="password"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changePassword">修改密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ChangePassword',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      changePasswordRules: {
        oldPassword: [{ required: true, trigger: 'blur', validator: validatePass }],
        newPassword: [{ required: true, trigger: 'blur', validator: validatePass }],
        confirmPassword: [{ required: true, trigger: 'blur', validator: validatePass }]
      }
    }
  },
  methods: {
    changePassword() {
      const vm = this
      this.$refs['form'].validate(valid => {
        if (valid) {
          const newPassword = vm.form.newPassword
          const confirmPassword = vm.form.confirmPassword
          if (newPassword !== confirmPassword) {
            this.$message({
              message: '两次密码输入不一致',
              type: 'error'
            })
            return false
          }
          vm.$store.dispatch('ChangePassword', vm.form).then(resp => {
            this.$message({
              message: resp.msg,
              type: 'success'
            })
            vm.$router.push({ path: '/' })
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
