(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-11d0"],{OQzT:function(e,t,r){"use strict";r.r(t);var o={name:"RemitGoldPage",data:function(){var e=function(e,t,r){t&&0!==t.length?isNaN(Number(t))?r(new Error("必须为纯数字")):r():r(new Error("必填项"))};return{remitGoldForm:{showId:null,remitGold:null},playerId:null,nickname:null,remitGoldRules:{showId:[{required:!0,trigger:"blur",validator:e}],remitGold:[{required:!0,trigger:"blur",validator:e}]},remitGoldFormLoading:!1}},methods:{checkNickname:function(){var e=this;this.$store.dispatch("GetPlayerAccountByShowId",this.remitGoldForm.showId).then(function(t){e.nickname=t.data.nickName,e.playerId=t.data.userid})},remitGold:function(){var e=this;if(!this.playerId)return this.$message({message:"请检测玩家昵称",type:"warning"}),!1;this.$refs.remitGoldForm.validate(function(t){t&&(e.remitGoldFormLoading=!0,e.$store.dispatch("RemitGold",{showId:e.remitGoldForm.showId,playerId:e.playerId,remitGold:e.remitGoldForm.remitGold}).then(function(t){e.$message({message:t.msg,type:"success"}),e.resetForm(),e.remitGoldFormLoading=!1}).catch(function(){e.remitGoldFormLoading=!1}))})},resetForm:function(){this.remitGoldForm={showId:null,remitGold:null},this.playerId=null,this.nickname=null,this.$refs.remitGoldForm&&this.$refs.remitGoldForm.clearValidate()}}},i=(r("eht7"),r("ZrdR")),l=Object(i.a)(o,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-container"},[r("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.remitGoldFormLoading,expression:"remitGoldFormLoading"}],ref:"remitGoldForm",attrs:{model:e.remitGoldForm,rules:e.remitGoldRules,"label-width":"140px",size:"mini"}},[r("el-form-item",{attrs:{label:"玩家ID",prop:"showId"}},[r("el-col",{attrs:{span:6}},[r("el-input",{model:{value:e.remitGoldForm.showId,callback:function(t){e.$set(e.remitGoldForm,"showId",t)},expression:"remitGoldForm.showId"}})],1),e._v(" "),r("el-col",{attrs:{span:6}},[r("el-button",{on:{click:e.checkNickname}},[e._v("检测玩家昵称")])],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"玩家昵称",prop:"nickname"}},[r("label",[e._v(e._s(e.nickname))])]),e._v(" "),r("el-form-item",{attrs:{label:"划账金额",prop:"remitGold"}},[r("el-col",{attrs:{span:6}},[r("el-input",{model:{value:e.remitGoldForm.remitGold,callback:function(t){e.$set(e.remitGoldForm,"remitGold",t)},expression:"remitGoldForm.remitGold"}})],1)],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.remitGold}},[e._v("确定划账")]),e._v(" "),r("el-button",{attrs:{type:"default"},on:{click:e.resetForm}},[e._v("重置")])],1)],1)],1)},[],!1,null,"9d1d874e",null);l.options.__file="index.vue";t.default=l.exports},ccLc:function(e,t,r){},eht7:function(e,t,r){"use strict";var o=r("ccLc");r.n(o).a}}]);