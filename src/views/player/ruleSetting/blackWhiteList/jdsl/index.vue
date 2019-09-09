<template>
  <div class="app-container">
    <h2>黑名单规则设置</h2>
    <hr>
    <el-form v-loading="blackFormLoading" ref="blackForm" :model="blackForm" :rules="blackFormRules" label-width="250px" size="mini">
      <el-form-item label="发红包时累计几个红包内不中雷" prop="fdshbbzl">
        <el-input v-model="blackForm.fdshbbzl"/>
      </el-form-item>
      <el-form-item label="抢红包时累计几个红包内一定中雷" prop="qdshbzl">
        <el-input v-model="blackForm.qdshbzl"/>
      </el-form-item>
      <el-form-item>
        <el-button :loading="blackBtnLoading" type="primary" @click="saveBlackList">保存配置</el-button>
      </el-form-item>
    </el-form>

    <h2>白名单规则设置</h2>
    <hr>
    <el-form v-loading="whiteFormLoading" ref="whiteForm" :model="whiteForm" :rules="whiteFormRules" label-width="250px" size="mini">
      <el-form-item label="发红包时累计几个红包内一定中雷" prop="fdshbzl">
        <el-input v-model="whiteForm.fdshbzl"/>
      </el-form-item>
      <el-form-item label="抢红包时累计几个红包内一定不中雷" prop="qdshbbzl">
        <el-input v-model="whiteForm.qdshbbzl"/>
      </el-form-item>
      <el-form-item>
        <el-button :loading="whiteBtnLoading" type="primary" @click="saveWhiteList">保存配置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const Base64 = require('js-base64').Base64

export default {
  name: 'Jdsl',
  data() {
    const validateRobot = (rule, value, callback) => {
      const re = /^\d{1,}$/
      if (value.length === 0) {
        callback(new Error('必填项'))
      } else if (!re.test(value)) {
        callback(new Error('必须为纯数字'))
      } else {
        callback()
      }
    }
    return {
      gameId: '',
      blackRuleId: '',
      blackRuleType: 1,
      whiteRuleId: '',
      whiteRuleType: 2,
      blackForm: {
        fdshbbzl: '',
        qdshbzl: ''
      },
      blackFormLoading: false,
      blackFormRules: {
        fdshbbzl: [{ required: true, trigger: 'blur', validator: validateRobot }],
        qdshbzl: [{ required: true, trigger: 'blur', validator: validateRobot }]
      },
      whiteForm: {
        fdshbzl: '',
        qdshbbzl: ''
      },
      whiteFormLoading: false,
      whiteFormRules: {
        fdshbzl: [{ required: true, trigger: 'blur', validator: validateRobot }],
        qdshbbzl: [{ required: true, trigger: 'blur', validator: validateRobot }]
      },
      blackBtnLoading: false,
      whiteBtnLoading: false
    }
  },
  created() {
    this.loadCurrentGameId()
  },
  methods: {
    loadCurrentGameId() {
      // 根据路径获取游戏code和房间code
      const currentPath = this.$route.path
      const gameCode = currentPath.slice(currentPath.lastIndexOf('/') + 1)

      // 根据游戏code和房间code获取
      this.$store.dispatch('GetRobotMenusByQry', {
        menuCode: gameCode
      }).then(response => {
        const robotMenus = response.data

        this.gameId = robotMenus[0].menuNum

        this.loadBlackGameRule()
        this.loadWhiteGameRule()
      })
    },
    loadBlackGameRule() {
      this.blackFormLoading = true
      this.$store.dispatch('GetGameRuleByQry', {
        partyId: this.gameId,
        ruleType: this.blackRuleType
      }).then(resp => {
        this.blackFormLoading = false
        const data = resp.data
        if (data != null) {
          this.blackRuleId = data.id

          const rule = Base64.decode(data.rule)
          if (rule != null) {
            const gameRule = JSON.parse(rule)
            this.blackForm.fdshbbzl = gameRule.fdshbbzl
            this.blackForm.qdshbzl = gameRule.qdshbzl
          }
        }
      }).catch(() => {
        this.blackFormLoading = false
      })
    },
    loadWhiteGameRule() {
      this.whiteFormLoading = true
      this.$store.dispatch('GetGameRuleByQry', {
        partyId: this.gameId,
        ruleType: this.whiteRuleType
      }).then(resp => {
        this.whiteFormLoading = false

        const data = resp.data
        if (data != null) {
          this.whiteRuleId = data.id

          const rule = Base64.decode(data.rule)
          if (rule != null) {
            const gameRule = JSON.parse(rule)
            this.whiteForm.fdshbzl = gameRule.fdshbzl
            this.whiteForm.qdshbbzl = gameRule.qdshbbzl
          }
        }
      }).catch(() => {
        this.whiteFormLoading = false
      })
    },
    saveBlackList() {
      this.$refs['blackForm'].validate(valid => {
        if (valid) {
          const gameRule = {
            fdshbbzl: this.blackForm.fdshbbzl,
            qdshbzl: this.blackForm.qdshbzl
          }
          const data = {
            id: this.blackRuleId,
            partyId: this.gameId,
            ruleType: this.blackRuleType,
            rule: Base64.encode(JSON.stringify(gameRule))
          }

          this.blackBtnLoading = true
          this.$store.dispatch('SaveGameRule', data).then(resp => {
            this.blackBtnLoading = false
            this.$message({
              message: resp.msg,
              type: 'success'
            })

            this.loadBlackGameRule()
          }).catch(() => {
            this.blackBtnLoading = false
          })
        }
      })
    },
    saveWhiteList() {
      this.$refs['whiteForm'].validate(valid => {
        if (valid) {
          const gameRule = {
            fdshbzl: this.whiteForm.fdshbzl,
            qdshbbzl: this.whiteForm.qdshbbzl
          }
          const data = {
            id: this.whiteRuleId,
            partyId: this.gameId,
            ruleType: this.whiteRuleType,
            rule: Base64.encode(JSON.stringify(gameRule))
          }

          this.whiteBtnLoading = true
          this.$store.dispatch('SaveGameRule', data).then(resp => {
            this.whiteBtnLoading = false
            this.$message({
              message: resp.msg,
              type: 'success'
            })

            this.loadWhiteGameRule()
          }).catch(() => {
            this.whiteBtnLoading = false
          })
        }
      })
    }

  }
}
</script>

<style scoped>
  .line{
    text-align: center;
  }

  .btn-clearStorage {
    text-align: right;
  }
</style>
