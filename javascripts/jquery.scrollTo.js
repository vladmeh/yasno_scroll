$(function() {
  // .scrollTo - Plugin (http://lions-mark.com/jquery/scrollTo/)
  $.fn.scrollTo = function( target, options, callback ){
    if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
    var settings = $.extend({
        scrollTarget  : target,
        offsetTop     : 0,
        duration      : 700,
        easing        : 'easeOutQuint'
    }, options);

    return this.each(function(){
      var scrollPane = $(this);
      var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
      var scrollY = (typeof scrollTarget == "number") ? scrollTarget - settings.offsetTop : scrollTarget.offset().top + scrollPane.scrollTop() - settings.offsetTop;
      scrollPane.stop().animate({scrollTop : scrollY }, settings.duration, settings.easing, function(){
        if (typeof callback == 'function') { callback.call(this); }
      });
    });
  }

  /*$.fn.visible = function(calback) {
    var $t            = $(this),
        $w            = $(window),
        viewTop       = $w.scrollTop(),
        point         = 94,
        scrollPos     = $t.offset().top - $w.scrollTop();
    return (point > scrollPos);
  };*/

  // http://www.manhunter.ru/webmaster/199_obrabotka_kolesika_mishi_na_javascript.html
  $.fn.bindWheelEvent = function(callback) {
    if(!$.isFunction(callback)) { return this; }
    if(this.length == 0) { return this; }
    var jsThis = this.get(0);
    var normalizedCallback = function(e) {
      if(!e) { var e = window.event; }
      e.cancelDefaultAction = function() {
        if (this.stopPropagation) {
            this.stopPropagation();
        }
        if (this.preventDefault) {
            this.preventDefault();
        }
        this.cancelBubble = true;
        this.cancel       = true;
        this.returnValue  = false;
        return false;
      }
      // Получить значение поворота колесика мыши
      var wheelData = e.detail ? e.detail * -1 : e.wheelDelta / 40;
      // В движке WebKit возвращается значение в 100 раз больше
      if (Math.abs(wheelData)>100) { wheelData=Math.round(wheelData/100); }
      e.wheelData = wheelData;
      return callback.call(jsThis, e);
    }
    if (jsThis.addEventListener) {
      // Событие вращения колесика для Mozilla
      jsThis.addEventListener('DOMMouseScroll', normalizedCallback, false);
      // Колесико для Opera, WebKit-based, а также любые другие события
      // для всех браузеров кроме Internet Explorer
      jsThis.addEventListener('mousewheel', normalizedCallback, false);
    }
    else if (jsThis.attachEvent) {
      // событие для Internet Explorer
      jsThis.attachEvent('onmousewheel', normalizedCallback);
    }
    return this;
  };

  var $chapters           = $('.scrollBoxed').find('.l-section'),
      $header             = $('#header'), header_old = $header.html(),
      header_fixed        = false,
      $body               = $('html, body'),
      $chScrollPositions  = new Array();

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
            next = (last == 0) ? -1 : last - 1;
            break;

            //down
        case 40:
        case 34:
            next = (last + 1 == $chapters.length) ? 0 : last + 1;
            break;

            //Home
        case 36:
            next = -1;
            break;

            //End
        case 35:
            next = $chapters.length - 1;
            break;

        default:
            return; // exit this handler for other keys
    }

    $chapters.eq(next).addClass('active'); // Set Next Chapter Active
    if (next >= 0){
      $body.scrollTo($chScrollPositions[next], {offsetTop: 93});
    }
    else{
      $body.scrollTo(0, {duration:'swing', offsetTop: 0});
    }
  });

  $(window).on('scroll', function(){
    if ($(window).scrollTop() > 168){
      $header.addClass('fixed-head').html('<img src="http://yasno.co/wp-content/uploads/2014/11/logo-horizontal.png" width="352" class="pageTop"/>');
      $chapters.eq(0).css('margin-top', 262 + 'px');
      header_fixed = true;
    }
    else {
      $header.removeClass('fixed-head').html(header_old);
      $chapters.eq(0).css('margin-top', 0);
      header_fixed = false;
    }

    $('.pageTop').on('click', function(){
      $body.scrollTo(0, {duration:'swing', offsetTop: 0});
    });
    /*var el = $('.l-section.active');
    if(el.visible(true)){
      var last = $('.l-section.active').removeClass('active').index();
      var next = (last + 1 == $chapters.length) ? 0 : last + 1;
      $chapters.eq(next).addClass('active'); // Set Next Chapter Active
      $('html, body').scrollTo($chScrollPositions[next]);
    }
    console.log(el.index());*/
  });

  $body.bindWheelEvent(function(evt) {
      // Если надо отменить всплытие события  - evt.cancelDefaultAction(); return false;
      var last = $('.l-section.active').removeClass('active').index();
      var next;

      switch (evt.wheelData > 0){
        case false:
          next = (last + 1 == $chapters.length) ? 0 : last + 1;
          break;

        case true:
          next = (last == 0) ? -1 : last - 1;
          break;
      }
      console.log(next);
      // Set Next Chapter Active
      $chapters.eq(next).addClass('active');
      if (next >= 0){
        $body.scrollTo($chScrollPositions[next], {offsetTop: 93});
      }
      else{
        $body.scrollTo(0, {duration:'swing', offsetTop: 0});
      }
  });

});
