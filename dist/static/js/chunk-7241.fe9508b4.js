(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-7241","chunk-6db5","chunk-2c3b","chunk-66cb","chunk-3c86","chunk-7416","chunk-1db4"],{"/G9g":function(t,e,a){},"/cTu":function(t,e,a){"use strict";var i=a("dagi");a.n(i).a},"7udr":function(t,e,a){"use strict";a.r(e);var i=a("rerW"),n=a.n(i),s=a("QoZo"),r=a.n(s),o={data:function(){return{autofocus:!0,chartBar:null,list:[],legendDatas:[],xAxis:[],series:[],buttons:[],startTime:"",endTime:"",key:"",type:""}},mounted:function(){this.initData("1",1),this.initButton()},activated:function(){this.chartBar&&this.chartBar.resize()},methods:{initButton:function(){var t=this;this.$store.dispatch("PlayerOnlineStatisticsButtons",{}).then(function(e){t.buttons=e.data,console.log(t.buttons)}).catch(function(){})},initData:function(t,e){var a=this;this.key=t,this.type=e,this.legendDatas=[],this.series=[],this.$store.dispatch("AccountLoginRegistrEverydayStatistics",{key:t,type:e}).then(function(t){a.xAxis=t.data.dateTimes,a.startTime=t.data.startTime,a.endTime=t.data.endTime;var e=!0,i=!1,s=void 0;try{for(var r,o=n()(t.data.accountLoginEverydayStatisticsVos);!(e=(r=o.next()).done);e=!0){var c=r.value;a.legendDatas.push(c.accountLoginWay);var l={};l.name=c.accountLoginWay,l.type="bar",l.stack="总量",l.data=c.counts,a.series.push(l)}}catch(t){i=!0,s=t}finally{try{!e&&o.return&&o.return()}finally{if(i)throw s}}a.initChartBar()}).catch(function(){})},accountLoginType:function(t){this.initData(this.key,t)},playerOnlineStatisticsQuery:function(t,e){this.initData(t.key,this.type)},initChartBar:function(){var t=this,e={tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{data:this.legendDatas},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",data:this.xAxis}],yAxis:[{type:"value"}],series:this.series};this.chartBar=r.a.init(document.getElementById("J_chartBarBox")),this.chartBar.setOption(e),window.addEventListener("resize",function(){t.chartBar.resize()})}}},c=(a("mt2/"),a("ZrdR")),l=Object(c.a)(o,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mod-demo-echarts"},[a("div",{staticClass:"echartsTitle"},[a("div",[t._v("平台-登录用户数")]),t._v(" "),a("div",[t._v("时间: "+t._s(t.startTime)+"-"+t._s(t.endTime))])]),t._v(" "),a("div",{staticClass:"echartsChoose"},[a("el-button-group",t._l(t.buttons,function(e){return a("el-button",{attrs:{type:t.key==e.key?"primary":""},on:{click:function(a){t.playerOnlineStatisticsQuery(e)}}},[t._v(t._s(e.value))])})),t._v(" "),a("el-button-group",{staticClass:"group2"},[a("el-button",{attrs:{type:1==t.type?"primary":""},on:{click:function(e){t.accountLoginType(1)}}},[t._v("登录方式")]),t._v(" "),a("el-button",{attrs:{type:2==t.type?"primary":""},on:{click:function(e){t.accountLoginType(2)}}},[t._v("登录类型")])],1)],1),t._v(" "),a("div",{staticClass:"echarts"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:24}},[a("el-card",[a("div",{staticClass:"chart-box",attrs:{id:"J_chartBarBox"}})])],1)],1)],1)])},[],!1,null,null,null);l.options.__file="index.vue";e.default=l.exports},"8Idl":function(t,e,a){},BXFq:function(t,e,a){"use strict";var i=a("hLp5");a.n(i).a},Ct3V:function(t,e,a){"use strict";var i=a("YCl5");a.n(i).a},M2Q5:function(t,e,a){"use strict";a.r(e);var i=a("rerW"),n=a.n(i),s=a("QoZo"),r=a.n(s),o={data:function(){return{autofocus:!0,chartBar:null,list:[],legendDatas:[],xAxis:[],series:[],buttons:[],startTime:"",endTime:"",key:"",type:""}},mounted:function(){this.initData("1",3),this.initButton()},activated:function(){this.chartBar&&this.chartBar.resize()},methods:{initButton:function(){var t=this;this.$store.dispatch("PlayerOnlineStatisticsButtons",{}).then(function(e){t.buttons=e.data}).catch(function(){})},initData:function(t,e){var a=this;this.key=t,this.type=e,this.legendDatas=[],this.series=[],console.log(this.series),this.$store.dispatch("AccountLoginRegistrEverydayStatistics",{key:t,type:e}).then(function(t){a.xAxis=t.data.dateTimes,a.startTime=t.data.startTime,a.endTime=t.data.endTime;var e=!0,i=!1,s=void 0;try{for(var r,o=n()(t.data.accountLoginEverydayStatisticsVos);!(e=(r=o.next()).done);e=!0){var c=r.value;a.legendDatas.push(c.accountLoginWay);var l={};l.name=c.accountLoginWay,l.type="bar",l.stack="总量",l.data=c.counts,a.series.push(l)}}catch(t){i=!0,s=t}finally{try{!e&&o.return&&o.return()}finally{if(i)throw s}}console.log(a.series),a.initChartBar(),a.chartBar.resize()}).catch(function(){})},accountLoginType:function(t){this.initData(this.key,t)},playerOnlineStatisticsQuery:function(t,e){this.initData(t.key,this.type)},initChartBar:function(){var t=this,e={tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{data:this.legendDatas},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",data:this.xAxis}],yAxis:[{type:"value"}],series:this.series};this.chartBar=r.a.init(document.getElementById("J_chartBarBox1")),this.chartBar.setOption(e),window.addEventListener("resize",function(){t.chartBar.resize()})}}},c=(a("i2/g"),a("ZrdR")),l=Object(c.a)(o,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mod-demo-echarts"},[a("div",{staticClass:"echartsTitle"},[a("div",[t._v("平台-注册用户数")]),t._v(" "),a("div",[t._v("时间: "+t._s(t.startTime)+"-"+t._s(t.endTime))])]),t._v(" "),a("div",{staticClass:"echartsChoose"},[a("el-button-group",t._l(t.buttons,function(e){return a("el-button",{attrs:{type:t.key==e.key?"primary":""},on:{click:function(a){t.playerOnlineStatisticsQuery(e)}}},[t._v(t._s(e.value))])})),t._v(" "),a("el-button-group",{staticClass:"group2"},[a("el-button",{attrs:{type:3==t.type?"primary":""},on:{click:function(e){t.accountLoginType(3)}}},[t._v("渠道")]),t._v(" "),a("el-button",{attrs:{type:4==t.type?"primary":""},on:{click:function(e){t.accountLoginType(4)}}},[t._v("来源")])],1)],1),t._v(" "),a("div",{staticClass:"echarts"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:24}},[a("el-card",[a("div",{staticClass:"chart-box",attrs:{id:"J_chartBarBox1"}})])],1)],1)],1)])},[],!1,null,null,null);l.options.__file="index.vue";e.default=l.exports},U5A9:function(t,e,a){},Uzl7:function(t,e,a){"use strict";var i=a("U5A9");a.n(i).a},WO3O:function(t,e,a){"use strict";a.r(e);var i=a("rerW"),n=a.n(i),s=a("QoZo"),r=a.n(s),o={data:function(){return{key:"",chartLine:null,list:[],legendDatas:[],xAxis:[],series:[],buttons:[],startTime:"",endTime:""}},mounted:function(){this.initData("1"),this.initButton()},activated:function(){this.chartLine&&this.chartLine.resize()},methods:{initButton:function(){var t=this;this.$store.dispatch("PlayerOnlineStatisticsButtons",{}).then(function(e){t.buttons=e.data,console.log(t.buttons)}).catch(function(){})},initData:function(t){var e=this;this.key=t,this.legendDatas=[],this.xAxis=[],this.series=[],console.log("开始"),this.$store.dispatch("PlayerOnlineStatistics",{key:t}).then(function(t){e.startTime=t.data.startTime,e.endTime=t.data.endTime;var a=!0,i=!1,s=void 0;try{for(var r,o=n()(t.data.dateTimes);!(a=(r=o.next()).done);a=!0){var c=r.value;e.legendDatas.push(c)}}catch(t){i=!0,s=t}finally{try{!a&&o.return&&o.return()}finally{if(i)throw s}}var l=!0,u=!1,d=void 0;try{for(var h,v=n()(t.data.playerOnlineStatisticsVos);!(l=(h=v.next()).done);l=!0){var p=h.value;e.xAxis.push(p.date);var y={};y.name=p.date,y.type="line",y.data=p.list,e.series.push(y)}}catch(t){u=!0,d=t}finally{try{!l&&v.return&&v.return()}finally{if(u)throw d}}console.log(e.legendDatas),console.log(e.series),console.log(e.xAxis),e.initChartLine(),e.chartLine.resize()}).catch(function(){})},playerOnlineStatisticsQuery:function(t){this.initData(t.key)},initChartLine:function(){var t=this,e={title:{text:""},tooltip:{trigger:"axis"},legend:{data:this.xAxis},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},toolbox:{feature:{saveAsImage:{}}},xAxis:{type:"category",boundaryGap:!1,data:this.legendDatas},yAxis:{type:"value"},series:this.series};this.chartLine=r.a.init(document.getElementById("J_chartLineBox")),this.chartLine.setOption(e,!0),window.addEventListener("resize",function(){t.chartLine.resize()})}}},c=(a("/cTu"),a("ZrdR")),l=Object(c.a)(o,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mod-demo-echarts"},[a("div",{staticClass:"echartsTitle"},[a("div",[t._v("游戏玩家在线走势")]),t._v(" "),a("div",[t._v("时间: "+t._s(t.startTime)+"-"+t._s(t.endTime))])]),t._v(" "),a("div",{staticClass:"echartsChoose"},[a("el-button-group",t._l(t.buttons,function(e){return a("el-button",{attrs:{type:t.key==e.key?"primary":""},on:{click:function(a){t.playerOnlineStatisticsQuery(e)}}},[t._v(t._s(e.value))])}))],1),t._v(" "),a("div",{staticClass:"echarts"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:24}},[a("el-card",[a("div",{staticClass:"chart-box",attrs:{id:"J_chartLineBox"}})])],1)],1)],1)])},[],!1,null,null,null);l.options.__file="index.vue";e.default=l.exports},YCl5:function(t,e,a){},"Yoq+":function(t,e,a){},"b2+w":function(t,e,a){"use strict";var i=a("8Idl");a.n(i).a},dagi:function(t,e,a){},gbfr:function(t,e,a){"use strict";a.r(e);var i=a("rerW"),n=a.n(i),s=a("QoZo"),r=a.n(s),o={data:function(){return{chartLine:null,list:[],dateList:[],onlineList:[],playingList:[]}},mounted:function(){this.initData()},activated:function(){this.chartLine&&this.chartLine.resize()},methods:{initData:function(){var t=this;this.$store.dispatch("ListAllRecordAccountOnlinePlaying",{}).then(function(e){t.list=e.data;var a=[],i=[],s=[];t.initChartLine();var r=!0,o=!1,c=void 0;try{for(var l,u=n()(t.list);!(r=(l=u.next()).done);r=!0){var d=l.value;a.push(d.onlineNumber),i.push(d.playingNumber),s.push(d.currentMinutes)}}catch(t){o=!0,c=t}finally{try{!r&&u.return&&u.return()}finally{if(o)throw c}}t.dateList=s,t.playingList=i,t.onlineList=a,t.initChartLine()}).catch(function(){})},initChartLine:function(){var t=this,e={title:{text:"在线在玩玩家统计"},tooltip:{trigger:"axis"},legend:{data:["在线","在玩"]},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},toolbox:{feature:{saveAsImage:{}}},xAxis:{type:"category",boundaryGap:!1,data:this.dateList},yAxis:{type:"value"},series:[{name:"在线",type:"line",data:this.onlineList},{name:"在玩",type:"line",data:this.playingList}]};this.chartLine=r.a.init(document.getElementById("J_chartLineBox3")),this.chartLine.setOption(e),window.addEventListener("resize",function(){t.chartLine.resize()})}}},c=(a("Ct3V"),a("ZrdR")),l=Object(c.a)(o,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"mod-demo-echarts"},[e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:24}},[e("el-card",[e("div",{staticClass:"chart-box",attrs:{id:"J_chartLineBox3"}})])],1)],1)],1)},[],!1,null,null,null);l.options.__file="index.vue";e.default=l.exports},gxqX:function(t,e,a){"use strict";a.r(e);var i=a("rerW"),n=a.n(i),s=a("QoZo"),r=a.n(s),o={data:function(){return{autofocus:!0,chartBar:null,list:[],legendDatas:[],xAxis:[],series:[],buttons:[],appPayChannels:[],payChannel:"",startTime:"",endTime:"",key:"",type:"",totalweixin:"",totalali:"",totalapple:"",totalPrice:""}},mounted:function(){this.initData("1",3),this.initButton(),this.initAppPayChannel()},activated:function(){this.chartBar&&this.chartBar.resize()},methods:{initButton:function(){var t=this;this.$store.dispatch("PlayerOnlineStatisticsButtons",{}).then(function(e){t.buttons=e.data}).catch(function(){})},initAppPayChannel:function(){var t=this;this.$store.dispatch("AppPayChannel",{}).then(function(e){t.appPayChannels=e.data}).catch(function(){})},initData:function(t,e,a){var i=this;this.key=t,this.type=e,this.payChannel=a,this.legendDatas=[],this.series=[],console.log(this.series),this.$store.dispatch("RechargeAmountStatistics",{key:t,type:e,payChannel:a}).then(function(t){console.log(t),i.totalweixin=t.data.totalweixin,i.totalali=t.data.totalali,i.totalapple=t.data.totalapple,i.totalPrice=t.data.totalPrice,i.xAxis=t.data.xAxis,i.startTime=t.data.startTime,i.endTime=t.data.endTime;var e=!0,a=!1,s=void 0;try{for(var r,o=n()(t.data.rechargeAmountStatisticsVos);!(e=(r=o.next()).done);e=!0){var c=r.value;i.legendDatas.push(c.rechargeSource);var l={};l.name=c.rechargeSource,l.type="bar",l.stack="总量",l.data=c.moneys,i.series.push(l)}}catch(t){a=!0,s=t}finally{try{!e&&o.return&&o.return()}finally{if(a)throw s}}console.log(i.series),i.initChartBar(),i.chartBar.resize()}).catch(function(){})},accountLoginType:function(t){this.initData(this.key,t)},playerOnlineStatisticsQuery:function(t,e){this.initData(t.key,this.type,this.payChannel)},appPayChannelsChange:function(){this.initData(this.key,this.type,this.payChannel)},initChartBar:function(){var t=this,e={tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{data:this.legendDatas},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",data:this.xAxis}],yAxis:[{type:"value"}],series:this.series};this.chartBar=r.a.init(document.getElementById("J_chartBarBox2")),this.chartBar.setOption(e),window.addEventListener("resize",function(){t.chartBar.resize()})}}},c=(a("mM7F"),a("ZrdR")),l=Object(c.a)(o,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mod-demo-echarts"},[a("div",{staticClass:"echartsTitle"},[a("div",[t._v("平台-注册充值金额")]),t._v(" "),a("div",[t._v("时间: "+t._s(t.startTime)+"-"+t._s(t.endTime))])]),t._v(" "),a("div",{staticClass:"echartsChoose"},[a("el-button-group",t._l(t.buttons,function(e){return a("el-button",{attrs:{type:t.key==e.key?"primary":""},on:{click:function(a){t.playerOnlineStatisticsQuery(e)}}},[t._v(t._s(e.value))])})),t._v(" "),a("div",{staticClass:"group2"},[t._v("\n    充值来源:\n    "),a("el-select",{attrs:{clearable:"",placeholder:"请选择"},on:{change:t.appPayChannelsChange},model:{value:t.payChannel,callback:function(e){t.payChannel=e},expression:"payChannel"}},t._l(t.appPayChannels,function(t){return a("el-option",{key:t.value,attrs:{label:t.value,value:t.value}})}))],1)],1),t._v(" "),a("div",{staticClass:"echarts"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:24}},[a("el-card",[a("div",{staticClass:"chart-box",attrs:{id:"J_chartBarBox2"}})])],1)],1)],1),t._v(" "),a("div",{staticClass:"moneyShow"},[a("el-row",{staticClass:"money"},[a("span",[t._v(t._s(t.totalweixin))]),t._v(" "),a("span",[t._v(t._s(t.totalapple))]),t._v(" "),a("span",[t._v(t._s(t.totalali))]),t._v(" "),a("span",[t._v(t._s(t.totalPrice))])]),t._v(" "),a("el-row",{staticClass:"title"},[a("span",[t._v("微信总金额(单位:元)")]),t._v(" "),a("span",[t._v("apple总金额(单位:元)")]),t._v(" "),a("span",[t._v("支付宝总金额(单位:元)")]),t._v(" "),a("span",[t._v("总金额(单位:元)")])])],1)])},[],!1,null,null,null);l.options.__file="index.vue";e.default=l.exports},hB3F:function(t,e,a){},hLp5:function(t,e,a){},"i2/g":function(t,e,a){"use strict";var i=a("hB3F");a.n(i).a},lAbF:function(t,e,a){"use strict";a.r(e);var i=a("bS4n"),n=a.n(i),s=a("8t5x"),r={name:"GameRobotMonitor",filters:{statusFilter:function(t){if(null==t||void 0===t||""===t)return"danger";return{true:"success",false:"danger"}[t]}},props:{gameName:{type:String,default:"游戏名称",required:!0},gameCode:{type:String,default:"jdjl",required:!0},rooms:{type:Array,required:!0}},methods:{handleClick:function(t){this.$router.push({path:"/robotManager/games/"+this.gameCode+"/"+t.menuCode})}}},o=(a("Uzl7"),a("ZrdR")),c=Object(o.a)(r,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-card",{staticClass:"box-card-component",staticStyle:{"margin-left":"8px"}},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[t._v("\n    "+t._s(t.gameName)+"\n  ")]),t._v(" "),a("div",{staticClass:"component-item"},[a("el-table",{staticStyle:{width:"100%","padding-top":"0px"},attrs:{data:t.rooms}},[a("el-table-column",{attrs:{label:"房间名",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"link-type",on:{click:function(a){t.handleClick(e.row)}}},[t._v(t._s(e.row.menuName))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"运行状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:t._f("statusFilter")(e.row.status)}},[t._v(" "+t._s("true"===e.row.status?"正常运行":"停止运行"))])]}}])})],1)],1)])},[],!1,null,"d2fd4c92",null);c.options.__file="GameRobotMonitor.vue";var l={name:"Monitor",components:{GameRobotMonitor:c.exports},data:function(){return{games:[]}},created:function(){this.ListRobotStatus()},methods:{ListRobotStatus:function(){var t=this,e=this.$loading({lock:!0,text:"监控加载中",spinner:"el-icon-loading",background:"rgba(255, 255, 255, 0.7)"});this.$store.dispatch("ListRobotStatus").then(function(a){t.games=a.data,e.close()}).catch(function(){e.close()})}}},u=(a("b2+w"),Object(o.a)(l,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"mixin-components-container"},[e("h1",[this._v("机器人运行状态监控")]),this._v(" "),e("el-row",{staticStyle:{"margin-top":"50px"},attrs:{gutter:24}},this._l(this.games,function(t){return e("el-col",{attrs:{span:8}},[e("GameRobotMonitor",{attrs:{"game-name":t.menuName,"game-code":t.menuCode,rooms:t.children}})],1)}))],1)},[],!1,null,"3ed458d5",null));u.options.__file="index.vue";var d=u.exports,h=a("WO3O"),v=a("7udr"),p=a("M2Q5"),y=a("gxqX"),f=a("y8ho"),g=a("gbfr"),m={name:"Dashboard",components:{adminMonitor:d,playerOnlineStatistics:h.default,accountLoginEverydayStatistics:v.default,accountRegisterEverydayStatistics:p.default,rechargeAmountStatistics:y.default,totalGoldEverydayStatistics:f.default,recordAccountOnlinePlaying:g.default},data:function(){return{currentRole:"adminMonitor",indexCards:[]}},computed:n()({},Object(s.b)(["name","roles"])),mounted:function(){this.indexCardQuery()},methods:{indexCardQuery:function(){var t=this;console.log("开始查询"),this.$store.dispatch("IndexCard",{}).then(function(e){console.log(e),t.indexCards=e.data}).catch(function(){})}}},_=(a("BXFq"),Object(o.a)(m,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dashboard-container"},[a("el-row",{staticClass:"panel-group",attrs:{gutter:40}},t._l(t.indexCards,function(e,i){return a("el-col",{staticClass:"card-panel-col",attrs:{xs:12,sm:12,lg:6}},[a("div",{staticClass:"card-panel"},[a("div",{staticClass:"card-panel-icon-wrapper icon-people"},[a("svg-icon",{attrs:{"icon-class":e.icon,"class-name":"card-panel-icon"}})],1),t._v(" "),a("div",{staticClass:"card-panel-description"},[a("div",{staticClass:"card-panel-text"},[t._v(t._s(e.title))]),t._v(" "),a("count-to",{staticClass:"card-panel-num"},[t._v(t._s(e.value))])],1)])])})),t._v(" "),a("record-account-online-playing",{ref:"recordAccountOnlinePlaying"}),t._v(" "),a("player-online-statistics",{ref:"playerOnlineStatistics"}),t._v(" "),a("account-login-everyday-statistics",{ref:"accountLoginEverydayStatistics"}),t._v(" "),a("account-register-everyday-statistics",{ref:"accountRegisterEverydayStatistics"}),t._v(" "),a("recharge-amount-statistics",{ref:"rechargeAmountStatistics"}),t._v(" "),a("total-gold-everyday-statistics",{ref:"totalGoldEverydayStatistics"})],1)},[],!1,null,"0559202c",null));_.options.__file="index.vue";e.default=_.exports},mM7F:function(t,e,a){"use strict";var i=a("Yoq+");a.n(i).a},"mt2/":function(t,e,a){"use strict";var i=a("oGFe");a.n(i).a},oGFe:function(t,e,a){},vj4G:function(t,e,a){"use strict";var i=a("/G9g");a.n(i).a},y8ho:function(t,e,a){"use strict";a.r(e);var i=a("rerW"),n=a.n(i),s=a("QoZo"),r=a.n(s),o={data:function(){return{key:"",chartLine:null,list:[],legendDatas:[],xAxis:[],series:[],buttons:[],startTime:"",endTime:"",gold:"",bankGold:"",totalGold:""}},mounted:function(){this.initData("1"),this.initButton()},activated:function(){this.chartLine&&this.chartLine.resize()},methods:{initButton:function(){var t=this;this.$store.dispatch("PlayerOnlineStatisticsButtons",{}).then(function(e){t.buttons=e.data,console.log(t.buttons)}).catch(function(){})},initData:function(t){var e=this;this.key=t,this.legendDatas=[],this.series=[],console.log(this.series),this.$store.dispatch("TotalGoldEverydayStatistics",{key:t}).then(function(t){console.log(t),e.gold=t.data.gold,e.bankGold=t.data.bankGold,e.totalGold=t.data.totalGold,e.xAxis=t.data.xAxis,e.startTime=t.data.startTime,e.endTime=t.data.endTime;var a=!0,i=!1,s=void 0;try{for(var r,o=n()(t.data.totalGoldEverydayStatisticsVos);!(a=(r=o.next()).done);a=!0){var c=r.value;e.legendDatas.push(c.goldSource);var l={};l.name=c.goldSource,l.type="line",l.data=c.golds,e.series.push(l)}}catch(t){i=!0,s=t}finally{try{!a&&o.return&&o.return()}finally{if(i)throw s}}e.initChartLine()}).catch(function(){})},playerOnlineStatisticsQuery:function(t){this.initData(t.key)},initChartLine:function(){var t=this,e={title:{text:""},tooltip:{trigger:"axis"},legend:{data:this.legendDatas},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},toolbox:{feature:{saveAsImage:{}}},xAxis:{type:"category",boundaryGap:!1,data:this.xAxis},yAxis:{type:"value"},series:this.series};this.chartLine=r.a.init(document.getElementById("J_chartLineBox1")),this.chartLine.setOption(e),window.addEventListener("resize",function(){t.chartLine.resize()})}}},c=(a("vj4G"),a("ZrdR")),l=Object(c.a)(o,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mod-demo-echarts"},[a("div",{staticClass:"echartsTitle"},[a("div",[t._v("平台-总金币走势")]),t._v(" "),a("div",[t._v("时间: "+t._s(t.startTime)+"-"+t._s(t.endTime))])]),t._v(" "),a("div",{staticClass:"echartsChoose"},[a("el-button-group",t._l(t.buttons,function(e){return a("el-button",{attrs:{type:t.key==e.key?"primary":""},on:{click:function(a){t.playerOnlineStatisticsQuery(e)}}},[t._v(t._s(e.value))])}))],1),t._v(" "),a("div",{staticClass:"echarts"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:24}},[a("el-card",[a("div",{staticClass:"chart-box",attrs:{id:"J_chartLineBox1"}})])],1)],1)],1),t._v(" "),a("div",{staticClass:"moneyShow1"},[a("el-row",{staticClass:"money1"},[a("span",[t._v(t._s(t.totalGold))]),t._v(" "),a("span",[t._v(t._s(t.gold))]),t._v(" "),a("span",[t._v(t._s(t.bankGold))])]),t._v(" "),a("el-row",{staticClass:"title1"},[a("span",[t._v("玩家总金币(单位:元)")]),t._v(" "),a("span",[t._v("玩家身上总金币(单位:元)")]),t._v(" "),a("span",[t._v("玩家银行总金币(单位:元)")])])],1)])},[],!1,null,null,null);l.options.__file="index.vue";e.default=l.exports}}]);