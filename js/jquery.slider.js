
/*  Jquery slider plugin */

(function($) {

  $.fn.slider = function(options) {

    // Дефолтные настройки
    let settings = {
      slideSelector: null,
      controllerSelector: null
    };

    settings = $.extend({}, settings, options);
    let slides = this.find(settings.slideSelector);

    // Текущее состояние слайдера
    let state = {
      slidesCount: slides.length,
      currentSlide: 0
    };

    // Создание слайдера
    let initialize = function() {

      // TODO Добавить css-файл со свойствами слайда (класс slider + подклассы)
      slides.not(`:eq(${state.currentSlide})`).addClass("slider__slider--invisible");
      slides.eq(state.currentSlide).addClass("slider__slide");

      // TODO добавить селекторы для контроллеров (кнопок)
      // TODO обработать нажатие на контроллеры (+ кнопки + скролл мышкой)

    };

    // TODO переключение на следующий слайд
    let next = function() {

    };

    // TODO переключение на пердыдущий слайд
    let prev = function() {

    };

    // TODO сброс слайдера
    let reset = function() {

    };

  };

})(jQuery);
