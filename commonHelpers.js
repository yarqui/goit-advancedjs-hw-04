import{a as L,i as u,S as H,l as w}from"./assets/vendor-f97a6336.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();const k="32117995-da98556d394b8c9b5a96c2a58",P="https://pixabay.com/api",y=40;let f=1,h;L.defaults.baseURL=P;const x=()=>{f+=1},A=()=>{f=1},O=()=>h,B=()=>f,M=async e=>{e&&h!==e?(A(),h=e):x();const o=new URLSearchParams({q:e||h,page:f,per_page:y,image_type:"photo",orientation:"horizontal",safesearch:!0,key:k});try{const{data:s,status:i}=await L.get(`/?${o}`);if(i===429)throw u.warning({message:"Too many requests. Limit exceeded. Try again later",position:"topCenter",timeout:8e3}),new Error("Too many requests. Limit exceeded. Try again later");return{...s,newQuery:e}}catch(s){console.error(s)}},v={hidden:"visually-hidden"},E={disabled:"disabled"},m=e=>{e.classList.remove(v.hidden)},c=e=>{e.classList.add(v.hidden)},R=e=>{e.removeAttribute(E.disabled)},S=e=>{e.setAttribute(E.disabled,"")},T=e=>Array.isArray(e)&&e.length>0,a={loadMoreButton:"Load More Button",infiniteScroll:"Infinite Scroll"},t={form:document.querySelector("form#search-form"),input:document.querySelector('input[name="searchQuery"]'),gallery:document.querySelector("ul.gallery"),submitBtn:document.querySelector('button[type="submit"]'),loadMoreBtn:document.querySelector("button.load-more"),toTopBtn:document.querySelector(".scroll-top-button"),loader:document.querySelector("span.loader")},I=new H(".photo-link");let d=null,p=!1;const U=()=>{const{height:e}=t.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})},V=()=>{window.scrollTo({top:0,behavior:"smooth"})},z=e=>{e.innerHTML=""},N=e=>T(e)&&e.map(o=>{const{webformatURL:s,largeImageURL:i,tags:n,likes:r,views:l,comments:g,downloads:C}=o;return`
        <li class="photo-card">
          <a class="photo-link" href="${i}">
            <img src="${s}" alt="${n}" loading="lazy" width="305" height="200" />
          </a>
          <div class="info">
              <p class="info-item">
                  <b>Likes</b>
                  ${r}
              </p>
              <p class="info-item">
                  <b>Views</b>
                  ${l}
              </p>
              <p class="info-item">
                  <b>Comments</b>
                  ${g}
              </p>
              <p class="info-item">
                  <b>Downloads</b>
                  ${C}
              </p>
          </div>
          
    </li>`}).join(""),$=e=>{const o=N(e);t.gallery.insertAdjacentHTML("beforeend",o),I.refresh()},_=w(()=>{window.scrollY>=100?m(t.toTopBtn):c(t.toTopBtn)},500),q=w(()=>{const e=document.body,o=document.documentElement;Math.max(e.scrollHeight,e.offsetHeight,o.clientHeight,o.scrollHeight,o.offsetHeight)-window.innerHeight-window.scrollY<300&&b()},500),D=e=>{e.target.value.length>=2?R(t.submitBtn):S(t.submitBtn)},W=async e=>{e.preventDefault();const s=e.target.elements.searchQuery.value.replace(/\s+/g," ").trim();t.form.reset(),S(t.submitBtn),d===a.loadMoreButton&&c(t.loadMoreBtn),m(t.loader),z(t.gallery);try{const i=await M(s);if(c(t.loader),!i)return;const{hits:n,totalHits:r,newQuery:l}=i;if(!T(n)){u.warning({message:`Sorry, there are no images matching "${l}". Please try another search`,position:"topCenter",timeout:4e3});return}if(u.success({message:`Hooray! We found ${r} images.`,position:"topCenter",timeout:1500}),$(n),window.addEventListener("scroll",_),d===a.loadMoreButton){const g=B();p=r<g*y,p?c(t.loadMoreBtn):(m(t.loadMoreBtn),t.loadMoreBtn.addEventListener("click",b))}else window.addEventListener("scroll",q)}catch(i){console.log(i)}},b=async()=>{d===a.loadMoreButton&&c(t.loadMoreBtn),m(t.loader);try{const e=O(),o=await M(e);if(c(t.loader),!o)return;const{hits:s,totalHits:i}=o;$(s),U();const n=B();if(p=i<n*y,p){window.removeEventListener("scroll",q),t.loadMoreBtn.removeEventListener("click",b),setTimeout(()=>{u.warning({message:"We're sorry, but you've reached the end of search results.",position:"topCenter",timeout:3500})},1e3),d===a.loadMoreButton&&c(t.loadMoreBtn);return}d===a.loadMoreButton&&m(t.loadMoreBtn)}catch(e){console.log(e)}},Y=()=>{u.question({timeout:2e4,close:!1,overlay:!0,displayMode:"once",id:"question",zindex:999,message:"Which modes do you want to use?",position:"center",buttons:[[`<button>${a.loadMoreButton}</button>`,function(e,o){e.hide({transitionOut:"fadeOut"},o,`${a.loadMoreButton}`)}],[`<button>${a.infiniteScroll}</button>`,function(e,o){e.hide({transitionOut:"fadeOut"},o,`${a.infiniteScroll}`)}]],onClosed:function(e,o,s){d=s==="timeout"?`${a.loadMoreButton}`:`${s}`}})};Y();t.input.addEventListener("input",D);t.form.addEventListener("submit",W);t.toTopBtn.addEventListener("click",V);
//# sourceMappingURL=commonHelpers.js.map
