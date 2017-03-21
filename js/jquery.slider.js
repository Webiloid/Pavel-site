
/*  Jquery slider plugin v0.1.1 */

/*
 * TODO - непонятные лаги при смене слайда
 * TODO - новые анимации
 * TODO - смена слайдов по скроллу
 * TODO - адаптивность размера слайдера
*/

(function(global, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(global, require('jquery'));
  } else {
    factory(global, global.jQuery);
  }

})(this, function(global, $) {

  $.fn.slider = function(options) {

    let slider = {

      version: "0.1.1",

      currentSlideIndex: function() {
        return this.state.current;
      }

    };

    /* Дефолтные настройки
     * animationType - тип слайдера "slide-horizontal" - скроллится по горизонтали,
     *                              "slide-vertical" - скроллится по вертикали,
     *                              ПО УМОЛЧАНИЮ - "slide-horizontal"
     * animationDuration - время смены слайдов (в миллисекундах)
     * cyclical - true - слайд скроллится циклично (из последнего в первый слайд и наоборот)
     *            false - слайд не скроллится с последнего на первый (и наоборот)
     * interval - true - слайды меняются самостоятельно
     *            false - слайды не меняются без участия пользователя
     * slideInterval - время демонстрации одного слайда (в миллисекундах), при условии активности
     *                 параметра interval
     */
    let settings = {
      animationType: "slide-horizontal",
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
    let slideWidth, slideHeight;

    let state = slider.state = {
      count: slides.length,
      current: 0,
      interval: null
    };

    let initSliderComponents = function() {

      let mainCss = {
        width: "inherit",
        height: "100%",
        position: "relative",
        overflow: "hidden"
      }, wrapperCss = {}, slidesCss = {};

      let wrapperSize = `${state.count * 100}%`, slideSize = `${100 / state.count}%`;
      wrapperCss.position = "absolute";
      wrapperCss.top = 0;
      wrapperCss.left = 0;

      if(settings.animationType === "slide-horizontal") {
        wrapperCss.height = slidesCss.height = "100%";
        wrapperCss.width = wrapperSize;
        slidesCss.width = slideSize;
        slidesCss.float = "left";
      } else if(settings.animationType === "slide-vertical") {
        wrapperCss.width = slidesCss.width = "100%";
        wrapperCss.height = wrapperSize;
        slidesCss.height = slideSize;
      }

      main.css(mainCss);
      wrapper.css(wrapperCss);
      slides.css(slidesCss);

    };

    let intervalHandler = function() {
      changeSlide(true, "interval");
    };

    let getAnimationObject = function() {

      let animationObject = {};

      if(settings.animationType === "slide-horizontal") {
        animationObject.left = `${-state.current * slideWidth}px`;
      } else if(settings.animationType === "slide-vertical") {
        animationObject.top = `${-state.current * slideHeight}px`;
      }

      return animationObject;
    };

    let initialize = function() {

      initSliderComponents();
      controllers.prev.on("click", changeSlide.bind(global, false, "button"));
      controllers.next.on("click", changeSlide.bind(global, true, "button"));

      if(settings.interval) {
        state.interval = setInterval(intervalHandler, settings.slideInterval);
      }

      let firstSlide = slides.eq(state.current);
      slideWidth = parseInt(firstSlide.css("width"));
      slideHeight = parseInt(firstSlide.css("height"));

      $(global).keydown(function(e) {
        let keyCode = e.keyCode;

        if(keyCode > 36 && keyCode < 41) {
          e.preventDefault();
        }

        if(keyCode === 37 || keyCode == 38) {
          changeSlide(false, "button");
        } else if(keyCode === 39 || keyCode === 40) {
          changeSlide(true, "button");
        }

        return $(this);
      }).resize(function() {

        let width = $(this).width(),
            height = $(this).height();

        slideWidth = width;
        slideHeight = height;

        main.css({
          width: `${width}px`,
          height: `${height}px`
        });

        wrapper.css({
          width: `${4 * width}px`,
          height: `${height}px`
        });
      });

    };

    let changeSlide = function(direction, changeSource) {

      let prev = slides.eq(state.current);
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
      wrapper.stop().animate(getAnimationObject(), settings.animationDuration);

    };

    let reset = function() {
      wrapper.stop().animate({
        left: 0,
        top: 0
      }, settings.animationDuration);
      state.current = 0;
    };

    initialize();

    return slider;
  };

});
