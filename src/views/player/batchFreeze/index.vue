<template>
  <div class="app-container">
    <el-form v-loading="formLoading" ref="form" :model="form" :rules="formRules" label-width="140px" size="mini">
      <el-form-item label="起始玩家ID" prop="startPlayerId">
        <el-col :span="6">
          <el-input v-model="form.startPlayerId"/>
        </el-col>
      </el-form-item>
      <el-form-item label="结束玩家ID" prop="endPlayerId">
        <el-col :span="6">
          <el-input v-model="form.endPlayerId"/>
        </el-col>
      </el-form-item>
      <el-form-item label="操作原因" prop="reason">
        <el-col :span="6">
          <el-input v-model="form.reason" :rows="2"  type="textarea" placeholder="请输入操作原因"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="batchFreezePlayer">批量封号</el-button>
        <el-button type="default" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'BatchFreezePlayerPage',
  data() {
    const customerValidator = (rule, value, callback) => {
      const re = /^\d{1,}$/
      if (!value || value.length === 0) {
        callback(new Error('必填项'))
      } else if (!re.test(value)) {
        callback(new Error('必须为纯数字'))
      } else {
        callback()
      }
    }
    return {
      form: {
        startPlayerId: null,
        endPlayerId: null,
        reason: null
      },
      formRules: {
        startPlayerId: [
          { required: true, trigger: 'blur', validator: customerValidator }
        ],
        endPlayerId: [
          { required: true, trigger: 'blur', validator: customerValidator }
        ],
        reason: [
          { required: true, trigger: 'blur', message: '必填项' }
        ]
      },
      formLoading: false
    }
  },
  methods: {
    batchFreezePlayer() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.formLoading = true
          this.$store.dispatch('BatchFreezePlayer', this.form).then(resp => {
            this.$message({
              message: resp.msg,
              type: 'success'
            })
            this.resetForm()
            this.formLoading = false
          }).catch(() => {
            this.formLoading = false
          })
        }
      })
    },
    resetForm() {
      this.form = {
        startPlayerId: null,
        endPlayerId: null,
        reason: null
      }
      this.$refs['form'].resetFields()
    }
  }
}
</script>

<style scoped>

</style>
