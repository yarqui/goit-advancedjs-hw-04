import{a as f,i as l}from"./assets/vendor-86d8eb39.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();const w="32117995-da98556d394b8c9b5a96c2a58",M="https://pixabay.com/api",m=40;let u=1,c;f.defaults.baseURL=M;const T=()=>{u+=1},A=()=>{u=1},P=()=>c,g=()=>u,y=async e=>{e&&c!==e?(A(),c=e):T();const n=new URLSearchParams({q:e||c,page:u,per_page:m,image_type:"photo",orientation:"horizontal",safesearch:!0,key:w});try{const{data:a,status:s}=await f.get(`/?${n}`);if(s===429)throw l.warning({message:"Too many requests. Limit exceeded. Try again later",position:"topCenter",timeout:8e3}),new Error("Too many requests. Limit exceeded. Try again later");return{...a,newQuery:e}}catch(a){console.error(a)}},h={hidden:"visually-hidden"},b={disabled:"disabled"},B=e=>{e.classList.remove(h.hidden)},L=e=>{e.classList.add(h.hidden)},C=e=>{e.removeAttribute(b.disabled)},E=e=>{e.setAttribute(b.disabled,"")},v=e=>Array.isArray(e)&&e.length>0,r={form:document.querySelector("form#search-form"),input:document.querySelector('input[name="searchQuery"]'),gallery:document.querySelector("div.gallery"),submitBtn:document.querySelector('button[type="submit"]'),loadMoreBtn:document.querySelector("button.load-more")},q=e=>{e.innerHTML=""},S=e=>v(e)&&e.map(n=>{const{webformatURL:a,largeImageURL:s,tags:t,likes:o,views:i,comments:d,downloads:p}=n;return`
    <li class="photo-card">
        <img src="${s}" alt="${t}" loading="lazy" />
        <div class="info">
            <p class="info-item">
                <b>Likes</b>
                ${o}
            </p>
            <p class="info-item">
                <b>Views</b>
                ${i}
            </p>
            <p class="info-item">
                <b>Comments</b>
                ${d}
            </p>
            <p class="info-item">
                <b>Downloads</b>
                ${p}
            </p>
         </div>
    </li>`}).join(""),R=e=>{const n=S(e);q(r.gallery),r.gallery.insertAdjacentHTML("beforeend",n)},k=e=>{e.target.value.length>=2?C(r.submitBtn):E(r.submitBtn)},$=async e=>{e.preventDefault();const a=e.target.elements.searchQuery.value.replace(/\s+/g," ").trim();r.form.reset(),E(r.submitBtn);try{const s=await y(a);if(!s)return;const{hits:t,totalHits:o,newQuery:i}=s;if(!v(t)){l.warning({message:`Sorry, there are no images matching "${i}". Please try another search`,position:"topCenter",timeout:4e3});return}l.success({message:`Hooray! We found ${o} images.`,position:"topCenter",timeout:1500}),R(t);const d=g();o<d*m?L(r.loadMoreBtn):B(r.loadMoreBtn)}catch(s){console.log(s)}},O=async()=>{const e=P(),n=await y(e);if(!n)return;const{hits:a,totalHits:s}=n,t=S(a);r.gallery.insertAdjacentHTML("beforeend",t);const o=g();s<o*m&&(setTimeout(()=>{l.warning({message:"We're sorry, but you've reached the end of search results.",position:"topCenter",timeout:3500})},1e3),L(r.loadMoreBtn))};r.input.addEventListener("input",k);r.form.addEventListener("submit",$);r.loadMoreBtn.addEventListener("click",O);
//# sourceMappingURL=commonHelpers.js.map
