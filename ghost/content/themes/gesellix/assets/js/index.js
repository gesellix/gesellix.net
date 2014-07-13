
(function ($) {
    "use strict";

	$(document).ready(function(){

		$("a[href='#toggle-sidebar']").click(function () {

			$(this).toggleClass("active");
			$("#sidebar").toggleClass("inactive");
			$(".post-comments").toggleClass("inactive");
			$(".content").toggleClass("inactive");
			if(!$("#sidebar").hasClass("inactive")){
				$('html, body').animate({
					scrollTop: $("#sidebar").offset().top
				}, 200);
			}
			return false;

		});

		var maxpages;
		var nextpage;

		function pager () {
			if(maxpages <= nextpage-1)return;
			var pagelist = $(".pagination span").html().split(" of ");
			maxpages = parseInt(pagelist[1]);
			nextpage = $(".older-posts").attr("href").split("/");
			nextpage = parseInt(nextpage[2]);
			$("#sidebar-temp #sidebar").append('<a href="javascript:;" class="more">Load More Posts...</a>');
		}

		function loadedElements () {
			$(".more").delegate(this, "click", function () {
				if(maxpages <= nextpage-1)return;

				$(".more").html("Loading...");
				$(".tempdiv").load('/page/'+nextpage+'/ #sidebar', function (data) {
					var tempdata = $(this).children("#sidebar").html();
					$("#sidebar-temp #sidebar .more").before(tempdata);
					$("#sidebar a[href='"+ window.postUrl +"']").addClass("active");
					nextpage+=1;
					if(maxpages <= nextpage-1){
						$(".more").addClass("inactive-a").html("No More Posts");
					}else{
						$(".more").html("Load More Posts...");
					}
				});
			});

		}

		if(window.isPostPage){

			$('#sidebar-temp').load('/ #sidebar', function () {
				pager();
				loadedElements();
				$("#sidebar a[href='"+ window.postUrl +"']").addClass("active");
				$('#sidebar').niceScroll();
			});
		}else{
			pager();
			loadedElements();
			$("#sidebar a:first-child").addClass("active");
			$('#sidebar').niceScroll();
		}


        $("iframe[src^='http://www.youtube.com'], iframe[src^='https://w.soundcloud.com'], iframe[src^='//player.vimeo.com']").each(function() {
        	$(this).wrap('<div class="post-video"></div>');
        });

	});

}(jQuery));
