(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-48c5"],{"7lzW":function(t,e,o){"use strict";o.r(e);var l=o("omC7"),n=o.n(l),a={name:"RobotManage",filters:{moneyFilter:function(t){return t?(t/100).toFixed(2):(0).toFixed(2)}},data:function(){return{rooms:[],bys:[145,148],others:[127],filterForm:{roomId:null},byForm:{gold:{min:null,max:null},time:{min:null,max:null},logic:"dtdw_dntg",num:{min:null,max:null},baseScore:null,cannonLevel:null},otherForm:{bet:{min:null,max:null},num:{min:null,max:null},win:{xianWin:null,zhuangWin:null,equal:null},zone:{zhuangDui:null,xianDui:null},minIdleSeat:{min:null,max:null},time:{min:null,max:null},gold:[{min:null,max:null},{min:null,max:null},{min:null,max:null}],logic:"bjl",debug:!0},robots:[]}},mounted:function(){this.queryRoomIds()},methods:{queryRoomIds:function(){var t=this;this.$store.dispatch("ListGameRoomByQry",{}).then(function(e){t.rooms=e.data,t.filterForm.roomId=t.rooms[0].roomid,t.queryConfig()})},queryConfig:function(){var t=this,e=this.$loading({target:"#content",lock:!0,text:"拼命加载中...",spinner:"el-icon-loading",background:"rgba(255, 255, 255, 0.5)"});this.$store.dispatch("GetRobotConfigByQry",this.filterForm.roomId).then(function(o){var l=o.data;l&&(t.bys.some(function(t){return t===Math.floor(l.roomId/100)})?t.byForm=JSON.parse(l.config):t.others.some(function(t){return t===Math.floor(l.roomId/100)})&&(t.otherForm=JSON.parse(l.config))),t.queryRobots(e)}).catch(function(){return e.close()})},queryRobots:function(t){var e=this;this.$store.dispatch("GetRobotsByQry",this.filterForm.roomId).then(function(o){var l=o.data,n=[];l&&l.forEach(function(t){Array.isArray(t)&&t.forEach(function(t){n=n.concat(t)})}),e.robots=n,t.close()}).catch(function(){return t.close()})},saveData:function(t){var e=this;this.$confirm("此操作将更新机器人配置，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){switch(t){case"other":e.saveAction(e.otherForm);break;case"by":e.saveAction(e.byForm)}})},addRobot:function(){var t=this;this.$prompt("此操作将添加机器人，请输入桌号","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(e){var o=e.value;if(!o||isNaN(Number(o))||Number(o)<0)return t.$message({message:"请输入合法的桌号",type:"error"}),!1;t.$store.dispatch("AddRobot",{roomId:t.filterForm.roomId,tableId:o}).then(function(e){t.$message({message:e.msg,type:"success"}),t.queryConfig()})})},resetRobot:function(t){var e=this;this.$confirm("此操作将重置机器人，是否继续？","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){e.$store.dispatch("ResetRobot",{roomId:e.filterForm.roomId,uid:t}).then(function(t){e.$message({message:t.msg,type:"success"}),e.queryConfig()})})},delRobot:function(t){var e=this;this.$confirm("此操作将删除机器人，是否继续？","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){e.$store.dispatch("DeleteRobot",{roomId:e.filterForm.roomId,tableId:t.tableid,uid:t.uid}).then(function(t){e.$message({message:t.msg,type:"success"}),e.queryConfig()})})},saveAction:function(t){var e=this;this.$store.dispatch("UpdateRobotConfig",{roomId:this.filterForm.roomId,config:n()(t)}).then(function(t){e.$message({message:t.msg,type:"success"}),e.queryConfig()})}}},r=(o("Fp0o"),o("ZrdR")),i=Object(r.a)(a,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"app-container"},[o("el-row",[o("el-card",{staticClass:"box-card-component"},[o("el-form",{ref:"filterForm",attrs:{model:t.filterForm,inline:!0}},[o("el-form-item",{attrs:{label:"选择房间"}},[o("el-select",{on:{change:function(e){t.queryConfig()}},model:{value:t.filterForm.roomId,callback:function(e){t.$set(t.filterForm,"roomId",e)},expression:"filterForm.roomId"}},t._l(t.rooms,function(t){return o("el-option",{key:t.roomid,attrs:{label:t.roomName,value:t.roomid}})}))],1),t._v(" "),o("el-form-item",[o("el-button",{staticClass:"btn-form",attrs:{type:"primary",icon:"el-icon-refresh"},on:{click:t.queryConfig}},[t._v("刷新")])],1)],1)],1)],1),t._v(" "),o("el-row",{staticStyle:{"margin-top":"20px"},attrs:{id:"content"}},[t.others.some(function(e){return e===Math.floor(t.filterForm.roomId/100)})?o("el-card",{staticClass:"box-card-component"},[o("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[o("h2",[t._v("\n          "+t._s(t.rooms&&t.rooms.length>0&&t.rooms.find(function(e){return e.roomid===t.filterForm.roomId}).roomName)+"机器人配置\n          "),o("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary"},on:{click:function(e){t.saveData("other")}}},[t._v("保 存")])],1)]),t._v(" "),o("div",{staticClass:"filter-container"},[o("el-form",{ref:"otherForm",staticStyle:{width:"1000px"},attrs:{model:t.otherForm,"label-position":"right"}},[o("el-form-item",{attrs:{label:"下注范围","label-width":"210px"}},[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"最小值","label-width":"80px"}},[o("el-input",{staticStyle:{width:"100%"},model:{value:t.otherForm.bet.min,callback:function(e){t.$set(t.otherForm.bet,"min",e)},expression:"otherForm.bet.min"}})],1)],1),t._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"最大值","label-width":"80px"}},[o("el-input",{staticStyle:{width:"100%"},model:{value:t.otherForm.bet.max,callback:function(e){t.$set(t.otherForm.bet,"max",e)},expression:"otherForm.bet.max"}})],1)],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"每张桌子机器人数","label-width":"210px"}},[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"最小值","label-width":"80px"}},[o("el-input",{staticStyle:{width:"100%"},model:{value:t.otherForm.num.min,callback:function(e){t.$set(t.otherForm.num,"min",e)},expression:"otherForm.num.min"}})],1)],1),t._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"最大值","label-width":"80px"}},[o("el-input",{staticStyle:{width:"100%"},model:{value:t.otherForm.num.max,callback:function(e){t.$set(t.otherForm.num,"max",e)},expression:"otherForm.num.max"}})],1)],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"下注权值","label-width":"210px"}},[o("el-col",{attrs:{span:8}},[o("el-form-item",{attrs:{label:"押闲概率","label-width":"80px"}},[o("el-input",{staticStyle:{width:"100%"},model:{value:t.otherForm.win.xianWin,callback:function(e){t.$set(t.otherForm.win,"xianWin",e)},expression:"otherForm.win.xianWin"}},[o("template",{slot:"append"},[t._v("%")])],2)],1)],1),t._v(" "),o("el-col",{attrs:{span:8}},[o("el-form-item",{attrs:{label:"押庄概率","label-width":"80px"}},[o("el-input",{staticStyle:{width:"100%"},model:{value:t.otherForm.win.zhuangWin,callback:function(e){t.$set(t.otherForm.win,"zhuangWin",e)},expression:"otherForm.win.zhuangWin"}},[o("template",{slot:"append"},[t._v("%")])],2)],1)],1),t._v(" "),o("el-col",{attrs:{span:8}},[o("el-form-item",{attrs:{label:"押和概率","label-width":"80px"}},[o("el-input",{staticStyle:{width:"100%"},model:{value:t.otherForm.win.equal,callback:function(e){t.$set(t.otherForm.win,"equal",e)},expression:"otherForm.win.equal"}},[o("template",{slot:"append"},[t._v("%")])],2)],1)],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"押庄闲平后押对的概率","label-width":"210px"}},[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"庄对概率","label-width":"80px"}},[o("el-input",{staticStyle:{width:"100%"},model:{value:t.otherForm.zone.zhuangDui,callback:function(e){t.$set(t.otherForm.zone,"zhuangDui",e)},expression:"otherForm.zone.zhuangDui"}},[o("template",{slot:"append"},[t._v("%")])],2)],1)],1),t._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"闲对概率","label-width":"80px"}},[o("el-input",{staticStyle:{width:"100%"},model:{value:t.otherForm.zone.xianDui,callback:function(e){t.$set(t.otherForm.zone,"xianDui",e)},expression:"otherForm.zone.xianDui"}},[o("template",{slot:"append"},[t._v("%")])],2)],1)],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"空闲座椅数量","label-width":"210px"}},[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"最小值","label-width":"80px"}},[o("el-input",{staticStyle:{width:"100%"},model:{value:t.otherForm.minIdleSeat.min,callback:function(e){t.$set(t.otherForm.minIdleSeat,"min",e)},expression:"otherForm.minIdleSeat.min"}})],1)],1),t._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"最大值","label-width":"80px"}},[o("el-input",{staticStyle:{width:"100%"},model:{value:t.otherForm.minIdleSeat.max,callback:function(e){t.$set(t.otherForm.minIdleSeat,"max",e)},expression:"otherForm.minIdleSeat.max"}})],1)],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"房间内的时间","label-width":"210px"}},[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"最小值","label-width":"80px"}},[o("el-input",{staticStyle:{width:"100%"},model:{value:t.otherForm.time.min,callback:function(e){t.$set(t.otherForm.time,"min",e)},expression:"otherForm.time.min"}})],1)],1),t._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"最大值","label-width":"80px"}},[o("el-input",{staticStyle:{width:"100%"},model:{value:t.otherForm.time.max,callback:function(e){t.$set(t.otherForm.time,"max",e)},expression:"otherForm.time.max"}})],1)],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"机器人携带金钱范围","label-width":"210px"}},t._l(t.otherForm.gold,function(e,l){return o("el-row",{key:"other_"+l},[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:l+"：最小值","label-width":"80px"}},[o("el-input",{staticStyle:{width:"100%"},model:{value:e.min,callback:function(o){t.$set(e,"min",o)},expression:"item.min"}})],1)],1),t._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"最大值","label-width":"80px"}},[o("el-input",{staticStyle:{width:"100%"},model:{value:e.max,callback:function(o){t.$set(e,"max",o)},expression:"item.max"}})],1)],1)],1)}))],1)],1)]):t._e(),t._v(" "),t.bys.some(function(e){return e===Math.floor(t.filterForm.roomId/100)})?o("el-card",{staticClass:"box-card-component"},[o("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[o("h2",[t._v("\n          "+t._s(t.rooms&&t.rooms.length>0&&t.rooms.find(function(e){return e.roomid===t.filterForm.roomId}).roomName)+"机器人配置\n          "),o("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary"},on:{click:function(e){t.saveData("by")}}},[t._v("保 存")])],1)]),t._v(" "),o("div",{staticClass:"filter-container"},[o("el-form",{ref:"otherForm",staticStyle:{width:"1000px"},attrs:{model:t.byForm,"label-position":"right"}},[o("el-form-item",{attrs:{label:"加农炮等级","label-width":"210px"}},[o("el-input",{staticStyle:{width:"100%"},model:{value:t.byForm.cannonLevel,callback:function(e){t.$set(t.byForm,"cannonLevel",e)},expression:"byForm.cannonLevel"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"基础分数","label-width":"210px"}},[o("el-input",{staticStyle:{width:"100%"},model:{value:t.byForm.baseScore,callback:function(e){t.$set(t.byForm,"baseScore",e)},expression:"byForm.baseScore"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"每张桌子机器人数","label-width":"210px"}},[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"最小值","label-width":"80px"}},[o("el-input",{staticStyle:{width:"100%"},model:{value:t.byForm.num.min,callback:function(e){t.$set(t.byForm.num,"min",e)},expression:"byForm.num.min"}})],1)],1),t._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"最大值","label-width":"80px"}},[o("el-input",{staticStyle:{width:"100%"},model:{value:t.byForm.num.max,callback:function(e){t.$set(t.byForm.num,"max",e)},expression:"byForm.num.max"}})],1)],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"房间内的时间","label-width":"210px"}},[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"最小值","label-width":"80px"}},[o("el-input",{staticStyle:{width:"100%"},model:{value:t.byForm.time.min,callback:function(e){t.$set(t.byForm.time,"min",e)},expression:"byForm.time.min"}})],1)],1),t._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"最大值","label-width":"80px"}},[o("el-input",{staticStyle:{width:"100%"},model:{value:t.byForm.time.max,callback:function(e){t.$set(t.byForm.time,"max",e)},expression:"byForm.time.max"}})],1)],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"机器人携带金钱范围","label-width":"210px"}},[o("el-row",[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"最小值","label-width":"80px"}},[o("el-input",{staticStyle:{width:"100%"},model:{value:t.byForm.gold.min,callback:function(e){t.$set(t.byForm.gold,"min",e)},expression:"byForm.gold.min"}})],1)],1),t._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"最大值","label-width":"80px"}},[o("el-input",{staticStyle:{width:"100%"},model:{value:t.byForm.gold.max,callback:function(e){t.$set(t.byForm.gold,"max",e)},expression:"byForm.gold.max"}})],1)],1)],1)],1)],1)],1)]):t._e(),t._v(" "),o("el-card",{staticClass:"box-card-component"},[o("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[o("h2",[t._v("机器人列表"),o("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary"},on:{click:t.addRobot}},[t._v("添加机器人")])],1)]),t._v(" "),o("div",{staticClass:"filter-container"},[o("el-table",{attrs:{data:t.robots,size:"mini",border:"",fit:""}},[o("el-table-column",{attrs:{align:"center",label:"桌号/座位号"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n              "+t._s(e.row.tableid)+" / "+t._s(e.row.seat)+"\n            ")]}}])}),t._v(" "),o("el-table-column",{attrs:{align:"center",label:"机器人ID"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n              "+t._s(e.row.uid)+"\n            ")]}}])}),t._v(" "),o("el-table-column",{attrs:{align:"center",label:"机器人名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n              "+t._s(e.row.name)+"\n            ")]}}])}),t._v(" "),o("el-table-column",{attrs:{align:"center",label:"身上金币"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n              "+t._s(t._f("moneyFilter")(e.row.gold))+"\n            ")]}}])}),t._v(" "),o("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{type:"text"},on:{click:function(o){t.resetRobot(e.row.uid)}}},[t._v("重置机器人")]),t._v(" "),o("el-button",{attrs:{type:"text"},on:{click:function(o){t.delRobot(e.row)}}},[t._v("删除机器人")])]}}])})],1)],1)])],1)],1)},[],!1,null,"046daf6c",null);i.options.__file="index.vue";e.default=i.exports},Fp0o:function(t,e,o){"use strict";var l=o("U+nh");o.n(l).a},"U+nh":function(t,e,o){},aFNf:function(t,e,o){var l=o("c01Q"),n=l.JSON||(l.JSON={stringify:JSON.stringify});t.exports=function(t){return n.stringify.apply(n,arguments)}},omC7:function(t,e,o){t.exports={default:o("aFNf"),__esModule:!0}}}]);