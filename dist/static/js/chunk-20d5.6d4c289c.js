(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-20d5"],{"6obq":function(e,n,t){"use strict";var r=t("I53A");t.n(r).a},I53A:function(e,n,t){},LDoE:function(e,n,t){},YcyA:function(e,n,t){"use strict";t.r(n);var r={name:"TabPane",props:{menus:{type:Array,default:function(){return[]},required:!0},roleId:{type:Number,default:0,required:!0}},data:function(){return{roleMenus:null,defaultProps:{children:"children",label:"label"},saveBtnLoading:!1,isShow:!1,menuForm:{menuid:null,menuName:null,parentid:null,menuUrl:null,sortNum:0},menuFormLoading:!1,menuRules:{menuName:[{required:!0,trigger:"blur",message:"必填项"}]},checkedMenus:[]}},created:function(){this.queryMenusByRoleId()},methods:{queryMenusByRoleId:function(){var e=this;this.$store.dispatch("ListMenuByRoleId",this.roleId).then(function(n){var t=[];n.data.forEach(function(e){t=t.concat(e.menuid)}),e.roleMenus=t,e.checkedMenus=t})},nodeCheck:function(e,n){this.checkedMenus=n.halfCheckedKeys.concat(n.checkedKeys)},saveRoleMenuChange:function(){var e=this;this.$confirm("此操作将保存角色菜单，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){e.saveBtnLoading=!0;var n={roleId:e.roleId,menuIds:e.checkedMenus.toString()};e.$store.dispatch("SaveRoleMenu",n).then(function(n){e.$message({message:n.msg,type:"success"}),e.saveBtnLoading=!1}).catch(function(){e.saveBtnLoading=!1})})},showEditMenu:function(e){this.isShow=!0,this.menuForm={menuid:e.id,menuName:e.label,menuUrl:e.menuUrl,parentid:e.parentId,sortNum:0}},saveMenu:function(){var e=this;this.$refs.menuForm.validate(function(n){n&&e.$confirm("此操作将保存菜单，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){e.menuFormLoading=!0,e.$store.dispatch("SaveMenu",e.menuForm).then(function(n){e.$message({message:n.msg,type:"success"}),e.queryMenusByRoleId(),e.menuFormLoading=!1}).catch(function(){e.menuFormLoading=!1})})})}}},a=(t("6obq"),t("ZrdR")),i=Object(a.a)(r,function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("div",{staticClass:"filter-container"},[t("el-form",{ref:"filterForm",attrs:{inline:!0,size:"mini"}},[t("el-form-item",[t("el-button",{staticClass:"btn-form",attrs:{loading:e.saveBtnLoading,type:"primary"},on:{click:e.saveRoleMenuChange}},[e._v("保存更改")])],1)],1)],1),e._v(" "),t("div",{staticClass:"pane-container"},[t("el-tree",{staticClass:"roleForm",attrs:{data:e.menus,"default-checked-keys":e.roleMenus,props:e.defaultProps,"default-expand-all":"","highlight-current":"","check-strictly":"","show-checkbox":"","node-key":"id"},on:{"node-click":e.showEditMenu,check:e.nodeCheck}}),e._v(" "),e.isShow?t("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.menuFormLoading,expression:"menuFormLoading"}],ref:"menuForm",staticClass:"menuForm",attrs:{model:e.menuForm,rules:e.menuRules,"label-width":"140px",size:"mini"}},[t("el-form-item",{staticStyle:{"margin-top":"50px"},attrs:{label:"菜单名称",prop:"menuName"}},[t("el-col",{attrs:{span:16}},[t("el-input",{model:{value:e.menuForm.menuName,callback:function(n){e.$set(e.menuForm,"menuName",n)},expression:"menuForm.menuName"}})],1)],1),e._v(" "),t("el-form-item",{attrs:{label:"菜单URL",prop:"menuUrl"}},[t("el-col",{attrs:{span:16}},[t("el-input",{model:{value:e.menuForm.menuUrl,callback:function(n){e.$set(e.menuForm,"menuUrl",n)},expression:"menuForm.menuUrl"}})],1)],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:e.saveMenu}},[e._v("保存")])],1)],1):e._e()],1)])},[],!1,null,"ea882666",null);i.options.__file="tabPane.vue";var u={name:"MenuListPage",components:{tabPane:i.exports},data:function(){return{defaultPane:"1",roles:null,menus:[]}},created:function(){this.queryRoles(),this.queryAllMenus()},methods:{queryRoles:function(){var e=this;this.$store.dispatch("ListRole").then(function(n){e.roles=n.data})},queryAllMenus:function(){var e=this;this.$store.dispatch("ListAllMenus").then(function(n){var t=n.data,r=[];(r=e.filterMenus(t,r)).length>0&&(e.menus=r)})},tabClick:function(e){e.$children[0].queryMenusByRoleId()},filterMenus:function(e,n){var t=this;return e&&e.length>0&&(e=e.filter(function(e){if(0===e.parentid)return n=n.concat({id:e.menuid,label:e.menuName,menuUrl:e.menuUrl,parentId:e.parentid,children:[]}),!1;if(n&&n.length>0){var t=[];if(n.forEach(function(n){if(n.id===e.parentid){var r={id:e.menuid,label:e.menuName,parentId:e.parentid,menuUrl:e.menuUrl};t=t.concat(r),n.children=n.children?n.children.concat(r):[].concat(r)}}),t&&t.length>0)return!1}return!0}))&&e.length>0&&n.forEach(function(n){n.children&&n.children.length>0&&(e=t.filterChildren(e,n.children))}),n},filterChildren:function(e,n){return e.filter(function(e){var t=[];return n.forEach(function(n){if(e.parentid===n.id){var r={id:e.menuid,label:e.menuName,parentId:e.parentid,menuUrl:e.menuUrl};n.children=n.children?n.children.concat(r):[].concat(r),t=t.concat(n)}}),0===t.length}),e}}},l=(t("iMBK"),Object(a.a)(u,function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"app-main"},[t("el-tabs",{staticClass:"tab",attrs:{type:"border-card"},on:{"tab-click":e.tabClick},model:{value:e.defaultPane,callback:function(n){e.defaultPane=n},expression:"defaultPane"}},e._l(e.roles,function(n){return t("el-tab-pane",{key:n.roleid,attrs:{label:n.roleName,name:n.roleid+""}},[t("tab-pane",{attrs:{menus:e.menus,"role-id":n.roleid}})],1)}))],1)},[],!1,null,"22a33dd0",null));l.options.__file="index.vue";n.default=l.exports},iMBK:function(e,n,t){"use strict";var r=t("LDoE");t.n(r).a}}]);