<template>
  <div class="app-container">
    <el-form v-loading="formLoading" ref="form" :model="form" label-width="140px" size="mini">
      <el-form-item label="更新文件路径">
          <el-select
            style="width: 300px"
            v-model="form.url"
            filterable
            remote
            reserve-keyword
            placeholder="更新文件路径(脚本前一级目录路径)"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in options"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="文件参数">
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">新增参数</el-button>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updatingprogram">更新</el-button>
        <el-button type="default" @click="resetForm">重置</el-button>
      </el-form-item>

      <el-form-item label="更新日志">
        <div class="log">
          {{logs}}
        </div>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  name: 'BatchFreezePlayerPage',
  data() {
    return {
      logs: '',
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      options: [],
      form: {
        catalog: '',
        url: '',
        params: []
      },
      formLoading: false
    }
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    remoteMethod(url) {
      this.form.catalog = url
      this.$store.dispatch('ListFileNames', { url: url }).then(resp => {
        this.options = resp.data
      }).catch(() => {
      })
    },
    updatingprogram() {
      this.form.params = this.dynamicTags
      this.$confirm('此操作将更新程序，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('Updatingprogram', this.form).then(resp => {
          this.$message({
            message: resp.msg,
            type: 'success'
          })
          setInterval(this.showLogs, 1500)
        }).catch(() => {
        })
      })
    },
    showLogs() {
      this.$store.dispatch('ShowLogs', this.form).then(resp => {
        this.logs = resp.data
      }).catch(() => {
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
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .log {
    width: 100%;
    background-color: #F5F5F5;
    white-space: pre-line;
  }
</style>
