(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-1952"],{"3v0E":function(e,t,n){"use strict";var r=n("vbxb");n.n(r).a},AH47:function(e,t,n){"use strict";n.r(t);var r=n("7Qib"),a={name:"PlayerGameLogListPage",filters:{moneyFilter:function(e){return e?e/100:0},reasonFilter:function(e){switch(e){case"0":return"游戏结算";case"1":return"银行存取款";case"3":return"赠送礼金";case"5":return"提现退还";case"6":return"活动赠送";case"10":return"代理返佣";case"99":return"充值/兑换";default:return e}}},data:function(){return{filterForm:{showId:null,gameIds:[],startTime:Object(r.d)(0),endTime:Object(r.a)(0),pageNo:1,pageSize:10},games:[],filterRules:{startTime:[{required:!0,trigger:"blur",message:"必填项"}],endTime:[{required:!0,trigger:"blur",message:"必填项"}]},list:null,listLoading:!1,listTotal:10}},mounted:function(){this.queryGames(),this.loadPageData()},methods:{queryGames:function(){var e=this;this.$store.dispatch("ListAllGame").then(function(t){e.games=t.data})},loadPageData:function(){var e=this;this.listLoading=!0,this.$store.dispatch("ListPlayerGameLogByQry",this.filterForm).then(function(t){e.list=t.data,e.listTotal=t.totalCount,e.listLoading=!1}).catch(function(){e.listLoading=!1})},query:function(){var e=this;this.$refs.filterForm.validate(function(t){t&&e.loadPageData()})},handleSizeChange:function(e){this.filterForm.pageSize=e,this.query()},handleCurrentChange:function(e){this.filterForm.pageNo=e,this.query()}}},l=(n("3v0E"),n("ZrdR")),i=Object(l.a)(a,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-form",{ref:"filterForm",attrs:{inline:!0,model:e.filterForm,rules:e.filterRules,size:"mini"}},[n("el-form-item",{attrs:{label:"玩家ID",prop:"showId"}},[n("el-input",{model:{value:e.filterForm.showId,callback:function(t){e.$set(e.filterForm,"showId",t)},expression:"filterForm.showId"}})],1),e._v(" "),n("el-form-item",[n("el-col",{attrs:{xs:24,md:24,lg:12}},[n("el-form-item",{staticStyle:{"margin-bottom":"0px"},attrs:{label:"起始时间",prop:"startTime"}},[n("el-date-picker",{attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm:ss","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:e.filterForm.startTime,callback:function(t){e.$set(e.filterForm,"startTime",t)},expression:"filterForm.startTime"}})],1)],1),e._v(" "),n("el-col",{attrs:{xs:24,md:24,lg:12}},[n("el-form-item",{staticStyle:{"margin-bottom":"0px"},attrs:{label:"结束时间",prop:"endTime"}},[n("el-date-picker",{attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm:ss","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:e.filterForm.endTime,callback:function(t){e.$set(e.filterForm,"endTime",t)},expression:"filterForm.endTime"}})],1)],1)],1),e._v(" "),n("br"),e._v(" "),n("el-form-item",{attrs:{label:"筛选游戏"}},[n("el-checkbox-group",{model:{value:e.filterForm.gameIds,callback:function(t){e.$set(e.filterForm,"gameIds",t)},expression:"filterForm.gameIds"}},e._l(e.games,function(t){return n("el-checkbox",{key:t.gameid,staticStyle:{"margin-left":"5px"},attrs:{label:t.gameid}},[e._v(e._s(t.gameName))])}))],1),e._v(" "),n("el-form-item",[n("el-button",{staticClass:"btn-form",attrs:{type:"primary"},on:{click:e.query}},[e._v("查询")])],1)],1)],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.list,size:"mini",border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{align:"center",label:"记录时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.recordTime)+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"玩家ID"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.showId)+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"玩家昵称"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.nickName)+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"游戏名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.gameName)+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"房间号"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.roomid)+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"变更前金币"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(e._f("moneyFilter")(t.row.beginGold))+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"金币变更"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(e._f("moneyFilter")(t.row.changeGold))+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"变更后金币"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(e._f("moneyFilter")(t.row.endGold))+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"税金"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(e._f("moneyFilter")(t.row.taxGold))+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"变更原因"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(e._f("reasonFilter")(t.row.reason))+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"备注"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.note)+"\n      ")]}}])})],1),e._v(" "),n("div",{staticClass:"pagination-container"},[n("el-pagination",{attrs:{"current-page":e.filterForm.pageNo,"page-sizes":[10,20,30,50],"page-size":e.filterForm.pageSize,total:e.listTotal,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},[],!1,null,"cbf8a1f6",null);i.options.__file="index.vue";t.default=i.exports},vbxb:function(e,t,n){}}]);