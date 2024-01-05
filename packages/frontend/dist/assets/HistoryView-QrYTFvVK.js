import{_,g as y,d as u,e as f,f as g,h,i as x,B as w,r as v,c as a,F as d,j as b,o as i,b as k,a as m,t as C,k as S}from"./index-kdzE5Ak-.js";const V={name:"HistoryView",methods:{goBook:y},components:{TheImage:u},setup(){const c=f(),r=g(null),l=s=>{const e=new Set(JSON.parse(localStorage.getItem("history")));e.delete(s);const o=r.value.find(n=>n._id===s);o&&(o.isVisible=!1),localStorage.setItem("history",JSON.stringify(Array.from(e)))};return h(async()=>{const s=await x(c);if(s.code===200){const e=s.data;if(typeof e=="object"&&!Array.isArray(e)){e.isVisible=!0,r.value=[e];return}e.forEach(o=>o.isVisible=!0),r.value=e}}),{BASE_URL:w,historyComics:r,removeHistory:l}}},B={class:"relative top-40 mx-auto w-full max-w-screen-2xl min-w-[300px] px-1 space-y-4 text-white"},I={key:0,class:"w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 card inline-flex px-3 lg:px-2.5 indicator"},H=["onClick"],$={class:"card-body text-center bg-primary rounded-b-2xl font-base_2 py-6 px-0 whitespace-nowrap"};function A(c,r,l,s,e,o){const n=v("TheImage");return i(),a("main",B,[(i(!0),a(d,null,b(s.historyComics,t=>(i(),a(d,{key:t._id},[t.isVisible?(i(),a("div",I,[k(n,{class:"cursor-pointer",src:`${s.BASE_URL}/${t._id}/${t.coverImage.chapter}/${t.coverImage.page}.webp`,onClick:p=>o.goBook(t._id)},null,8,["src","onClick"]),m("i",{class:"indicator-item cursor-pointer fa-solid fa-circle-xmark absolute right-2",onClick:p=>s.removeHistory(t._id)},null,8,H),m("div",$,C(t.name),1)])):S("",!0)],64))),128))])}const E=_(V,[["render",A]]);export{E as default};