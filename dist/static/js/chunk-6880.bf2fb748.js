(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-6880"],{"7udr":function(t,i,a){"use strict";a.r(i);var e=a("rerW"),n=a.n(e),s=a("fyII"),r=a.n(s),o={data:function(){return{autofocus:!0,chartBar:null,list:[],legendDatas:[],xAxis:[],series:[],buttons:[],startTime:"",endTime:"",key:"",type:""}},mounted:function(){this.initData("1",1),this.initButton()},activated:function(){this.chartBar&&this.chartBar.resize()},methods:{initButton:function(){var t=this;this.$store.dispatch("PlayerOnlineStatisticsButtons",{}).then(function(i){t.buttons=i.data,console.log(t.buttons)}).catch(function(){})},initData:function(t,i){var a=this;this.key=t,this.type=i,this.legendDatas=[],this.series=[],this.$store.dispatch("AccountLoginRegistrEverydayStatistics",{key:t,type:i}).then(function(t){a.xAxis=t.data.dateTimes,a.startTime=t.data.startTime,a.endTime=t.data.endTime;var i=!0,e=!1,s=void 0;try{for(var r,o=n()(t.data.accountLoginEverydayStatisticsVos);!(i=(r=o.next()).done);i=!0){var c=r.value;a.legendDatas.push(c.accountLoginWay);var u={};u.name=c.accountLoginWay,u.type="bar",u.stack="总量",u.data=c.counts,a.series.push(u)}}catch(t){e=!0,s=t}finally{try{!i&&o.return&&o.return()}finally{if(e)throw s}}a.initChartBar()}).catch(function(){})},accountLoginType:function(t){this.initData(this.key,t)},playerOnlineStatisticsQuery:function(t,i){this.initData(t.key,this.type)},initChartBar:function(){var t=this,i={tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{data:this.legendDatas},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",data:this.xAxis}],yAxis:[{type:"value"}],series:this.series};this.chartBar=r.a.init(document.getElementById("J_chartBarBox")),this.chartBar.setOption(i),window.addEventListener("resize",function(){t.chartBar.resize()})}}},c=(a("mt2/"),a("ZrdR")),u=Object(c.a)(o,function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"mod-demo-echarts"},[a("div",{staticClass:"echartsTitle"},[a("div",[t._v("平台-登录用户数")]),t._v(" "),a("div",[t._v("时间: "+t._s(t.startTime)+"-"+t._s(t.endTime))])]),t._v(" "),a("div",{staticClass:"echartsChoose"},[a("el-button-group",t._l(t.buttons,function(i){return a("el-button",{attrs:{type:t.key==i.key?"primary":""},on:{click:function(a){t.playerOnlineStatisticsQuery(i)}}},[t._v(t._s(i.value))])})),t._v(" "),a("el-button-group",{staticClass:"group2"},[a("el-button",{attrs:{type:1==t.type?"primary":""},on:{click:function(i){t.accountLoginType(1)}}},[t._v("登录方式")]),t._v(" "),a("el-button",{attrs:{type:2==t.type?"primary":""},on:{click:function(i){t.accountLoginType(2)}}},[t._v("登录类型")])],1)],1),t._v(" "),a("div",{staticClass:"echarts"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:24}},[a("el-card",[a("div",{staticClass:"chart-box",attrs:{id:"J_chartBarBox"}})])],1)],1)],1)])},[],!1,null,null,null);u.options.__file="index.vue";i.default=u.exports},"mt2/":function(t,i,a){"use strict";var e=a("oGFe");a.n(e).a},oGFe:function(t,i,a){}}]);