webpackJsonp([18],{200:function(e,t,a){a(793);var o=a(88)(a(540),a(819),null,null);e.exports=o.exports},236:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a(52),r=a.n(o),n=a(51),l=a.n(n),s=a(54),u=a.n(s),i=a(89),p=a(53),m=a(90);t.default={data:function(){return{baseImgPath:p.b,isActive:!1}},created:function(){this.adminInfo.id||this.getAdminData()},computed:u()({},a.i(m.b)(["adminInfo","newOrdersCount","newAgentApply","newCashApply"])),methods:u()({},a.i(m.c)(["getAdminData","getOrderCount","getAgentApplyCount","getCashApplyCount"]),{handleCommand:function(e){var t=this;return l()(r.a.mark(function o(){var n;return r.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:if("home"!=e){o.next=4;break}t.$router.push("/manage"),o.next=9;break;case 4:if("singout"!=e){o.next=9;break}return o.next=7,a.i(i.e)();case 7:n=o.sent,1==n.status?(t.$message({type:"success",message:"退出成功"}),t.$router.push("/")):t.$message({type:"error",message:n.message});case 9:case"end":return o.stop()}},o,t)}))()},getNotify:function(){var e=this;return l()(r.a.mark(function t(){var a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:a=e,setTimeout(function(){a.getOrderCount(),a.getAgentApplyCount(),a.getCashApplyCount(),console.log("新订单"),a.isActive&&a.getNotify()},3e5);case 2:case"end":return t.stop()}},t,e)}))()},handleGoToOrder:function(e){this.$router.push({path:"orderList",query:{index:e}})},handleGoToAgent:function(e){this.$router.push({path:"agentManage",query:{index:e}})}}),activated:function(){console.log("headTop激活了"),this.isActive=!0,this.getNotify()},deactivated:function(){console.log("headTop休眠了"),this.isActive=!1}}},237:function(e,t,a){t=e.exports=a(197)(!1),t.push([e.i,".allcover{position:absolute;top:0;right:0}.ctt{left:50%;transform:translate(-50%,-50%)}.ctt,.tb{position:absolute;top:50%}.tb{transform:translateY(-50%)}.lr{position:absolute;left:50%;transform:translateX(-50%)}.header_container{background-color:#eff2f7;height:60px;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center;padding-left:20px}.avator{width:36px;height:36px;border-radius:50%;margin-right:37px}.el-dropdown-menu__item{text-align:center}",""])},238:function(e,t,a){var o=a(237);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);a(198)("24ad6d9e",o,!0)},239:function(e,t,a){a(238);var o=a(88)(a(236),a(240),null,null);e.exports=o.exports},240:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"header_container"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/manage"}}},[e._v("首页")]),e._v(" "),e._l(e.$route.meta,function(t,o){return a("el-breadcrumb-item",{key:o},[e._v(e._s(t))])})],2),e._v(" "),e.newOrdersCount>0?a("el-badge",{staticClass:"item",attrs:{value:e.newOrdersCount,max:99}},[a("el-button",{attrs:{size:"small"},on:{click:function(t){e.handleGoToOrder(0)}}},[e._v("新订单")])],1):e._e(),e._v(" "),e.newAgentApply>0?a("el-badge",{staticClass:"item",attrs:{value:e.newAgentApply,max:99}},[a("el-button",{attrs:{size:"small"},on:{click:function(t){e.handleGoToAgent(0)}}},[e._v("新代理申请")])],1):e._e(),e._v(" "),e.newCashApply>0?a("el-badge",{staticClass:"item",attrs:{value:e.newCashApply,max:99}},[a("el-button",{attrs:{size:"small"},on:{click:function(t){e.handleGoToAgent(3)}}},[e._v("新提现申请")])],1):e._e(),e._v(" "),a("el-dropdown",{attrs:{"menu-align":"start"},on:{command:e.handleCommand}},[a("img",{staticClass:"avator",attrs:{src:e.baseImgPath+e.adminInfo.avatarUrl}}),e._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{command:"home"}},[e._v("首页")]),e._v(" "),a("el-dropdown-item",{attrs:{command:"singout"}},[e._v("退出")])],1)],1)],1)},staticRenderFns:[]}},540:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a(52),r=a.n(o),n=a(54),l=a.n(n),s=a(51),u=a.n(s),i=a(239),p=a.n(i),m=a(89),c=a(53);t.default={data:function(){return{city:{},formData:{couponType:null,fullAmount:null,reduceAmount:null,onceAmount:null,discount:null,disCountUpLimit:null,couponNum:0,timeType:null,dataRange:null,perWeekDay:null,perMonthDay:null},rules:{couponType:[{required:!0,message:"请选择优惠券类型",trigger:"blur"}],timeType:[{required:!0,message:"请选择优惠时间类型",trigger:"blur"}],fullAmount:[{required:!0,message:"请输入满金额"}],reduceAmount:[{required:!0,message:"请输入减金额"}],onceAmount:[{required:!0,message:"请输入立减金额"}],discount:[{required:!0,message:"请输入折扣"}],disCountUpLimit:[{required:!0,message:"请输入折扣上限金额"}],couponNum:[{required:!0,message:"请输入优惠券发行数量"}],dataRange:[{required:!0,message:"请选择时间段"}],perWeekDay:[{required:!0,message:"请输入星期某日"}],perMonthDay:[{required:!0,message:"请输入月某日"}]},categoryOptions:[{value:"0",label:"满减优惠券"},{value:"1",label:"立减优惠券"},{value:"2",label:"折扣优惠券"}],timeTypeOptions:[{value:"0",label:"时间段有效"},{value:"1",label:"固定每周某日有效"},{value:"2",label:"固定每月某日有效"}],baseUrl:c.a,baseImgPath:c.b}},components:{headTop:p.a},mounted:function(){},methods:{submitForm:function(e){var t=this;this.$refs[e].validate(function(){var e=u()(r.a.mark(function e(o){var n,s,u,i;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!o){e.next=34;break}if(console.log("验证通过了"),n={},s={},0!=t.formData.couponType){e.next=11;break}if(n={fullAmount:t.formData.fullAmount,reduceAmount:t.formData.reduceAmount},!(parseInt(n.reduceAmount)>parseInt(n.fullAmount))){e.next=9;break}return t.$message({type:"error",message:"减多少要小于满多少"}),e.abrupt("return",!1);case 9:e.next=12;break;case 11:n=1==t.formData.couponType?{onceAmount:t.formData.onceAmount}:{discount:t.formData.discount,disCountUpLimit:t.formData.disCountUpLimit};case 12:if(0!=t.formData.timeType){e.next=16;break}s={dateRange:t.formData.dataRange},e.next=27;break;case 16:if(1!=t.formData.timeType){e.next=23;break}if(s={perWeekDay:t.formData.perWeekDay},!(parseInt(s.perWeekDay)>7||0===parseInt(s.perWeekDay))){e.next=21;break}return t.$message({type:"error",message:"输入星期有误"}),e.abrupt("return");case 21:e.next=27;break;case 23:if(s={perMonthDay:t.formData.perMonthDay},!(parseInt(s.perMonthDay)>28||0===parseInt(s.perMonthDay))){e.next=27;break}return t.$message({type:"error",message:"输入日期有误"}),e.abrupt("return");case 27:return u=l()({couponType:t.formData.couponType,couponNum:t.formData.couponNum,timeType:t.formData.timeType},n,s),e.next=30,a.i(m.N)(u);case 30:i=e.sent,1==i.status?(t.formData={couponType:null,fullAmount:null,reduceAmount:null,onceAmount:null,discount:null,disCountUpLimit:null,couponNum:0,timeType:null,dataRange:null,perWeekDay:null,perMonthDay:null},t.$message({type:"success",message:"添加成功"})):t.message({type:"error",message:"添加失败，请检查输入或者网络"}),e.next=36;break;case 34:return t.$notify.error({title:"错误",message:"请检查输入是否正确",offset:100}),e.abrupt("return",!1);case 36:case"end":return e.stop()}},e,t)}));return function(t){return e.apply(this,arguments)}}())}}}},574:function(e,t,a){t=e.exports=a(197)(!1),t.push([e.i,".allcover{position:absolute;top:0;right:0}.ctt{left:50%;transform:translate(-50%,-50%)}.ctt,.tb{position:absolute;top:50%}.tb{transform:translateY(-50%)}.lr{position:absolute;left:50%;transform:translateX(-50%)}.button_submit{text-align:center}.avatar-uploader .el-upload{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden}.avatar-uploader .el-upload:hover{border-color:#20a0ff}.avatar-uploader-icon{font-size:28px;color:#8c939d;width:120px;height:120px;line-height:120px;text-align:center}.avatar{width:120px;height:120px;display:block}.el-table .info-row{background:#c9e5f5}.el-table .positive-row{background:#e2f0e4}",""])},793:function(e,t,a){var o=a(574);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);a(198)("ba7f04ec",o,!0)},819:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("head-top"),e._v(" "),a("el-row",{staticStyle:{"margin-top":"20px"}},[a("el-col",{attrs:{span:12,offset:4}},[a("el-form",{ref:"formData",staticClass:"demo-formData",attrs:{model:e.formData,rules:e.rules,"label-width":"110px"}},[a("el-form-item",{attrs:{label:"优惠券分类",prop:"couponType"}},[a("el-select",{attrs:{placeholder:"选择优惠券种类"},model:{value:e.formData.couponType,callback:function(t){e.$set(e.formData,"couponType",t)},expression:"formData.couponType"}},e._l(e.categoryOptions,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),0==e.formData.couponType?a("el-form-item",{attrs:{label:"满多少",prop:"fullAmount"}},[a("el-input",{attrs:{type:"number"},model:{value:e.formData.fullAmount,callback:function(t){e.$set(e.formData,"fullAmount",t)},expression:"formData.fullAmount"}})],1):e._e(),e._v(" "),0==e.formData.couponType?a("el-form-item",{attrs:{label:"减多少",prop:"reduceAmount"}},[a("el-input",{attrs:{type:"number"},model:{value:e.formData.reduceAmount,callback:function(t){e.$set(e.formData,"reduceAmount",t)},expression:"formData.reduceAmount"}})],1):e._e(),e._v(" "),1==e.formData.couponType?a("el-form-item",{attrs:{label:"立减多少",prop:"onceAmount"}},[a("el-input",{attrs:{type:"number"},model:{value:e.formData.onceAmount,callback:function(t){e.$set(e.formData,"onceAmount",t)},expression:"formData.onceAmount"}})],1):e._e(),e._v(" "),2==e.formData.couponType?a("el-form-item",{attrs:{label:"折扣",prop:"discount",placeholder:"例如8.8折输入8.8"}},[a("el-input",{model:{value:e.formData.discount,callback:function(t){e.$set(e.formData,"discount",t)},expression:"formData.discount"}})],1):e._e(),e._v(" "),2==e.formData.couponType?a("el-form-item",{attrs:{label:"折扣上限",prop:"disCountUpLimit"}},[a("el-input",{attrs:{type:"number"},model:{value:e.formData.disCountUpLimit,callback:function(t){e.$set(e.formData,"disCountUpLimit",t)},expression:"formData.disCountUpLimit"}})],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"优惠券数量",prop:"couponNum"}},[a("el-input",{attrs:{type:"number"},model:{value:e.formData.couponNum,callback:function(t){e.$set(e.formData,"couponNum",t)},expression:"formData.couponNum"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"优惠时间类型",prop:"timeType"}},[a("el-select",{attrs:{placeholder:"选择优惠券种类"},model:{value:e.formData.timeType,callback:function(t){e.$set(e.formData,"timeType",t)},expression:"formData.timeType"}},e._l(e.timeTypeOptions,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),0==e.formData.timeType?a("el-form-item",{attrs:{label:"优惠券时间段",prop:"dateRange"}},[a("el-date-picker",{attrs:{type:"daterange","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd HH:mm:ss","default-time":["00:00:00","23:59:59"]},model:{value:e.formData.dataRange,callback:function(t){e.$set(e.formData,"dataRange",t)},expression:"formData.dataRange"}})],1):e._e(),e._v(" "),1==e.formData.timeType?a("el-form-item",{attrs:{label:"固定每周某日",prop:"perWeekDay"}},[a("el-input",{attrs:{placeholder:"例如输入4，表示每周周四有效",type:"number"},model:{value:e.formData.perWeekDay,callback:function(t){e.$set(e.formData,"perWeekDay",t)},expression:"formData.perWeekDay"}})],1):e._e(),e._v(" "),2==e.formData.timeType?a("el-form-item",{attrs:{label:"固定每月某日",prop:"perMonthDay"}},[a("el-input",{attrs:{placeholder:"例如输入13，表示每月13号有效，应小于29",type:"number"},model:{value:e.formData.perMonthDay,callback:function(t){e.$set(e.formData,"perMonthDay",t)},expression:"formData.perMonthDay"}})],1):e._e(),e._v(" "),a("el-form-item",{staticClass:"button_submit"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("formData")}}},[e._v("立即创建")])],1)],1)],1)],1)],1)},staticRenderFns:[]}}});