(()=>{"use strict";var e=document.querySelector(".popup__card"),t=document.querySelector(".popup__edit"),n=document.querySelector(".popup__add"),r=document.querySelector(".popup__avatar"),o=document.querySelector(".lead__title"),a=document.querySelector(".lead__subtitle"),c=document.querySelector(".lead__image");function i(e){o.textContent=e.name,a.textContent=e.about,c.src=e.avatar}function u(e){e.classList.add("popup_opened"),e.addEventListener("mousedown",l),document.addEventListener("keydown",d)}function s(e){e.classList.remove("popup_opened"),e.removeEventListener("mousedown",l),document.removeEventListener("keydown",d)}function l(e){e.target.classList.contains("popup_opened")&&s(e.target)}function d(e){"Escape"===e.key&&s(document.querySelector(".popup_opened"))}var p={baseUrl:"https://nomoreparties.co/v1/plus-cohort-11",headers:{authorization:"4701837d-0e29-429c-ba7d-8aad47ab0f9e","Content-Type":"application/json"}};function m(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var f,_=document.querySelector("#template").content,h=document.querySelector(".photo-grid"),v=document.querySelector(".popup__image"),y=document.querySelector(".popup__caption");function S(t,n){var r=function(t,n){var r=_.querySelector(".photo-grid__card").cloneNode(!0),o=r.querySelector(".photo-grid__item"),a=r.querySelector(".photo-grid__name-title"),c=r.querySelector(".photo-grid__heart"),i=r.querySelector(".photo-grid__likes");o.src=t.link,o.alt=t.name,a.textContent=t.name,t.likes.length>0&&t.likes.some((function(e){return e.name===n}))&&c.classList.add("photo-grid__heart_active"),i.textContent=t.likes.length,c.addEventListener("click",(function(e){var n;e.target.classList.contains("photo-grid__heart_active")?(n=t._id,fetch("".concat(p.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:p.headers}).then(m)).then((function(t){e.target.classList.remove("photo-grid__heart_active"),i.textContent=t.likes.length})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(p.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:p.headers}).then(m)}(t._id).then((function(t){e.target.classList.add("photo-grid__heart_active"),i.textContent=t.likes.length})).catch((function(e){console.log(e)}))}));var s=r.querySelector(".photo-grid__delete");return t.owner._id===n&&s.classList.add("photo-grid__delete_active"),s.addEventListener("click",(function(e){var n;(n=t._id,fetch("".concat(p.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:p.headers})).then((function(){r.remove()})).catch((function(e){console.log(e)}))})),o.addEventListener("click",(function(t){v.src=t.target.src,v.alt=t.target.alt,y.textContent=t.target.alt,u(e)})),r}(t,n);h.prepend(r)}function b(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.removeAttribute("disabled")):(t.classList.add(n.inactiveButtonClass),t.setAttribute("disabled",!0))}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var q=document.querySelector("form[name='editPopup']"),L=document.querySelector("form[name='addPopup']"),E=document.querySelector(".lead__pencil"),C=document.querySelector(".lead__button"),k=document.querySelector("form[name='userAvatar']"),A=document.querySelector(".lead__image-overlay"),x=Array.from(document.querySelectorAll(".popup__close-cross"));E.addEventListener("click",(function(){return w.value=o.textContent,P.value=a.textContent,void u(t)})),C.addEventListener("click",(function(){return u(n)})),q.addEventListener("submit",(function(e){e.preventDefault();var n,r,o=w.value,a=e.target.querySelector(".popup__submit"),c=P.value;j(!0,a),(n=o,r=c,fetch("".concat(p.baseUrl,"/users/me"),{method:"PATCH",headers:p.headers,body:JSON.stringify({name:"".concat(n),about:"".concat(r)})}).then(m)).then((function(e){i(e),s(t),a.classList.add("popup__submit_inactive"),a.setAttribute("disabled",!0)})).finally((function(){j(!1,a)})).catch((function(e){console.log(e)}))})),L.addEventListener("submit",(function(e){e.preventDefault();var t,r,o=T.value,a=e.target.querySelector(".popup__submit"),c=O.value;j(!0,a),(t=o,r=c,fetch("".concat(p.baseUrl,"/cards"),{method:"POST",headers:p.headers,body:JSON.stringify({name:"".concat(t),link:"".concat(r)})}).then(m)).then((function(t){S(t,f),s(n),e.target.reset(),a.classList.add("popup__submit_inactive"),a.setAttribute("disabled",!0)})).finally((function(){j(!1,a)})).catch((function(e){console.log(e)}))})),A.addEventListener("click",(function(){return u(r)})),k.addEventListener("submit",(function(e){e.preventDefault();var t=e.target.querySelector(".popup__submit"),n=avatarLink.value;j(!0,t),function(e){return fetch("".concat(p.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:p.headers,body:JSON.stringify({avatar:"".concat(e)})}).then(m)}(n).then((function(n){i(n),s(r),e.target.reset(),t.classList.add("popup__submit_inactive"),t.setAttribute("disabled",!0)})).finally((function(){j(!1,t)})).catch((function(e){console.log(e)}))})),x.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return s(t)}))})),Promise.all([fetch("".concat(p.baseUrl,"/users/me"),{headers:p.headers}).then(m),fetch("".concat(p.baseUrl,"/cards"),{headers:p.headers}).then(m)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a=[],c=!0,i=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);c=!0);}catch(e){i=!0,o=e}finally{try{c||null==n.return||n.return()}finally{if(i)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return g(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?g(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],a=r[1];f=o._id,i(o),function(e,t){e.forEach((function(e){S(e,t)}))}(a,f)})).catch((function(e){console.log(e)}));var U,w=document.querySelector("input[name='userName']"),P=document.querySelector("input[name='userOccupation']"),T=document.querySelector("input[name='placeName']"),O=document.querySelector("input[name='placeLink']");function j(e,t){t.textContent=e?"Сохранение...":"Сохранить"}U={popupSelector:".popup",formSelector:".popup__inputs",inputSelector:".popup__input-text",submitButtonSelector:".popup__submit",inactiveButtonClass:"popup__submit_inactive",inputErrorClass:"form__item_type_error",errorClass:"form__input-error_active"},Array.from(document.querySelectorAll(U.popupSelector)).forEach((function(e){var t=e.querySelector(U.formSelector);null!==t&&function(e,t,n){var r=Array.from(t.querySelectorAll(n.inputSelector)),o=t.querySelector(n.submitButtonSelector);b(r,o,n),r.forEach((function(e){e.addEventListener("input",(function(){!function(e,t,n){t.validity.valid?function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(t,e,n),b(r,o,n)}))}))}(0,t,U)}))})();