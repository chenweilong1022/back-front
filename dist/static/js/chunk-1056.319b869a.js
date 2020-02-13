(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-1056"],{"94pY":function(t,e,r){"use strict";r.r(e);var n=r("bS4n"),l=r.n(n),o={name:"AgentRealtime",filters:{moneyFilter:function(t){return t?(t/100).toFixed(2):0},logTypeFilter:function(t){return 0===t?"下线增加":1===t?"推广佣金":2===t?"下线分红":3===t?"佣金结算":void 0}},data:function(){return{filterForm:{showId:null,account:null,pageNo:1,pageSize:10},list:null,listLoading:!1,listTotal:10}},created:function(){this.query()},methods:{query:function(){var t=this;this.listLoading=!0,this.$store.dispatch("ListAgentRealtimeByQry",l()({},this.filterForm,{superId:this.$route.query.superId})).then(function(e){t.list=e.data,t.listTotal=e.totalCount,t.listLoading=!1}).catch(function(){t.listLoading=!1})},handleClick:function(t){this.$router.push({path:"/spread/underAgentRealtime",query:{superId:t}})},handleSizeChange:function(t){this.filterForm.pageSize=t,this.query()},handleCurrentChange:function(t){this.filterForm.pageNo=t,this.query()}}},a=(r("N6B4"),r("ZrdR")),i=Object(a.a)(o,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"app-container"},[r("div",{staticClass:"filter-container"},[r("el-form",{ref:"filterForm",attrs:{inline:!0,model:t.filterForm,size:"mini"}},[r("el-form-item",{attrs:{label:"用户ID"}},[r("el-input",{model:{value:t.filterForm.showId,callback:function(e){t.$set(t.filterForm,"showId",e)},expression:"filterForm.showId"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"用户帐号"}},[r("el-input",{model:{value:t.filterForm.account,callback:function(e){t.$set(t.filterForm,"account",e)},expression:"filterForm.account"}})],1),t._v(" "),r("el-form-item",[r("el-button",{staticClass:"btn-form",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.query}},[t._v("查询")])],1)],1)],1),t._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list,border:"",fit:"","highlight-current-row":""}},[r("el-table-column",{attrs:{align:"right",label:"用户信息"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-row",[r("el-col",{attrs:{span:12}},[t._v("用户ID：")]),t._v(" "),r("el-col",{attrs:{span:12}},[t._v(t._s(e.row.showId))])],1),t._v(" "),r("el-row",[r("el-col",{attrs:{span:12}},[t._v("用户账号：")]),t._v(" "),r("el-col",{attrs:{span:12}},[t._v(t._s(e.row.userAccount))])],1),t._v(" "),r("el-row",[r("el-col",{attrs:{span:12}},[t._v("昵称：")]),t._v(" "),r("el-col",{attrs:{span:12}},[t._v(t._s(e.row.nickname))])],1)]}}])}),t._v(" "),r("el-table-column",{attrs:{align:"right",label:"结算信息"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-row",[r("el-col",{attrs:{span:12}},[t._v("代理级别：")]),t._v(" "),r("el-col",{attrs:{span:12}},[t._v(t._s(e.row.agentLevel))])],1),t._v(" "),r("el-row",[r("el-col",{attrs:{span:12}},[t._v("周期佣金：")]),t._v(" "),r("el-col",{attrs:{span:12}},[t._v("每万元 "+t._s(e.row.ratio?e.row.ratio:0)+" 元")])],1),t._v(" "),r("el-row",[r("el-col",{attrs:{span:12}},[t._v("返佣总金额：")]),t._v(" "),r("el-col",{attrs:{span:12}},[r("label",[t._v(t._s(t._f("moneyFilter")(e.row.rebate)))])])],1)]}}])}),t._v(" "),r("el-table-column",{attrs:{align:"right",label:"业绩信息"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-row",[r("el-col",{attrs:{span:12}},[t._v("业绩总额：")]),t._v(" "),r("el-col",{attrs:{span:12}},[t._v(t._s(t._f("moneyFilter")(e.row.totalPerformance)))])],1),t._v(" "),r("el-row",[r("el-col",{attrs:{span:12}},[t._v("自营业绩：")]),t._v(" "),r("el-col",{attrs:{span:12}},[t._v(t._s(t._f("moneyFilter")(e.row.performanc)))])],1),t._v(" "),r("el-row",[r("el-col",{attrs:{span:12}},[t._v("直营业绩：")]),t._v(" "),r("el-col",{attrs:{span:12}},[t._v(t._s(t._f("moneyFilter")(e.row.directPerformance)))])],1),t._v(" "),r("el-row",[r("el-col",{attrs:{span:12}},[t._v("团队业绩：")]),t._v(" "),r("el-col",{attrs:{span:12}},[t._v(t._s(t._f("moneyFilter")(e.row.teamPerformance)))])],1)]}}])}),t._v(" "),r("el-table-column",{attrs:{align:"center",label:"直属下线"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("i",{staticStyle:{"text-decoration":"underline","font-style":"normal","font-weight":"bold"}},[t._v(t._s(e.row.underCount?e.row.underCount:0))]),t._v("人\n        "),e.row.underCount&&0!==e.row.underCount?r("el-button",{attrs:{type:"text",icon:"el-icon-sort-down"},on:{click:function(r){t.handleClick(e.row.showId)}}}):t._e()]}}])})],1),t._v(" "),r("div",{staticClass:"pagination-container"},[r("el-pagination",{attrs:{"current-page":t.filterForm.pageNo,"page-sizes":[10,20,30,50],"page-size":t.filterForm.pageSize,total:t.listTotal,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"update:currentPage":function(e){t.$set(t.filterForm,"pageNo",e)},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)},[],!1,null,"b72455d6",null);i.options.__file="index.vue";e.default=i.exports},N6B4:function(t,e,r){"use strict";var n=r("xDoA");r.n(n).a},xDoA:function(t,e,r){}}]);