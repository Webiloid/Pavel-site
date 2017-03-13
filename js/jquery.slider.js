
/*  Jquery slider plugin v0.1.0 */

/*
 * TODO - непонятные лаги при смене слайда
 * TODO - новые анимации
 * TODO - смена слайдов по скроллу
 * TODO - адаптивность размера слайдера
*/

(function(global, $) {

  $.fn.slider = function(options) {

    // Дефолтные настройки
    let settings = {
      animationType: "slide",
      animationDuration: 1000,
      cyclical: false,
      interval: false,
      slideInterval: 7000
    };

    settings = $.extend({}, settings, options);
    const main = this,
        wrapper = this.find(".slider__wrapper"),
        slides = this.find(".slider__slide");
    const controllers = {
      prev: this.find(".slider__controller--prev"),
      next: this.find(".slider__controller--next")
    };
    let slideWidth = 0;


    // Текущее состояние слайдера
    let state = {
      count: slides.length,
      current: 0,
      interval: null
    };

    let initSliderComponents = function() {

      let mainCss = {}, wrapperCss = {}, slidesCss = {};

    };

    let intervalHandler = function() {
      changeSlide(true, "interval");
    };

    let getAnimationObject = function() {

      let animationObject = {};

      if(settings.animationType === "slide") {
        animationObject.left = `${-state.current * slideWidth}px`;
      } else if(settings.animationType === "fade") {

      }

      return animationObject;
    };

    // Создание слайдера
    let initialize = function() {

      controllers.prev.on("click", changeSlide.bind(global, false, "button"));
      controllers.next.on("click", changeSlide.bind(global, true, "button"));

      if(settings.interval) {
        state.interval = setInterval(intervalHandler, settings.slideInterval);
      }

      main.css({
        width: "inherit",
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

      slideWidth = parseInt(slides.eq(0).css("width"));

      $(global).on("keydown", function(e) {
        let keyCode = e.keyCode;

        if(keyCode > 36 && keyCode < 41) {
          e.preventDefault();
        }

        if(keyCode === 37 || keyCode == 38) {
          changeSlide(false, "button");
        } else if(keyCode === 39 || keyCode === 40) {
          changeSlide(true, "button");
        }

      });

      $(global).scroll(function(eventObject) {
        console.log(eventObject.data.a);
        //changeSlide(true);
      });
      // TODO - скроллинг

    };

    let changeSlide = function(direction, changeSource) {

      if(state.current === 0 && !direction) {
        if(settings.cyclical) {
          state.current = state.count;
        } else {
          return;
        }
      } else if(state.current === state.count - 1 && direction) {
        if(settings.cyclical) {
          reset();
        } else if(changeSource === "interval") {
          clearInterval(state.interval);
        }
        return;
      }

      if(settings.interval && changeSource === "button") {
        clearInterval(state.interval);
        state.interval = setInterval(intervalHandler, settings.slideInterval);
      }

      state.current += direction ? 1 : -1;
      let offset = -state.current * slideWidth;
      wrapper.stop().animate(getAnimationObject(), settings.animationDuration);

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
