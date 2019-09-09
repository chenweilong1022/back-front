<template>
  <div class="app-container">
    <el-form v-loading="remitDiamondFormLoading" ref="remitDiamondForm" :model="remitDiamondForm" :rules="remitDiamondRules" label-width="140px" size="mini">
      <el-form-item label="玩家ID" prop="playerId">
        <el-col :span="6">
          <el-input v-model="remitDiamondForm.playerId"/>
        </el-col>
      </el-form-item>
      <el-form-item label="划账金额" prop="remitDiamond">
        <el-col :span="6">
          <el-input v-model="remitDiamondForm.remitDiamond"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="remitDiamond">确定划账</el-button>
        <el-button type="default" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'RemitDiamondPage',
  data() {
    const customerValidator = (rule, value, callback) => {
      if (!value || value.length === 0) {
        callback(new Error('必填项'))
      } else if (isNaN(Number(value))) {
        callback(new Error('必须为纯数字'))
      } else {
        callback()
      }
    }
    return {
      remitDiamondForm: {
        playerId: null,
        remitDiamond: null
      },
      remitDiamondRules: {
        playerId: [
          { required: true, trigger: 'blur', validator: customerValidator }
        ],
        remitDiamond: [
          { required: true, trigger: 'blur', validator: customerValidator }
        ]
      },
      remitDiamondFormLoading: false
    }
  },
  methods: {
    remitDiamond() {
      this.$refs['remitDiamondForm'].validate(valid => {
        if (valid) {
          this.remitDiamondFormLoading = true
          this.$store.dispatch('RemitDiamond', this.remitDiamondForm).then(resp => {
            this.$message({
              message: resp.msg,
              type: 'success'
            })
            this.resetForm()
            this.remitDiamondFormLoading = false
          }).catch(() => {
            this.remitDiamondFormLoading = false
          })
        }
      })
    },
    resetForm() {
      this.remitDiamondForm = {
        playerId: null,
        remitDiamond: null
      }
      this.$refs['remitDiamondForm'].resetFields()
    }
  }
}
</script>

<style scoped>

</style>
