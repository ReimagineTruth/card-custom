(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function t(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=t(a);fetch(a.href,s)}})();function w(r){return{png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",webp:"image/webp"}[r]||"image/png"}function y(r,e){const t=new Date().toISOString().replace(/[:.]/g,"-");return`${r}-${t}.${e}`}async function b(r,e=1200){return new Promise(t=>{const o=new Image;o.onload=()=>{const a=document.createElement("canvas");let s=o.width,n=o.height;s>e&&(n=e*n/s,s=e),a.width=s,a.height=n,a.getContext("2d").drawImage(o,0,0,s,n),a.toBlob(d=>{t(d)},r.type)},o.src=URL.createObjectURL(r)})}function I(r){if(!["image/jpeg","image/png","image/gif","image/webp"].includes(r.type))throw new Error("Invalid image format. Please use JPG, PNG, GIF, or WebP.");if(r.size>5242880)throw new Error("Image size too large. Maximum size is 5MB.");return!0}class u{static async processUpload(e){try{return I(e),await b(e)}catch(t){throw new Error(`Failed to process image: ${t.message}`)}}static async saveImage(e){try{const t=await html2canvas(e),o="png",a=y("custom-card",o),s=await new Promise(d=>{t.toBlob(v=>d(v),w(o))}),n=URL.createObjectURL(s),i=document.createElement("a");i.href=n,i.download=a,i.click(),URL.revokeObjectURL(n)}catch(t){throw new Error(`Failed to save image: ${t.message}`)}}}async function h(r,e){r.addEventListener("change",async()=>{const t=r.files[0];if(t)try{const o=await u.processUpload(t),a=URL.createObjectURL(o);e.style.backgroundImage=`url('${a}')`}catch(o){alert(o.message)}})}async function p(r){try{await u.saveImage(r)}catch(e){alert(e.message)}}class R{constructor(e,t){this.modal=e,this.closeButton=t,this.setupEventListeners()}setupEventListeners(){this.closeButton.addEventListener("click",()=>this.hide()),window.addEventListener("click",e=>{e.target===this.modal&&this.hide()})}show(){this.modal.style.display="block"}hide(){this.modal.style.display="none"}}class L{constructor(e){this.element=e,this.mediaRecorder=null,this.chunks=[],this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.setupCanvas()}setupCanvas(){const e=this.element.getBoundingClientRect();this.canvas.width=e.width,this.canvas.height=e.height}async startRecording(){this.chunks=[];const e=this.canvas.captureStream(30);this.mediaRecorder=new MediaRecorder(e),this.mediaRecorder.ondataavailable=t=>{t.data.size>0&&this.chunks.push(t.data)},this.startDrawing(),this.mediaRecorder.start()}startDrawing(){let e=0;const t=o=>{if(!this.mediaRecorder||this.mediaRecorder.state==="inactive")return;o-e>1e3/30&&(this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),html2canvas(this.element).then(s=>{this.ctx.drawImage(s,0,0)}),e=o),requestAnimationFrame(t)};requestAnimationFrame(t)}async stopRecording(){return new Promise(e=>{this.mediaRecorder.onstop=()=>{const t=new Blob(this.chunks,{type:"video/webm"});e(t)},this.mediaRecorder.stop()})}}function E(r,e){const t=URL.createObjectURL(r),o=document.createElement("a");o.href=t,o.download=e,o.click(),URL.revokeObjectURL(t)}const B=document.getElementById("frontImageInput"),k=document.getElementById("backImageInput"),f=document.querySelector(".card-front"),U=document.querySelector(".card-back"),P=document.getElementById("saveImage"),F=document.getElementById("downloadImage"),c=document.getElementById("recordVideo"),O=document.getElementById("myModal"),S=document.querySelector(".close"),m=document.querySelector(".card");h(B,f);h(k,U);const j=new R(O,S),g=new L(m);let l=!1;f.addEventListener("click",()=>j.show());P.addEventListener("click",()=>p(m));F.addEventListener("click",()=>p(m));c.addEventListener("click",async()=>{if(l)try{const r=await g.stopRecording();l=!1,c.textContent="Record Video",c.classList.remove("bg-red-500","hover:bg-red-600"),c.classList.add("bg-blue-500","hover:bg-blue-600"),E(r,"card-animation.webm")}catch(r){console.error("Failed to stop recording:",r),alert("Failed to save recording. Please try again.")}else try{await g.startRecording(),l=!0,c.textContent="Stop Recording",c.classList.remove("bg-blue-500","hover:bg-blue-600"),c.classList.add("bg-red-500","hover:bg-red-600")}catch(r){console.error("Failed to start recording:",r),alert("Failed to start recording. Please try again.")}});
