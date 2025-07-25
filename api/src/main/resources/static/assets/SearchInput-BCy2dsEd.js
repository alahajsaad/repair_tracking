import{c as d,r as t,j as r}from"./index-yGwYt6Nq.js";import{I as p}from"./Input-BljE3152.js";/**
 * @license lucide-react v0.484.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],f=d("loader-circle",x);/**
 * @license lucide-react v0.484.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]],j=d("search",b),S=(e,c=500)=>{const[a,n]=t.useState(e);return t.useEffect(()=>{const s=setTimeout(()=>{n(e)},c);return()=>clearTimeout(s)},[e,c]),a},I=({setSearchKey:e,isPending:c,label:a,onfocus:n,value:s,placeholder:o})=>{const[u,i]=t.useState(""),l=S(u,300);t.useEffect(()=>{i(s||"")},[s]),t.useEffect(()=>{e(l)},[l,e]);const h=m=>{i(m.target.value)};return r.jsx(p,{onChange:h,value:u,placeholder:o||"Rechercher ...","aria-label":"search-input",label:a,onFocus:n,Icon:j,children:r.jsx("div",{className:"absolute inset-y-0 right-3 flex items-center text-gray-500",children:c?r.jsx(f,{className:"animate-spin"}):null})})};export{I as S};
