(self.webpackChunkfe_proj=self.webpackChunkfe_proj||[]).push([[143],{5082:function(e,n,t){"use strict";var r=t(7294),c=t(3935),o=t(1570),a=t(3727),i=t(710),s=t(7484),u=t.n(s),l=(t(3852),(0,t(8764).B)({colors:{brand:{200:"#68d391",500:"#2f855a"}},styles:{global:{body:{fontFamily:"Rubik, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"}}}})),p=(t(2222),t(8674),t(1539),t(9669)),m=t.n(p),f=t(980),d=(0,f.createStandaloneToast)();t(9554),t(4747);var b=t(3277),v=t(3492);function h(){var e=(0,v.e)();return r.createElement("div",{className:e("app-header-container")},r.createElement("div",{className:e("menu-container")},r.createElement(a.rU,{to:"/",className:e("menu-link")},"Home"),r.createElement(a.rU,{to:"/projects",className:e("menu-link")},"Projects"),r.createElement("a",{className:e("menu-link"),href:"https://github.com/StephanieTM",target:"_blank",rel:"noopener noreferrer"},"GitHub")))}t(1249),t(9254);var y=t(5977);function E(e){var n=e.routes,t=(0,v.e)(),c=r.createElement("div",{className:t("app-body-spinner")},r.createElement(f.Spinner,{thickness:"4px",speed:"0.65s",emptyColor:"brand.200",color:"brand.500",size:"lg"}));return r.createElement("div",{className:t("app-body-container")},r.createElement("div",{className:t("app-body-content")},r.createElement("div",{className:t("app-body-route")},r.createElement(r.Suspense,{fallback:c},r.createElement(y.rs,null,n.map((function(e){return e.component&&e.link?r.createElement(y.AW,{key:e.link,exact:!0,path:e.link,component:(0,r.lazy)(e.component)}):null})))))))}function k(){var e,n=(e=b._,function n(){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:e).forEach((function(e){e.children?t.concat(n(e.children,t)):t.push(e)})),t}());return r.createElement("div",{className:"app-container"},r.createElement(h,null),r.createElement(E,{routes:n}))}var g=t(6957);m().interceptors.response.use((function(e){return e.data}),(function(e){return!0!==e.response.config.headers.silent&&(404===e.response.status?d({status:"error",description:"".concat(e.response.status,", ").concat(e.response.config.url," not found.")}):d({status:"error",description:e.response.data.message||e.response.data.error||e.response.data})),Promise.reject(e)})),u().locale("zh-cn");var j=(0,o.w)((function(){return r.createElement(g.Z.Provider,null,r.createElement(i.x,{theme:l},r.createElement(a.VK,null,r.createElement(k,null))))}));c.render(r.createElement(j,null),document.getElementById("app"))},6957:function(e,n,t){"use strict";t.d(n,{Z:function(){return f}});var r=t(3391),c=t(7294),o=t(1852),a=t(7186),i=t(3277),s=(t(7941),t(2526),t(5003),t(9554),t(4747),t(9337),t(3321),t(9070),t(7042),t(1539),t(8309),t(1038),t(8783),t(1817),t(2165),t(6992),t(3948),t(9753),t(6156)),u=t(1253);t(9254),t(1249),t(7327),t(2772),t(2222);function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function p(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=0;n<e.length;n+=1){var t=e[n];if(t.link)return t.link;var r=p(t.children);if(r)return r}return""}var m=i._.filter((function(e){return e.children&&e.children.length&&!e.hideInMenu})).map((function(e){var n=e.children,t=(0,u.Z)(e,["children"]);return function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){(0,s.Z)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}({link:p(n),menus:n||[],key:t.code,code:t.code},t)}));var f=(0,a.f)((function(){var e=(0,o.useMediaQuery)({query:"(max-width: 540px)"}),n=(0,c.useMemo)((function(){return m}),[]),t=(0,c.useState)(n[0]||{}),a=(0,r.Z)(t,2),i=a[0],s=a[1],u=(0,c.useState)(!1),l=(0,r.Z)(u,2),p=l[0],f=l[1];return{apps:n,menus:(0,c.useMemo)((function(){return i.menus||[]}),[i]),currentApp:i,setCurrentApp:s,appDrawerVisible:p,setAppDrawerVisible:f,isMobile:e}}))},3277:function(e,n,t){"use strict";t.d(n,{_:function(){return r}});t(8674),t(1539),t(8783),t(6992),t(3948);var r=[{title:"Home",code:"home",link:"/",component:function(){return t.e(654).then(t.bind(t,4745))}},{title:"Projects",code:"projects",link:"/projects",component:function(){return Promise.all([t.e(533),t.e(353)]).then(t.bind(t,2353))}}]},3492:function(e,n,t){"use strict";t.d(n,{e:function(){return o}});t(2222);var r=t(7294),c=t(6957);function o(){var e=c.Z.useContainer().isMobile;return(0,r.useCallback)((function(n){return"".concat(n," ").concat(n,"-").concat(e?"mobile":"pc")}),[e])}}},function(e){"use strict";var n=function(n){return e(e.s=n)};e.O(void 0,[935,748],(function(){return n(3658),n(5082)}))}]);