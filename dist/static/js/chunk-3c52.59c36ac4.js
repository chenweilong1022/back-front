(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-3c52"],{GePS:function(t,e,l){},fcP8:function(t,e,l){"use strict";l.r(e);var o=l("bS4n"),a=l.n(o),r={name:"AgentRecord",filters:{moneyFilter:function(t){return t?(t/100).toFixed(2):0},logTypeFilter:function(t){return 0===t?"下线增加":1===t?"推广佣金":2===t?"下线分红":3===t?"佣金结算":void 0}},data:function(){return{filterForm:{showId:null,account:null,period:null,pageNo:1,pageSize:10},list:null,listLoading:!1,listTotal:10,tableTotal:[{type:"小计",totalAllPerformance:0,totalRebate:0,totalPerformance:0,totalDirectPerformance:0,totalTeamPerformance:0,totalAgentCount:0},{type:"总计",totalAllPerformance:0,totalRebate:0,totalPerformance:0,totalDirectPerformance:0,totalTeamPerformance:0,totalAgentCount:0}]}},created:function(){this.query()},methods:{query:function(){var t=this;this.listLoading=!0,this.$store.dispatch("ListAgentRecordByQry",a()({},this.filterForm,{superId:this.$route.query.superId})).then(function(e){t.list=e.data,t.listTotal=e.totalCount,t.getSummaries()}).catch(function(){t.listLoading=!1})},getSummaries:function(){var t=this;if(this.list){var e=this.tableTotal[0],l=0,o=0,a=0,r=0,n=0,i=[];this.list.forEach(function(t){i.indexOf(t.userId)<0&&(i=i.concat(t.userId)),l+=t.totalPerformance,o+=t.totalRebate,a+=t.performance,r+=t.directPerformance,n+=t.teamPerformance}),e.totalAllPerformance=l,e.totalRebate=o,e.totalPerformance=a,e.totalDirectPerformance=r,e.totalTeamPerformance=n,e.totalAgentCount=i.length}this.$store.dispatch("GetAgentRecordSummary",{}).then(function(e){var l=e.data,o=t.tableTotal[1];o.totalAllPerformance=l.totalAllPerformance,o.totalRebate=l.totalRebate,o.totalPerformance=l.totalPerformance,o.totalDirectPerformance=l.totalDirectPerformance,o.totalTeamPerformance=l.totalTeamPerformance,o.totalAgentCount=l.totalAgentCount,t.listLoading=!1}).catch(function(){t.listLoading=!1})},handleClick:function(t){this.$router.push({path:"/spread/underAgentRecord",query:{superId:t.showId,period:t.period}})},handleSizeChange:function(t){this.filterForm.pageSize=t,this.query()},handleCurrentChange:function(t){this.filterForm.pageNo=t,this.query()}}},n=(l("vnHa"),l("ZrdR")),i=Object(n.a)(r,function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"app-container"},[l("div",{staticClass:"filter-container"},[l("el-form",{ref:"filterForm",attrs:{inline:!0,model:t.filterForm,size:"mini"}},[l("el-form-item",{attrs:{label:"用户ID"}},[l("el-input",{model:{value:t.filterForm.showId,callback:function(e){t.$set(t.filterForm,"showId",e)},expression:"filterForm.showId"}})],1),t._v(" "),l("el-form-item",{attrs:{label:"用户帐号"}},[l("el-input",{model:{value:t.filterForm.account,callback:function(e){t.$set(t.filterForm,"account",e)},expression:"filterForm.account"}})],1),t._v(" "),l("el-form-item",{attrs:{label:"期次"}},[l("el-input",{model:{value:t.filterForm.period,callback:function(e){t.$set(t.filterForm,"period",e)},expression:"filterForm.period"}})],1),t._v(" "),l("el-form-item",[l("el-button",{staticClass:"btn-form",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.query}},[t._v("查询")])],1)],1)],1),t._v(" "),l("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list,border:"",fit:"","highlight-current-row":""}},[l("el-table-column",{attrs:{align:"center",label:"期次"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.period)+"\n      ")]}}])}),t._v(" "),l("el-table-column",{attrs:{align:"right",label:"用户信息"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("el-row",[l("el-col",{attrs:{span:12}},[t._v("用户ID：")]),t._v(" "),l("el-col",{attrs:{span:12}},[t._v(t._s(e.row.showId))])],1),t._v(" "),l("el-row",[l("el-col",{attrs:{span:12}},[t._v("用户账号：")]),t._v(" "),l("el-col",{attrs:{span:12}},[t._v(t._s(e.row.userAccount))])],1),t._v(" "),l("el-row",[l("el-col",{attrs:{span:12}},[t._v("昵称：")]),t._v(" "),l("el-col",{attrs:{span:12}},[t._v(t._s(e.row.nickname))])],1)]}}])}),t._v(" "),l("el-table-column",{attrs:{align:"right",label:"结算信息"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("el-row",[l("el-col",{attrs:{span:12}},[t._v("代理级别：")]),t._v(" "),l("el-col",{attrs:{span:12}},[t._v(t._s(e.row.agentLevel))])],1),t._v(" "),l("el-row",[l("el-col",{attrs:{span:12}},[t._v("周期佣金：")]),t._v(" "),l("el-col",{attrs:{span:12}},[t._v("每万元 "+t._s(e.row.ratio?e.row.ratio:0)+" 元")])],1),t._v(" "),l("el-row",[l("el-col",{attrs:{span:12}},[t._v("返佣总金额：")]),t._v(" "),l("el-col",{attrs:{span:12}},[l("label",[t._v(t._s(t._f("moneyFilter")(e.row.totalRebate)))])])],1),t._v(" "),l("el-row",[l("el-col",{attrs:{span:12}},[t._v("结算时间：")]),t._v(" "),l("el-col",{attrs:{span:12}},[t._v(t._s(e.row.agentTime))])],1)]}}])}),t._v(" "),l("el-table-column",{attrs:{align:"right",label:"业绩信息"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("el-row",[l("el-col",{attrs:{span:12}},[t._v("业绩总额：")]),t._v(" "),l("el-col",{attrs:{span:12}},[t._v(t._s(t._f("moneyFilter")(e.row.totalPerformance)))])],1),t._v(" "),l("el-row",[l("el-col",{attrs:{span:12}},[t._v("自营业绩：")]),t._v(" "),l("el-col",{attrs:{span:12}},[t._v(t._s(t._f("moneyFilter")(e.row.performanc)))])],1),t._v(" "),l("el-row",[l("el-col",{attrs:{span:12}},[t._v("直营业绩：")]),t._v(" "),l("el-col",{attrs:{span:12}},[t._v(t._s(t._f("moneyFilter")(e.row.directPerformance)))])],1),t._v(" "),l("el-row",[l("el-col",{attrs:{span:12}},[t._v("团队业绩：")]),t._v(" "),l("el-col",{attrs:{span:12}},[t._v(t._s(t._f("moneyFilter")(e.row.teamPerformance)))])],1)]}}])}),t._v(" "),l("el-table-column",{attrs:{align:"center",label:"直属下线"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("i",{staticStyle:{"text-decoration":"underline","font-style":"normal","font-weight":"bold"}},[t._v(t._s(e.row.underCount))]),t._v("人\n        "),0!==e.row.underCount?l("el-button",{attrs:{type:"text",icon:"el-icon-sort-down"},on:{click:function(l){t.handleClick(e.row)}}}):t._e()]}}])})],1),t._v(" "),l("div",{staticClass:"pagination-container"},[l("el-pagination",{attrs:{"current-page":t.filterForm.pageNo,"page-sizes":[10,20,30,50],"page-size":t.filterForm.pageSize,total:t.listTotal,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"update:currentPage":function(e){t.$set(t.filterForm,"pageNo",e)},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),l("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{"margin-top":"30px"},attrs:{data:t.tableTotal,size:"mini",border:"",fit:"","highlight-current-row":""}},[l("el-table-column",{attrs:{align:"center",label:"合计类型"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.type)+"\n      ")]}}])}),t._v(" "),l("el-table-column",{attrs:{align:"center",label:"总业绩"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(t._f("moneyFilter")(e.row.totalAllPerformance))+"\n      ")]}}])}),t._v(" "),l("el-table-column",{attrs:{align:"center",label:"总返佣"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(t._f("moneyFilter")(e.row.totalRebate))+"\n      ")]}}])}),t._v(" "),l("el-table-column",{attrs:{align:"center",label:"总自营业绩"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(t._f("moneyFilter")(e.row.totalPerformance))+"\n      ")]}}])}),t._v(" "),l("el-table-column",{attrs:{align:"center",label:"总直营业绩"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(t._f("moneyFilter")(e.row.totalDirectPerformance))+"\n      ")]}}])}),t._v(" "),l("el-table-column",{attrs:{align:"center",label:"总团队业绩"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(t._f("moneyFilter")(e.row.totalTeamPerformance))+"\n      ")]}}])}),t._v(" "),l("el-table-column",{attrs:{align:"center",label:"总代理人数"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.totalAgentCount)+"\n      ")]}}])})],1)],1)},[],!1,null,"2d0ccff6",null);i.options.__file="index.vue";e.default=i.exports},vnHa:function(t,e,l){"use strict";var o=l("GePS");l.n(o).a}}]);