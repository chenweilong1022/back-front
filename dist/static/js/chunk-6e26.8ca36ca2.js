(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-6e26"],{"8r2Y":function(e,t,n){"use strict";var i=n("tjUT");n.n(i).a},NBFk:function(e,t,n){"use strict";n.r(t);var i=n("6ZY3"),r=n.n(i),a={name:"WinningDetail",filters:{moneyFilter:function(e){return e?(e/100).toFixed(2):(0).toFixed(2)}},data:function(){return{filterForm:{showId:null,startTime:null,endTime:null,pageNo:1,pageSize:10},list:null,listLoading:!1,listTotal:10}},mounted:function(){this.loadPageData()},methods:{loadPageData:function(){var e=this;this.filterForm=r()({},this.filterForm,{showId:this.$route.query.showId,roomId:this.$route.query.roomId,startTime:this.$route.query.startTime,endTime:this.$route.query.endTime}),this.listLoading=!0,this.$store.dispatch("ListUserGameDetailByQry",this.filterForm).then(function(t){e.list=t.data,e.listTotal=t.totalCount,e.listLoading=!1}).catch(function(){e.listLoading=!1})},query:function(){var e=this;this.$refs.filterForm.validate(function(t){t&&e.loadPageData()})},handleSizeChange:function(e){this.filterForm.pageSize=e,this.query()},handleCurrentChange:function(e){this.filterForm.pageNo=e,this.query()}}},o=(n("8r2Y"),n("ZrdR")),l=Object(o.a)(a,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-form",{ref:"filterForm",attrs:{inline:!0,model:e.filterForm,size:"small"}},[n("el-form-item",[n("el-button",{staticClass:"btn-form",attrs:{type:"primary",icon:"el-icon-refresh"},on:{click:e.query}},[e._v("刷新")])],1)],1)],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.list,border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{align:"center",label:"玩家信息"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.nickname)+"("+e._s(t.row.userId)+")\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"游戏名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.gameName)+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"流水量",prop:"flowVolume"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(e._f("moneyFilter")(t.row.flowVolume))+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"税收总和",prop:"totalTax"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(e._f("moneyFilter")(t.row.totalTax))+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"游戏输赢",prop:"winningMoney"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("label",{style:t.row.winningMoney>0?"color: red;":"color: green;"},[e._v(e._s(e._f("moneyFilter")(t.row.winningMoney)))])]}}])})],1),e._v(" "),n("div",{staticClass:"pagination-container"},[n("el-pagination",{attrs:{"current-page":e.filterForm.pageNo,"page-sizes":[10,20,30,50],"page-size":e.filterForm.pageSize,total:e.listTotal,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"update:currentPage":function(t){e.$set(e.filterForm,"pageNo",t)},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},[],!1,null,"46e3523e",null);l.options.__file="index.vue";t.default=l.exports},tjUT:function(e,t,n){}}]);