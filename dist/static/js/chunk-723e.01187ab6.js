(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-723e"],{HrAm:function(e,t,a){"use strict";var i=a("zC9q");a.n(i).a},Itxn:function(e,t,a){"use strict";a.r(t);var i=a("6ZY3"),r=a.n(i),n={name:"tbldailyadventureawardgetrecord",filters:{dialogTitle:function(e){return e?"添加":"编辑"}},data:function(){return{filterForm:{enabled:1,pageNo:1,pageSize:10,searchKey:"",userid:""},list:null,listLoading:!1,listTotal:0,data:{id:0,userid:"",checkpoint:"",effectiveBetting:"",reward:"",currentBetting:"",note:"",createTime:"",isDel:""},dataRule:{userid:[{required:!0,message:"用户id不能为空",trigger:"blur"}],checkpoint:[{required:!0,message:"关卡不能为空",trigger:"blur"}],effectiveBetting:[{required:!0,message:"有效投注不能为空",trigger:"blur"}],reward:[{required:!0,message:"奖励不能为空",trigger:"blur"}],currentBetting:[{required:!0,message:"当前投注不能为空",trigger:"blur"}],note:[{required:!0,message:"备注不能为空",trigger:"blur"}],createTime:[{required:!0,message:"创建时间不能为空",trigger:"blur"}],isDel:[{required:!0,message:"删除标志不能为空",trigger:"blur"}]},dialogNewOrEditVisible:!1,newFlag:!0,saveBtnLoading:!1}},mounted:function(){this.query()},methods:{query:function(){var e=this;this.listLoading=!0,this.$store.dispatch("Listtbldailyadventureawardgetrecord",this.filterForm).then(function(t){e.list=t.data,e.listTotal=t.totalCount,e.listLoading=!1}).catch(function(){e.listLoading=!1})},showNewPage:function(){this.newFlag=!0,this.resetForm(),this.data={},this.dialogNewOrEditVisible=!0},showEditPage:function(e){this.newFlag=!1,this.data=r()({},e),this.dialogNewOrEditVisible=!0},savetbldailyadventureawardgetrecord:function(){var e=this;this.$refs.dataForm.validate(function(t){t&&e.$confirm("是否确定保存?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){e.saveBtnLoading=!0,e.$store.dispatch(e.newFlag?"Savetbldailyadventureawardgetrecord":"Updatetbldailyadventureawardgetrecord",e.data).then(function(t){e.saveBtnLoading=!1,e.dialogNewOrEditVisible=!1,e.$message({message:t.msg,type:"success"}),e.query()}).catch(function(){e.saveBtnLoading=!1})})})},removeData:function(e){var t=this;this.$confirm("是否确定删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){t.$store.dispatch("Deletetbldailyadventureawardgetrecord",e.id).then(function(e){t.$message({message:e.msg,type:"success"}),t.listLoading=!1,t.query()}).catch(function(){t.listLoading=!1})})},resetForm:function(){this.$refs.dataForm&&this.$refs.dataForm.clearValidate()},handleSizeChange:function(e){this.filterForm.pageSize=e,this.query()},handleCurrentChange:function(e){this.filterForm.pageNo=e,this.query()}}},l=(a("HrAm"),a("ZrdR")),o=Object(l.a)(n,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-form",{ref:"filterForm",attrs:{inline:!0,size:"mini"}},[a("el-form-item",[a("el-form-item",{attrs:{label:"用户id"}},[a("el-input",{model:{value:e.filterForm.userid,callback:function(t){e.$set(e.filterForm,"userid",t)},expression:"filterForm.userid"}})],1),e._v(" "),a("el-button",{staticClass:"btn-form",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.query}},[e._v("查询")]),e._v(" "),a("el-button",{staticClass:"btn-form",attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.showNewPage}},[e._v("新增")])],1)],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.list,size:"mini",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"id"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.id)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"用户id"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.userid)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"关卡"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.checkpoint)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"有效投注"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.effectiveBetting)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"奖励"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.reward)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"当前投注"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.currentBetting)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"备注"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.note)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"创建时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.createTime)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"删除标志"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.isDel)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"管理"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{icon:"el-icon-edit",type:"text",size:"mini"},on:{click:function(a){e.showEditPage(t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{staticStyle:{color:"red"},attrs:{icon:"el-icon-delete",type:"text",size:"mini"},on:{click:function(a){e.removeData(t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("div",{staticClass:"pagination-container"},[a("el-pagination",{attrs:{"current-page":e.filterForm.pageNo,"page-sizes":[10,20,30,50],"page-size":e.filterForm.pageSize,total:e.listTotal,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"update:currentPage":function(t){e.$set(e.filterForm,"pageNo",t)},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-dialog",{attrs:{visible:e.dialogNewOrEditVisible,title:e._f("dialogTitle")(e.newFlag),width:"600px"},on:{"update:visible":function(t){e.dialogNewOrEditVisible=t}}},[a("el-form",{ref:"dataForm",attrs:{model:e.data,rules:e.dataRule,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"用户id",prop:"userid"}},[a("el-input",{attrs:{placeholder:"用户id"},model:{value:e.data.userid,callback:function(t){e.$set(e.data,"userid",t)},expression:"data.userid"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"关卡",prop:"checkpoint"}},[a("el-input",{attrs:{placeholder:"关卡"},model:{value:e.data.checkpoint,callback:function(t){e.$set(e.data,"checkpoint",t)},expression:"data.checkpoint"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"有效投注",prop:"effectiveBetting"}},[a("el-input",{attrs:{placeholder:"有效投注"},model:{value:e.data.effectiveBetting,callback:function(t){e.$set(e.data,"effectiveBetting",t)},expression:"data.effectiveBetting"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"奖励",prop:"reward"}},[a("el-input",{attrs:{placeholder:"奖励"},model:{value:e.data.reward,callback:function(t){e.$set(e.data,"reward",t)},expression:"data.reward"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"当前投注",prop:"currentBetting"}},[a("el-input",{attrs:{placeholder:"当前投注"},model:{value:e.data.currentBetting,callback:function(t){e.$set(e.data,"currentBetting",t)},expression:"data.currentBetting"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"备注",prop:"note"}},[a("el-input",{attrs:{placeholder:"备注"},model:{value:e.data.note,callback:function(t){e.$set(e.data,"note",t)},expression:"data.note"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"创建时间",prop:"createTime"}},[a("el-input",{attrs:{placeholder:"创建时间"},model:{value:e.data.createTime,callback:function(t){e.$set(e.data,"createTime",t)},expression:"data.createTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"删除标志",prop:"isDel"}},[a("el-input",{attrs:{placeholder:"删除标志"},model:{value:e.data.isDel,callback:function(t){e.$set(e.data,"isDel",t)},expression:"data.isDel"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{icon:"el-icon-close"},on:{click:function(t){e.dialogNewOrEditVisible=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{loading:e.saveBtnLoading,type:"primary"},on:{click:e.savetbldailyadventureawardgetrecord}},[a("svg-icon",{staticStyle:{"margin-right":"5px"},attrs:{"icon-class":"save"}}),e._v("保存")],1)],1)],1)],1)},[],!1,null,"3512f31a",null);o.options.__file="index.vue";t.default=o.exports},zC9q:function(e,t,a){}}]);