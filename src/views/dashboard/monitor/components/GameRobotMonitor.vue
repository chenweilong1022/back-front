<template>
  <el-card class="box-card-component" style="margin-left:8px;">
    <div slot="header" class="clearfix">
      {{ gameName }}
    </div>
    <div class="component-item">
      <el-table :data="rooms" style="width: 100%;padding-top: 0px;">
        <el-table-column label="房间名" align="center">
          <template slot-scope="scope">
            <span class="link-type" @click="handleClick(scope.row)">{{ scope.row.menuName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="运行状态" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter"> {{ scope.row.status === 'true' ? '正常运行':'停止运行' }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'GameRobotMonitor',
  filters: {
    statusFilter(status) {
      if (status == null || status === undefined || status === '') {
        return 'danger'
      }
      const statusMap = {
        true: 'success',
        false: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    gameName: {
      type: String,
      default: '游戏名称',
      required: true
    },
    gameCode: {
      type: String,
      default: 'jdjl',
      required: true
    },
    rooms: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleClick(data) {
      this.$router.push({ path: '/robotManager/games/' + this.gameCode + '/' + data.menuCode })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .component-item{
    min-height: 100px;
  }

  .box-card-component {
    .mallki-text {
      position: absolute;
      top: 0px;
      right: 0px;
      font-size: 20px;
      font-weight: bold;
    }
    .panThumb {
      z-index: 100;
      height: 70px!important;
      width: 70px!important;
      position: absolute!important;
      top: -45px;
      left: 0px;
      border: 5px solid #ffffff;
      background-color: #fff;
      margin: auto;
      box-shadow: none!important;
      /deep/ .pan-info {
        box-shadow: none!important;
      }
    }
    .progress-item {
      margin-bottom: 10px;
      font-size: 14px;
    }
    @media only screen and (max-width: 1510px){
      .mallki-text{
        display: none;
      }
    }
  }
</style>
