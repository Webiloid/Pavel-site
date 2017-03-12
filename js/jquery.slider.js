
/*  Jquery slider plugin */

(function(global, $) {

  $.fn.slider = function(options) {

    // Дефолтные настройки
    let settings = {
      slideSelector: null,
      controllerSelector: null,
      animationDuration: 300,
      animationType: "scroll",
      cyclical: false,
      autoMode: false,
      interval: 5000,
      direction: "left"
    };

    settings = $.extend({}, settings, options);
    let slides = this.find(".slider__slide");
    let controllers = {
      prev: this.find(".slider__controller--prev"),
      next: this.find(".slider__controller--next")
    };


    // Текущее состояние слайдера
    let state = {
      slidesCount: slides.length,
      currentSlide: 0
    };

    // Создание слайдера
    let initialize = function() {

      // TODO Добавить css-файл со свойствами слайда (класс slider + подклассы)
      slides.hide();
      slides.eq(state.currentSlide).show();

      // TODO добавить селекторы для контроллеров (кнопок)
      // TODO обработать нажатие на контроллеры (+ кнопки + скролл мышкой)
      controllers.prev.on("click", changeSlide.bind(global, false));
      controllers.next.on("click", changeSlide.bind(global, true));

      $(global).on("keydown", function(e) {
        e.preventDefault();
        let keyCode = e.keyCode;
        if(keyCode === 38 || keyCode == 37) {
          changeSlide(false);
        } else if(keyCode == 40 || keyCode == 39) {
          changeSlide(true);
        }
      });

      $(global).on("scroll", function() {
        console.log("scroll");
      });

    };

    let changeSlide = function(direction) {

      slides.eq(state.currentSlide).hide();

      if((state.currentSlide < state.slidesCount - 1) && direction) {
        state.currentSlide += 1;
      } else if(state.currentSlide > 0 && !direction) {
        state.currentSlide -= 1;
      }

      slides.eq(state.currentSlide).fadeIn(settings.animationDuration);
    };

    // TODO сброс слайдера
    let reset = function() {
      
    };

    initialize();
  };

})(this, jQuery);
