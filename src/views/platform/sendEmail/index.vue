<template>
  <el-container>
    <el-aside width="60%">
      <div class="filter-container">
        <el-form ref="emailForm" :model="emailForm" :rules="emailRules" label-width="120px">
          <el-form-item label="收件人" prop="receivers">
            <el-input v-model="emailForm.receivers" placeholder="发送所有玩家填1，否则填玩家ID（注意：原始ID）" />
          </el-form-item>
          <el-form-item label="邮件标题" prop="title">
            <el-input v-model="emailForm.title" />
          </el-form-item>
          <el-form-item label="邮件内容" prop="content">
            <el-input v-model="emailForm.content" :rows="10" type="textarea"/>
          </el-form-item>
          <el-form-item label="发件人" prop="sender">
            <el-input v-model="emailForm.sender"/>
          </el-form-item>
          <el-form-item>
            <el-col :span="12"><el-button icon="el-icon-refresh" style="width: 120px;" class="btn-form" @click="clearData">清除</el-button></el-col>
            <el-col :span="12" style="text-align: right"><el-button :loading="sendBtnLoading" icon="el-icon-check" type="primary" style="width: 120px;" class="btn-form" @click="publishData">发送</el-button></el-col>
          </el-form-item>
        </el-form>
      </div>
    </el-aside>
  </el-container>
</template>

<script>
export default {
  name: 'SendEmail',
  filters: {
    stateTitle(state) {
      if (state === 0) {
        return '未处理'
      } else if (state === 1) {
        return '已处理'
      }
    }
  },
  data() {
    return {
      emailForm: {
        receivers: null,
        title: null,
        content: null,
        sender: '系统'
      },
      emailRules: {
        receivers: [{ required: true, trigger: 'blur', message: '必填项' }],
        title: [{ required: true, trigger: 'blur', message: '必填项' }],
        content: [{ required: true, trigger: 'blur', message: '必填项' }],
        sender: [{ required: true, trigger: 'blur', message: '必填项' }]
      },
      sendBtnLoading: false,
      filterForm: {
        vipLevel: null,
        pageNo: 1,
        pageSize: 10
      },
      vipLevels: [],
      list: null,
      listLoading: false,
      listTotal: 10
    }
  },
  methods: {
    publishData() {
      this.sendBtnLoading = true
      this.$refs['emailForm'].validate(valid => {
        if (valid) {
          this.$store.dispatch('SendEmail', this.emailForm).then(resp => {
            this.$message({
              type: 'success',
              message: resp.msg
            })

            this.sendBtnLoading = false

            this.clearData()
          }).catch(() => {
            this.sendBtnLoading = false
          })
        }
      })
    },
    clearData() {
      this.emailForm = {
        receivers: null,
        title: null,
        content: null,
        sender: '系统'
      }
      this.$refs['emailForm'] && this.$refs['emailForm'].resetFields()
    },
    handleSizeChange(val) {
      this.filterForm.pageSize = val
      this.query()
    },
    handleCurrentChange(val) {
      this.filterForm.pageNo = val
      this.query()
    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
  .filter-container {
    margin-top: 20px;
    padding-bottom: 10px;
    .filter-item {
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 10px;
    }
  }
</style>
