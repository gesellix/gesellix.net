(function($) {

  navigation_height = 100;
  navigation_min_height = 0;

  $(window).scroll(function() {
    var $header = $("header.post-header");
    var $spacer = $("#header-spacer");

    // post header
    if ($(document).scrollTop() > 50) {
      $header.addClass("small-header");
      $spacer.addClass("small-header");
    } else {
      $header.removeClass("small-header");
      $spacer.removeClass("small-header");
    }

    // homepage header
    var $header = $("header.site-head");

    if ($(document).scrollTop() > 50) {
      $header.addClass("small-header");
      $spacer.addClass("small-header");
    } else {
      $header.removeClass("small-header");
      $spacer.removeClass("small-header");
    }

    // scroll top
    if ($(document).scrollTop() > 300) {
      $("#scroll-top").slideDown();
    } else {
      $("#scroll-top").slideUp();
    }
  });

  // transitions and animations

  $(".content article").velocity("transition.slideLeftIn", { stagger: 250 }, { duration: 1500 });

  $(".tag-archive-header").velocity("transition.slideUpIn", { stagger: 250 }, { duration: 1500 });

  // $(".blog-logo").velocity("transition.slideDownIn", { stagger: 250 }, { duration: 1500 });

  // SEARCH

  var searchField = $("#search-field").ghostHunter({
    results: "#results",
    onKeyUp: true,
    displaySearchInfo: false,
    zeroResultsInfo: false,
    info_template: "<p><i class='fa fa-file-text-o'></i> {{amount}}</p>",
    result_template: "<div class='result-cell'><a href='{{link}}'><div><b>{{title}}</b> <br> <small>{{pubDate}}</small></div></a></div>",
    onComplete: function(){
      $("#results .result-cell").velocity("transition.slideUpBigIn", { stagger: 250 }, { duration: 1500 });
    }
  });

  // NAVIGATION

  $("#navigation > a").on("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    $("#navigation .navigation-options").slideToggle();
  });

  // SCROLL TOP

  $("#scroll-top").click(function(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });

}(jQuery));
