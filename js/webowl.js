(function(webowl, $, undefined) {
	var RANDOM_DEGREE = 90;
	var result = null;
	var pins = [1,1,1,1,1,1,1,1,1,1];
	var frame_counter = 0;
	var ball_counter = 0;
	var pins_down = 0;
	

	
	function initPins() {
		result = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0,0]];
	}
	
	function getPinsDown() {
		var pindown = 0;
		for (var j = 0; j < pins.length; j++ ) {
			if (pins[j] == 0) pindown++;
		}
		return pindown;
	}

	
	function generateRadom() {
		return Math.floor(Math.random()*10)%2;
	}
	
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
					$("#pin" + pinarry[i]).hide();					
				}
				$("#ballpath").css("right","0");	
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
	
	function loadScoreboard() {		
		$.ajax({
			url : "./scores.html",
			type : "GET",
			dataType : "html",
			success : function(data) {
				$("#scorecontainer").html(data);
			}
		});		
	}
	
	function registerMenuEvents() {
		$(document).off('click', '.mnu').on( 'click', '.mnu', function (event) {
			event.preventDefault();
			loadView($(this).attr('id'));
		});
		
	}
	
	function showAllPins() {
		pins = [1,1,1,1,1,1,1,1,1,1];
		for (var i=1; i<=10;i++) {
			$('#pin' + i).show();
			var degree = 10;
			$('#pin' + i).css({ WebkitTransform: 'rotate(' + (-degree) + 'deg)'});
			$('#pin' + i).css({ '-moz-transform': 'rotate(' + (-degree) + 'deg)'});			
		}
		
	}
	
	function bowlroll()	{
		var total_down = 0;
		for (var i = 0; i < 10; i++) {
			if (pins[i] == 1) {//Pin is up
				pins[i] = generateRadom();
			} else {//Pin is down
				++total_down;
			}
		}

		if (ball_counter == 1) {
			result[frame_counter][ball_counter] =  getPinsDown()  - result[frame_counter][ball_counter - 1];
		}
		if (ball_counter == 0) {
			result[frame_counter][ball_counter] =  getPinsDown();
		}
		console.log('Ball count: ' + ball_counter);
		console.log('Frame count: ' + frame_counter);
		console.log('Pins status: ' + pins);	
		console.log('Pins down: ' + pins_down);	
		
		console.log(result);
		var score = calcScore(result);
		updateScoreboard(result,score,10,3);
		
		if (total_down == 9 || ball_counter == 2) {//Frame over
			showAllPins();			
			frame_counter++;
			ball_counter = 0;
			return;
		}
		if (frame_counter == 9) {//This is the last frame
			alert('Game over');
		}
		var pinarry = new Array();
		for (var i = 0; i <= pins.length; i++) {
			if (pins[i] == 0) //Drop pin
				pinarry.push(i+1);
		}
		webowl.dropPins(pinarry);
		$("#ballpath").css("right","-50");	
		ball_counter++;
//		pinarry.push("3");
//		pinarry.push("2");
//		webowl.dropPins(pinarry);

	}

	
	webowl.init=function() {
		registerMenuEvents();
		loadMenu();
		initPins();
		pins = [1,1,1,1,1,1,1,1,1,1];
		frame_counter = 0;
		ball_counter = 0;
		loadScoreboard();
		$(document).off('click', '#rollball').on( 'click', '#rollball', function (event) {
			event.preventDefault();
			bowlroll();
		});				
//		$(document).off('click', '#nxtball').on( 'click', '#nxtball', function (event) {
//			event.preventDefault();
//			bowlroll();
//			//loadView('playfield');
//		});		

	};

}(window.webowl = window.webowl || {}, jQuery));