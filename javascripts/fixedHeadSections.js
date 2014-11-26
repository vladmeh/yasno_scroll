$(function() {
  var header_old = $('#header').html(),
      sections = [
        '#what-we-do',
        '#nashi-proekty',
        '#vsyo-chto-vy-hoteli-znat',
        '#klienty',
        '#po-vsem-voprosam'
      ];
  $(window).on('scroll', function(){
    var h_header = $('#header').outerHeight();
    //console.log(h_header);
    if ($(window).scrollTop() > 170){
      $('#header').addClass('fixed-head').html('<img src="http://yasno.co/wp-content/uploads/2014/11/logo-horizontal.png" width="352" class="pageTop"/>');
      $('#what-we-do').css('margin-top', 262 + 'px');
    }
    else {
      $('#header').removeClass('fixed-head').html(header_old);
      $('#what-we-do').css('margin-top', 0);
    }

    $.each(sections,function(key, value){
      var head = $(value),
          f_head = $(value + ' .f-subsection-h'),
          t_head = $(value + ' .l-subsection-h h4'),
          point = $('.fixed-head').outerHeight(),
          scroll_point = head.offset().top - $(window).scrollTop();
      if (point !== null && point >= scroll_point){
        f_head.html('<h4>'+t_head.html()+'</h4>');
      }
      else{
        f_head.empty();
      }
    });

    var citate = $('#esli-vy-hotite-byt-dizajnerom'),
        f_head = $('#esli-vy-hotite-byt-dizajnerom .f-subsection-h'),
        t_head = $('#esli-vy-hotite-byt-dizajnerom .l-subsection-h'),
        cPoint = $('.fixed-head').outerHeight(),
        cScrollPoint = citate.offset().top - $(window).scrollTop();

    if (cPoint >= cScrollPoint){
      f_head.html(t_head.html()).addClass('citata');
    }
    else{
      f_head.removeClass('citata').empty();
    }

    $('.pageTop').on('click', function(){
      var body = $("html, body");
      body.animate({scrollTop:0}, '500', 'swing');
      return false;
    });
  });
});
