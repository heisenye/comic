import{_ as S,S as E,n as F,T as R,u as N,U as V,f as r,J as C,r as k,c as n,a as s,b as d,v as _,k as w,s as m,x as v,O as T,A as b,C as f,V as U,W as I,X as M,o as a,M as B,z as O}from"./index-sGq5ztdf.js";const P={name:"Login-Register",components:{RouterLink:E,TheButton:F,TheIcon:R},setup(){const y=N(),t=V(),{setToken:L}=O(),e=r(y.fullPath==="/login"),p=r(""),g=r(""),x=r(""),i=r(!1);return{isLogin:e,isSuccess:i,username:p,pwd:g,email:x,goHome:C,loginFn:async()=>{const l={username:p.value,pwd:g.value};for(const c in l)if(!l[c]){b({msg:f.INCOMPLETE_FORM,messageType:"info",popupType:"alert"});return}const u=await U(l);if(u.code===200){t.setUser(u.data);const c=u.data.token;L(c),i.value=!0,b({msg:f.LOGIN_SUCCESS,messageType:"success",popupType:"toast",toastPos:["bottom","end"]}),setTimeout(()=>{y.name==="login"&&C()},2e3)}},registerFn:async()=>{const l={username:p.value,pwd:g.value};for(const c in l)if(!l[c]){b(f.INCOMPLETE_FORM);return}(await I(l)).code===200&&(i.value=!0,b({msg:f.REGISTER_SUCCESS,messageType:"success",popupType:"toast",toastPos:["bottom","end"]}),setTimeout(()=>{M()},1e3))}}}},z={class:"flex justify-center items-center h-screen"},H={class:"card bg-primary shadow-md shadow-neutral max-w-lg w-4/5"},j={class:"card-body pb-6 pt-8 font-base_2"},G={class:"card-title my-4 tracking-wider whitespace-nowrap justify-between"},A={key:0,class:"text-lg md:text-xl lg:text-2xl"},D={key:1,class:"text-lg md:text-xl lg:text-2xl"},J={class:"md:space-y-4 lg:space-y-6"},W={class:"form-control"},X={for:"username",class:"label"},q={class:"label-text"},K={key:0,class:"text-warning"},Q={class:"form-control"},Y={for:"pwd",class:"label"},Z={class:"label-text"},$={key:0,class:"text-warning"},ee={key:0,class:"form-control"},se=s("label",{for:"email",class:"label"},[s("span",{class:"label-text"},[s("span",{class:"text-warning"},"*"),m("Email")])],-1),te={key:0,class:"label"},oe=s("a",{class:"label-text-alt link link-hover text-info"},"忘记密码?",-1),ne={key:1,class:"label"};function ae(y,t,L,e,p,g){const x=k("TheIcon"),i=k("TheButton"),h=k("RouterLink");return a(),n("main",z,[s("div",H,[s("div",j,[s("div",G,[d(i,{type:"secondary",size:"sm",class:"self-start lg:btn-md",onClick:e.goHome},{default:_(()=>[d(x,{type:"house",class:"lg:text-lg"})]),_:1},8,["onClick"]),e.isLogin?(a(),n("span",A,"登入 Heisenye")):(a(),n("span",D,"注册 Heisenye")),d(i,{type:"accent",size:"sm",shape:"circle",class:"lg:btn-md text-white"},{default:_(()=>[s("i",{class:B(["fa-solid text-base",{"fa-lock":!e.isSuccess,"fa-lock-open":e.isSuccess}])},null,2)]),_:1})]),s("div",J,[s("div",W,[s("label",X,[s("span",q,[e.isLogin?w("",!0):(a(),n("span",K,"*")),m("用户名")])]),v(s("input",{id:"username","onUpdate:modelValue":t[0]||(t[0]=o=>e.username=o),type:"text",placeholder:"用户名",class:"input input-bordered bg-secondary border-accent focus:border-info lg:text-lg lg:py-6 font-Noto"},null,512),[[T,e.username]])]),s("div",Q,[s("label",Y,[s("span",Z,[e.isLogin?w("",!0):(a(),n("span",$,"*")),m("密码")])]),v(s("input",{id:"pwd","onUpdate:modelValue":t[1]||(t[1]=o=>e.pwd=o),type:"password",placeholder:"密码",class:"input input-bordered bg-secondary border-accent focus:border-info lg:text-lg lg:py-6 font-Noto"},null,512),[[T,e.pwd]])]),e.isLogin?w("",!0):(a(),n("div",ee,[se,v(s("input",{id:"email","onUpdate:modelValue":t[2]||(t[2]=o=>e.email=o),type:"email",placeholder:"Email",class:"input input-bordered bg-secondary"},null,512),[[T,e.email]])]))]),e.isLogin?(a(),n("div",te,[oe,d(h,{to:{name:"register"},class:"label-text-alt link link-hover text-info"},{default:_(()=>[m("注册")]),_:1})])):(a(),n("div",ne,[d(h,{to:{name:"login"},class:"label-text-alt link link-hover text-info"},{default:_(()=>[m("登录")]),_:1})])),e.isLogin?(a(),n("button",{key:2,class:"btn btn-md btn-info text-base mb-4 md:mb-6 md:mt-4",onClick:t[3]||(t[3]=(...o)=>e.loginFn&&e.loginFn(...o))}," 登入 ")):(a(),n("button",{key:3,class:"btn btn-md btn-info text-base mb-4 md:mb-6",onClick:t[4]||(t[4]=(...o)=>e.registerFn&&e.registerFn(...o))}," 注册 "))])])])}const ie=S(P,[["render",ae]]);export{ie as default};
