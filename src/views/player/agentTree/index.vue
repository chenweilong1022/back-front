<template>
  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
</template>

<script>
  export default {
    name: 'index',
    props: {
      saler: {
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
      this.init(this.saler)
    },
    methods: {
      init() {
        this.$store.dispatch('AgentTree', { saler: this.saler }).then(resp => {
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
