function router(){var e=location.hash.slice(1)||"/",t=document.getElementsByClassName("mdl-cell--6-col");if("/"==e)Array.from(t).forEach(function(e){e.style.display="block"});else{var r=parseInt(e.slice(e.length-1));Array.from(t).forEach(function(e){e.style.display="none"}),t[r].style.display="block"}}function contentFiller(e,t,r){var n=e.querySelector("#title"),c=e.querySelector("#content"),i=e.querySelector("a");n.innerHTML=t.title,c.innerHTML=t.description,i.href="#article-details/"+r}window.addEventListener("hashchange",router),"serviceWorker"in navigator&&navigator.serviceWorker.register("./service-worker.js",{scope:"./"}).then(function(e){console.log("Service Worker Registered")})["catch"](function(e){console.log("Service Worker Failed to Register",e)});var get=function(e){return new Promise(function(t,r){var n=new XMLHttpRequest;n.onreadystatechange=function(){if(n.readyState===XMLHttpRequest.DONE)if(200===n.status){var e=n.responseText;e=JSON.parse(e),t(e)}else r(n)},n.open("GET",e,!0),n.send()})};get("https://newsapi.org/v1/articles?source=techcrunch&apiKey=33b806b9cafc4e47b04bbb171ad7f662").then(function(e){var t=document.getElementById("article-wrapper"),r=e.articles;r.forEach(function(e,r){var n='      <div class="mdl-card"> <div class="mdl-card__title" id=title>  </div>  <div class="mdl-card__supporting-text" id = content >  </div> <a class="mdc-button" id="link"> open </a> </div>',c=document.createElement("div");c.className="mdl-cell mdl-cell--6-col",c.innerHTML=n,contentFiller(c,e,r),t.appendChild(c)})})["catch"](function(e){console.log("Error",e)});
//# sourceMappingURL=maps/main-a3540d8151.js.map