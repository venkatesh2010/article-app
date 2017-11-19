
function router () {
    var url = location.hash.slice(1) || '/';
    var articles = document.getElementsByClassName('mdl-cell--6-col');
    if (url == '/'){    
      Array.from(articles).forEach(function(a){
          a.style.display = 'block';
      });
    }else{
      var articleNo = parseInt(url.slice(url.length-1));
        Array.from(articles).forEach(function(a){
            a.style.display = 'none';
        })
        articles[articleNo].style.display='block';
    }


}
window.addEventListener('hashchange', router);


if ('serviceWorker' in navigator) {

  navigator.serviceWorker
    .register('./service-worker.js', { scope: './' })
    .then(function(registration) {
      console.log("Service Worker Registered");
    })
    .catch(function(err) {
      console.log("Service Worker Failed to Register", err);
    })

}



// Function to perform HTTP request
var get = function(url) {
  return new Promise(function(resolve, reject) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var result = xhr.responseText
                result = JSON.parse(result);
                resolve(result);
            } else {
                reject(xhr);
            }
        }
    };
    
    xhr.open("GET", url, true);
    xhr.send();

  }); 
};
/*
  news api details
  apikey = 33b806b9cafc4e47b04bbb171ad7f662
  url : GET https://newsapi.org/v1/articles?source=techcrunch&apiKey=33b806b9cafc4e47b04bbb171ad7f662
template = <div class="mdl-card">
		<div class="mdl-card__title" id=title>
		...
		</div>
		<div class="mdl-card__media" >
		...
		</div>
		<div class="mdl-card__supporting-text" id = content>
		...
		</div>
		<div class="mdl-card__actions">
		...
		</div>
	  </div>

*/


  get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=33b806b9cafc4e47b04bbb171ad7f662')
  .then(function(response) {
    var wrapper = document.getElementById('article-wrapper');
    var articleList = response.articles;
    articleList.forEach(function(a,i){
      var article = '      <div class="mdl-card"> <div class="mdl-card__title" id=title>  </div>  <div class="mdl-card__supporting-text" id = content >  </div> <a class="mdc-button" id="link"> go </a> <a class="mdc-button" id=pop-up > open </a></div>'
      var articleWrapper = document.createElement('div');
      articleWrapper.className = "mdl-cell mdl-cell--6-col";
      articleWrapper.innerHTML = article;
      contentFiller(articleWrapper,a,i);
      wrapper.appendChild(articleWrapper);
    });
  })
  .catch(function(err) {
    console.log("Error", err);
  }) 

  function contentFiller (template, data,i){
    //debugger;
    var title = template.querySelector('#title');
    var content = template.querySelector('#content');
    var link = template.querySelector('a#link');
     var popupLink = template.querySelector('a#pop-up');
    title.innerHTML = data.title;
    content.innerHTML = data.description;
      link.href = '#article-details/'+i ;
   popupLink.addEventListener('click',function(){
        iframe = document.querySelector('.iframe');
        iframe.src = data.url;
        document.querySelector('.modal-wrapper').className+=' show'

    },false);

  }
  window.addEventListener('load',function(){
    document.querySelector('.modal-wrapper').addEventListener('click',function(event){
      if(event.target == event.currentTarget){
        event.target.className = 'modal-wrapper';
      }
    })
  })



