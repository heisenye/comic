import{_ as S,a0 as E,n as F,T as R,p as N,a1 as V,e as d,V as C,c as n,a as s,b as m,x as _,j as k,m as p,y as w,z as T,G as b,H as f,a2 as M,a3 as I,a4 as U,r as v,o as a,W as B,D as O}from"./index-fo9mVYl1.js";const P={name:"Login-Register",components:{RouterLink:E,TheButton:F,TheIcon:R},setup(){const y=N(),t=V(),{setToken:L}=O,e=d(y.fullPath==="/login"),g=d(""),u=d(""),x=d(""),i=d(!1);return{isLogin:e,isSuccess:i,username:g,pwd:u,email:x,goHome:C,loginFn:async()=>{const l={username:g.value,pwd:u.value};for(const r in l)if(!l[r]){b({msg:f.INCOMPLETE_FORM,messageType:"info",popupType:"alert"});return}const c=await M(l);if(c&&c.code===200){t.setUser(c.data);const r=c.data.token;L(r),i.value=!0,b({msg:f.LOGIN_SUCCESS,messageType:"success",popupType:"toast",toastPos:["bottom","end"]}),setTimeout(()=>{y.name==="login"&&C()},2e3)}},registerFn:async()=>{const l={username:g.value,pwd:u.value};for(const r in l)if(!l[r]){b(f.INCOMPLETE_FORM);return}(await I(l)).code===200&&(i.value=!0,b({msg:f.REGISTER_SUCCESS,messageType:"success",popupType:"toast",toastPos:["bottom","end"]}),setTimeout(()=>{U()},1e3))}}}},z={class:"flex justify-center items-center h-screen"},j={class:"card bg-primary shadow-md shadow-neutral max-w-md w-4/5"},G={class:"card-body pb-6 pt-8 font-base"},H={class:"card-title my-4 tracking-wider whitespace-nowrap justify-between"},A={key:0,class:"text-lg md:text-xl"},D={key:1,class:"text-lg md:text-xl"},W={class:"md:space-y-4 lg:space-y-8"},q={class:"form-control"},J={for:"username",class:"label"},K={class:"label-text lg:text-base"},Q={key:0,class:"text-warning"},X={class:"form-control"},Y={for:"pwd",class:"label"},Z={class:"label-text lg:text-base"},$={key:0,class:"text-warning"},ee={key:0,class:"form-control"},se=s("label",{for:"email",class:"label"},[s("span",{class:"label-text"},[s("span",{class:"text-warning"},"*"),p("Email")])],-1),te={key:0,class:"label"},oe=s("a",{class:"label-text-alt link link-hover text-info"},"忘记密码?",-1),ne={key:1,class:"label"};function ae(y,t,L,e,g,u){const x=v("TheIcon"),i=v("TheButton"),h=v("RouterLink");return a(),n("main",z,[s("div",j,[s("div",G,[s("div",H,[m(i,{type:"secondary",size:"sm",class:"self-start",onClick:e.goHome},{default:_(()=>[m(x,{type:"house",class:"lg:text-lg"})]),_:1},8,["onClick"]),e.isLogin?(a(),n("span",A,"登入 MewAcg")):(a(),n("span",D,"注册 MewAcg")),m(i,{type:"accent",size:"sm",shape:"circle",class:"text-white"},{default:_(()=>[s("i",{class:B(["fa-solid text-base",{"fa-lock":!e.isSuccess,"fa-lock-open":e.isSuccess}])},null,2)]),_:1})]),s("div",W,[s("div",q,[s("label",J,[s("span",K,[e.isLogin?k("",!0):(a(),n("span",Q,"*")),p("用户名")])]),w(s("input",{id:"username","onUpdate:modelValue":t[0]||(t[0]=o=>e.username=o),type:"text",placeholder:"用户名",class:"input input-bordered bg-secondary border-accent focus:border-info lg:text-lg lg:py-6 font-Noto"},null,512),[[T,e.username]])]),s("div",X,[s("label",Y,[s("span",Z,[e.isLogin?k("",!0):(a(),n("span",$,"*")),p("密码")])]),w(s("input",{id:"pwd","onUpdate:modelValue":t[1]||(t[1]=o=>e.pwd=o),type:"password",placeholder:"密码",class:"input input-bordered bg-secondary border-accent focus:border-info lg:text-lg lg:py-6 font-Noto"},null,512),[[T,e.pwd]])]),e.isLogin?k("",!0):(a(),n("div",ee,[se,w(s("input",{id:"email","onUpdate:modelValue":t[2]||(t[2]=o=>e.email=o),type:"email",placeholder:"Email",class:"input input-bordered bg-secondary"},null,512),[[T,e.email]])]))]),e.isLogin?(a(),n("div",te,[oe,m(h,{to:{name:"register"},class:"label-text-alt link link-hover text-info"},{default:_(()=>[p("注册")]),_:1})])):(a(),n("div",ne,[m(h,{to:{name:"login"},class:"label-text-alt link link-hover text-info"},{default:_(()=>[p("登录")]),_:1})])),e.isLogin?(a(),n("button",{key:2,class:"btn btn-md btn-info text-base mb-4 md:mb-6 md:mt-4",onClick:t[3]||(t[3]=(...o)=>e.loginFn&&e.loginFn(...o))}," 登入 ")):(a(),n("button",{key:3,class:"btn btn-md btn-info text-base mb-4 md:mb-6",onClick:t[4]||(t[4]=(...o)=>e.registerFn&&e.registerFn(...o))}," 注册 "))])])])}const ie=S(P,[["render",ae]]);export{ie as default};
