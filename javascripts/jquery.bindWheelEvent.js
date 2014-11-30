$(function() {
  // http://www.manhunter.ru/webmaster/199_obrabotka_kolesika_mishi_na_javascript.html
  $.fn.bindWheelEvent = function(callback) {
    if(!$.isFunction(callback)) { return this; }
    if(this.length === 0) { return this; }
    var jsThis = this.get(0);
    var normalizedCallback = function(e) {
      if(!e) { e = window.event; }

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
      };
      // Получить значение поворота колесика мыши
      var wheelData = e.detail ? e.detail * -1 : e.wheelDelta / 40;
      // В движке WebKit возвращается значение в 100 раз больше
      if (Math.abs(wheelData)>100) { wheelData=Math.round(wheelData/100); }
      e.wheelData = wheelData;
      return callback.call(jsThis, e);
    };

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
});
