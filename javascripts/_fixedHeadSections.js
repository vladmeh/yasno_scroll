$(function() {
  var $header    = $('#header'),
      $header_fixed = $('#header-fixed'),
      header_old = $header.html(),
      $body      = $('html, body');
  $(window).on('scroll', function(){
    if ($(window).scrollTop() > 50){
      $header.addClass('empty').removeClass('box-orange').empty();
      $header_fixed.show();//fadeIn();
    }
    else {
      $header_fixed.hide();
      $header.removeClass('empty').addClass('box-orange').html(header_old);
    }
  });

  $('.pageTop').on('click', function(){
    var body = $("html, body");
    body.animate({scrollTop:0}, '500', 'swing');
    return false;
  });

  /*$body.bindWheelEvent(function(evt) {
    console.log($(window).scrollTop());
    if (evt.wheelData < 0 && $(window).scrollTop() > 10) {
      $header.addClass('empty').removeClass('box-orange').empty();
      $header_fixed.fadeIn();
    }
    else{

      //evt.cancelDefaultAction(); return false;
    }
  });*/
});
