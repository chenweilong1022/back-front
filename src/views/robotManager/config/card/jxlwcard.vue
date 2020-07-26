<template>
  <div v-if="show" class="filter-container">
    <el-form ref="baseGameConfigVo" :model="baseGameConfigVo" label-position="right" style="width: 1000px;" >

      <el-header><h3>胜率控制配置</h3></el-header>
      <el-form-item>
        <el-col :span="24">
          <el-form-item label="时间间隔" label-width="120px">
            <el-input v-model="winRateControl.timeInterval" style="width: 100%;"/>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="12">
          <el-form-item label="放分幸运值" label-width="120px">
            <el-input v-model="winRateControl.releaseLucky" style="width: 100%;"/>
          </el-form-item>
        </el-col>

      <el-col :span="12">
        <el-form-item label="吃分幸运值" label-width="120px">
          <el-input v-model="winRateControl.shareLucky" style="width: 100%;"/>
        </el-form-item>
      </el-col>
      </el-form-item>
      <el-form-item>
      <el-col :span="12">
        <el-form-item label="放分概率" label-width="120px">
          <el-input v-model="winRateControl.releaseProbability" style="width: 100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="吃分概率" label-width="120px">
          <el-input v-model="winRateControl.shareProbability" style="width: 100%;"/>
        </el-form-item>
      </el-col>
      </el-form-item>
      <el-row :span="24"><h3>房间配置暂无</h3></el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'bjlcard',
  data() {
    return {
      show: false,
      winRateControl: {},
      baseGameConfigVo: {},
      listLoading: false,
      dialogNewOrEditVisible: false,
      newFlag: true,
      saveBtnLoading: false
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.box-card-div {
  margin-bottom: 20px;
}

  .box-card span {
    color: #337ab7;
  }
</style>
