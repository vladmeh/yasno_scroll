$(function() {
  // .scrollTo - Plugin (http://lions-mark.com/jquery/scrollTo/)
  $.fn.scrollTo = function( target, options, callback ){
    if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
    var settings = $.extend({
        scrollTarget  : target,
        offsetTop     : 0,
        duration      : 500,
        easing        : 'swing'
    }, options);

    return this.each(function(){
      var scrollPane = $(this);
      var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
      var scrollY = (typeof scrollTarget == "number") ? scrollTarget - settings.offsetTop : scrollTarget.offset().top + scrollPane.scrollTop() - settings.offsetTop;
      scrollPane.stop().animate({scrollTop : scrollY }, settings.duration, settings.easing, function(){
        if (typeof callback == 'function') { callback.call(this); }
      });
    });
  };
});
