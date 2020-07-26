(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-6a93"],{J0nX:function(e,t,i){},Qvtz:function(e,t,i){"use strict";var o=i("J0nX");i.n(o).a},rBxw:function(e,t,i){"use strict";i.r(t);var o={name:"RoleListPage",filters:{dialogTitle:function(e){return e?"创建角色":"编辑角色"}},data:function(){return{list:null,listLoading:!1,listTotal:0,role:{roleid:null,roleName:null},roleRules:{roleName:[{required:!0,trigger:"blur",message:"必填项"}]},dialogNewOrEditRoleVisible:!1,newFlag:!1,createBtnLoading:!1,updateBtnLoading:!1}},created:function(){this.query()},methods:{query:function(){var e=this;this.listLoading=!0,this.$store.dispatch("ListRole").then(function(t){e.list=t.data,e.listLoading=!1}).catch(function(){e.listLoading=!1})},showRoleEditPage:function(){this.newFlag=!0,this.resetForm(),this.dialogNewOrEditRoleVisible=!0},createRole:function(){var e=this;this.$refs.roleForm.validate(function(t){t&&e.$confirm("是否确定创建角色?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){e.createBtnLoading=!0,e.$store.dispatch("AddRole",e.role).then(function(t){e.createBtnLoading=!1,e.dialogNewOrEditRoleVisible=!1,e.$message({message:t.msg,type:"success"}),e.query()}).catch(function(){e.createBtnLoading=!1})})})},updateRole:function(){var e=this;this.$refs.roleForm.validate(function(t){t&&e.$confirm("是否确定修改管理账户?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){e.updateBtnLoading=!0;var t={roleid:e.role.roleid,roleName:e.role.roleName};e.$store.dispatch("UpdateRole",t).then(function(t){e.updateBtnLoading=!1,e.dialogNewOrEditRoleVisible=!1,e.$message({message:t.msg,type:"success"}),e.query()}).catch(function(){e.updateBtnLoading=!1})})})},enableRole:function(e){var t=this;this.$confirm("是否确定启用该管理账号?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){t.$store.dispatch("TransformRoleByQry",{roleid:e}).then(function(e){t.$message({message:e.msg,type:"success"}),t.query()})})},disableRole:function(e){var t=this;this.$confirm("是否确定禁用该管理角色?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){t.$store.dispatch("TransformRoleByQry",{roleid:e}).then(function(e){t.$message({message:e.msg,type:"success"}),t.query()})})},editRole:function(e){this.newFlag=!1,this.role={roleid:e.roleid,roleName:e.roleName},this.dialogNewOrEditRoleVisible=!0},resetForm:function(){this.$refs.roleForm.resetFields(),this.role={roleid:null,roleName:null}}}},n=(i("Qvtz"),i("ZrdR")),l=Object(n.a)(o,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container"},[i("div",{staticClass:"filter-container"},[i("el-form",{ref:"filterForm",attrs:{inline:!0,size:"mini"}},[i("el-form-item",[i("el-button",{staticClass:"btn-form",attrs:{type:"primary"},on:{click:e.showRoleEditPage}},[e._v("创建角色")])],1)],1)],1),e._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.list,size:"mini",border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{align:"center",label:"角色名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.roleName)+"\n      ")]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"角色状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-tag",{attrs:{type:t.row.isdel?"danger":"success"}},[e._v(e._s(t.row.isdel?"禁用":"启用"))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"管理操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.isdel||1===t.row.roleid?e._e():i("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(i){e.disableRole(t.row.roleid)}}},[e._v("禁用角色")]),e._v(" "),t.row.isdel&&1!==t.row.roleid?i("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(i){e.enableRole(t.row.roleid)}}},[e._v("启用角色")]):e._e(),e._v(" "),1!==t.row.roleid?i("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(i){e.editRole(t.row)}}},[e._v("编辑角色")]):e._e()]}}])})],1),e._v(" "),i("el-dialog",{attrs:{visible:e.dialogNewOrEditRoleVisible,title:e._f("dialogTitle")(e.newFlag),width:"600px"},on:{"update:visible":function(t){e.dialogNewOrEditRoleVisible=t}}},[i("el-form",{ref:"roleForm",attrs:{model:e.role,rules:e.roleRules}},[i("el-form-item",{attrs:{label:"角色名称",prop:"roleName"}},[i("el-input",{attrs:{type:"text"},model:{value:e.role.roleName,callback:function(t){e.$set(e.role,"roleName",t)},expression:"role.roleName"}})],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.dialogNewOrEditRoleVisible=!1}}},[e._v("取消")]),e._v(" "),e.newFlag?i("el-button",{attrs:{loading:e.createBtnLoading,type:"primary"},on:{click:e.createRole}},[e._v("创建")]):e._e(),e._v(" "),e.newFlag?e._e():i("el-button",{attrs:{loading:e.updateBtnLoading,type:"primary"},on:{click:e.updateRole}},[e._v("修改")])],1)],1)],1)},[],!1,null,"2899473e",null);l.options.__file="index.vue";t.default=l.exports}}]);