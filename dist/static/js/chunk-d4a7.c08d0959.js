(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-d4a7"],{"4CNS":function(n,o,e){"use strict";var t=e("JXNa");e.n(t).a},JXNa:function(n,o,e){},c11S:function(n,o,e){"use strict";var t=e("fN6i");e.n(t).a},fN6i:function(n,o,e){},ntYl:function(n,o,e){"use strict";e.r(o);var t={name:"Login",data:function(){return{loginForm:{username:"",password:"",googleCode:""},loginRules:{username:[{required:!0,trigger:"blur",validator:function(n,o,e){0===o.trim().length?e(new Error("请输入正确的用户名")):e()}}],password:[{required:!0,trigger:"blur",validator:function(n,o,e){o.length<5?e(new Error("密码不能小于5位")):e()}}]},loading:!1,pwdType:"password"}},methods:{showPwd:function(){"password"===this.pwdType?this.pwdType="":this.pwdType="password"},handleLogin:function(){var n=this;this.$refs.loginForm.validate(function(o){if(!o)return console.log("error submit!!"),!1;n.loading=!0,n.$store.dispatch("Login",n.loginForm).then(function(){n.loading=!1,n.$router.push({path:"/"})}).catch(function(){n.loading=!1})})}}},r=(e("c11S"),e("4CNS"),e("ZrdR")),i=Object(r.a)(t,function(){var n=this,o=n.$createElement,e=n._self._c||o;return e("div",{staticClass:"login-container"},[e("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:n.loginForm,rules:n.loginRules,"auto-complete":"on","label-position":"left"}},[e("h3",{staticClass:"title"},[n._v("游戏管理平台")]),n._v(" "),e("el-form-item",{attrs:{prop:"username"}},[e("span",{staticClass:"svg-container svg-container_login"},[e("svg-icon",{attrs:{"icon-class":"user"}})],1),n._v(" "),e("el-input",{attrs:{name:"username",type:"text","auto-complete":"on",placeholder:"帐号"},model:{value:n.loginForm.username,callback:function(o){n.$set(n.loginForm,"username",o)},expression:"loginForm.username"}})],1),n._v(" "),e("el-form-item",{attrs:{prop:"password"}},[e("span",{staticClass:"svg-container"},[e("svg-icon",{attrs:{"icon-class":"password"}})],1),n._v(" "),e("el-input",{attrs:{type:n.pwdType,name:"password","auto-complete":"on",placeholder:"密码"},nativeOn:{keyup:function(o){return"button"in o||!n._k(o.keyCode,"enter",13,o.key,"Enter")?n.handleLogin(o):null}},model:{value:n.loginForm.password,callback:function(o){n.$set(n.loginForm,"password",o)},expression:"loginForm.password"}}),n._v(" "),e("span",{staticClass:"show-pwd",on:{click:n.showPwd}},[e("svg-icon",{attrs:{"icon-class":"eye"}})],1)],1),n._v(" "),e("el-form-item",[e("el-input",{attrs:{name:"googleCode","auto-complete":"on",placeholder:"谷歌验证码"},nativeOn:{keyup:function(o){return"button"in o||!n._k(o.keyCode,"enter",13,o.key,"Enter")?n.handleLogin(o):null}},model:{value:n.loginForm.googleCode,callback:function(o){n.$set(n.loginForm,"googleCode",o)},expression:"loginForm.googleCode"}})],1),n._v(" "),e("el-form-item",[e("el-button",{staticStyle:{width:"100%"},attrs:{loading:n.loading,type:"primary"},nativeOn:{click:function(o){return o.preventDefault(),n.handleLogin(o)}}},[n._v("\n        登 录\n      ")])],1)],1)],1)},[],!1,null,"48543f00",null);i.options.__file="index.vue";o.default=i.exports}}]);