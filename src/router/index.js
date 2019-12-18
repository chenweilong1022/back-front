import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/changePassword',
    component: Layout,
    name: 'ChangePassword',
    hidden: true,
    children: [{
      path: '/',
      name: 'ChangePassword',
      component: () => import('@/views/user/changePassword'),
      meta: { title: '修改密码', icon: 'edit', noCache: true }
    }]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]
  },

  // {
  //   path: '/robotManager',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'RobotManager',
  //   meta: {
  //     title: '机器人管理系统',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'setting',
  //       component: () => import('@/views/robotManager/setting'),
  //       name: 'Setting',
  //       meta: {
  //         title: '菜单值设置'
  //       }
  //     },
  //     {
  //       path: 'games',
  //       component: () => import('@/views/robotManager/index'),
  //       redirect: 'noredirect',
  //       name: 'Games',
  //       meta: {
  //         title: '游戏列表'
  //       },
  //       children: [
  //         {
  //           path: 'jdjl',
  //           component: () => import('@/views/robotManager/jdjl'),
  //           redirect: 'noredirect',
  //           name: 'Jdjl',
  //           meta: {
  //             title: '经典接龙'
  //           },
  //           children: [
  //             {
  //               path: 'experience',
  //               component: () => import('@/views/robotManager/components/jdjl'),
  //               name: 'Experience',
  //               meta: {
  //                 title: '体验房'
  //               }
  //             },
  //             {
  //               path: 'low',
  //               component: () => import('@/views/robotManager/components/jdjl'),
  //               name: 'Low',
  //               meta: {
  //                 title: '初级房'
  //               }
  //             },
  //             {
  //               path: 'mid',
  //               component: () => import('@/views/robotManager/components/jdjl'),
  //               name: 'Mid',
  //               meta: {
  //                 title: '中级房'
  //               }
  //             },
  //             {
  //               path: 'high',
  //               component: () => import('@/views/robotManager/components/jdjl'),
  //               name: 'High',
  //               meta: {
  //                 title: '高级房'
  //               }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'jdsl',
  //           component: () => import('@/views/robotManager/jdsl'),
  //           redirect: 'noredirect',
  //           name: 'Jdsl',
  //           meta: {
  //             title: '经典扫雷'
  //           },
  //           children: [
  //             {
  //               path: 'experience',
  //               component: () => import('@/views/robotManager/components/jdsl'),
  //               name: 'Experience',
  //               meta: {
  //                 title: '体验房'
  //               }
  //             },
  //             {
  //               path: 'low',
  //               component: () => import('@/views/robotManager/components/jdsl'),
  //               name: 'Low',
  //               meta: {
  //                 title: '初级房'
  //               }
  //             },
  //             {
  //               path: 'mid',
  //               component: () => import('@/views/robotManager/components/jdsl'),
  //               name: 'Mid',
  //               meta: {
  //                 title: '中级房'
  //               }
  //             },
  //             {
  //               path: 'high',
  //               component: () => import('@/views/robotManager/components/jdsl'),
  //               name: 'High',
  //               meta: {
  //                 title: '高级房'
  //               }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'jdnn',
  //           component: () => import('@/views/robotManager/jdnn'),
  //           redirect: 'noredirect',
  //           name: 'Jdnn',
  //           meta: {
  //             title: '经典牛牛'
  //           },
  //           children: [
  //             {
  //               path: 'low',
  //               component: () => import('@/views/robotManager/components/jdnn'),
  //               name: 'Low',
  //               meta: {
  //                 title: '初级房'
  //               }
  //             },
  //             {
  //               path: 'mid',
  //               component: () => import('@/views/robotManager/components/jdnn'),
  //               name: 'Mid',
  //               meta: {
  //                 title: '中级房'
  //               }
  //             },
  //             {
  //               path: 'high',
  //               component: () => import('@/views/robotManager/components/jdnn'),
  //               name: 'High',
  //               meta: {
  //                 title: '高级房'
  //               }
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       path: 'ruleSetting',
  //       component: () => import('@/views/robotManager/ruleSetting'),
  //       redirect: 'noredirect',
  //       name: 'RuleSetting',
  //       meta: {
  //         title: '游戏规则设置'
  //       },
  //       children: [
  //         {
  //           path: 'blackWhiteList',
  //           component: () => import('@/views/robotManager/ruleSetting/blackWhiteList'),
  //           redirect: 'noredirect',
  //           alwaysShow: true,
  //           name: 'BlackWhiteList',
  //           meta: {
  //             title: '黑白名单规则'
  //           },
  //           children: [
  //             {
  //               path: 'jdsl',
  //               component: () => import('@/views/robotManager/ruleSetting/blackWhiteList/jdsl'),
  //               name: 'Jdsl',
  //               meta: {
  //                 title: '经典扫雷'
  //               }
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // }

]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

