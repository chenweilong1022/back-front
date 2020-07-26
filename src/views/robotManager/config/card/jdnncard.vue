<template>
  <div v-if="baseGameConfigVo" class="filter-container">
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

      <el-row :span="24"><h3>房间配置</h3></el-row>



      <el-form-item label="固定投注(fixBet)" label-width="210px">
        <el-col :span="24">
          <el-form-item>
            <el-input v-model="baseGameConfigVo.fixBet" style="width: 100%;"/>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="每张桌子机器人数(num)" label-width="210px">
        <el-col :span="12">
          <el-form-item label="最小值" label-width="80px">
            <el-input v-model="baseGameConfigVo.num.min" style="width: 100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最大值" label-width="80px">
            <el-input v-model="baseGameConfigVo.num.max" style="width: 100%;"/>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="房间内的时间(time)" label-width="210px">
        <el-col :span="12">
          <el-form-item label="最小值" label-width="80px">
            <el-input v-model="baseGameConfigVo.time.min" style="width: 100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最大值" label-width="80px">
            <el-input v-model="baseGameConfigVo.time.max" style="width: 100%;"/>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="加入延迟(join_delay)" label-width="210px">
        <el-col :span="12">
          <el-form-item label="最小值" label-width="80px">
            <el-input v-model="baseGameConfigVo.join_delay.min" style="width: 100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最大值" label-width="80px">
            <el-input v-model="baseGameConfigVo.join_delay.max" style="width: 100%;"/>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="最大金币(max_gold)" label-width="210px">
        <el-col :span="12">
          <el-form-item label="最小值" label-width="80px">
            <el-input v-model="baseGameConfigVo.max_gold.min" style="width: 100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最大值" label-width="80px">
            <el-input v-model="baseGameConfigVo.max_gold.max" style="width: 100%;"/>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="机器人携带金钱范围(gold)" label-width="210px">
        <el-row v-for="(item, index) in baseGameConfigVo.gold" :key="'other_'+index">
          <el-col :span="12">
            <el-form-item :label="(index + 1) + '-' + (index + 4) + ':最小值'" label-width="80px">
              <el-input v-model="item.min" style="width: 100%;"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="(index + 1) + '-' + (index + 4) + ':最大值'" label-width="80px">
              <el-input v-model="item.max" style="width: 100%;"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
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
