$(function() {
  var win = jQuery(window),
      sections = [
          '#what-we-do',
          '#nashi-proekty',
          '#vsyo-chto-vy-hoteli-znat',
          '#klienty',
          '#po-vsem-voprosam'
        ],
      allMods = jQuery(sections);

  /*$.fn.visible = function(partial) {

      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;

    //return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
    return (_top);

  };*/

  /*allMods.each(function(i, el) {
    var el = jQuery(el);
    if (el.visible(true)) {
      el.addClass("already-visible");
    }
  });*/
  var box = $('#nashi-proekty'),
      box_t = box.offset().top,
      box_prev = box.prev(),
      box_prev_t = box_prev.height(),
      point = 0,
      scrollPoint,
      activeScroll = false;
  console.log(box_prev_t);

  win.scroll(function(e) {
    scrollPoint = box_t - (win.scrollTop() + box_prev_t);
    if (point !== null && point >= scrollPoint){
      activeScroll = true;
    }
    //console.log();
    //console.log(win.scrollTop());
    /*allMods.each(function(i, el) {
      var $el = jQuery(el);
      console.log($el.visible());
      if (el.visible(true)) {
        el.addClass("come-in");
      }
    });*/

  });
  if (activeScroll === true){
    $("html, body").animate({scrollTop:box_t}, '500', 'swing');
    activeScroll = false;
  }

});

