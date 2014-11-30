$(function() {
  var $chapters           = $('.scrollBoxed').find('.l-section'),
      $header             = $('#header'),
      $header_fixed = $('#header-fixed'),
      header_old = $header.html(),
      header_fixed        = false,
      $body               = $('html, body'),
      $chScrollPositions  = new Array();

  function init(){
    // Cache Scroll Positions for Each Chapter
    $chapters.each(function(i){
      $chScrollPositions[i] = Math.round($(this).offset().top);
    });

    // Set First Chapter Active on Start
    $chapters.eq(0).addClass('active');

    // set header fixed scroll down window
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
    });

    //Sliding with arrow keys, both and vertical
    $(document).keydown(function (e) {
      var last = $('.l-section.active').removeClass('active').index();
      var next;
      switch (e.which) {
              //up
          case 38:
          case 33:
              next = (last === 0) ? 0 : last - 1;
              break;

              //down
          case 40:
          case 34:
              next = (last + 1 == $chapters.length) ? $chapters.length - 1 : last + 1;
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
      if (next > 0){
        $body.scrollTo($chScrollPositions[next], {duration:'easeOutQuint', offsetTop: 93});
      }
      else{
        $body.scrollTo(0, {duration:'swing', offsetTop: 0});
      }
    });

    $body.bindWheelEvent(function(evt) {
        // Если надо отменить всплытие события  - evt.cancelDefaultAction(); return false;
        var last = $('.l-section.active').removeClass('active').index();
        var next;

        switch (evt.wheelData > 0){
          case false: //down
            next = (last + 1 == $chapters.length) ? $chapters.length-1 : last + 1;
            break;

          case true: //up
            next = (last === 0) ? 0 : last - 1;
            break;
        }
        // Set Next Chapter Active
        $chapters.eq(next).addClass('active');
        console.log(next);
        if (next > 0){
          $body.scrollTo($chScrollPositions[next], {duration:'easeOutQuart', offsetTop: 93});
        }
        else{
          $body.scrollTo(0, {duration:'swing', offsetTop: 0});
        }
    });
  }

  init();
});
