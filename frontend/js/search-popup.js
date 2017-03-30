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
