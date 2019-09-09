import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import user from './modules/user'
import manager from './modules/manager'
import role from './modules/role'
import menu from './modules/menu'
import game from './modules/game'
import player from './modules/player'
import platform from './modules/platform'
import robotManager from './modules/robotManager'
import spread from './modules/spread'
import agent from './modules/agent'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    user,
    manager,
    role,
    menu,
    robotManager,
    game,
    player,
    platform,
    spread,
    agent
  },
  getters
})

export default store
