webpackJsonp([1],{100:function(t,i){},101:function(t,i){},11:function(t,i,e){"use strict";var a=e(59),s=e.n(a),n=e(55),l=e.n(n),r=e(58),c=e.n(r),o=e(56),u=e.n(o),d=e(125),v=(e.n(d),e(17)),_=e.n(v),h=e(111),m=e.n(h),f=this,p=!1,b=function(t){return m.a.format({protocol:"https",host:"open.weixin.qq.com",pathname:"/connect/oauth2/authorize",query:u()(t,{state:location.href}),hash:"#wechat_redirect"})},w=function(t,i){if(p)return!1;switch(t){case 401:return p=!0,location.href=b(i.extra),!0;default:return alert(i.message),!1}},C=function(){var t=c()(s.a.mark(function t(i,e){var a,n,r;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=e||{},e.method=e.method||"GET",e.credentials="same-origin",-1!==["POST","PUT"].indexOf(e.method)&&(e.headers=e.headers||{},e.body instanceof FormData||e.headers["Content-Type"]||e.headers["content-type"]||(e.headers["Content-Type"]="application/json",e.body&&"string"!=typeof body&&(e.body=l()(e.body)))),i+=m.a.format({query:e.query}),e.query=void 0,a=void 0,n=void 0,t.prev=7,t.next=10,fetch(i,e);case 10:return r=t.sent,a=r.status,t.next=14,r.json();case 14:if(n=t.sent,!(a>=400)){t.next=17;break}throw new Error(n.message);case 17:t.next=24;break;case 19:throw t.prev=19,t.t0=t.catch(7),_.a.isObject(n)||(n={message:t.t0.message}),w(a,n),t.t0;case 24:return t.abrupt("return",{status:a,data:n});case 25:case"end":return t.stop()}},t,f,[[7,19]])}));return function(i,e){return t.apply(this,arguments)}}();i.a=C},114:function(t,i,e){e(98);var a=e(9)(e(50),e(120),"data-v-426c7dda",null);t.exports=a.exports},115:function(t,i,e){e(97);var a=e(9)(e(51),e(119),"data-v-29302146",null);t.exports=a.exports},116:function(t,i,e){e(100);var a=e(9)(e(52),e(122),"data-v-b6a120fa",null);t.exports=a.exports},117:function(t,i,e){e(101);var a=e(9)(e(53),e(123),"data-v-d6722e82",null);t.exports=a.exports},118:function(t,i,e){e(99);var a=e(9)(e(54),e(121),"data-v-66479dfd",null);t.exports=a.exports},119:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"births"},[e("filter-bar",{model:{value:t.filter,callback:function(i){t.filter=i},expression:"filter"}}),t._v(" "),t.loading?e("div",{staticClass:"weui-loadmore"},[e("i",{staticClass:"weui-loading"}),t._v(" "),e("span",{staticClass:"weui-loadmore__tips"},[t._v("加载中...")])]):t.filteredItems&&t.filteredItems.length?e("div",{staticClass:"weui-panel weui-panel_access"},[e("div",{staticClass:"weui-panel__bd"},t._l(t.filteredItems,function(i){return e("router-link",{key:i.birthId,staticClass:"weui-media-box weui-media-box_appmsg",attrs:{to:{name:"detail",params:{birthId:i.birthId}}}},[e("div",{staticClass:"weui-media-box__hd",style:{"background-color":i.color}},[e("span",[t._v(t._s(i.title.slice(-1)))])]),t._v(" "),e("div",{staticClass:"weui-media-box__bd"},[e("h4",{staticClass:"weui-media-box__title"},[e("span",[t._v(t._s(i.title))]),t._v(" "),e("span",{staticClass:"countdown"},[i.info.countdown?e("span",[t._v(t._s(i.info.countdown))]):e("span",[t._v("今")]),t._v(" "),e("span",[t._v("天")])])]),t._v(" "),e("ul",{staticClass:"weui-media-box__info"},[e("li",{staticClass:"weui-media-box__info__meta"},[t._v("\n              "+t._s(""+i.info.month+i.info.day)+"\n            ")]),t._v(" "),e("li",{staticClass:"weui-media-box__info__meta"},[t._v(t._s(i.info.zodiac))]),t._v(" "),e("li",{staticClass:"weui-media-box__info__meta"},[t._v(t._s(i.info.constellation))]),t._v(" "),e("li",{staticClass:"weui-media-box__info__meta"},[0===i.info.countdown?e("span",[t._v(t._s(i.info.age)+" 岁")]):e("span",[t._v("后 "+t._s(i.info.age+1)+" 岁")])])])])])}))]):e("div",{staticClass:"weui-loadmore weui-loadmore_line"},[e("span",{staticClass:"weui-loadmore__tips"},[t._v("暂无数据")])])],1)},staticRenderFns:[]}},120:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"weui-search-bar",class:{"weui-search-bar_focusing":t.focusing||!!t.filter}},[e("form",{staticClass:"weui-search-bar__form",on:{submit:t.submit}},[e("div",{staticClass:"weui-search-bar__box"},[e("i",{staticClass:"weui-icon-search"}),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.filter,expression:"filter"}],ref:"input",staticClass:"weui-search-bar__input",attrs:{type:"search",placeholder:"搜索"},domProps:{value:t.filter},on:{blur:function(i){t.focusing=!1},input:[function(i){i.target.composing||(t.filter=i.target.value)},function(i){t.update(i.target.value)}]}}),t._v(" "),e("a",{staticClass:"weui-icon-clear",attrs:{href:"javascript:"},on:{click:t.clear}})]),t._v(" "),e("label",{staticClass:"weui-search-bar__label",attrs:{for:"search_input"},on:{click:function(i){t.focus()}}},[e("i",{staticClass:"weui-icon-search"}),t._v(" "),e("span",[t._v("搜索")])])]),t._v(" "),e("router-link",{staticClass:"weui-search-bar__cancel-btn",attrs:{to:{name:"add"}}},[e("i",{staticClass:"fa fa-plus fa-lg"})])],1)},staticRenderFns:[]}},121:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("div",{staticClass:"weui-cells__title"},[t._v("提醒信息")]),t._v(" "),e("div",{staticClass:"weui-cells weui-cells_form weui-panel__bd"},[e("div",{staticClass:"weui-cell",class:{"weui-cell_warn":t.isAdvanceError}},[t._m(0),t._v(" "),e("div",{staticClass:"weui-cell__bd"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.advance,expression:"advance"}],staticClass:"weui-input",attrs:{type:"number",placeholder:"请输入提前天数"},domProps:{value:t.advance},on:{input:function(i){i.target.composing||(t.advance=i.target.value)}}})]),t._v(" "),t.isLoading?e("div",{staticClass:"weui-cell__ft"},[e("i",{staticClass:"weui-loading"})]):t._e(),t._v(" "),t.isAdvanceError?e("div",{staticClass:"weui-cell__ft"},[e("i",{staticClass:"weui-icon-warn"})]):t._e()]),t._v(" "),e("div",{staticClass:"weui-cell"},[t._m(1),t._v(" "),e("div",{staticClass:"weui-cell__bd"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.time,expression:"time"}],staticClass:"weui-input",attrs:{type:"time",placeholder:"请输入提醒时间"},domProps:{value:t.time},on:{input:function(i){i.target.composing||(t.time=i.target.value)}}})]),t._v(" "),t.isLoading?e("div",{staticClass:"weui-cell__ft"},[e("i",{staticClass:"weui-loading"})]):t._e()])]),t._v(" "),e("div",{staticClass:"weui-btn-area"},[e("div",{staticClass:"weui-flex"},[e("div",{staticClass:"weui-flex__item"},[e("div",{staticClass:"weui-btn weui-btn_primary",class:{"weui-btn_disabled":!t.isValid,"weui-btn_loading":t.isValid&&(t.isSubmit||t.isRemove)},on:{click:function(i){t.submit()}}},[t.isSubmit?e("span",[e("i",{staticClass:"weui-loading"}),t._v(" 保存中\n          ")]):e("span",[t._v("保存")])])]),t._v(" "),t.settingId?e("div",{staticClass:"weui-flex__item"},[e("div",{staticClass:"weui-btn weui-btn_warn",class:{"weui-btn_loading":t.isSubmit||t.isRemove},on:{click:function(i){t.remove()}}},[t.isRemove?e("span",[e("i",{staticClass:"weui-loading"}),t._v(" 删除中\n          ")]):e("span",[t._v("删除")])])]):e("div",{staticClass:"weui-flex__item"},[e("router-link",{staticClass:"weui-btn weui-btn_default",class:{"weui-btn_loading":t.isSubmit},attrs:{to:{name:"detail"}}},[t._v("\n          返回\n        ")])],1)])])])},staticRenderFns:[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"weui-cell__hd"},[e("label",{staticClass:"weui-label"},[t._v("提前天数")])])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"weui-cell__hd"},[e("label",{staticClass:"weui-label"},[t._v("提醒时间")])])}]}},122:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("div",{staticClass:"head",style:{background:"url("+t.bgImg+") center"}},[e("div",{staticClass:"navbar"},[e("router-link",{staticClass:"back",attrs:{to:{name:"births"}}},[e("i",{staticClass:"fa fa-angle-left fa-lg"})]),t._v(" "),e("router-link",{staticClass:"edit",attrs:{to:{name:"edit"}}},[e("i",{staticClass:"fa fa-edit fa-lg"})])],1),t._v(" "),e("div",{staticClass:"avatar",style:{"background-color":t.birth.color||"#FFFFFF"}},[t.birthLoading?e("i",{staticClass:"weui-loading"}):e("span",[t._v(t._s(t.birth.title&&t.birth.title.slice(-1)||"日"))])]),t._v(" "),e("div",{staticClass:"title"},[t.birthLoading?e("i",{staticClass:"weui-loading"}):e("span",[t._v(t._s(t.birth.title||"生日"))])]),t._v(" "),e("div",{staticClass:"date"},[t.birthLoading?e("i",{staticClass:"weui-loading"}):e("span",[t._v("\n        "+t._s(t.birth.info.year+" "+t.birth.info.month+t.birth.info.day)+"\n      ")])])]),t._v(" "),e("div",{staticClass:"weui-cells detail"},[e("div",{staticClass:"weui-cell"},[t._m(0),t._v(" "),e("div",{staticClass:"weui-cell__ft"},[t.birthLoading?e("i",{staticClass:"weui-loading"}):e("span",[t._v(t._s((t.birth.info.age||0)+"岁"))])])]),t._v(" "),e("div",{staticClass:"weui-cell"},[t._m(1),t._v(" "),e("div",{staticClass:"weui-cell__ft"},[t.birthLoading?e("i",{staticClass:"weui-loading"}):e("span",[t._v(t._s(t.birth.info.zodiac||"无"))])])]),t._v(" "),e("div",{staticClass:"weui-cell"},[t._m(2),t._v(" "),e("div",{staticClass:"weui-cell__ft"},[t.birthLoading?e("i",{staticClass:"weui-loading"}):e("span",[t._v(t._s(t.birth.info.constellation||"无"))])])]),t._v(" "),e("div",{staticClass:"weui-cell"},[t._m(3),t._v(" "),e("div",{staticClass:"weui-cell__ft"},[t.birthLoading?e("i",{staticClass:"weui-loading"}):e("span",[t._v(t._s((t.birth.info.days||-1)+"天"))])])]),t._v(" "),e("div",{staticClass:"weui-cell"},[t._m(4),t._v(" "),e("div",{staticClass:"weui-cell__ft"},[t.birthLoading?e("i",{staticClass:"weui-loading"}):0===t.birth.info.countdown?e("span",[t._v("今天")]):e("span",[t._v(t._s((t.birth.info.countdown||-1)+"天"))])])])]),t._v(" "),e("div",{staticClass:"weui-cells__title"},[t._v("\n    提醒设置\n    "),e("router-link",{attrs:{to:{name:"setting-edit"}}},[e("i",{staticClass:"fa fa-plus fa-lg",staticStyle:{float:"right"}})])],1),t._v(" "),t.settingLoading?e("div",{staticClass:"weui-loadmore"},[e("i",{staticClass:"weui-loading"}),t._v(" "),e("span",{staticClass:"weui-loadmore__tips"},[t._v("正在加载")])]):t.setting&&t.setting.length?e("div",{staticClass:"weui-cells"},t._l(t.setting,function(i){return e("router-link",{key:i.settingId,staticClass:"weui-cell weui-cell_access",attrs:{to:{name:"setting-edit",params:{settingId:i.settingId}}}},[e("div",{staticClass:"weui-cell__bd"},[i.advance?e("p",[t._v(t._s("提前"+i.advance+"天"))]):e("p",[t._v("当天")])]),t._v(" "),e("div",{staticClass:"weui-cell__ft"},[t._v(t._s(i.time.substr(0,5)))])])})):e("div",{staticClass:"weui-loadmore weui-loadmore_line"},[e("span",{staticClass:"weui-loadmore__tips"},[t._v("暂无提醒")])])])},staticRenderFns:[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"weui-cell__bd"},[e("p",[t._v("年龄")])])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"weui-cell__bd"},[e("p",[t._v("生肖")])])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"weui-cell__bd"},[e("p",[t._v("星座")])])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"weui-cell__bd"},[e("p",[t._v("出生天数")])])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"weui-cell__bd"},[e("p",[t._v("生日倒计时")])])}]}},123:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("div",{staticClass:"weui-cells__title"},[t._v("生日信息")]),t._v(" "),e("div",{staticClass:"weui-cells weui-cells_form weui-panel__bd"},[e("div",{staticClass:"weui-cell"},[t._m(0),t._v(" "),e("div",{staticClass:"weui-cell__bd"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.color,expression:"color"}],staticClass:"weui-input",attrs:{type:"text",readonly:""},domProps:{value:t.color},on:{click:function(i){t.isColorPicker=!0},input:function(i){i.target.composing||(t.color=i.target.value)}}})]),t._v(" "),e("div",{staticClass:"weui-cell__ft"},[t.isLoading?e("i",{staticClass:"weui-loading"}):e("div",{staticClass:"color-show",style:{"background-color":t.color}})])]),t._v(" "),e("div",{staticClass:"weui-cell"},[t._m(1),t._v(" "),e("div",{staticClass:"weui-cell__bd"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],staticClass:"weui-input",attrs:{type:"text",placeholder:"请输入姓名"},domProps:{value:t.title},on:{input:function(i){i.target.composing||(t.title=i.target.value)}}})]),t._v(" "),t.isLoading?e("div",{staticClass:"weui-cell__ft"},[e("i",{staticClass:"weui-loading"})]):t._e()]),t._v(" "),e("div",{staticClass:"weui-cell weui-cell_select weui-cell_select-after"},[t._m(2),t._v(" "),e("div",{staticClass:"weui-cell__bd"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.type,expression:"type"}],staticClass:"weui-select",on:{change:function(i){var e=Array.prototype.filter.call(i.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.type=i.target.multiple?e:e[0]}}},[e("option",{attrs:{value:"SOLAR"}},[t._v("公历")]),t._v(" "),e("option",{attrs:{value:"LUNAR"}},[t._v("农历")])])])]),t._v(" "),e("div",{staticClass:"weui-cell",class:{"weui-cell_warn":t.isYearError}},[t._m(3),t._v(" "),e("div",{staticClass:"weui-cell__bd"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.year,expression:"year"}],staticClass:"weui-input",attrs:{type:"number",placeholder:"请输入年份"},domProps:{value:t.year},on:{input:function(i){i.target.composing||(t.year=i.target.value)}}})]),t._v(" "),t.isYearError?e("div",{staticClass:"weui-cell__ft"},[e("i",{staticClass:"weui-icon-warn"})]):t._e()]),t._v(" "),e("div",{staticClass:"weui-cell weui-cell_select weui-cell_select-after"},[t._m(4),t._v(" "),e("div",{staticClass:"weui-cell__bd"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.month,expression:"month"}],staticClass:"weui-select",on:{change:function(i){var e=Array.prototype.filter.call(i.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.month=i.target.multiple?e:e[0]}}},t._l(t.months,function(i,a){return e("option",{key:a,domProps:{value:a+1}},[t._v("\n            "+t._s(i)+"\n          ")])}))])]),t._v(" "),e("div",{staticClass:"weui-cell weui-cell_select weui-cell_select-after"},[t._m(5),t._v(" "),e("div",{staticClass:"weui-cell__bd"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.day,expression:"day"}],staticClass:"weui-select",on:{change:function(i){var e=Array.prototype.filter.call(i.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.day=i.target.multiple?e:e[0]}}},t._l(t.days,function(i,a){return e("option",{key:a,domProps:{value:a+1}},[t._v("\n            "+t._s(i)+"\n          ")])}))])])]),t._v(" "),e("div",{staticClass:"weui-btn-area"},[e("div",{staticClass:"weui-flex"},[e("div",{staticClass:"weui-flex__item"},[e("div",{staticClass:"weui-btn weui-btn_primary",class:{"weui-btn_disabled":!t.isValid,"weui-btn_loading":t.isValid&&(t.isSubmit||t.isRemove)},on:{click:function(i){t.submit()}}},[t.isSubmit?e("span",[e("i",{staticClass:"weui-loading"}),t._v(" 保存中\n          ")]):e("span",[t._v("保存")])])]),t._v(" "),t.birthId?e("div",{staticClass:"weui-flex__item"},[e("div",{staticClass:"weui-btn weui-btn_warn",class:{"weui-btn_loading":t.isSubmit||t.isRemove},on:{click:function(i){t.remove()}}},[t.isRemove?e("span",[e("i",{staticClass:"weui-loading"}),t._v(" 删除中\n          ")]):e("span",[t._v("删除")])])]):e("div",{staticClass:"weui-flex__item"},[e("router-link",{staticClass:"weui-btn weui-btn_default",class:{"weui-btn_loading":t.isSubmit},attrs:{to:{name:"births"}}},[t._v("\n          返回\n        ")])],1)])]),t._v(" "),e("swatches-picker",{directives:[{name:"show",rawName:"v-show",value:t.isColorPicker,expression:"isColorPicker"}],staticClass:"color-picker",attrs:{value:t.color},on:{input:t.updateColor}})],1)},staticRenderFns:[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"weui-cell__hd"},[e("label",{staticClass:"weui-label"},[t._v("背景色")])])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"weui-cell__hd"},[e("label",{staticClass:"weui-label"},[t._v("姓名")])])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"weui-cell__hd"},[e("label",{staticClass:"weui-label"},[t._v("类型")])])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"weui-cell__hd"},[e("label",{staticClass:"weui-label"},[t._v("年份")])])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"weui-cell__hd"},[e("label",{staticClass:"weui-label"},[t._v("月份")])])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"weui-cell__hd"},[e("label",{staticClass:"weui-label"},[t._v("日期")])])}]}},26:function(t,i,e){"use strict";var a=e(17),s=e.n(a);i.a={colors:["#FDBE53","#B590D2","#DA767C","#F88C96","#FED486","#FE966E","#FB7886","#61B8FA"],images:s.a.range(0,3).map(function(t){return"//cdn.qiujun.me/images/birthday/bg-"+t+".jpg!birthday"}),months:{solar:s.a.range(1,12).map(function(t){return t+"月"}),lunar:["正月","二月","三月","四月","五月","六月","七月","八月","九月","十月","冬月","腊月"]},days:{solar:["初一","初二","初三","初四","初五","初六","初七","初八","初九","初十","十一","十二","十三","十四","十五","十六","十七","十八","十九","二十","廿一","廿二","廿三","廿四","廿五","廿六","廿七","廿八","廿九","三十"],lunar:s.a.range(1,31).map(function(t){return t+"日"})}}},44:function(t,i,e){"use strict";var a=e(115),s=e.n(a),n=e(116),l=e.n(n),r=e(117),c=e.n(r),o=e(118),u=e.n(o),d={template:"<p>Page Not Found</p>"},v=" - 生日管家";i.a={routes:[{path:"/",name:"births",component:s.a,meta:{title:"列表"+v}},{path:"/add",name:"add",component:c.a,meta:{title:"添加"+v}},{path:"/:birthId",name:"detail",component:l.a,meta:{title:"详情"+v}},{path:"/:birthId/edit",name:"edit",component:c.a,meta:{title:"编辑"+v}},{path:"/:birthId/settings/:settingId?",name:"setting-edit",component:u.a,meta:{title:"提醒"+v}},{path:"*",component:d,meta:{title:"页面未找到"}}]}},45:function(t,i){},46:function(t,i){},49:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=e(46),s=(e.n(a),e(45)),n=(e.n(s),e(48)),l=e(47),r=e(44);n.a.use(l.a);var c=new l.a({routes:r.a.routes});c.beforeEach(function(t,i,e){document.title=t.meta.title||"",e()}),new n.a({el:"#app",router:c})},50:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={data:function(){return{filter:"",loading:!1,focusing:!1}},methods:{clear:function(){this.filter="",this.focus()},focus:function(){this.focusing=!0,this.$refs.input.focus()},submit:function(t){t.preventDefault()},update:function(t){this.$emit("input",t.trim())}}}},51:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=e(11),s=e(114),n=e.n(s);i.default={data:function(){return{filter:"",loading:!1,items:[]}},components:{FilterBar:n.a},created:function(){this.fetch()},methods:{fetch:function(){var t=this;this.loading=!0,e.i(a.a)("/api/births").then(function(i){var e=i.data;t.loading=!1,t.items=e}).catch(function(){t.loading=!1})}},computed:{filteredItems:function(){if(!this.filter||!this.items)return this.items;var t=new RegExp(this.filter);return this.items.filter(function(i){return i.title.match(t)||i.info.year.match(t)||i.info.month.match(t)||i.info.day.match(t)||i.info.constellation.match(t)||i.info.zodiac.match(t)||i.date.match(t)})}}}},52:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=e(17),s=e.n(a),n=e(11),l=e(26);i.default={data:function(){return{bgImg:s.a.sample(l.a.images),birth:{},setting:{},birthLoading:!1,settingLoading:!1}},computed:{birthId:function(){return this.$route.params.birthId}},created:function(){this.fetchBirth(),this.fetchSetting()},methods:{fetchBirth:function(){var t=this;this.birthLoading=!0,e.i(n.a)("/api/births/"+this.birthId).then(function(i){var e=i.data;t.birthLoading=!1,t.birth=e}).catch(function(){t.birthLoading=!1})},fetchSetting:function(){var t=this;this.settingLoading=!0,e.i(n.a)("/api/settings",{query:{birthId:this.birthId}}).then(function(i){var e=i.data;t.settingLoading=!1,t.setting=e}).catch(function(){t.settingLoading=!1})}}}},53:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=e(17),s=e.n(a),n=e(113),l=(e.n(n),e(11)),r=e(26);i.default={name:"edit",components:{"swatches-picker":n.Swatches},data:function(){return{color:s.a.sample(r.a.colors),title:"",type:"LUNAR",year:1990,month:1,day:1,isColorPicker:!1,isLoading:!1,isSubmit:!1,isRemove:!1}},computed:{birthId:function(){return this.$route.params.birthId},months:function(){return r.a.months[this.type.toLowerCase()]},days:function(){return r.a.days[this.type.toLowerCase()]},isYearError:function(){return this.year&&(isNaN(this.year)||this.year>2100||this.year<1900)},isValid:function(){return this.title&&this.type&&this.year&&!this.isYearError&&this.month&&this.day}},created:function(){this.birthId&&this.fetch()},methods:{format:function(t,i){return(s.a.repeat("0",i)+t).slice(-i)},fetch:function(){var t=this;this.isLoading=!0,e.i(l.a)("/api/births/"+this.birthId).then(function(i){var e=i.data;t.isLoading=!1,t.title=e.title,t.type=e.type,t.color=e.color;var a=e.date.split("-");t.year=Number(a[0]),t.month=Number(a[1]),t.day=Number(a[2])}).catch(function(){t.isLoading=!1})},submit:function(){var t=this;if(!this.isValid||this.isSubmit||this.isRemove)return!1;this.isSubmit=!0;var i="/api/births",a="POST";this.birthId&&(i="/api/births/"+this.birthId,a="PUT"),e.i(l.a)(i,{method:a,body:{title:this.title,type:this.type,date:this.year+"-"+this.format(this.month,2)+"-"+this.format(this.day,2),color:this.color}}).then(function(i){var e=i.data;t.isSubmit=!1,t.$router.push({name:"detail",params:{birthId:e.birthId}})}).catch(function(){t.isSubmit=!1})},remove:function(){var t=this;return!this.isSubmit&&!this.isRemove&&(!!confirm("你确定要删除当前生日信息吗?")&&(this.isRemove=!0,void e.i(l.a)("/api/births/"+this.birthId,{method:"DELETE"}).then(function(i){t.isRemove=!1,t.$router.push({name:"births"})}).catch(function(){t.isRemove=!1})))},updateColor:function(t){this.color=t.hex,this.isColorPicker=!1}}}},54:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=e(11);i.default={data:function(){return{advance:null,time:null,isLoading:!1,isSubmit:!1,isRemove:!1}},computed:{birthId:function(){return this.$route.params.birthId},settingId:function(){return this.$route.params.settingId},isAdvanceError:function(){return this.advance&&(isNaN(this.advance)||this.advance>365||this.advance<0)},isValid:function(){return!(0!==this.advance&&!this.advance)&&(!this.isAdvanceError&&this.time)}},created:function(){this.settingId&&this.fetch()},methods:{fetch:function(){var t=this;this.isLoading=!0,e.i(a.a)("/api/settings/"+this.settingId).then(function(i){var e=i.data;t.isLoading=!1,t.advance=e.advance,t.time=e.time}).catch(function(){t.isLoading=!1})},submit:function(){var t=this;if(!this.isValid||this.isSubmit||this.isRemove)return!1;this.isSubmit=!0;var i="/api/settings",s="POST";this.settingId&&(i="/api/settings/"+this.settingId,s="PUT"),e.i(a.a)(i,{method:s,body:{birthId:Number(this.birthId),advance:Number(this.advance),time:this.time}}).then(function(){t.isSubmit=!1,t.$router.push({name:"detail"})}).catch(function(){t.isSubmit=!1})},remove:function(){var t=this;return!this.isSubmit&&!this.isRemove&&(!!confirm("你确定要删除当前提醒信息吗?")&&(this.isRemove=!0,void e.i(a.a)("/api/settings/"+this.settingId,{method:"DELETE"}).then(function(){t.isRemove=!1,t.$router.push({name:"detail"})}).catch(function(){t.isRemove=!1})))}}}},97:function(t,i){},98:function(t,i){},99:function(t,i){}},[49]);
//# sourceMappingURL=app.b30391ffc257475fbfc5.js.map