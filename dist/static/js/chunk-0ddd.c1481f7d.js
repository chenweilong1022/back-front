(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0ddd"],{dw2A:function(t,e,a){"use strict";var i=a("kwBA");a.n(i).a},kwBA:function(t,e,a){},qZSX:function(t,e,a){"use strict";a.r(e);var i=a("6ZY3"),l=a.n(i),n=a("bS4n"),o=a.n(n),s=a("8t5x"),r={name:"ShareImages",filters:{stateTitle:function(t){return 0===t?"未处理":1===t?"已处理":void 0}},data:function(){return{filterForm:{state:"",pageNo:1,pageSize:10},states:[{state:"",title:"全部"},{state:0,title:"未启用"},{state:1,title:"已启用"}],list:null,listLoading:!1,listTotal:10,data:{},dataRules:{},fileList:[],imageUrl:"",newFlag:!0,dialogNewOrEditVisible:!1,saveBtnLoading:!1}},computed:o()({},Object(s.b)(["host"])),created:function(){this.query()},methods:{query:function(){var t=this;this.listLoading=!0,this.$store.dispatch("ListShareImageByQry",this.filterForm).then(function(e){t.list=e.data,t.listTotal=e.totalCount,t.listLoading=!1}).catch(function(){t.listLoading=!1})},addData:function(){this.newFlag=!0,this.data={transferLink:null,thumbUrl:null,downloadUrl:null,showUrl:null,note:null,sort:1,enabled:1},this.fileList=[],this.dialogNewOrEditVisible=!0},showEditPage:function(t){this.newFlag=!1,this.data=l()({},t);var e=t.downloadUrl,a={name:e.substr(e.lastIndexOf("/")+1),url:e};this.fileList=[].concat(a),this.dialogNewOrEditVisible=!0},saveData:function(){var t=this;this.$refs.dataForm.validate(function(e){if(e){if(!t.data.downloadUrl||""===t.data.downloadUrl)return t.$message.warning("图片必传"),!1;t.saveBtnLoading=!0,t.$store.dispatch(t.newFlag?"SaveShareImage":"UpdateShareImage",t.data).then(function(e){t.$message({type:"success",message:e.msg}),t.saveBtnLoading=!1,t.dialogNewOrEditVisible=!1,t.query()})}})},deleteData:function(t){var e=this;this.$confirm("此操作将删除该图片，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){e.modifyAction(o()({},t,{isDel:1}))})},disabledAction:function(t){var e=this;0===t.enabled?this.$confirm("此操作将禁用该图片，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){e.modifyAction(t)}).catch(function(){t.enabled=1}):this.modifyAction(t)},modifyAction:function(t){var e=this;this.$store.dispatch("UpdateShareImage",t).then(function(t){e.$message({type:"success",message:t.msg}),e.query()})},uploadImage:function(t){var e=new FormData;e.append(t.filename,t.file,t.file.name),this.$store.dispatch("UploadImage",e).then(function(e){t.onSuccess(e)})},beforeUpload:function(t){var e="image/jpeg"===t.type||"image/png"===t.type,a=t.size/1024/1024<2;return e||this.$message.error("只能上传图片!"),a||this.$message.error("上传图片大小不能超过 2MB!"),e&&a},handleUploadSuccess:function(t){var e=t.data,a=e.downloadUrl;this.data=l()({},this.data,{thumbUrl:e.thumbUrl,downloadUrl:e.downloadUrl,showUrl:e.showUrl});var i={name:a.substr(a.lastIndexOf("/")+1),url:a};this.fileList=this.fileList.concat(i)},handleRemove:function(t){this.fileList=this.fileList.filter(function(e){return e.name!==t.name}),this.data=l()({},this.data,{thumbUrl:null,downloadUrl:null,showUrl:null})},handleSizeChange:function(t){this.filterForm.pageSize=t,this.query()},handleCurrentChange:function(t){this.filterForm.pageNo=t,this.query()}}},c=(a("dw2A"),a("ZrdR")),d=Object(c.a)(r,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-form",{ref:"filterForm",attrs:{inline:!0,model:t.filterForm,size:"mini"}},[a("el-form-item",{attrs:{label:"状态"}},[a("el-select",{model:{value:t.filterForm.state,callback:function(e){t.$set(t.filterForm,"state",e)},expression:"filterForm.state"}},t._l(t.states,function(e){return a("el-option",{key:"state_"+e.state,attrs:{value:e.state,label:e.title}},[t._v(t._s(e.title))])}))],1),t._v(" "),a("el-form-item",[a("el-button",{staticClass:"btn-form",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.query}},[t._v("查询")]),t._v(" "),a("el-button",{staticClass:"btn-form",attrs:{type:"primary",icon:"el-icon-plus"},on:{click:t.addData}},[t._v("新增")])],1)],1)],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list,size:"mini",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"图片ID"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.id)+"\n      ")]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"缩略图"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticStyle:{width:"100%"},attrs:{src:t.row.thumbUrl,large:t.row.showUrl,preview:t.row.id}})]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"发布时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.createdTime)+"\n      ")]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"备注"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.note)+"\n      ")]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"排序"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.sort)+"\n      ")]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"禁用|启用"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-switch",{attrs:{"active-value":1,"inactive-value":0},on:{change:function(a){t.disabledAction(e.row)}},model:{value:e.row.enabled,callback:function(a){t.$set(e.row,"enabled",a)},expression:"scope.row.enabled"}})]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{icon:"el-icon-edit",type:"text",size:"mini"},on:{click:function(a){t.showEditPage(e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{staticStyle:{color:"red"},attrs:{icon:"el-icon-delete",type:"text",size:"mini"},on:{click:function(a){t.deleteData(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("div",{staticClass:"pagination-container"},[a("el-pagination",{attrs:{"current-page":t.filterForm.pageNo,"page-sizes":[10,20,30,50],"page-size":t.filterForm.pageSize,total:t.listTotal,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"update:currentPage":function(e){t.$set(t.filterForm,"pageNo",e)},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("el-dialog",{attrs:{visible:t.dialogNewOrEditVisible,title:t.newFlag?"新增图片":"修改图片",width:"450px"},on:{"update:visible":function(e){t.dialogNewOrEditVisible=e}}},[a("el-form",{ref:"dataForm",staticStyle:{"margin-left":"10px","margin-right":"10px"},attrs:{model:t.data,rules:t.dataRules,"label-position":"left","label-width":"130px"}},[a("el-form-item",{attrs:{label:"排序",prop:"sort"}},[a("el-input-number",{attrs:{size:"small"},model:{value:t.data.sort,callback:function(e){t.$set(t.data,"sort",e)},expression:"data.sort"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"备注",prop:"note"}},[a("el-input",{attrs:{type:"textarea"},model:{value:t.data.note,callback:function(e){t.$set(t.data,"note",e)},expression:"data.note"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"启用"}},[a("el-switch",{attrs:{"active-value":1,"inactive-value":0},model:{value:t.data.enabled,callback:function(e){t.$set(t.data,"enabled",e)},expression:"data.enabled"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"上传图片"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{"on-success":t.handleUploadSuccess,"before-upload":t.beforeUpload,"on-remove":t.handleRemove,limit:1,multiple:!1,"file-list":t.fileList,"http-request":t.uploadImage,action:"",name:"image"}},[a("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-upload"}},[t._v("点击上传")]),t._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传jpg/png文件，且不超过2MB")])],1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{icon:"el-icon-close"},on:{click:function(e){t.dialogNewOrEditVisible=!1}}},[t._v("取消")]),t._v(" "),a("el-button",{attrs:{loading:t.saveBtnLoading,type:"primary"},on:{click:t.saveData}},[a("svg-icon",{staticStyle:{"margin-right":"5px"},attrs:{"icon-class":"save"}}),t._v("保存")],1)],1)],1)],1)},[],!1,null,"976e7b62",null);d.options.__file="index.vue";e.default=d.exports}}]);