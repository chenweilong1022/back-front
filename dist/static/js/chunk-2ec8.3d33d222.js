(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2ec8"],{"2qHK":function(t,e,i){"use strict";var a=i("Av2E");i.n(a).a},Av2E:function(t,e,i){},yYZ1:function(t,e,i){"use strict";i.r(e);var a=i("6ZY3"),n=i.n(a),o={name:"tblmainframemonitorlog",filters:{dialogTitle:function(t){return t?"添加":"编辑"}},data:function(){return{filterForm:{enabled:1,pageNo:1,pageSize:10,searchKey:""},list:null,listLoading:!1,listTotal:0,data:{id:0,mainframe:"",createTime:"",isDel:""},dataRule:{mainframe:[{required:!0,message:"主机url不能为空",trigger:"blur"}],createTime:[{required:!0,message:"创建时间不能为空",trigger:"blur"}],isDel:[{required:!0,message:"删除标志不能为空",trigger:"blur"}]},dialogNewOrEditVisible:!1,newFlag:!0,saveBtnLoading:!1}},mounted:function(){this.query()},methods:{query:function(){var t=this;this.listLoading=!0,this.$store.dispatch("Listtblmainframemonitorlog",this.filterForm).then(function(e){t.list=e.data,t.listTotal=e.totalCount,t.listLoading=!1}).catch(function(){t.listLoading=!1})},showNewPage:function(){this.newFlag=!0,this.resetForm(),this.data={},this.dialogNewOrEditVisible=!0},showEditPage:function(t){this.newFlag=!1,this.data=n()({},t),this.dialogNewOrEditVisible=!0},savetblmainframemonitorlog:function(){var t=this;this.$refs.dataForm.validate(function(e){e&&t.$confirm("是否确定保存?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){t.saveBtnLoading=!0,t.$store.dispatch(t.newFlag?"Savetblmainframemonitorlog":"Updatetblmainframemonitorlog",t.data).then(function(e){t.saveBtnLoading=!1,t.dialogNewOrEditVisible=!1,t.$message({message:e.msg,type:"success"}),t.query()}).catch(function(){t.saveBtnLoading=!1})})})},removeData:function(t){var e=this;this.$confirm("是否确定删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){e.$store.dispatch("Deletetblmainframemonitorlog",t.id).then(function(t){e.$message({message:t.msg,type:"success"}),e.listLoading=!1,e.query()}).catch(function(){e.listLoading=!1})})},resetForm:function(){this.$refs.dataForm&&this.$refs.dataForm.clearValidate()},handleSizeChange:function(t){this.filterForm.pageSize=t,this.query()},handleCurrentChange:function(t){this.filterForm.pageNo=t,this.query()}}},r=(i("2qHK"),i("ZrdR")),l=Object(r.a)(o,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[i("div",{staticClass:"filter-container"},[i("el-form",{ref:"filterForm",attrs:{inline:!0,size:"mini"}},[i("el-form-item",[i("el-form-item",{attrs:{label:"条件"}},[i("el-input",{model:{value:t.filterForm.searchKey,callback:function(e){t.$set(t.filterForm,"searchKey",e)},expression:"filterForm.searchKey"}})],1),t._v(" "),i("el-button",{staticClass:"btn-form",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.query}},[t._v("查询")]),t._v(" "),i("el-button",{staticClass:"btn-form",attrs:{type:"primary",icon:"el-icon-plus"},on:{click:t.showNewPage}},[t._v("新增")])],1)],1)],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list,size:"mini",border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{align:"center",label:"id"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.id)+"\n      ")]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"主机url"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.mainframe)+"\n      ")]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"创建时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.createTime)+"\n      ")]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"删除标志"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.isDel)+"\n      ")]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"管理"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{icon:"el-icon-edit",type:"text",size:"mini"},on:{click:function(i){t.showEditPage(e.row)}}},[t._v("编辑")]),t._v(" "),i("el-button",{staticStyle:{color:"red"},attrs:{icon:"el-icon-delete",type:"text",size:"mini"},on:{click:function(i){t.removeData(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),i("div",{staticClass:"pagination-container"},[i("el-pagination",{attrs:{"current-page":t.filterForm.pageNo,"page-sizes":[10,20,30,50],"page-size":t.filterForm.pageSize,total:t.listTotal,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"update:currentPage":function(e){t.$set(t.filterForm,"pageNo",e)},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),i("el-dialog",{attrs:{visible:t.dialogNewOrEditVisible,title:t._f("dialogTitle")(t.newFlag),width:"600px"},on:{"update:visible":function(e){t.dialogNewOrEditVisible=e}}},[i("el-form",{ref:"dataForm",attrs:{model:t.data,rules:t.dataRule,"label-width":"100px"}},[i("el-form-item",{attrs:{label:"主机url",prop:"mainframe"}},[i("el-input",{attrs:{placeholder:"主机url"},model:{value:t.data.mainframe,callback:function(e){t.$set(t.data,"mainframe",e)},expression:"data.mainframe"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{icon:"el-icon-close"},on:{click:function(e){t.dialogNewOrEditVisible=!1}}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{loading:t.saveBtnLoading,type:"primary"},on:{click:t.savetblmainframemonitorlog}},[i("svg-icon",{staticStyle:{"margin-right":"5px"},attrs:{"icon-class":"save"}}),t._v("保存")],1)],1)],1)],1)},[],!1,null,"1babf076",null);l.options.__file="index.vue";e.default=l.exports}}]);