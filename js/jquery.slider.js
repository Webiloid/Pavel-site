
/*  Jquery slider plugin v0.1.0 */

/*
 * TODO - непонятные лаги при смене слайда
 * TODO - новые анимации
 * TODO - смена слайдов по интервалу
 * TODO - смена слайдов по скроллу
 * TODO - адаптивность размера слайдера
*/

(function(global, $) {

  $.fn.slider = function(options) {

    // Дефолтные настройки
    let settings = {
      animationDuration: 1000,
      cyclical: false
    };

    settings = $.extend({}, settings, options);
    const main = this,
        wrapper = this.find(".slider__wrapper"),
        slides = this.find(".slider__slide");
    const slideWidth = parseInt(slides.eq(0).css("width"));
    const controllers = {
      prev: this.find(".slider__controller--prev"),
      next: this.find(".slider__controller--next")
    };


    // Текущее состояние слайдера
    let state = {
      count: slides.length,
      current: 0
    };

    // Создание слайдера
    let initialize = function() {

      controllers.prev.on("click", changeSlide.bind(global, false));
      controllers.next.on("click", changeSlide.bind(global, true));

      main.css({
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden"
      });

      wrapper.css({
        width: "400%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0
      });

      slides.css({
        width: "25%",
        height: "100%",
        float: "left"
      });

      $(global).on("keydown", function(e) {
        let keyCode = e.keyCode;

        if(keyCode > 36 && keyCode < 41) {
          e.preventDefault();
        }

        if(keyCode === 37 || keyCode == 38) {
          changeSlide(false);
        } else if(keyCode === 39 || keyCode === 40) {
          changeSlide(true);
        }

      });

      // TODO - скроллинг

    };

    let changeSlide = function(direction) {

      if(state.current === 0 && !direction) {
        if(settings.cyclical) {
          state.current = state.count;
        } else {
          return;
        }
      } else if(state.current === state.count - 1 && direction) {
        if(settings.cyclical) {
          reset();
        }
        return;
      }

      state.current += direction ? 1 : -1;
      let offset = -state.current * slideWidth;
      wrapper.animate({
        left : `${offset}px`
      }, settings.animationDuration);

    };

    let reset = function() {
      wrapper.animate({
        left: 0
      }, settings.animationDuration);
      state.current = 0;
    };

    initialize();
  };

})(this, jQuery);
