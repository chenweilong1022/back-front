(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-638a"],{PcVY:function(e,a,t){"use strict";t.r(a);var r=t("6ZY3"),l=t.n(r),o={name:"tblrecorddailyrechargereport",filters:{dialogTitle:function(e){return e?"添加":"编辑"}},data:function(){return{filterForm:{enabled:1,pageNo:1,pageSize:10,searchKey:""},list:null,listLoading:!1,listTotal:0,data:{id:0,currentDate:"",newUser:"",newMachine:"",newBinding:"",totalRegistered:"",totalMachine:"",loginUser:"",oldUser:"",loginMachine:"",oldLoginMachine:"",totalOrder:"",effectiveOrder:"",proportion:"",newUserRecharge:"",newUsersRechargeNumber:"",oldUsersRecharge:"",oldUsersRechargeNumber:"",totalRecharge:"",totalRechargeNumber:"",totalBack:"",totalBackNumber:"",morrowRetained:"",rechargeRetained:"",weeksRetained:"",arpo:"",arpu:"",arppu:"",createTime:"",isDel:"",newUserYesterday:"",todayUserRetained:"",newUserYesterdayRecharge:"",todayUserRechargeRetained:""},dataRule:{currentDate:[{required:!0,message:"日期不能为空",trigger:"blur"}],newUser:[{required:!0,message:"新用户不能为空",trigger:"blur"}],newMachine:[{required:!0,message:"新机器不能为空",trigger:"blur"}],newBinding:[{required:!0,message:"新绑定不能为空",trigger:"blur"}],totalRegistered:[{required:!0,message:"总注册不能为空",trigger:"blur"}],totalMachine:[{required:!0,message:"总机器不能为空",trigger:"blur"}],loginUser:[{required:!0,message:"登录用户不能为空",trigger:"blur"}],oldUser:[{required:!0,message:"老用户不能为空",trigger:"blur"}],loginMachine:[{required:!0,message:"登录机器不能为空",trigger:"blur"}],oldLoginMachine:[{required:!0,message:"老登录机器不能为空",trigger:"blur"}],totalOrder:[{required:!0,message:"总订单不能为空",trigger:"blur"}],effectiveOrder:[{required:!0,message:"有效订单不能为空",trigger:"blur"}],proportion:[{required:!0,message:"比例不能为空",trigger:"blur"}],newUserRecharge:[{required:!0,message:"新用户充值不能为空",trigger:"blur"}],newUsersRechargeNumber:[{required:!0,message:"新用户充值人数不能为空",trigger:"blur"}],oldUsersRecharge:[{required:!0,message:"老用户充值不能为空",trigger:"blur"}],oldUsersRechargeNumber:[{required:!0,message:"老用户充值人数不能为空",trigger:"blur"}],totalRecharge:[{required:!0,message:"总充值不能为空",trigger:"blur"}],totalRechargeNumber:[{required:!0,message:"总充值人数不能为空",trigger:"blur"}],totalBack:[{required:!0,message:"总返现不能为空",trigger:"blur"}],totalBackNumber:[{required:!0,message:"总返现人数不能为空",trigger:"blur"}],morrowRetained:[{required:!0,message:"次留不能为空",trigger:"blur"}],rechargeRetained:[{required:!0,message:"充值留存不能为空",trigger:"blur"}],weeksRetained:[{required:!0,message:"周留存不能为空",trigger:"blur"}],arpo:[{required:!0,message:"arpo不能为空",trigger:"blur"}],arpu:[{required:!0,message:"arpu不能为空",trigger:"blur"}],arppu:[{required:!0,message:"arppu不能为空",trigger:"blur"}],createTime:[{required:!0,message:"创建时间不能为空",trigger:"blur"}],isDel:[{required:!0,message:"删除标志不能为空",trigger:"blur"}],newUserYesterday:[{required:!0,message:"昨日新用户不能为空",trigger:"blur"}],todayUserRetained:[{required:!0,message:"今日留存用户不能为空",trigger:"blur"}],newUserYesterdayRecharge:[{required:!0,message:"昨日充值用户不能为空",trigger:"blur"}],todayUserRechargeRetained:[{required:!0,message:"今日充值留存用户不能为空",trigger:"blur"}]},dialogNewOrEditVisible:!1,newFlag:!0,saveBtnLoading:!1}},mounted:function(){this.query()},methods:{query:function(){var e=this;this.listLoading=!0,this.$store.dispatch("Listtblrecorddailyrechargereport",this.filterForm).then(function(a){e.list=a.data,e.listTotal=a.totalCount,e.listLoading=!1}).catch(function(){e.listLoading=!1})},showNewPage:function(){this.newFlag=!0,this.resetForm(),this.data={},this.dialogNewOrEditVisible=!0},showEditPage:function(e){this.newFlag=!1,this.data=l()({},e),this.dialogNewOrEditVisible=!0},savetblrecorddailyrechargereport:function(){var e=this;this.$refs.dataForm.validate(function(a){a&&e.$confirm("是否确定保存?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){e.saveBtnLoading=!0,e.$store.dispatch(e.newFlag?"Savetblrecorddailyrechargereport":"Updatetblrecorddailyrechargereport",e.data).then(function(a){e.saveBtnLoading=!1,e.dialogNewOrEditVisible=!1,e.$message({message:a.msg,type:"success"}),e.query()}).catch(function(){e.saveBtnLoading=!1})})})},removeData:function(e){var a=this;this.$confirm("是否确定删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){a.$store.dispatch("Deletetblrecorddailyrechargereport",e.id).then(function(e){a.$message({message:e.msg,type:"success"}),a.listLoading=!1,a.query()}).catch(function(){a.listLoading=!1})})},resetForm:function(){this.$refs.dataForm&&this.$refs.dataForm.clearValidate()},handleSizeChange:function(e){this.filterForm.pageSize=e,this.query()},handleCurrentChange:function(e){this.filterForm.pageNo=e,this.query()}}},n=(t("uiQI"),t("ZrdR")),s=Object(n.a)(o,function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"app-container"},[t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list,size:"mini",border:"",fit:"true","highlight-current-row":""}},[t("el-table-column",{attrs:{align:"center",label:"id"},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v("\n        "+e._s(a.row.id)+"\n      ")]}}])}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"日期"},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v("\n        "+e._s(a.row.currentDate)+"\n      ")]}}])}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"新用户"},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v("\n        "+e._s(a.row.newUser)+"\n      ")]}}])}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"总注册"},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v("\n        "+e._s(a.row.totalRegistered)+"\n      ")]}}])}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"登录用户"}},[t("el-table-column",{attrs:{align:"center",label:"老用户"},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v("\n          "+e._s(a.row.loginUser)),t("br"),e._v(" "),[e._v("\n            "+e._s(a.row.oldUser)+"\n          ")]]}}])})],1),e._v(" "),t("el-table-column",{attrs:{width:"180",align:"center",label:"总订单(有效订单--比例)"},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v("\n        "+e._s(a.row.totalOrder)+"("+e._s(a.row.effectiveOrder)+"--"+e._s(a.row.proportion)+")\n      ")]}}])}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"新用户充值(人)"},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v("\n        "+e._s(a.row.newUserRecharge)+"("+e._s(a.row.newUsersRechargeNumber)+")\n      ")]}}])}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"老用户充值(人)"},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v("\n        "+e._s(a.row.oldUsersRecharge)+"("+e._s(a.row.oldUsersRechargeNumber)+")\n      ")]}}])}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"总充值(人)"},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v("\n        "+e._s(a.row.totalRecharge)+"("+e._s(a.row.totalRechargeNumber)+")\n      ")]}}])}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"总返现(人)"},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v("\n        "+e._s(a.row.totalBack)+"("+e._s(a.row.totalBackNumber)+")\n      ")]}}])}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"次留"},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v("\n        "+e._s(a.row.morrowRetained)+"\n      ")]}}])}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"充值留存"},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v("\n        "+e._s(a.row.rechargeRetained)+"\n      ")]}}])}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"周留存"},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v("\n        "+e._s(a.row.weeksRetained)+"\n      ")]}}])})],1),e._v(" "),t("div",{staticClass:"pagination-container"},[t("el-pagination",{attrs:{"current-page":e.filterForm.pageNo,"page-sizes":[10,20,30,50],"page-size":e.filterForm.pageSize,total:e.listTotal,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"update:currentPage":function(a){e.$set(e.filterForm,"pageNo",a)},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),t("el-dialog",{attrs:{visible:e.dialogNewOrEditVisible,title:e._f("dialogTitle")(e.newFlag),width:"600px"},on:{"update:visible":function(a){e.dialogNewOrEditVisible=a}}},[t("el-form",{ref:"dataForm",attrs:{model:e.data,rules:e.dataRule,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"日期",prop:"currentDate"}},[t("el-input",{attrs:{placeholder:"日期"},model:{value:e.data.currentDate,callback:function(a){e.$set(e.data,"currentDate",a)},expression:"data.currentDate"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"新用户",prop:"newUser"}},[t("el-input",{attrs:{placeholder:"新用户"},model:{value:e.data.newUser,callback:function(a){e.$set(e.data,"newUser",a)},expression:"data.newUser"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"新机器",prop:"newMachine"}},[t("el-input",{attrs:{placeholder:"新机器"},model:{value:e.data.newMachine,callback:function(a){e.$set(e.data,"newMachine",a)},expression:"data.newMachine"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"新绑定",prop:"newBinding"}},[t("el-input",{attrs:{placeholder:"新绑定"},model:{value:e.data.newBinding,callback:function(a){e.$set(e.data,"newBinding",a)},expression:"data.newBinding"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"总注册",prop:"totalRegistered"}},[t("el-input",{attrs:{placeholder:"总注册"},model:{value:e.data.totalRegistered,callback:function(a){e.$set(e.data,"totalRegistered",a)},expression:"data.totalRegistered"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"总机器",prop:"totalMachine"}},[t("el-input",{attrs:{placeholder:"总机器"},model:{value:e.data.totalMachine,callback:function(a){e.$set(e.data,"totalMachine",a)},expression:"data.totalMachine"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"登录用户",prop:"loginUser"}},[t("el-input",{attrs:{placeholder:"登录用户"},model:{value:e.data.loginUser,callback:function(a){e.$set(e.data,"loginUser",a)},expression:"data.loginUser"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"老用户",prop:"oldUser"}},[t("el-input",{attrs:{placeholder:"老用户"},model:{value:e.data.oldUser,callback:function(a){e.$set(e.data,"oldUser",a)},expression:"data.oldUser"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"登录机器",prop:"loginMachine"}},[t("el-input",{attrs:{placeholder:"登录机器"},model:{value:e.data.loginMachine,callback:function(a){e.$set(e.data,"loginMachine",a)},expression:"data.loginMachine"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"老登录机器",prop:"oldLoginMachine"}},[t("el-input",{attrs:{placeholder:"老登录机器"},model:{value:e.data.oldLoginMachine,callback:function(a){e.$set(e.data,"oldLoginMachine",a)},expression:"data.oldLoginMachine"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"总订单",prop:"totalOrder"}},[t("el-input",{attrs:{placeholder:"总订单"},model:{value:e.data.totalOrder,callback:function(a){e.$set(e.data,"totalOrder",a)},expression:"data.totalOrder"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"有效订单",prop:"effectiveOrder"}},[t("el-input",{attrs:{placeholder:"有效订单"},model:{value:e.data.effectiveOrder,callback:function(a){e.$set(e.data,"effectiveOrder",a)},expression:"data.effectiveOrder"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"比例",prop:"proportion"}},[t("el-input",{attrs:{placeholder:"比例"},model:{value:e.data.proportion,callback:function(a){e.$set(e.data,"proportion",a)},expression:"data.proportion"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"新用户充值",prop:"newUserRecharge"}},[t("el-input",{attrs:{placeholder:"新用户充值"},model:{value:e.data.newUserRecharge,callback:function(a){e.$set(e.data,"newUserRecharge",a)},expression:"data.newUserRecharge"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"新用户充值人数",prop:"newUsersRechargeNumber"}},[t("el-input",{attrs:{placeholder:"新用户充值人数"},model:{value:e.data.newUsersRechargeNumber,callback:function(a){e.$set(e.data,"newUsersRechargeNumber",a)},expression:"data.newUsersRechargeNumber"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"老用户充值",prop:"oldUsersRecharge"}},[t("el-input",{attrs:{placeholder:"老用户充值"},model:{value:e.data.oldUsersRecharge,callback:function(a){e.$set(e.data,"oldUsersRecharge",a)},expression:"data.oldUsersRecharge"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"老用户充值人数",prop:"oldUsersRechargeNumber"}},[t("el-input",{attrs:{placeholder:"老用户充值人数"},model:{value:e.data.oldUsersRechargeNumber,callback:function(a){e.$set(e.data,"oldUsersRechargeNumber",a)},expression:"data.oldUsersRechargeNumber"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"总充值",prop:"totalRecharge"}},[t("el-input",{attrs:{placeholder:"总充值"},model:{value:e.data.totalRecharge,callback:function(a){e.$set(e.data,"totalRecharge",a)},expression:"data.totalRecharge"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"总充值人数",prop:"totalRechargeNumber"}},[t("el-input",{attrs:{placeholder:"总充值人数"},model:{value:e.data.totalRechargeNumber,callback:function(a){e.$set(e.data,"totalRechargeNumber",a)},expression:"data.totalRechargeNumber"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"总返现",prop:"totalBack"}},[t("el-input",{attrs:{placeholder:"总返现"},model:{value:e.data.totalBack,callback:function(a){e.$set(e.data,"totalBack",a)},expression:"data.totalBack"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"总返现人数",prop:"totalBackNumber"}},[t("el-input",{attrs:{placeholder:"总返现人数"},model:{value:e.data.totalBackNumber,callback:function(a){e.$set(e.data,"totalBackNumber",a)},expression:"data.totalBackNumber"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"次留",prop:"morrowRetained"}},[t("el-input",{attrs:{placeholder:"次留"},model:{value:e.data.morrowRetained,callback:function(a){e.$set(e.data,"morrowRetained",a)},expression:"data.morrowRetained"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"充值留存",prop:"rechargeRetained"}},[t("el-input",{attrs:{placeholder:"充值留存"},model:{value:e.data.rechargeRetained,callback:function(a){e.$set(e.data,"rechargeRetained",a)},expression:"data.rechargeRetained"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"周留存",prop:"weeksRetained"}},[t("el-input",{attrs:{placeholder:"周留存"},model:{value:e.data.weeksRetained,callback:function(a){e.$set(e.data,"weeksRetained",a)},expression:"data.weeksRetained"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"arpo",prop:"arpo"}},[t("el-input",{attrs:{placeholder:"arpo"},model:{value:e.data.arpo,callback:function(a){e.$set(e.data,"arpo",a)},expression:"data.arpo"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"arpu",prop:"arpu"}},[t("el-input",{attrs:{placeholder:"arpu"},model:{value:e.data.arpu,callback:function(a){e.$set(e.data,"arpu",a)},expression:"data.arpu"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"arppu",prop:"arppu"}},[t("el-input",{attrs:{placeholder:"arppu"},model:{value:e.data.arppu,callback:function(a){e.$set(e.data,"arppu",a)},expression:"data.arppu"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"创建时间",prop:"createTime"}},[t("el-input",{attrs:{placeholder:"创建时间"},model:{value:e.data.createTime,callback:function(a){e.$set(e.data,"createTime",a)},expression:"data.createTime"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"删除标志",prop:"isDel"}},[t("el-input",{attrs:{placeholder:"删除标志"},model:{value:e.data.isDel,callback:function(a){e.$set(e.data,"isDel",a)},expression:"data.isDel"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"昨日新用户",prop:"newUserYesterday"}},[t("el-input",{attrs:{placeholder:"昨日新用户"},model:{value:e.data.newUserYesterday,callback:function(a){e.$set(e.data,"newUserYesterday",a)},expression:"data.newUserYesterday"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"今日留存用户",prop:"todayUserRetained"}},[t("el-input",{attrs:{placeholder:"今日留存用户"},model:{value:e.data.todayUserRetained,callback:function(a){e.$set(e.data,"todayUserRetained",a)},expression:"data.todayUserRetained"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"昨日充值用户",prop:"newUserYesterdayRecharge"}},[t("el-input",{attrs:{placeholder:"昨日充值用户"},model:{value:e.data.newUserYesterdayRecharge,callback:function(a){e.$set(e.data,"newUserYesterdayRecharge",a)},expression:"data.newUserYesterdayRecharge"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"今日充值留存用户",prop:"todayUserRechargeRetained"}},[t("el-input",{attrs:{placeholder:"今日充值留存用户"},model:{value:e.data.todayUserRechargeRetained,callback:function(a){e.$set(e.data,"todayUserRechargeRetained",a)},expression:"data.todayUserRechargeRetained"}})],1)],1),e._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{icon:"el-icon-close"},on:{click:function(a){e.dialogNewOrEditVisible=!1}}},[e._v("取消")]),e._v(" "),t("el-button",{attrs:{loading:e.saveBtnLoading,type:"primary"},on:{click:e.savetblrecorddailyrechargereport}},[t("svg-icon",{staticStyle:{"margin-right":"5px"},attrs:{"icon-class":"save"}}),e._v("保存")],1)],1)],1)],1)},[],!1,null,"7c34a6c2",null);s.options.__file="index.vue";a.default=s.exports},echq:function(e,a,t){},uiQI:function(e,a,t){"use strict";var r=t("echq");t.n(r).a}}]);