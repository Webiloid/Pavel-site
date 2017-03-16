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
});
