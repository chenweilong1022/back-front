<template>
  <div v-if="baseGameConfigVo" class="filter-container">
    <el-form ref="baseGameConfigVo" :model="baseGameConfigVo" label-position="right" style="width: 1000px;" >
      <el-form-item label="下注范围(bet)" label-width="210px">
        <el-col :span="12">
          <el-form-item label="最小值" label-width="80px">
            <el-input v-model="baseGameConfigVo.bet.min" style="width: 100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最大值" label-width="80px">
            <el-input v-model="baseGameConfigVo.bet.max" style="width: 100%;"/>
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
      <el-form-item label="下注权值(win)" label-width="210px">
        <el-col :span="8">
          <el-form-item label="押闲概率" label-width="80px">
            <el-input v-model="baseGameConfigVo.win.xianWin" style="width: 100%;">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="押庄概率" label-width="80px">
            <el-input v-model="baseGameConfigVo.win.zhuangWin" style="width: 100%;">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="押和概率" label-width="80px">
            <el-input v-model="baseGameConfigVo.win.equal" style="width: 100%;">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="押庄闲平后押对的概率(zone)" label-width="210px">
        <el-col :span="12">
          <el-form-item label="庄对概率" label-width="80px">
            <el-input v-model="baseGameConfigVo.zone.zhuangDui" style="width: 100%;">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="闲对概率" label-width="80px">
            <el-input v-model="baseGameConfigVo.zone.xianDui" style="width: 100%;">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="空闲座椅数量(minIdleSeat)" label-width="210px">
        <el-col :span="12">
          <el-form-item label="最小值" label-width="80px">
            <el-input v-model="baseGameConfigVo.minIdleSeat.min" style="width: 100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最大值" label-width="80px">
            <el-input v-model="baseGameConfigVo.minIdleSeat.max" style="width: 100%;"/>
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
