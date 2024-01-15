import{a as f,i as u,S as T}from"./assets/vendor-029e731f.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=a(o);fetch(o.href,n)}})();const S="32117995-da98556d394b8c9b5a96c2a58",M="https://pixabay.com/api",g=40;let m=1,d;f.defaults.baseURL=M;const C=()=>{m+=1},q=()=>{m=1},P=()=>d,y=()=>m,b=async e=>{e&&d!==e?(q(),d=e):C();const r=new URLSearchParams({q:e||d,page:m,per_page:g,image_type:"photo",orientation:"horizontal",safesearch:!0,key:S});try{const{data:a,status:s}=await f.get(`/?${r}`);if(s===429)throw u.warning({message:"Too many requests. Limit exceeded. Try again later",position:"topCenter",timeout:8e3}),new Error("Too many requests. Limit exceeded. Try again later");return{...a,newQuery:e}}catch(a){console.error(a)}},L={hidden:"visually-hidden"},w={disabled:"disabled"},c=e=>{e.classList.remove(L.hidden)},l=e=>{e.classList.add(L.hidden)},R=e=>{e.removeAttribute(w.disabled)},E=e=>{e.setAttribute(w.disabled,"")},v=e=>Array.isArray(e)&&e.length>0,t={form:document.querySelector("form#search-form"),input:document.querySelector('input[name="searchQuery"]'),gallery:document.querySelector("ul.gallery"),submitBtn:document.querySelector('button[type="submit"]'),loadMoreBtn:document.querySelector("button.load-more"),toTopBtn:document.querySelector(".scroll-top-button"),loader:document.querySelector("span.loader")},k=new T(".photo-link"),A=()=>{const{height:e}=t.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})},$=()=>{console.log("go to top"),window.scrollTo({top:0,behavior:"smooth"})},O=e=>{e.innerHTML=""},x=e=>v(e)&&e.map(r=>{const{webformatURL:a,largeImageURL:s,tags:o,likes:n,views:i,comments:p,downloads:h}=r;return`
        <li class="photo-card">
          <a class="photo-link" href="${s}">
            <img src="${a}" alt="${o}" loading="lazy" width="305" height="200" />
          </a>
          <div class="info">
              <p class="info-item">
                  <b>Likes</b>
                  ${n}
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
                  ${h}
              </p>
          </div>
          
    </li>`}).join(""),B=e=>{const r=x(e);t.gallery.insertAdjacentHTML("beforeend",r),k.refresh()},H=()=>{if(window.scrollY>=100){c(t.toTopBtn);return}l(t.toTopBtn)},I=e=>{e.target.value.length>=2?R(t.submitBtn):E(t.submitBtn)},U=async e=>{e.preventDefault();const a=e.target.elements.searchQuery.value.replace(/\s+/g," ").trim();t.form.reset(),E(t.submitBtn),l(t.loadMoreBtn),c(t.loader),O(t.gallery);try{const s=await b(a);if(l(t.loader),!s)return;const{hits:o,totalHits:n,newQuery:i}=s;if(!v(o)){u.warning({message:`Sorry, there are no images matching "${i}". Please try another search`,position:"topCenter",timeout:4e3});return}u.success({message:`Hooray! We found ${n} images.`,position:"topCenter",timeout:1500}),B(o);const p=y();n<p*g?l(t.loadMoreBtn):c(t.loadMoreBtn)}catch(s){console.log(s)}},V=async()=>{const e=P();l(t.loadMoreBtn),c(t.loader);const r=await b(e);if(l(t.loader),!r)return;const{hits:a,totalHits:s}=r;B(a),A();const o=y();if(s<o*g){setTimeout(()=>{u.warning({message:"We're sorry, but you've reached the end of search results.",position:"topCenter",timeout:3500})},1e3),l(t.loadMoreBtn);return}c(t.loadMoreBtn)};window.addEventListener("scroll",H);t.input.addEventListener("input",I);t.form.addEventListener("submit",U);t.loadMoreBtn.addEventListener("click",V);t.toTopBtn.addEventListener("click",$);
//# sourceMappingURL=commonHelpers.js.map
