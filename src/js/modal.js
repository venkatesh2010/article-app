(function() {
	
	function ConfirmBox( element, params ) {
		this.element = element;
		this.params = params || {};
		this.params.ok = params.ok || function() {};
		this.params.cancel = params.cancel || function() {};
		
		this.init();
	}
	
	ConfirmBox.prototype = {
		init: function() {
			this.instance = null;
			this.create();
			this.layout();
			this.actions();
		},
		create: function() {
		  if( document.querySelector( "#confirm-wrapper" ) === null ) {
            var wrapper = document.createElement( "div" );
            this.wrapper = wrapper;
				wrapper.id = "confirm-wrapper";
            var html = "<div id='confirm-box'><h2 id='confirm-header'></h2>";
                html += "<div id='director'></div>"
                html += "<div id='producer'></div>"
                html += "<div id='release'></div>"
                html += "<div id='desc'></div>"
				html += "<div id='confirm-buttons'><button id='confirm-ok'>Close</button></div>";
				html += "</div>";
				
				wrapper.innerHTML = html;
				document.body.appendChild( wrapper );
		  }
		  
		  this.instance = document.querySelector( "#confirm-wrapper" );
		},
		layout: function() {
			var wrapper = this.instance;
			var winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			
			wrapper.style.height = winHeight + "px";	
		},
		show: function( element ) {
		//	element.style.display = "block";
			element.style.display = "flex";
			element.style.alignItems = "center";
			element.style.justifyContent = 'center';
			element.style.opacity = 1;
		},
		hide: function( element ) {
            element.style.opacity = 0;
           // element.delete()
			setTimeout(function() {
				element.style.display = "none";
			}, 100);
		},
		actions: function() {
			var self = this;
			self.element.addEventListener( "click", function() {
                var index = self.element.dataset.question;
                var content = filmArray[parseInt(index)];
				self.instance.querySelector( "#confirm-header" ).innerHTML = content.description;
				self.show( self.instance );
			}, false);
			
			self.instance.querySelector( "#confirm-ok" ).
			addEventListener( "click", function() {
				self.hide( self.instance );
				setTimeout(function() {
					self.params.ok();
				}, 100);
            }, false);
            this.instance.
			addEventListener( "click", function() {
				self.hide( self.instance );
				setTimeout(function() {
					self.params.ok();
				}, 100);
			}, false);
        },
        open:function(film){
            var self = this;
            var index = self.element.dataset.question;
            var content = film;
            self.instance.querySelector( "#confirm-header" ).innerHTML = content.title;
            self.instance.querySelector( "#director" ).innerHTML = "Director: "+content.director;
            self.instance.querySelector( "#release" ).innerHTML = "ReleaseDate: "+content.release_date;
            self.instance.querySelector( "#producer" ).innerHTML = "Producer: "+content.producer;
            self.instance.querySelector( "#desc" ).innerHTML = content.description;
           // self.instance.querySelector( "#image" ).src = content.description;
            self.show(self.instance);
        }
	};

	window.ConfirmBox = ConfirmBox;
})();

// (function() {
	
// 	document.addEventListener( "DOMContentLoaded", function() {
// 		var confirm = document.querySelector( "#confirm" );
// 		var output = document.querySelector( "#output" );
// 		var confBox = new ConfirmBox( confirm, {
// 			ok: function() {
// 				output.innerHTML = "OK";
// 			}
// 		});
// 	});
	
// })();
