$(function() {
  // .scrollTo - Plugin (http://lions-mark.com/jquery/scrollTo/)
  $.fn.scrollTo = function( target, options, callback ){
    if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
    var settings = $.extend({
        scrollTarget  : target,
        offsetTop     : 168,
        duration      : 700,
        easing        : 'easeOutQuint'
    }, options);

    return this.each(function(){
      var scrollPane = $(this);
      var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
      var scrollY = (typeof scrollTarget == "number") ? scrollTarget + settings.offsetTop : scrollTarget.offset().top + scrollPane.scrollTop() - settings.offsetTop;
      scrollPane.stop().animate({scrollTop : scrollY }, settings.duration, settings.easing, function(){
        if (typeof callback == 'function') { callback.call(this); }
      });
    });
  }

  $.fn.visible = function(partial) {
    var $t            = $(this),
        $w            = $(window),
        viewTop       = $w.scrollTop(),
        point         = 90,
        scrollPos     = $t.offset().top - $w.scrollTop();
    return (point > scrollPos);
  };


  var $chapters = $('.scrollBoxed').find('.l-section');
  var $header = $('#header'), header_old = $header.html();
  var $chScrollPositions = new Array();

  // Cache Scroll Positions for Each Chapter
  $chapters.each(function(i){
    $chScrollPositions[i] = Math.round($(this).offset().top);
  });

  $chapters.eq(0).addClass('active'); // Set First Chapter Active on Start

  $(document).keydown(function (e) {
    var last = $('.l-section.active').removeClass('active').index();
    var next;
    switch (e.which) {
            //up
        case 38:
        case 33:
            next = (last == 0) ? 0 : last - 1;
            break;

            //down
        case 40:
        case 34:
            next = (last + 1 == $chapters.length) ? 0 : last + 1;
            break;

            //Home
        case 36:
            next = 0;
            break;

            //End
        case 35:
            next = $chapters.length - 1;
            break;

        default:
            return; // exit this handler for other keys
    }

    $chapters.eq(next).addClass('active'); // Set Next Chapter Active
    $('html, body').scrollTo($chScrollPositions[next]);
  });

  $(window).on('scroll', function(){
    if ($(window).scrollTop() > 168){
      $header.addClass('fixed-head').html('<img src="http://yasno.co/wp-content/uploads/2014/11/logo-horizontal.png" width="352" class="pageTop"/>');
      $chapters.eq(0).css('margin-top', 262 + 'px');
    }
    else {
      $header.removeClass('fixed-head').html(header_old);
      $chapters.eq(0).css('margin-top', 0);
    }

    var el = $('.l-section.active');
    if(el.visible(true)){
      var last = $('.l-section.active').removeClass('active').index();
      var next = (last + 1 == $chapters.length) ? 0 : last + 1;
      $chapters.eq(next).addClass('active'); // Set Next Chapter Active
      $('html, body').scrollTo($chScrollPositions[next]);
    }
    console.log(el.index());
  });

});
