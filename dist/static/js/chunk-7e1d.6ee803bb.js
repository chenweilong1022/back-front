(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-7e1d"],{FFns:function(t,n,o){"use strict";var e=o("P8+u");o.n(e).a},"P8+u":function(t,n,o){},aFNf:function(t,n,o){var e=o("c01Q"),r=e.JSON||(e.JSON={stringify:JSON.stringify});t.exports=function(t){return r.stringify.apply(r,arguments)}},ohTC:function(t,n,o){"use strict";o.r(n);var e=o("omC7"),r=o.n(e),i={name:"RobotManage",filters:{moneyFilter:function(t){return t?(t/100).toFixed(2):(0).toFixed(2)}},data:function(){return{rooms:[],bys:[145,148],others:[127],filterForm:{roomId:null},byForm:{gold:{min:null,max:null},time:{min:null,max:null},logic:"dtdw_dntg",num:{min:null,max:null},baseScore:null,cannonLevel:null},otherForm:{bet:{min:null,max:null},num:{min:null,max:null},win:{xianWin:null,zhuangWin:null,equal:null},zone:{zhuangDui:null,xianDui:null},minIdleSeat:{min:null,max:null},time:{min:null,max:null},gold:[{min:null,max:null},{min:null,max:null},{min:null,max:null}],logic:"bjl",debug:!0},robots:[]}},watch:{$route:"watchUrl"},mounted:function(){},methods:{watchUrl:function(){var t=this.$loading({target:"#content",lock:!0,text:"拼命加载中...",spinner:"el-icon-loading",background:"rgba(255, 255, 255, 0.5)"});this.filterForm.roomId=this.$route.name,this.queryRobots(t)},queryRoomIds:function(){var t=this;this.$store.dispatch("ListGameRoomByQry",{}).then(function(n){t.rooms=n.data,t.filterForm.roomId=t.rooms[0].roomid,t.queryConfig()})},queryConfig:function(){var t=this,n=this.$loading({target:"#content",lock:!0,text:"拼命加载中...",spinner:"el-icon-loading",background:"rgba(255, 255, 255, 0.5)"});this.$store.dispatch("GetRobotConfigByQry",this.filterForm.roomId).then(function(o){var e=o.data;e&&(t.bys.some(function(t){return t===Math.floor(e.roomId/100)})?t.byForm=JSON.parse(e.config):t.others.some(function(t){return t===Math.floor(e.roomId/100)})&&(t.otherForm=JSON.parse(e.config))),t.queryRobots(n)}).catch(function(){return n.close()})},queryRobots:function(t){var n=this;this.$store.dispatch("GetRobotsByQry",this.filterForm.roomId).then(function(o){var e=o.data,r=[];e&&e.forEach(function(t){Array.isArray(t)&&t.forEach(function(t){r=r.concat(t)})}),n.robots=r,t.close()}).catch(function(){return t.close()})},saveData:function(t){var n=this;this.$confirm("此操作将更新机器人配置，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){switch(t){case"other":n.saveAction(n.otherForm);break;case"by":n.saveAction(n.byForm)}})},addRobot:function(){var t=this;this.$prompt("此操作将添加机器人，请输入桌号","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(n){var o=n.value;if(!o||isNaN(Number(o))||Number(o)<0)return t.$message({message:"请输入合法的桌号",type:"error"}),!1;t.$store.dispatch("AddRobot",{roomId:t.filterForm.roomId,tableId:o}).then(function(n){t.$message({message:n.msg,type:"success"}),t.queryConfig()})})},resetRobot:function(t){var n=this;this.$confirm("此操作将重置机器人，是否继续？","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){n.$store.dispatch("ResetRobot",{roomId:n.filterForm.roomId,uid:t}).then(function(t){n.$message({message:t.msg,type:"success"}),n.queryConfig()})})},delRobot:function(t){var n=this;this.$confirm("此操作将删除机器人，是否继续？","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){n.$store.dispatch("DeleteRobot",{roomId:n.filterForm.roomId,tableId:t.tableid,uid:t.uid}).then(function(t){n.$message({message:t.msg,type:"success"}),n.queryConfig()})})},saveAction:function(t){var n=this;this.$store.dispatch("UpdateRobotConfig",{roomId:this.filterForm.roomId,config:r()(t)}).then(function(t){n.$message({message:t.msg,type:"success"}),n.queryConfig()})}}},a=(o("FFns"),o("ZrdR")),s=Object(a.a)(i,function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("div",{staticClass:"app-container"},[o("el-row",{staticStyle:{"margin-top":"20px"},attrs:{id:"content"}},[o("el-card",{staticClass:"box-card-component"},[o("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[o("h2",[t._v("机器人列表"),o("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary"},on:{click:t.addRobot}},[t._v("添加机器人")])],1)]),t._v(" "),o("div",{staticClass:"filter-container"},[o("el-table",{attrs:{data:t.robots,size:"mini",border:"",fit:""}},[o("el-table-column",{attrs:{align:"center",label:"桌号/座位号"},scopedSlots:t._u([{key:"default",fn:function(n){return[t._v("\n              "+t._s(n.row.tableid)+" / "+t._s(n.row.seat)+"\n            ")]}}])}),t._v(" "),o("el-table-column",{attrs:{align:"center",label:"机器人ID"},scopedSlots:t._u([{key:"default",fn:function(n){return[t._v("\n              "+t._s(n.row.uid)+"\n            ")]}}])}),t._v(" "),o("el-table-column",{attrs:{align:"center",label:"机器人名称"},scopedSlots:t._u([{key:"default",fn:function(n){return[t._v("\n              "+t._s(n.row.name)+"\n            ")]}}])}),t._v(" "),o("el-table-column",{attrs:{align:"center",label:"身上金币"},scopedSlots:t._u([{key:"default",fn:function(n){return[t._v("\n              "+t._s(t._f("moneyFilter")(n.row.gold))+"\n            ")]}}])}),t._v(" "),o("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(n){return[o("el-button",{attrs:{type:"text"},on:{click:function(o){t.resetRobot(n.row.uid)}}},[t._v("重置机器人")]),t._v(" "),o("el-button",{attrs:{type:"text"},on:{click:function(o){t.delRobot(n.row)}}},[t._v("删除机器人")])]}}])})],1)],1)])],1)],1)},[],!1,null,"46ff8687",null);s.options.__file="index.vue";n.default=s.exports},omC7:function(t,n,o){t.exports={default:o("aFNf"),__esModule:!0}}}]);