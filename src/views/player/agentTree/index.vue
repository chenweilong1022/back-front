<template>
  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
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
