(function(webowl, $, undefined) {
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
	
	function registerMenuEvents() {
		$(document).off('click', '.mnu').on( 'click', '.mnu', function (event) {
			event.preventDefault();
			var pagesrc=$(this).attr('id');
			$.ajax({
				url : "./" + pagesrc + ".html",
				type : "GET",
				dataType : "html",
				success : function(data) {
					$("#bowlcontainer").html(data);
				}
			});
		});
		
	}
	
	webowl.init=function() {
		registerMenuEvents();
		loadMenu();
	};

}(window.webowl = window.webowl || {}, jQuery));