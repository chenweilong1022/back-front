<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" :model="filterForm" size="mini">
        <el-form-item label="状态">
          <el-select v-model="filterForm.state">
            <el-option v-for="item in states" :key="'state_'+item.state" :value="item.state" :label="item.title">{{ item.title }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" class="btn-form" @click="query">查询</el-button>
          <el-button type="primary" icon="el-icon-plus" class="btn-form" @click="addData">新增</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      size="mini"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="图片ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="缩略图">
        <template slot-scope="scope">
          <img :src="host + scope.row.thumbUrl" :large="host + scope.row.showUrl" :preview="scope.row.id" >
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布时间">
        <template slot-scope="scope">
          {{ scope.row.createdTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          {{ scope.row.note }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序">
        <template slot-scope="scope">
          {{ scope.row.sort }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="禁用|启用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enabled"
            :active-value="1"
            :inactive-value="0"
            @change="disabledAction(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" type="text" size="mini" @click="showEditPage(scope.row)">编辑</el-button>
          <el-button icon="el-icon-delete" type="text" style="color: red;" size="mini" @click="deleteData(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page.sync="filterForm.pageNo" :page-sizes="[10,20,30, 50]" :page-size="filterForm.pageSize" :total="listTotal" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :visible.sync="dialogNewOrEditVisible" :title="newFlag ? '新增图片':'修改图片'" width="450px">
      <el-form ref="dataForm" :model="data" :rules="dataRules" label-position="left" label-width="130px" style="margin-left:10px; margin-right: 10px;">
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="data.sort" size="small" />
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="data.note" type="textarea" />
        </el-form-item>
        <el-form-item label="启用">
          <el-switch
            v-model="data.enabled"
            :active-value="1"
            :inactive-value="0"/>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            :limit="1"
            :multiple="false"
            :file-list="fileList"
            :http-request="uploadImage"
            action=""
            class="avatar-uploader"
            name="image">
            <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button icon="el-icon-close" @click="dialogNewOrEditVisible = false">取消</el-button>
        <el-button :loading="saveBtnLoading" type="primary" @click="saveData"><svg-icon icon-class="save" style="margin-right: 5px;"/>保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ShareImages',
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
      filterForm: {
        state: '',
        pageNo: 1,
        pageSize: 10
      },
      states: [
        { state: '', title: '全部' },
        { state: 0, title: '未启用' },
        { state: 1, title: '已启用' }
      ],
      list: null,
      listLoading: false,
      listTotal: 10,
      data: {},
      dataRules: {},
      fileList: [],
      imageUrl: '',
      newFlag: true,
      dialogNewOrEditVisible: false,
      saveBtnLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'host'
    ])
  },
  created() {
    this.query()
  },
  methods: {
    query() {
      this.listLoading = true
      this.$store.dispatch('ListShareImageByQry', this.filterForm).then(resp => {
        this.list = resp.data
        this.listTotal = resp.totalCount
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    addData() {
      this.newFlag = true
      this.data = {
        transferLink: null,
        thumbUrl: null,
        downloadUrl: null,
        showUrl: null,
        note: null,
        sort: 1,
        enabled: 1
      }
      this.fileList = []
      this.dialogNewOrEditVisible = true
    },
    showEditPage(data) {
      this.newFlag = false
      this.data = Object.assign({}, data)
      const url = data.downloadUrl
      const img = {
        name: url.substr(url.lastIndexOf('/') + 1),
        url: url
      }
      this.fileList = [].concat(img)
      this.dialogNewOrEditVisible = true
    },
    saveData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          if (!this.data.downloadUrl || this.data.downloadUrl === '') {
            this.$message.warning('图片必传')
            return false
          }
          this.saveBtnLoading = true
          this.$store.dispatch(this.newFlag ? 'SaveShareImage' : 'UpdateShareImage', this.data).then(resp => {
            this.$message({
              type: 'success',
              message: resp.msg
            })
            this.saveBtnLoading = false
            this.dialogNewOrEditVisible = false
            this.query()
          })
        }
      })
    },
    deleteData(data) {
      this.$confirm('此操作将删除该图片，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.modifyAction({ ...data, isDel: 1 })
      })
    },
    disabledAction(data) {
      if (data.enabled === 0) {
        this.$confirm('此操作将禁用该图片，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.modifyAction(data)
        }).catch(() => {
          data.enabled = 1
        })
      } else {
        this.modifyAction(data)
      }
    },
    modifyAction(data) {
      this.$store.dispatch('UpdateShareImage', data).then(resp => {
        this.$message({
          type: 'success',
          message: resp.msg
        })
        this.query()
      })
    },
    uploadImage(data) {
      const param = new FormData()
      param.append(data.filename, data.file, data.file.name)
      this.$store.dispatch('UploadImage', param).then(resp => {
        data.onSuccess(resp)
      })
    },
    beforeUpload(file) {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isImage) {
        this.$message.error('只能上传图片!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isImage && isLt2M
    },
    handleUploadSuccess(res) {
      const data = res.data
      const url = data.downloadUrl
      this.data = Object.assign({}, this.data, {
        thumbUrl: data.thumbUrl,
        downloadUrl: data.downloadUrl,
        showUrl: data.showUrl
      })
      const img = {
        name: url.substr(url.lastIndexOf('/') + 1),
        url: url
      }
      this.fileList = this.fileList.concat(img)
    },
    handleRemove(file) {
      this.fileList = this.fileList.filter(value => value.name !== file.name)
      this.data = Object.assign({}, this.data, {
        thumbUrl: null,
        downloadUrl: null,
        showUrl: null
      })
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
    padding-bottom: 10px;
    .filter-item {
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 10px;
    }
  }
</style>
