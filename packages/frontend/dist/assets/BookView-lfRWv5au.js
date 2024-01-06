import{_ as F,l as R,T as E,d as A,m as S,e as w,n as L,p as M,f as D,q as U,B as q,r as i,o as d,c as b,a as t,s as N,b as s,t as l,v as a,F as C,i as I,k as B,x as r,y as H,z as j,A as K,C as k,D as T,E as G,G as J,H as Q,I as W,J as X,K as Y}from"./index-xdpmMOr-.js";import{T as Z}from"./TheModal-nI6D07IQ.js";const $={name:"TheBook",components:{TheButton:R,TheIcon:E,TheImage:A,TheModal:Z},props:{comic:{type:Object,required:!0}},setup(x){const n=S(),{comic:m}=x,{token:e}=K(),p=w(!1),v=w(n.meta.isProgressRemembered);L(v,f=>{localStorage.setItem("isProgressRemembered",String(f)),n.meta.isProgressRemembered=f});const{name:_,_id:o,coverImage:u,updatedAt:h,chapters:g,author:c,tags:O,description:P,status:V}=m,{viewCount:z,favoriteCount:y}=M(m);return D(async()=>{if(!e.value)return;(await U(o)).data&&(p.value=!0)}),{BASE_URL:q,isFavorited:p,isProgressRemembered:v,id:o,coverImage:u,name:_,date:h,viewCount:z,favoriteCount:y,chapters:g,author:c,tags:O,description:P,status:V,addOrDeleteFavoriteFn:async()=>{if(!e.value){k({msg:T.NO_TOKEN,messageType:"info",popupType:"alert"});return}p.value?(await G(o)).code===200&&(p.value=!1,y.value--,k({msg:T.DELETE_FAVORITE_SUCCESS,messageType:"success",popupType:"toast",toastPos:["end","bottom"]})):(await J({id:o})).code===200&&(p.value=!0,y.value++,k({msg:T.ADD_FAVORITE_SUCCESS,messageType:"success",popupType:"toast",toastPos:["start","bottom"]}))}}}},ee={class:"relative w-full top-20 px-3 sm:px-4 md:px-6 lg:px-4"},te={class:"relative w-full mx-auto card rounded max-w-3xl bg-primary lg:card-side lg:py-4"},se={key:0,class:"absolute bookmark border-[32px] -left-4 -top-4 xl:border-[40px]"},oe=t("p",{class:"absolute -left-6 -top-6 text-warning-content xl:text-lg font-base font-extrabold"}," 完结 ",-1),ae=[oe],ne={class:"relative flex items-center justify-center pb-6 pt-8 md:px-3 lg:px-0 xl:px-4 lg:w-3/5"},ce={class:"card-body pt-4 md:pt-6 px-6 md:px-10 lg:px-4 rounded-b-xl xl:text-lg"},le={class:"card-title text-2xl self-center pb-2 font-base font-extrabold text-white"},ie={class:"text-accent opacity-80"},re=t("i",{class:"fa-solid fa-eye"},null,-1),de=t("i",{class:"fa-solid fa-heart"},null,-1),me=t("i",{class:"fa-solid fa-book"},null,-1),pe={class:"text-white font-base"},_e={class:"btn btn-sm btn-secondary"},ue={class:"space-x-1.5 text-white font-base"},xe={class:"text-white font-base"},he={class:"opacity-80"},ge=t("h3",{class:"font-base text-lg mx-auto"},"章节",-1),fe={class:"flex items-center"},be=t("label",{for:"progress",class:"mr-6"},"是否记忆阅读进度",-1),ve={class:"grid grid-cols-4 gap-x-6 place-items-center"};function ye(x,n,m,e,p,v){const _=i("TheImage"),o=i("TheButton"),u=i("TheIcon"),h=i("TheModal"),g=i("RouterLink");return d(),b("main",ee,[t("div",te,[e.status==="completed"?(d(),b("div",se,ae)):N("",!0),t("div",ne,[s(_,{src:`${e.BASE_URL}/${e.id}/${e.coverImage.chapter}/${e.coverImage.page}.webp`,class:"rounded-lg w-3/5 lg:rounded-lg h-fit"},null,8,["src"])]),t("div",ce,[t("h1",le,l(e.name),1),t("div",ie,[t("span",null,l(new Date(e.date).toLocaleDateString()),1),a("  |  "),re,a("  "),t("span",null,l(e.viewCount),1),a("  "),de,a("  "),t("span",null,l(e.favoriteCount),1),a("  |  "),me,a("  "),t("span",null,l(e.chapters),1)]),t("div",pe,[a(" 作者："),t("button",_e,l(e.author),1)]),t("div",ue,[a(" 标签： "),(d(!0),b(C,null,I(e.tags,c=>(d(),B(o,{key:c,type:"secondary",size:"sm"},{default:r(()=>[a(l(c),1)]),_:2},1024))),128))]),t("div",xe,[a(" 简介："),t("span",he,l(e.description),1)]),s(o,{type:"error",class:"w-32 lg:w-28 xl:w-32 mx-auto my-3",onClick:e.addOrDeleteFavoriteFn},{default:r(()=>[s(u,{type:"heart",class:"text-lg lg:text-md xl:text-lg text-white",variant:e.isFavorited?"solid":"regular"},null,8,["variant"])]),_:1},8,["onClick"]),ge,t("div",null,[s(o,{type:"secondary",size:"sm",shape:"square",class:"block mx-auto",onclick:"document.getElementById('settings').showModal()"},{default:r(()=>[s(u,{type:"gear",class:"text-success"})]),_:1})]),s(h,{id:"settings",class:"bg-primary font-base"},{default:r(()=>[t("div",fe,[be,H(t("input",{type:"checkbox",id:"progress",value:"true","onUpdate:modelValue":n[0]||(n[0]=c=>e.isProgressRemembered=c),class:"checkbox checkbox-xs checkbox-success"},null,512),[[j,e.isProgressRemembered]])])]),_:1}),t("div",ve,[(d(!0),b(C,null,I(e.chapters,c=>(d(),B(g,{key:c,to:{name:"read",params:{id:e.id,chapter:c}},class:"btn btn-sm btn-secondary w-12",replace:""},{default:r(()=>[a(l(c),1)]),_:2},1032,["to"]))),128))])])])])}const ke=F($,[["render",ye]]),Te={name:"BookView",components:{TheBook:ke,TheNavigation:Q,TheButton:R,TheIcon:E},setup(){const x=S(),{id:n}=x.params,m=w(null);return D(async()=>{const e=await W(n);e.code===200&&(m.value=e.data)}),{comic:m,goBack:X,goHome:Y}}},we=t("span",{class:"text-xl 2xl:text-2xl 2xl:tracking-wider"},"<  Back",-1),Be=[we],Ce={class:"nav-input-container"},Ie=t("input",{type:"text",placeholder:"搜索标题或标签",class:"nav-input"},null,-1);function Fe(x,n,m,e,p,v){const _=i("TheIcon"),o=i("TheButton"),u=i("TheNavigation"),h=i("TheBook");return d(),b("main",null,[s(u,{class:"z-50"},{left:r(()=>[t("div",{class:"text-white btn btn-ghost tracking-wider font-medium text-lg px-4",onClick:n[0]||(n[0]=(...g)=>e.goBack&&e.goBack(...g))},Be)]),right:r(()=>[t("div",Ce,[Ie,s(_,{type:"magnifying-glass",class:"absolute left-4"})]),s(o,{type:"ghost",size:"md",shape:"circle",class:"lg:hidden btn-md text-white"},{default:r(()=>[s(_,{type:"magnifying-glass",class:"text-base sm:text-lg xl:text-xl 2xl:text-2xl lg:hidden"})]),_:1}),s(o,{type:"ghost",size:"md",shape:"circle",class:"btn-md text-white",onClick:e.goHome},{default:r(()=>[s(_,{type:"house",class:"text-base sm:text-lg xl:text-xl 2xl:text-2xl"})]),_:1},8,["onClick"])]),_:1}),e.comic?(d(),B(h,{key:0,comic:e.comic,class:"z-0"},null,8,["comic"])):N("",!0)])}const De=F(Te,[["render",Fe]]);export{De as default};
