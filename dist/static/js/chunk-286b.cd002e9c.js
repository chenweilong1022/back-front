(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-286b"],{hLQu:function(e,t,n){"use strict";var i=n("mPqG");n.n(i).a},iHHc:function(e,t,n){"use strict";n.r(t);var i={name:"NoticeListPage",filters:{noteTypeFilter:function(e){return 0===e?"全部公告":1===e?"滚屏公告":2===e?"固定公告":void 0},noticeState:function(e){return 0===e?"info":1===e?"success":2===e?"danger":void 0},noticeStateTitle:function(e){return 0===e?"新创建":1===e?"已发布":2===e?"已下架":void 0}},data:function(){return{filterForm:{channel:null,noticeState:null,noticeType:null,pageNo:1,pageSize:10},channels:[{channelId:"0",channelName:"全平台",isdel:!1}],noticeStates:[{key:-1,title:"全部"},{key:0,title:"新创建"},{key:1,title:"已发布"},{key:2,title:"已下架"}],noticeTypes:[{key:0,title:"全部公告"},{key:1,title:"滚屏公告"},{key:2,title:"固定公告"}],list:null,listLoading:!1,listTotal:0,notice:{channel:null,noticeType:null,content:null},noticeRules:{channel:[{required:!0,trigger:"blur",message:"必填项"}],noticeType:[{required:!0,trigger:"blur",message:"必填项"}],content:[{required:!0,trigger:"blur",message:"必填项"}]},dialogNewNoticeVisible:!1,createBtnLoading:!1,managerPermission:!0}},created:function(){this.query()},mounted:function(){this.queryChannelType(),this.validateRole()},methods:{queryChannelType:function(){var e=this;this.$store.dispatch("ListAppChannelType").then(function(t){e.channels=e.channels.concat(t.data)})},query:function(){var e=this;this.listLoading=!0,this.$store.dispatch("ListNoticeByQry",this.filterForm).then(function(t){e.list=t.data,e.listTotal=t.totalCount,e.listLoading=!1}).catch(function(){e.listLoading=!1})},showCreateNoticePage:function(){this.dialogNewNoticeVisible=!0},createNotice:function(){var e=this;this.$refs.noticeForm.validate(function(t){t&&e.$confirm("是否确定创建公告?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){e.createBtnLoading=!0,e.$store.dispatch("CreateNotice",e.notice).then(function(t){e.createBtnLoading=!1,e.dialogNewNoticeVisible=!1,e.$message({message:t.msg,type:"success"}),e.query()}).catch(function(){e.createBtnLoading=!1})})})},publishNotice:function(e){var t=this;this.$confirm("是否确定发布公告?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){t.$store.dispatch("PublishNotice",e).then(function(e){t.$message({message:e.msg,type:"success"}),t.query()})})},obtainedNotice:function(e){var t=this;this.$confirm("是否确定下架公告?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){t.$store.dispatch("UnpublishNotice",e).then(function(e){t.$message({message:e.msg,type:"success"}),t.query()})})},deleteNotice:function(e){var t=this;this.$confirm("是否确定删除公告?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){t.$store.dispatch("DeleteNotice",e).then(function(e){t.$message({message:e.msg,type:"success"}),t.query()})})},handleSizeChange:function(e){this.filterForm.pageSize=e,this.query()},handleCurrentChange:function(e){this.filterForm.pageNo=e,this.query()},validateRole:function(){var e=this.$store.state.user.roleId,t=this.$store.state.user.menus;1!==e&&(this.hasPermission(t,30201)||(this.managerPermission=!1))},hasPermission:function(e,t){return!!e&&e.some(function(e){return e.menuId===t})}}},o=(n("hLQu"),n("ZrdR")),l=Object(o.a)(i,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-form",{ref:"filterForm",attrs:{inline:!0,model:e.filterForm,size:"mini"}},[n("el-form-item",{attrs:{label:"选择公告渠道"}},[n("el-select",{staticClass:"filter-item",attrs:{placeholder:"请选择",value:""},model:{value:e.filterForm.channel,callback:function(t){e.$set(e.filterForm,"channel",t)},expression:"filterForm.channel"}},e._l(e.channels,function(e){return n("el-option",{key:e.channelId,attrs:{label:e.channelName,value:e.channelId}})}))],1),e._v(" "),n("el-form-item",{attrs:{label:"公告状态"}},[n("el-select",{staticClass:"filter-item",attrs:{placeholder:"请选择",value:""},model:{value:e.filterForm.noticeState,callback:function(t){e.$set(e.filterForm,"noticeState",t)},expression:"filterForm.noticeState"}},e._l(e.noticeStates,function(e){return n("el-option",{key:e.key,attrs:{label:e.title,value:e.key}})}))],1),e._v(" "),n("el-form-item",{attrs:{label:"公告类别"}},[n("el-select",{staticClass:"filter-item",attrs:{placeholder:"请选择",value:""},model:{value:e.filterForm.noticeType,callback:function(t){e.$set(e.filterForm,"noticeType",t)},expression:"filterForm.noticeType"}},e._l(e.noticeTypes,function(e){return n("el-option",{key:e.key,attrs:{label:e.title,value:e.key}})}))],1),e._v(" "),n("el-form-item",[n("el-button",{staticClass:"btn-form",attrs:{type:"primary"},on:{click:e.query}},[e._v("查询")]),e._v(" "),e.managerPermission?n("el-button",{staticClass:"btn-form",attrs:{type:"primary"},on:{click:e.showCreateNoticePage}},[e._v("创建公告")]):e._e()],1)],1)],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.list,size:"mini",border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{align:"center",label:"创建时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.createTime)+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"公告渠道"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.channelName)+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"公告类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(e._f("noteTypeFilter")(t.row.noteType))+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"公告状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-tag",{attrs:{type:e._f("noticeState")(t.row.state)}},[e._v(e._s(e._f("noticeStateTitle")(t.row.state)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"公告内容"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.content)+"\n      ")]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[0===t.row.state&&e.managerPermission?n("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(n){e.publishNotice(t.row.id)}}},[e._v("发布")]):e._e(),e._v(" "),1===t.row.state&&e.managerPermission?n("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(n){e.obtainedNotice(t.row.id)}}},[e._v("下架")]):e._e(),e._v(" "),e.managerPermission?n("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(n){e.deleteNotice(t.row.id)}}},[e._v("物理删除")]):e._e()]}}])})],1),e._v(" "),n("div",{staticClass:"pagination-container"},[n("el-pagination",{attrs:{"current-page":e.filterForm.pageNo,"page-sizes":[10,20,30,50],"page-size":e.filterForm.pageSize,total:e.listTotal,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),n("el-dialog",{attrs:{visible:e.dialogNewNoticeVisible,title:"创建公告",width:"600px"},on:{"update:visible":function(t){e.dialogNewNoticeVisible=t}}},[n("el-form",{ref:"noticeForm",staticStyle:{"margin-left":"30px"},attrs:{model:e.notice,rules:e.noticeRules,"label-position":"left"}},[n("el-form-item",{attrs:{label:"公告渠道",prop:"channel"}},[n("el-select",{staticClass:"filter-item",attrs:{placeholder:"请选择",value:""},model:{value:e.notice.channel,callback:function(t){e.$set(e.notice,"channel",t)},expression:"notice.channel"}},e._l(e.channels,function(e){return n("el-option",{key:e.channelId,attrs:{label:e.channelName,value:e.channelId}})}))],1),e._v(" "),n("el-form-item",{attrs:{label:"公告类型",prop:"noticeType"}},[n("el-select",{staticClass:"filter-item",attrs:{placeholder:"请选择",value:""},model:{value:e.notice.noticeType,callback:function(t){e.$set(e.notice,"noticeType",t)},expression:"notice.noticeType"}},e._l(e.noticeTypes,function(e){return n("el-option",{key:e.key,attrs:{label:e.title,value:e.key}})}))],1),e._v(" "),n("el-form-item",{attrs:{label:"公告内容",prop:"content"}},[n("el-input",{attrs:{rows:5,type:"textarea"},model:{value:e.notice.content,callback:function(t){e.$set(e.notice,"content",t)},expression:"notice.content"}})],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.dialogNewNoticeVisible=!1}}},[e._v("取消")]),e._v(" "),n("el-button",{attrs:{loading:e.createBtnLoading,type:"primary"},on:{click:e.createNotice}},[e._v("创建")])],1)],1)],1)},[],!1,null,"a6b02c68",null);l.options.__file="index.vue";t.default=l.exports},mPqG:function(e,t,n){}}]);