<template>
  <el-table
    :data="data"
    style="width: 100%;margin-bottom: 20px;"
    row-key="showId"
    border
    size="mini"
    fit
    highlight-current-row
    :tree-props="{children: 'childrens', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="showId"
      label="showId"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="用户名称"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="count"
      label="直属人数"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="teamCount"
      label="团队人数"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="rechargePrice"
      label="本人充值"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="underRechargePrice"
      label="直属充值"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="teamRechargePrice"
      label="团队充值"
      sortable
      >
    </el-table-column>

    <el-table-column
      prop="withdrawAmount"
      label="提现金额"
      sortable
      >
    </el-table-column>

    <el-table-column
      prop="underWithdrawAmount"
      label="直属提现"
      sortable
      >
    </el-table-column>

    <el-table-column
      prop="teamWithdrawAmount"
      label="团队提现"
      sortable
      >
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'index',
    props: {
      userid: {
        type: Number,
        default: null,
        required: true
      }
    },
    data() {
      return {
        data: [],
        defaultProps: {
          children: 'childrens',
          label: 'label'
        },
      }
    },
    created() {
      this.init(this.userid)
    },
    methods: {
      init() {
        this.$store.dispatch('AgentTree', { userid: this.userid }).then(resp => {
          this.data = resp.data
        }).catch(() => {
        })
      },
      handleNodeClick(data) {
        console.log(data);
      }
    }
  }
</script>

<style scoped>

</style>
