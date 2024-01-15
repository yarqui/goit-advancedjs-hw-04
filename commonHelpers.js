import{a as y,i as u}from"./assets/vendor-86d8eb39.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const B="32117995-da98556d394b8c9b5a96c2a58",w="https://pixabay.com/api",f=40;let m=1,l;y.defaults.baseURL=w;const T=()=>{m+=1},A=()=>{m=1},P=()=>l,h=()=>m,b=async e=>{e&&l!==e?(A(),l=e):T();const n=new URLSearchParams({q:e||l,page:m,per_page:f,image_type:"photo",orientation:"horizontal",safesearch:!0,key:B});try{const{data:a,status:s}=await y.get(`/?${n}`);if(s===429)throw u.warning({message:"Too many requests. Limit exceeded. Try again later",position:"topCenter",timeout:8e3}),new Error("Too many requests. Limit exceeded. Try again later");return{...a,newQuery:e}}catch(a){console.error(a)}},L={hidden:"visually-hidden"},E={disabled:"disabled"},d=e=>{e.classList.remove(L.hidden)},c=e=>{e.classList.add(L.hidden)},q=e=>{e.removeAttribute(E.disabled)},v=e=>{e.setAttribute(E.disabled,"")},M=e=>Array.isArray(e)&&e.length>0,o={form:document.querySelector("form#search-form"),input:document.querySelector('input[name="searchQuery"]'),gallery:document.querySelector("div.gallery"),submitBtn:document.querySelector('button[type="submit"]'),loadMoreBtn:document.querySelector("button.load-more"),loader:document.querySelector("span.loader")},C=e=>{e.innerHTML=""},S=e=>M(e)&&e.map(n=>{const{webformatURL:a,largeImageURL:s,tags:t,likes:r,views:i,comments:p,downloads:g}=n;return`
    <li class="photo-card">
        <img src="${s}" alt="${t}" loading="lazy" />
        <div class="info">
            <p class="info-item">
                <b>Likes</b>
                ${r}
            </p>
            <p class="info-item">
                <b>Views</b>
                ${i}
            </p>
            <p class="info-item">
                <b>Comments</b>
                ${p}
            </p>
            <p class="info-item">
                <b>Downloads</b>
                ${g}
            </p>
         </div>
    </li>`}).join(""),R=e=>{const n=S(e);o.gallery.insertAdjacentHTML("beforeend",n)},k=e=>{e.target.value.length>=2?q(o.submitBtn):v(o.submitBtn)},$=async e=>{e.preventDefault();const a=e.target.elements.searchQuery.value.replace(/\s+/g," ").trim();o.form.reset(),v(o.submitBtn),c(o.loadMoreBtn),d(o.loader),C(o.gallery);try{const s=await b(a);if(c(o.loader),!s)return;const{hits:t,totalHits:r,newQuery:i}=s;if(!M(t)){u.warning({message:`Sorry, there are no images matching "${i}". Please try another search`,position:"topCenter",timeout:4e3});return}u.success({message:`Hooray! We found ${r} images.`,position:"topCenter",timeout:1500}),R(t);const p=h();r<p*f?c(o.loadMoreBtn):d(o.loadMoreBtn)}catch(s){console.log(s)}},O=async()=>{const e=P();c(o.loadMoreBtn),d(o.loader);const n=await b(e);if(c(o.loader),!n)return;const{hits:a,totalHits:s}=n,t=S(a);o.gallery.insertAdjacentHTML("beforeend",t);const r=h();if(s<r*f){setTimeout(()=>{u.warning({message:"We're sorry, but you've reached the end of search results.",position:"topCenter",timeout:3500})},1e3),c(o.loadMoreBtn);return}d(o.loadMoreBtn)};o.input.addEventListener("input",k);o.form.addEventListener("submit",$);o.loadMoreBtn.addEventListener("click",O);
//# sourceMappingURL=commonHelpers.js.map
