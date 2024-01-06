import{_ as I,d as S,m as k,e as d,L as z,n as C,f as B,M,B as E,r as i,o as g,c as f,F as y,i as L,b as n,N as R,a as l,t as b,H as N,T as W,l as P,O as $,x as p,k as V,s as D,y as U,P as A}from"./index-xdpmMOr-.js";import{T as F}from"./TheModal-nI6D07IQ.js";const H={50:"w-1/2",60:"w-3/5",70:"w-[70%]",80:"w-4/5",90:"w-[90%]",100:"w-full"},O={name:"TheRead",components:{TheImage:S},props:{pages:{type:Number,required:!0},imageWidth:{type:String,default:"100"}},setup(m){const c=k(),{id:u,chapter:e}=c.params,r=d(0),h=d("0"),o=Array.from({length:m.pages},(t,v)=>`${v+1}.webp`),a=d([]),s=()=>{const t=new Date;r.value=t.getHours(),h.value=t.getMinutes().toString().padStart(2,"0")};s(),setInterval(s,2e4);const w=z(()=>H[m.imageWidth]),x=d("p1");C(x,t=>{localStorage.setItem(`${u}-${e}`,String(t))});const _=new IntersectionObserver((t,v)=>{t.forEach(T=>{T.intersectionRatio===1&&(x.value=T.target.id)})},{threshold:1});return B(()=>{a.value.forEach(t=>{_.observe(t)})}),M(()=>{a.value.forEach(t=>{_.unobserve(t)})}),{BASE_URL:E,comicPageList:o,id:u,chapter:e,hours:r,minutes:h,imageWidthClass:w,comicPages:a}}},j=["id"],q={class:"fixed bottom-0 left-0 px-2 rounded bg-black opacity-80 text-sm text-white"};function Y(m,c,u,e,r,h){const o=i("TheImage");return g(),f(y,null,[(g(!0),f(y,null,L(e.comicPageList,(a,s)=>(g(),f("div",{ref_for:!0,ref:"comicPages",key:a,class:"relative mx-auto top-20 px-4 my-3 max-w-xl",id:`p${s+1}`},[n(o,{src:`${e.BASE_URL}/${e.id}/${e.chapter}/${a}`,lazy:!0,class:R([e.imageWidthClass,"mx-auto"])},null,8,["src","class"])],8,j))),128)),l("span",q,b(e.hours)+":"+b(e.minutes),1)],64)}const G=I(O,[["render",Y]]),J={name:"ReadView",components:{TheRead:G,TheNavigation:N,TheImage:S,TheIcon:W,TheButton:P,TheModal:F},setup(){const m=k(),{id:c,chapter:u}=m.params,e=d(0),r=d(!1),h=d("100");let o=0;const a=()=>{const s=window.scrollY;console.log(s),s-o>0?r.value=!0:r.value=!1,o=s};return B(async()=>{const s=await $(c,u);e.value=s.data.pages,window.addEventListener("scroll",a)}),M(()=>{window.removeEventListener("scroll",a)}),{pages:e,isScrollingDown:r,imageWidth:h}}},K={class:"relative"},Q=l("div",{class:"w-full flex justify-between text-xs px-1"},[l("span",null,"|"),l("span",null,"|"),l("span",null,"|"),l("span",null,"|"),l("span",null,"|"),l("span",null,"|")],-1);function X(m,c,u,e,r,h){const o=i("TheIcon"),a=i("router-link"),s=i("TheButton"),w=i("TheModal"),x=i("TheNavigation"),_=i("TheRead");return g(),f("main",K,[n(x,{class:R([{"-translate-y-16":e.isScrollingDown},"z-50 transition-all shadow-md shadow-primary duration-500"])},{left:p(()=>[n(a,{to:{name:"book"},class:"relative btn btn-ghost text-white",replace:""},{default:p(()=>[n(o,{type:"arrow-left",size:"lg",class:"xl:text-xl 2xl:text-2xl"})]),_:1})]),right:p(()=>[n(s,{type:"ghost",shape:"circle",size:"md",onclick:"document.getElementById('resizeImageModal').showModal()"},{default:p(()=>[n(o,{type:"magnifying-glass-plus",size:"lg",class:"xl:text-xl 2xl:text-2xl text-white"})]),_:1}),n(w,{id:"resizeImageModal",class:"fixed top-8"},{default:p(()=>[U(l("input",{type:"range",min:"50",max:"100",value:"100",step:"10",class:"range range-info range-xs","onUpdate:modelValue":c[0]||(c[0]=t=>e.imageWidth=t)},null,512),[[A,e.imageWidth]]),Q]),_:1}),n(a,{to:{name:"home"},class:"relative btn btn-ghost btn-circle text-white"},{default:p(()=>[n(o,{type:"house",size:"lg",class:"xl:text-xl 2xl:text-2xl"})]),_:1})]),_:1},8,["class"]),e.pages?(g(),V(_,{key:0,pages:e.pages,"image-width":e.imageWidth},null,8,["pages","image-width"])):D("",!0)])}const te=I(J,[["render",X]]);export{te as default};
