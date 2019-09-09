<template>
  <div class="app-container">
    <el-form v-loading="remitGoldFormLoading" ref="remitGoldForm" :model="remitGoldForm" :rules="remitGoldRules" label-width="140px" size="mini">
      <el-form-item label="玩家ID" prop="showId">
        <el-col :span="6">
          <el-input v-model="remitGoldForm.showId"/>
        </el-col>
        <el-col :span="6">
          <el-button @click="checkNickname">检测玩家昵称</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="玩家昵称" prop="nickname">
        <label>{{ nickname }}</label>
      </el-form-item>
      <el-form-item label="划账金额" prop="remitGold">
        <el-col :span="6">
          <el-input v-model="remitGoldForm.remitGold"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="remitGold">确定划账</el-button>
        <el-button type="default" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'RemitGoldPage',
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
      remitGoldForm: {
        showId: null,
        remitGold: null
      },
      playerId: null,
      nickname: null,
      remitGoldRules: {
        showId: [
          { required: true, trigger: 'blur', validator: customerValidator }
        ],
        remitGold: [
          { required: true, trigger: 'blur', validator: customerValidator }
        ]
      },
      remitGoldFormLoading: false
    }
  },
  methods: {
    checkNickname() {
      this.$store.dispatch('GetPlayerAccountByShowId', this.remitGoldForm.showId).then(resp => {
        this.nickname = resp.data.nickName
        this.playerId = resp.data.userid
      })
    },
    remitGold() {
      if (!this.playerId) {
        this.$message({
          message: '请检测玩家昵称',
          type: 'warning'
        })
        return false
      }
      this.$refs['remitGoldForm'].validate(valid => {
        if (valid) {
          this.remitGoldFormLoading = true
          this.$store.dispatch('RemitGold', {
            showId: this.remitGoldForm.showId,
            playerId: this.playerId,
            remitGold: this.remitGoldForm.remitGold
          }).then(resp => {
            this.$message({
              message: resp.msg,
              type: 'success'
            })
            this.resetForm()
            this.remitGoldFormLoading = false
          }).catch(() => {
            this.remitGoldFormLoading = false
          })
        }
      })
    },
    resetForm() {
      this.remitGoldForm = {
        showId: null,
        remitGold: null
      }
      this.playerId = null
      this.nickname = null
      this.$refs['remitGoldForm'] && this.$refs['remitGoldForm'].clearValidate()
    }
  }
}
</script>

<style scoped>

</style>
