(function(webowl, $, undefined) {
	var RANDOM_DEGREE = 90;
	
	function loadMenu() {
		$.ajax({
			url : "./menu.html",
			type : "GET",
			dataType : "html",
			success : function(data) {
				$("#bowlcontainer").html(data);
			}
		});
	}
	
	function drop(degree,pin_no) {
		var $pin = $("#pin" + pin_no);
		$pin.css({ WebkitTransform: 'rotate(' + (-degree) + 'deg)'});
		$pin.css({ '-moz-transform': 'rotate(' + (-degree) + 'deg)'});
		if(degree < RANDOM_DEGREE){
			setTimeout(function() { drop(++degree,pin_no); },3);
		}
    }
	
	webowl.dropPins=function(pinarry) {
		animateBall(pinarry);
	};
	
	function animateBall(pinarry) {
		var degree = -9;
		$("#ballpath").css("right","-50");		
		$("#ballpath").animate({
			opacity: 100,
		    right: "+=900",
		    step: function( now, fx ) {
		    	degree = degree - 5;
		    	$("#ballpath").css({ '-moz-transform': 'rotate(' + degree + 'deg)'});	
		    	$("#ballpath").css({ WebkitTransform: 'rotate(' + degree + 'deg)'});
		      }		    
		  }, 2000, function() {			  		 
				for (var i = 0; i <= pinarry.length; i++) {
					drop(0,pinarry[i]);
				}
		  }
		  );
	}
	
	function loadView(view) {		
		$.ajax({
			url : "./" + view + ".html",
			type : "GET",
			dataType : "html",
			success : function(data) {
				$("#bowlcontainer").html(data);
			}
		});		
	}
	
	function registerMenuEvents() {
		$(document).off('click', '.mnu').on( 'click', '.mnu', function (event) {
			event.preventDefault();
			loadView($(this).attr('id'));
		});
		
	}
	
	webowl.init=function() {
		registerMenuEvents();
		loadMenu();
		$(document).off('click', '#nxtball').on( 'click', '#nxtball', function (event) {
			event.preventDefault();
			loadView('playfield');
		});		

	};

}(window.webowl = window.webowl || {}, jQuery));