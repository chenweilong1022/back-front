(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0596","chunk-7b5f","chunk-2095"],{"+pBx":function(e,t,a){"use strict";var l=a("dgm9");a.n(l).a},"/4Hc":function(e,t,a){},"4uQ1":function(e,t,a){},"8i6D":function(e,t,a){"use strict";a.r(t);var l={name:"index",props:{userid:{type:Number,default:null,required:!0}},data:function(){return{data:[],defaultProps:{children:"childrens",label:"label"}}},created:function(){this.init(this.userid)},methods:{init:function(){var e=this;this.$store.dispatch("AgentTree",{userid:this.userid}).then(function(t){e.data=t.data}).catch(function(){})},handleNodeClick:function(e){console.log(e)}}},i=(a("wNym"),a("ZrdR")),n=Object(i.a)(l,function(){var e=this.$createElement,t=this._self._c||e;return t("el-table",{staticStyle:{width:"100%","margin-bottom":"20px"},attrs:{data:this.data,"row-key":"showId",border:"","tree-props":{children:"childrens",hasChildren:"hasChildren"}}},[t("el-table-column",{attrs:{prop:"showId",label:"showId",sortable:"",width:"180"}}),this._v(" "),t("el-table-column",{attrs:{prop:"nickname",label:"用户名称",sortable:"",width:"180"}}),this._v(" "),t("el-table-column",{attrs:{prop:"count",label:"直属人数",sortable:"",width:"180"}}),this._v(" "),t("el-table-column",{attrs:{prop:"teamCount",label:"团队人数",sortable:"",width:"180"}})],1)},[],!1,null,"111ac196",null);n.options.__file="index.vue";t.default=n.exports},CCPM:function(e,t,a){},EEHj:function(e,t,a){"use strict";a.r(t);var l={name:"index",props:{userid:{type:Number,default:null,required:!0}},data:function(){return{data:[],defaultProps:{children:"childrens",label:"label"}}},created:function(){this.init(this.userid)},methods:{init:function(){var e=this;this.$store.dispatch("AgentTree",{userid:this.userid}).then(function(t){e.data=t.data}).catch(function(){})},handleNodeClick:function(e){console.log(e)}}},i=(a("PCXa"),a("ZrdR")),n=Object(i.a)(l,function(){var e=this.$createElement;return(this._self._c||e)("el-tree",{attrs:{data:this.data,props:this.defaultProps},on:{"node-click":this.handleNodeClick}})},[],!1,null,"57a3b8b4",null);n.options.__file="index.vue";t.default=n.exports},Hd0f:function(e,t,a){},PCXa:function(e,t,a){"use strict";var l=a("vS4D");a.n(l).a},"T/WX":function(e,t,a){"use strict";var l=a("kLpu");a.n(l).a},dgm9:function(e,t,a){},eEAb:function(e,t,a){"use strict";var l=a("4uQ1");a.n(l).a},gGie:function(e,t,a){"use strict";var l=a("CCPM");a.n(l).a},kLpu:function(e,t,a){},t5vm:function(e,t,a){"use strict";a.r(t);var l=a("6ZY3"),i=a.n(l),n={name:"GameLog",filters:{moneyFilter:function(e){return e?e/100:0}},props:{playerId:{type:Number,default:0,required:!0}},data:function(){return{filterForm:{startTime:null,endTime:null,pageNo:1,pageSize:10},list:null,listLoading:!1,listTotal:0}},created:function(){this.query()},methods:{query:function(){var e=this;this.listLoading=!0,this.filterForm.playerId=this.playerId,this.$store.dispatch("ListPlayerGameLogByQry",this.filterForm).then(function(t){e.list=t.data,e.listTotal=t.totalCount,e.listLoading=!1}).catch(function(){e.listLoading=!1})},handleSizeChange:function(e){this.filterForm.pageSize=e,this.query()},handleCurrentChange:function(e){this.filterForm.pageNo=e,this.query()}}},r=(a("vmQ5"),a("ZrdR")),s=Object(r.a)(n,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-form",{ref:"filterForm",attrs:{inline:!0,model:e.filterForm,size:"mini"}},[a("el-form-item",{attrs:{label:"起始时间"}},[a("el-date-picker",{attrs:{type:"datetime"},model:{value:e.filterForm.startTime,callback:function(t){e.$set(e.filterForm,"startTime",t)},expression:"filterForm.startTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"结束时间"}},[a("el-date-picker",{attrs:{type:"datetime"},model:{value:e.filterForm.endTime,callback:function(t){e.$set(e.filterForm,"endTime",t)},expression:"filterForm.endTime"}})],1),e._v(" "),a("el-form-item",[a("el-button",{staticClass:"btn-form",attrs:{type:"primary"},on:{click:e.query}},[e._v("查询")])],1)],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.list,size:"mini",border:"",fit:"","max-height":"450","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"记录时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.recordTime)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"玩家ID"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.userid)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"玩家昵称"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.nickName)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"游戏名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.gameName)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"房间号"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.roomid)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"变更前金币"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(e._f("moneyFilter")(t.row.beginGold))+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"金币变更"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(e._f("moneyFilter")(t.row.changeGold))+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"变更后金币"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(e._f("moneyFilter")(t.row.endGold))+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"税金"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(e._f("moneyFilter")(t.row.taxGold))+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"变更原因"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.reason)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"备注"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.note)+"\n      ")]}}])})],1),e._v(" "),a("div",{staticClass:"pagination-container"},[a("el-pagination",{attrs:{"current-page":e.filterForm.pageNo,"page-sizes":[10,20,30,50],"page-size":e.filterForm.pageSize,total:e.listTotal,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},[],!1,null,"252c6654",null);s.options.__file="GameLog.vue";var o=s.exports,d={name:"GameStatistics",filters:{moneyFilter:function(e){return e||0}},props:{playerId:{type:Number,default:0,required:!0}},data:function(){return{list:null,listLoading:!1}},mounted:function(){this.query()},methods:{query:function(){var e=this;this.listLoading=!0,this.$store.dispatch("ListPlayerGameRecordByQry",this.playerId).then(function(t){e.list=t.data,e.listLoading=!1}).catch(function(){e.listLoading=!1})}}},c=(a("eEAb"),Object(r.a)(d,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.list,size:"mini",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"玩家ID"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.userid)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"游戏名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.gameName)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"总输赢"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{type:t.row.totalGold>0?"danger":"success"}},[e._v(e._s(e._f("moneyFilter")(t.row.totalGold)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"游戏次数"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.playCnt)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"赢局次数"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.winCnt)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"输局次数"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.loseCnt)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"逃跑次数"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.fleeCnt)+"\n      ")]}}])})],1)],1)},[],!1,null,"2b2d5ee8",null));c.options.__file="GameStatistics.vue";var u=c.exports,f={name:"SameAddressPlayer",props:{playerId:{type:Number,default:0,required:!0}},data:function(){return{list:null,listLoading:!1}},mounted:function(){this.query()},methods:{query:function(){var e=this;this.listLoading=!0,this.$store.dispatch("ListSameAddressPlayerById",this.playerId).then(function(t){e.list=t.data,e.listLoading=!1}).catch(function(){e.listLoading=!1})},handleClick:function(e){this.$router.push({path:"/player/playerInfo",query:{playerId:e}})}}},m=(a("gGie"),Object(r.a)(f,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.list,size:"mini",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"玩家ID"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.userid)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"玩家昵称"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"link-type",on:{click:function(a){e.handleClick(t.row.userid)}}},[e._v(e._s(t.row.nickName))])]}}])})],1)],1)},[],!1,null,"bba711c4",null));m.options.__file="SameAddressPlayer.vue";var p=m.exports,g={name:"UnderSpreadUsers",filters:{moneyFilter:function(e){return e?(e/100).toFixed(2):(0).toFixed(2)}},props:{playerId:{type:Number,default:0,required:!0}},data:function(){return{filterForm:{pageNo:1,pageSize:10},list:null,listLoading:!1,listTotal:0}},created:function(){this.query()},methods:{query:function(){var e=this;this.listLoading=!0,this.filterForm.salerId=this.playerId,this.$store.dispatch("ListPlayerAccountByQry",this.filterForm).then(function(t){e.list=t.data,e.listTotal=t.totalCount,e.listLoading=!1}).catch(function(){e.listLoading=!1})},handleSizeChange:function(e){this.filterForm.pageSize=e,this.query()},handleCurrentChange:function(e){this.filterForm.pageNo=e,this.query()}}},_=(a("T/WX"),Object(r.a)(g,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.list,size:"mini",border:"",fit:"","max-height":"450","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"玩家ID"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.userid)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"玩家昵称"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.nickName)+"\n      ")]}}])})],1),e._v(" "),a("div",{staticClass:"pagination-container"},[a("el-pagination",{attrs:{"current-page":e.filterForm.pageNo,"page-sizes":[10,20,30,50],"page-size":e.filterForm.pageSize,total:e.listTotal,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},[],!1,null,"0820a5c6",null));_.options.__file="UnderSpreadUsers.vue";var h=_.exports,b=a("EEHj"),v=a("8i6D"),y={name:"PlayerInfoPage",components:{GameLog:o,GameStatistics:u,SameAddressPlayer:p,UnderSpreadUsers:h,AgentTree:b.default,AgentTable:v.default},filters:{statusFilter:function(e){return"1970-01-01 00:00:00"===e?"success":"danger"},userStateFilter:function(e){return"1970-01-01 00:00:00"===e?"正常":"冻结"},operateFilter:function(e){return"freeze"===e?"danger":"success"},operateTitleFilter:function(e){return"freeze"===e?"冻结帐号":"解冻帐号"},moneyFilter:function(e){return e?(e/100).toFixed(2):(0).toFixed(2)}},data:function(){return{playerInfo:{},lockState:!1,lockBtnLoading:!1,resetPwdBtn:!0,resetBankPwdBtn:!0,lockBtn:!0,isSpread:!0,setSpreadBtn:!1,gameDiamondLogBtn:!0,goldChangeBtn:!1,gameScoreBtn:!0,sameAddressPlayerBtn:!0,dialogLockPlayerVisible:!1,spreadInfo:{},dialogSpreadVisible:!1,saveBtnLoading:!1,list:null,listLoading:!1,dialogGameLogVisible:!1,dialogGameStatisticsVisible:!1,dialogAgentTreeVisible:!1,dialogAgentTableVisible:!1,dialogSameAddressVisible:!1,dialogUnderSpreadUsersVisible:!1}},created:function(){this.validateRole(),this.query()},methods:{query:function(){var e=this,t=this.$loading({target:"#panelGroup",lock:!0,text:"拼命加载中...",spinner:"el-icon-loading",background:"rgba(255, 255, 255, 0.5)"});this.$store.dispatch("GetPlayerAccountById",this.$route.query.playerId).then(function(a){e.playerInfo=a.data,e.playerInfo&&(e.lockState="1970-01-01 00:00:00"===e.playerInfo.lock,e.isSpread=e.playerInfo.spreadUserId>0),t.close()}).catch(function(){t.close(),setTimeout(function(){e.$router.go(-1)},3e3)})},resetPassword:function(){var e=this;this.$confirm("此操作将重置玩家密码，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){e.$store.dispatch("ResetPlayerPassword",e.playerInfo.userid).then(function(t){e.$message({message:t.msg,type:"success"})})})},resetBankPassword:function(){var e=this;this.$confirm("此操作将重置玩家银行密码，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){e.$store.dispatch("ResetPlayerBankPassword",e.playerInfo.userid).then(function(t){e.$message({message:t.msg,type:"success"})})})},showLockPage:function(){var e=this;this.dialogLockPlayerVisible=!0,this.listLoading=!0,this.$store.dispatch("ListFreezeUserRecordById",this.playerInfo.userid).then(function(t){e.list=t.data,e.listLoading=!1}).catch(function(){e.listLoading=!1})},lockPlayer:function(){var e=this;if(!this.playerInfo.reason)return this.$message({message:"操作原因不能为空",type:"error"}),!1;this.lockBtnLoading=!0,this.$store.dispatch(this.lockState?"FreezePlayer":"UnfreezePlayer",this.playerInfo).then(function(t){e.dialogLockPlayerVisible=!1,e.$message({message:t.msg,type:"success"}),e.lockBtnLoading=!1}).catch(function(){e.lockBtnLoading=!1})},transferToSpread:function(){var e=this;this.$confirm("此操作将为玩家开通代理，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){var t=e.$loading({target:"#panelGroup",lock:!0,text:"拼命加载中...",spinner:"el-icon-loading",background:"rgba(255, 255, 255, 0.5)"});e.$store.dispatch("TransferToSpread",{playerId:e.playerInfo.userid}).then(function(a){e.$message({message:a.msg,type:"success"}),t.close(),e.query()}).catch(function(){t.close()})})},showSpreadPage:function(){this.dialogSpreadVisible=!0,this.saveBtnLoading=!1,this.spreadInfo=i()({},this.playerInfo)},saveSpread:function(){var e=this;this.saveBtnLoading=!0,this.$store.dispatch("UpdateSpreadUser",{id:this.spreadInfo.spreadUserId,ratio:this.spreadInfo.spreadRatio}).then(function(t){e.$message({message:t.msg,type:"success"}),e.saveBtnLoading=!1,e.dialogSpreadVisible=!1,e.query()})},queryGameLog:function(){this.dialogGameLogVisible=!0,this.$refs.gameLog&&this.$refs.gameLog.query()},queryGameStatistics:function(){this.dialogGameStatisticsVisible=!0,this.$refs.gameStatistics&&this.$refs.gameStatistics.query()},querySameAddressPlayers:function(){this.dialogSameAddressVisible=!0,this.$refs.sameAddress&&this.$refs.sameAddress.query()},queryAgentTree:function(){this.dialogAgentTreeVisible=!0,this.$refs.agentTree&&this.$refs.agentTree.init()},queryAgentTable:function(){this.dialogAgentTableVisible=!0,this.$refs.agentTable&&this.$refs.agentTable.init()},validateRole:function(){var e=this.$store.state.user.roleId,t=this.$store.state.user.menus;1!==e&&(this.hasPermission(t,20102)||(this.resetPwdBtn=!1),this.hasPermission(t,20103)||(this.resetBankPwdBtn=!1),this.hasPermission(t,20104)||(this.setSpreadBtn=!1),this.hasPermission(t,20105)||(this.lockBtn=!1),this.hasPermission(t,20107)||(this.gameDiamondLogBtn=!1),this.hasPermission(t,20108)||(this.goldChangeBtn=!1),this.hasPermission(t,20109)||(this.gameScoreBtn=!1),this.hasPermission(t,20110)||(this.sameAddressPlayerBtn=!1))},hasPermission:function(e,t){return!!e&&e.some(function(e){return e.menuId===t})}}},k=(a("+pBx"),Object(r.a)(y,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container",staticStyle:{"background-color":"#f0f2f5",padding:"20px"}},[a("el-card",{staticClass:"box-card-component",staticStyle:{"margin-left":"8px"},attrs:{id:"panelGroup"}},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e._v("\n      玩家基本信息\n    ")]),e._v(" "),a("div",{staticClass:"filter-container"},[a("el-form",{ref:"filterForm",attrs:{model:e.playerInfo,"label-width":"200px",size:"mini"}},[a("el-form-item",{attrs:{label:"玩家ID"}},[a("label",[e._v(e._s(e.playerInfo.userid))])]),e._v(" "),a("el-form-item",{attrs:{label:"玩家帐号"}},[a("label",[e._v(e._s(e.playerInfo.account))])]),e._v(" "),a("el-form-item",{attrs:{label:"玩家昵称"}},[a("label",[e._v(e._s(e.playerInfo.nickName))])]),e._v(" "),a("el-form-item",{attrs:{label:"上级代理"}},[a("label",[e._v(e._s(e.playerInfo.saler))])]),e._v(" "),a("el-form-item",{attrs:{label:"手机号"}},[a("label",[e._v(e._s(e.playerInfo.phoneNum))])]),e._v(" "),a("el-form-item",{attrs:{label:"真实姓名"}},[a("label",[e._v(e._s(e.playerInfo.realName))])]),e._v(" "),a("el-form-item",{attrs:{label:"身份证号"}},[a("label",[e._v(e._s(e.playerInfo.idCode))])]),e._v(" "),a("el-form-item",{attrs:{label:"帐号状态"}},[a("el-tag",{attrs:{type:e._f("statusFilter")(e.playerInfo.lock)}},[e._v(e._s(e._f("userStateFilter")(e.playerInfo.lock)))])],1),e._v(" "),a("el-form-item",{attrs:{label:"是否开通代理"}},[a("label",[e._v(e._s(e.playerInfo.spreadUserId>0?"已开通":"未开通"))])]),e._v(" "),e.playerInfo.spreadUserId>0?[a("el-form-item",{attrs:{label:"代理提成比率"}},[a("label",[e._v(e._s(e.playerInfo.spreadRatio)+" %")])]),e._v(" "),a("el-form-item",{attrs:{label:"今日返佣"}},[a("label",[e._v(e._s(e._f("moneyFilter")(e.playerInfo.todayRebate)))])]),e._v(" "),a("el-form-item",{attrs:{label:"本周返佣"}},[a("label",[e._v(e._s(e._f("moneyFilter")(e.playerInfo.thisWeekRebate)))])]),e._v(" "),a("el-form-item",{attrs:{label:"本月返佣"}},[a("label",[e._v(e._s(e._f("moneyFilter")(e.playerInfo.thisMonthRebate)))])])]:e._e(),e._v(" "),a("el-form-item",{attrs:{label:"注册时间"}},[a("label",[e._v(e._s(e.playerInfo.createTime))])]),e._v(" "),a("el-form-item",{attrs:{label:"注册终端"}},[a("label",[e._v(e._s(e.playerInfo.platform))])]),e._v(" "),a("el-form-item",{attrs:{label:"最近登录时间"}},[a("label",[e._v(e._s(e.playerInfo.loginTime))])]),e._v(" "),a("el-form-item",{attrs:{label:"最近登录时间"}},[a("label",[e._v(e._s(e.playerInfo.loginTime))])]),e._v(" "),a("el-form-item",{attrs:{label:"最近登录IP"}},[a("label",[e._v(e._s(e.playerInfo.ip))])]),e._v(" "),a("el-form-item",{attrs:{label:"最近登录IP归属地"}},[a("label",[e._v(e._s(e.playerInfo.ipAttr))])]),e._v(" "),a("el-form-item",{attrs:{label:"携带金币"}},[a("label",[e._v(e._s(e._f("moneyFilter")(e.playerInfo.gold)))])]),e._v(" "),a("el-form-item",{attrs:{label:"银行金币"}},[a("label",[e._v(e._s(e._f("moneyFilter")(e.playerInfo.bankGold)))])]),e._v(" "),a("el-form-item",{attrs:{label:"总金币"}},[a("label",[e._v(e._s(e._f("moneyFilter")(e.playerInfo.totalGold)))])]),e._v(" "),a("el-form-item",{attrs:{label:"历史充值"}},[a("label",[e._v(e._s(e._f("moneyFilter")(e.playerInfo.totalPay)))])]),e._v(" "),a("el-form-item",{attrs:{label:"历史提现"}},[a("label",[e._v(e._s(e._f("moneyFilter")(e.playerInfo.totalWithdraw)))])]),e._v(" "),e.resetPwdBtn||e.resetBankPwdBtn||e.lockBtn?a("el-form-item",{attrs:{label:"管理操作"}},[e.resetPwdBtn?a("el-button",{attrs:{type:"default"},on:{click:e.resetPassword}},[e._v("重置登录密码")]):e._e(),e._v(" "),e.resetBankPwdBtn?a("el-button",{attrs:{type:"default"},on:{click:e.resetBankPassword}},[e._v("重置银行密码")]):e._e(),e._v(" "),e.lockBtn?a("el-button",{attrs:{type:"danger"},on:{click:e.showLockPage}},[e._v(e._s(e.lockState?"冻结玩家":"解冻玩家"))]):e._e(),e._v(" "),!e.isSpread&&e.setSpreadBtn?a("el-button",{attrs:{type:"default"},on:{click:e.transferToSpread}},[e._v("开通代理")]):e._e(),e._v(" "),e.isSpread&&e.setSpreadBtn?a("el-button",{attrs:{type:"default"},on:{click:e.showSpreadPage}},[e._v("设置代理参数")]):e._e()],1):e._e(),e._v(" "),e.gameDiamondLogBtn||e.goldChangeBtn||e.gameScoreBtn||e.sameAddressPlayerBtn||e.isSpread?a("el-form-item",{attrs:{label:"玩家日志查看"}},[e.gameDiamondLogBtn?a("el-button",{attrs:{type:"text"},on:{click:e.queryGameLog}},[e._v("游戏记录查询")]):e._e(),e._v(" "),e.goldChangeBtn?a("el-button",{attrs:{type:"text"}},[e._v("金币变更日志")]):e._e(),e._v(" "),e.gameScoreBtn?a("el-button",{attrs:{type:"text"},on:{click:e.queryGameStatistics}},[e._v("游戏输赢查询")]):e._e(),e._v(" "),e.sameAddressPlayerBtn?a("el-button",{attrs:{type:"text"},on:{click:e.querySameAddressPlayers}},[e._v("相同地址登录帐号")]):e._e(),e._v(" "),a("el-button",{attrs:{type:"text"},on:{click:e.queryAgentTree}},[e._v("查看下级代理")]),e._v(" "),a("el-button",{attrs:{type:"text"},on:{click:e.queryAgentTable}},[e._v("查看下级团队表")])],1):e._e()],2),e._v(" "),a("el-dialog",{attrs:{visible:e.dialogLockPlayerVisible,title:e.lockState?"冻结玩家":"解冻玩家",width:"40%"},on:{"update:visible":function(t){e.dialogLockPlayerVisible=t}}},[a("el-form",{ref:"playerForm",staticStyle:{"margin-left":"30px"},attrs:{model:e.playerInfo,"label-position":"left"}},[a("el-form-item",{attrs:{label:"玩家ID"}},[a("label",[e._v(e._s(e.playerInfo.userid))])]),e._v(" "),a("el-form-item",{attrs:{label:"玩家昵称"}},[a("label",[e._v(e._s(e.playerInfo.nickName))])]),e._v(" "),a("el-form-item",{attrs:{label:"帐号状态"}},[a("el-tag",{attrs:{type:e._f("statusFilter")(e.playerInfo.lock)}},[e._v(e._s(e._f("userStateFilter")(e.playerInfo.lock)))])],1),e._v(" "),a("el-form-item",{attrs:{label:"操作原因"}},[a("el-input",{attrs:{rows:2,type:"textarea",placeholder:"请输入操作原因"},model:{value:e.playerInfo.reason,callback:function(t){e.$set(e.playerInfo,"reason",t)},expression:"playerInfo.reason"}})],1)],1),e._v(" "),a("label",[e._v("该帐号冻结/解冻历史记录")]),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.list,size:"mini",border:"",fit:"","max-height":"200","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"操作时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n              "+e._s(t.row.recordTime)+"\n            ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作管理员"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n              "+e._s(t.row.managerId)+"\n            ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作类别"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{type:e._f("operateFilter")(t.row.operate)}},[e._v(e._s(e._f("operateTitleFilter")(t.row.operate)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作原因"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n              "+e._s(t.row.reason)+"\n            ")]}}])})],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogLockPlayerVisible=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{loading:e.lockBtnLoading,type:"primary"},on:{click:e.lockPlayer}},[e._v(e._s(e.lockState?"冻结玩家":"解冻玩家"))])],1)],1),e._v(" "),a("el-dialog",{attrs:{visible:e.dialogSpreadVisible,title:"设置推广参数",width:"30%"},on:{"update:visible":function(t){e.dialogSpreadVisible=t}}},[a("el-form",{ref:"spreadForm",staticStyle:{"margin-left":"30px"},attrs:{model:e.spreadInfo,"label-position":"left","label-width":"80px"}},[a("el-form-item",{attrs:{label:"玩家ID"}},[a("label",[e._v(e._s(e.spreadInfo.userid))])]),e._v(" "),a("el-form-item",{attrs:{label:"提成比率"}},[a("el-input",{model:{value:e.spreadInfo.spreadRatio,callback:function(t){e.$set(e.spreadInfo,"spreadRatio",t)},expression:"spreadInfo.spreadRatio"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogSpreadVisible=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{loading:e.saveBtnLoading,type:"primary"},on:{click:e.saveSpread}},[e._v("保存")])],1)],1),e._v(" "),a("el-dialog",{attrs:{visible:e.dialogGameLogVisible,title:"玩家游戏记录",width:"80%"},on:{"update:visible":function(t){e.dialogGameLogVisible=t}}},[a("GameLog",{ref:"gameLog",attrs:{"player-id":e.playerInfo.userid}})],1),e._v(" "),a("el-dialog",{attrs:{visible:e.dialogAgentTreeVisible,title:"代理树状图",width:"40%"},on:{"update:visible":function(t){e.dialogAgentTreeVisible=t}}},[a("agent-tree",{ref:"agentTree",attrs:{userid:e.playerInfo.userid}})],1),e._v(" "),a("el-dialog",{attrs:{visible:e.dialogAgentTableVisible,title:"代理团队表",width:"60%"},on:{"update:visible":function(t){e.dialogAgentTableVisible=t}}},[a("agent-table",{ref:"agentTable",attrs:{userid:e.playerInfo.userid}})],1),e._v(" "),a("el-dialog",{attrs:{visible:e.dialogGameStatisticsVisible,title:"玩家游戏输赢统计",width:"40%"},on:{"update:visible":function(t){e.dialogGameStatisticsVisible=t}}},[a("GameStatistics",{ref:"gameStatistics",attrs:{"player-id":e.playerInfo.userid}})],1),e._v(" "),a("el-dialog",{attrs:{visible:e.dialogSameAddressVisible,title:"相同IP地址玩家列表",width:"40%"},on:{"update:visible":function(t){e.dialogSameAddressVisible=t}}},[a("SameAddressPlayer",{ref:"sameAddress",attrs:{"player-id":e.playerInfo.userid}})],1),e._v(" "),a("el-dialog",{attrs:{visible:e.dialogUnderSpreadUsersVisible,title:"下线玩家列表",width:"40%"},on:{"update:visible":function(t){e.dialogUnderSpreadUsersVisible=t}}},[a("UnderSpreadUsers",{ref:"underSpreadUsers",attrs:{"player-id":e.playerInfo.userid}})],1)],1)])],1)},[],!1,null,"8119120e",null));k.options.__file="index.vue";t.default=k.exports},vS4D:function(e,t,a){},vmQ5:function(e,t,a){"use strict";var l=a("/4Hc");a.n(l).a},wNym:function(e,t,a){"use strict";var l=a("Hd0f");a.n(l).a}}]);