import{_ as I,d as S,C as k,f as d,H as z,I as E,h as B,J as C,B as L,r as i,o as g,c as w,F as y,j as M,b as n,K as R,a as r,t as b,A as N,T as W,m as $,L as P,w as p,s as V,k as D,M as A,N as U}from"./index-ec521c49.js";import{T as F}from"./TheModal-42f6dd9a.js";const j={50:"w-1/2",60:"w-3/5",70:"w-[70%]",80:"w-4/5",90:"w-[90%]",100:"w-full"},H={name:"TheRead",components:{TheImage:S},props:{pages:{type:Number,required:!0},imageWidth:{type:String,default:"100"}},setup(m){const c=k(),{id:u,chapter:e}=c.params,l=d(0),h=d("0"),o=Array.from({length:m.pages},(a,v)=>`${v+1}.webp`),s=d([]),t=()=>{const a=new Date;l.value=a.getHours(),h.value=a.getMinutes().toString().padStart(2,"0")};t(),setInterval(t,2e4);const f=z(()=>j[m.imageWidth]),_=d("p1");E(_,a=>{localStorage.setItem(`${u}-${e}`,String(a))});const x=new IntersectionObserver((a,v)=>{a.forEach(T=>{T.intersectionRatio===1&&(_.value=T.target.id)})},{threshold:1});return B(()=>{s.value.forEach(a=>{x.observe(a)})}),C(()=>{s.value.forEach(a=>{x.unobserve(a)})}),{BASE_URL:L,comicPageList:o,id:u,chapter:e,hours:l,minutes:h,imageWidthClass:f,comicPages:s}}},q=["id"],J={class:"fixed bottom-0 left-0 px-2 rounded bg-black opacity-80 text-sm text-white"};function K(m,c,u,e,l,h){const o=i("TheImage");return g(),w(y,null,[(g(!0),w(y,null,M(e.comicPageList,(s,t)=>(g(),w("div",{ref_for:!0,ref:"comicPages",key:s,class:"relative mx-auto top-20 px-4 my-3 max-w-lg",id:`p${t+1}`},[n(o,{src:`${e.BASE_URL}/${e.id}/${e.chapter}/${s}`,lazy:!0,class:R([e.imageWidthClass,"mx-auto"])},null,8,["src","class"])],8,q))),128)),r("span",J,b(e.hours)+":"+b(e.minutes),1)],64)}const O=I(H,[["render",K]]),Y={name:"ReadView",components:{TheRead:O,TheNavigation:N,TheImage:S,TheIcon:W,TheButton:$,TheModal:F},setup(){const m=k(),{id:c,chapter:u}=m.params,e=d(0),l=d(!1),h=d("100");let o=0;const s=()=>{const t=window.scrollY;t-o>0?l.value=!0:l.value=!1,o=t};return B(async()=>{try{const t=await P(c,u);e.value=t.data.pages}catch(t){console.error(t)}window.addEventListener("scroll",s)}),C(()=>{window.removeEventListener("scroll",s)}),{pages:e,isScrollingDown:l,imageWidth:h}}},G={class:"relative"},Q=r("div",{class:"w-full flex justify-between text-xs px-1"},[r("span",null,"|"),r("span",null,"|"),r("span",null,"|"),r("span",null,"|"),r("span",null,"|"),r("span",null,"|")],-1);function X(m,c,u,e,l,h){const o=i("TheIcon"),s=i("router-link"),t=i("TheButton"),f=i("TheModal"),_=i("TheNavigation"),x=i("TheRead");return g(),w("main",G,[n(_,{class:R([{"-translate-y-16":e.isScrollingDown},"z-50 transition-all shadow-md shadow-primary duration-500"])},{left:p(()=>[n(s,{to:{name:"book"},class:"relative btn btn-ghost text-white",replace:""},{default:p(()=>[n(o,{type:"arrow-left",size:"lg",class:"xl:text-xl 2xl:text-2xl"})]),_:1})]),right:p(()=>[n(t,{type:"ghost",shape:"circle",size:"md",onclick:"document.getElementById('resizeImage').showModal()"},{default:p(()=>[n(o,{type:"magnifying-glass-plus",size:"lg",class:"xl:text-xl 2xl:text-2xl text-white"})]),_:1}),n(f,{id:"resizeImage",class:"fixed top-0"},{default:p(()=>[A(r("input",{type:"range",min:"50",max:"100",value:"100",step:"10",class:"range range-info range-xs","onUpdate:modelValue":c[0]||(c[0]=a=>e.imageWidth=a)},null,512),[[U,e.imageWidth]]),Q]),_:1}),n(s,{to:{name:"home"},class:"relative btn btn-ghost btn-circle text-white"},{default:p(()=>[n(o,{type:"house",size:"lg",class:"xl:text-xl 2xl:text-2xl"})]),_:1})]),_:1},8,["class"]),e.pages?(g(),V(x,{key:0,pages:e.pages,"image-width":e.imageWidth},null,8,["pages","image-width"])):D("",!0)])}const te=I(Y,[["render",X]]);export{te as default};