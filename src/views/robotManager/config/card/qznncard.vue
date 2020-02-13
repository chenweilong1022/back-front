<template>
  <div v-if="baseGameConfigVo" class="filter-container">
    <el-form ref="baseGameConfigVo" :model="baseGameConfigVo" label-position="right" style="width: 1000px;" >

      <el-form-item label="max_banker_win_gold(max_banker_win_gold)" label-width="210px">
        <el-col :span="24">
          <el-form-item>
            <el-input v-model="baseGameConfigVo.max_banker_win_gold" style="width: 100%;"/>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="off_banker_gold(off_banker_gold)" label-width="210px">
        <el-col :span="24">
          <el-form-item>
            <el-input v-model="baseGameConfigVo.off_banker_gold" style="width: 100%;"/>
          </el-form-item>
        </el-col>
      </el-form-item>


      <el-form-item label="act_human_cnt(act_human_cnt)" label-width="210px">
        <el-col :span="24">
          <el-form-item>
            <el-input v-model="baseGameConfigVo.act_human_cnt" style="width: 100%;"/>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="banker_req_delay(banker_req_delay)" label-width="210px">
        <el-col :span="12">
          <el-form-item label="最小值" label-width="80px">
            <el-input v-model="baseGameConfigVo.min_banker_req_delay" style="width: 100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最大值" label-width="80px">
            <el-input v-model="baseGameConfigVo.max_banker_req_delay" style="width: 100%;"/>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="on_banker_cnt(on_banker_cnt)" label-width="210px">
        <el-col :span="12">
          <el-form-item label="最小值" label-width="80px">
            <el-input v-model="baseGameConfigVo.min_on_banker_cnt" style="width: 100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最大值" label-width="80px">
            <el-input v-model="baseGameConfigVo.max_on_banker_cnt" style="width: 100%;"/>
          </el-form-item>
        </el-col>
      </el-form-item>


      <el-form-item label="ask_bets_delay(ask_bets_delay)" label-width="210px">
        <el-col :span="12">
          <el-form-item label="最小值" label-width="80px">
            <el-input v-model="baseGameConfigVo.min_ask_bets_delay" style="width: 100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最大值" label-width="80px">
            <el-input v-model="baseGameConfigVo.max_ask_bets_delay" style="width: 100%;"/>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="robot_give(robot_give)" label-width="210px">
        <el-col :span="12">
          <el-form-item label="最小值" label-width="80px">
            <el-input v-model="baseGameConfigVo.robot_give_lower" style="width: 100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最大值" label-width="80px">
            <el-input v-model="baseGameConfigVo.robot_give_upper" style="width: 100%;"/>
          </el-form-item>
        </el-col>
      </el-form-item>



      <el-form-item label="robot_min_max_gold(robot_min_max_gold)" label-width="210px">
        <el-col :span="12">
          <el-form-item label="最小值" label-width="80px">
            <el-input v-model="baseGameConfigVo.robot_max_gold" style="width: 100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最大值" label-width="80px">
            <el-input v-model="baseGameConfigVo.robot_min_gold" style="width: 100%;"/>
          </el-form-item>
        </el-col>
      </el-form-item>



      <el-form-item label="robot_take(robot_take)" label-width="210px">
        <el-col :span="12">
          <el-form-item label="最小值" label-width="80px">
            <el-input v-model="baseGameConfigVo.robot_take_lower" style="width: 100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最大值" label-width="80px">
            <el-input v-model="baseGameConfigVo.robot_take_upper" style="width: 100%;"/>
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
        <el-row :key="'other_'+index">
          <el-col :span="12">
            <el-form-item label="最小值" label-width="80px">
              <el-input v-model="baseGameConfigVo.gold.min" style="width: 100%;"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最大值" label-width="80px">
              <el-input v-model="baseGameConfigVo.gold.max" style="width: 100%;"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>

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
