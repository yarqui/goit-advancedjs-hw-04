import{a as m,i as u}from"./assets/vendor-86d8eb39.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const E="32117995-da98556d394b8c9b5a96c2a58",w="https://pixabay.com/api",d=40;let c=1,l;m.defaults.baseURL=w;const S=()=>{c+=1},T=()=>{c=1},q=()=>l,p=async e=>{console.log("newQuery:",e),console.log("query === newQuery:",l===e),console.log("page:",c),e&&l!==e?(T(),l=e):S(),console.log("page:",c);const s=new URLSearchParams({q:e||l,page:c,per_page:d,image_type:"photo",orientation:"horizontal",safesearch:!0,key:E});try{const{data:r,status:n}=await m.get(`/?${s}`);if(n===429)throw u.warning({message:"Too many requests. Limit exceeded. Try again later",position:"topCenter",timeout:8e3}),new Error("Too many requests. Limit exceeded. Try again later");const{totalHits:t,hits:o}=r;console.log("hits.length:",o.length);const a=t<c*d;return console.log("isEndOfResults:",a),{...r,query:l,isEndOfResults:a}}catch(r){throw console.log(r),r}},g={hidden:"visually-hidden"},f={disabled:"disabled"},A=e=>{e.classList.remove(g.hidden)},M=e=>{e.classList.add(g.hidden)},P=e=>{e.removeAttribute(f.disabled)},h=e=>{e.setAttribute(f.disabled,"")},y=e=>Array.isArray(e)&&e.length>0,i={form:document.querySelector("form#search-form"),input:document.querySelector('input[name="searchQuery"]'),gallery:document.querySelector("div.gallery"),submitBtn:document.querySelector('button[type="submit"]'),loadMoreBtn:document.querySelector("button.load-more")},B=e=>{e.innerHTML=""},b=e=>y(e)&&e.map(s=>{const{webformatURL:r,largeImageURL:n,tags:t,likes:o,views:a,comments:L,downloads:v}=s;return`
    <li class="photo-card">
        <img src="${n}" alt="${t}" loading="lazy" />
        <div class="info">
            <p class="info-item">
                <b>Likes</b>
                ${o}
            </p>
            <p class="info-item">
                <b>Views</b>
                ${a}
            </p>
            <p class="info-item">
                <b>Comments</b>
                ${L}
            </p>
            <p class="info-item">
                <b>Downloads</b>
                ${v}
            </p>
         </div>
    </li>`}).join(""),k=e=>{console.log("photos:",e);const s=b(e);B(i.gallery),i.gallery.insertAdjacentHTML("beforeend",s)},C=e=>{e.target.value.length>=2?P(i.submitBtn):h(i.submitBtn)},R=async e=>{e.preventDefault();const r=e.target.elements.searchQuery.value.replace(/\s+/g," ").trim();i.form.reset(),h(i.submitBtn);try{const{hits:n,totalHits:t,query:o}=await p(r);if(!y(n)){u.warning({message:`Sorry, there are no images matching "${o}". Please try another search`,position:"topCenter",timeout:4e3});return}u.success({message:`Hooray! We found ${t} images.`,position:"topCenter",timeout:1500}),k(n),A(i.loadMoreBtn)}catch(n){console.log(n)}},$=async()=>{const e=q(),{hits:s,isEndOfResults:r}=await p(e);console.log("hits:",s);const n=b(s);i.gallery.insertAdjacentHTML("beforeend",n),r&&(setTimeout(()=>{u.warning({message:"We're sorry, but you've reached the end of search results.",position:"topCenter",timeout:3500})},1e3),M(i.loadMoreBtn))};i.input.addEventListener("input",C);i.form.addEventListener("submit",R);i.loadMoreBtn.addEventListener("click",$);
//# sourceMappingURL=commonHelpers.js.map
