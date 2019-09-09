<template >
  <div class="app-container">
    <h2>黑白名单管理</h2>
    <hr>

    <div class="filter-container">
      <el-form ref="filterForm" :model="filterForm" :rules="filterRules" label-width="140px" size="mini">
        <el-form-item label="名单类别">
          <el-col :xs="24" :lg="6">
            <el-select v-model="filterForm.listType" class="filter-item" placeholder="请选择" value="">
              <el-option v-for="item in listTypes" :key="item.key" :label="item.title" :value="item.key"/>
            </el-select>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :xs="24" :lg="16">
            <el-button class="btn-form" type="primary" @click="queryList">查询名单列表</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="输入玩家ID" prop="playerId">
          <el-col :xs="24" :lg="6">
            <el-input v-model="filterForm.playerId"/>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :xs="24" :lg="16">
            <el-button :loading="whiteBtnLoading" class="btn-form" @click="addWhiteList">加入白名单</el-button>
            <el-button :loading="blackBtnLoading" class="btn-form" @click="addBlackList">加入黑名单</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      size="mini"
      highlight-current-row>
      <el-table-column align="center" label="玩家ID">
        <template slot-scope="scope">
          {{ scope.row.playerId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="昵称">
        <template slot-scope="scope">
          {{ scope.row.playerNickname }}
        </template>
      </el-table-column>
      <el-table-column label="加入时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.addTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名单类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.listType === 1 ? '黑名单' : '白名单' }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="从名单删除" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="removeFromList(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="其他操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.listType === 1" type="primary" size="mini" @click="transform(scope.row)">加入白名单</el-button>
          <el-button v-else type="primary" size="mini" @click="transform(scope.row)">加入黑名单</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="filterForm.pageNo" :page-sizes="[10,20,30, 50]" :page-size="filterForm.pageSize" :total="listTotal" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlackWhiteList',
  data() {
    const validatePlayerId = (rule, value, callback) => {
      const re = /^\d{1,}$/
      if ((value != null && value.length > 0) && !re.test(value)) {
        callback(new Error('必须为纯数字'))
      } else {
        callback()
      }
    }
    return {
      gameId: 1,
      filterForm: {
        listType: 0,
        playerId: null,
        pageNo: 1,
        pageSize: 10
      },
      filterRules: {
        playerId: [{ required: false, trigger: 'blur', validator: validatePlayerId }]
      },
      blackBtnLoading: false,
      whiteBtnLoading: false,
      list: null,
      listTotal: null,
      listTypes: [
        {
          key: 0,
          title: '全部'
        },
        {
          key: 1,
          title: '黑名单'
        },
        {
          key: 2,
          title: '白名单'
        }
      ]
    }
  },
  created() {
    this.loadBlackWhiteList()
  },
  methods: {
    loadBlackWhiteList() {
      const query = {}
      Object.assign(query, this.filterForm)
      query.partyId = this.gameId
      this.listLoading = true
      this.$store.dispatch('ListBlackWhiteList', query).then(resp => {
        this.list = resp.data
        this.listTotal = resp.totalCount
        this.filterForm.pageNo = resp.pageNo
        this.filterForm.pageSize = resp.pageSize

        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    queryList() {
      this.$refs['filterForm'].validate((valid) => {
        if (valid) {
          this.loadBlackWhiteList()
        }
      })
    },
    addWhiteList() {
      this.$refs['filterForm'].validate((valid) => {
        if (valid) {
          const playerId = this.filterForm.playerId
          if (playerId == null || playerId === undefined || playerId.length === 0) {
            this.$message({
              message: '玩家id必填',
              type: 'error'
            })

            return false
          }

          this.whiteBtnLoading = true
          this.$store.dispatch('AddBlackWhiteList', {
            listType: 2,
            playerId: playerId,
            partyId: this.gameId
          }).then(resp => {
            this.$message({
              message: resp.msg,
              type: 'success'
            })

            this.filterForm.playerId = null
            this.whiteBtnLoading = false

            // 重新加载列表
            this.loadBlackWhiteList()
          }).catch(() => {
            this.whiteBtnLoading = false
          })
        }
      })
    },
    addBlackList() {
      this.$refs['filterForm'].validate((valid) => {
        if (valid) {
          const playerId = this.filterForm.playerId
          if (playerId == null || playerId === undefined || playerId.length === 0) {
            this.$message({
              message: '玩家id必填',
              type: 'error'
            })

            return false
          }

          this.blackBtnLoading = true
          this.$store.dispatch('AddBlackWhiteList', {
            listType: 1,
            playerId: playerId,
            partyId: this.gameId
          }).then(resp => {
            this.$message({
              message: resp.msg,
              type: 'success'
            })

            this.filterForm.playerId = null
            this.blackBtnLoading = false

            // 重新加载列表
            this.loadBlackWhiteList()
          }).catch(() => {
            this.blackBtnLoading = false
          })
        }
      })
    },
    removeFromList(id) {
      this.$store.dispatch('DeleteBlackWhiteList', id).then(resp => {
        this.$message({
          message: resp.msg,
          type: 'success'
        })

        // 重新加载列表
        this.loadBlackWhiteList()
      })
    },
    transform(data) {
      this.$store.dispatch('TransformBlackWhiteList', {
        listType: data.listType === 1 ? 2 : 1,
        id: data.id,
        addTime: new Date()
      }).then(resp => {
        this.$message({
          message: resp.msg,
          type: 'success'
        })

        // 重新加载列表
        this.loadBlackWhiteList()
      })
    },
    handleSizeChange(val) {
      this.filterForm.pageSize = val
      this.loadBlackWhiteList()
    },
    handleCurrentChange(val) {
      this.filterForm.pageNo = val
      this.loadBlackWhiteList()
    }
  }
}
</script>

<style scoped>

</style>
