(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-60be"],{DWI9:function(e,t,r){"use strict";r.r(t);var n=r("6ZY3"),l=r.n(n),o=r("bS4n"),a=r.n(o),s={name:"UnderAgentRecord",filters:{moneyFilter:function(e){return e?(e/100).toFixed(2):0}},data:function(){return{filterForm:{playerId:null,account:null,pageNo:1,pageSize:10},list:null,listLoading:!1,listTotal:10}},computed:{superId:function(){return this.$route.query.superId},period:function(){return this.$route.query.period}},watch:{superId:function(){this.query()}},mounted:function(){this.query()},methods:{query:function(){var e=this;this.listLoading=!0,this.$store.dispatch("ListAgentRecordByQry",a()({},this.filterForm,{superId:this.superId,period:this.period})).then(function(t){e.list=t.data,e.listTotal=t.totalCount,e.listLoading=!1}).catch(function(){e.listLoading=!1})},handleClick:function(e){var t=l()({},{superId:e,period:this.period});this.$router.replace({path:"/spread/underAgentRecord",query:t})},handleSizeChange:function(e){this.filterForm.pageSize=e,this.query()},handleCurrentChange:function(e){this.filterForm.pageNo=e,this.query()}}},i=(r("cN1N"),r("ZrdR")),c=Object(i.a)(s,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-container"},[r("div",{staticClass:"filter-container"},[r("el-form",{ref:"filterForm",attrs:{inline:!0,model:e.filterForm,size:"mini"}},[r("el-form-item",{attrs:{label:"用户ID"}},[r("label",[e._v(e._s(e.superId))])]),e._v(" "),r("el-form-item",{attrs:{label:"直属下线"}},[r("label",[e._v(e._s(e.listTotal)+" 人")])]),e._v(" "),r("el-form-item",[r("el-button",{staticClass:"btn-form",attrs:{type:"primary",icon:"el-icon-refresh"},on:{click:e.query}},[e._v("刷新")])],1)],1)],1),e._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.list,size:"mini",border:"",fit:"","highlight-current-row":""}},[r("el-table-column",{attrs:{align:"right",label:"用户信息"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-row",[r("el-col",{attrs:{span:12}},[e._v("用户ID：")]),e._v(" "),r("el-col",{attrs:{span:12}},[e._v(e._s(t.row.userId))])],1),e._v(" "),r("el-row",[r("el-col",{attrs:{span:12}},[e._v("用户账号：")]),e._v(" "),r("el-col",{attrs:{span:12}},[e._v(e._s(t.row.userAccount))])],1),e._v(" "),r("el-row",[r("el-col",{attrs:{span:12}},[e._v("昵称：")]),e._v(" "),r("el-col",{attrs:{span:12}},[e._v(e._s(t.row.nickname))])],1)]}}])}),e._v(" "),r("el-table-column",{attrs:{align:"right",label:"结算信息"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-row",[r("el-col",{attrs:{span:12}},[e._v("代理级别：")]),e._v(" "),r("el-col",{attrs:{span:12}},[e._v(e._s(t.row.agentLevel))])],1),e._v(" "),r("el-row",[r("el-col",{attrs:{span:12}},[e._v("周期佣金：")]),e._v(" "),r("el-col",{attrs:{span:12}},[e._v("每万元 "+e._s(t.row.ratio?t.row.ratio:0)+" 元")])],1),e._v(" "),r("el-row",[r("el-col",{attrs:{span:12}},[e._v("返佣总金额：")]),e._v(" "),r("el-col",{attrs:{span:12}},[r("label",[e._v(e._s(e._f("moneyFilter")(t.row.totalRebate)))])])],1),e._v(" "),r("el-row",[r("el-col",{attrs:{span:12}},[e._v("结算时间：")]),e._v(" "),r("el-col",{attrs:{span:12}},[e._v(e._s(t.row.agentTime))])],1)]}}])}),e._v(" "),r("el-table-column",{attrs:{align:"right",label:"业绩信息"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-row",[r("el-col",{attrs:{span:12}},[e._v("业绩总额：")]),e._v(" "),r("el-col",{attrs:{span:12}},[e._v(e._s(e._f("moneyFilter")(t.row.totalPerformance)))])],1),e._v(" "),r("el-row",[r("el-col",{attrs:{span:12}},[e._v("自营业绩：")]),e._v(" "),r("el-col",{attrs:{span:12}},[e._v(e._s(e._f("moneyFilter")(t.row.performance)))])],1),e._v(" "),r("el-row",[r("el-col",{attrs:{span:12}},[e._v("直营业绩：")]),e._v(" "),r("el-col",{attrs:{span:12}},[e._v(e._s(e._f("moneyFilter")(t.row.directPerformance)))])],1),e._v(" "),r("el-row",[r("el-col",{attrs:{span:12}},[e._v("团队业绩：")]),e._v(" "),r("el-col",{attrs:{span:12}},[e._v(e._s(e._f("moneyFilter")(t.row.teamPerformance)))])],1)]}}])}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"直属下线"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("i",{staticStyle:{"text-decoration":"underline","font-style":"normal","font-weight":"bold"}},[e._v(e._s(t.row.underCount))]),e._v("人\n        "),0!==t.row.underCount?r("el-button",{attrs:{type:"text",icon:"el-icon-sort-down"},on:{click:function(r){e.handleClick(t.row.showId)}}}):e._e()]}}])})],1),e._v(" "),r("div",{staticClass:"pagination-container"},[r("el-pagination",{attrs:{"current-page":e.filterForm.pageNo,"page-sizes":[10,20,30,50],"page-size":e.filterForm.pageSize,total:e.listTotal,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"update:currentPage":function(t){e.$set(e.filterForm,"pageNo",t)},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},[],!1,null,"4dc259ae",null);c.options.__file="index.vue";t.default=c.exports},Knzr:function(e,t,r){},cN1N:function(e,t,r){"use strict";var n=r("Knzr");r.n(n).a}}]);