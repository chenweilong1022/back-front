<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :inline="true" :model="filterForm" size="mini">
        <el-form-item label="选择公告渠道">
          <el-select v-model="filterForm.channel" class="filter-item" placeholder="请选择" value="">
            <el-option v-for="item in channels" :key="item.channelId" :label="item.channelName" :value="item.channelId"/>
          </el-select>
        </el-form-item>
        <el-form-item label="公告状态">
          <el-select v-model="filterForm.noticeState" class="filter-item" placeholder="请选择" value="">
            <el-option v-for="item in noticeStates" :key="item.key" :label="item.title" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item label="公告类别">
          <el-select v-model="filterForm.noticeType" class="filter-item" placeholder="请选择" value="">
            <el-option v-for="item in noticeTypes" :key="item.key" :label="item.title" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-form" @click="query">查询</el-button>
          <el-button v-if="managerPermission" type="primary" class="btn-form" @click="showCreateNoticePage">创建公告</el-button>
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
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="公告渠道">
        <template slot-scope="scope">
          {{ scope.row.channelName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="公告类型">
        <template slot-scope="scope">
          {{ scope.row.noteType | noteTypeFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="公告状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | noticeState">{{ scope.row.state | noticeStateTitle }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="公告内容">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state === 0 && managerPermission" type="text" size="mini" @click="publishNotice(scope.row.id)">发布</el-button>
          <el-button v-if="scope.row.state === 1 && managerPermission" type="text" size="mini" @click="obtainedNotice(scope.row.id)">下架</el-button>
          <el-button v-if="managerPermission" type="text" size="mini" @click="deleteNotice(scope.row.id)">物理删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="filterForm.pageNo" :page-sizes="[10,20,30, 50]" :page-size="filterForm.pageSize" :total="listTotal" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :visible.sync="dialogNewNoticeVisible" title="创建公告" width="600px">
      <el-form ref="noticeForm" :model="notice" :rules="noticeRules" label-position="left" style="margin-left:30px;">
        <el-form-item label="公告渠道" prop="channel">
          <el-select v-model="notice.channel" class="filter-item" placeholder="请选择" value="">
            <el-option v-for="item in channels" :key="item.channelId" :label="item.channelName" :value="item.channelId"/>
          </el-select>
        </el-form-item>
        <el-form-item label="公告类型" prop="noticeType">
          <el-select v-model="notice.noticeType" class="filter-item" placeholder="请选择" value="">
            <el-option v-for="item in noticeTypes" :key="item.key" :label="item.title" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input v-model="notice.content" :rows="5" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogNewNoticeVisible = false">取消</el-button>
        <el-button :loading="createBtnLoading" type="primary" @click="createNotice">创建</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'NoticeListPage',
  filters: {
    noteTypeFilter(type) {
      if (type === 0) {
        return '全部公告'
      } else if (type === 1) {
        return '滚屏公告'
      } else if (type === 2) {
        return '固定公告'
      }
    },
    noticeState(state) {
      if (state === 0) {
        return 'info'
      } else if (state === 1) {
        return 'success'
      } else if (state === 2) {
        return 'danger'
      }
    },
    noticeStateTitle(state) {
      if (state === 0) {
        return '新创建'
      } else if (state === 1) {
        return '已发布'
      } else if (state === 2) {
        return '已下架'
      }
    }
  },
  data() {
    return {
      filterForm: {
        channel: null,
        noticeState: null,
        noticeType: null,
        pageNo: 1,
        pageSize: 10
      },
      channels: [
        { channelId: '0', channelName: '全平台', isdel: false }
      ],
      noticeStates: [
        { key: -1, title: '全部' },
        { key: 0, title: '新创建' },
        { key: 1, title: '已发布' },
        { key: 2, title: '已下架' }
      ],
      noticeTypes: [
        { key: 0, title: '全部公告' },
        { key: 1, title: '滚屏公告' },
        { key: 2, title: '固定公告' }
      ],
      list: null,
      listLoading: false,
      listTotal: 0,
      notice: {
        channel: null,
        noticeType: null,
        content: null
      },
      noticeRules: {
        channel: [{ required: true, trigger: 'blur', message: '必填项' }],
        noticeType: [{ required: true, trigger: 'blur', message: '必填项' }],
        content: [{ required: true, trigger: 'blur', message: '必填项' }]
      },
      dialogNewNoticeVisible: false,
      createBtnLoading: false,
      managerPermission: true
    }
  },
  created() {
    this.query()
  },
  mounted() {
    this.queryChannelType()
    this.validateRole()
  },
  methods: {
    queryChannelType() {
      this.$store.dispatch('ListAppChannelType').then(resp => {
        this.channels = this.channels.concat(resp.data)
      })
    },
    query() {
      this.listLoading = true
      this.$store.dispatch('ListNoticeByQry', this.filterForm).then(resp => {
        this.list = resp.data
        this.listTotal = resp.totalCount
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    showCreateNoticePage() {
      this.dialogNewNoticeVisible = true
    },
    createNotice() {
      this.$refs['noticeForm'].validate(valid => {
        if (valid) {
          this.$confirm('是否确定创建公告?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.createBtnLoading = true
            this.$store.dispatch('CreateNotice', this.notice).then(resp => {
              this.createBtnLoading = false
              this.dialogNewNoticeVisible = false
              this.$message({
                message: resp.msg,
                type: 'success'
              })
              this.query()
            }).catch(() => {
              this.createBtnLoading = false
            })
          })
        }
      })
    },
    publishNotice(id) {
      this.$confirm('是否确定发布公告?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('PublishNotice', id).then(resp => {
          this.$message({
            message: resp.msg,
            type: 'success'
          })
          this.query()
        })
      })
    },
    obtainedNotice(id) {
      this.$confirm('是否确定下架公告?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('UnpublishNotice', id).then(resp => {
          this.$message({
            message: resp.msg,
            type: 'success'
          })
          this.query()
        })
      })
    },
    deleteNotice(id) {
      this.$confirm('是否确定删除公告?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('DeleteNotice', id).then(resp => {
          this.$message({
            message: resp.msg,
            type: 'success'
          })
          this.query()
        })
      })
    },
    handleSizeChange(val) {
      this.filterForm.pageSize = val
      this.query()
    },
    handleCurrentChange(val) {
      this.filterForm.pageNo = val
      this.query()
    },
    validateRole() {
      const roleId = this.$store.state.user.roleId
      const menus = this.$store.state.user.menus
      if (roleId !== 1) {
        if (!this.hasPermission(menus, 30201)) {
          this.managerPermission = false
        }
      }
    },
    hasPermission(menus, menuId) {
      if (menus) {
        return menus.some(menu => menu.menuId === menuId)
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>

</style>
