$(".slider").slider({
  animationType: "slide-horizontal",
  animationDuration: 800,
  cyclical: true,
  interval: true,
  slideInterval: 10000
});

$(window).on("load", function() {

  let circle = new ProgressBar.Circle("#progressbar", {
    strokeWidth: 6,
    easing: 'easeInOut',
    duration: 1400,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: null
  });
  circle.animate(1.0, function() {
    $("#progressbar").hide();
    $(".slider__progressbar").fadeOut(800);
  });

  $(".navigation__item--search").click(function() {
    $(".search__field").addClass("appear__input");
    $(".search").css({
      'z-index': 10000
    }).animate({
      opacity: 1
    }, 300);
  });

  $(".search__close").click(function() {
    $(".search__field").removeClass("appear__input").addClass("disappear__input");
    $(".search").animate({
      opacity: 0
    }, 300, function() {
      $(this).css({
        'z-index': -1
      });
      $(".search__field").removeClass("disappear__input");
    });
  });
});
