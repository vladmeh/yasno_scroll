/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var cbpAnimatedHeader = (function() {

  var docElem = document.documentElement,
    el = document.querySelector( '.scrollBoxed' ),
    sections = el.querySelectorAll('.l-section'),
    didScroll = false,
    changeHeaderOn = 0;

  function init() {
    window.addEventListener( 'scroll', function( event ) {
      if( !didScroll ) {
        didScroll = true;
        $.each(sections, function(key, val){
          setTimeout( scrollPage(val), 250 );
        });
      }
    }, false );
  }

  function scrollPage(section) {
    var section = section,
        sy = scrollY(),
        ps = posSection(section);
        point = ps - sy;
    if ( point <= changeHeaderOn ) {
      classie.add( section, 'hide-section' );
      //$("html, body").animate({ top: -($(section).next().offset().top)+ 'px' }, 1000, 'swing');
    }
    else {
      classie.remove( section, 'hide-section' );
    }
    didScroll = false;
  }

  function scrollY() {
    return window.pageYOffset || docElem.scrollTop;
  }

  function posSection(section){
    return section.offsetTop;
  }
  init();

})();