/**
 * 动态路由数组，根据用户权限展示路由
 * 路由鉴权根据meta中的path和auth两个字段进行校验
 * 当auth为true时，代表需要校验用户是否有该菜单的权限
 */
export const asyncRouterMap = [
  {
    path: '/manage',
    redirect: 'noredirect',
    component: Layout,
    name: 'Manage',
    alwaysShow: true,
    meta: {
      title: '后台系统管理',
      path: '/manage',
      auth: true,
      icon: 'nested'
    },
    children: [
      {
        path: 'managerList',
        name: 'ManagerList',
        component: () => import('@/views/manage/managerList'),
        meta: {
          title: '管理帐号列表',
          path: '/manage/managerList',
          auth: true
        }
      },
      {
        path: 'roleList',
        name: 'RoleList',
        component: () => import('@/views/manage/roleList'),
        meta: {
          title: '管理角色列表',
          path: '/manage/roleList',
          auth: true
        }
      },
      {
        path: 'menuList',
        name: 'MenuList',
        component: () => import('@/views/manage/menuList'),
        meta: {
          title: '角色菜单管理',
          path: '/manage/menuList',
          auth: true
        }
      },
      {
        path: 'manageLog',
        name: 'ManageLog',
        component: () => import('@/views/manage/manageLog'),
        meta: {
          title: '管理日志列表',
          path: '/manage/manageLog',
          auth: true
        }
      }
    ]
  },
  {
    path: '/player',
    redirect: 'noredirect',
    component: Layout,
    name: 'Player',
    alwaysShow: true,
    meta: {
      title: '游戏玩家管理',
      path: '/player',
      auth: true,
      icon: 'nested'
    },
    children: [
      {
        path: 'playerList',
        name: 'PlayerList',
        component: () => import('@/views/player/playerList'),
        meta: {
          title: '玩家帐号列表',
          path: '/player/playerList',
          auth: true
        }
      },
      {
        path: 'playerInfo',
        name: 'PlayerInfo',
        hidden: true,
        component: () => import('@/views/player/playerInfo'),
        meta: {
          title: '玩家基本信息'
        }
      },
      {
        path: 'winningDetail',
        name: 'WinningDetail',
        hidden: true,
        component: () => import('@/views/player/winningDetail'),
        meta: {
          title: '玩家输赢明细',
          path: '/player/winningDetail'
        }
      },
      {
        path: 'onlinePlayerList',
        name: 'OnlinePlayerList',
        component: () => import('@/views/player/onlinePlayerList'),
        meta: {
          title: '在线玩家列表',
          path: '/player/onlinePlayerList',
          auth: true
        }
      },
      {
        path: 'playerGameLogList',
        name: 'PlayerGameLogList',
        component: () => import('@/views/player/playerGameLogList'),
        meta: {
          title: '玩家游戏日志',
          path: '/player/playerGameLogList',
          auth: true
        }
      },
      {
        path: 'playerOrderList',
        name: 'PlayerOrderList',
        component: () => import('@/views/player/playerOrderList'),
        meta: {
          title: '玩家充值列表',
          path: '/player/playerOrderList',
          auth: true
        }
      },
      {
        path: 'withdrawOrderList',
        name: 'WithdrawOrderList',
        component: () => import('@/views/player/withdrawOrderList'),
        meta: {
          title: '玩家提现列表',
          path: '/player/withdrawOrderList',
          auth: true
        }
      },
      {
        path: 'wealthRank',
        name: 'WealthRank',
        component: () => import('@/views/player/wealthRank'),
        meta: {
          title: '玩家财富排行',
          path: '/player/wealthRank',
          auth: true
        }
      },
      {
        path: 'remitGold',
        name: 'RemitGold',
        component: () => import('@/views/player/remitGold'),
        meta: {
          title: '人工充值操作',
          path: '/player/remitGold',
          auth: true
        }
      },
      {
        path: 'remitGoldRecord',
        name: 'RemitGoldRecord',
        component: () => import('@/views/player/remitGoldRecord'),
        meta: {
          title: '人工充值日志',
          path: '/player/remitGoldRecord',
          auth: true
        }
      },
      {
        path: 'batchFreeze',
        name: 'BatchFreeze',
        component: () => import('@/views/player/batchFreeze'),
        meta: {
          title: '批量封号',
          path: '/player/batchFreeze',
          auth: true
        }
      },
      {
        path: 'sendEmail',
        name: 'SendEmail',
        component: () => import('@/views/platform/sendEmail'),
        meta: {
          title: '发送邮件',
          path: '/player/sendEmail',
          auth: true
        }
      },
      // {
      //   path: 'vipChannels',
      //   name: 'vipChannels',
      //   component: () => import('@/views/configs/vipChannels'),
      //   meta: {
      //     title: 'VIP充值渠道',
      //     path: '/player/vipChannels',
      //     auth: true
      //   }
      // },
      {
        path: 'robotManage',
        name: 'RobotManage',
        component: () => import('@/views/platform/robotManage'),
        meta: {
          title: '机器人管理',
          path: '/player/robotManage',
          auth: true
        }
      },
      {
        path: 'robotcontrol',
        name: 'robotcontrol',
        component: () => import('@/views/robotManager/robotcontrol'),
        meta: {
          title: '机器人控制端',
          path: '/player/robotcontrol',
          auth: true
        }
      },
      {
        path: 'sysDomain',
        name: 'SysDomain',
        component: () => import('@/views/configs/sysDomain'),
        meta: {
          title: '域名管理',
          path: '/player/sysDomain',
          auth: true
        }
      },
      {
        path: 'shareImages',
        name: 'ShareImages',
        component: () => import('@/views/configs/shareImages'),
        meta: {
          title: '分享图设置',
          path: '/player/shareImages',
          auth: true
        }
      },
      {
        path: 'sysConfigs',
        name: 'sysConfigs',
        component: () => import('@/views/configs/sysConfigs'),
        meta: {
          title: '系统配置项配置',
          path: '/player/sysConfigs',
          auth: true
        }
      }
    ]
  },
  {
    path: '/platform',
    redirect: '/platform/overview',
    component: Layout,
    name: 'Platform',
    alwaysShow: true,
    meta: {
      title: '平台数据管理',
      path: '/platform',
      auth: true,
      icon: 'nested'
    },
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: () => import('@/views/platform/overview'),
        meta: {
          title: '平台系统概况',
          path: '/platform/overview',
          auth: true
        }
      },
      {
        path: 'noticeList',
        name: 'noticeList',
        component: () => import('@/views/platform/noticeList'),
        meta: {
          title: '平台游戏公告',
          path: '/platform/noticeList',
          auth: true
        }
      },
      {
        path: 'recentRechargeCount',
        name: 'RecentRechargeCount',
        component: () => import('@/views/platform/recentRechargeCount'),
        meta: {
          title: '日金币变化统计',
          path: '/platform/recentRechargeCount',
          auth: true
        }
      },
      {
        path: 'statement',
        name: 'Statement',
        component: () => import('@/views/platform/statement'),
        meta: {
          title: '支付通道对账单',
          path: '/platform/statement',
          auth: true
        }
      },
      {
        path: 'gameWinningDetail',
        name: 'GameWinningDetail',
        component: () => import('@/views/platform/gameWinningDetail'),
        meta: {
          title: '游戏输赢统计',
          path: '/platform/gameWinningDetail',
          auth: true
        }
      },
      {
        path: 'taxGoldCount',
        name: 'TaxGoldCount',
        component: () => import('@/views/platform/taxGoldCount'),
        meta: {
          title: '游戏税收统计',
          path: '/platform/taxGoldCount',
          auth: true
        }
      },
      {
        path: 'playersCount',
        name: 'PlayersCount',
        component: () => import('@/views/platform/playersCount'),
        meta: {
          title: '平台人数统计',
          path: '/platform/playersCount',
          auth: true
        }
      },
      {
        path: 'regAliveCount',
        name: 'RegAliveCount',
        component: () => import('@/views/platform/regAliveCount'),
        meta: {
          title: '注册留存率',
          path: '/platform/regAliveCount',
          auth: true
        }
      },
      {
        path: 'recordAccountOnlinePlaying',
        name: 'recordAccountOnlinePlaying',
        component: () => import('@/views/platform/recordAccountOnlinePlaying'),
        meta: {
          title: '在线在玩统计',
          path: '/platform/recordAccountOnlinePlaying',
          auth: true
        }
      },
      {
        path: 'playerOnlineStatistics',
        name: 'playerOnlineStatistics',
        component: () => import('@/views/index/playerOnlineStatistics'),
        meta: {
          title: '玩家在线走势',
          path: '/platform/recordAccountOnlinePlaying',
          auth: true
        }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
