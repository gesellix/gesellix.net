(function($) {

  // PREPARE VIEW
  var $spacer = $("#header-spacer");

  // resize header spacer
  var resizeHeaderSpacer = function($spacer) {
    $spacer.height($(".site-head").height());
  }
  resizeHeaderSpacer($spacer);

  // ON RESIZE

  // resize header spacer
  $(window).resize(function() {
    resizeHeaderSpacer($spacer);
  });

  // RESIZE IMAGES

  // taken from index.js
  function casperFullImg() {
    $("img:not(footer img)").each( function() {
      // debugger;
      var contentWidth = $(".post").outerWidth(); // Width of the content
      var imageWidth = $(this)[0].naturalWidth; // Original image resolution

      if (imageWidth >= contentWidth) {
        $(this).addClass('full-img');
      } else {
        $(this).removeClass('full-img');
      }
    });
  };

  var $container = $(".content");
  if ($container.length > 0) {
    $container.imagesLoaded( function() {
      casperFullImg();
    });
  }

  // SCROLL ACTIONS

  navigation_height = 100;
  navigation_min_height = 0;

  var originalHeaderHeight = $(".site-head").height();
  var shrinkOrExpandHeader = function($header, $spacer) {
    // big screen
    if ($header !== undefined && $(window).width() > 500) {

      if ( $(document).scrollTop() > originalHeaderHeight - 51) {
        if ($header.hasClass("small-header") == false) {
          // console.log("ADD CLASS - BIG");
          $header.addClass("small-header");
          // $spacer.addClass("small-header");
        }
      }

      if ($(document).scrollTop() < originalHeaderHeight - 51) {
        if ($header.hasClass("small-header") == true) {
          // console.log("REMOVE CLASS - BIG");
          $header.removeClass("small-header");
          // $spacer.removeClass("small-header");
        }
      }

    // small screen
    } else if ($header !== undefined && $(window).width() < 500) {

      if ( $(document).scrollTop() > originalHeaderHeight - 51) {
        if ($header.hasClass("small-header") == false) {
          // console.log("ADD CLASS - BIG");
          $header.addClass("small-header");
          // $spacer.addClass("small-header");
        }
      }

      if ($(document).scrollTop() < originalHeaderHeight - 51) {
        if ($header.hasClass("small-header") == true) {
          // console.log("REMOVE CLASS - BIG");
          $header.removeClass("small-header");
          // $spacer.removeClass("small-header");
        }
      }

    }
  }

  $(window).scroll(function() {
    // post header
    var $header = $("header.post-header");
    if ($header !== undefined) {
      shrinkOrExpandHeader($header, $spacer);
    }

    // homepage header
    var $header = $("header.site-head");
    if ($header !== undefined) {
      shrinkOrExpandHeader($header, $spacer);
    }

    // scroll top
    if ($(document).scrollTop() > 300) {
      $("#scroll-top").slideDown();
    } else {
      $("#scroll-top").slideUp();
    }
  });

  // transitions and animations

  $(".content article").velocity("transition.swoopIn", { stagger: 250 }, { duration: 1500 });

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

  // SIMPLE BOX
  // make your own lightbox cuz they all suck

  var imgSrc
    , $simpleBox;

  window.fitImg = function() {
    var $img = $("#simple-box img");
    $($img).css("max-width", $(window).width() - 20);
    $($img).css("max-height", $(window).height() - 40);
  };

  $("body").on("click", ".post img", function(e) {
    // prevent same event from firing twice
    // if (isJqmGhostClick(e)) { return; }

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      // NO OP
      // Sorry, no image modal on mobile, blame Google's mobile Chrome browser for being so shitty...
    } else {
      $("#simple-box").remove(); // remove if one already exists
      imgSrc = $(e.target).attr("src");
      $simpleBox = $("<div id='simple-box' style='cursor:pointer;cursor:-webkit-zoom-out;cursor:-moz-zoom-out;cursor:zoom-out;display:table;position:fixed;width:100%;height:calc(100% + 160px);height:calc(100vh + 160px);margin-top:-80px;z-index:999999;top:0;left:0;right:0;bottom:0;'><div style='background-color:rgba(0,0,0,0.7);display:table-cell;vertical-align:middle;text-align:center;top:0;bottom:0;left:0;right:0;width:100%;height:100%;'><img class='fade-in one fast' src='"+ imgSrc +"' style='box-shadow:0 0 50px rgba(0,0,0,0.5);' onload='fitImg()'></div></div>");
      $("body").append($simpleBox);
    }

  });

  // "close" the modal
  $("body").on("click", "#simple-box", function(e) {
    $("#simple-box").remove();
  });

}(jQuery));
