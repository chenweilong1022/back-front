<template>
  <el-table
    :data="data"
    style="width: 100%;margin-bottom: 20px;"
    row-key="showId"
    border
    :tree-props="{children: 'childrens', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="showId"
      label="showId"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="用户名称"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="count"
      label="直属人数"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="teamCount"
      label="团队人数"
      sortable
      width="180">
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
